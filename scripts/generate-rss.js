const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: '.env.local', quiet: true });

const SITE_URL = 'https://michaellunzer.com';
const EXCERPT_LENGTH = 300;

// Escape text for use in XML element content and attributes
function escapeXml(value) {
  if (!value) return '';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Wrap HTML in CDATA. A literal "]]>" in the content would end the section
// early, so split it across two CDATA blocks.
function cdata(html) {
  return `<![CDATA[${String(html || '').replace(/]]>/g, ']]]]><![CDATA[>')}]]>`;
}

// Contentful serves asset URLs protocol-relative (//images.ctfassets.net/...)
// and posts may use site-relative links. Feed readers have no page to resolve
// those against, so make every URL absolute.
function absoluteUrl(url) {
  if (!url) return url;
  if (url.startsWith('//')) return `https:${url}`;
  if (url.startsWith('/')) return `${SITE_URL}${url}`;
  return url;
}

// Plain-text excerpt for <description>, which many readers show as a preview
function markdownToExcerpt(markdown) {
  const text = String(markdown || '')
    .replace(/```[\s\S]*?```/g, ' ') // code blocks
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ') // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // links -> link text
    .replace(/<[^>]*>/g, ' ') // raw HTML
    .replace(/[#>*_`~|-]+/g, ' ') // markdown punctuation
    .replace(/\s+/g, ' ')
    .trim();
  if (text.length <= EXCERPT_LENGTH) return text;
  return text.substring(0, EXCERPT_LENGTH).replace(/\s+\S*$/, '') + '…';
}

function getYouTubeVideoId(url) {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/watch\?(?:.*&)?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/
  );
  return match ? match[1] : null;
}

// Build a markdown -> HTML converter matching the site's MarkdownRenderer
// (GFM + raw HTML), with fixes for how the HTML will be read in a feed reader.
async function createRenderer() {
  const [{ unified }, { default: remarkParse }, { default: remarkGfm }, { default: remarkRehype }, { default: rehypeRaw }, { default: rehypeStringify }, { visit }] =
    await Promise.all([
      import('unified'),
      import('remark-parse'),
      import('remark-gfm'),
      import('remark-rehype'),
      import('rehype-raw'),
      import('rehype-stringify'),
      import('unist-util-visit'),
    ]);

  // Absolute URLs everywhere; YouTube links become a clickable thumbnail,
  // since feed readers strip the iframes the site embeds; <model-viewer>
  // (3D models) becomes a link back to the post.
  const rehypeFeedFixes = (postUrl) => () => (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      const props = node.properties || {};

      if (node.tagName === 'img' && props.src) {
        props.src = absoluteUrl(props.src);
        props.style = 'max-width:100%;height:auto;';
      }

      if (node.tagName === 'a' && props.href) {
        props.href = absoluteUrl(props.href);
        const videoId = getYouTubeVideoId(props.href);
        if (videoId) {
          node.children = [
            {
              type: 'element',
              tagName: 'img',
              properties: {
                src: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
                alt: 'Watch on YouTube',
                style: 'max-width:100%;height:auto;',
              },
              children: [],
            },
          ];
        }
      }

      if (node.tagName === 'iframe' && props.src) {
        const videoId = getYouTubeVideoId(props.src);
        if (videoId && parent && index != null) {
          parent.children[index] = {
            type: 'element',
            tagName: 'a',
            properties: { href: `https://www.youtube.com/watch?v=${videoId}` },
            children: [
              {
                type: 'element',
                tagName: 'img',
                properties: {
                  src: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
                  alt: 'Watch on YouTube',
                  style: 'max-width:100%;height:auto;',
                },
                children: [],
              },
            ],
          };
        }
      }

      if (node.tagName === 'model-viewer' && parent && index != null) {
        const label = props.alt || props.caption || '3D model';
        parent.children[index] = {
          type: 'element',
          tagName: 'a',
          properties: { href: postUrl },
          children: [{ type: 'text', value: `View the interactive ${label} on the site` }],
        };
      }
    });
  };


  return async (markdown, postUrl) => {
    const file = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(rehypeFeedFixes(postUrl))
      .use(rehypeStringify)
      .process(String(markdown || ''));
    return String(file);
  };
}

function getFeatureImage(entry) {
  const file = entry.fields.featureImage?.fields?.file;
  if (!file?.url) return null;
  return {
    url: absoluteUrl(file.url),
    type: file.contentType || 'image/jpeg',
    size: file.details?.size || 0,
    width: file.details?.image?.width,
    height: file.details?.image?.height,
  };
}

