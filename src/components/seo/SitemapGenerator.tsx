import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { generateSitemapXML, submitSitemapToSearchEngines } from '@/utils/sitemapGeneration';

interface SitemapEntry {
  url: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

const SitemapGenerator: React.FC = () => {
  const location = useLocation();

  // Client-side sitemap submission using utilities
  useEffect(() => {
    const run = async () => {
      try {
        const sitemapXml = generateSitemapXML();
        console.log('[Sitemap] Generated XML length:', sitemapXml.length);
        await submitSitemapToSearchEngines();
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'sitemap_submitted', {
            event_category: 'SEO',
            value: 1,
          });
        }
      } catch (error) {
        console.error('[Sitemap] Submission failed:', error);
      }
    };

    run();
  }, [location.pathname]);

  return null; // This component doesn't render anything visible
};

export default SitemapGenerator;