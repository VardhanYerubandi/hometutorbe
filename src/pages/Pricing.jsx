import React, { useState } from 'react';
import '../styles/pricing.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Pricing() {
  const [billing, setBilling] = useState('monthly');
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const plans = [
    {
      id: 'basic',
      name: 'Starter',
      priceMonthly: 0,
      priceYearly: 0,
      desc: 'Perfect for students getting started',
      features: [
        'Access to tutor search',
        'Basic lesson scheduling',
        'Community support'
      ],
      cta: 'Get Started'
    },
    {
      id: 'pro',
      name: 'Pro',
      priceMonthly: 19,
      priceYearly: 159,
      desc: 'For committed learners and regular sessions',
      features: [
        'Unlimited messaging',
        'Priority booking',
        'Progress tracking & reports',
        'Discounts on packages'
      ],
      cta: 'Choose Pro',
      featured: true
    },
    {
      id: 'tutor',
      name: 'Tutor',
      priceMonthly: 29,
      priceYearly: 249,
      desc: 'Tools & visibility for tutors to grow',
      features: [
        'List classes & accept students',
        'Advanced profile & portfolio',
        'Secure payouts',
        'Tutor analytics'
      ],
      cta: 'Become a Tutor'
    }
  ];

  return (
    <div className="pricing-page">
      <header className="pricing-hero">
        <div className="hero-inner">
          <h1 className="hero-title">Flexible pricing for every learner & tutor</h1>
          <p className="hero-sub">Choose a plan that fits your goals — try free or upgrade for premium features and support.</p>

          <div className="billing-toggle" role="tablist" aria-label="Billing options">
            <span className={`billing-pill ${billing === 'monthly' ? 'active' : ''}`} onClick={() => setBilling('monthly')}>Monthly</span>
            <span className={`billing-pill ${billing === 'yearly' ? 'active' : ''}`} onClick={() => setBilling('yearly')}>Yearly <small className="savings">Save up to 30%</small></span>
          </div>
        </div>
      </header>

      <section className="plans-wrapper">
        <div className="plans-grid">
          {plans.map(plan => (
            <article key={plan.id} className={`plan-card ${plan.featured ? 'featured' : ''}`}>
              {plan.featured && <div className="badge">Most popular</div>}
              <div className="plan-top">
                <h3 className="plan-name">{plan.name}</h3>
                <p className="plan-desc">{plan.desc}</p>
              </div>

              <div className="plan-price">
                <div className="price-amount">
                  {billing === 'monthly' ? (
                    plan.priceMonthly === 0 ? <span className="free">Free</span> : <>${plan.priceMonthly}<span className="period">/mo</span></>
                  ) : (
                    plan.priceYearly === 0 ? <span className="free">Free</span> : <>${plan.priceYearly}<span className="period">/yr</span></>
                  )}
                </div>
              </div>

              <ul className="plan-features">
                {plan.features.map((f, i) => <li key={i}>{f}</li>)}
              </ul>

              <div className="plan-cta">
                <button
                  className={`btn ${plan.featured ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => {
                    // Navigate depending on selected plan
                    if (plan.id === 'tutor') {
                      // Tutor flow (protected) - allow ProtectedRoute to redirect to /auth if needed
                      navigate('/become-a-tutor', { state: { from: '/pricing' } });
                    } else {
                      // For free or pro plans: if not authenticated, go to auth; else go to finding tutors
                      if (!isAuthenticated) navigate('/auth', { state: { from: '/pricing' } });
                      else navigate('/find-tutors');
                    }
                  }}
                >
                  {plan.cta}
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="pricing-notes">
          <h4>Everything included</h4>
          <p>All paid plans include a 14-day free trial, secure payments, and responsive customer support. Annual plans are billed once per year and include a discount vs. monthly billing.</p>
        </div>
      </section>

      <section className="faq-section">
        <h2>Frequently asked questions</h2>
        <div className="faq-grid">
          <div className="faq-item">
            <h5>Can I change plans later?</h5>
            <p>Yes — you can upgrade or downgrade your plan anytime from your account settings. Billing will be prorated based on your subscription.</p>
          </div>
          <div className="faq-item">
            <h5>Do you offer refunds?</h5>
            <p>We offer a 14-day money-back guarantee on annual plans. For monthly subscriptions or specific cases, contact support.</p>
          </div>
          <div className="faq-item">
            <h5>Is onboarding included for tutors?</h5>
            <p>Tutor plan includes onboarding resources and prioritized support to help you set up lessons and profiles.</p>
          </div>
        </div>
      </section>

      <footer className="pricing-cta-footer">
        <div className="footer-inner">
          <div>
            <h3>Ready to start learning or teaching?</h3>
            <p>Pick a plan and get going — you can always switch later.</p>
          </div>
          <div>
            <button
              className="btn btn-primary large"
              onClick={() => {
                if (!isAuthenticated) navigate('/auth', { state: { from: '/pricing' } });
                else navigate('/find-tutors');
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
