import { getSiteInformation } from '../../../lib/contentful'
import { getMonthlyPlaylists } from '../../../lib/spotify'
import Layout from '../../components/layout'
import SEO from '../../components/seo'
import SpotifyMonthlyPlaylists from '../../components/spotifyMonthlyPlaylists'

// Without this the page is prerendered once at build time, so a transient
// Spotify failure bakes the empty fallback into the deployment until the next
// push. Revalidating lets it recover on its own, and picks up new monthly
// playlists between deploys.
export const revalidate = 3600

export default async function SpotifyPage() {
  // Only the data fetch is guarded. Building the JSX inside the try would not
  // catch render errors anyway, since JSX is constructed lazily.
  let siteInfo = null
  let monthlyPlaylists = []

  try {
    ;[siteInfo, monthlyPlaylists] = await Promise.all([
      getSiteInformation(),
      getMonthlyPlaylists()
    ]);
  } catch (error) {
    console.error('Error loading Spotify page:', error);

    // Fall back to just site info if the Spotify API fails.
    siteInfo = await getSiteInformation();
    monthlyPlaylists = [];
  }

  return (
    <Layout header="spotify" siteInfo={siteInfo}>
      <SEO
        title="Spotify"
        keywords={['Michael Lunzer', 'Spotify', 'Music', 'Playlists']}
        siteInfo={siteInfo}
      />
      <div className="site-container">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <h1>Spotify</h1>
              <SpotifyMonthlyPlaylists monthlyPlaylists={monthlyPlaylists} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
