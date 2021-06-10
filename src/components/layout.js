import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
// import * as bootstrap from "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.css";

import Header from "./header";
import Footer from "./footer";

// import * as styles from "../css/style.css";
// import * as fontawesome from "../css/font-awesome.css";
import "../css/style.css";
import "../css/font-awesome.css";

if (typeof window !== "undefined") {
  require("smooth-scroll")('a[href*="#"]');
}

const Layout = ({ children, header }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        contentfulSiteInformation {
          siteName
          siteDescription
          logo {
            file {
              url
            }
          }
          menus
        }
      }
    `}
    
    render={data => (
      <>
        <Header
          data={data.contentfulSiteInformation}
          siteTitle={data.contentfulSiteInformation.siteName}
          header={header}
        />
        <div>
          <main id="home">{children}</main>
        </div>
        <Footer siteName={data.contentfulSiteInformation.siteName} />
      </>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
