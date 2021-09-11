import React, { Component } from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

// import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';
// import "../css/style.css";

// import { Modal } from bootstrap;


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
              <h1 className="line-heading h2">
                {/* {data.contentfulResume.title} */}
                Request My Resume
                </h1>
              
              <p><b>Uploaded:</b> {data.contentfulResume.updatedAt}</p>
              <p>Enter your email here and a copy of my resume will be sent immediately to your inbox. 
                {/* There is a lot of personal information on a resume and this is to protect my privacy. */}
                </p>

            </div>
            {/* <Popup 
              trigger={ */}
              <div className="resume-container">
              {/* <div className="site-container blog-post"> */}
              <div>
                {/* <embed src={`https:${data.contentfulResume.pdf.file.url}`} className="pdf" type="application/pdf" /> */}
                {/* <div className="iframe-container"> */}
                <iframe src="https://cdn.forms-content.sg-form.com/e6f885c3-03c7-11ec-88cf-7e4d38212c3d" width="250" height="400"></iframe>
                </div>
              </div>
              </div>
              </div>

              {/* // <button className="button"> Open Modal </button>

              } position="top center" on="hover" modal>
               <div class="resume-popup-container"></div> */}
           

            {/* </Popup> */}

{/* <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#resumePopupModal">
  Launch demo modal
</button>

<div class="modal-dialog modal-dialog-scrollable" id="resumePopupModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <iframe src="https://cdn.forms-content.sg-form.com/e6f885c3-03c7-11ec-88cf-7e4d38212c3d"/>

</div> */}



{/* <!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

{/* <!-- Modal --> */}
{/* <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div> */}








{/* <Popup
    trigger={<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--Zl8C9zT0--/c_imagga_scale,f_auto,fl_progressive,h_500,q_auto,w_1000/https://thepracticaldev.s3.amazonaws.com/i/k2hqrpxwaz68a2nfrvj9.jpeg"></img>
  }
    modal
    nested
    on="click"
  >
    {close => (
      <div className="popupmodal">
        <button className="modalclose" onClick={close}>
          &times;
        </button>
        <div className="modalheader"> Resume Request Form </div>
        <div className="modalcontent">
          <div class="resume-popup-container"><iframe src="https://cdn.forms-content.sg-form.com/e6f885c3-03c7-11ec-88cf-7e4d38212c3d"/></div>

        </div> */}
        {/* <div className="modalactions">
          <Popup
            trigger={<button className="button"> Trigger </button>}
            position="top center"
            nested
          >
            <span>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
              magni omnis delectus nemo, maxime molestiae dolorem numquam
              mollitia, voluptate ea, accusamus excepturi deleniti ratione
              sapiente! Laudantium, aperiam doloribus. Odit, aut.
            </span>
          </Popup>
          <button
            className="button"
            onClick={() => {
              console.log('modal closed ');
              close();
            }}
          >
            close modal
          </button>
        </div> */}
      {/* </div> */}
    {/* )} */}
  {/* </Popup> */}


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
