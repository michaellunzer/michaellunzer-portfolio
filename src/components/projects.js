import React from "react";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";

export default function Projects({ data, isHomePage = false }) {
  // If it's the homepage, only show 5 items
  const displayData = isHomePage ? data.slice(0, 5) : data;

  return (
    <div className="blogs-section section" id="Projects">
      <div className="container">
        <div className="section-head">
          <h2>Projects</h2>
        </div>
        <ul
          className={`blogs-list ${displayData.length < 5 ? "few-blogs" : ""}`}
        >
          {displayData.map((item, index) => {
            return (
              <li key={index} className="item">
                <div className="inner">
                  <Link className="link" href={`/projects/${item.fields.slug}`} />

                  {item.fields.featureImage ? (
                    <Image
                      src={`https:${item.fields.featureImage.fields.file.url}`}
                      alt={item.fields.title}
                      width={400}
                      height={300}
                      style={{ objectFit: 'cover', objectPosition: '50% 50%' }}
                    />
                  ) : (
                    <div className="no-image"></div>
                  )}
                  <div className="details">
                    <h3 className="title">{item.fields.title}</h3>
                    <span className="date">
                      <i className="fas fa-calendar-alt"></i>{" "}
                      {moment(item.fields.publishedDate).format("LL")}
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        
        {/* Show "More Projects" link only on homepage */}
        {isHomePage && data.length > 5 && (
          <div className="see-more">
            <Link href="/projects">
              <span>More Projects</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
