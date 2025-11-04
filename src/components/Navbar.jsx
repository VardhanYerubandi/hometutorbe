// src/components/Navbar.jsx
import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const navItems = [
  // Define paths for routing
  { name: 'Home', path: '/' },
  { name: 'Find Tutors', path: '/find-tutors' },
  { name: 'Become a Tutor', path: '/become-a-tutor' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'About Us', path: '/about-us' },
  
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [navToast, setNavToast] = useState({ visible: false, message: '', type: '' });
  const toastTimeoutRef = useRef(null);

  // Derive a display name fallback: prefer name, then email, then 'User'
  const displayName = user ? (user.name || user.email || 'User') : 'User';

  // Close mobile menu when navigating
  const handleNavClick = () => setIsOpen(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');

      // Show success toast on logout
      setNavToast({ visible: true, message: 'Logged out successfully', type: 'success' });
      // Hide after 2s
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
      toastTimeoutRef.current = setTimeout(() => {
        setNavToast({ visible: false, message: '', type: '' });
      }, 2000);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  return (
    <>
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-container">
        {/* Logo (links to Home) */}
        <div className="logo-container">
          <NavLink to="/" className="logo" onClick={handleNavClick} aria-label="Home">
            <svg className="logo-mark" width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
              <defs>
                <linearGradient id="logoGrad" x1="0%" x2="100%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="#1e88e5" />
                  <stop offset="100%" stopColor="#0d47a1" />
                </linearGradient>
              </defs>
              <rect width="48" height="48" rx="10" fill="url(#logoGrad)" />
              <text x="50%" y="60%" textAnchor="middle" fontFamily="Inter, Arial, sans-serif" fontWeight="700" fontSize="18" fill="#ffffff">HT</text>
            </svg>
            <div className="logo-text">
              <span className="brand-primary">Home Tutor</span>
              <span className="brand-strong">Finder</span>
            </div>
          </NavLink>
        </div>

        {/* Desktop Links */}
        <div className="nav-links">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
              onClick={handleNavClick}
            >
              {item.name}
            </NavLink>
          ))}
          {isAuthenticated ? (
            <div className="user-menu">
              <span className="user-info" title={displayName}>
                <User className="user-icon" size={16} />
                <span className="user-name">
                  {displayName && displayName.length > 10 ? `${displayName.slice(0,10)}...` : displayName}
                </span>
              </span>
              <button onClick={handleLogout} className="logout-btn">
                <LogOut size={16} />
                Logout
              </button>
            </div>
          ) : (
            <NavLink to="/auth" className="login-btn">Login</NavLink>
          )}
        </div>

        {/* Mobile Menu Button (Hamburger) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="menu-button"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      <div id="mobile-menu" className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => isActive ? 'mobile-menu-item active' : 'mobile-menu-item'}
            onClick={handleNavClick}
          >
            {item.name}
          </NavLink>
        ))}
        {isAuthenticated ? (
          <>
            <div className="mobile-user-info" title={displayName}>
              <User className="user-icon" size={16} />
              <span className="user-name-mobile">
                {displayName && displayName.length > 10 ? `${displayName.slice(0,10)}...` : displayName}
              </span>
            </div>
            <button onClick={handleLogout} className="mobile-logout-btn">
              <LogOut size={16} />
              Logout
            </button>
          </>
        ) : (
          <NavLink to="/auth" className="mobile-login-btn">Login</NavLink>
        )}
      </div>
    </nav>
      {/* Logout Toast (fixed) */}
      {navToast.visible && (
        <div className={`nav-toast ${navToast.type === 'success' ? 'success' : ''}`} role="status">
          <div className="toast-icon">✓</div>
          <div className="toast-message">{navToast.message}</div>
        </div>
      )}
    </>
  );
};

export default Navbar;