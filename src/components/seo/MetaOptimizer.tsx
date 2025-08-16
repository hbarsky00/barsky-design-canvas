import React from 'react';
import { Helmet } from 'react-helmet-async';

interface MetaOptimizerProps {
  pageType: 'home' | 'page' | 'blog' | 'project' | 'service';
  title: string;
  description: string;
  url: string;
  image?: string;
  noIndex?: boolean;
}

const MetaOptimizer: React.FC<MetaOptimizerProps> = ({
  pageType,
  title,
  description,
  url,
  image = 'https://barskydesign.pro/images/default-og-image.jpg',
  noIndex = false
}) => {
  // Ensure description is optimal length and separate from title
  const optimizedDescription = description && description.length > 10
    ? (description.length > 160 ? description.substring(0, 157) + '...' : description)
    : "Hiram Barsky – Product Designer + AI Developer helping businesses design smarter, faster, and more user-focused digital products.";

  // Ensure title is optimal length
  const optimizedTitle = title.length > 60 
    ? title.substring(0, 57) + '...'
    : title;

  return (
    <Helmet>
      {/* Separate title and description */}
      <title>{optimizedTitle}</title>
      <meta name="description" content={optimizedDescription} />
      
      {/* Robots directive */}
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow"} />
      <meta name="googlebot" content={noIndex ? "noindex, nofollow" : "index, follow"} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={pageType === 'home' ? 'website' : 'article'} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={optimizedTitle} />
      <meta property="og:description" content={optimizedDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={optimizedTitle} />
      <meta property="og:site_name" content="Hiram Barsky Design - AI-Enhanced Design" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={optimizedTitle} />
      <meta name="twitter:description" content={optimizedDescription} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={optimizedTitle} />
      <meta name="twitter:site" content="@hirambarsky" />
      <meta name="twitter:creator" content="@hirambarsky" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="author" content="Hiram Barsky" />
      <meta name="publisher" content="Hiram Barsky Design" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="en" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="web" />
      <meta name="rating" content="general" />
      
      {/* Geo Meta Tags */}
      <meta name="geo.region" content="US-NY" />
      <meta name="geo.placename" content="New York" />
      <meta name="geo.position" content="40.7128;-74.0060" />
      <meta name="ICBM" content="40.7128, -74.0060" />
      
      {/* Article specific meta tags for blog/project pages */}
      {(pageType === 'blog' || pageType === 'project') && (
        <>
          <meta property="article:author" content="Hiram Barsky" />
          <meta property="article:publisher" content="https://barskydesign.pro" />
          <meta property="article:section" content={pageType === 'blog' ? 'Design & Technology' : 'Case Studies'} />
          <meta name="article:tag" content="UX Design" />
          <meta name="article:tag" content="AI Integration" />
          <meta name="article:tag" content="Product Design" />
        </>
      )}
      
      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      
      {/* DNS prefetch for performance */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
    </Helmet>
  );
};

export default MetaOptimizer;
