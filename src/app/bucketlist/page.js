import { getAllBucketList, getSiteInformation } from '../../../lib/contentful'
import Layout from '../../components/layout'
import SEO from '../../components/seo'
import BucketList from '../../components/bucketlist'

export default async function BucketListPage() {
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
} 