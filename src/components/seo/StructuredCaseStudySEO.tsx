
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { StructuredCaseStudyData } from '@/data/structuredCaseStudies';

interface StructuredCaseStudySEOProps {
  caseStudy: StructuredCaseStudyData;
}

const StructuredCaseStudySEO: React.FC<StructuredCaseStudySEOProps> = ({ caseStudy }) => {
  const { title, description, seoData } = caseStudy;
  
  // Use seoData if available, otherwise fall back to basic case study data
  const seoTitle = title;
  const seoDescription = description;
  const seoImage = seoData?.image || 'https://barskyux.com/wp-content/uploads/2025/06/IMG_20250531_123836_952.webp';
  const canonicalUrl = `https://barskydesign.pro${seoData?.path || ''}`;
  
  return (
    <Helmet>
      <title>{seoTitle} | Hiram Barsky Design</title>
      <meta name="description" content={seoDescription} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="article" />
      <meta property="og:image" content={seoImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Hiram Barsky Design" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />
      <meta name="twitter:site" content="@hirambarsky" />
      <meta name="twitter:creator" content="@hirambarsky" />
      
      {/* Additional SEO meta tags */}
      <meta name="author" content="Hiram Barsky" />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      
      {/* Keywords */}
      {seoData?.technologies && (
        <meta name="keywords" content={`Hiram Barsky, Product Designer, Gen AI Developer, ${seoData.technologies.join(', ')}, user experience design, digital product design, design case study, UX consulting`} />
      )}
      
      {/* JSON-LD Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": seoTitle,
          "description": seoDescription,
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

export default StructuredCaseStudySEO;
