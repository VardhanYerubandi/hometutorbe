// src/components/Hero.jsx
import React from 'react';

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">

        {/* Left column: headline, description, CTAs */}
        <div className="hero-left fade-in fade-in-0" style={{animationFillMode: 'both'}}>
          <h1 className="hero-tagline">Find the perfect tutor for any subject, anytime.</h1>

          <p className="hero-description">Our platform simplifies finding the right certified tutor nearby or online — personalized lessons, flexible scheduling, and verified tutors to help you reach your goals faster.</p>

          <div className="get-started-btn-container">
            <a href="/find-tutors" className="primary-btn large-btn">Find Tutors</a>
            <a href="/become-a-tutor" className="secondary-btn large-btn">Become a Tutor</a>
          </div>

          <div className="trust-badges">
            <div className="badge">Verified Tutors</div>
            <div className="badge">Secure Payments</div>
            <div className="badge">Satisfaction Guarantee</div>
          </div>
        </div>

        {/* Right column: illustrative card */}
        <div className="hero-right fade-in fade-in-1" style={{animationFillMode: 'both'}}>
          <div className="hero-image-placeholder" role="img" aria-label="Illustration of an online tutoring session">
            {/* Replace this image by adding your image file to `public/images/hero-education.jpg`.
                The <img> below references the public/ folder so no import is required. */}
            <img src="src/images/education.jpeg" alt="Professional education illustration" className="hero-image" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;