// this page was extremely helpful: 
// https://swas.io/blog/using-multiple-queries-on-gatsbyjs-createpages-node-api/
//  


var path = require("path");

exports.createPages = ({ graphql, boundActionCreators }) => {
    const { createPage } = boundActionCreators;
  // return new Promise((resolve, reject) => {
    const blogPostTemplate = path.resolve("src/templates/blog-post.js");
    const workPostTemplate = path.resolve("src/templates/work-post.js");
    // Individual Blogs pages
    const blogs = graphql(`
        {
          allContentfulBlogs(limit: 100) {
            edges {
              node {
                id
                slug
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          Promise.reject(result.errors);
        }
        result.data.allContentfulBlogs.edges.forEach(edge => {
          createPage({
            path: edge.node.slug,
            component: blogPostTemplate,
            context: {
              slug: edge.node.slug
            }
          });
        });
        // return;
      })

// Individual work post pages
    const works = graphql(`
    {
      allContentfulWorks(limit: 100) {
        edges {
          node {
            id
            slug
          }
        }
      }
    }`).then(result => {
      if (result.errors) {
        Promise.reject(result.errors);
      }
      result.data.allContentfulWorks.edges.forEach(edge => {
        createPage({
          path: edge.node.slug,
          component: workPostTemplate,
          context: {
            slug: edge.node.slug
          }
        });
      });
      // return;
    })

    return Promise.all([blogs, works]);

    };