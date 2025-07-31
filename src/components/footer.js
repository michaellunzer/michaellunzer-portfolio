import React from "react";

export default function Footer({ siteName }) {
  const footerDate = new Date();
  const currentYear = footerDate.getFullYear();
  
  return (
    <div className="site-footer" id="footer">
      <div className="container">
        <span>Copyright &copy; {siteName} {currentYear}</span>
      </div>
    </div>
  );
}

