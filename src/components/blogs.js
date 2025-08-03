import React from "react";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";

export default function Blogs({ data }) {
  return (
    <div className="blogs-section section" id="Blogs">
      <div className="container">
        <div className="section-head">
          <h2>Blog Posts</h2>
        </div>
        

        
        <ul
          className={`blogs-list ${data.length < 5 ? "few-blogs" : ""}`}
        >
          {data.map((item, index) => {
            return (
              <li key={index} className="item">
                <div className="inner">
                  <Link className="link" href={`/blogs/${item.fields.slug}`} />

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
        <div className="see-more">
          <Link href="/blogs">
            <span>More Blog Posts</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
