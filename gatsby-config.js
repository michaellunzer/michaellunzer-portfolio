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
        downloadLocal: true,
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
    resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-embedder`,
            options: {
              customTransformers: [
                // Your custom transformers
              ],
              services: {
                // The service-specific options by the name of the service
              },
            },
          },
        ],
        },
      },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Michael Lunzer`,
        short_name: `Michael Lunzer`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#ffffff`,
        icon: `src/images/ML-white-background.png`, // This path is relative to the root of the site.
        icon_options: {
          "background_color": "white",
          "theme_color": "white"
        }
      }
    }, // To learn more, visit: https://gatsby.dev/offline // this (optional) plugin enables Progressive Web App + Offline functionality
    `gatsby-plugin-offline`
  ]
};
