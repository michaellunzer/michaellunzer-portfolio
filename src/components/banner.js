import React from "react";
import Image from "next/image";

export default function Banner({ data }) {
  return (
    <div className="banner">
      {data?.fields?.bannerImage && (
        <Image
          src={`https:${data.fields.bannerImage.fields.file.url}`}
          alt="Banner"
          fill
          style={{ objectFit: 'cover', objectPosition: '50% 50%' }}
        />
      )}
      <div className="container">
        <div className="banner-details">
          <span>Hello!</span>
          <h1>I'm {data?.fields?.name}.</h1>
          <ul className="sub-data">
            {data?.fields?.bannerList?.map((item, index) => {
              return <li key={index}>{item}</li>;
            })}
          </ul>
          <ul className="social">
            <li>
              <a
                className="fab fa-linkedin-in"
                href={data?.fields?.linkdin}
                target="_blank"
                rel="noopener noreferrer"
              ></a>
            </li>
            <li>
              <a
                className="fab fa-github"
                href={data?.fields?.github}
                target="_blank"
                rel="noopener noreferrer"
              ></a>
            </li>
            <li>
              <a
                className="fab fa-instagram"
                href={data?.fields?.instagram}
                target="_blank"
                rel="noopener noreferrer"
              ></a>
            </li>
            <li>
              <a
                className="fab fa-soundcloud"
                href={data?.fields?.soundcloud}
                target="_blank"
                rel="noopener noreferrer"
              ></a>
            </li>
            <li>
              <a
                className="fab fa-spotify"
                href={data?.fields?.spotify}
                target="_blank"
                rel="noopener noreferrer"
              ></a>
            </li>
            <li>
              <a
                className="fa fa-rss"
                href="https://michaellunzer.com/rss.xml"
                target="_blank"
                rel="noopener noreferrer"
              ></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
