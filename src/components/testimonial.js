"use client";

import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import MarkdownRenderer from "./MarkdownRenderer";

var settings = {
  dots: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  pauseOnHover: true,
  autoplaySpeed: 6000
};

export default function Testimonial({ data }) {
  return (
    <div className="slider-section section testimonials" id="Testimonials">
      <div className="container">
        <div className="section-head text-center">
          <h2>Testimonials</h2>
          <p>People I've worked with have said some nice things...</p>
        </div>
        <Slider {...settings}>
          {data.map((item, index) => {
            return (
              <div key={index} className="testimonials-item">
                <div className="testi-inner">
                  {item.fields.avatar && (
                    <Image
                      src={`https:${item.fields.avatar.fields.file.url}`}
                      alt={item.fields.name}
                      width={100}
                      height={100}
                      className="avatar"
                      style={{ objectFit: 'cover', objectPosition: '50% 50%' }}
                    />
                  )}
                  <MarkdownRenderer content={item.fields.description} />
                  <h3 className="name">{item.fields.name}</h3>
                  <span className="sub-name">{item.fields.subTitle}</span>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
}
