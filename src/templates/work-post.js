import React, { Component } from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import moment from "moment";
import { DiscussionEmbed } from "disqus-react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Share from "../components/share";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from '@contentful/rich-text-types'; 
import Iframe from "../components/iframe";

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
    const options = {
      renderNode: {
          [BLOCKS.EMBEDDED_ASSET]: (node) => {
              const alt = node.data.target.fields.title['en-US']
              const url = node.data.target.fields.file['en-US'].url
              return <img alt={alt} src={url} />
          }
          ,
      //     // add render options for embedded-entry-inline

      //     // [INLINES.HYPERLINK]: (node) => {
      //     //   const iframe_title = node.data.title;
      //     //   const iframe_url = node.data.uri;
      // renderiframeNode: {
          [INLINES.EMBEDDED_ENTRY]: (node) => {
            // const iframe_title = node.data.title;
            // const iframe_url = node.data.uri;
              const iframe_title = node.data.target.fields.title['en-US']
              const iframe_url = node.data.target.fields.url['en-US']
              const iframe_id = node.data.target.sys.contentType.sys.id
              const iframe_description = node.data.target.fields.description['en-US'];
              const iframe_height = node.data.target.fields.height['en-US'];
              const iframe_width = node.data.target.fields.width['en-US'];
              // if type ID is "iframe", return an iframe
              if (node.data.target.sys.contentType.sys.id == "iframe") {
                return (
                  // <div><p>
                  //       { iframe_id }
                  //       { iframe_url }
                  // </p>
                  // </div>
                  
                          <iframe
                              title={iframe_title}
                              width="560"
                              height="315"
                              src={iframe_url}
                              frameBorder="0"
                              allow="accelerometer; autoplay; encrypted-media; gyroscope;"
                              allowFullScreen
                              ></iframe>
                        )
          }
              // return (
              // <Iframe title={iframe_title} description={iframe_description} src={iframe_url} height={iframe_height} width={iframe_width} />
              //     // add code to pass variables to iframe.js component [ ] do this tomorrow
              // )
              // };


       // example for custom component
                  // [BLOCKS.EMBEDDED_ENTRY]: (node) => {
                  //   const { title, description } = node.data.target.fields;
                  //   return <CustomComponent title={title} description={description} />
                  // }
                
              



            //  [INLINES.HYPERLINK]: node => {
            //    if (node.data.uri.indexOf("youtube.com") !== -1) {
            //      // if entry is video, return an iframe
            //      return (
            //        <iframe
            //           title={node.data.title}
            //           width="560"
            //           height="315"
            //           src={node.data.uri}
            //           frameBorder="0"
            //           allow="accelerometer; autoplay; encrypted-media; gyroscope;"
            //           allowFullScreen
            //           ></iframe>
            //      )
              //  }
             } 
          }
        
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
              <div>
              {documentToReactComponents(data.body.json, options)}

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
