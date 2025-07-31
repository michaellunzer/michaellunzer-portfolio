import React from "react";

export default function Contact({ data }) {
  return (
    <div className="contact section" id="Contact">
      <div className="container">
        <div className="section-head">
          <h2 className="text-center">Contact</h2>
        </div>
        <form
          name="contact"
          method="post"
          data-netlify="true"
        >
          <input type="hidden" name="form-name" value="contact" />
          <div>
            <label>
              Your Name: <input type="text" name="name" required />
            </label>
          </div>
          <div>
            <label>
              Your Email: <input type="email" name="email" required />
            </label>
          </div>
          <div>
            <label>
              Message: <textarea name="message" required></textarea>
            </label>
          </div>
          <div data-netlify-recaptcha="true">
          </div>
          <div>
            <button type="submit">Send</button>
          </div>
        </form>
      </div>
    </div>
  );
}
