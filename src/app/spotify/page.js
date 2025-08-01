// import { getSiteInformation } from '../../../lib/contentful'
// import Layout from '../../components/layout'
// import SEO from '../../components/seo'
// import SpotifyNowPlaying from '../../components/spotifyNowPlaying'
// import SpotifyMonthlyPlaylists from '../../components/spotifyMonthlyPlaylists'
// import SpotifyTopArtists from '../../components/spotifyTopArtists'

// export default async function SpotifyPage() {
//   const siteInfo = await getSiteInformation()

//   return (
//     <Layout header="spotify" siteInfo={siteInfo}>
//       <SEO
//         title="Spotify"
//         keywords={['Michael Lunzer', 'Spotify', 'Music', 'Playlists']}
//         siteInfo={siteInfo}
//       />
//       <div className="site-container">
//         <div className="container">
//           <div className="row">
//             <div className="col-sm-12">
//               <h1>Spotify</h1>
//               <SpotifyNowPlaying />
//               <SpotifyTopArtists />
//               <SpotifyMonthlyPlaylists />
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   )
// } 