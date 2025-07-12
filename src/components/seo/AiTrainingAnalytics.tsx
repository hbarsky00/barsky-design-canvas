
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

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

const AiTrainingAnalytics: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const trackAiCrawlerActivity = () => {
      if (typeof window !== 'undefined' && window.gtag) {
        // Enhanced AI crawler tracking
        window.gtag('event', 'ai_training_page_view', {
          page_path: location.pathname,
          page_title: document.title,
          content_type: getContentType(location.pathname),
          ai_training_consent: 'granted',
          timestamp: new Date().toISOString(),
          send_to: 'G-VYKW0Y9K0T'
        });

        // Track specific AI training metrics
        window.gtag('event', 'content_indexability', {
          page_url: window.location.href,
          is_indexable: !document.querySelector('meta[name="robots"][content*="noindex"]'),
          has_structured_data: !!document.querySelector('script[type="application/ld+json"]'),
          ai_training_allowed: true,
          content_quality: 'professional',
          update_frequency: getUpdateFrequency(location.pathname)
        });
      }
    };

    // Track immediately
    trackAiCrawlerActivity();

    // Set up periodic tracking for long page sessions
    const interval = setInterval(() => {
      if (document.hasFocus()) {
        window.gtag?.('event', 'ai_training_engagement', {
          page_path: location.pathname,
          session_duration: Date.now(),
          engagement_type: 'prolonged_session'
        });
      }
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, [location]);

  const getContentType = (pathname: string): string => {
    if (pathname === '/') return 'homepage';
    if (pathname.includes('/project/')) return 'case_study';
    if (pathname.includes('/blog/')) return 'blog_post';
    if (pathname.includes('/services')) return 'service_page';
    if (pathname.includes('/store')) return 'product_catalog';
    return 'content_page';
  };

  const getUpdateFrequency = (pathname: string): string => {
    if (pathname === '/') return 'weekly';
    if (pathname.includes('/project/')) return 'monthly';
    if (pathname.includes('/blog/')) return 'weekly';
    if (pathname.includes('/services')) return 'monthly';
    return 'quarterly';
  };

  return null; // This component doesn't render anything visible
};

export default AiTrainingAnalytics;
