
module.exports = {
  include: [
    "/",
    "/projects", 
    "/contact",
    "/about",
    "/blog",
    "/services",
    
    // Project case studies
    "/project/herbalink",
    "/project/splittime", 
    "/project/business-management",
    "/project/investor-loan-app",
    "/project/medication-app",
    "/project/gold2crypto",
    "/project/dae-search",
    "/project/barskyjoint",
    "/project/wholesale-distribution",
    
    // Service pages
    "/design-services/ux-ui-design",
    "/design-services/web-development",
    "/design-services/mobile-app-design",
    
    // Additional pages
    "/store",
    "/get-started", 
    "/free-audit",
    "/services/mvp-validation",
    "/services/conversion-audit",
    "/services/ai-redesign",
    "/linkedin-visitors"
  ],
  skipThirdPartyRequests: true,
  cacheAjaxRequests: false,
  puppeteerArgs: ["--no-sandbox", "--disable-setuid-sandbox"],
  crawl: false,
  waitFor: 2000, // Increased wait time for proper rendering
  destination: "dist",
  
  // Enhanced prerendering options
  minifyHtml: {
    collapseWhitespace: false,
    removeComments: false
  },
  
  // Fix for SPA routing
  fixWebpackChunksIssue: false,
  
  // Custom function to inject meta tags during prerendering
  preloadImages: true,
  
  // Handle client-side routing
  fixInsertRule: true,
  
  // Custom puppeteer options for social media crawlers
  puppeteerExecutablePath: undefined,
  
  // Viewport settings to match social media crawlers
  viewport: {
    width: 1200,
    height: 630
  },
  
  // User agent to simulate social media crawlers
  userAgent: "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)"
};
