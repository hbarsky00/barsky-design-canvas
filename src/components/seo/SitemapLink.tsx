import React from 'react';
import { Helmet } from 'react-helmet-async';

const SitemapLink: React.FC = () => (
  <Helmet>
    <link rel="sitemap" type="application/xml" href="https://barskydesign.pro/sitemap.xml" />
  </Helmet>
);

export default SitemapLink;
