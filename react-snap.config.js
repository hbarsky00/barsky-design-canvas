
module.exports = {
  crawl: true,
  include: [
    "/",
    "/about",
    "/projects", 
    "/contact",
    "/case-studies/herbalink-ai-herbalist-platform",
    "/case-studies/splittime-coparenting-app-design",
    "/case-studies/investor-loan-portfolio-management", 
    "/case-studies/wholesale-distribution-ai-solution",
    "/project/business-management",
    "/project/wholesale-distribution",
    "/project/investment-app",
    "/project/herbalink",
    "/project/splittime",
    "/project/investor-loan-app",
    "/design-services/ux-ui-design",
    "/design-services/web-development",
    "/design-services/mobile-app-design",
    "/design-services/ai-automation",
    "/design-services/conversion-optimization",
    "/blog/ai-ux-design-trends",
    "/blog/conversion-rate-optimization",
    "/blog/mobile-first-design",
    "/blog/user-research-methods",
    "/blog/design-system-benefits"
  ],
  skipThirdPartyRequests: true,
  cacheAjaxRequests: false,
  preloadImages: false,
  minifyHtml: { 
    removeComments: true,
    collapseWhitespace: true
  },
  waitFor: 1000,
  destination: "dist"
};
