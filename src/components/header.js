"use client";

import Link from "next/link";
import React, { useState } from "react";

export default function Header({ data, header }) {
  const [menu, setMenu] = useState(false);

  return (
    <header className={`site-header ${menu ? "active" : ""}`}>
      <div className="container">
        <div className="header-main">
          <div className="logo">
            <Link href="/">
              {data?.fields?.logo?.fields?.file?.url ? (
                <img src={`https:${data.fields.logo.fields.file.url}`} alt="logo" />
              ) : (
                <span>{data?.fields?.siteName}</span>
              )}
            </Link>
          </div>
          <div
            className="responsive-menu"
            onClick={() => {
              setMenu(!menu);
            }}
          >
            <span></span>
          </div>
          <div className="menu">
            <ul>
              <li>
                <Link href="/#home">Home</Link>
              </li>
              {data?.fields?.menus
                ?.filter(item => item === "About")
                .map((t, index) => {
                  return (
                    <li key={index}>
                      <Link href={`/#About`}>About</Link>
                    </li>
                  );
                })}
              {data?.fields?.menus
                ?.filter(item => item === "Service")
                .map((t, index) => {
                  return (
                    <li key={index}>
                      <Link href={`/#Service`}>Service</Link>
                    </li>
                  );
                })}
              {data?.fields?.menus
                ?.filter(item => item === "Blogs")
                .map((t, index) => {
                  return (
                    <li key={index}>
                      <Link href={`/#Blogs`}>Blog</Link>
                    </li>
                  );
                })}
              {data?.fields?.menus
                ?.filter(item => item === "Projects")
                .map((t, index) => {
                  return (
                    <li key={index}>
                      <Link href={`/#Projects`}>Projects</Link>
                    </li>
                  );
                })}
              {data?.fields?.menus
                ?.filter(item => item === "Testimonials")
                .map((t, index) => {
                  return (
                    <li key={index}>
                      <Link href={`/#Testimonials`}>Testimonials</Link>
                    </li>
                  );
                })}
              {data?.fields?.menus
                ?.filter(item => item === "Bucket List")
                .map((t, index) => {
                  return (
                    <li key={index}>
                      <Link href={`/#BucketList`}>Bucket List</Link>
                    </li>
                  );
                })}
              {data?.fields?.menus
                ?.filter(item => item === "Contact")
                .map((t, index) => {
                  return (
                    <li key={index}>
                      <Link href={`/#Contact`}>Contact</Link>
                    </li>
                  );
                })}
              <li>
                <Link href="/blogs">Blogs</Link>
              </li>
              <li>
                <Link href="/projects">Projects</Link>
              </li>
              <li>
                <Link href="/resume">Resume</Link>
              </li>

              <li>
                <Link href="/spotify">Spotify</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
