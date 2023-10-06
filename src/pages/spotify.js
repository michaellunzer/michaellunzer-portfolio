import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import SpotifyTopArtists from "../components/spotifyTopArtists"
// import SpotifyMonthlyPlaylists2024 from "../components/spotifyMonthlyPlaylists2024"
import SpotifyMonthlyPlaylists2023 from "../components/spotifyMonthlyPlaylists2023"
import SpotifyMonthlyPlaylists2022 from "../components/spotifyMonthlyPlaylists2022"
import SpotifyMonthlyPlaylists2021 from "../components/spotifyMonthlyPlaylists2021"
import SpotifyMonthlyPlaylists2020 from "../components/spotifyMonthlyPlaylists2020"
// import SpotifyMonthlyPlaylists2019 from "../components/spotifyMonthlyPlaylists2019"
// import SpotifyMonthlyPlaylists2018 from "../components/spotifyMonthlyPlaylists2018"
// import SpotifyMonthlyPlaylists2017 from "../components/spotifyMonthlyPlaylists2017"
// import SpotifyMonthlyPlaylists2016 from "../components/spotifyMonthlyPlaylists2016"
// import SpotifyMonthlyPlaylists2015 from "../components/spotifyMonthlyPlaylists2015"
// import SpotifyMonthlyPlaylists2014 from "../components/spotifyMonthlyPlaylists2014"


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

            {/* <SpotifyMonthlyPlaylists2024 /> */}
            <SpotifyMonthlyPlaylists2023 />
            <SpotifyMonthlyPlaylists2022 />
            <SpotifyMonthlyPlaylists2021 />
            <SpotifyMonthlyPlaylists2020 />
            {/* <SpotifyMonthlyPlaylists2019 />
            <SpotifyMonthlyPlaylists2018 />
            <SpotifyMonthlyPlaylists2017 />
            <SpotifyMonthlyPlaylists2016 />
            <SpotifyMonthlyPlaylists2015 />
            <SpotifyMonthlyPlaylists2014 /> */}



              </div>

              </div>
              {/* </div> */}
              {/* </div> */}



    </Layout>
)

export default Spotify