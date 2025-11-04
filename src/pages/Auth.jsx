// src/pages/Auth.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState({ visible: false, message: '', type: '', global: false });
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register, loading } = useAuth();
  
  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    role: 'student' // student or tutor
  });

  // Validation state
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  // Basic validation
  const validateField = (name, value) => {
    const error = {};
    switch (name) {
      case 'email':
        if (!value) error.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(value)) error.email = 'Please enter a valid email';
        break;
      case 'password':
        if (!value) error.password = 'Password is required';
        else if (value.length < 8) error.password = 'Password must be at least 8 characters';
        break;
      case 'confirmPassword':
        if (!value) error.confirmPassword = 'Please confirm your password';
        else if (value !== formData.password) error.confirmPassword = 'Passwords do not match';
        break;
      case 'name':
        if (!value && !isLogin) error.name = 'Name is required';
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    // Update errors: set or remove the specific field error so we don't keep stale messages
    setErrors(prev => {
      const next = { ...prev };
      if (error && error[name]) {
        next[name] = error[name];
      } else {
        // no error for this field -> remove any previous error
        delete next[name];
      }
      return next;
    });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, formData[name]);
    setErrors(prev => {
      const next = { ...prev };
      if (error && error[name]) {
        next[name] = error[name];
      } else {
        delete next[name];
      }
      return next;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate all fields
    let formErrors = {};
    Object.keys(formData).forEach(key => {
      if (!isLogin || (key !== 'confirmPassword' && key !== 'name')) {
        const error = validateField(key, formData[key]);
        formErrors = { ...formErrors, ...error };
      }
    });

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
      return;
    }

    try {
      if (isLogin) {
        // Sign in: show a small success toast, then navigate
        await login(formData.email, formData.password);

        const from = location.state?.from?.pathname || "/";

        // Show a global toast similar to logout
        setToast({ visible: true, message: 'Login successful', type: 'success', global: true });

        // Wait briefly so user sees the toast, then navigate
        setTimeout(() => {
          // navigate after toast
          navigate(from, { replace: true });
        }, 1100);
      } else {
        // Registration: show animated success toast, then switch to sign-in
        await register(formData.email, formData.password, {
          name: formData.name,
          role: formData.role
        });

        // Show a global toast similar to login
        setToast({ visible: true, message: 'Registration successful! Please sign in.', type: 'success', global: true });

        // Reset form and validation
        setFormData({
          email: '',
          password: '',
          confirmPassword: '',
          name: '',
          role: 'student'
        });
        setErrors({});
        setTouched({});

        // After a short delay, hide toast and navigate to sign-in
        setTimeout(() => {
          setToast({ visible: false, message: '', type: '' });
          setIsLogin(true);
          navigate('/auth', { replace: true });
        }, 1100);
      }
    } catch (err) {
      setError(err.message || 'Authentication failed. Please try again.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          {/* Keeping this section empty as we're using global toast for both login/register */}
          {/* Card Header */}
          <div className="auth-header">
            <h1>{isLogin ? 'Welcome Back!' : 'Create Account'}</h1>
            <p className="auth-subtitle">
              {isLogin ? 'Sign in to access your account' : 'Join us to start your learning journey'}
            </p>
          </div>

          {/* Error Message */}
          {error && <div className="error-message">{error}</div>}

          {/* Auth Form */}
          <form onSubmit={handleSubmit} className="auth-form">
            {/* Registration Fields */}
            {!isLogin && (
              <>
                <div className="form-group">
                  <div className="floating-label">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={touched.name && errors.name ? 'error' : ''}
                      placeholder=" "
                    />
                    <label htmlFor="name">Full Name</label>
                  </div>
                  {touched.name && errors.name && <span className="error-text">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <div className="role-select">
                    <label>I want to:</label>
                    <div className="role-buttons">
                      <button
                        type="button"
                        className={`role-btn ${formData.role === 'student' ? 'active' : ''}`}
                        onClick={() => setFormData(prev => ({ ...prev, role: 'student' }))}
                      >
                        Learn
                      </button>
                      <button
                        type="button"
                        className={`role-btn ${formData.role === 'tutor' ? 'active' : ''}`}
                        onClick={() => setFormData(prev => ({ ...prev, role: 'tutor' }))}
                      >
                        Teach
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Email Field */}
            <div className="form-group">
              <div className="floating-label">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={touched.email && errors.email ? 'error' : ''}
                  placeholder=" "
                />
                <label htmlFor="email">Email Address</label>
              </div>
              {touched.email && errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            {/* Password Field */}
            <div className="form-group">
              <div className="floating-label">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={touched.password && errors.password ? 'error' : ''}
                  placeholder=" "
                />
                <label htmlFor="password">Password</label>
              </div>
              {touched.password && errors.password && (
                <span className="error-text">{errors.password}</span>
              )}
            </div>

            {/* Confirm Password Field (Registration only) */}
            {!isLogin && (
              <div className="form-group">
                <div className="floating-label">
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={touched.confirmPassword && errors.confirmPassword ? 'error' : ''}
                    placeholder=" "
                  />
                  <label htmlFor="confirmPassword">Confirm Password</label>
                </div>
                {touched.confirmPassword && errors.confirmPassword && (
                  <span className="error-text">{errors.confirmPassword}</span>
                )}
              </div>
            )}

            {/* Submit Button */}
            <button 
              type="submit" 
              className={`auth-submit ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? (
                <span className="loading-spinner"></span>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </button>

            {/* Auth Toggle */}
            <p className="auth-toggle">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                type="button"
                className="toggle-btn"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setFormData({
                    email: '',
                    password: '',
                    confirmPassword: '',
                    name: '',
                    role: 'student'
                  });
                  setErrors({});
                  setTouched({});
                  setError('');
                }}
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </form>

          {/* OAuth Buttons */}
          <div className="oauth-section">
            <div className="divider">
              <span>or continue with</span>
            </div>
            <div className="oauth-buttons">
              <button className="oauth-btn google">
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path fill="currentColor" d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
                </svg>
                <span>Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Global toast (fixed top-right) - reuse nav-toast styles */}
      {toast.visible && toast.global && (
        <div className={`nav-toast ${toast.type === 'success' ? 'success' : ''}`} role="status">
          <div className="toast-icon">✓</div>
          <div className="toast-message">{toast.message}</div>
        </div>
      )}
    </div>
  );
}