"use client";

import React, { useState } from "react";

export default function ResumeDownload() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("/.netlify/functions/send-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setMessage("Resume sent successfully! Please check your email.");
        setEmail("");
      } else {
        setIsSuccess(false);
        setMessage(data.error || "Failed to send resume. Please try again.");
      }
    } catch (error) {
      setIsSuccess(false);
      setMessage("An error occurred. Please try again.");
      console.error("Error sending resume:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="resume-download-section">
      <div className="resume-download-content">
        <h2>Download My Resume</h2>
        <p>
          Enter your email address below and I'll send you a copy of my resume as a PDF.
        </p>
        
        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="resume-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                required
                disabled={isSubmitting}
              />
            </div>
            
            <button 
              type="submit" 
              disabled={isSubmitting || !email}
              className="submit-btn"
            >
              {isSubmitting ? "Sending..." : "Send Resume"}
            </button>
          </form>
        ) : (
          <div className="success-message">
            <i className="fas fa-check-circle"></i>
            <p>{message}</p>
            <button 
              onClick={() => setIsSuccess(false)}
              className="send-another-btn"
            >
              Send to Another Email
            </button>
          </div>
        )}
        
        {message && !isSuccess && (
          <div className="error-message">
            <i className="fas fa-exclamation-circle"></i>
            <p>{message}</p>
          </div>
        )}
      </div>
      
      <div className="resume-preview">
        <h3>Resume Preview</h3>
        <div className="resume-preview-content">
          <div className="resume-section">
            <h4>Michael Lunzer</h4>
            <p className="title">Customer Success Manager at Postman</p>
            <p className="location">San Francisco, CA</p>
          </div>
          
          <div className="resume-section">
            <h5>Experience</h5>
            <ul>
              <li>Customer Success Manager at Postman</li>
              <li>Technical Account Manager</li>
              <li>Trusted Technical Advisor</li>
            </ul>
          </div>
          
          <div className="resume-section">
            <h5>Skills</h5>
            <ul>
              <li>Customer Success & Technical Support</li>
              <li>Project Management</li>
              <li>Home Automation & IoT</li>
              <li>Cloud Infrastructure</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 