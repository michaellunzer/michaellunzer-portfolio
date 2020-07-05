import React, { Component } from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import { Link } from "gatsby";
import moment from "moment";

import Layout from "../components/layout";
import SEO from "../components/seo";


export default class Resume extends Component {
  render() {
    const { data } = this.props;
    return (
        <Layout>
        <SEO
          title="Resume"
          keywords={[`Michael Lunzer`, `Customer Success Manager`, `Cloud`, `Blogs`]}
        />
        <div className="site-container resume-page" id="Resume">
          <div className="container">
            <div className="section-head">
              <h1 className="line-heading h2">{data.contentfulResume.title}</h1>
              <p><b>Uploaded:</b> {data.contentfulResume.createdAt}</p>
            </div>
            <embed src={`https:${data.contentfulResume.pdf.file.url}`} class="pdf" type="application/pdf" />
            

            {/* <p><b>Description:</b> {data.contentfulResume.description.description}</p> */}

          </div>
        </div>
      </Layout>
      );
    }
  }





// export default class Blogs extends Component {
//   render() {
//     const { data } = this.props;
//     return (
//       <Layout>
//         <SEO
//           title="Resume"
//           keywords={[`Michael Lunzer`, `Customer Success Manager`, `Cloud`, `Blogs`]}
//         />
//         <div className="site-container blogs-page" id="Blogs">
//           <div className="container">
//             <div className="section-head">
//               <h1 className="line-heading h2">Blogs</h1>
//             </div>
//             <ul
//               className={`blogs-list ${
//                 data.allContentfulBlogs.edges.length < 5 ? "few-blogs" : ""
//               }`}
//             >
//               {data.allContentfulBlogs.edges.map((item, index) => {
//                 return (
//                   <li key={index} className="item">
//                     <div className="inner">
//                       <Link className="link" to={item.node.slug} />
//                       {item.node.featureImage ? (
//                         <Img
//                           fixed={item.node.featureImage.fluid}
//                           objectFit="cover"
//                           objectPosition="50% 50%"
//                         />
//                       ) : (
//                         <div className="no-image"></div>
//                       )}
//                       <div className="details">
//                         <h3 className="title">{item.node.title}</h3>
//                         <span className="date">
//                           <i className="fas fa-calendar-alt"></i>{" "}
//                           {moment(item.node.createdAt).format("LL")}
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

export const pageQuery = graphql`
query ResumeQuery {
    contentfulResume {
      title 
      updatedAt (formatString: "MMMM Do, YYYY")
      pdf {
        title
        file {
          url
        }
      }
      createdAt (formatString: "MMMM Do, YYYY")
      description {
        description
      }
    }
  }
    
`;
