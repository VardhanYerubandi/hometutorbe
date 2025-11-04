// Redesigned FindTutorsSection — polished, animated tutor cards with modal
import React, { useMemo, useState } from 'react';
import '../styles/findTutors.css';
import dev1 from '../assets/team/dev1.svg';
import dev2 from '../assets/team/dev2.svg';
import dev3 from '../assets/team/dev3.svg';
import mentor from '../assets/team/mentor-mike.svg';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const SAMPLE_TUTORS = [
  { id: 1, name: 'Gnanesh', subject: 'Chemistry', bio: 'Organic chemistry tutor with lab experience.', rating: 4.9, price: 600, experience: 8, location: 'Hyderabad', tags: ['CO2','Organic'], img:'/src/images/gnanesh.png', verified: true, topRated: true },
  { id: 2, name: 'Narayana', subject: 'Physics', bio: 'Mechanics & Thermodynamics. Clear explanations and exam prep.', rating: 4.7, price: 750, experience: 6, location: 'Bangalore', tags: ['Physics','Mechanics'], img: '/src/images/narayana.png', verified: true },
  { id: 3, name: 'Vardhan', subject: 'Chemistry', bio: 'Organic chemistry tutor with lab experience.', rating: 4.8, price: 650, experience: 5, location: 'Chennai', tags: ['Chemistry','Organic'], img: '/src/images/vardan2.jpg', verified: true },
  { id: 4, name: 'Chaitanya', subject: 'English', bio: 'Writing, grammar and speaking coach.', rating: 4.5, price: 400, experience: 3, location: 'Mumbai', tags: ['English','Communication'], img:'/src/images/chaitanya.jpg' },
  { id: 5, name: 'Chetan', subject: 'Biology', bio: 'Biology tutor with tailored lesson plans.', rating: 4.6, price: 500, experience: 4, location: 'Delhi', tags: ['Biology'], img: '/src/images/chethan.jpg' },
  { id: 6, name: 'Nandhu', subject: 'Mathematics', bio: 'Competitive math coach (IITJEE & Olympiad).', rating: 4.95, price: 1200, experience: 10, location: 'Ahmedabad', tags: ['Math','Coaching'], img: '/src/images/Nandhu.jpg', topRated: true },
  { id: 7, name: 'Vijay', subject: 'Python', bio: 'Master in Python Programming.', rating: 4.95, price: 20000, experience: 15, location: 'Vijayawada', tags: ['Django','Flask'], img: '/src/images/vijay.jpg', topRated: true }
];

function IconStar({ filled }){
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? '#ffb020' : 'none'} stroke="#ffb020" strokeWidth="1" aria-hidden>
      <path d="M12 17.3L18.2 21l-1.6-7L22 9.2l-7.2-.6L12 2 9.2 8.6 2 9.2l5.4 4.7L5.8 21z" />
    </svg>
  );
}

function Stars({ rating=0 }){
  const full = Math.floor(rating);
  return (
    <div className="ft-stars" aria-hidden>
      {Array.from({length:5}).map((_,i) => <IconStar key={i} filled={i < full} />)}
      <span className="ft-rating-num">{rating.toFixed(1)}</span>
    </div>
  );
}

