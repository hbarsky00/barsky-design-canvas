import React from "react";
import { Helmet } from "react-helmet-async";
import { ProjectProps } from "@/components/ProjectCard";
import { ProjectDetails } from "@/data/types/project";

interface ProjectDetailSeoProps {
  project: ProjectProps;
  details: ProjectDetails;
  baseUrl?: string; // Allow passing baseUrl as prop for SSR
}

// Configuration object for better maintainability
const PROJECT_SEO_CONFIG = {
  'herbalink': {
    title: "Herbalink: AI-Enhanced UX Design for Wellness | Hiram Barsky - Product Designer & Gen AI Developer",
    description: "Discover how Gen AI integration and UX design created a wellness platform connecting users with certified herbalists. 78% user satisfaction through AI-powered matching and mobile-first design.",
    slug: 'herbalink-mobile-herbalist-ux-design'
  },
  'investor-loan-app': {
    title: "Investor Loan App: AI-Enhanced FinTech UX | Hiram Barsky - Product Designer & Gen AI Developer",
    description: "FinTech platform transforming real estate investment management through AI-powered portfolio tracking, automated reporting, and intelligent UX design.",
    slug: 'investor-loan-portfolio-management'
  },
  'medication-app': {
    title: "Healthcare App: AI-Powered UX Design | Hiram Barsky - Product Designer & Gen AI Developer",
    description: "Healthcare app UX design: AI-enhanced medication tracking solution improving patient adherence and care coordination through intelligent design approach."
  },
  'splittime': {
    title: "Splittime: AI-Powered Co-Parenting App Design | Hiram Barsky - Product Designer & Gen AI Developer",
    description: "See how AI-enhanced UX design reduced co-parenting scheduling conflicts by 73%. Family-centered platform transforming separated parent communication through intelligent design.",
    slug: 'splittime-coparenting-app-design'
  },
  'gold2crypto': {
    title: "Gold2Crypto: AI-Enhanced Trading UX | Hiram Barsky - Product Designer & Gen AI Developer",
    description: "Crypto trading platform with AI-enhanced UX design: Investment app interface solving complexity issues and improving user confidence in digital asset trading."
  },
  'dae-search': {
    title: "DAE Search: AI-Powered Data Discovery | Hiram Barsky - Product Designer & Gen AI Developer",
    description: "AI-powered search platform UX design: Data discovery interface improving findability and user efficiency through strategic information architecture and intelligent design."
  },
  'barskyjoint': {
    title: "BarskyJoint: AI-Enhanced Cannabis Platform | Hiram Barsky - Product Designer & Gen AI Developer",
    description: "Cannabis e-commerce platform with AI-enhanced UX design: Platform interface solving regulatory compliance and user trust issues in regulated market space."
  },
  'wholesale-distribution': {
    title: "Wholesale Distribution: From Designer to Gen AI Developer | Hiram Barsky Case Study",
    description: "Real conversation to custom AI-powered business solution. How UX expertise evolved into full-stack Gen AI development for wholesale distribution challenges.",
    slug: 'wholesale-distribution-ai-solution'
  }
} as const;

const SITE_CONFIG = {
  defaultBaseUrl: 'https://barskydesign.pro',
  authorName: 'Hiram Barsky - Product Designer & Gen AI Developer',
  twitterHandle: '@barskydesign',
  themeColor: '#3B82F6',
  defaultImageDimensions: { width: 1200, height: 630 }
};

