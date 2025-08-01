import { getAllBucketList, getSiteInformation } from '../../../lib/contentful'
import Layout from '../../components/layout'
import SEO from '../../components/seo'
import BucketList from '../../components/bucketlist'

export default async function BucketListPage() {
  try {
    const [bucketList, siteInfo] = await Promise.all([
      getAllBucketList(),
      getSiteInformation(),
    ])

  return (
    <Layout header="bucketlist" siteInfo={siteInfo}>
      <SEO
        title="Bucket List"
        keywords={['Michael Lunzer', 'Bucket List', 'Goals', 'Dreams']}
        siteInfo={siteInfo}
      />
      <div className="site-container">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <h1>Bucket List</h1>
              <BucketList data={bucketList} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
  } catch (error) {
    console.error('Error loading bucket list:', error)
    return (
      <Layout header="bucketlist" siteInfo={null}>
        <SEO
          title="Bucket List"
          keywords={['Michael Lunzer', 'Bucket List', 'Goals', 'Dreams']}
          siteInfo={null}
        />
        <div className="site-container">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <h1>Bucket List</h1>
                <p>Unable to load bucket list at the moment. Please try again later.</p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
} 