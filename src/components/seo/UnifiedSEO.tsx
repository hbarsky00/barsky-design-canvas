
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { applySEOForPage } from '@/utils/seoDetection';

interface PageSEOData {
  title: string;
  description: string;
  image: string;
  canonicalUrl: string;
  pageType: 'home' | 'project' | 'blog' | 'service' | 'page';
  schemaData?: any;
}

const UnifiedSEO: React.FC = () => {
  const location = useLocation();
  const [seoData, setSeoData] = useState<PageSEOData | null>(null);

  useEffect(() => {
    // Small delay to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      try {
        const data = applySEOForPage();
        setSeoData(data);
        
        // Update document title immediately for better UX
        document.title = data.title;
      } catch (error) {
        console.error('SEO detection error:', error);
        // Fallback SEO data
        setSeoData({
          title: 'Hiram Barsky Design - Product Designer & Gen AI Developer',
          description: '15+ years creating AI-enhanced digital experiences. Specializing in UX research, design systems, and Gen AI integration.',
          image: 'https://barskydesign.pro/lovable-uploads/e8d40a32-b582-44f6-b417-48bdd5c5b6eb.png',
          canonicalUrl: `https://barskydesign.pro${location.pathname}`,
          pageType: 'page'
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Don't render until we have SEO data
  if (!seoData) {
    return null;
  }

  return (
    <Helmet>
      {/* Remove any existing conflicting tags first */}
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.description} />
      <link rel="canonical" href={seoData.canonicalUrl} />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={seoData.title} />
      <meta property="og:description" content={seoData.description} />
      <meta property="og:url" content={seoData.canonicalUrl} />
      <meta property="og:type" content={seoData.pageType === 'home' ? 'website' : 'article'} />
      <meta property="og:image" content={seoData.image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Hiram Barsky Design" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoData.title} />
      <meta name="twitter:description" content={seoData.description} />
      <meta name="twitter:image" content={seoData.image} />
      <meta name="twitter:site" content="@hirambarsky" />
      <meta name="twitter:creator" content="@hirambarsky" />
      
      {/* Additional SEO meta tags */}
      <meta name="author" content="Hiram Barsky" />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      
      {/* JSON-LD Schema - only for project and blog pages */}
      {(seoData.pageType === 'project' || seoData.pageType === 'blog') && seoData.schemaData && (
        <script type="application/ld+json">
          {JSON.stringify(seoData.schemaData, null, 2)}
        </script>
      )}
    </Helmet>
  );
};

export default UnifiedSEO;
