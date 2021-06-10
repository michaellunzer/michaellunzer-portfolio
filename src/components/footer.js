import React, { Component } from "react";

export default class footer extends Component {
  render() {
      const footerDate = new Date();
      const currentYear = footerDate.getFullYear();
    return (
      <div className="site-footer" id="footer">
        <div className="container">
          <span>Copyright &copy; {this.props.siteName} {currentYear}</span>
        </div>
      </div>
    );
  }
}

