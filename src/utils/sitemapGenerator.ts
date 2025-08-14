
import { BASE_URL } from './urlUtils';

interface SitemapEntry {
  url: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

/**
 * Generates dynamic sitemap.xml content
 */
export const generateSitemap = (): string => {
  const currentDate = new Date().toISOString().split('T')[0];
  
  const entries: SitemapEntry[] = [
    // Homepage
    {
      url: BASE_URL,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 1.0
    },
    
    // Main pages
    {
      url: `${BASE_URL}/about`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      url: `${BASE_URL}/services`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.9
    },
    {
      url: `${BASE_URL}/projects`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.9
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
    },
    
    // Project pages
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
      priority: 0.8
    },
    {
      url: `${BASE_URL}/project/gold2crypto`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      url: `${BASE_URL}/project/dae-search`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      url: `${BASE_URL}/project/barskyjoint`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      url: `${BASE_URL}/project/wholesale-distribution`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8
    }
  ];
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(entry => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
  
  return xml;
};

/**
 * Submits sitemap to search engines
 */
export const submitSitemapToSearchEngines = async (): Promise<void> => {
  const sitemapUrl = `${BASE_URL}/sitemap.xml`;
  
  try {
    // Ping Google
    await fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`, {
      method: 'GET'
    }).catch(() => {
      console.log('Google sitemap ping failed (expected in development)');
    });
    
    // Ping Bing
    await fetch(`https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`, {
      method: 'GET'
    }).catch(() => {
      console.log('Bing sitemap ping failed (expected in development)');
    });
    
    console.log('✅ Sitemap submitted to search engines');
  } catch (error) {
    console.error('❌ Failed to submit sitemap:', error);
  }
};
