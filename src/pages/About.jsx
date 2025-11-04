import React from 'react';
import dev1 from '../assets/team/dev1.svg';
import dev2 from '../assets/team/dev2.svg';
import dev3 from '../assets/team/dev3.svg';
import dp from '../assets/team/dp.jpg';
import mike from '../assets/team/mentor-mike.svg';

const developers = [
  { name: 'J KRISHNA HARSHITHA', role: 'Lead Developer', img:'/src/images/harshitha.png', phone: '+91 9652160539', linkedin: 'https://www.linkedin.com/in/jallepalli-krishna-harshitha-64a106322/' },
  { name: 'S DURGA PRASAD', role: 'Frontend Developer', img: dp, phone: '+91 8074428575', linkedin: 'https://www.linkedin.com/in/singuluri-megha-nadha-durga-prasad-a90108322/' },
  { 
  name: 'Y SAI VARDHAN', 
  role: 'Backend Developer', 
  img: '/src/images/vardhan.png', 
  phone: '+91 9849491258', 
  linkedin: 'https://www.linkedin.com/in/sai-vardhan-yerubandi-247539229/' 
}

];

const About = () => {
  return (
    <section className="about-page container section-padding">
      <div className="about-hero text-center">
        <h1 className="about-title">About Home Tutor Finder</h1>
        <p className="about-lead">We connect students with vetted, caring tutors — online or in-person. Our mission is to make quality education accessible, simple, and effective for every learner.</p>
      </div>

      <div className="team-section">
        <h2 className="team-heading text-center">Meet the Team</h2>
        <p className="team-sub text-center">A small, focused group building tools for learners and educators.</p>

        <div className="team-cards">
          {developers.map((dev, idx) => (
            <div className="team-card" key={idx}>
              <div className="avatar-wrap">
                <img src={dev.img} alt={dev.name} className="team-avatar" />
              </div>
              <h3 className="team-name">{dev.name}</h3>
              <p className="team-role">{dev.role}</p>
              <div className="team-contact">
                <a href={`tel:${dev.phone}`} className="contact-link">{dev.phone}</a>
                <a href={dev.linkedin} className="contact-link linkedin" aria-label={`LinkedIn ${dev.name}`}>LinkedIn</a>
              </div>
            </div>
          ))}
        </div>

        {/* Mentor full-width card */}
        <div className="mentor-section">
          <h2 className="team-heading text-center" style={{marginTop: '2.5rem'}}>Our Mentor</h2>
          <div className="mentor-large">
            <img src="/src/images/sir.jpg" alt="Dr. K ASHESH" className="mentor-avatar" />

            <h3 className="mentor-name">Dr. K ASHESH</h3>
            <p className="mentor-role">Senior Mentor & Advisor</p>
            <p className="mentor-desc">Dr. ASHESH provided invaluable guidance throughout the project, offering strategic insights and technical expertise.</p>
            <div className="mentor-contacts">
              <a href="tel:+1-555-444-3333" className="mentor-contact">+91 8500103040</a>
              <a href="https://www.linkedin.com/in/imasheshk/" className="mentor-contact linkedin" aria-label="LinkedIn Dr. K ASHESH">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
