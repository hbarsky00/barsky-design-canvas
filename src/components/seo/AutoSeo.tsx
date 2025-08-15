
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { applySEOForPage, PageSEOData } from '@/utils/seoAutoDetector';
import { BASE_URL } from '@/utils/urlUtils';

interface AutoSeoProps {
  fallbackTitle?: string;
  fallbackDescription?: string;
  fallbackImage?: string;
}

/**
 * Auto-detecting SEO component that uses DOM inspection to generate meta tags
 */
const AutoSeo: React.FC<AutoSeoProps> = ({
  fallbackTitle = 'Hiram Barsky - Product Designer & Gen AI Developer',
  fallbackDescription = 'Expert Product Designer specializing in Gen AI integration and user-centered design solutions.',
  fallbackImage = `${BASE_URL}/lovable-uploads/e8d40a32-b582-44f6-b417-48bdd5c5b6eb.png`
}) => {
  const location = useLocation();
  const [seoData, setSeoData] = React.useState<PageSEOData | null>(null);

  useEffect(() => {
    // Wait for component mount and DOM updates
    const detectAndApply = () => {
      try {
        const detectedData = applySEOForPage();
        setSeoData(detectedData);
      } catch (error) {
        console.error('AutoSeo detection failed:', error);
        // Use fallbacks
        setSeoData({
          title: fallbackTitle,
          description: fallbackDescription,
          image: fallbackImage,
          url: `${BASE_URL}${location.pathname}`,
          type: 'website'
        });
      }
    };

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(detectAndApply, 50);
    return () => clearTimeout(timeoutId);
  }, [location.pathname, fallbackTitle, fallbackDescription, fallbackImage]);

  if (!seoData) {
    // Return basic fallback meta tags while detecting
    return (
      <Helmet>
        <title>{fallbackTitle}</title>
        <meta name="description" content={fallbackDescription} />
        <link rel="canonical" href={`${BASE_URL}${location.pathname}`} />
        <meta property="og:title" content={fallbackTitle} />
        <meta property="og:description" content={fallbackDescription} />
        <meta property="og:image" content={fallbackImage} />
        <meta property="og:url" content={`${BASE_URL}${location.pathname}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fallbackTitle} />
        <meta name="twitter:description" content={fallbackDescription} />
        <meta name="twitter:image" content={fallbackImage} />
      </Helmet>
    );
  }

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.description} />
      <link rel="canonical" href={seoData.url} />
      
      {/* Open Graph Tags */}
      <meta property="og:type" content={seoData.type} />
      <meta property="og:title" content={seoData.title} />
      <meta property="og:description" content={seoData.description} />
      <meta property="og:url" content={seoData.url} />
      <meta property="og:image" content={seoData.image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={seoData.title} />
      <meta property="og:site_name" content="Hiram Barsky Design" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@hirambarsky" />
      <meta name="twitter:creator" content="@hirambarsky" />
      <meta name="twitter:title" content={seoData.title} />
      <meta name="twitter:description" content={seoData.description} />
      <meta name="twitter:image" content={seoData.image} />
      <meta name="twitter:image:alt" content={seoData.title} />
      
      {/* Article Schema for project/blog pages */}
      {seoData.type === 'article' && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": seoData.title,
            "description": seoData.description,
            "image": [seoData.image],
            "author": {
              "@type": "Person",
              "name": "Hiram Barsky",
              "url": `${BASE_URL}/about`
            },
            "publisher": {
              "@type": "Organization",
              "name": "Barsky Design",
              "logo": {
                "@type": "ImageObject",
                "url": `${BASE_URL}/lovable-uploads/e8d40a32-b582-44f6-b417-48bdd5c5b6eb.png`
              }
            },
            "url": seoData.url,
            "datePublished": new Date().toISOString(),
            "dateModified": new Date().toISOString(),
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": seoData.url
            }
          })}
        </script>
      )}
    </Helmet>
  );
};

export default AutoSeo;
