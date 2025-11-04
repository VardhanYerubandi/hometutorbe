// src/components/HomeSection.jsx
import React from 'react';
// Importing icons from Lucide React
import { CheckCircle, DollarSign, Search, Clock, Zap, BookOpen, Star, UserPlus, FileText, Calendar, TrendingUp, Code, GraduationCap, Users } from 'lucide-react';
import Hero from './Hero'; 

const featureData = [
    { title: "Verified Tutors", icon: CheckCircle, description: "All tutors are background-checked and certified experts." },
    { title: "Affordable Learning", icon: DollarSign, description: "Competitive, transparent pricing for every budget." },
    { title: "Personalized Match", icon: Search, description: "Intelligent matching algorithm finds your ideal fit." },
    { title: "Flexible Scheduling", icon: Clock, description: "Book sessions anytime, online or in person." },
];

const subjectData = [
    { name: "Mathematics", icon: TrendingUp },
    { name: "Science (Physics, Chem)", icon: Zap },
    { name: "English & Literature", icon: BookOpen },
    { name: "Coding & Tech", icon: Code },
    { name: "Test Prep (SAT/ACT)", icon: GraduationCap },
    { name: "Languages", icon: Users },
];

const featuredTutors = [
    { name: "Maya Sharma", subject: "Physics", rating: 5, experience: "10+ Years Experience in Physics" },
    { name: "John Davis", subject: "Calculus", rating: 4.9, experience: "Taught 500+ successful students" },
    { name: "Aisha Khan", subject: "English", rating: 5, experience: "Specialist in Essay Writing" },
];

const testimonials = [
    { name: "Sarah J.", review: "Finding a tutor for my board exams was so easy! Highly recommend Home Tutor Finder. Five stars!", rating: 5 },
    { name: "David L.", review: "The personalized matching worked perfectly. My son's math grades went up 20% in two months.", rating: 5 },
    { name: "Priya M.", review: "Affordable and flexible. I can schedule lessons around my work hours. Great platform!", rating: 4.5 },
];

// Helper component for star rating display
const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
        stars.push(<Star key={i} size={16} fill="gold" stroke="gold" />);
    }
    if (hasHalfStar) {
        // Simple visual for half star (no specific Lucide half-star icon available, so we use a partial solution)
        stars.push(<Star key="half" size={16} fill="gold" stroke="gold" style={{clipPath: 'inset(0 50% 0 0)'}} />); 
    }
    
    // Fill remaining stars (up to 5) as empty
    const remaining = 5 - stars.length;
    for (let i = 0; i < remaining; i++) {
        stars.push(<Star key={`empty-${i}`} size={16} stroke="#ccc" fill="none" />);
    }

    return <div className="rating-stars">{stars}</div>;
};


