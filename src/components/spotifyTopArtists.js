import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image";

export const SpotifyTopArtists = () => {
    const data = useStaticQuery(graphql`
    query SpotifyTopArtistsQuery {
  allSpotifyTopArtist(
    filter: {time_range: {eq: "short_term"}}
    sort: {fields: order}
  ) {
    edges {
      node {
        name
        genres
        external_urls {
          spotify
        }
        image {
          localFile {
            childImageSharp {
              gatsbyImageData(width: 400, layout: CONSTRAINED)
            }
          }
        }
      }
    }
  }
}
`)
    return <>
        { data.allSpotifyTopArtist.edges &&
            <div className="spotify__top-artists">
                <h1>My Spotify Top 20 Artists</h1>
                <p>
                    These are my top 20 artists from the past four weeks.
                </p>
                <div className="spotify__list">
                    {data.allSpotifyTopArtist.edges.map((artist, index) =>
                        <div key={index} className="spotify__list-item d-flex">
                            <div className="spotify__album-cover">
                                <GatsbyImage image={artist.node.image.localFile.childImageSharp.gatsbyImageData} />
                            </div>
                            <h3>
                                <span className="spotify__list-item-number">{index + 1}</span>
                                <a href={ artist.node.external_urls.spotify}>{ artist.node.name }</a>
                            </h3>
                        </div>
                    )}
                </div>
            </div>
      }
    </>;
}

export default SpotifyTopArtists