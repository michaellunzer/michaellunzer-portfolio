import { getProjectBySlug, getSiteInformation, getAllProjects } from '../../../../lib/contentful'
import { notFound } from 'next/navigation'
import Layout from '../../../components/layout'
import SEO from '../../../components/seo'
import Share from '../../../components/share'
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
  
  try {
    const [project, siteInfo] = await Promise.all([
      getProjectBySlug(resolvedParams.slug),
      getSiteInformation(),
    ])

    if (!project) {
      notFound()
    }

    const siteurl = siteInfo?.fields?.siteUrl || 'https://www.michaellunzer.com'
    const twitterHandle = siteInfo?.fields?.twiteerHandle
    const socialConfig = {
      site: {
        siteMetadata: { siteurl, twitterHandle }
      },
      title: project.fields.title,
      slug: project.fields.slug
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
              <h1 className="title">{project.fields.title}</h1>
              <span className="date">
                <i className="fas fa-calendar-alt"></i>{" "}
                {moment(project.fields.publishedDate).format("LL")}
              </span>
              <MarkdownRenderer content={project.fields.description} />
            </div>
            
            <Share
              socialConfig={{
                ...socialConfig.site.siteMetadata,
                config: {
                  url: `${siteurl}/projects/${socialConfig.slug}`,
                  title: `${socialConfig.title}`
                }
              }}
            />
          </div>
        </div>
      </Layout>
    )
  } catch (error) {
    console.error('Error loading project:', error)
    notFound()
  }
} 