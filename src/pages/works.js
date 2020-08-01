// import React, { Component } from "react";
// import { graphql } from "gatsby";
// import Img from "gatsby-image";
// import { Link } from "gatsby";
// import moment from "moment";

// import Layout from "../components/layout";
// import SEO from "../components/seo";

// export default class Blogs extends Component {
//   render() {
//     const { data } = this.props;
//     return (
//       <Layout>
//         <SEO
//           title="Works"
//           keywords={[`Michael Lunzer`, `Customer Success Manager`, `Cloud`, `Blogs`]}
//         />
//         <div className="site-container blogs-page" id="Blogs">
//           <div className="container">
//             <div className="section-head">
//               <h1 className="line-heading h2">Projects</h1>
//             </div>
//             <ul
//               className={`blogs-list ${
//                 data.allContentfulWorks.edges.length < 5 ? "few-blogs" : ""
//               }`}
//             >
//               {data.allContentfulWorks.edges.map((item, index) => {
//                 return (
//                   <li key={index} className="item">
//                     <div className="inner">
//                       <Link className="link" to={item.node.slug} />
//                       {item.node.featuredImage ? (
//                         <Img
//                           fixed={item.node.featuredImage.fluid}
//                           objectFit="cover"
//                           objectPosition="50% 50%"
//                         />
//                       ) : (
//                         <div className="no-image"></div>
//                       )}
//                       <div className="details">
//                         <h3 className="title">{item.node.siteName}</h3>
//                         <span className="date">
//                           <i className="fas fa-calendar-alt"></i>{" "}
//                           {moment(item.node.publishedDate).format("LL")}
//                         </span>
//                       </div>
//                     </div>
//                   </li>
//                 );
//               })}
//             </ul>
//           </div>
//         </div>
//       </Layout>
//     );
//   }
// }

// export const pageQuery = graphql`
// query WorksQuery {
//     allContentfulWorks(sort: {fields: publishedDate, order: DESC}) {
//       edges {
//         node {
//           siteName
//           slug
//           featuredImage {
//             fluid(maxWidth: 1500) {
//               base64
//               aspectRatio
//               src
//               srcSet
//               srcWebp
//               srcSetWebp
//               sizes
//             }
//           }
//           publishedDate
//           createdAt
//         }
//       }
//     }
//   }
// `;
