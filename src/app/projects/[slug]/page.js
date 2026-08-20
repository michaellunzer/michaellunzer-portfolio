import { getProjectBySlug, getSiteInformation, getAllProjects } from '../../../../lib/contentful'
import { notFound } from 'next/navigation'
import Layout from '../../../components/layout'
import SEO from '../../../components/seo'
import MarkdownRenderer from '../../../components/MarkdownRenderer'
import moment from 'moment'
import Image from 'next/image'

export async function generateStaticParams() {
  try {
    const projects = await getAllProjects()
    return projects.map((project) => ({
      slug: project.fields.slug,
    }))
  } catch (error) {
    console.error('Error generating static params for projects:', error)
    return []
  }
}

export default async function ProjectPost({ params }) {
  const resolvedParams = await params
  
  // Only the data fetch is guarded. Building the JSX inside the try would not
  // catch render errors anyway, since JSX is constructed lazily.
  let project, siteInfo
  try {
    ;[project, siteInfo] = await Promise.all([
      getProjectBySlug(resolvedParams.slug),
      getSiteInformation(),
    ])
  } catch (error) {
    console.error('Error loading project:', error)
    notFound()
  }

  if (!project) {
    notFound()
  }

  // Contentful knows each asset's real dimensions; hard-coding a ratio here
  // made next/image letterbox and crop images that were not that shape.
  const featureImageDetails =
    project.fields.featureImage?.fields?.file?.details?.image
  const featureImageSize = {
    width: featureImageDetails?.width || 1500,
    height: featureImageDetails?.height || 800,
  }

  return (
    <Layout siteInfo={siteInfo}>
      <SEO
        title={project.fields.title}
        keywords={[
          'Michael Lunzer',
          'Projects',
          'Portfolio',
          project.fields.title
        ]}
        siteInfo={siteInfo}
      />
      <div className="site-container project-post">
        <div className="container">
          {project.fields.featureImage ? (
            <div className="feature-img">
              <Image
                src={`https:${project.fields.featureImage.fields.file.url}`}
                alt={project.fields.title}
                width={featureImageSize.width}
                height={featureImageSize.height}
                className="img-fluid"
              />
            </div>
          ) : (
            <div className="no-image"></div>
          )}

          <div className="details">
            <h1 className="title">{project.fields.title}</h1>
            <span className="date">
              <i className="fas fa-calendar-alt"></i>{" "}
              {moment(project.fields.publishedDate).format("LL")}
            </span>
            <MarkdownRenderer content={project.fields.description} />
          </div>
            
        </div>
      </div>
    </Layout>
  )
} 