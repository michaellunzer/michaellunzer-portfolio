#!/usr/bin/env node
/**
 * Upload images as Contentful assets and create a blog entry as a DRAFT.
 *
 * Needs a Contentful Management token (CFPAT-...) — the API_KEY in .env.local
 * is a read-only Delivery token and will not work here.
 *
 *   CONTENTFUL_MANAGEMENT_TOKEN=CFPAT-xxxx   (in .env.local)
 *   SPACE_ID=xxxx                            (already in .env.local)
 *
 * Usage:
 *   node scripts/contentful-upload-post.js <post.json>
 *
 * The post JSON looks like:
 * {
 *   "title": "...",
 *   "slug": "...",
 *   "publishedDate": "2026-11-08",
 *   "bodyFile": "/abs/path/to/post.md",
 *   "featureImage": "IMG_HERO",          // placeholder key of the feature asset
 *   "images": [
 *     { "key": "IMG_HERO", "file": "/abs/path/a.jpg", "title": "...", "alt": "..." }
 *   ],
 *   "replacements": { "__PRINTABLES_URL__": "https://..." }
 * }
 *
 * Every `__KEY__` placeholder in the markdown is replaced with a markdown
 * image tag pointing at the uploaded asset.
 */

const fs = require('fs');
const path = require('path');

require('dotenv').config({
  path: path.join(__dirname, '..', '.env.local'),
  quiet: true,
});

const SPACE = process.env.SPACE_ID;
const TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const ENV = process.env.CONTENTFUL_ENVIRONMENT || 'master';
const LOCALE = 'en-US';

const CMA = 'https://api.contentful.com';
const UPLOAD = 'https://upload.contentful.com';
const BASE = `${CMA}/spaces/${SPACE}/environments/${ENV}`;

if (!SPACE || !TOKEN) {
  console.error(
    'Missing SPACE_ID or CONTENTFUL_MANAGEMENT_TOKEN.\n' +
      'Add CONTENTFUL_MANAGEMENT_TOKEN=CFPAT-... to .env.local\n' +
      '(Contentful > Settings > API keys > Content management tokens)'
  );
  process.exit(1);
}

const MIME = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.glb': 'model/gltf-binary',
};

async function cf(url, { method = 'GET', headers = {}, body } = {}) {
  const res = await fetch(url, {
    method,
    headers: { Authorization: `Bearer ${TOKEN}`, ...headers },
    body,
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`${method} ${url} -> ${res.status}\n${text}`);
  }
  return text ? JSON.parse(text) : null;
}

