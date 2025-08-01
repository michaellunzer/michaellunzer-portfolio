import React from "react";
import MarkdownRenderer from "./MarkdownRenderer";

export default function Service({ data }) {
  return (
    <div className="service section" id="Service">
      <div className="container">
        <div className="section-head">
          <h2>Service</h2>
        </div>
        <div className="row">
          {data.map((item, index) => {
            return (
              <div key={index} className="col-md-4 mb-3">
                <div className="service-main">
                  <h3>{item.fields.title}</h3>
                  <MarkdownRenderer content={item.fields.description} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
