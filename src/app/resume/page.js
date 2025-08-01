import { getSiteInformation } from '../../../lib/contentful'
import Layout from '../../components/layout'
import SEO from '../../components/seo'
import ResumeDownload from '../../components/ResumeDownload'

export default async function ResumePage() {
  try {
    const siteInfo = await getSiteInformation()

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
                <ResumeDownload />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  } catch (error) {
    console.error('Error loading resume page:', error)
    return (
      <Layout header="resume" siteInfo={null}>
        <SEO
          title="Resume"
          keywords={['Michael Lunzer', 'Resume', 'CV', 'Experience']}
          siteInfo={null}
        />
        <div className="site-container">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <h1>Resume</h1>
                <p>Unable to load resume page at the moment. Please try again later.</p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
} 