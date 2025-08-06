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
    // Case Studies
    {
      url: 'https://barskydesign.pro/project/herbalink',
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      url: 'https://barskydesign.pro/project/splittime',
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      url: 'https://barskydesign.pro/project/investor-loan-app',
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: 0.8
    }
  ];

  useEffect(() => {
    // Generate and submit sitemap to search engines
    const generateSitemap = () => {
      const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.map(entry => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

      // Submit to search engines
      if (typeof window !== 'undefined') {
        // Ping Google
        const googlePingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent('https://barskydesign.pro/sitemap.xml')}`;
        
        // Use a more reliable method for sitemap submission
        fetch('/api/submit-sitemap', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sitemap: sitemapXml,
            urls: sitemapEntries.map(entry => entry.url)
          })
        }).catch(error => {
          console.log('Sitemap submission fallback:', error);
          // Fallback: Track sitemap generation for analytics
          if (window.gtag) {
            window.gtag('event', 'sitemap_generated', {
              event_category: 'SEO',
              event_label: 'sitemap_xml',
              value: sitemapEntries.length
            });
          }
        });
      }
    };

    // Generate sitemap on page load
    generateSitemap();
  }, [location.pathname]);

  return null; // This component doesn't render anything visible
};

export default SitemapGenerator;