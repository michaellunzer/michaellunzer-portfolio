import { getBlogPostBySlug, getSiteInformation, getAllBlogPosts } from '../../../../lib/contentful'
import { notFound } from 'next/navigation'
import Layout from '../../../components/layout'
import SEO from '../../../components/seo'
import Share from '../../../components/share'
import MarkdownRenderer from '../../../components/MarkdownRenderer'
import moment from 'moment'
import Image from 'next/image'

export async function generateStaticParams() {
  try {
    const blogs = await getAllBlogPosts()
    return blogs.map((blog) => ({
      slug: blog.fields.slug,
    }))
  } catch (error) {
    console.error('Error generating static params for blogs:', error)
    return []
  }
}

export default async function BlogPost({ params }) {
  const resolvedParams = await params
  
  try {
    const [blog, siteInfo] = await Promise.all([
      getBlogPostBySlug(resolvedParams.slug),
      getSiteInformation(),
    ])

  if (!blog) {
    notFound()
  }

  const siteurl = siteInfo?.fields?.siteUrl || 'https://www.michaellunzer.com'
  const twitterHandle = siteInfo?.fields?.twiteerHandle
  const socialConfig = {
    site: {
      siteMetadata: { siteurl, twitterHandle }
    },
    title: blog.fields.title,
    slug: blog.fields.slug
  }

  return (
    <Layout siteInfo={siteInfo}>
      <SEO
        title={blog.fields.title}
        keywords={[
          'Michael Lunzer',
          'Customer Success Manager',
          'Technical Account Manager',
          blog.fields.title
        ]}
        siteInfo={siteInfo}
      />
      <div className="site-container blog-post">
        <div className="container">
          {blog.fields.featureImage ? (
            <div className="feature-img">
              <Image
                src={`https:${blog.fields.featureImage.fields.file.url}`}
                alt={blog.fields.title}
                width={1500}
                height={800}
                className="img-fluid"
                style={{ objectFit: 'cover', objectPosition: '50% 50%' }}
              />
            </div>
          ) : (
            <div className="no-image"></div>
          )}

          <div className="details">
            <h1 className="title">{blog.fields.title}</h1>
            <span className="date">
              <i className="fas fa-calendar-alt"></i>{" "}
              {moment(blog.fields.publishedDate).format("LL")}
            </span>
            <MarkdownRenderer content={blog.fields.description} />
          </div>
          
          <Share
            socialConfig={{
              ...socialConfig.site.siteMetadata,
              config: {
                url: `${siteurl}/blogs/${socialConfig.slug}`,
                title: `${socialConfig.title}`
              }
            }}
          />
          
          {/* Comments section - you can add your preferred commenting system here */}
          <div className="comments-section">
            <h3>Comments</h3>
            <p>Comments are currently disabled. Feel free to reach out on social media!</p>
          </div>
        </div>
      </div>
    </Layout>
  )
  } catch (error) {
    console.error('Error loading blog post:', error)
    notFound()
  }
} 