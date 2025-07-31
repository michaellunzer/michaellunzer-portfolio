import React from "react";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";

export default function Resume({ data }) {
  return (
    <div className="blogs-section section" id="Resume">
      <div className="container">
        <div className="section-head">
          <h2>Resume</h2>
        </div>
        <ul className="blogs-list">
          {data.map((item, index) => {
            return (
              <li key={index} className="item">
                <div className="inner">
                  <Link className="link" href="/resume" />
                  {item.fields.featureImage && (
                    <Image
                      src={`https:${item.fields.featureImage.fields.file.url}`}
                      alt={item.fields.title}
                      width={600}
                      height={400}
                      style={{ objectFit: 'cover', objectPosition: '50% 50%' }}
                    />
                  )}
                  <div className="details">
                    <h3 className="title">{item.fields.title}</h3>
                    <span className="date">
                      <i className="fas fa-calendar-alt"></i>{" "}
                      {moment(item.fields.createdAt).format("LL")}
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="see-more">
          <Link href="/resume">
            <span>View Full Resume</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
