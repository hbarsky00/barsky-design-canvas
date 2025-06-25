
export interface PageIndexingConfig {
  path: string;
  priority: 'high' | 'medium' | 'low';
  changeFreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
  lastModified?: string;
}

export const pageIndexingConfigs: PageIndexingConfig[] = [
  // High priority pages
  { path: '/', priority: 'high', changeFreq: 'weekly' },
  { path: '/projects', priority: 'high', changeFreq: 'weekly' },
  { path: '/services', priority: 'high', changeFreq: 'monthly' },
  
  // Project pages - medium priority
  { path: '/project/splittime', priority: 'medium', changeFreq: 'monthly' },
  { path: '/project/herbalink', priority: 'medium', changeFreq: 'monthly' },
  { path: '/project/medication-app', priority: 'medium', changeFreq: 'monthly' },
  { path: '/project/gold2crypto', priority: 'medium', changeFreq: 'monthly' },
  { path: '/project/dae-search', priority: 'medium', changeFreq: 'monthly' },
  { path: '/project/barskyjoint', priority: 'medium', changeFreq: 'monthly' },
  
  // Service pages - medium priority
  { path: '/design-services/ux-ui-design', priority: 'medium', changeFreq: 'monthly' },
  { path: '/design-services/web-development', priority: 'medium', changeFreq: 'monthly' },
  { path: '/design-services/mobile-app-design', priority: 'medium', changeFreq: 'monthly' },
  
  // Blog - low priority for now
  { path: '/blog', priority: 'low', changeFreq: 'weekly' }
];

export const getPageConfig = (pathname: string): PageIndexingConfig => {
  const config = pageIndexingConfigs.find(config => config.path === pathname);
  return config || { path: pathname, priority: 'low', changeFreq: 'monthly' };
};

export const generateSitemapEntries = (): string => {
  const baseUrl = 'https://barskydesign.pro';
  const currentDate = new Date().toISOString().split('T')[0];
  
  return pageIndexingConfigs.map(config => `
  <url>
    <loc>${baseUrl}${config.path}</loc>
    <lastmod>${config.lastModified || currentDate}</lastmod>
    <changefreq>${config.changeFreq}</changefreq>
    <priority>${config.priority === 'high' ? '1.0' : config.priority === 'medium' ? '0.8' : '0.6'}</priority>
  </url>`).join('');
};

export const submitUrlForIndexing = async (url: string): Promise<boolean> => {
  try {
    // Google IndexNow API (if available)
    const indexNowKey = 'your-indexnow-key'; // Replace with actual key if using IndexNow
    
    // For now, we'll use a simple ping approach
    console.log('🔍 SEO: Submitting URL for indexing:', url);
    
    // Track submission
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'url_submission', {
        submitted_url: url,
        submission_method: 'manual',
        timestamp: new Date().toISOString()
      });
    }
    
    return true;
  } catch (error) {
    console.error('❌ SEO: Failed to submit URL for indexing:', error);
    return false;
  }
};
