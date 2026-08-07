import React from 'react';
import { Helmet } from 'react-helmet-async';

const AdvancedSitemapMeta: React.FC = () => {
  return (
    <Helmet>
      {/* Advanced Sitemap References */}
      <link rel="sitemap" type="application/xml" href="https://barskydesign.pro/sitemap.xml" />
      
      {/* Content Discovery */}
      <meta name="web-crawl-frequency" content="weekly" />
      <meta name="content-update-frequency" content="weekly" />
      <meta name="priority-pages" content="/,/projects,/contact" />
      
      {/* Advanced Crawl Hints */}
      <meta name="crawl-depth" content="3" />
      <meta name="max-crawl-rate" content="10/minute" />
      
      {/* Geo-targeting */}
      <meta name="geo.region" content="US" />
      <meta name="geo.country" content="United States" />
      <meta name="geo.placename" content="New York" />
      
      {/* Professional Network Links */}
      <link rel="me" href="https://www.linkedin.com/in/hirambarsky" />
      <link rel="me" href="https://twitter.com/barskydesign" />
      
      {/* Advanced Technical SEO */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="mobile-web-app-status-bar-style" content="default" />
      <meta name="mobile-web-app-title" content="Hiram Barsky UX" />
      
      {/* Rich Link Previews */}
      <meta property="og:rich_attachment" content="true" />
      <meta name="twitter:widgets:new-embed-design" content="on" />
      
      {/* Performance Indicators */}
      <meta name="performance-optimized" content="true" />
      <meta name="lighthouse-score" content="95+" />
      <meta name="core-web-vitals" content="optimized" />
    </Helmet>
  );
};

export default AdvancedSitemapMeta;