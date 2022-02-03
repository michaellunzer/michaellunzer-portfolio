import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import SpotifyTopArtists from "../components/spotifyTopArtists"

const Spotify = () => (
    <Layout>
        <SEO title="Spotify" />
        <div className="site-container blog-post">
          <div className="container">
            {/* <div className="resume-container"> */}
            {/* <div className="section-head"> */}
              {/* <h1 className="line-heading h1">
                Spotify              
                </h1> */}
              


            {/* </div> */}
            {/* <div className="resume-flex"> */}
            <SpotifyTopArtists />



              </div>

              </div>
              {/* </div> */}
              {/* </div> */}



    </Layout>
)

export default Spotify