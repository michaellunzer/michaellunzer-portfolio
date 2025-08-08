import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Sample RSS feed structure - you can manually update this with your actual content
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
    
    <!-- Sample blog post - replace with your actual content -->
    <item>
      <title><![CDATA[Sample Blog Post]]></title>
      <link>https://michaellunzer.com/blogs/sample-post</link>
      <guid>https://michaellunzer.com/blogs/sample-post</guid>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <description><![CDATA[This is a sample blog post description. Replace with your actual blog content.]]></description>
      <content:encoded><![CDATA[<p>This is a sample blog post content. Replace with your actual blog content from Contentful.</p>]]></content:encoded>
      <category>blog</category>
    </item>
    
    <!-- Sample project - replace with your actual content -->
    <item>
      <title><![CDATA[Sample Project]]></title>
      <link>https://michaellunzer.com/projects/sample-project</link>
      <guid>https://michaellunzer.com/projects/sample-project</guid>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <description><![CDATA[This is a sample project description. Replace with your actual project content.]]></description>
      <content:encoded><![CDATA[<p>This is a sample project content. Replace with your actual project content from Contentful.</p>]]></content:encoded>
      <category>project</category>
    </item>
    
  </channel>
</rss>`;

// Write to public directory
const outputPath = path.join(__dirname, '../public/rss.xml');
fs.writeFileSync(outputPath, rssContent);

console.log(`✅ RSS feed generated successfully!`);
console.log(`📁 Output: ${outputPath}`);
console.log(`📝 Note: This is a template. Please manually update with your actual blog and project content.`);
console.log(`🔗 RSS feed will be available at: https://michaellunzer.com/rss.xml`);
