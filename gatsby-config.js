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
    author: `@michaellunzer`,
    siteUrl: `https://www.michaellunzer.com`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-gtag`,
      options: {
        // your google analytics tracking id
        trackingId: `UA-41477630-2`,
        // Puts tracking script in the head instead of the body
        head: true,
        // enable ip anonymization
        anonymize: false,
      },
    },
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
        downloadLocal: false,
      }
    },
    'gatsby-plugin-robots-txt',
    `gatsby-plugin-advanced-sitemap`,
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
    resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              aliases:{sh: "bash", js: "javascript"},
              showLineNumbers: true,
            },
          },
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
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-segment-js`,
      options: {
        // your segment write key for your production environment
        // when process.env.NODE_ENV === 'production'
        // required; non-empty string
        prodKey: process.env.SEGMENT_WRITE_KEY,
  
        // if you have a development env for your segment account, paste that key here
        // when process.env.NODE_ENV === 'development'
        // optional; non-empty string
        // devKey: `SEGMENT_DEV_WRITE_KEY`,
  
        // boolean (defaults to false) on whether you want
        // to include analytics.page() automatically
        // if false, see below on how to track pageviews manually
        trackPage: true,
  
        // number (defaults to 50); time to wait after a route update before it should
        // track the page change, to implement this, make sure your `trackPage` property is set to `true`
        trackPageDelay: 50,
  
        // If you need to proxy events through a custom endpoint,
        // add a `host` property (defaults to https://cdn.segment.io)
        // Segment docs:
        //   - https://segment.com/docs/connections/sources/custom-domains
        //   - https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/#proxy
        // host: `https://override-segment-endpoint`,
  
        // boolean (defaults to false); whether to delay load Segment
        // ADVANCED FEATURE: only use if you leverage client-side routing (ie, Gatsby <Link>)
        // This feature will force Segment to load _after_ either a page routing change
        // or user scroll, whichever comes first. This delay time is controlled by
        // `delayLoadTime` setting. This feature is used to help improve your website's
        // TTI (for SEO, UX, etc).  See links below for more info.
        // NOTE: But if you are using server-side routing and enable this feature,
        // Segment will never load (because although client-side routing does not do
        // a full page refresh, server-side routing does, thereby preventing Segment
        // from ever loading).
        // See here for more context:
        // GIF: https://github.com/benjaminhoffman/gatsby-plugin-segment-js/pull/19#issuecomment-559569483
        // TTI: https://github.com/GoogleChrome/lighthouse/blob/master/docs/scoring.md#performance
        // Problem/solution: https://marketingexamples.com/seo/performance
        delayLoad: false,
  
        // number (default to 1000); time to wait after scroll or route change
        // To be used when `delayLoad` is set to `true`
        // delayLoadTime: 1000,
  
        // Whether to completely skip calling `analytics.load({writeKey})`.
        // ADVANCED FEATURE: only use if you are calling `analytics.load({writeKey})` manually
        // elsewhere in your code or are using a library
        // like: https://github.com/segmentio/consent-manager that will call it for you.
        // Useful for only loading the tracking script once a user has opted in to being tracked, for example.
        manualLoad: false
      }
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
          }
        `,
        feeds:[
          {
            serialize: ({ query: { site, allContentfulBlogs } }) => {
              return allContentfulBlogs.edges.map(edge => {
                return {
                  title: edge.node.title,
                  date: edge.node.createdAt,
                  url: `${site.siteMetadata.siteUrl}/blogs/${edge.node.slug}`,
                  enclosure: featureImage && {
                    url: `{edge.node.featureImage.src} `
                  }
                    //       url: siteUrl
                  // description: 
                  //   excerpt,
                  //   date,
                  //   guid: blogUrl,
                  //   enclosure: featuredImage && {
                  //       url: siteUrl + featuredImage.publicURL,
                  //   },
                  //   custom_elements: [{ 'content:encoded': html }],
               }
             })
            },
            query: `
            {
              allContentfulBlogs {
                edges {
                  node {
                    createdAt
                    title
                    slug
                    featureImage {
                      gatsbyImageData
                    }
                    childContentfulBlogsDescriptionTextNode {
                      childMarkdownRemark {
                        rawMarkdownBody 
                      }
                    }
                    }
                    }
                  }
                }
                       
            `,
            output: "/rss.xml",
            title: "Michael Lunzer's Blog",
          }
        ]
      }
     }
  ]
};
