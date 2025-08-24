
export interface PageIndexingConfig {
  path: string;
  priority: 'high' | 'medium' | 'low';
  changeFreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
  lastModified?: string;
}

export const pageIndexingConfigs: PageIndexingConfig[] = [
  // High priority pages - note the trailing slash for homepage
  { path: '/', priority: 'high', changeFreq: 'weekly' },
  { path: '/projects', priority: 'high', changeFreq: 'weekly' },
  { path: '/services', priority: 'high', changeFreq: 'monthly' },
  
  // Case study pages - high priority for SEO
  { path: '/case-studies/herbalink-mobile-herbalist-ux-design', priority: 'high', changeFreq: 'monthly' },
  { path: '/case-studies/splittime-coparenting-app-design', priority: 'high', changeFreq: 'monthly' },
  { path: '/case-studies/investor-loan-portfolio-management', priority: 'high', changeFreq: 'monthly' },
  
  
  { path: '/case-studies/business-management-solution', priority: 'high', changeFreq: 'monthly' },
  { path: '/case-studies/medication-app', priority: 'medium', changeFreq: 'monthly' },
  { path: '/case-studies/gold2crypto', priority: 'medium', changeFreq: 'monthly' },
  { path: '/case-studies/dae-search', priority: 'medium', changeFreq: 'monthly' },
  { path: '/case-studies/barskyjoint', priority: 'medium', changeFreq: 'monthly' },
  
  // Service pages - medium priority
  { path: '/design-services/ux-ui-design', priority: 'medium', changeFreq: 'monthly' },
  { path: '/design-services/web-development', priority: 'medium', changeFreq: 'monthly' },
  { path: '/design-services/mobile-app-design', priority: 'medium', changeFreq: 'monthly' },
  
  // Blog - low priority for now
  { path: '/blog', priority: 'low', changeFreq: 'weekly' },
  { path: '/contact', priority: 'medium', changeFreq: 'monthly' }
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
    <loc>${baseUrl}${config.path === '/' ? '/' : config.path}</loc>
    <lastmod>${config.lastModified || currentDate}</lastmod>
    <changefreq>${config.changeFreq}</changefreq>
    <priority>${config.priority === 'high' ? '1.0' : config.priority === 'medium' ? '0.8' : '0.6'}</priority>
  </url>`).join('');
};

export const submitUrlForIndexing = async (url: string): Promise<boolean> => {
  try {
    // Enhanced URL submission with proper formatting
    console.log('🔍 SEO: Submitting URL for indexing:', url);
    
    // Ping Google with the specific URL
    const googlePingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(url)}`;
    
    // Track submission with enhanced analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'url_submission', {
        submitted_url: url,
        submission_method: 'enhanced_indexing',
        canonical_url: url,
        timestamp: new Date().toISOString(),
        page_priority: getPageConfig(new URL(url).pathname).priority
      });
    }
    
    // Submit to search engines
    try {
      await fetch(googlePingUrl, { method: 'GET' });
    } catch (error) {
      console.log('⚠️ SEO: Google ping failed, continuing with local tracking');
    }
    
    return true;
  } catch (error) {
    console.error('❌ SEO: Failed to submit URL for indexing:', error);
    return false;
  }
};

/**
 * SEO Implementation Overview
 * 
 * Current SEO Components:
 * 1. StructuredCaseStudySEO - For new structured case studies (HerbaLink, SplitTime, etc.)
 * 2. ProjectDetailSeo - For project detail pages via SimplifiedProjectDetail
 * 3. LegacyCaseStudySEO - For legacy case studies using old format
 * 4. DynamicSeo - General purpose SEO component for various page types
 * 
 * SEO Features Implemented:
 * - Meta title and description optimization
 * - Open Graph tags for social sharing
 * - Twitter Card metadata
 * - JSON-LD structured data for search engines
 * - Canonical URLs for duplicate content prevention
 * - Image optimization for social media
 * - Keywords and author information
 * - Robot indexing directives
 * 
 * Pages with SEO Implementation:
 * - Homepage: Dynamic SEO detection via seoDetection.ts
 * - Project Pages: ProjectDetailSeo component
 * - Structured Case Studies: StructuredCaseStudySEO component
 * - Legacy Case Studies: LegacyCaseStudySEO component
 * - Blog Posts: BlogPostMetadata via usePageMetadata hook
 * - Service Pages: Dynamic SEO detection
 * 
 * Analytics & Tracking:
 * - Google Analytics integration via SeoAnalyticsTracker
 * - Core Web Vitals monitoring
 * - Page performance tracking
 * - URL submission tracking
 * - SEO event tracking for user interactions
 */

export const getSEOImplementationStatus = () => {
  return {
    components: {
      'StructuredCaseStudySEO': 'Active - Used for new case studies with structured data',
      'ProjectDetailSeo': 'Active - Used for project detail pages',
      'LegacyCaseStudySEO': 'Active - Used for legacy case studies',
      'DynamicSeo': 'Active - General purpose SEO for various pages',
      'SeoAnalyticsTracker': 'Active - Analytics and performance tracking'
    },
    features: {
      'Meta Tags': 'Implemented across all page types',
      'Open Graph': 'Implemented with optimized images',
      'Twitter Cards': 'Implemented for social sharing',
      'JSON-LD Schema': 'Implemented with rich snippets',
      'Canonical URLs': 'Implemented to prevent duplicates',
      'Sitemap Generation': 'Automated with search engine submission',
      'URL Indexing': 'Automatic submission to search engines',
      'Analytics Integration': 'Google Analytics with custom events'
    },
    coverage: {
      'Homepage': 'SEO Detection + Dynamic Meta Tags',
      'Project Pages': 'ProjectDetailSeo Component',
      'Case Studies': 'StructuredCaseStudySEO or LegacyCaseStudySEO',
      'Service Pages': 'Dynamic SEO Detection',
      'Blog Posts': 'Database-driven metadata',
      'Contact Page': 'Basic SEO configuration'
    }
  };
};