async function toFeedItem(entry, type, render) {
  const url = `${SITE_URL}/${type === 'blog' ? 'blogs' : 'projects'}/${entry.fields.slug}`;
  const markdown = entry.fields.description || '';
  const image = getFeatureImage(entry);
  const body = await render(markdown, url);

  const imageHtml = image
    ? `<p><img src="${escapeXml(image.url)}" alt="${escapeXml(entry.fields.title)}" style="max-width:100%;height:auto;" /></p>\n`
    : '';
  const footer = `\n<p><a href="${escapeXml(url)}">Read on michaellunzer.com</a></p>`;

  return {
    type,
    url,
    title: entry.fields.title || '',
    excerpt: markdownToExcerpt(markdown),
    publishedDate: entry.fields.publishedDate || entry.sys.createdAt,
    contentHtml: imageHtml + body + footer,
    image,
  };
}

function renderItem(post) {
  const img = post.image;
  const imageTags = img
    ? `
      <enclosure url="${escapeXml(img.url)}" length="${img.size}" type="${escapeXml(img.type)}" />
      <media:content url="${escapeXml(img.url)}" medium="image" type="${escapeXml(img.type)}"${img.width ? ` width="${img.width}"` : ''}${img.height ? ` height="${img.height}"` : ''} />
      <media:thumbnail url="${escapeXml(img.url)}" />`
    : '';

  return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(post.url)}</link>
      <guid isPermaLink="true">${escapeXml(post.url)}</guid>
      <pubDate>${new Date(post.publishedDate).toUTCString()}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
      <content:encoded>${cdata(post.contentHtml)}</content:encoded>
      <category>${post.type}</category>${imageTags}
    </item>`;
}

const FALLBACK_ITEM = `
    <item>
      <title>Welcome to Michael Lunzer's Portfolio</title>
      <link>${SITE_URL}</link>
      <guid>${SITE_URL}</guid>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <description>Welcome to my personal portfolio and blog. Check back soon for new content!</description>
      <content:encoded><![CDATA[<p>Welcome to my personal portfolio and blog. I'll be posting about software development, projects, and more. Check back soon for new content!</p>]]></content:encoded>
      <category>blog</category>
    </item>`;

function renderFeed(itemsXml) {
  const now = new Date().toUTCString();
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:media="http://search.yahoo.com/mrss/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Michael Lunzer's Blog &amp; Projects</title>
    <link>${SITE_URL}</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Personal blog and projects of Michael Lunzer - Software Engineer and Developer</description>
    <language>en</language>
    <lastBuildDate>${now}</lastBuildDate>
    <pubDate>${now}</pubDate>
    <ttl>60</ttl>${itemsXml}
  </channel>
</rss>
`;
}

function writeFeed(xml) {
  const outputPath = path.join(__dirname, '../public/rss.xml');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, xml);
  return outputPath;
}

async function loadEntries() {
  if (!(process.env.SPACE_ID && process.env.API_KEY)) {
    console.log('ℹ️  No Contentful credentials found, using fallback content');
    return { blogs: [], projects: [] };
  }
  try {
    console.log('📡 Fetching content from Contentful...');
    const { getAllBlogPosts, getAllProjects } = require('../lib/contentful.js');
    const [blogs, projects] = await Promise.all([getAllBlogPosts(), getAllProjects()]);
    console.log(`✅ Fetched ${blogs.length} blogs and ${projects.length} projects from Contentful`);
    return { blogs, projects };
  } catch (error) {
    console.warn('⚠️  Could not fetch from Contentful, using fallback content:', error.message);
    return { blogs: [], projects: [] };
  }
}

async function generateRSS() {
  try {
    const { blogs, projects } = await loadEntries();
    const render = await createRenderer();

    const allPosts = (
      await Promise.all([
        ...blogs.map((b) => toFeedItem(b, 'blog', render)),
        ...projects.map((p) => toFeedItem(p, 'project', render)),
      ])
    ).sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));

    const itemsXml = allPosts.length > 0 ? allPosts.map(renderItem).join('') : FALLBACK_ITEM;
    const outputPath = writeFeed(renderFeed(itemsXml));

    console.log(`✅ RSS feed generated successfully!`);
    console.log(`📊 Total posts: ${allPosts.length} (${blogs.length} blogs, ${projects.length} projects)`);
    console.log(`📁 Output: ${outputPath}`);
  } catch (error) {
    console.error('❌ Error generating RSS feed:', error);
    writeFeed(renderFeed(FALLBACK_ITEM));
    console.log(`⚠️  Created fallback RSS feed due to error`);
  }
}

module.exports = { toFeedItem, renderItem, renderFeed, createRenderer };

if (require.main === module) {
  generateRSS();
}
