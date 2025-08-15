
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  type?: 'website' | 'article' | 'service';
  title: string;
  description: string;
  url: string;
  image?: string;
  publishedDate?: string;
  modifiedDate?: string;
  author?: string;
  tags?: string[];
}

const SEO: React.FC<SEOProps> = ({
  type = 'website',
  title,
  description,
  url,
  image = 'https://barskydesign.pro/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png',
  publishedDate,
  modifiedDate,
  author = 'Hiram Barsky',
  tags = []
}) => {
  // Ensure absolute URLs
  const absoluteUrl = url.startsWith('http') ? url : `https://barskydesign.pro${url}`;
  const absoluteImage = image.startsWith('http') ? image : `https://barskydesign.pro${image}`;
  
  // Optimize lengths
  const optimizedTitle = title.length > 60 ? title.substring(0, 57) + '...' : title;
  const optimizedDescription = description.length > 160 ? description.substring(0, 157) + '...' : description;
  
  // Generate JSON-LD schema
  const generateSchema = () => {
    const baseSchema = {
      "@context": "https://schema.org",
      "url": absoluteUrl,
      "name": title,
      "description": optimizedDescription,
      "image": absoluteImage,
      "author": {
        "@type": "Person",
        "name": author,
        "url": "https://barskydesign.pro"
      }
    };

    switch (type) {
      case 'article':
        return {
          ...baseSchema,
          "@type": "Article",
          "headline": title,
          "datePublished": publishedDate || new Date().toISOString(),
          "dateModified": modifiedDate || new Date().toISOString(),
          "publisher": {
            "@type": "Organization",
            "name": "Hiram Barsky Design",
            "logo": {
              "@type": "ImageObject",
              "url": absoluteImage
            }
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": absoluteUrl
          },
          "keywords": tags.join(', ')
        };
      
      case 'service':
        return {
          ...baseSchema,
          "@type": "Service",
          "provider": {
            "@type": "Person",
            "name": author,
            "url": "https://barskydesign.pro"
          },
          "serviceType": "Product Design & Gen AI Development"
        };
      
      default:
        return {
          ...baseSchema,
          "@type": type === 'website' ? "WebSite" : "CreativeWork",
          "potentialAction": type === 'website' ? {
            "@type": "SearchAction",
            "target": "https://barskydesign.pro/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          } : undefined
        };
    }
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{optimizedTitle}</title>
      <meta name="description" content={optimizedDescription} />
      <link rel="canonical" href={absoluteUrl} />
      
      {/* Robots */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
      
      {/* Open Graph */}
      <meta property="og:type" content={type === 'website' ? 'website' : 'article'} />
      <meta property="og:title" content={optimizedTitle} />
      <meta property="og:description" content={optimizedDescription} />
      <meta property="og:url" content={absoluteUrl} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Hiram Barsky Design" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={optimizedTitle} />
      <meta name="twitter:description" content={optimizedDescription} />
      <meta name="twitter:image" content={absoluteImage} />
      <meta name="twitter:site" content="@hirambarsky" />
      
      {/* Additional Meta */}
      <meta name="author" content={author} />
      
      {/* Article specific */}
      {type === 'article' && publishedDate && (
        <meta property="article:published_time" content={publishedDate} />
      )}
      {type === 'article' && modifiedDate && (
        <meta property="article:modified_time" content={modifiedDate} />
      )}
      {type === 'article' && tags.map((tag, index) => (
        <meta key={index} property="article:tag" content={tag} />
      ))}
      
      {/* JSON-LD Schema */}
      <script type="application/ld+json">
        {JSON.stringify(generateSchema(), null, 2)}
      </script>
    </Helmet>
  );
};

export default SEO;
