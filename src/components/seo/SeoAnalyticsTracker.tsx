
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SeoAnalyticsTrackerProps {
  pageTitle?: string;
  pageType?: 'home' | 'page' | 'blog-post' | 'project' | 'service' | 'case-study';
}

const SeoAnalyticsTracker: React.FC<SeoAnalyticsTrackerProps> = ({ 
  pageTitle, 
  pageType = 'page' 
}) => {
  const location = useLocation();

  useEffect(() => {
    // Track page views for SEO analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'G-321GKNB37Y', {
        page_title: pageTitle,
        page_location: window.location.href,
        page_path: location.pathname,
        custom_map: {
          'custom_parameter_1': 'page_type'
        },
        page_type: pageType
      });

      // Track specific SEO events
      window.gtag('event', 'page_view', {
        event_category: 'SEO',
        event_label: pageType,
        page_title: pageTitle,
        page_path: location.pathname
      });
    }

    // Track core web vitals for SEO performance
    if ('web-vital' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            const navigationEntry = entry as PerformanceNavigationTiming;
            
            // Track page load performance for SEO
            if (window.gtag) {
              window.gtag('event', 'page_load_performance', {
                event_category: 'SEO Performance',
                value: Math.round(navigationEntry.loadEventEnd - navigationEntry.loadEventStart),
                custom_parameter_page_type: pageType
              });
            }
          }
        }
      });
      
      observer.observe({ entryTypes: ['navigation'] });
      
      return () => observer.disconnect();
    }
  }, [location.pathname, pageTitle, pageType]);

  return null; // This component doesn't render anything visible
};

export default SeoAnalyticsTracker;
