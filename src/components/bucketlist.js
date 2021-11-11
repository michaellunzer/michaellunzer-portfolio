import React, { Component } from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import { Link } from "gatsby";
import moment from "moment";


// export default class BucketListPage extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       activePopup: false,
//       selectedItem: 0
//     };
//   }

//   render() {
//     const { data } = this.props;
//     const { activePopup, selectedItem } = this.state;

//     return (
//         <div className="site-container blogs-page" id="Blogs">
//           <div className="container">
//             <div className="section-head">
//               <h1 className="line-heading h2">Bucket List</h1>
//             </div>
//             <ul
//               className={`blogs-list ${
//                 data.allContentfulBucketList.edges.node.length < 5 ? "few-blogs" : ""
//               }`}
//             >
//               {data.allContentfulBucketList.edges.map((item, index) => {
//                 return (
//                   <li key={index} className="item">
//                   <div className={"accomplished" + item.node.accomplished}>
//                     <div 
//                     className="inner"
//                     onClick={() => {
//                       this.setState({
//                         activePopup: true,
//                         selectedItem: index
//                       });
//                     }}
//                     >

//                       {/* <Link className="link" to={item.node.slug} /> */}
//                       {item.node.featureImage ? (
//                         <GatsbyImage
//                           image={item.node.featureImage.gatsbyImageData}
//                           objectFit="cover"
//                           objectPosition="50% 50%" />
//                       ) : (
//                         <div className="no-image"></div>
//                       )}
//                       <div className="details">
//                         <h3 className="title">{item.node.title}</h3>
//                        {item.node.dateAccomplished ? ( 
//                         <span className="date">
//                           <i className="fas fa-calendar-alt"></i>{" "}
//                           {moment(item.node.dateAccomplished).format("LL")}
//                         </span>
//                        ) : (
//                          <span className="date">
//                         <i className="fas fa-calendar-alt"></i>{" "}
//                         TBD
//                         </span>
//                        )}
//                       </div>
//                     </div>
//                     </div>
//                   </li>
//                 );
//               })}
//             </ul>
//             {activePopup ? (
//               <div className="rg-popup">
//                 <span
//                   className="popup-layer"
//                   onClick={() => {
//                     this.setState({
//                       activePopup: false
//                     });
//                   }}
//                 ></span>

//                 <div className="popup-inner">
//                   <i
//                     className="fas fa-times"
//                     onClick={() => {
//                       this.setState({
//                         activePopup: false
//                       });
//                     }}
//                   ></i>
//                   <div className="BucketListPopup"> {/* Need to add CSS to make the image responsive */}
//                   <div className={"accomplished" + data.allContentfulBucketList.edges[this.state.selectedItem].node.accomplished}>
//                   <span className="name"><h2>{data.allContentfulBucketList.edges[this.state.selectedItem].node.title}</h2></span>
//                       {/* this is where you place the caption */}
//                     <img
//                     src={data.allContentfulBucketList.edges[this.state.selectedItem].node.featureImage.file.url}
//                     alt="popup-img"
//                   />
//                   <div
//                   dangerouslySetInnerHTML={{
//                   __html: data.allContentfulBucketList.edges[this.state.selectedItem].node.description.childMarkdownRemark.html
//                 }}
//                   />
//                   </div>
//                 </div>
//                 </div>
//                 </div>
//             )  : (
//               ""
//             )}
//           </div>
//         </div>
//     );
//   }
// }






export default class BucketList extends Component {
  render() {
    const { data } = this.props;
    return (
      <div className="blogs-section section" id="BucketList">
        <div className="container">
          <div className="section-head">
            <h2>Bucket List</h2>
          </div>
          <ul
            className={`blogs-list ${data.edges.length < 5 ? "few-blogs" : ""}`}
          >
            {data.edges.map((item, index) => {
              return (
                <li key={index} className="item">
                <div className={"accomplished" + item.node.accomplished}>
                  <div className="inner">
                    {/* <Link className="link" to={"bucketlist/" + item.node.slug} /> */}

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
          <div className="see-more">
            <Link to="/bucketlist">
              <span>Full Bucket List</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
