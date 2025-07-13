
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getPageConfig, submitUrlForIndexing } from '@/utils/seoUtils';
import { getCanonicalUrl } from '@/utils/urlUtils';

export const usePageIndexing = () => {
  const location = useLocation();

  useEffect(() => {
    const handlePageIndexing = async () => {
      const config = getPageConfig(location.pathname);
      
      // Get normalized canonical URL
      const canonicalUrl = getCanonicalUrl(location.pathname);
      
      // Submit URL for indexing
      await submitUrlForIndexing(canonicalUrl);
      
      // Enhanced meta tags for better crawling
      const addCrawlingHints = () => {
        // Remove existing crawling hints
        const existingHints = document.querySelectorAll('meta[name*="crawl"], link[rel="next"], link[rel="prev"]');
        existingHints.forEach(hint => hint.remove());
        
        // Add crawling priority hints
        const crawlMeta = document.createElement('meta');
        crawlMeta.name = 'crawl-priority';
        crawlMeta.content = config.priority;
        document.head.appendChild(crawlMeta);
        
        // Add fetch priority for high-priority pages
        if (config.priority === 'high') {
          const fetchMeta = document.createElement('meta');
          fetchMeta.name = 'fetch-priority';
          fetchMeta.content = 'high';
          document.head.appendChild(fetchMeta);
        }
        
        // Skip canonical URL creation - handled by SEO components to prevent duplicates
        // This prevents the hook from creating additional canonical tags
      };
      
      addCrawlingHints();
      
      // Log for debugging
      console.log('🔍 Page Indexing Enhanced:', {
        path: location.pathname,
        priority: config.priority,
        changeFreq: config.changeFreq,
        canonicalUrl: canonicalUrl,
        indexingSignals: 'enhanced'
      });
    };

    // Delay execution to ensure page is fully loaded
    const timer = setTimeout(handlePageIndexing, 1000);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);
};
