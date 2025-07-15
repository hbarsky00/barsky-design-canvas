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
      url: 'https://barskydesign.pro/contact',
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      url: 'https://barskydesign.pro/get-started',
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: 0.9
    },
    {
      url: 'https://barskydesign.pro/services/mvp-validation',
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      url: 'https://barskydesign.pro/services/conversion-audit',
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      url: 'https://barskydesign.pro/services/ai-redesign',
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      url: 'https://barskydesign.pro/free-audit',
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: 0.7
    },
    {
      url: 'https://barskydesign.pro/design-services/ux-ui-design',
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      url: 'https://barskydesign.pro/design-services/web-development',
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      url: 'https://barskydesign.pro/design-services/mobile-app-design',
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: 0.8
    },
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
    },
    {
      url: 'https://barskydesign.pro/blog',
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'weekly',
      priority: 0.7
    },
    {
      url: 'https://barskydesign.pro/store',
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'weekly',
      priority: 0.6
    },
    {
      url: 'https://barskydesign.pro/linkedin-visitors',
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: 0.6
    }
  ];

  useEffect(() => {
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

      if (typeof window !== 'undefined') {
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

    generateSitemap();
  }, [location.pathname]);

  return null;
};

export default SitemapGenerator;
