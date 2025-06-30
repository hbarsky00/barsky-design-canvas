
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getPageConfig, submitUrlForIndexing } from '@/utils/seoUtils';

export const usePageIndexing = () => {
  const location = useLocation();

  useEffect(() => {
    const handlePageIndexing = async () => {
      const config = getPageConfig(location.pathname);
      
      // Construct proper canonical URL
      const baseUrl = 'https://barskydesign.pro';
      const canonicalPath = location.pathname === '/' ? '/' : location.pathname;
      const canonicalUrl = `${baseUrl}${canonicalPath}`;
      
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
        
        // Ensure canonical URL is properly set
        const existingCanonical = document.querySelector('link[rel="canonical"]');
        if (!existingCanonical) {
          const canonicalLink = document.createElement('link');
          canonicalLink.rel = 'canonical';
          canonicalLink.href = canonicalUrl;
          document.head.appendChild(canonicalLink);
        }
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
