import { getAllBucketList, getSiteInformation } from '../../../lib/contentful'
import Layout from '../../components/layout'
import SEO from '../../components/seo'
import BucketList from '../../components/bucketlist'

export default async function BucketListPage() {
  // Only the data fetch is guarded. Building the JSX inside the try would not
  // catch render errors anyway, since JSX is constructed lazily.
  let bucketList = null
  let siteInfo = null
  let failed = false

  try {
    ;[bucketList, siteInfo] = await Promise.all([
      getAllBucketList(),
      getSiteInformation(),
    ])
  } catch (error) {
    console.error('Error loading bucket list:', error)
    failed = true
  }

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
              {failed ? (
                <p>Unable to load bucket list at the moment. Please try again later.</p>
              ) : (
                <BucketList data={bucketList} />
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
