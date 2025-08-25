
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getPageConfig, submitUrlForIndexing } from '@/utils/seoUtils';
// removed getCanonicalUrl import - no longer needed for Pure SSG

export const usePageIndexing = () => {
  const location = useLocation();

  useEffect(() => {
    const handlePageIndexing = async () => {
      const config = getPageConfig(location.pathname);
      
      // Get normalized canonical URL
      const canonicalUrl = `https://barskydesign.pro${location.pathname}`;
      
      // Submit URL for indexing
      await submitUrlForIndexing(canonicalUrl);
      
      // Enhanced meta tags for better crawling - BUT NO CANONICAL TAGS
      const addCrawlingHints = () => {
        // Remove existing crawling hints (but NOT canonical tags - UnifiedSEO handles those)
        const existingHints = document.querySelectorAll('meta[name*="crawl"]:not([rel="canonical"]), link[rel="next"], link[rel="prev"]');
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
        
        // IMPORTANT: Do NOT create canonical tags here - UnifiedSEO is the ONLY source
      };
      
      addCrawlingHints();
      
      // Log for debugging
      console.log('🔍 Page Indexing Enhanced:', {
        path: location.pathname,
        priority: config.priority,
        changeFreq: config.changeFreq,
        canonicalUrl: canonicalUrl,
        note: 'Canonical handled by UnifiedSEO only'
      });
    };

    // Delay execution to ensure page is fully loaded
    const timer = setTimeout(handlePageIndexing, 1000);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);
};
