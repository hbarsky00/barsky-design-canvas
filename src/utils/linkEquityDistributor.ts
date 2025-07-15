/**
 * Link Equity Distributor - Optimize internal linking for SEO
 */

export interface LinkEquityMapping {
  source: string;
  target: string;
  context: string;
  priority: 'high' | 'medium' | 'low';
  anchorText: string;
}

/**
 * Comprehensive link equity distribution strategy
 */
export const linkEquityMap: LinkEquityMapping[] = [
  // Home page outgoing links
  { source: '/', target: '/projects', context: 'hero', priority: 'high', anchorText: 'View My Portfolio' },
  { source: '/', target: '/services', context: 'services', priority: 'high', anchorText: 'UX Design Services' },
  { source: '/', target: '/about', context: 'about', priority: 'medium', anchorText: 'About My Background' },
  { source: '/', target: '/contact', context: 'cta', priority: 'high', anchorText: 'Start Your Project' },
  { source: '/', target: '/blog', context: 'blog', priority: 'medium', anchorText: 'Design Insights' },
  
  // Projects page outgoing links
  { source: '/projects', target: '/case-study-herbalink', context: 'featured', priority: 'high', anchorText: 'HerbaLink Case Study' },
  { source: '/projects', target: '/case-study-splittime', context: 'featured', priority: 'high', anchorText: 'SplitTime Case Study' },
  { source: '/projects', target: '/case-study-investor-loan', context: 'featured', priority: 'high', anchorText: 'FinTech Platform' },
  { source: '/projects', target: '/services', context: 'cta', priority: 'medium', anchorText: 'Design Services' },
  { source: '/projects', target: '/contact', context: 'cta', priority: 'medium', anchorText: 'Hire Me' },
  
  // Case study cross-linking
  { source: '/case-study-herbalink', target: '/case-study-splittime', context: 'related', priority: 'medium', anchorText: 'SplitTime App Design' },
  { source: '/case-study-herbalink', target: '/services', context: 'cta', priority: 'high', anchorText: 'Healthcare Design Services' },
  { source: '/case-study-splittime', target: '/case-study-herbalink', context: 'related', priority: 'medium', anchorText: 'HerbaLink Healthcare Platform' },
  { source: '/case-study-splittime', target: '/services', context: 'cta', priority: 'high', anchorText: 'App Design Services' },
  
  // Services page outgoing links
  { source: '/services', target: '/projects', context: 'portfolio', priority: 'high', anchorText: 'View Portfolio Examples' },
  { source: '/services', target: '/case-study-herbalink', context: 'example', priority: 'high', anchorText: 'Healthcare Design Example' },
  { source: '/services', target: '/case-study-splittime', context: 'example', priority: 'high', anchorText: 'App Design Example' },
  { source: '/services', target: '/contact', context: 'cta', priority: 'high', anchorText: 'Get Started' },
  { source: '/services', target: '/about', context: 'credibility', priority: 'medium', anchorText: 'My Experience' },
  
  // About page outgoing links
  { source: '/about', target: '/projects', context: 'portfolio', priority: 'high', anchorText: 'View My Work' },
  { source: '/about', target: '/services', context: 'services', priority: 'high', anchorText: 'Services I Offer' },
  { source: '/about', target: '/blog', context: 'thought', priority: 'medium', anchorText: 'My Design Philosophy' },
  { source: '/about', target: '/contact', context: 'cta', priority: 'high', anchorText: 'Work Together' },
  
  // Blog page outgoing links
  { source: '/blog', target: '/projects', context: 'portfolio', priority: 'high', anchorText: 'Case Studies' },
  { source: '/blog', target: '/services', context: 'services', priority: 'medium', anchorText: 'Professional Services' },
  { source: '/blog', target: '/about', context: 'author', priority: 'medium', anchorText: 'About the Author' },
  { source: '/blog', target: '/contact', context: 'cta', priority: 'medium', anchorText: 'Discuss Your Project' },
  
  // Contact page outgoing links
  { source: '/contact', target: '/projects', context: 'portfolio', priority: 'high', anchorText: 'See My Work' },
  { source: '/contact', target: '/services', context: 'services', priority: 'high', anchorText: 'Service Options' },
  { source: '/contact', target: '/about', context: 'credibility', priority: 'medium', anchorText: 'My Background' },
  { source: '/contact', target: '/blog', context: 'resources', priority: 'low', anchorText: 'Design Resources' },
];

/**
 * Get contextual links for a given page
 */
export const getContextualLinks = (currentPath: string): LinkEquityMapping[] => {
  return linkEquityMap.filter(link => link.source === currentPath);
};

/**
 * Get incoming links for a given page
 */
export const getIncomingLinks = (targetPath: string): LinkEquityMapping[] => {
  return linkEquityMap.filter(link => link.target === targetPath);
};

/**
 * Calculate link equity score for a page
 */
export const calculateLinkEquityScore = (targetPath: string): number => {
  const incomingLinks = getIncomingLinks(targetPath);
  let score = 0;
  
  incomingLinks.forEach(link => {
    switch (link.priority) {
      case 'high':
        score += 3;
        break;
      case 'medium':
        score += 2;
        break;
      case 'low':
        score += 1;
        break;
    }
  });
  
  return score;
};

/**
 * Generate contextual link suggestions for content
 */
export const generateContextualLinkSuggestions = (currentPath: string, context: string): LinkEquityMapping[] => {
  return linkEquityMap.filter(link => 
    link.source === currentPath && 
    link.context === context
  );
};

/**
 * Monitor link equity distribution
 */
export const monitorLinkEquity = () => {
  if (typeof window === 'undefined') return;
  
  const allPages = ['/projects', '/services', '/about', '/blog', '/contact', '/case-study-herbalink', '/case-study-splittime'];
  
  const linkEquityReport = allPages.map(page => ({
    page,
    score: calculateLinkEquityScore(page),
    incomingLinks: getIncomingLinks(page).length,
    outgoingLinks: getContextualLinks(page).length
  }));
  
  console.log('🔗 Link Equity Report:', linkEquityReport);
  
  // Find pages with low link equity
  const lowEquityPages = linkEquityReport.filter(page => page.score < 5);
  if (lowEquityPages.length > 0) {
    console.warn('⚠️ Pages with low link equity:', lowEquityPages);
  }
  
  return linkEquityReport;
};

/**
 * Initialize link equity monitoring
 */
export const initLinkEquityMonitoring = () => {
  if (typeof window === 'undefined') return;
  
  // Monitor on page load
  window.addEventListener('load', () => {
    setTimeout(monitorLinkEquity, 2000);
  });
  
  console.log('🔗 Link equity monitoring initialized');
};