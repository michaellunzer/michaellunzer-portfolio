import { getAllBlogPosts, getSiteInformation } from '../../../lib/contentful'
import Layout from '../../components/layout'
import SEO from '../../components/seo'
import Blogs from '../../components/blogs'

export default async function BlogsPage() {
  const [blogs, siteInfo] = await Promise.all([
    getAllBlogPosts(),
    getSiteInformation(),
  ])

  return (
    <Layout header="blogs" siteInfo={siteInfo}>
      <SEO
        title="Blogs"
        keywords={['Michael Lunzer', 'Blog', 'Articles']}
        siteInfo={siteInfo}
      />
      <div className="site-container">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <h1>Blog Posts</h1>
              <Blogs data={blogs} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
} 