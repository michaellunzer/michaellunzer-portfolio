import { getBlogPostBySlug, getSiteInformation, getAllBlogPosts } from '../../../../lib/contentful'
import { notFound } from 'next/navigation'
import Layout from '../../../components/layout'
import SEO from '../../../components/seo'
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
  
  // Only the data fetch is guarded. Building the JSX inside the try would not
  // catch render errors anyway, since JSX is constructed lazily.
  let blog, siteInfo
  try {
    ;[blog, siteInfo] = await Promise.all([
      getBlogPostBySlug(resolvedParams.slug),
      getSiteInformation(),
    ])
  } catch (error) {
    console.error('Error loading blog post:', error)
    notFound()
  }

  if (!blog) {
    notFound()
  }

  // Contentful knows each asset's real dimensions; hard-coding a ratio here
  // made next/image letterbox and crop images that were not that shape.
  const featureImageDetails =
    blog.fields.featureImage?.fields?.file?.details?.image
  const featureImageSize = {
    width: featureImageDetails?.width || 1500,
    height: featureImageDetails?.height || 800,
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
                width={featureImageSize.width}
                height={featureImageSize.height}
                className="img-fluid"
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
        </div>
      </div>
    </Layout>
  )
} 