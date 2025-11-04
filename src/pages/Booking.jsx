import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/findTutors.css';

export default function Booking() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const tutorId = state?.tutorId;

  // In a real app we'd fetch tutor details by id. For now show a friendly booking card.
  return (
    <div className="ft-root">
      <div className="ft-container" style={{ paddingTop: 40 }}>
        <header className="ft-hero">
          <div className="ft-hero-inner">
            <h1>Book a trial session</h1>
            <p className="muted">Quick booking flow — confirm your trial session with the tutor.</p>
          </div>
        </header>

        <main style={{ maxWidth: 880, margin: '18px auto' }}>
          <div className="card" style={{ padding: 24, borderRadius: 12, boxShadow: '0 12px 40px rgba(2,6,23,0.06)' }}>
            <h2 style={{ marginTop: 0 }}>Tutor ID: {tutorId ?? '—'}</h2>
            <p className="muted">This is a minimal booking screen. Replace this with a proper booking form, calendar picker, and payment flow.</p>

            <div style={{ display: 'flex', gap: 12, marginTop: 18 }}>
              <button className="btn primary" onClick={() => {
                // fake confirm
                navigate('/', { replace: true });
              }}>Confirm Booking</button>
              <button className="btn outline" onClick={() => navigate(-1)}>Cancel</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
