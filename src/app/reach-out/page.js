import { getSiteInformation } from '../../../lib/contentful'
import Layout from '../../components/layout'
import SEO from '../../components/seo'

export const metadata = {
  title: 'Reach Out | Michael Lunzer',
  description: 'Get in touch with Michael Lunzer.',
}

export default async function ReachOutPage() {
  let siteInfo = null
  try {
    siteInfo = await getSiteInformation()
  } catch (error) {
    console.error('Error loading site info:', error)
  }

  return (
    <Layout header="reach-out" siteInfo={siteInfo}>
      <SEO
        title="Reach Out"
        keywords={['Contact', 'Michael Lunzer', 'Reach Out']}
        siteInfo={siteInfo}
      />
      <div className="site-container">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div style={{ maxWidth: '700px', margin: '60px auto', padding: '0 20px 60px', textAlign: 'center' }}>
                <h1>Reach Out</h1>
                <p>Fill out the form below and I&rsquo;ll get back to you as soon as possible.</p>
                <div style={{ marginTop: '30px' }}>
                  <iframe
                    src="https://docs.google.com/forms/d/e/1FAIpQLScfZV8eWgiLb4d5Nrj2mxfVsrLs6cpr9QitgZMYhNPj4ZLGiA/viewform?embedded=true"
                    width="640"
                    height="947"
                    frameBorder="0"
                    marginHeight="0"
                    marginWidth="0"
                    style={{ maxWidth: '100%' }}
                  >
                    Loading&hellip;
                  </iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
