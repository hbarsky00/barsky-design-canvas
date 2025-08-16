
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SeoAnalyticsTrackerProps {
  pageTitle?: string;
  pageType?: 'home' | 'page' | 'blog-post' | 'project' | 'service';
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
        page_path: location.pathname,
        seo_optimized: true,
        has_structured_data: ['project', 'blog-post'].includes(pageType)
      });

      // Track SEO performance metrics
      window.gtag('event', 'seo_page_load', {
        event_category: 'SEO Performance',
        page_type: pageType,
        has_meta_description: document.querySelector('meta[name="description"]') ? 'yes' : 'no',
        has_og_image: document.querySelector('meta[property="og:image"]') ? 'yes' : 'no',
        has_canonical: document.querySelector('link[rel="canonical"]') ? 'yes' : 'no'
      });
    }

    // Enhanced Core Web Vitals tracking for SEO performance
    if ('web-vital' in window || typeof window !== 'undefined') {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            const navigationEntry = entry as PerformanceNavigationTiming;
            
            // Track page load performance for SEO
            if (window.gtag) {
              window.gtag('event', 'page_load_performance', {
                event_category: 'SEO Performance',
                value: Math.round(navigationEntry.loadEventEnd - navigationEntry.loadEventStart),
                page_type: pageType,
                dom_content_loaded: Math.round(navigationEntry.domContentLoadedEventEnd - navigationEntry.domContentLoadedEventStart),
                first_contentful_paint: 'performance' in window ? Math.round(performance.getEntriesByType('paint').find(entry => entry.name === 'first-contentful-paint')?.startTime || 0) : 0
              });
            }
          }
        }
      });
      
      try {
        observer.observe({ entryTypes: ['navigation'] });
      } catch (error) {
        console.log('Performance observer not supported');
      }
      
      return () => observer.disconnect();
    }
  }, [location.pathname, pageTitle, pageType]);

  return null; // This component doesn't render anything visible
};

export default SeoAnalyticsTracker;
