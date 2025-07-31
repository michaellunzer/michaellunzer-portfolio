import { getAllProjects, getSiteInformation } from '../../../lib/contentful'
import Layout from '../../components/layout'
import SEO from '../../components/seo'
import Projects from '../../components/projects'

export default async function ProjectsPage() {
  const [projects, siteInfo] = await Promise.all([
    getAllProjects(),
    getSiteInformation(),
  ])

  return (
    <Layout header="projects" siteInfo={siteInfo}>
      <SEO
        title="Projects"
        keywords={['Michael Lunzer', 'Projects', 'Portfolio']}
        siteInfo={siteInfo}
      />
      <div className="site-container">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <h1>Projects</h1>
              <Projects data={projects} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
} 