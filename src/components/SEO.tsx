
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  author?: string;
  publishedDate?: string;
  tags?: string[];
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  image,
  url,
  type = 'article',
  author = 'Hiram Barsky',
  publishedDate,
  tags = []
}) => {
  const baseUrl = 'https://barskydesign.pro';
  
  // Auto-detect content if not provided
  const detectedTitle = React.useMemo(() => {
    if (title) return title;
    const h1 = document.querySelector('h1');
    return h1?.textContent?.trim() || 'Hiram Barsky - Product Designer & Gen AI Developer';
  }, [title]);

  const detectedDescription = React.useMemo(() => {
    if (description) return description;
    // Find first paragraph after h1
    const h1 = document.querySelector('h1');
    let nextElement = h1?.nextElementSibling;
    while (nextElement) {
      if (nextElement.tagName === 'P' && nextElement.textContent?.trim()) {
        const text = nextElement.textContent.trim();
        return text.length > 160 ? text.substring(0, 157) + '...' : text;
      }
      nextElement = nextElement.nextElementSibling;
    }
    return '15+ years creating AI-enhanced digital experiences. Specializing in UX research, design systems, and Gen AI integration.';
  }, [description]);

  const detectedImage = React.useMemo(() => {
    if (image) {
      return image.startsWith('http') ? image : `${baseUrl}${image}`;
    }
    
    // Auto-detect images from page content
    const heroSelectors = [
      '[data-hero-image] img',
      '.hero img',
      'section:first-of-type img',
      'main img:first-of-type',
      'img[src*="lovable-uploads"]'
    ];

    for (const selector of heroSelectors) {
      const img = document.querySelector(selector) as HTMLImageElement;
      if (img?.src && !img.src.includes('e8d40a32-b582-44f6-b417-48bdd5c5b6eb')) {
        return img.src.startsWith('http') ? img.src : `${baseUrl}${img.src}`;
      }
    }
    
    // Fallback to hero image, not the illustration
    return `${baseUrl}/lovable-uploads/0021bf49-27e4-46b8-b948-ecdcd831a773.png`;
  }, [image, baseUrl]);

  const canonicalUrl = url || `${baseUrl}${window.location.pathname}`;
  
  // Optimize lengths for SEO
  const optimizedTitle = detectedTitle.length > 60 ? detectedTitle.substring(0, 57) + '...' : detectedTitle;
  const optimizedDescription = detectedDescription.length > 160 ? detectedDescription.substring(0, 157) + '...' : detectedDescription;

  const structuredData = React.useMemo(() => {
    const baseSchema = {
      "@context": "https://schema.org",
      "@type": type === 'article' ? "Article" : "WebPage",
      "name": optimizedTitle,
      "headline": optimizedTitle,
      "description": optimizedDescription,
      "url": canonicalUrl,
      "image": {
        "@type": "ImageObject",
        "url": detectedImage,
        "width": 1200,
        "height": 630
      },
      "author": {
        "@type": "Person",
        "name": author,
        "url": `${baseUrl}/about`
      },
      "publisher": {
        "@type": "Organization",
        "name": "Barsky Design",
        "url": baseUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/lovable-uploads/0021bf49-27e4-46b8-b948-ecdcd831a773.png`
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": canonicalUrl
      }
    };

    if (type === 'article') {
      return {
        ...baseSchema,
        "datePublished": publishedDate || new Date().toISOString(),
        "dateModified": publishedDate || new Date().toISOString(),
        "keywords": tags.length > 0 ? tags.join(', ') : "UX Design, Product Design, Gen AI Development"
      };
    }

    return baseSchema;
  }, [optimizedTitle, optimizedDescription, canonicalUrl, detectedImage, author, baseUrl, type, publishedDate, tags]);

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{optimizedTitle}</title>
      <meta name="description" content={optimizedDescription} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="author" content={author} />
      
      {/* Robots */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large" />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={optimizedTitle} />
      <meta property="og:description" content={optimizedDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={detectedImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={optimizedTitle} />
      <meta property="og:site_name" content="Hiram Barsky Design" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={optimizedTitle} />
      <meta name="twitter:description" content={optimizedDescription} />
      <meta name="twitter:image" content={detectedImage} />
      <meta name="twitter:image:alt" content={optimizedTitle} />
      <meta name="twitter:site" content="@hirambarsky" />
      <meta name="twitter:creator" content="@hirambarsky" />
      
      {/* Article-specific meta tags */}
      {type === 'article' && (
        <>
          <meta property="article:author" content={author} />
          <meta property="article:published_time" content={publishedDate || new Date().toISOString()} />
          {tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Additional Meta */}
      <meta name="theme-color" content="#3B82F6" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData, null, 2)}
      </script>
    </Helmet>
  );
};

export default SEO;
