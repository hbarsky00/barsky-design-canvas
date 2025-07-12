import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Hook to ensure React Router is fully initialized before rendering SEO components
export const useRouterReady = () => {
  const [isReady, setIsReady] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Wait for React Router to initialize and ensure we're not on index.html
    const timer = setTimeout(() => {
      if (location.pathname !== '/index.html') {
        setIsReady(true);
      }
    }, 100); // Longer delay for slower connections

    return () => clearTimeout(timer);
  }, [location]);

  return isReady;
};