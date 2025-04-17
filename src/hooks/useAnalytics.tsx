
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView, trackContentEngagement } from '@/lib/analytics';

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
 * Hook to track page views and user interactions in Google Analytics
 */
export const useAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname + location.search;
    const title = document.title;
    
    // Track page view when location changes
    trackPageView(path, title);
    
    // Track project views specifically for project pages
    if (path.includes('/project/')) {
      const projectId = path.split('/').pop() || '';
      trackContentEngagement('project', projectId, title);
    }
    
    // Send structured data event for improved SEO analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: title,
        page_location: window.location.href,
        page_path: path,
        send_to: 'G-VYKW0Y9K0T'
      });
    }
  }, [location]);

  return null;
};