function ProfileModal({ tutor, onClose, onBook }){
  if(!tutor) return null;
  return (
    <div className="ft-modal-backdrop" role="dialog" aria-modal="true">
      <div className="ft-modal">
        <button className="ft-modal-close" onClick={onClose} aria-label="Close">✕</button>
        <div className="ft-modal-content">
          <img src={tutor.img} alt={tutor.name} className="ft-modal-avatar" />
          <div className="ft-modal-body">
            <h2>{tutor.name} {tutor.verified && <span className="verified">✔</span>}</h2>
            <p className="muted">{tutor.subject} • {tutor.experience} yrs • {tutor.location}</p>
            <Stars rating={tutor.rating} />
            <p className="ft-modal-bio">{tutor.bio}</p>
            <div className="ft-modal-actions">
              <button className="btn primary" onClick={() => onBook(tutor)}>Book a trial</button>
              <a className="btn outline" href={`tel:+1-555-00${tutor.id}`}>Call</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FindTutorsSection(){
  const [q, setQ] = useState('');
  const [filterSubject, setFilterSubject] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [selected, setSelected] = useState(null);
  const [visible, setVisible] = useState(6);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const tutors = SAMPLE_TUTORS; // in real app fetch from API

  const filtered = useMemo(() => {
    const ql = q.trim().toLowerCase();
    return tutors.filter(t => {
      if(ql){
        const hay = (t.name + ' ' + t.subject + ' ' + t.bio + ' ' + (t.tags||[]).join(' ')).toLowerCase();
        if(!hay.includes(ql)) return false;
      }
      if(filterSubject && !t.subject.toLowerCase().includes(filterSubject.toLowerCase())) return false;
      if(filterLocation && !t.location.toLowerCase().includes(filterLocation.toLowerCase())) return false;
      if(minRating && t.rating < minRating) return false;
      return true;
    });
  }, [q, filterSubject, filterLocation, minRating, tutors]);

  const onBook = (tutor) => {
    if (!isAuthenticated) {
      navigate('/auth', { state: { from: '/find-tutors' } });
      return;
    }

    // Authenticated: go to booking flow (dedicated booking page)
    navigate('/book', { state: { tutorId: tutor.id } });
  };

  return (
    <div className="ft-root">
      <div className="ft-container">
        <header className="ft-hero">
          <div className="ft-hero-inner">
            <h1>Discover exceptional tutors</h1>
            <p className="muted">Handpicked profiles, transparent pricing, and instant booking. Find your perfect learning match.</p>
          </div>
        </header>

        <section className="ft-controls">
          <div className="ft-search">
            <input aria-label="Search tutors" value={q} onChange={e => setQ(e.target.value)} placeholder="Search by name, subject or topic" />
            <input aria-label="Location" value={filterLocation} onChange={e => setFilterLocation(e.target.value)} placeholder="Location or 'online'" />
            <select value={filterSubject} onChange={e => setFilterSubject(e.target.value)}>
              <option value="">All subjects</option>
              <option>Mathematics</option>
              <option>Physics</option>
              <option>Chemistry</option>
              <option>English</option>
              <option>Biology</option>
            </select>
            <select value={minRating} onChange={e => setMinRating(Number(e.target.value))}>
              <option value={0}>Any rating</option>
              <option value={4}>4+</option>
              <option value={4.5}>4.5+</option>
            </select>
            <button className="btn primary" onClick={() => setVisible(6)}>Apply</button>
          </div>
        </section>

        <main className="ft-main">
          <div className="ft-meta">{filtered.length} tutors • Showing {Math.min(visible, filtered.length)} of {filtered.length}</div>

          <div className="ft-grid">
            {filtered.slice(0, visible).map((t,i) => (
              <article key={t.id} className="ft-card" style={{animationDelay: `${i * 60}ms`}}>
                {t.topRated && <div className="ft-badge">Top</div>}
                <div className="ft-card-media">
                  <div className="ft-avatar-wrap"><img src={t.img} alt={t.name} /></div>
                </div>
                <div className="ft-card-body">
                  <div className="ft-card-header">
                    <div>
                      <h3>{t.name}</h3>
                      <div className="muted small">{t.subject} • {t.experience} yrs</div>
                    </div>
                    <div className="ft-price">₹{t.price}/hr</div>
                  </div>
                  <p className="ft-card-bio">{t.bio}</p>
                  <div className="ft-card-footer">
                    <Stars rating={t.rating} />
                    <div className="ft-actions">
                      <button className="btn outline" onClick={() => setSelected(t)}>Profile</button>
                      <button className="btn primary" onClick={() => onBook(t)}>Book</button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {visible < filtered.length && (
            <div className="ft-load-more"><button className="btn" onClick={() => setVisible(v => v + 6)}>Load more</button></div>
          )}
        </main>
      </div>

      {selected && <ProfileModal tutor={selected} onClose={() => setSelected(null)} onBook={onBook} />}
    </div>
  );
}