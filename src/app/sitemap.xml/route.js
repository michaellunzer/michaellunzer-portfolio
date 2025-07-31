import { getAllBlogPosts, getAllProjects } from '../../../lib/contentful'

export async function GET() {
  const [blogs, projects] = await Promise.all([
    getAllBlogPosts(),
    getAllProjects(),
  ])

  const baseUrl = 'https://www.michaellunzer.com'
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/blogs</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/projects</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/resume</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${baseUrl}/bucketlist</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${baseUrl}/spotify</loc>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
  ${blogs.map(blog => `
  <url>
    <loc>${baseUrl}/blogs/${blog.fields.slug}</loc>
    <lastmod>${blog.sys.updatedAt}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}
  ${projects.map(project => `
  <url>
    <loc>${baseUrl}/projects/${project.fields.slug}</loc>
    <lastmod>${project.sys.updatedAt}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}
</urlset>`

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
} 