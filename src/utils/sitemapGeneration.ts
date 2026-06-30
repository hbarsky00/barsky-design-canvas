import { blogPosts } from '@/data/blogData';

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
  
  // Only include canonical, non-redirecting URLs
  // Note: /projects redirects to /#projects, so excluded
  const staticPages: SitemapEntry[] = [
    // High priority pages
    {
      url: BASE_URL,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 1.0
    },
    {
      url: `${BASE_URL}/services`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.9
    },
    
    // Service detail pages - high priority for SEO
    {
      url: `${BASE_URL}/design-services/ux-ui-design`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.9
    },
    {
      url: `${BASE_URL}/design-services/mobile-app-design`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.9
    },
    {
      url: `${BASE_URL}/design-services/web-development`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.9
    },
    {
      url: `${BASE_URL}/store`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7
    },
    
    // Case study pages - only include pages that don't redirect
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

  // Add blog posts dynamically
  const blogEntries: SitemapEntry[] = blogPosts.map(post => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastmod: post.date || currentDate,
    changefreq: 'monthly' as const,
    priority: 0.7
  }));

  return [...staticPages, ...blogEntries];
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
 * Sitemap submission is handled server-side via the seo-handler edge function.
 * Client-side pings to google.com/ping and bing.com/ping fail due to CORS.
 * Submit your sitemap via Google Search Console and Bing Webmaster Tools instead.
 */
export const submitSitemapToSearchEngines = async (): Promise<void> => {
  console.log('Sitemap submission handled server-side. Submit via Search Console.');
};
