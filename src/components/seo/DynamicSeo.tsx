import React from 'react';
import { Helmet } from 'react-helmet-async';
import { normalizeUrl } from '@/utils/urlUtils';

interface DynamicSeoProps {
  type?: 'home' | 'page' | 'blog' | 'blog-post' | 'project' | 'service';
  title: string;
  description: string;
  image?: string;
  path?: string;
  projectName?: string;
  serviceName?: string;
  results?: string[];
  technologies?: string[];
  benefits?: string[];
  targetAudience?: string;
  noIndex?: boolean;
  // Blog-specific props
  excerpt?: string;
  featuredImage?: string;
  author?: string;
  publishedDate?: string;
  tags?: string[];
  slug?: string;
}

const DynamicSeo: React.FC<DynamicSeoProps> = ({
  type = 'page',
  title,
  description,
  image = '/images/default-og-image.jpg',
  path = '/',
  projectName,
  serviceName,
  results = [],
  technologies = [],
  benefits = [],
  targetAudience,
  noIndex = false,
  excerpt,
  featuredImage,
  author,
  publishedDate,
  tags = [],
  slug
}) => {
  const baseUrl = 'https://barskydesign.pro';
  const canonicalUrl = normalizeUrl(path);
  
  // Use featuredImage if provided, otherwise fall back to image prop, then default
  const socialImage = featuredImage || image;
  
  // Ensure absolute image URL
  const absoluteImageUrl = socialImage.startsWith('http') 
    ? socialImage 
    : `${baseUrl}${socialImage.startsWith('/') ? '' : '/'}${socialImage}`;
  
  // Optimize title and description lengths and ensure separation
  const optimizedTitle = title.length > 60 ? title.substring(0, 57) + '...' : title;
  const optimizedDescription = (excerpt || description).length > 160 
    ? (excerpt || description).substring(0, 157) + '...' 
    : (excerpt || description) || "Hiram Barsky – Product Designer + AI Developer helping businesses design smarter, faster, and more user-focused digital products.";
  
  // Generate structured data for different content types
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
    
    if (type === 'blog' || type === 'blog-post') {
      return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": optimizedTitle,
        "description": optimizedDescription,
        "url": canonicalUrl,
        "image": absoluteImageUrl,
        "author": {
          "@type": "Person",
          "name": author || "Hiram Barsky"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Barsky Design",
          "logo": {
            "@type": "ImageObject",
            "url": `${baseUrl}/lovable-uploads/e8d40a32-b582-44f6-b417-48bdd5c5b6eb.png`
          }
        },
        "datePublished": publishedDate || new Date().toISOString(),
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": canonicalUrl
        },
        "keywords": tags.join(', ')
      };
    }

    if (type === 'service' && serviceName) {
      return {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": serviceName,
        "description": optimizedDescription,
        "url": canonicalUrl,
        "provider": {
          "@type": "Person",
          "name": "Hiram Barsky",
          "jobTitle": "Product Designer & Gen AI Developer"
        },
        "serviceType": "Design & Development",
        "audience": targetAudience
      };
    }
    
    return null;
  };

  const structuredData = generateStructuredData();

  return (
    <Helmet>
      {/* Separate title and description */}
      <title>{optimizedTitle}</title>
      <meta name="description" content={optimizedDescription} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Robots */}
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow, max-snippet:-1, max-image-preview:large"} />
      
      {/* Open Graph */}
      <meta property="og:type" content={type === 'home' ? 'website' : type === 'blog' || type === 'blog-post' ? 'article' : 'website'} />
      <meta property="og:title" content={optimizedTitle} />
      <meta property="og:description" content={optimizedDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={absoluteImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={optimizedTitle} />
      <meta property="og:site_name" content="Hiram Barsky Design" />
      <meta property="og:locale" content="en_US" />
      
      {/* Blog-specific OG tags */}
      {(type === 'blog' || type === 'blog-post') && (
        <>
          <meta property="article:published_time" content={publishedDate || new Date().toISOString()} />
          <meta property="article:author" content={author || "Hiram Barsky"} />
          {tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={optimizedTitle} />
      <meta name="twitter:description" content={optimizedDescription} />
      <meta name="twitter:image" content={absoluteImageUrl} />
      <meta name="twitter:image:alt" content={optimizedTitle} />
      <meta name="twitter:site" content="@hirambarsky" />
      <meta name="twitter:creator" content="@hirambarsky" />
      
      {/* Additional Meta */}
      <meta name="author" content={author || "Hiram Barsky"} />
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
