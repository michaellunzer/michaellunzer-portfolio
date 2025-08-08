import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateRSS() {
  try {
    let blogs = [];
    let projects = [];
    
    // Try to fetch real content from Contentful if environment variables are available
    if (process.env.SPACE_ID && process.env.API_KEY) {
      try {
        console.log('📡 Fetching content from Contentful...');
        
        // Import Contentful functions dynamically
        const { getAllBlogPosts, getAllProjects } = await import('../lib/contentful.js');
        
        // Fetch data from Contentful
        [blogs, projects] = await Promise.all([
          getAllBlogPosts(),
          getAllProjects()
        ]);
        
        console.log(`✅ Fetched ${blogs.length} blogs and ${projects.length} projects from Contentful`);
      } catch (error) {
        console.warn('⚠️  Could not fetch from Contentful, using fallback content:', error.message);
      }
    } else {
      console.log('ℹ️  No Contentful credentials found, using fallback content');
    }

    // Combine and sort by published date
    const allPosts = [
      ...blogs.map(blog => ({
        ...blog,
        type: 'blog',
        url: `https://michaellunzer.com/blogs/${blog.fields.slug}`,
        title: blog.fields.title,
        description: blog.fields.excerpt || blog.fields.description || '',
        publishedDate: blog.fields.publishedDate || blog.sys.createdAt,
        content: blog.fields.content || ''
      })),
      ...projects.map(project => ({
        ...project,
        type: 'project',
        url: `https://michaellunzer.com/projects/${project.fields.slug}`,
        title: project.fields.title,
        description: project.fields.excerpt || project.fields.description || '',
        publishedDate: project.fields.publishedDate || project.sys.createdAt,
        content: project.fields.content || ''
      }))
    ].sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));

    // Generate RSS XML
    const rssContent = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Michael Lunzer's Blog & Projects</title>
    <link>https://www.michaellunzer.com</link>
    <description>Personal blog and projects of Michael Lunzer - Software Engineer and Developer</description>
    <language>en</language>
    <lastBuildDate>${new Date().toISOString()}</lastBuildDate>
    <pubDate>${new Date().toISOString()}</pubDate>
    <ttl>60</ttl>
    ${allPosts.length > 0 ? allPosts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${post.url}</link>
      <guid>${post.url}</guid>
      <pubDate>${new Date(post.publishedDate).toUTCString()}</pubDate>
      <description><![CDATA[${post.description}]]></description>
      <content:encoded><![CDATA[${post.content}]]></content:encoded>
      <category>${post.type}</category>
    </item>`).join('') : `
    <!-- Fallback content when no posts are available -->
    <item>
      <title><![CDATA[Welcome to Michael Lunzer's Portfolio]]></title>
      <link>https://michaellunzer.com</link>
      <guid>https://michaellunzer.com</guid>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <description><![CDATA[Welcome to my personal portfolio and blog. Check back soon for new content!]]></description>
      <content:encoded><![CDATA[<p>Welcome to my personal portfolio and blog. I'll be posting about software development, projects, and more. Check back soon for new content!</p>]]></content:encoded>
      <category>blog</category>
    </item>`}
  </channel>
</rss>`;

    // Write to public directory
    const outputPath = path.join(__dirname, '../public/rss.xml');
    fs.writeFileSync(outputPath, rssContent);
    
    console.log(`✅ RSS feed generated successfully!`);
    console.log(`📊 Total posts: ${allPosts.length} (${blogs.length} blogs, ${projects.length} projects)`);
    console.log(`📁 Output: ${outputPath}`);
    console.log(`🔗 RSS feed will be available at: https://michaellunzer.com/rss.xml`);
    
  } catch (error) {
    console.error('❌ Error generating RSS feed:', error);
    
    // Create a minimal RSS feed as fallback
    const fallbackRss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Michael Lunzer's Blog & Projects</title>
    <link>https://www.michaellunzer.com</link>
    <description>Personal blog and projects of Michael Lunzer - Software Engineer and Developer</description>
    <language>en</language>
    <lastBuildDate>${new Date().toISOString()}</lastBuildDate>
    <pubDate>${new Date().toISOString()}</pubDate>
    <ttl>60</ttl>
    <item>
      <title><![CDATA[Welcome to Michael Lunzer's Portfolio]]></title>
      <link>https://michaellunzer.com</link>
      <guid>https://michaellunzer.com</guid>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <description><![CDATA[Welcome to my personal portfolio and blog. Check back soon for new content!]]></description>
      <content:encoded><![CDATA[<p>Welcome to my personal portfolio and blog. I'll be posting about software development, projects, and more. Check back soon for new content!</p>]]></content:encoded>
      <category>blog</category>
    </item>
  </channel>
</rss>`;
    
    const outputPath = path.join(__dirname, '../public/rss.xml');
    fs.writeFileSync(outputPath, fallbackRss);
    console.log(`⚠️  Created fallback RSS feed due to error`);
  }
}

// Run the script
generateRSS();
