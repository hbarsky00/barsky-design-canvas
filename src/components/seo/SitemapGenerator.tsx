import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SitemapEntry {
  url: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

const SitemapGenerator: React.FC = () => {
  const location = useLocation();

  const sitemapEntries: SitemapEntry[] = [
    {
      url: 'https://barskydesign.pro',
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'weekly',
      priority: 1.0
    },
    {
      url: 'https://barskydesign.pro/about',
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      url: 'https://barskydesign.pro/services',
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: 0.9
    },
    {
      url: 'https://barskydesign.pro/projects',
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'weekly',
      priority: 0.9
    },
    {
      url: 'https://barskydesign.pro/blog',
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'weekly',
      priority: 0.8
    },
    {
      url: 'https://barskydesign.pro/contact',
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: 0.7
    },
    // Updated case study URLs to match your current routing
    {
      url: 'https://barskydesign.pro/case-studies/herbalink-mobile-herbalist-ux-design',
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      url: 'https://barskydesign.pro/case-studies/splittime-coparenting-app-design',
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      url: 'https://barskydesign.pro/case-studies/investor-loan-portfolio-management',
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      url: 'https://barskydesign.pro/case-studies/wholesale-distribution-ai-solution',
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: 0.8
    }
  ];

  useEffect(() => {
    // Only track sitemap data, don't actually submit to search engines
    const trackSitemapData = () => {
      if (typeof window !== 'undefined') {
        // Just track for analytics - much safer approach
        if (window.gtag) {
          window.gtag('event', 'sitemap_tracked', {
            event_category: 'SEO',
            event_label: 'sitemap_data',
            value: sitemapEntries.length
          });
        }

        // Optional: Log sitemap data for debugging
        if (process.env.NODE_ENV === 'development') {
          console.log('Sitemap data tracked:', {
            totalUrls: sitemapEntries.length,
            lastUpdate: new Date().toISOString(),
            currentPage: location.pathname
          });
        }
      }
    };

    // Track on page load with a small delay
    const timeoutId = setTimeout(trackSitemapData, 1000);

    return () => clearTimeout(timeoutId);
  }, [location.pathname, sitemapEntries.length]);

  // This component doesn't render anything visible
  return null;
};

// ✅ CRITICAL: Make sure you have a default export
export default SitemapGenerator;