const HomeSection = () => {
  return (
    <div id="home-page-content" className="home-page-layout">
      
      {/* 1. HERO SECTION (Updated content is in the Hero.jsx file) */}
      <Hero /> 
      
      {/* 2. WHY CHOOSE US SECTION */}
      <section className="section-padding bg-light-gray">
          <div className="container text-center">
              <h2 className="section-title">Why Parents and Students Choose Us</h2>
              <div className="feature-grid">
                  {featureData.map((feature, index) => (
                      <div className="feature-card fade-in" style={{animationDelay: `${index * 0.15 + 0.5}s`, opacity: 0}} key={feature.title}>
                          <feature.icon size={48} className="icon-blue" />
                          <h3 className="card-title">{feature.title}</h3>
                          <p className="card-description">{feature.description}</p>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* 3. HOW IT WORKS SECTION */}
      <section className="section-padding">
          <div className="container text-center">
              <h2 className="section-title">A Simple Path to Success</h2>
              <p className="section-subtitle">Start learning in 4 easy steps.</p>

              <div className="how-it-works-grid">
                {/* Step 1: Sign Up */}
                <div className="step-card fade-in" style={{animationDelay: '0.1s', opacity: 0}}>
                    <div className="step-number">1</div>
                    <UserPlus size={40} className="icon-blue" />
                    <h4 className="card-title">Sign Up</h4>
                    <p>Create an account as a student or register as a tutor.</p>
                </div>
                {/* Connector Line */}
                <div className="step-connector"></div>

                {/* Step 2: Search/Offer */}
                <div className="step-card fade-in" style={{animationDelay: '0.3s', opacity: 0}}>
                    <div className="step-number">2</div>
                    <Search size={40} className="icon-blue" />
                    <h4 className="card-title">Search or Offer</h4>
                    <p>Students search for subjects, tutors list their classes.</p>
                </div>
                {/* Connector Line */}
                <div className="step-connector"></div>

                {/* Step 3: Schedule */}
                <div className="step-card fade-in" style={{animationDelay: '0.5s', opacity: 0}}>
                    <div className="step-number">3</div>
                    <Calendar size={40} className="icon-blue" />
                    <h4 className="card-title">Schedule & Learn</h4>
                    <p>Book a time and start your personalized learning session.</p>
                </div>
                {/* Connector Line */}
                <div className="step-connector"></div>
                
                {/* Step 4: Review */}
                <div className="step-card fade-in" style={{animationDelay: '0.7s', opacity: 0}}>
                    <div className="step-number">4</div>
                    <FileText size={40} className="icon-blue" />
                    <h4 className="card-title">Rate & Review</h4>
                    <p>Provide feedback to help the community grow.</p>
                </div>
              </div>
          </div>
      </section>

      {/* 4. TOP SUBJECTS / CATEGORIES SECTION */}
      <section className="section-padding bg-light-gray">
          <div className="container text-center">
              <h2 className="section-title">Popular Tutoring Subjects</h2>
              <p className="section-subtitle">Start with the most requested courses.</p>
              <div className="subject-grid">
                  {subjectData.map((subject, index) => (
                      <div className="subject-card fade-in" style={{animationDelay: `${index * 0.1}s`, opacity: 0}} key={subject.name}>
                          <subject.icon size={36} className="icon-blue" />
                          <h4 className="card-title">{subject.name}</h4>
                      </div>
                  ))}
              </div>
              <a href="/find-tutors" className="btn primary-btn large-btn mt-12">View All Subjects</a>
          </div>
      </section>

      {/* 5. FEATURED TUTORS SECTION */}
      <section className="section-padding">
          <div className="container text-center">
              <h2 className="section-title">Meet Our Featured Tutors</h2>
              <p className="section-subtitle">Highly rated experts ready to help you succeed.</p>
              <div className="tutor-grid">
                  {featuredTutors.map((tutor, index) => (
                      <div className="tutor-card fade-in" style={{animationDelay: `${index * 0.2}s`, opacity: 0}} key={tutor.name}>
                          <div className="tutor-avatar">
                             {/* Placeholder for tutor image */}
                             <Users size={40} className="icon-white" /> 
                          </div>
                          <h4 className="tutor-name">{tutor.name}</h4>
                          <p className="tutor-subject">{tutor.subject} Specialist</p>
                          <StarRating rating={tutor.rating} />
                          <p className="tutor-experience">{tutor.experience}</p>
                          <a href="/find-tutors" className="btn secondary-btn">Book Session</a>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* 6. TESTIMONIALS SECTION */}
      <section className="section-padding bg-blue-light-bg">
          <div className="container">
              <h2 className="section-title text-white">What Our Students Say</h2>
              <div className="testimonial-grid">
                  {testimonials.map((testimonial, index) => (
                      <div className="testimonial-card fade-in" style={{animationDelay: `${index * 0.15}s`, opacity: 0}} key={testimonial.name}>
                          <StarRating rating={testimonial.rating} />
                          <p className="review-text">"{testimonial.review}"</p>
                          <p className="reviewer-name">- {testimonial.name}</p>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* 7. CALL-TO-ACTION (CTA) BANNER */}
      <section className="cta-banner">
          <div className="container text-center">
              <h2 className="cta-title">Start your learning journey today — the right tutor is just a click away.</h2>
              <a href="/find-tutors" className="btn cta-btn">Get Started</a>
          </div>
      </section>
    </div>
  );
};

export default HomeSection;