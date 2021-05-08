import React, { Component } from "react";

export default class footer extends Component {
  render() {
    return (
      <div className="site-footer" id="footer">
        <div className="container">
          <span>Copyright &copy; {this.props.siteName} 2021</span>
        </div>
      </div>
    );
  }
}