const ProjectDetailSeo: React.FC<ProjectDetailSeoProps> = ({ 
  project,
  details,
  baseUrl
}) => {
  // Safe URL handling for SSR compatibility
  const currentDomain = typeof window !== 'undefined' ? window.location.origin : SITE_CONFIG.defaultBaseUrl;
  const isProduction = currentDomain.includes('barskydesign.pro');
  const finalBaseUrl = baseUrl || (isProduction ? SITE_CONFIG.defaultBaseUrl : currentDomain);
  
  // Safely handle tags array
  const tags = project.tags || [];
  
  // Construct proper image URL for social sharing
  const getImageUrl = (imagePath: string): string => {
    if (imagePath.startsWith('http')) {
      return imagePath; // Already a full URL
    }
    return `${finalBaseUrl}${imagePath}`;
  };
  
  // Use the project's hero image for social media sharing
  const socialMediaImage = getImageUrl(project.image);
  
  // Get SEO configuration for project
  const getSeoConfig = () => {
    const config = PROJECT_SEO_CONFIG[project.id as keyof typeof PROJECT_SEO_CONFIG];
    
    if (config) {
      return config;
    }
    
    // Fallback for projects not in config
    return {
      title: `${project.title.substring(0, 35)} | ${SITE_CONFIG.authorName}`,
      description: `${project.title} Product Design case study by ${SITE_CONFIG.authorName} specializing in AI-enhanced user-centered solutions.`,
      slug: project.id
    };
  };
  
  const seoConfig = getSeoConfig();
  const canonicalUrl = `${SITE_CONFIG.defaultBaseUrl}/case-studies/${seoConfig.slug || project.id}`;
  
  // Generate keywords
  const keywords = [
    'Hiram Barsky',
    'Product Designer',
    'Gen AI developer',
    ...tags,
    'user experience design',
    'digital product design',
    'design case study',
    'UX consulting'
  ].join(', ');

  // Enhanced structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "description": seoConfig.description,
    "url": canonicalUrl,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    "image": {
      "@type": "ImageObject",
      "url": socialMediaImage,
      "width": SITE_CONFIG.defaultImageDimensions.width,
      "height": SITE_CONFIG.defaultImageDimensions.height
    },
    // Use project creation date if available, otherwise current date
    "datePublished": details.createdAt || new Date().toISOString().split('T')[0],
    "dateModified": details.updatedAt || new Date().toISOString().split('T')[0],
    "creator": {
      "@type": "Person",
      "name": "Hiram Barsky",
      "jobTitle": "Product Designer & Gen AI Developer",
      "description": "Expert Product Designer specializing in Gen AI integration and intelligent web applications",
      "url": SITE_CONFIG.defaultBaseUrl,
      "email": "hbarsky01@gmail.com",
      "telephone": "+1-201-668-4754",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "New York",
        "addressRegion": "NY",
        "addressCountry": "US"
      },
      "sameAs": [
        "https://www.linkedin.com/in/hirambarsky",
        "https://twitter.com/barskydesign"
      ],
      "knowsAbout": [
        "Product Design",
        "Gen AI Integration",
        "User Experience Design",
        "Digital Product Design",
        "AI-Powered Web Applications",
        "Design Consultation"
      ]
    },
    "author": {
      "@type": "Person",
      "@id": `${SITE_CONFIG.defaultBaseUrl}/#person`,
      "name": "Hiram Barsky"
    },
    "provider": {
      "@type": "Person",
      "@id": `${SITE_CONFIG.defaultBaseUrl}/#person`,
      "name": "Hiram Barsky"
    },
    "keywords": tags,
    "inLanguage": "en-US",
    "isPartOf": {
      "@type": "WebSite",
      "@id": `${SITE_CONFIG.defaultBaseUrl}/#website`,
      "name": SITE_CONFIG.authorName,
      "url": SITE_CONFIG.defaultBaseUrl,
      "author": {
        "@type": "Person",
        "@id": `${SITE_CONFIG.defaultBaseUrl}/#person`
      }
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": SITE_CONFIG.defaultBaseUrl
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Portfolio",
          "item": `${SITE_CONFIG.defaultBaseUrl}/projects`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": project.title,
          "item": canonicalUrl
        }
      ]
    },
    "about": {
      "@type": "Thing",
      "name": "User Experience Design Process",
      "description": "Professional UX research and design methodology for improving digital product experiences and business outcomes"
    }
  };
  
  return (
    <Helmet>
      <title>{seoConfig.title}</title>
      <meta name="description" content={seoConfig.description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={SITE_CONFIG.authorName} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Enhanced indexing directives */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      
      {/* Enhanced Open Graph */}
      <meta property="og:title" content={seoConfig.title} />
      <meta property="og:description" content={seoConfig.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={socialMediaImage} />
      <meta property="og:image:width" content={SITE_CONFIG.defaultImageDimensions.width.toString()} />
      <meta property="og:image:height" content={SITE_CONFIG.defaultImageDimensions.height.toString()} />
      <meta property="og:site_name" content={SITE_CONFIG.authorName} />
      <meta property="og:locale" content="en_US" />
      
      {/* Enhanced Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoConfig.title} />
      <meta name="twitter:description" content={seoConfig.description} />
      <meta name="twitter:image" content={socialMediaImage} />
      <meta name="twitter:creator" content={SITE_CONFIG.twitterHandle} />
      <meta name="twitter:site" content={SITE_CONFIG.twitterHandle} />
      
      {/* Alternate URLs */}
      <link rel="alternate" hrefLang="en" href={canonicalUrl} />
      
      {/* Additional SEO meta tags */}
      <meta name="theme-color" content={SITE_CONFIG.themeColor} />
      <meta name="msapplication-TileColor" content={SITE_CONFIG.themeColor} />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Structured data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData, null, 2)}
      </script>
    </Helmet>
  );
};

export default ProjectDetailSeo;