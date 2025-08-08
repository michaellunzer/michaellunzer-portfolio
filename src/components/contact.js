"use client"
import React from "react";
import { useForm, ValidationError } from "@formspree/react";

export default function Contact({ data }) {
  const [state, handleSubmit] = useForm("YOUR_FORM_ID"); // Replace with your actual Formspree form ID

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
            <label>
              Your Name: <input type="text" name="name" required />
            </label>
            <ValidationError prefix="Name" field="name" errors={state.errors} />
          </div>
          <div>
            <label>
              Your Email: <input type="email" name="email" required />
            </label>
            <ValidationError prefix="Email" field="email" errors={state.errors} />
          </div>
          <div>
            <label>
              Message: <textarea name="message" required></textarea>
            </label>
            <ValidationError prefix="Message" field="message" errors={state.errors} />
          </div>
          <div>
            <button type="submit" disabled={state.submitting}>
              {state.submitting ? "Sending..." : "Send"}
            </button>
          </div>
          <ValidationError errors={state.errors} />
        </form>
      </div>
    </div>
  );
}
