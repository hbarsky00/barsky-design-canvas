
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface IndexingOptimizerProps {
  priority?: 'high' | 'medium' | 'low';
  changeFreq?: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

const IndexingOptimizer: React.FC<IndexingOptimizerProps> = ({ 
  priority = 'medium',
  changeFreq = 'weekly' 
}) => {
  const location = useLocation();

  useEffect(() => {
    // Enhanced indexing signals for search engines
    const addIndexingMeta = () => {
      // Remove any existing indexing meta tags
      const existingMeta = document.querySelectorAll('meta[name*="index"], meta[name="revisit"]');
      existingMeta.forEach(meta => meta.remove());

      // Add comprehensive indexing meta tags
      const metaTags = [
        { name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
        { name: 'googlebot', content: 'index, follow, max-snippet:-1, max-image-preview:large' },
        { name: 'bingbot', content: 'index, follow' },
        { name: 'revisit-after', content: changeFreq === 'daily' ? '1 day' : changeFreq === 'weekly' ? '7 days' : '30 days' },
        { name: 'content-language', content: 'en-US' },
        { name: 'distribution', content: 'global' },
        { name: 'rating', content: 'general' }
      ];

      metaTags.forEach(({ name, content }) => {
        const meta = document.createElement('meta');
        meta.name = name;
        meta.content = content;
        document.head.appendChild(meta);
      });

      // Add priority hints
      const priorityMeta = document.createElement('meta');
      priorityMeta.name = 'priority';
      priorityMeta.content = priority;
      document.head.appendChild(priorityMeta);
    };

    // Submit page to search engines
    const submitToSearchEngines = async () => {
      const currentUrl = window.location.href;
      
      // Track indexing request
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'indexing_request', {
          page_url: currentUrl,
          page_path: location.pathname,
          priority_level: priority,
          change_frequency: changeFreq,
          submission_time: new Date().toISOString()
        });
      }

      // Console log for debugging
      console.log('📊 SEO: Requesting indexing for:', currentUrl, {
        priority,
        changeFreq,
        path: location.pathname
      });
    };

    addIndexingMeta();
    submitToSearchEngines();

    // Cleanup on unmount
    return () => {
      const metaToRemove = document.querySelectorAll('meta[name="priority"]');
      metaToRemove.forEach(meta => meta.remove());
    };
  }, [location.pathname, priority, changeFreq]);

  return null;
};

export default IndexingOptimizer;
