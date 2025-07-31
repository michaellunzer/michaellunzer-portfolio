"use client";

import React from "react";
import PropTypes from "prop-types";

const Share = ({ socialConfig }) => {
  const handleFacebookShare = () => {
    const url = encodeURIComponent(socialConfig.config.url);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  const handleTwitterShare = () => {
    const url = encodeURIComponent(socialConfig.config.url);
    const title = encodeURIComponent(socialConfig.config.title);
    const via = encodeURIComponent(socialConfig.twitterHandle || 'michaellunzer');
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}&via=${via}`, '_blank');
  };

  return (
    <div className="post-social">
      <h6 className="title is-6">Share:</h6>
      <button
        onClick={handleFacebookShare}
        className="button is-outlined is-rounded facebook"
      >
        <span className="icon">
          <i className="fab fa-facebook-f"></i>
        </span>
        <span className="text">Facebook</span>
      </button>
      <button
        onClick={handleTwitterShare}
        className="button is-outlined is-rounded twitter"
      >
        <span className="icon">
          <i className="fab fa-twitter"></i>
        </span>
        <span className="text">Twitter</span>
      </button>
    </div>
  );
};

Share.propTypes = {
  socialConfig: PropTypes.shape({
    twitterHandle: PropTypes.string,
    config: PropTypes.shape({
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    })
  }).isRequired,
  tags: PropTypes.arrayOf(PropTypes.string)
};

Share.defaultProps = {
  tags: []
};

export default Share;
