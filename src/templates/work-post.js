import React, { Component } from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import moment from "moment";
import { DiscussionEmbed } from "disqus-react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Share from "../components/share";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

export default class workPost extends Component {
  render() {
    const data = this.props.data.contentfulWorks;
    const disqusShortname = "RohitGupta";
    const disqusConfig = {
      identifier: data.id,
      title: data.siteName
    };

    const siteurl = this.props.data.contentfulSiteInformation.siteUrl + "/";
    const twiteerhandle = this.props.data.contentfulSiteInformation
      .twiteerHandle;
    const socialConfigss = {
      site: {
        siteMetadata: { siteurl, twiteerhandle }
      },
      title: data.siteName,
      slug: data.slug
    };

    return (
      <Layout>
        <SEO
          title={data.siteName}
          keywords={[
            `Michael Lunzer`,
            `Customer Success Manager`,
            `Technical Account Manager`,
            `${data.siteName}`
          ]}
        />
        <div className="site-container blog-post">
          <div className="container">
            {data.featuredImage ? (
              <Img
                className="feature-img"
                fixed={data.featuredImage.fluid}
                objectFit="cover"
                objectPosition="50% 50%"
              />
            ) : (
              <div className="no-image"></div>
            )}

            <div className="details">
              <h1 className="title">{data.siteName}</h1>
              <span className="date">
                <i class="fas fa-calendar-alt"></i>{" "}
                {moment(data.createdAt).format("LL")}
              </span>
              {/* <div
                dangerouslySetInnerHTML={{
                  __html: data.body.childMarkdownRemark.html
                }}
              /> */}
              <div>
              {documentToReactComponents(data.body.json)}

              </div>
            </div>
            <Share
              socialConfig={{
                ...socialConfigss.site.siteMetadata.twiteerhandletitle,
                config: {
                  url: `${siteurl}${socialConfigss.slug}`,
                  title: `${socialConfigss.title}`
                }
              }}
            />
            <DiscussionEmbed
              shortname={disqusShortname}
              config={disqusConfig}
            />
          </div>
        </div>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
query SingleWorkQuery($slug: String!) {
    contentfulWorks(slug: { eq: $slug }) {
      id
      slug
      siteName
      body {
        json
      }
      featuredImage {
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
      createdAt
    }
    contentfulSiteInformation {
      siteUrl
      twiteerHandle
    }
  }
`;
