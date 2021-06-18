import React, { Component } from "react";
import { GatsbyImage } from "gatsby-plugin-image";

export default class Banner extends Component {
  render() {
    const { data } = this.props;
    return (
      <div className="banner">
        <GatsbyImage
          image={data.bannerImage.gatsbyImageData}
          objectFit="cover"
          objectPosition="50% 50%" />
        <div className="container">
          <div className="banner-details">
            <span>Hello!</span>
            <h1>I'm {data.name}.</h1>
            <ul className="sub-data">
              {data.bannerList.map((item, index) => {
                return <li key={index}>{item}</li>;
              })}
            </ul>
            <ul className="social">
            <li>
                <a
                  className="fab fa-linkedin-in"
                  href={data.linkdin}
                  target="_blank"
                  rel="noopener noreferrer"
                ></a>
              </li>
              <li>
                <a
                  className="fab fa-github"
                  href={data.github}
                  target="_blank"
                  rel="noopener noreferrer"
                ></a>
              </li>
              <li>
                <a
                  className="fab fa-twitter"
                  href={data.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                ></a>
              </li>
              {/* <li>
                <a
                  className="fab fa-facebook-f"
                  href={data.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                ></a>
              </li> */}
              <li>
                <a
                  className="fab fa-instagram"
                  href={data.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                ></a>
              </li>
              <li>
                <a
                  className="fab fa-soundcloud"
                  href={data.soundcloud}
                  target="_blank"
                  rel="noopener noreferrer"
                ></a>
              </li>
              <li>
                <a
                  className="fab fa-spotify"
                  href={data.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                ></a>
              </li>
              <li>
                <a
                  className="fa fa-rss"
                  href="https://michaellunzer.com/rss.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                ></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
