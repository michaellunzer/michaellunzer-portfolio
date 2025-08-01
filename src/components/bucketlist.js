"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import MarkdownRenderer from "./MarkdownRenderer";

export default function BucketList({ data }) {
  const [activePopup, setActivePopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);

  return (
    <div className="blogs-section section" id="BucketList">
      <div className="container">
        <div className="section-head">
          <h2>Bucket List</h2>
        </div>
        <ul
          className={`blogs-list ${
            data.length < 5 ? "few-blogs" : ""
          }`}
        >
          {data.map((item, index) => {
            return (
              <li key={index} className="item">
                <div className={`accomplished${item.fields.accomplished}`}>
                  <div 
                    className="inner"
                    onClick={() => {
                      setActivePopup(true);
                      setSelectedItem(index);
                    }}
                  >
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
                      {item.fields.dateAccomplished ? ( 
                        <span className="date">
                          <i className="fas fa-calendar-alt"></i>{" "}
                          {moment(item.fields.dateAccomplished).format("LL")}
                        </span>
                      ) : (
                        <span className="date">
                          <i className="fas fa-calendar-alt"></i>{" "}
                          TBD
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        
        {activePopup && (
          <div className="rg-popup">
            <span
              className="popup-layer"
              onClick={() => {
                setActivePopup(false);
              }}
            ></span>

            <div className="popup-inner">
              <i
                className="fas fa-times"
                onClick={() => {
                  setActivePopup(false);
                }}
              ></i>
              <div className="BucketListPopup">
                <div className={`accomplished${data[selectedItem].fields.accomplished}`}>
                  <span className="name">
                    <h2>{data[selectedItem].fields.title}</h2>
                  </span>
                  {data[selectedItem].fields.featureImage && (
                    <img
                      src={`https:${data[selectedItem].fields.featureImage.fields.file.url}`}
                      alt="popup-img"
                      className="popup-image"
                    />
                  )}
                  <div className="description">
                    <MarkdownRenderer content={data[selectedItem].fields.description} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