/** Upload bytes, create the asset, process it, publish it. Returns the asset. */
async function uploadAsset({ file, title, alt }) {
  const name = path.basename(file);
  const contentType = MIME[path.extname(file).toLowerCase()];
  if (!contentType) throw new Error(`Unsupported file type: ${name}`);

  process.stdout.write(`  ${name} ... `);

  const upload = await cf(`${UPLOAD}/spaces/${SPACE}/uploads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/octet-stream' },
    body: fs.readFileSync(file),
  });

  let asset = await cf(`${BASE}/assets`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/vnd.contentful.management.v1+json' },
    body: JSON.stringify({
      fields: {
        title: { [LOCALE]: title },
        description: { [LOCALE]: alt || '' },
        file: {
          [LOCALE]: {
            contentType,
            fileName: name,
            uploadFrom: {
              sys: { type: 'Link', linkType: 'Upload', id: upload.sys.id },
            },
          },
        },
      },
    }),
  });

  const id = asset.sys.id;

  await cf(`${BASE}/assets/${id}/files/${LOCALE}/process`, {
    method: 'PUT',
    headers: { 'X-Contentful-Version': String(asset.sys.version) },
  });

  // Processing is async — poll until the CDN url shows up.
  let url;
  for (let i = 0; i < 30; i++) {
    await new Promise((r) => setTimeout(r, 1000));
    asset = await cf(`${BASE}/assets/${id}`);
    url = asset.fields.file?.[LOCALE]?.url;
    if (url) break;
  }
  if (!url) throw new Error(`Asset ${id} never finished processing`);

  await cf(`${BASE}/assets/${id}/published`, {
    method: 'PUT',
    headers: { 'X-Contentful-Version': String(asset.sys.version) },
  });

  console.log(`ok  (${id})`);
  return { id, url: `https:${url}`, title, alt };
}

async function main() {
  const specPath = process.argv[2];
  if (!specPath) {
    console.error('Usage: node scripts/contentful-upload-post.js <post.json>');
    process.exit(1);
  }
  const spec = JSON.parse(fs.readFileSync(specPath, 'utf8'));

  console.log(`Space ${SPACE} / ${ENV}`);

  const assets = {};
  for (const img of spec.images) {
    if (img.assetId) {
      // Already uploaded on a previous run — just resolve its URL.
      const a = await cf(`${BASE}/assets/${img.assetId}`);
      assets[img.key] = {
        id: img.assetId,
        url: `https:${a.fields.file[LOCALE].url}`,
        title: a.fields.title?.[LOCALE] || img.title,
        alt: img.alt || a.fields.description?.[LOCALE] || '',
      };
      console.log(`  reusing ${img.key} (${img.assetId})`);
    } else {
      console.log(`  uploading ${img.key}:`);
      assets[img.key] = await uploadAsset(img);
    }
  }

  let body = fs.readFileSync(spec.bodyFile, 'utf8');
  const rawKeys = new Set(spec.images.filter((i) => i.raw).map((i) => i.key));
  for (const [key, a] of Object.entries(assets)) {
    // `raw` assets substitute the bare URL, for things that are not images -
    // e.g. a .glb used as the src of a <model-viewer> tag.
    const replacement = rawKeys.has(key) ? a.url : `![${a.alt || a.title}](${a.url})`;
    body = body.replaceAll(`__${key}__`, replacement);
  }
  for (const [find, replace] of Object.entries(spec.replacements || {})) {
    body = body.replaceAll(find, replace);
  }

  const leftovers = body.match(/__[A-Z0-9_]+__/g);
  if (leftovers) {
    console.warn(`\n! Unreplaced placeholders: ${[...new Set(leftovers)].join(', ')}`);
  }

  const fields = {
    title: { [LOCALE]: spec.title },
    slug: { [LOCALE]: spec.slug },
    publishedDate: { [LOCALE]: spec.publishedDate },
    description: { [LOCALE]: body },
  };
  if (spec.featureImage && assets[spec.featureImage]) {
    fields.featureImage = {
      [LOCALE]: {
        sys: { type: 'Link', linkType: 'Asset', id: assets[spec.featureImage].id },
      },
    };
  }

  let entry;
  if (spec.entryId) {
    // Update in place, keeping any fields this spec does not set.
    const current = await cf(`${BASE}/entries/${spec.entryId}`);
    entry = await cf(`${BASE}/entries/${spec.entryId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/vnd.contentful.management.v1+json',
        'X-Contentful-Version': String(current.sys.version),
      },
      body: JSON.stringify({ fields: { ...current.fields, ...fields } }),
    });
    console.log(`\nDraft entry updated: ${entry.sys.id}`);
  } else {
    entry = await cf(`${BASE}/entries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/vnd.contentful.management.v1+json',
        'X-Contentful-Content-Type': 'blogs',
      },
      body: JSON.stringify({ fields }),
    });
    console.log(`\nDraft entry created: ${entry.sys.id}`);
  }

  // Deliberately NOT published — review it in the Contentful web app first.
  console.log(
    `https://app.contentful.com/spaces/${SPACE}/environments/${ENV}/entries/${entry.sys.id}`
  );
  console.log(
    entry.sys.publishedVersion
      ? '\nNOTE: this entry has been published before — republish to make changes live.'
      : '\nStill a draft. Publish from the Contentful UI when you are happy with it.'
  );
}

main().catch((e) => {
  console.error('\n' + e.message);
  process.exit(1);
});
