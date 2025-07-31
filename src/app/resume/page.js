import { getAllResume, getSiteInformation } from '../../../lib/contentful'
import Layout from '../../components/layout'
import SEO from '../../components/seo'
import Resume from '../../components/resume'

export default async function ResumePage() {
  const [resume, siteInfo] = await Promise.all([
    getAllResume(),
    getSiteInformation(),
  ])

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
              <h1>Resume</h1>
              <Resume data={resume} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
} 