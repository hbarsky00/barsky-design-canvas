import React from 'react';
import { Helmet } from 'react-helmet-async';

interface LegacyCaseStudySEOProps {
  title: string;
  description: string;
  image?: string;
  path?: string;
  technologies?: string[];
}

const LegacyCaseStudySEO: React.FC<LegacyCaseStudySEOProps> = ({ 
  title, 
  description, 
  image, 
  path,
  technologies 
}) => {
  const seoTitle = `${title} | Hiram Barsky Design`;
  const seoImage = image || 'https://barskyux.com/wp-content/uploads/2025/06/IMG_20250531_123836_952.webp';
  const canonicalUrl = `https://barskydesign.pro${path || ''}`;
  
  return (
    <Helmet>
      <title>{seoTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="article" />
      <meta property="og:image" content={seoImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Hiram Barsky Design" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={seoImage} />
      <meta name="twitter:site" content="@hirambarsky" />
      <meta name="twitter:creator" content="@hirambarsky" />
      
      {/* Additional SEO meta tags */}
      <meta name="author" content="Hiram Barsky" />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      
      {/* Keywords */}
      {technologies && (
        <meta name="keywords" content={`Hiram Barsky, Product Designer, Gen AI Developer, ${technologies.join(', ')}, user experience design, digital product design, design case study, UX consulting`} />
      )}
      
      {/* JSON-LD Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": title,
          "description": description,
          "url": canonicalUrl,
          "image": {
            "@type": "ImageObject",
            "url": seoImage,
            "width": 1200,
            "height": 630
          },
          "author": {
            "@type": "Person",
            "name": "Hiram Barsky",
            "url": "https://barskydesign.pro"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Hiram Barsky Design",
            "url": "https://barskydesign.pro"
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": canonicalUrl
          }
        }, null, 2)}
      </script>
    </Helmet>
  );
};

export default LegacyCaseStudySEO;
