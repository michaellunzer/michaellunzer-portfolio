import React, { Component } from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import { graphql } from "gatsby";
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
                    <div 
                    className="inner"
                    onClick={() => {
                      this.setState({
                        activePopup: true,
                        selectedItem: index
                      });
                    }}
                    >

                      {/* <Link className="link" to={item.node.slug} /> */}
                      {item.node.featureImage ? (
                        <GatsbyImage
                          image={item.node.featureImage.gatsbyImageData}
                          objectFit="cover"
                          objectPosition="50% 50%" />
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
            {activePopup ? (
              <div className="rg-popup">
                <span
                  className="popup-layer"
                  onClick={() => {
                    this.setState({
                      activePopup: false
                    });
                  }}
                ></span>

                <div className="popup-inner">
                  <i
                    className="fas fa-times"
                    onClick={() => {
                      this.setState({
                        activePopup: false
                      });
                    }}
                  ></i>
                  <div className="BucketListPopup"> {/* Need to add CSS to make the image responsive */}
                  <div className={"accomplished" + data.allContentfulBucketList.edges[this.state.selectedItem].node.accomplished}>
                  <span className="name"><h2>{data.allContentfulBucketList.edges[this.state.selectedItem].node.title}</h2></span>
                      {/* this is where you place the caption */}
                    <img
                    src={data.allContentfulBucketList.edges[this.state.selectedItem].node.featureImage.file.url}
                    alt="popup-img"
                  />
                  <div
                  dangerouslySetInnerHTML={{
                  __html: data.allContentfulBucketList.edges[this.state.selectedItem].node.description.childMarkdownRemark.html
                }}
                  />
                  </div>
                </div>
                </div>
                </div>
            )  : (
              ""
            )}
          </div>
        </div>
      </Layout>
    );
  }
}

// original query 
//
// export const pageQuery = graphql`
// query BucketListPageQuery {
//   allContentfulBucketList(sort: { fields: dateAccomplished, order: DESC }) {
//     edges {
//       node {
//         title
//         id
//         slug
//         description {
//           description
//           childMarkdownRemark {
//             html
//           }
//         }
//         accomplished
//         dateAccomplished
//         featureImage {
//           file {
//             url
//           }
//           gatsbyImageData
//           fluid(maxWidth: 600) {
//             base64
//             aspectRatio
//             src
//             srcSet
//             srcWebp
//             srcSetWebp
//             sizes
//           }
//         }
//       }
//     }
//   }
// }
// `;


// without fluid
export const pageQuery = graphql`
query BucketListPageQuery {
  allContentfulBucketList(sort: { fields: dateAccomplished, order: DESC }) {
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
          file {
            url
          }
          gatsbyImageData
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
