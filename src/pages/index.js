import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

import Banner from "../components/banner";
import About from "../components/about";
import Service from "../components/service";
import Blogs from "../components/blogs";
import Testimonial from "../components/testimonial";
import Contact from "../components/contact";
import Map from "../components/map";
// import Resume from "../components/resume";
import Projects from "../components/projects";
import BucketList from "../components/bucketlist"

const IndexPage = ({ data }) => (
  <Layout header="home">
    <SEO
      title={data.contentfulAboutMe.designation} 
      keywords={[`Michael Lunzer`, `Customer Success Manager`, `Technical Account Manager`]}
    />
    <Banner data={data.contentfulAboutMe}></Banner>

    {data.contentfulSiteInformation.menus
      .filter(item => item === "About")
      .map(t => {
        return <About data={data.contentfulAboutMe}></About>;
      })}

    {data.contentfulSiteInformation.menus
      .filter(item => item === "Service")
      .map(t => {
        return <Service data={data.allContentfulService}></Service>;
      })}

    {data.contentfulSiteInformation.menus
      .filter(item => item === "Blogs")
      .map(t => {
        return <Blogs data={data.allContentfulBlogs}></Blogs>;
      })}

    {data.contentfulSiteInformation.menus
      .filter(item => item === "Projects")
      .map(t => {
        return <Projects data={data.allContentfulProjects}></Projects>;
      })}

    {data.contentfulSiteInformation.menus
      .filter(item => item === "Testimonials")
      .map(t => {
        return (
          <Testimonial data={data.allContentfulTestimonials}></Testimonial>
        );
      })}

    {data.contentfulSiteInformation.menus
      .filter(item => item === "Bucket List")
      .map(t => {
        return <BucketList data={data.allContentfulBucketList}></BucketList>;
      })}

    {data.contentfulSiteInformation.menus
      .filter(item => item === "Contact")
      .map(t => {
        return <Contact data={data.contentfulAboutMe.gmail}></Contact>;
      })}

    {/* {data.contentfulSiteInformation.menus
      .filter(item => item === "Resume")
      .map(t => {
        return <Resume data={data.allContentfulResume}></Resume>;
      })} */}

      {/* <Resume /> */}

      <Map />
  </Layout>
);

export default IndexPage;

export const pageQuery = graphql`
  query AboutQuery {
    contentfulAboutMe {
      name
      photo {
        file {
          url
        }
        gatsbyImageData
      }
      designation
      facebook
      github
      gmail
      id
      instagram
      linkdin
      twitter
      soundcloud
      spotify
      location
      description {
        childMarkdownRemark {
          html
        }
      }
      bannerImage {
        gatsbyImageData
      }
      bannerList
    }
    allContentfulService {
      edges {
        node {
          title
          description {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
    allContentfulBlogs(limit: 5, sort: {fields: createdAt, order: DESC}) {
      edges {
        node {
          title
          slug
          featureImage {
            gatsbyImageData
          }
          createdAt
        }
      }
    }
    allContentfulProjects(limit: 5, sort: {fields: publishedDate, order: DESC}) {
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
    allContentfulTestimonials {
      edges {
        node {
          name
          subTitle
          description {
            childMarkdownRemark {
              html
            }
          }
          avatarImage {
            gatsbyImageData
          }
        }
      }
    }
    allContentfulResume (limit: 5, sort: {fields: createdAt, order: DESC}) {
      edges {
        node {
          title
          slug
          featureImage {
            gatsbyImageData
            }
            createdAt
        }
      }
    }
    allContentfulBucketList(limit: 5, sort: {fields: dateAccomplished, order: DESC})  {
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
            gatsbyImageData
					}
        }
      }
    }
    contentfulSiteInformation {
      menus
    }
  }
`;
