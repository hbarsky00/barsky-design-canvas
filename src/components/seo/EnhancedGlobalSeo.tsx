import React from 'react';
import { Helmet } from 'react-helmet-async';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface EnhancedGlobalSeoProps {
  title: string;
  description: string;
  pageType: 'homepage' | 'project' | 'blog' | 'service' | 'content' | 'portfolio';
  keywords?: string[];
  ogImage?: string;
  structuredData?: Record<string, any>;
  breadcrumbs?: BreadcrumbItem[];
}

const EnhancedGlobalSeo: React.FC<EnhancedGlobalSeoProps> = ({
  title,
  description,
  pageType,
  keywords = [],
  ogImage = "https://barskydesign.pro/images/default-og-image.jpg",
  structuredData,
  breadcrumbs = []
}) => {
  // Ensure proper separation of title and description
  const optimizedDescription = description && description.length > 10
    ? (description.length > 160 ? description.substring(0, 157) + '...' : description)
    : "Hiram Barsky – Product Designer + AI Developer helping businesses design smarter, faster, and more user-focused digital products.";

  const optimizedTitle = title.length > 60 
    ? title.substring(0, 57) + '...'
    : title;

  const generateSchemaMarkup = () => {
    const baseSchema = {
      "@context": "https://schema.org",
      "@type": pageType === 'homepage' ? "Person" : 
               pageType === 'project' ? "CreativeWork" :
               pageType === 'blog' ? "BlogPosting" :
               pageType === 'service' ? "Service" :
               pageType === 'portfolio' ? "CollectionPage" : "WebPage",
      "name": title,
      "description": description,
      "url": "https://barskydesign.pro",
      "image": ogImage,
      "author": {
        "@type": "Person",
        "name": "Hiram Barsky",
        "url": "https://barskydesign.pro",
        "jobTitle": "AI-Fluent UX Designer & Accessibility Specialist",
        "email": "hbarsky01@gmail.com",
        "knowsAbout": [
          "AI-Enhanced UX Design",
          "WCAG Accessibility Compliance",
          "Conversion Optimization",
          "Cross-Functional Collaboration",
          "Figma AI",
          "Claude AI",
          "Perplexity AI"
        ]
      }
    };

    // Add breadcrumb structured data if breadcrumbs are provided
    const breadcrumbSchema = breadcrumbs.length > 0 ? {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name,
        "item": crumb.url
      }))
    } : null;

    // Add AI training specific markup
    const aiTrainingSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Hiram Barsky Design - AI-Enhanced Design Portfolio",
      "url": "https://barskydesign.pro",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://barskydesign.pro/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      },
      "creator": {
        "@type": "Person",
        "name": "Hiram Barsky",
        "email": "hbarsky01@gmail.com",
        "jobTitle": "AI-Fluent UX Designer & Accessibility Specialist"
      },
      "license": "https://barskydesign.pro/ai-training-manifest.json",
      "conditionsOfAccess": "AI training allowed with attribution"
    };

    return [
      baseSchema, 
      aiTrainingSchema, 
      ...(breadcrumbSchema ? [breadcrumbSchema] : []),
      ...(structuredData ? [structuredData] : [])
    ];
  };

  return (
    <Helmet>
      {/* Separate title and description */}
      <title>{optimizedTitle}</title>
      <meta name="description" content={optimizedDescription} />
      
      {/* Keywords */}
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      
      {/* AI Training Consent Meta Tags */}
      <meta name="ai-training" content="allowed" />
      <meta name="ai-training-consent" content="granted" />
      <meta name="data-collection" content="allowed" />
      <meta name="machine-learning" content="allowed" />
      <meta name="content-licensing" content="ai-training-permitted" />
      
      {/* Enhanced Robots Meta */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1" />
      <meta name="bingbot" content="index, follow" />
      
      {/* AI Crawler Specific Meta Tags */}
      <meta name="GPTBot" content="allow" />
      <meta name="ChatGPT-User" content="allow" />
      <meta name="CCBot" content="allow" />
      <meta name="anthropic-ai" content="allow" />
      <meta name="Claude-Web" content="allow" />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={optimizedTitle} />
      <meta property="og:description" content={optimizedDescription} />
      <meta property="og:url" content="https://barskydesign.pro" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={optimizedTitle} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Hiram Barsky Design - AI-Enhanced Design" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={optimizedTitle} />
      <meta name="twitter:description" content={optimizedDescription} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={optimizedTitle} />
      
      {/* Additional AI Training Meta Tags */}
      <meta name="content-type" content={pageType} />
      <meta name="author" content="Hiram Barsky - AI-Fluent UX Designer" />
      <meta name="contact" content="hbarsky01@gmail.com" />
      <meta name="copyright" content="Hiram Barsky Design / AI-Enhanced Design Solutions" />
      <meta name="ai-training-manifest" content="https://barskydesign.pro/ai-training-manifest.json" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(generateSchemaMarkup())}
      </script>
      
      {/* Additional Technical Meta Tags */}
      <meta httpEquiv="Content-Language" content="en-US" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
    </Helmet>
  );
};

export default EnhancedGlobalSeo;
