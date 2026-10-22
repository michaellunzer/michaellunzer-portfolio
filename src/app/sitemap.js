import { getAllBlogPosts, getAllProjects } from '../../lib/contentful'

// Canonical host: the apex 307-redirects to www, so www is what crawlers should index.
const SITE_URL = 'https://www.michaellunzer.com'

// Pages with their own page.js and no Contentful-driven slug.
const STATIC_ROUTES = [
  { path: '/bucketlist', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/spotify', changeFrequency: 'weekly', priority: 0.6 },
  { path: '/reach-out', changeFrequency: 'yearly', priority: 0.5 },
  { path: '/privacy-policy', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/terms', changeFrequency: 'yearly', priority: 0.3 },
]

// undefined when the entry carries no usable date, so callers can omit lastmod
// rather than emit an invalid one.
function entryDate(item) {
  const raw =
    item.sys?.updatedAt || item.fields?.publishedDate || item.sys?.createdAt
  if (!raw) return undefined
  const date = new Date(raw)
  return isNaN(date) ? undefined : date
}

// Newest entry date in a collection, or undefined when there is nothing to go on.
// Omitting lastModified is better than inventing one — a lastmod that changes on
// every build teaches crawlers to ignore it.
function newestDate(items) {
  const dates = items.map(entryDate).filter(Boolean)
  return dates.length ? new Date(Math.max(...dates)) : undefined
}

function detailEntries(items, prefix) {
  return items
    .filter((item) => item.fields?.slug)
    .map((item) => {
      const lastModified = entryDate(item)
      return {
        // Next drops the url into <loc> unescaped, so a slug containing & or <
        // would invalidate the whole sitemap. Encoding is a no-op for normal slugs.
        url: `${SITE_URL}${prefix}/${encodeURIComponent(item.fields.slug)}`,
        ...(lastModified ? { lastModified } : {}),
        changeFrequency: 'monthly',
        priority: 0.7,
      }
    })
}

export default async function sitemap() {
  let blogs = []
  let projects = []

  try {
    ;[blogs, projects] = await Promise.all([getAllBlogPosts(), getAllProjects()])
  } catch (error) {
    // Contentful being unreachable shouldn't fail the build; ship the static routes.
    console.error('Error fetching entries for sitemap:', error)
  }

  const newestBlog = newestDate(blogs)
  const newestProject = newestDate(projects)

  return [
    {
      url: SITE_URL,
      lastModified: newestDate([...blogs, ...projects]),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/blogs`,
      lastModified: newestBlog,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: newestProject,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...STATIC_ROUTES.map(({ path, changeFrequency, priority }) => ({
      url: `${SITE_URL}${path}`,
      changeFrequency,
      priority,
    })),
    ...detailEntries(blogs, '/blogs'),
    ...detailEntries(projects, '/projects'),
  ]
}
