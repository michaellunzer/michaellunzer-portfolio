import { getSiteInformation } from '../../../lib/contentful'
import Layout from '../../components/layout'
import SEO from '../../components/seo'
import ResumeDownload from '../../components/ResumeDownload'

export default async function ResumePage() {
  // Only the data fetch is guarded. Building the JSX inside the try would not
  // catch render errors anyway, since JSX is constructed lazily.
  let siteInfo = null
  let failed = false

  try {
    siteInfo = await getSiteInformation()
  } catch (error) {
    console.error('Error loading resume page:', error)
    failed = true
  }

  return (
    <Layout header="resume" siteInfo={siteInfo}>
      <SEO
        title="Resume"
        keywords={['Michael Lunzer', 'Resume', 'CV', 'Experience']}
        siteInfo={siteInfo}
      />
      <div className="site-container">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              {failed ? (
                <>
                  <h1>Resume</h1>
                  <p>Unable to load resume page at the moment. Please try again later.</p>
                </>
              ) : (
                <ResumeDownload />
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
