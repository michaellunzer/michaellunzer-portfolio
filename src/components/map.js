// import React from "react"

// import React, { Component } from "react";
// const MyMap = () => (
//   <div class="map-holder">
//   <iframe src="https://www.google.com/maps/d/u/0/embed?mid=17ijR5B6bvvIgiqRFaEdr0EzwDDU"></iframe>
//   </div>
// )

// export default MyMap




//  #### NEW STUFF

import React, { Component } from "react";

export default class Map extends Component {
  render() {
    return (
      <div className="blogs-section" id="Map">
      <div className="container">
        <div className="section-head">
          <h2 className="text-center">Everywhere I've Been</h2>
        </div>
        </div>
      <div class="map-holder">
      <iframe src="https://www.google.com/maps/d/u/0/embed?mid=17ijR5B6bvvIgiqRFaEdr0EzwDDU"></iframe>
      </div>

      </div>
    );
  }
}

