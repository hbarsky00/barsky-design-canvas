
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getPageConfig, submitUrlForIndexing } from '@/utils/seoUtils';

export const usePageIndexing = () => {
  const location = useLocation();

  useEffect(() => {
    const handlePageIndexing = async () => {
      const config = getPageConfig(location.pathname);
      const currentUrl = window.location.href;
      
      // Submit URL for indexing
      await submitUrlForIndexing(currentUrl);
      
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
      };
      
      addCrawlingHints();
      
      // Log for debugging
      console.log('🔍 Page Indexing:', {
        path: location.pathname,
        priority: config.priority,
        changeFreq: config.changeFreq,
        url: currentUrl
      });
    };

    // Delay execution to ensure page is fully loaded
    const timer = setTimeout(handlePageIndexing, 1000);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);
};
