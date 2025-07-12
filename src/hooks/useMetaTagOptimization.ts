import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { injectMetaTagsForCrawlers } from '@/utils/metaTagInjection';

// Hook to optimize meta tags for crawlers
export const useMetaTagOptimization = () => {
  const location = useLocation();

  useEffect(() => {
    // Detect if this is likely a crawler or social media bot
    const userAgent = navigator.userAgent.toLowerCase();
    const isCrawler = [
      'googlebot',
      'bingbot',
      'slurp',
      'duckduckbot',
      'baiduspider',
      'yandexbot',
      'facebookexternalhit',
      'twitterbot',
      'linkedinbot',
      'whatsapp',
      'telegrambot'
    ].some(bot => userAgent.includes(bot));

    // Also check for LinkedIn Post Inspector user agent patterns
    const isLinkedInInspector = userAgent.includes('linkedin') || 
                               userAgent.includes('LinkedInBot') ||
                               document.referrer.includes('linkedin.com');

    // Inject optimized meta tags immediately for crawlers
    if (isCrawler || isLinkedInInspector) {
      console.log('Crawler detected, injecting optimized meta tags for:', location.pathname);
      injectMetaTagsForCrawlers(location.pathname);
    }

    // Also inject for development to test
    if (import.meta.env.DEV) {
      console.log('Development mode: injecting meta tags for:', location.pathname);
      injectMetaTagsForCrawlers(location.pathname);
    }

    // Force update document title and meta description immediately
    const timer = setTimeout(() => {
      // This ensures React's changes are preserved while giving crawlers immediate access
      const currentCanonical = document.querySelector('link[rel="canonical"]');
      if (currentCanonical) {
        console.log('Current canonical URL:', currentCanonical.getAttribute('href'));
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return null;
};