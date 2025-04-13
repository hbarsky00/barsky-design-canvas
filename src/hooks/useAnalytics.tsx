
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '@/lib/analytics';

// Add type declaration for window.gtag
declare global {
  interface Window {
    gtag: (
      command: string,
      target: string,
      params?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}

/**
 * Hook to track page views in Google Analytics
 */
export const useAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname + location.search;
    const title = document.title;
    
    // Track page view when location changes
    trackPageView(path, title);
  }, [location]);

  return null;
};
