import React, { Component } from "react";
import Img from "gatsby-image";
import { graphql } from "gatsby";
import { Link } from "gatsby";
import moment from "moment";

import Layout from "../components/layout";
import SEO from "../components/seo";

export default class BucketListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePopup: false,
      selectedItem: 0
    };
  }

  render() {
    const { data } = this.props;
    const { activePopup, selectedItem } = this.state;

    return (
      <Layout>
        <SEO
          title="Bucket List"
          keywords={[`Michael Lunzer`, `Customer Success Manager`, `Cloud`, `Bucket List`]}
        />
        <div className="site-container blogs-page" id="Blogs">
          <div className="container">
            <div className="section-head">
              <h1 className="line-heading h2">Bucket List</h1>
            </div>
            <ul
              className={`blogs-list ${
                data.allContentfulBucketList.edges.length < 5 ? "few-blogs" : ""
              }`}
            >
              {data.allContentfulBucketList.edges.map((item, index) => {
                return (
                  <li key={index} className="item">
                  <div className={"accomplished" + item.node.accomplished}>
                    <div className="inner">

                      {/* <Link className="link" to={item.node.slug} /> */}
                      {item.node.featureImage ? (
                        <Img
                          fixed={item.node.featureImage.fluid}
                          objectFit="cover"
                          objectPosition="50% 50%"
                        />
                      ) : (
                        <div className="no-image"></div>
                      )}
                      <div className="details">
                        <h3 className="title">{item.node.title}</h3>
                       {item.node.dateAccomplished ? ( 
                        <span className="date">
                          <i className="fas fa-calendar-alt"></i>{" "}
                          {moment(item.node.dateAccomplished).format("LL")}
                        </span>
                       ) : (
                         <span className="date">
                        <i className="fas fa-calendar-alt"></i>{" "}
                        TBD
                        </span>
                       )}
                      </div>
                    </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Layout>
    );
  }
}
export const pageQuery = graphql`
query BucketListPageQuery {
  allContentfulBucketList(sort: {fields: dateAccomplished, order: DESC})  {
      edges {
        node {
          title
          id
          slug
          description {
            description
            childMarkdownRemark {
              html
            }
          }
          accomplished
          dateAccomplished
					featureImage {
					fluid(maxWidth: 1500) {
					base64
					aspectRatio
					src
					srcSet
					srcWebp
					srcSetWebp
					sizes
					}
					}
        }
      }
    }
  }
`;





// export const pageQuery = graphql`
// query BucketListPageQuery {
//   contentfulBucketList {
//     id
//     title
//     slug
//     description {
//       description
//       childMarkdownRemark {
//         html
//         }
//     }
//     photos {
//       title
//       file {
//         url
//       }
//       fluid(maxWidth: 600) {
//         base64
//         aspectRatio
//         src
//         srcSet
//         srcWebp
//         srcSetWebp
//         sizes
//       }
//     }
//   }
// }
// `;
