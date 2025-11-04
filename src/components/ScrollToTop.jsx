import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop({ behavior = 'smooth' }) {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll the window to top whenever the pathname changes
    // Use a small timeout to ensure any route transitions or layout changes complete
    const t = setTimeout(() => {
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, left: 0, behavior });
      }
    }, 50);

    return () => clearTimeout(t);
  }, [pathname, behavior]);

  return null;
}
