
import React from "react";
import { Helmet } from "react-helmet-async";

interface DynamicSeoProps {
  type: "home" | "project" | "blog" | "blog-post" | "about" | "services" | "service" | "page";
  title: string;
  description: string;
  image?: string;
  projectName?: string;
  results?: string[];
  technologies?: string[];
  path: string;
  author?: string;
  publishedDate?: string;
  tags?: string[];
  excerpt?: string;
  featuredImage?: string;
  slug?: string;
  serviceName?: string;
  benefits?: string[];
  targetAudience?: string;
}

const DynamicSeo: React.FC<DynamicSeoProps> = ({
  type,
  title,
  description,
  image,
  projectName,
  results = [],
  technologies = [],
  path,
  author = "Hiram Barsky",
  publishedDate,
  tags = [],
  excerpt,
  featuredImage,
  slug,
  serviceName,
  benefits = [],
  targetAudience
}) => {
  // Get the current domain
  const currentDomain = typeof window !== 'undefined' ? window.location.origin : 'https://barskydesign.pro';
  const canonicalUrl = `${currentDomain}${path}`;
  
  // Use excerpt or description
  const metaDescription = excerpt || description;
  
  // Use featuredImage or image
  const metaImage = featuredImage || image;
  
  // Ensure image URL is absolute and optimized for social sharing
  const getOptimizedImageUrl = (imagePath?: string) => {
    if (!imagePath) return `${currentDomain}/lovable-uploads/e52a884d-0e2f-4470-aae9-56e65adb2de0.png`; // Default image
    
    if (imagePath.startsWith('http')) {
      return imagePath; // Already absolute
    }
    
    // Make relative URLs absolute
    const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
    return `${currentDomain}${cleanPath}`;
  };

  const optimizedImage = getOptimizedImageUrl(metaImage);
  
  // Generate structured data based on type
  const getStructuredData = () => {
    const baseStructuredData = {
      "@context": "https://schema.org",
      "url": canonicalUrl,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": canonicalUrl
      },
      "author": {
        "@type": "Person",
        "name": author,
        "jobTitle": "Product Designer & Gen AI Developer",
        "url": "https://barskydesign.pro",
        "sameAs": [
          "https://www.linkedin.com/in/hirambarsky",
          "https://twitter.com/barskydesign"
        ]
      },
      "publisher": {
        "@type": "Organization",
        "name": "Barsky Design",
        "logo": {
          "@type": "ImageObject",
          "url": `${currentDomain}/lovable-uploads/e52a884d-0e2f-4470-aae9-56e65adb2de0.png`
        }
      }
    };

    if (type === "project") {
      return {
        ...baseStructuredData,
        "@type": "CreativeWork",
        "name": projectName || title,
        "description": metaDescription,
        "image": {
          "@type": "ImageObject",
          "url": optimizedImage,
          "width": 1200,
          "height": 630
        },
        "datePublished": publishedDate || new Date().toISOString().split('T')[0],
        "dateModified": new Date().toISOString().split('T')[0],
        "keywords": [...technologies, ...tags].join(', '),
        "about": {
          "@type": "Thing",
          "name": "User Experience Design",
          "description": "Product design and development case study"
        }
      };
    }

    if (type === "blog" || type === "blog-post") {
      return {
        ...baseStructuredData,
        "@type": "BlogPosting",
        "headline": title,
        "description": metaDescription,
        "image": optimizedImage,
        "datePublished": publishedDate || new Date().toISOString(),
        "dateModified": new Date().toISOString(),
        "keywords": tags.join(', ')
      };
    }

    if (type === "service" || type === "services") {
      return {
        ...baseStructuredData,
        "@type": "Service",
        "name": serviceName || title,
        "description": metaDescription,
        "provider": {
          "@type": "Person",
          "name": author,
          "url": "https://barskydesign.pro"
        },
        "serviceType": "Design & Development",
        "audience": targetAudience ? {
          "@type": "Audience",
          "name": targetAudience
        } : undefined
      };
    }

    return {
      ...baseStructuredData,
      "@type": "WebPage",
      "name": title,
      "description": metaDescription
    };
  };

  // Generate keywords
  const keywords = [
    "Hiram Barsky",
    "Product Designer",
    "Gen AI Developer",
    "UX Design",
    "User Experience",
    ...technologies,
    ...tags
  ].join(', ');

  // Determine OG type
  const getOgType = () => {
    if (type === "blog" || type === "blog-post") return "article";
    return "website";
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Enhanced indexing directives */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={getOgType()} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={optimizedImage} />
      <meta property="og:image:alt" content={`${projectName || serviceName || title} - Hiram Barsky Case Study`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Hiram Barsky - Product Designer & Gen AI Developer" />
      <meta property="og:locale" content="en_US" />
      
      {/* Article specific OG tags */}
      {(type === "blog" || type === "blog-post") && publishedDate && (
        <meta property="article:published_time" content={publishedDate} />
      )}
      {(type === "blog" || type === "blog-post") && author && (
        <meta property="article:author" content={author} />
      )}
      {(type === "blog" || type === "blog-post") && tags.length > 0 && 
        tags.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))
      }
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={optimizedImage} />
      <meta name="twitter:creator" content="@barskydesign" />
      <meta name="twitter:site" content="@barskydesign" />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#3B82F6" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(getStructuredData(), null, 2)}
      </script>
    </Helmet>
  );
};

export default DynamicSeo;
