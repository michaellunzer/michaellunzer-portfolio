// const dotenv = require("dotenv");

// if (process.env.ENVIRONMENT !== "production") {
//   dotenv.config();
// }

// const { spaceId, accessToken } = process.env;

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})


module.exports = {
  siteMetadata: {
    title: `Michael Lunzer`,
    description: `Personal Site`,
    author: `@michaellunzer`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    {
      resolve: "gatsby-source-contentful",
      options: {
        spaceId: process.env.SPACE_ID,
        accessToken: process.env.API_KEY,
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Michael Lunzer`,
        short_name: `Michael Lunzer`,
        start_url: `/`,
        background_color: `#494964`,
        theme_color: `#333`,
        icon: `src/images/ML.png` // This path is relative to the root of the site.
      }
    }, // To learn more, visit: https://gatsby.dev/offline // this (optional) plugin enables Progressive Web App + Offline functionality
    `gatsby-plugin-offline`
  ]
};
