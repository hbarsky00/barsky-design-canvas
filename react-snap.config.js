module.exports = {
  include: [
    "/",
    "/projects",
    "/about", 
    "/contact",
    "/services",
    "/blog",
    "/project/herbalink",
    "/project/business-management", 
    "/project/splittime",
    "/project/investor-loan-app",
    "/project/wholesale-distribution",
    "/project/investment-app",
    "/design-services/ux-ui-design",
    "/design-services/mobile-app-design", 
    "/design-services/web-development"
  ],
  source: "dist",
  destination: "dist",
  crawl: true,
  waitFor: 2000,
  removeBlobs: true,
  fixWebpackChunksIssue: false,
  skipThirdPartyRequests: true,
  cacheAjaxRequests: false,
  preconnectThirdParty: false,
  inlineCss: true,
  minifyHtml: {
    collapseBooleanAttributes: true,
    collapseWhitespace: true,
    decodeEntities: true,
    keepClosingSlash: true,
    sortAttributes: true,
    sortClassName: true
  }
};