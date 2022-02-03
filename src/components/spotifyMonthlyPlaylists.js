// import React from "react"
// import { useStaticQuery, graphql } from "gatsby"
// import Img from "gatsby-image"

// export const SpotifyTopArtists = () => {
//     const data = useStaticQuery(graphql`
//     query allSpotifyPlaylists($months: String) {
//         allSpotifyPlaylist(
//           filter: { name: { glob: "*20*" } }
//           sort: { fields: order }
//         ) {
//           edges {
//             node {
//               name
//               description
//               tracks {
//                 total
//               }
//               external_urls {
//                 spotify
//               }
//               href
//               uri
//               order
//               image {
//                 localFile {
//                   childImageSharp {
//                     fluid(maxWidth: 400) {
//                       ...GatsbyImageSharpFluid_withWebp
//                     }
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
      
//     `)
//     return (
//         <>#]
//             { data.allSpotifyTopArtist.edges && // need to change this to be playlists instead of Artists
//                 <div className="spotify__top-artists">
//                     <h1>My Spotify Monthly Playlists</h1>
//                     <p>
//                         I make a monthly playlist to record the songs that I'm currently listening to. Kinda like a musical time capsule!
//                     </p>
//                     <div className="spotify__list">
//                         {data.allSpotifyTopArtist.edges.map((artist, index) =>
//                             <div key={index} className="spotify__list-item d-flex">
//                                 <div className="spotify__album-cover">
//                                     <Img
//                                         fluid={artist.node.image.localFile.childImageSharp.fluid}
//                                     />
//                                 </div>
//                                 <h3>
//                                     <span className="spotify__list-item-number">{index + 1}</span>
//                                     { artist.node.name }
//                                 </h3>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//           }
//         </>
//     )
// }

// export default SpotifyTopArtists