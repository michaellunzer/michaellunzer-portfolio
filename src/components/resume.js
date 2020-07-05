// import React, { Component } from "react";
// import Img from "gatsby-image";
// import { Link, graphql, useStaticQuery } from "gatsby";
// import moment from "moment";

// const Resume = () => {
//     const data = useStaticQuery(graphql`
//     query {
//         allContentfulResume (limit: 5, sort: {fields: createdAt, order: DESC}) {
//           edges {
//             node {
//               title
//               slug
//               featureImage {
//                   fluid(maxWidth: 600) {
//                     base64
//                     aspectRatio
//                     src
//                     srcSet
//                     srcWebp
//                     srcSetWebp
//                     sizes
//                   }
//                 }
//                 createdAt
//             }
//           }
//         }
//         }
//     `)
//     return (
// <div className="blogs-section section" id="Blogs">
//         <div className="container">
//           <div className="section-head">
//             <h2>Resume</h2>
//           </div>

//                     <Link className="link" to='/resume' />
//                       <Img
//                         fixed={data.allContentfulResume.edges.node.featureImage.fluid}
//                         objectFit="cover"
//                         objectPosition="50% 50%"
//                       />

//                     <div className="details">
//                       <h3 className="title">{data.allContentfulResume.edges.node.title}</h3>
//                       <span className="date">
//                         <i className="fas fa-calendar-alt"></i>{" "}
//                         {moment(data.allContentfulResume.edges.node.createdAt).format("LL")}
//                       </span>
//                     </div>
//                   </div>
//       </div>
//     );

// export default Resume





// // export default class Resume extends Component {
// //   render() {
// //     const { data } = this.props;
// //     return (
// //       <div className="blogs-section section" id="Blogs">
// //         <div className="container">
// //           <div className="section-head">
// //             <h2>Resume</h2>
// //           </div>

// //                     <Link className="link" to='/resume' />
// //                       <Img
// //                         fixed={data.allContentfulResume.edges.node.featureImage.fluid}
// //                         objectFit="cover"
// //                         objectPosition="50% 50%"
// //                       />

// //                     <div className="details">
// //                       <h3 className="title">{data.allContentfulResume.edges.node.title}</h3>
// //                       <span className="date">
// //                         <i className="fas fa-calendar-alt"></i>{" "}
// //                         {moment(data.allContentfulResume.edges.node.createdAt).format("LL")}
// //                       </span>
// //                     </div>
// //                   </div>
// //       </div>
// //     );
// //   }
// // }
