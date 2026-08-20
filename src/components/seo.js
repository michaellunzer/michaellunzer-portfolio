import React from "react";
import Head from "next/head";

function SEO({ description, lang = `en`, meta = [], keywords = [], title, siteInfo }) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={siteInfo?.fields?.siteDescription || description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={siteInfo?.fields?.siteDescription || description} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={siteInfo?.fields?.twiteerHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={siteInfo?.fields?.siteDescription || description} />
      {keywords && keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(`, `)} />
      )}
      {meta && meta.map((tag, index) => (
        <meta key={index} {...tag} />
      ))}
    </Head>
  );
}

export default SEO;
