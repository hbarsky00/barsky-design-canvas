
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { normalizeUrl } from '@/utils/urlUtils';

interface DynamicSeoProps {
  type?: 'home' | 'page' | 'blog' | 'project' | 'service';
  title: string;
  description: string;
  image?: string;
  path?: string;
  projectName?: string;
  results?: string[];
  technologies?: string[];
  noIndex?: boolean;
}

const DynamicSeo: React.FC<DynamicSeoProps> = ({
  type = 'page',
  title,
  description,
  image = '/lovable-uploads/e8d40a32-b582-44f6-b417-48bdd5c5b6eb.png',
  path = '/',
  projectName,
  results = [],
  technologies = [],
  noIndex = false
}) => {
  const baseUrl = 'https://barskydesign.pro';
  const canonicalUrl = normalizeUrl(path);
  
  // Ensure absolute image URL
  const absoluteImageUrl = image.startsWith('http') 
    ? image 
    : `${baseUrl}${image.startsWith('/') ? '' : '/'}${image}`;
  
  // Optimize title and description lengths
  const optimizedTitle = title.length > 60 ? title.substring(0, 57) + '...' : title;
  const optimizedDescription = description.length > 160 ? description.substring(0, 157) + '...' : description;
  
  // Generate structured data for projects
  const generateStructuredData = () => {
    if (type === 'project' && projectName) {
      return {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "name": projectName,
        "description": optimizedDescription,
        "url": canonicalUrl,
        "image": {
          "@type": "ImageObject",
          "url": absoluteImageUrl,
          "width": 1200,
          "height": 630
        },
        "author": {
          "@type": "Person",
          "name": "Hiram Barsky",
          "jobTitle": "Product Designer & Gen AI Developer"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Barsky Design",
          "url": baseUrl
        },
        "keywords": technologies.join(', ')
      };
    }
    
    if (type === 'blog') {
      return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": optimizedTitle,
        "description": optimizedDescription,
        "url": canonicalUrl,
        "image": absoluteImageUrl,
        "author": {
          "@type": "Person",
          "name": "Hiram Barsky"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Barsky Design",
          "logo": {
            "@type": "ImageObject",
            "url": `${baseUrl}/lovable-uploads/e8d40a32-b582-44f6-b417-48bdd5c5b6eb.png`
          }
        },
        "datePublished": new Date().toISOString(),
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": canonicalUrl
        }
      };
    }
    
    return null;
  };

  const structuredData = generateStructuredData();

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{optimizedTitle}</title>
      <meta name="description" content={optimizedDescription} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Robots */}
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow, max-snippet:-1, max-image-preview:large"} />
      
      {/* Open Graph */}
      <meta property="og:type" content={type === 'home' ? 'website' : 'article'} />
      <meta property="og:title" content={optimizedTitle} />
      <meta property="og:description" content={optimizedDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={absoluteImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={optimizedTitle} />
      <meta property="og:site_name" content="Hiram Barsky Design" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={optimizedTitle} />
      <meta name="twitter:description" content={optimizedDescription} />
      <meta name="twitter:image" content={absoluteImageUrl} />
      <meta name="twitter:image:alt" content={optimizedTitle} />
      <meta name="twitter:site" content="@hirambarsky" />
      <meta name="twitter:creator" content="@hirambarsky" />
      
      {/* Additional Meta */}
      <meta name="author" content="Hiram Barsky" />
      <meta name="theme-color" content="#3B82F6" />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData, null, 2)}
        </script>
      )}
    </Helmet>
  );
};

export default DynamicSeo;
