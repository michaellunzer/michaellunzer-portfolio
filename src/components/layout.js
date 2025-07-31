"use client";

import React from "react";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.css";
import Header from "./header";
import Footer from "./footer";
import "../css/style.css";
import "../css/font-awesome.css";

if (typeof window !== "undefined") {
  require("smooth-scroll")('a[href*="#"]');
}

const Layout = ({ children, header, siteInfo }) => {
  return (
    <>
      <Header
        data={siteInfo}
        siteTitle={siteInfo?.fields?.siteName}
        header={header}
      />
      <div>
        <main id="home">{children}</main>
      </div>
      <Footer siteName={siteInfo?.fields?.siteName} />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.string,
  siteInfo: PropTypes.object
};

export default Layout;
