import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Hook to ensure React Router is fully initialized before rendering SEO components
export const useRouterReady = () => {
  const [isReady, setIsReady] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Small delay to ensure router is fully initialized
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 50);

    return () => clearTimeout(timer);
  }, [location]);

  return isReady;
};