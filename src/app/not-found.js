import Link from 'next/link'
import { getSiteInformation } from '../../lib/contentful'
import Layout from '../components/layout'
import SEO from '../components/seo'

export default async function NotFound() {
  const siteInfo = await getSiteInformation()

  return (
    <Layout siteInfo={siteInfo}>
      <SEO
        title="404 - Page Not Found"
        keywords={['Michael Lunzer', '404', 'Not Found']}
        siteInfo={siteInfo}
      />
      <div className="site-container">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 text-center">
              <h1>404 - Page Not Found</h1>
              <p>The page you're looking for doesn't exist.</p>
              <Link href="/" className="btn btn-primary">
                Go back home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
} 