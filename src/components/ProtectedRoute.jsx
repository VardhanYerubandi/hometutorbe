import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // You could return a loading spinner here
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // Add a smooth transition before redirecting
    if (typeof window !== 'undefined') {
      document.body.style.opacity = '0';
      document.body.style.transition = 'opacity 0.3s ease';
    }

    setTimeout(() => {
      requestAnimationFrame(() => {
        if (typeof window !== 'undefined') {
          document.body.style.opacity = '1';
        }
      });
    }, 150);

    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
}