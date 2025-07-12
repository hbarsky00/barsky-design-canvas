import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SocialMediaSEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  author?: string;
  siteName?: string;
}

/**
 * Social Media Optimization component specifically for sharing and crawlers
 */
export const SocialMediaSEO: React.FC<SocialMediaSEOProps> = ({
  title = "Hiram Barsky - Product Designer & Gen AI Developer | New Jersey",
  description = "Expert Product Designer and Gen AI Developer in New Jersey. Specializing in UX/UI design, web development, and AI-enhanced solutions for modern businesses.",
  image = "https://barskydesign.pro/social-share-image.jpg",
  url = "https://barskydesign.pro",
  type = "website",
  author = "Hiram Barsky",
  siteName = "Barsky Design"
}) => {
  return (
    <Helmet>
      {/* Social Media Domain Preconnects */}
      <link rel="preconnect" href="https://www.facebook.com" />
      <link rel="preconnect" href="https://connect.facebook.net" />
      <link rel="preconnect" href="https://platform.twitter.com" />
      <link rel="preconnect" href="https://syndication.twitter.com" />
      <link rel="preconnect" href="https://platform.linkedin.com" />
      <link rel="preconnect" href="https://static.licdn.com" />
      <link rel="preconnect" href="https://media.licdn.com" />
      
      {/* DNS Prefetch for Social Media */}
      <link rel="dns-prefetch" href="//www.facebook.com" />
      <link rel="dns-prefetch" href="//connect.facebook.net" />
      <link rel="dns-prefetch" href="//platform.twitter.com" />
      <link rel="dns-prefetch" href="//syndication.twitter.com" />
      <link rel="dns-prefetch" href="//platform.linkedin.com" />
      <link rel="dns-prefetch" href="//static.licdn.com" />
      
      {/* Optimized Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />
      
      {/* Article-specific tags */}
      {type === 'article' && (
        <>
          <meta property="og:article:author" content={author} />
          <meta property="og:article:section" content="Design & Technology" />
          <meta property="og:article:published_time" content={new Date().toISOString()} />
        </>
      )}
      
      {/* Twitter Card Optimization */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@hirambarsky" />
      <meta name="twitter:creator" content="@hirambarsky" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={title} />
      
      {/* LinkedIn Optimization */}
      <meta property="og:image:secure_url" content={image} />
      <meta name="linkedin:owner" content="hirambarsky" />
      
      {/* Facebook Optimization */}
      <meta property="fb:app_id" content="your-facebook-app-id" />
      <meta property="fb:pages" content="your-facebook-page-id" />
      
      {/* Social Media Crawler Optimizations */}
      <meta name="robots" content="index,follow,max-snippet:160,max-image-preview:large" />
      <meta name="googlebot" content="index,follow,max-snippet:160,max-image-preview:large" />
      
      {/* Specific bot instructions */}
      <meta name="facebookbot" content="index,follow" />
      <meta name="twitterbot" content="index,follow" />
      <meta name="linkedinbot" content="index,follow" />
      
      {/* Preload social share image */}
      <link rel="preload" href={image} as="image" type="image/jpeg" />
      
      {/* Cache control for social media crawlers */}
      <meta httpEquiv="Cache-Control" content="public, max-age=31536000" />
    </Helmet>
  );
};