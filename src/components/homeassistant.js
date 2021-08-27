




















// // import React, { Component, useState, useEffect } from "react";
// // class HomeAssistant extends Component {
// //   constructor(props) {
// //       super(props);

// //       this.state = {
// //         haTemp: null
// //       };
// //   }
// //   // render() {

// // // const HomeAssistant = () => {
// //   // function 
// //   render() {
// //     // const [haTemp, setHaTemp] = useState('');
// //     const headers = { 'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI5NWY5ODI2YTFhYzU0ZmIwOTlmYzg5MjNkNGYyYzUxZiIsImlhdCI6MTYyNDY1NDI4MiwiZXhwIjoxOTQwMDE0MjgyfQ.fQLypZBR8ju5KV8shkakoL94Oa4WR1er6ZTK5ASv1nU',
// //     'Content-Type': 'application/json'
// //     }
  
// //     // useEffect (() => {
// //     // get data from Home Assistant api
// //     fetch(`https://home.michaellunzer.com/api/states/sensor.sn1_temperature`, { headers})
// //       .then(response => response.json()) // parse JSON from request
// //       .then(resultData => this.setState({ haTemp: resultData.state }));
// //       // }) // set data for the current temp
// //   //  [])

// //     return (
// //       <div className="blogs-section" id="HomeAssistant">
// //       <div className="container">
// //         <div className="section-head">
// //           <h2 className="text-center">Home Assistant Stats</h2>
// //         </div>
// //         </div>
// //       <div class="map-holder"> {/* //should rename this div class */}
// //         {/* // this is where the items go */}
// //         <p>
// //           current temperature in my room {haTemp}
// //         </p>
// //       </div>
// //       </div>
// //     );
// //   }
// // }



// // export default { HomeAssistant };

// import React from 'react';

// class GetRequestSetHeaders extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             totalReactPackages: null
//         };
//     }

//     componentDidMount() {
//         // GET request using fetch with set headers
//         const headers = { 'Content-Type': 'application/json' }
//         fetch('https://api.npms.io/v2/search?q=react', { headers })
//             .then(response => response.json())
//             .then(data => this.setState({ totalReactPackages: data.total }));
//     }

//     render() {
//         const { totalReactPackages } = this.state;
//         return (
//             <div className="card text-center m-3">
//                 <h5 className="card-header">GET Request with Set Headers</h5>
//                 <div className="card-body">
//                     Total react packages: {totalReactPackages}
//                 </div>
//             </div>
//         );
//     }
// }

// export { GetRequestSetHeaders }; 