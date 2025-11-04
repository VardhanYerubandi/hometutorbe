// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
  <footer className="footer footer--simple" role="contentinfo">
      <div className="footer-bleed">
        <div className="footer-inner container">
          <div className="footer-grid">
            <div className="col brand">
              <Link to="/" className="logo" aria-label="Home">
                <svg className="logo-mark" width="40" height="40" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                  <defs>
                    <linearGradient id="fGrad" x1="0%" x2="100%" y1="0%" y2="100%">
                      <stop offset="0%" stopColor="#1e88e5" />
                      <stop offset="100%" stopColor="#0d47a1" />
                    </linearGradient>
                  </defs>
                  <rect width="48" height="48" rx="10" fill="url(#fGrad)" />
                  <text x="50%" y="60%" textAnchor="middle" fontFamily="Inter, Arial, sans-serif" fontWeight="700" fontSize="18" fill="#ffffff">HT</text>
                </svg>
                <div className="logo-text">
                  <span className="brand-primary">Home Tutor</span>
                  <span className="brand-strong">Finder</span>
                </div>
              </Link>
              <p className="footer-desc muted">Personalised, one-on-one learning — find or become a trusted home tutor.</p>
            </div>

            <div className="col">
              <h4 className="footer-heading small">Product</h4>
              <ul className="footer-links compact">
                <li><Link to="/find-tutors">Find Tutors</Link></li>
                <li><Link to="/become-a-tutor">Become a Tutor</Link></li>
                <li><Link to="/pricing">Pricing</Link></li>
              </ul>
            </div>

            <div className="col">
              <h4 className="footer-heading small">Company</h4>
              <ul className="footer-links compact">
                <li><Link to="/about-us">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/blog">Blog</Link></li>
              </ul>
            </div>

            <div className="col contact-col">
              <h4 className="footer-heading small">Contact</h4>
              <div className="footer-contact">
                <Mail size={16} />
                <a href="mailto:hello@hometutorfinder.com">hello@hometutorfinder.com</a>
              </div>
              <div className="footer-social-icons simple" aria-hidden>
                <a className="social-icon-link" href="#" aria-label="Twitter"><Twitter size={16} /></a>
                <a className="social-icon-link" href="#" aria-label="Facebook"><Facebook size={16} /></a>
                <a className="social-icon-link" href="#" aria-label="Instagram"><Instagram size={16} /></a>
                <a className="social-icon-link" href="#" aria-label="LinkedIn"><Linkedin size={16} /></a>
              </div>
            </div>
          </div>

          <div className="footer-bottom compact">
            <div className="copyright">© {new Date().getFullYear()} Home Tutor Finder — All rights reserved</div>
            <div className="footer-legal">
              <Link to="/terms">Terms</Link>
              <Link to="/privacy">Privacy</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Back to top button (small, unobtrusive) */}
      <button
        className="back-to-top"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        ↑
      </button>
    </footer>
  );
};

export default Footer;