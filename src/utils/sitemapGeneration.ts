interface SitemapEntry {
  url: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

const BASE_URL = 'https://barskydesign.pro';

/**
 * Generates complete sitemap entries for all pages
 */
export const generateSitemapEntries = (): SitemapEntry[] => {
  const currentDate = new Date().toISOString().split('T')[0];
  
  const staticPages: SitemapEntry[] = [
    // High priority pages
    {
      url: BASE_URL,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 1.0
    },
    {
      url: `${BASE_URL}/projects`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.9
    },
    {
      url: `${BASE_URL}/services`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.9
    },
    
    // Case study pages - high priority for SEO
    {
      url: `${BASE_URL}/project/herbalink`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      url: `${BASE_URL}/project/splittime`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      url: `${BASE_URL}/project/business-management`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      url: `${BASE_URL}/project/investor-loan-app`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      url: `${BASE_URL}/project/medication-app`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7
    },
    {
      url: `${BASE_URL}/project/gold2crypto`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7
    },
    {
      url: `${BASE_URL}/project/dae-search`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7
    },
    {
      url: `${BASE_URL}/project/barskyjoint`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7
    },
    
    // Other pages
    {
      url: `${BASE_URL}/about`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7
    },
    {
      url: `${BASE_URL}/contact`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7
    },
    {
      url: `${BASE_URL}/blog`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.8
    }
  ];

  return staticPages;
};

/**
 * Generates sitemap XML content
 */
export const generateSitemapXML = (): string => {
  const entries = generateSitemapEntries();
  
  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(entry => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return xmlContent;
};

/**
 * Submits sitemap to search engines
 */
export const submitSitemapToSearchEngines = async (): Promise<void> => {
  const sitemapUrl = `${BASE_URL}/sitemap.xml`;
  
  try {
    // Ping Google
    const googlePingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;
    
    // Bing submission URL
    const bingPingUrl = `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;
    
    // Submit to search engines (these will fail in dev but work in production)
    try {
      await fetch(googlePingUrl, { method: 'GET' });
      console.log('✅ Sitemap submitted to Google');
    } catch (error) {
      console.log('⚠️ Google sitemap ping failed (expected in development)');
    }
    
    try {
      await fetch(bingPingUrl, { method: 'GET' });
      console.log('✅ Sitemap submitted to Bing');
    } catch (error) {
      console.log('⚠️ Bing sitemap ping failed (expected in development)');
    }

    // Track submission for analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'sitemap_submission', {
        event_category: 'SEO',
        event_label: 'automatic_submission',
        value: generateSitemapEntries().length
      });
    }
    
  } catch (error) {
    console.error('Sitemap submission error:', error);
  }
};
