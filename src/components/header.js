import { Link } from "gatsby";
import React, { Component } from "react";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false
    };
  }

  render() {
    const { data, header } = this.props;
    const { menu } = this.state;
    return (
      <header className={`site-header ${menu ? "active" : ""}`}>
        <div className="container">
          <div className="header-main">
            <div className="logo">
              <Link to="/">
                {data.logo.file.url ? (
                  <img src={data.logo.file.url} alt="logo" />
                ) : (
                  <span>{data.siteName}</span>
                )}
              </Link>
            </div>
            <div
              className="responsive-menu"
              onClick={() => {
                this.setState({
                  menu: !menu
                });
              }}
            >
              <span></span>
            </div>
              <div className="menu">
                <ul>
                  <li>
                    <Link to="/#home">Home</Link>
                  </li>
                  {data.menus
                    .filter(item => item === "About")
                    .map(t => {
                      return (
                        <li>
                          <Link to={`/#About`}>About</Link>
                        </li>
                      );
                    })}
                  {data.menus
                    .filter(item => item === "Service")
                    .map(t => {
                      return (
                        <li>
                          <Link to={`/#Service`}>Service</Link>
                        </li>
                      );
                    })}
                  {data.menus
                    .filter(item => item === "Blogs")
                    .map(t => {
                      return (
                        <li>
                          <Link to={`/#Blogs`}>Blog</Link>
                        </li>
                      );
                    })}
                  {data.menus
                    .filter(item => item === "Projects")
                    .map(t => {
                      return (
                        <li>
                          <Link to={`/#Projects`}>Projects</Link>
                        </li>
                      );
                    })}
                  {/* {data.menus
                    .filter(item => item === "Work")
                    .map(t => {
                      return (
                        <li>
                          <Link to={`/#Work`}>Work</Link>
                        </li>
                      );
                    })} */}
                  {data.menus
                    .filter(item => item === "Testimonials")
                    .map(t => {
                      return (
                        <li>
                          <Link to={`/#Testimonials`}>Testimonials</Link>
                        </li>
                      );
                    })}
                  {data.menus
                    .filter(item => item === "Photos")
                    .map(t => {
                      return (
                        <li>
                          <Link to={`/#Photos`}>Photos</Link>
                        </li>
                      );
                    })}
                  {data.menus
                    .filter(item => item === "Bucket List")
                    .map(t => {
                      return (
                        <li>
                          <Link to={`/#BucketList`}>Bucket List</Link>
                        </li>
                      );
                    })}
                  {data.menus
                    .filter(item => item === "Contact")
                    .map(t => {
                      return (
                        <li>
                          <Link to={`/#Contact`}>Contact</Link>
                        </li>
                      );
                    })}
                  {data.menus
                    .filter(item => item === "Resume")
                    .map(t => {
                      return (
                        <li>
                          <Link to={`/resume`}>Resume</Link>
                        </li>
                      );
                    })}
                  {data.menus
                    .filter(item => item === "Map")
                    .map(t => {
                      return (
                        <li>
                          <Link to={`/#Map`}>Map</Link>
                        </li>
                      );
                    })}
                </ul>
          
              </div>

          </div>
        </div>
      </header>
    );
  }
}
