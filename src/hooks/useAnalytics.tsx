
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
    
    // Track project views specifically for case study pages
    if (path.includes('/project/') || path.includes('/case-studies/')) {
      const projectId = path.split('/').pop() || '';
      trackContentEngagement('case_study', projectId, title);
    }
    
    // Send structured data event for improved SEO analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: title,
        page_location: window.location.href,
        page_path: path,
        send_to: 'G-VYKW0Y9K0T'
      });
      
      // Enhanced site mapping data for Google Analytics 4
      window.gtag('event', 'site_map_navigation', {
        current_page: path,
        page_title: title,
        site_section: getSiteSection(path),
        page_type: getPageType(path),
        user_journey: getUserJourney(path),
        timestamp: new Date().toISOString()
      });
    }
  }, [location]);
  
  // Helper function to determine the site section for analytics
  const getSiteSection = (path: string): string => {
    if (path === '/' || path === '') return 'home';
    if (path.includes('/project/') || path.includes('/case-studies/')) return 'portfolio';
    if (path.includes('/projects')) return 'portfolio-list';
    if (path.includes('/services')) return 'services';
    if (path.includes('/design-services')) return 'design-services';
    return 'other';
  };
  
  // Helper function to determine page type for analytics
  const getPageType = (path: string): string => {
    if (path === '/' || path === '') return 'landing';
    if (path.includes('/project/') || path.includes('/case-studies/')) return 'detail';
    if (path.match(/\/(projects|services|design-services)$/)) return 'category';
    if (path.includes('/contact')) return 'contact';
    return 'content';
  };
  
  // Helper function to infer user journey stage
  const getUserJourney = (path: string): string => {
    if (path === '/' || path === '') return 'discovery';
    if (path.includes('/projects') || path.includes('/project/') || path.includes('/case-studies/')) return 'consideration';
    if (path.includes('/services') || path.includes('/design-services')) return 'evaluation';
    if (path.includes('/contact')) return 'conversion';
    return 'engagement';
  };

  return null;
};
