import React from 'react';
import { Helmet } from 'react-helmet-async';

interface CoreSEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  image?: string;
  noIndex?: boolean;
  noFollow?: boolean;
}

/**
 * Core SEO component with essential meta tags, performance optimizations, and technical SEO
 */
export const CoreSEO: React.FC<CoreSEOProps> = ({
  title = "Hiram Barsky - Product Designer & Gen AI Developer | New Jersey Web Designer",
  description = "Expert Product Designer and Gen AI Developer in New Jersey. Specializing in UX/UI design, web development, and AI-enhanced solutions for modern businesses. 8+ years experience.",
  keywords = [
    "Product Designer New Jersey",
    "Web Designer New Jersey", 
    "Gen AI Developer",
    "UX Designer New Jersey",
    "UI Designer",
    "Hiram Barsky",
    "Barsky Design",
    "Web Development NJ",
    "AI Integration",
    "User Experience Design",
    "Digital Product Design",
    "Responsive Web Design",
    "Design Systems"
  ],
  canonicalUrl = "https://barskydesign.pro",
  image = "https://barskydesign.pro/lovable-uploads/e8d40a32-b582-44f6-b417-48bdd5c5b6eb.png",
  noIndex = false,
  noFollow = false
}) => {
  const robotsContent = `${noIndex ? 'noindex' : 'index'},${noFollow ? 'nofollow' : 'follow'},max-snippet:160,max-image-preview:large,max-video-preview:30`;
  
  return (
    <Helmet>
      {/* Essential Meta Tags */}
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      
      {/* Core SEO Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Robots Meta */}
      <meta name="robots" content={robotsContent} />
      <meta name="googlebot" content={robotsContent} />
      <meta name="bingbot" content={robotsContent} />
      
      {/* Geographic Meta Tags */}
      <meta name="geo.region" content="US-NJ" />
      <meta name="geo.placename" content="New Jersey" />
      <meta name="geo.position" content="40.9370;-74.1318" />
      <meta name="ICBM" content="40.9370, -74.1318" />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Hiram Barsky - Product Designer & Gen AI Developer" />
      <meta property="og:site_name" content="Barsky Design" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@hirambarsky" />
      <meta name="twitter:creator" content="@hirambarsky" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content="Hiram Barsky - Product Designer & Gen AI Developer" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="author" content="Hiram Barsky" />
      <meta name="designer" content="Hiram Barsky" />
      <meta name="copyright" content="© 2024 Barsky Design. All rights reserved." />
      <meta name="rating" content="general" />
      <meta name="distribution" content="global" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Mobile Meta Tags */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="Barsky Design" />
      <meta name="msapplication-TileColor" content="#2563eb" />
      <meta name="theme-color" content="#2563eb" />
      
      {/* Performance & Resource Hints */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      
      {/* Critical CSS Preload */}
      <link rel="preload" as="style" href="/src/index.css" />
      
      {/* Favicon and Icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
      <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
      
      {/* Security Headers */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
      
      {/* Language and Locale */}
      <meta httpEquiv="content-language" content="en-US" />
      <meta name="language" content="English" />
    </Helmet>
  );
};