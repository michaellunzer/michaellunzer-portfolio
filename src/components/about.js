import React from "react";
import Image from "next/image";
import MarkdownRenderer from "./MarkdownRenderer";

const About = ({ data }) => (
  <div className="about section" id="About">
    <div className="container">
      <div className="about-main row">
        <div className="left col-md-5 col-lg-4 mb-3">
          {data?.fields?.photo && (
            <Image
              src={`https:${data.fields.photo.fields.file.url}`}
              alt={data.fields.name}
              width={400}
              height={500}
              style={{ objectFit: 'cover', objectPosition: 'top center' }}
            />
          )}
        </div>
        <div className="left col-md-7 col-lg-8">
          <div className="about-details">
            <h1 className="name">My Name is {data?.fields?.name}.</h1>
            <h2 className="sub-position">
              I'm a {data?.fields?.designation}.
            </h2>
            <MarkdownRenderer content={data?.fields?.description} />
            <ul className="details">
              <li>
                <strong>Full Name</strong>
                <p>{data?.fields?.name}</p>
              </li>
              <li>
                <strong>Location</strong>
                <p>{data?.fields?.location}</p>
              </li>
              <li>
                <strong>Email</strong>
                <p>
                  <a href={`mailto:${data?.fields?.gmail}`}>{data?.fields?.gmail}</a>
                </p>
              </li>
            </ul>
            <div className="socials">
              <ul>
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
                    className="fab fa-twitter"
                    href={data?.fields?.twitter}
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
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default About;
