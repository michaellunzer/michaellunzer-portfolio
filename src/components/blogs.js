import React, { Component } from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import { Link } from "gatsby";
import moment from "moment";

export default class Blogs extends Component {
  render() {
    const { data } = this.props;
    return (
      <div className="blogs-section section" id="Blogs">
        <div className="container">
          <div className="section-head">
            <h2>Blog Posts</h2>
          </div>
          <ul
            className={`blogs-list ${data.edges.length < 5 ? "few-blogs" : ""}`}
          >
            {data.edges.map((item, index) => {
              return (
                <li key={index} className="item">
                  <div className="inner">
                    <Link className="link" to={"blogs/" + item.node.slug} />

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
                        {moment(item.node.createdAt).format("LL")}
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="see-more">
            <Link to="/blogs">
              <span>More Blog Posts</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
