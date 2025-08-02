import { getSiteInformation } from '../../../lib/contentful'
import { getMonthlyPlaylists } from '../../../lib/spotify'
import Layout from '../../components/layout'
import SEO from '../../components/seo'
import SpotifyMonthlyPlaylists from '../../components/spotifyMonthlyPlaylists'

export default async function SpotifyPage() {
  try {
    const [siteInfo, monthlyPlaylists] = await Promise.all([
      getSiteInformation(),
      getMonthlyPlaylists()
    ]);

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
  } catch (error) {
    console.error('Error loading Spotify page:', error);
    
    // Fallback with just site info if Spotify API fails
    const siteInfo = await getSiteInformation();
    
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
                <SpotifyMonthlyPlaylists monthlyPlaylists={[]} />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
} 