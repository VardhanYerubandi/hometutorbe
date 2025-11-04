// src/App.jsx
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Auth from './pages/Auth';
import ScrollToTop from './components/ScrollToTop';

// Component Imports - Corrected to match usage in <Route> elements
import HomeSection from './components/HomeSection';
import FindTutorsSection from './components/FindTutorsSection';
import BecomeTutor from './pages/BecomeTutor';
import About from './pages/About';
import Pricing from './pages/Pricing';
import Booking from './pages/Booking';

// Import auth styles
import './styles/auth.css';

function App() {
  const { pathname } = useLocation();
  const isAuthPage = pathname === '/auth';

  return (
    <AuthProvider>
      <ScrollToTop />
      <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Show Navbar except on auth page */}
      {!isAuthPage && <Navbar />}

      <main style={{ flexGrow: 1, paddingTop: isAuthPage ? 0 : '80px' }} className="route-container">
        <Routes>
          
          {/* Home Page: Renders the HomeSection component */}
          <Route path="/" element={<HomeSection />} />
          
          {/* Protected Routes */}
          <Route path="/find-tutors" element={
            <ProtectedRoute>
              <FindTutorsSection />
            </ProtectedRoute>
          } />
          
          <Route path="/become-a-tutor" element={
            <ProtectedRoute>
              <BecomeTutor />
            </ProtectedRoute>
          } />

          <Route path="/book" element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          } />
          
          <Route path="/pricing" element={
            <ProtectedRoute>
              <Pricing />
            </ProtectedRoute>
          } />
          
          <Route path="/about-us" element={<About />} />
          <Route 
            path="/contact" 
            element={<div style={{padding: '100px', textAlign: 'center'}}><h2>Contact Section (Content Placeholder)</h2></div>} 
          />

          {/* Auth Page */}
          <Route path="/auth" element={<Auth />} />
          
          {/* 404 Not Found Handler */}
          <Route 
            path="*" 
            element={<div style={{padding: '100px', textAlign: 'center'}}><h1>404</h1><p>Page Not Found</p></div>} 
          />
          
        </Routes>
      </main>

      {/* Show Footer except on auth page */}
      {!isAuthPage && <Footer />}
    </div>
    </AuthProvider>
  );
}

export default App;