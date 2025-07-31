import { getAllBlogPosts } from '../../../lib/contentful'

export async function GET() {
  const blogs = await getAllBlogPosts()
  const baseUrl = 'https://www.michaellunzer.com'
  
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Michael Lunzer's Blog</title>
    <link>${baseUrl}</link>
    <description>Personal blog of Michael Lunzer</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${blogs.map(blog => `
    <item>
      <title>${blog.fields.title}</title>
      <link>${baseUrl}/blogs/${blog.fields.slug}</link>
      <pubDate>${new Date(blog.fields.createdAt).toUTCString()}</pubDate>
      <description><![CDATA[${blog.fields.description}]]></description>
    </item>`).join('')}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
} 