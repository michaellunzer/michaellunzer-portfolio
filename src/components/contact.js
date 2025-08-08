"use client"
import React from "react";
import { useForm, ValidationError } from "@formspree/react";

export default function Contact({ data }) {
  const [state, handleSubmit] = useForm("xqalgyon"); // Your actual Formspree form ID

  if (state.succeeded) {
    return (
      <div className="contact section" id="Contact">
        <div className="container">
          <div className="section-head">
            <h2 className="text-center">Contact</h2>
          </div>
          <div className="text-center">
            <p>Thanks for your submission! I'll get back to you soon.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="contact section" id="Contact">
      <div className="container">
        <div className="section-head">
          <h2 className="text-center">Contact</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">
              Your Name
            </label>
            <input
              id="name"
              type="text" 
              name="name"
              required
            />
            <ValidationError 
              prefix="Name" 
              field="name"
              errors={state.errors}
            />
          </div>
          <div>
            <label htmlFor="email">
              Your Email
            </label>
            <input
              id="email"
              type="email" 
              name="email"
              required
            />
            <ValidationError 
              prefix="Email" 
              field="email"
              errors={state.errors}
            />
          </div>
          <div>
            <label htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
            />
            <ValidationError 
              prefix="Message" 
              field="message"
              errors={state.errors}
            />
          </div>
          <div>
            <button type="submit" disabled={state.submitting}>
              {state.submitting ? "Sending..." : "Submit"}
            </button>
          </div>
          <ValidationError errors={state.errors} />
        </form>
      </div>
    </div>
  );
}
