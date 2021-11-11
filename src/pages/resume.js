import React, { Component } from "react";
import { graphql } from "gatsby";

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
        <div className="site-container blog-post">
          <div className="container">
            <div className="resume-container">
            <div className="section-head">
              <h1 className="line-heading h2">
                {/* {data.contentfulResume.title} */}
                Request My Resume
              </h1>
              
              <p><b>Uploaded:</b> {data.contentfulResume.updatedAt}</p>
              <p>Enter your email here and a copy of my resume will instantly be sent to your inbox. 
                {/* There is a lot of personal information on a resume and this is to protect my privacy. */}
              </p>

            </div>
            <div className="resume-flex">
            {/* <div className="site-container blog-post"> */}

              {/* <embed src={`https:${data.contentfulResume.pdf.file.url}`} className="pdf" type="application/pdf" /> */}
              {/* <div className="iframe-container"> */}
                <iframe src="https://cdn.forms-content.sg-form.com/e6f885c3-03c7-11ec-88cf-7e4d38212c3d" 
                height="475px" width="360px"
                ></iframe>



              </div>

              </div>
              </div>
              </div>




{/* 
            <div className="resume-container">
                <embed src={`https:${data.contentfulResume.pdf.file.url}`} className="pdf" type="application/pdf" />
            </div> */}
  
            {/* <p><b>Description:</b> {data.contentfulResume.description.description}</p> */}

          {/* </div>
        </div> */}
      </Layout>
      );
    }
  }







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
