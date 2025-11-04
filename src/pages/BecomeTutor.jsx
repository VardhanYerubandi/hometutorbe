import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function BecomeTutor() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="become-page container section-padding">
      <section className="become-hero card">
        <div className="become-hero-inner">
          <div>
            <h1 className="become-title">Share your knowledge. Earn while teaching.</h1>
            <p className="become-lead muted">Join our community of trusted tutors. Create flexible classes, set your rates, and connect with students who need your expertise.</p>

            <div className="become-cta">
              {isAuthenticated ? (
                <a
                  href="https://chat.whatsapp.com/EGE00n2ggMtDkLOK5Pzt9C"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="primary-btn large-btn whatsapp-btn"
                >
                  {/* WhatsApp icon */}
                  <svg className="whatsapp-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M21.7 2.3a11.9 11.9 0 10-17 17L2 22l2.8-2.1A11.9 11.9 0 0021.7 2.3z" fill="#25D366"/>
                    <path d="M17.5 14.2c-.3-.2-1.8-.9-2-.9-.2 0-.3-.1-.5.1-.2.1-.8.9-1 1.1-.2.2-.4.3-.7.1-.3-.2-1.1-.4-2.1-1.3-.8-.7-1.3-1.6-1.5-1.9-.2-.4 0-.6.1-.8.1-.2.3-.5.4-.8.1-.3 0-.6 0-.8 0-.2-.5-.5-.8-.7-.3-.2-1.2-.9-1.7-1.6-.4-.6-.4-1-.4-1.1 0-.1 0-.3.1-.4.1-.1.3-.2.4-.3.1-.1.3-.2.5-.2.2 0 .4 0 .6 0 .2 0 .6.1.9.4.3.3.9.9 1.1 1.1.2.2.4.3.7.3.2 0 .5-.1.7-.2.2-.1.9-.6 1.1-.8.2-.2.4-.3.6-.3.2 0 .4.1.6.1.1 0 .4 0 .6.1.2 0 .5.1.7.2.2.1.8.4 1.2.9.4.5.6 1.1.7 1.3.1.2.1.4 0 .6-.1.2-.3.5-.5.7z" fill="#FFF"/>
                  </svg>
                  <span style={{marginLeft:8}}>Create your first listing</span>
                </a>
              ) : (
                <NavLink to="/auth" className="primary-btn large-btn">Sign up to become a tutor</NavLink>
              )}
              <NavLink to="/about-us" className="secondary-btn">Learn more</NavLink>
            </div>
          </div>

          <div className="become-hero-visual">
            <div className="stat-grid">
              <div className="stat">
                <div className="stat-num">4.9</div>
                <div className="stat-label muted">Avg. Tutor Rating</div>
              </div>
              <div className="stat">
                <div className="stat-num">12k+</div>
                <div className="stat-label muted">Students helped</div>
              </div>
              <div className="stat">
                <div className="stat-num">Flexible</div>
                <div className="stat-label muted">Set your schedule</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="become-benefits">
        <h2 className="card-title">Why tutors love Home Tutor Finder</h2>
        <div className="benefit-grid">
          <div className="benefit-card card">
            <div className="benefit-head">
              <span className="benefit-icon" aria-hidden="true">
                {/* wallet icon */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 7H3v10h18V7z" stroke="#0d47a1" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 7v2H3V7" stroke="#0d47a1" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <h3>Fair pay, your rates</h3>
            </div>
            <p className="muted">Set competitive hourly rates and get paid reliably. We provide tools to help you price and manage earnings.</p>
          </div>

          <div className="benefit-card card">
            <div className="benefit-head">
              <span className="benefit-icon" aria-hidden="true">
                {/* calendar icon */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="4" width="18" height="18" rx="2" stroke="#0d47a1" strokeWidth="1.2"/>
                  <path d="M16 2v4M8 2v4" stroke="#0d47a1" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              </span>
              <h3>Powerful scheduling</h3>
            </div>
            <p className="muted">Accept bookings, offer group classes, and sync with your calendar so nothing collides.</p>
          </div>

          <div className="benefit-card card">
            <div className="benefit-head">
              <span className="benefit-icon" aria-hidden="true">
                {/* search / match icon */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 21l-4.35-4.35" stroke="#0d47a1" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" stroke="#0d47a1" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <h3>Student matching</h3>
            </div>
            <p className="muted">Our search and recommendations bring students to your profile based on skills and availability.</p>
          </div>
        </div>
      </section>

      <section className="become-steps">
        <h2 className="card-title">Simple onboarding — three steps</h2>
        <div className="steps-grid">
          <div className="step-card card">
            <div className="step-num">1</div>
            <h4>Create your profile</h4>
            <p className="muted">Add your experience, subjects, and a short intro to attract the right students.</p>
          </div>
          <div className="step-card card">
            <div className="step-num">2</div>
            <h4>Set availability & pricing</h4>
            <p className="muted">Configure your weekly schedule and how you want to charge — hourly or per course.</p>
          </div>
          <div className="step-card card">
            <div className="step-num">3</div>
            <h4>Start teaching</h4>
            <p className="muted">Get bookings, manage students, and collect reviews that grow your reputation.</p>
          </div>
        </div>
      </section>

      <section className="become-cta-banner card">
        <div className="become-cta-banner-inner">
          <div>
            <h3>Ready to make an impact?</h3>
            <p className="muted">Create a tutor profile and start connecting with students today.</p>
          </div>
          <div>
            {isAuthenticated ? (
              <a
                href="https://chat.whatsapp.com/EGE00n2ggMtDkLOK5Pzt9C"
                target="_blank"
                rel="noopener noreferrer"
                className="primary-btn large-btn whatsapp-btn"
              >
                <svg className="whatsapp-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M21.7 2.3a11.9 11.9 0 10-17 17L2 22l2.8-2.1A11.9 11.9 0 0021.7 2.3z" fill="#25D366"/>
                  <path d="M17.5 14.2c-.3-.2-1.8-.9-2-.9-.2 0-.3-.1-.5.1-.2.1-.8.9-1 1.1-.2.2-.4.3-.7.1-.3-.2-1.1-.4-2.1-1.3-.8-.7-1.3-1.6-1.5-1.9-.2-.4 0-.6.1-.8.1-.2.3-.5.4-.8.1-.3 0-.6 0-.8 0-.2-.5-.5-.8-.7-.3-.2-1.2-.9-1.7-1.6-.4-.6-.4-1-.4-1.1 0-.1 0-.3.1-.4.1-.1.3-.2.4-.3.1-.1.3-.2.5-.2.2 0 .4 0 .6 0 .2 0 .6.1.9.4.3.3.9.9 1.1 1.1.2.2.4.3.7.3.2 0 .5-.1.7-.2.2-.1.9-.6 1.1-.8.2-.2.4-.3.6-.3.2 0 .4.1.6.1.1 0 .4 0 .6.1.2 0 .5.1.7.2.2.1.8.4 1.2.9.4.5.6 1.1.7 1.3.1.2.1.4 0 .6-.1.2-.3.5-.5.7z" fill="#FFF"/>
                </svg>
                <span style={{marginLeft:8}}>Create listing</span>
              </a>
            ) : (
              <NavLink to="/auth" className="primary-btn large-btn">Sign up & start teaching</NavLink>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="become-testimonials" aria-label="Tutor testimonials">
        <h2 className="card-title">Tutor success stories</h2>
        <div className="testimonial-grid">
          <div className="testimonial-card card">
            <p className="testimonial-quote">“I grew my teaching side-income by 40% in three months. The platform brings motivated students.”</p>
            <div className="testimonial-meta muted">— Priya S., Math Tutor</div>
          </div>

          <div className="testimonial-card card">
            <p className="testimonial-quote">“Booking and calendar sync saved me hours. I can focus on teaching, not logistics.”</p>
            <div className="testimonial-meta muted">— Raj M., Physics</div>
          </div>

          <div className="testimonial-card card">
            <p className="testimonial-quote">“Fair pay and flexible hours made it easy to balance tutoring and my studies.”</p>
            <div className="testimonial-meta muted">— Ananya K., English</div>
          </div>
        </div>
      </section>
    </div>
  );
}
