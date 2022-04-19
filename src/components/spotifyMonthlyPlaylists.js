import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

export const SpotifyMonthlyPlaylists = () => {
    const data = useStaticQuery(graphql`
    query allSpotifyPlaylists {
        allSpotifyPlaylist(
          filter: { name: { glob: "*20*" } }
          sort: { fields: order }
          limit: 150
        ) {
          edges {
            node {
              name
              description
              tracks {
                total
              }
              external_urls {
                spotify
              }
              href
              uri
              order
              image {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 800) {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
              }
            }
          }
        }
      }
      
    `)
    return (
        <>
            { data.allSpotifyPlaylist.edges &&
                <div className="spotify__top-artists">
                    <h1>My Spotify Monthly Playlists</h1>
                    <p>
                        I make a monthly playlist to record the songs that I'm currently listening to. Kinda like a musical time capsule!
                        I've been doing this on Spotify off and on since 2014 (and before that using iTunes 😎). This list only shows the last ~50 months, so check out my Spotify profile to go further back.
                    </p>
                    <div className="spotify__list">
                        {data.allSpotifyPlaylist.edges.map((name, index) =>
                            <div key={index} className="spotify__list-item d-flex">
                                <div className="spotify__album-cover">
                                    <Img
                                        fluid={name.node.image.localFile.childImageSharp.fluid}
                                    />
                                </div>
                                <h3>
                                    <span className="spotify__list-item-number">{index + 1}</span>
                                    <a href={ name.node.external_urls.spotify}>{ name.node.name }</a>
                                </h3>
                            </div>
                        )}
                    </div>
                </div>
          }
        </>
    )
}

export default SpotifyMonthlyPlaylists