import React, { Component } from "react";
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { Link } from "gatsby";
import moment from "moment";

import Layout from "../components/layout";
import SEO from "../components/seo";

export default class Projects extends Component {
  render() {
    const { data } = this.props;
    return (
      <Layout>
        <SEO
          title="Projects"
          keywords={[`Michael Lunzer`, `Customer Success Manager`, `Cloud`, `Projects`]}
        />
        <div className="site-container blogs-page" id="Blogs">
          <div className="container">
            <div className="section-head">
              <h1 className="line-heading h2">Projects</h1>
            </div>
            <ul
              className={`blogs-list ${
                data.allContentfulProjects.edges.length < 5 ? "few-blogs" : ""
              }`}
            >
              {data.allContentfulProjects.edges.map((item, index) => {
                return (
                  <li key={index} className="item">
                    <div className="inner">
                      <Link className="link" to={item.node.slug} />
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
                        <span className="date">
                          <i className="fas fa-calendar-alt"></i>{" "}
                          {moment(item.node.publishedDate).format("LL")}
                        </span>
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
  query ProjectsQuery {
    allContentfulProjects(sort: {fields: publishedDate, order: DESC}) {
      edges {
        node {
          title
          slug
          featureImage {
            gatsbyImageData
          }
          createdAt
          publishedDate
        }
      }
    }
  }
`;
