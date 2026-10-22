import Link from 'next/link'
import { getSiteInformation } from '../../../lib/contentful'
import Layout from '../../components/layout'
import SEO from '../../components/seo'

export const metadata = {
  title: 'Resume | Michael Lunzer',
  description: 'How to get a copy of Michael Lunzer’s resume.',
}

export default async function ResumePage() {
  let siteInfo = null
  try {
    siteInfo = await getSiteInformation()
  } catch (error) {
    console.error('Error loading site info:', error)
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
              <div style={{ maxWidth: '700px', margin: '60px auto', padding: '0 20px 60px', textAlign: 'center' }}>
                <h1>Resume</h1>
                <p>
                  I&rsquo;d rather have a conversation than hand out a PDF, so my resume is
                  available on request. <Link href="/reach-out">Get in touch</Link> and tell me
                  a little about what you&rsquo;re working on &mdash; I&rsquo;ll send it over.
                </p>
                <p>
                  In the meantime,{' '}
                  <Link href="/projects">my projects</Link> and{' '}
                  <a href="https://linkedin.com/in/michaellunzer">my LinkedIn</a>{' '}
                  cover most of the same ground.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
