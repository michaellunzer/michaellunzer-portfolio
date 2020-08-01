import React, { Component } from "react";
import PropTypes from 'prop-types'

class Iframe extends Component {
  render() {
    return (
      <div className="contact section" id="Map">
      <div class="iframe">
      <iframe 
      title={this.props.iframe_title} 
      description={this.props.iframe_description} 
      src={this.props.iframe_url} 
      height={this.props.iframe_height} 
      width={this.props.iframe_width}>
      </iframe>
      </div>
      </div>
    )
  }
}

export default Iframe