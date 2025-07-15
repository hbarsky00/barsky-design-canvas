import React from "react";
import { Helmet } from "react-helmet-async";
import { ProjectProps } from "@/components/ProjectCard";
import { ProjectDetails } from "@/data/types/project";

interface ProjectDetailSeoProps {
  project: ProjectProps;
  details: ProjectDetails;
}

// Safe JSON string escaping function
const escapeJsonString = (str: string): string => {
  return str.replace(/\\/g, '\\\\')
            .replace(/"/g, '\\"')
            .replace(/\n/g, '\\n')
            .replace(/\r/g, '\\r')
            .replace(/\t/g, '\\t');
};

const ProjectDetailSeo: React.FC<ProjectDetailSeoProps> = ({ 
  project,
  details
}) => {
  // Safe domain detection for SSR compatibility
  const getCurrentDomain = (): string => {
    if (typeof window !== 'undefined') {
      return window.location.origin;
    }
    return 'https://barskydesign.pro'; // Fallback for SSR
  };
  
  const currentDomain = getCurrentDomain();
  const isProduction = currentDomain.includes('barskydesign.pro');
  const baseUrl = isProduction ? 'https://barskydesign.pro' : currentDomain;
  
  // Safely handle tags array
  const tags = project.tags || [];
  
  // Construct proper image URL for social sharing
  const getImageUrl = (imagePath: string) => {
    if (imagePath.startsWith('http')) {
      return imagePath; // Already a full URL
    }
    return `${baseUrl}${imagePath}`;
  };
  
  // Use the project's hero image for social media sharing
  const socialMediaImage = getImageUrl(project.image);
  
  // Generate concise, problem-focused titles (50-60 chars)
  const getOptimizedTitle = () => {
    const titleMap: Record<string, string> = {
      'herbalink': "Herbalink: AI-Enhanced UX Design for Wellness | Hiram Barsky - Product Designer & Gen AI Developer",
      'investor-loan-app': "Investor Loan App: AI-Enhanced FinTech UX | Hiram Barsky - Product Designer & Gen AI Developer",
      'medication-app': "Healthcare App: AI-Powered UX Design | Hiram Barsky - Product Designer & Gen AI Developer",
      'splittime': "Splittime: AI-Powered Co-Parenting App Design | Hiram Barsky - Product Designer & Gen AI Developer",
      'gold2crypto': "Gold2Crypto: AI-Enhanced Trading UX | Hiram Barsky - Product Designer & Gen AI Developer",
      'dae-search': "DAE Search: AI-Powered Data Discovery | Hiram Barsky - Product Designer & Gen AI Developer",
      'barskyjoint': "BarskyJoint: AI-Enhanced Cannabis Platform | Hiram Barsky - Product Designer & Gen AI Developer",
      'wholesale-distribution': "Wholesale Distribution: From Designer to Gen AI Developer | Hiram Barsky Case Study"
    };
    
    return titleMap[project.id] || `${project.title.substring(0, 35)} | Hiram Barsky - Product Designer & Gen AI Developer`;
  };
  
  // Generate concise, results-focused descriptions (150-160 chars)
  const getOptimizedDescription = () => {
    const descriptionMap: Record<string, string> = {
      'herbalink': "Discover how Gen AI integration and UX design created a wellness platform connecting users with certified herbalists. 78% user satisfaction through AI-powered matching and mobile-first design.",
      'investor-loan-app': "FinTech platform transforming real estate investment management through AI-powered portfolio tracking, automated reporting, and intelligent UX design.",
      'medication-app': "Healthcare app UX design: AI-enhanced medication tracking solution improving patient adherence and care coordination through intelligent design approach.",
      'splittime': "See how AI-enhanced UX design reduced co-parenting scheduling conflicts by 73%. Family-centered platform transforming separated parent communication through intelligent design.",
      'gold2crypto': "Crypto trading platform with AI-enhanced UX design: Investment app interface solving complexity issues and improving user confidence in digital asset trading.",
      'dae-search': "AI-powered search platform UX design: Data discovery interface improving findability and user efficiency through strategic information architecture and intelligent design.",
      'barskyjoint': "Cannabis e-commerce platform with AI-enhanced UX design: Platform interface solving regulatory compliance and user trust issues in regulated market space.",
      'wholesale-distribution': "Real conversation to custom AI-powered business solution. How UX expertise evolved into full-stack Gen AI development for wholesale distribution challenges."
    };
    
    return descriptionMap[project.id] || `${project.title} Product Design case study by Hiram Barsky - Product Designer & Gen AI Developer specializing in AI-enhanced user-centered solutions.`;
  };
  
  const optimizedTitle = getOptimizedTitle();
  const optimizedDescription = getOptimizedDescription();
  
  // Complete SEO-friendly URL mapping for all projects
  const projectMapping: Record<string, string> = {
    'herbalink': 'herbalink-mobile-herbalist-ux-design',
    'splittime': 'splittime-coparenting-app-design',
    'investor-loan-app': 'investor-loan-portfolio-management',
    'wholesale-distribution': 'wholesale-distribution-ai-solution',
    'medication-app': 'healthcare-medication-app-ux-design',
    'gold2crypto': 'gold2crypto-trading-platform-ux',
    'dae-search': 'dae-search-data-discovery-platform',
    'barskyjoint': 'barskyjoint-cannabis-ecommerce-platform'
  };
  
  const seoFriendlyId = projectMapping[project.id] || project.id;
  const canonicalUrl = `https://barskydesign.pro/case-studies/${seoFriendlyId}`;
  
  // Safe structured data generation
  const generateStructuredData = () => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "name": project.title,
      "description": optimizedDescription,
      "url": canonicalUrl,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": canonicalUrl
      },
      "image": {
        "@type": "ImageObject",
        "url": socialMediaImage,
        "width": 1200,
        "height": 630
      },
      "datePublished": new Date().toISOString().split('T')[0],
      "dateModified": new Date().toISOString().split('T')[0],
      "creator": {
        "@type": "Person",
        "name": "Hiram Barsky",
        "jobTitle": "Product Designer & Gen AI Developer",
        "description": "Expert Product Designer specializing in Gen AI integration and intelligent web applications",
        "url": "https://barskydesign.pro",
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
        "@id": "https://barskydesign.pro/#person",
        "name": "Hiram Barsky"
      },
      "provider": {
        "@type": "Person",
        "@id": "https://barskydesign.pro/#person",
        "name": "Hiram Barsky"
      },
      "keywords": [
        "Hiram Barsky",
        "Product Designer",
        "Gen AI Developer",
        "User Experience Design",
        ...tags
      ],
      "inLanguage": "en-US",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://barskydesign.pro/#website",
        "name": "Hiram Barsky - Product Designer & Gen AI Developer",
        "url": "https://barskydesign.pro",
        "author": {
          "@type": "Person",
          "@id": "https://barskydesign.pro/#person"
        }
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://barskydesign.pro"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Portfolio",
            "item": "https://barskydesign.pro/projects"
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
    
    return JSON.stringify(structuredData, null, 2);
  };
  
  return (
    <Helmet>
      <title>{optimizedTitle}</title>
      <meta name="description" content={optimizedDescription} />
      <meta name="keywords" content={`Hiram Barsky, Product Designer, Gen AI developer, ${tags.join(', ')}, user experience design, digital product design, design case study, UX consulting`} />
      <meta name="author" content="Hiram Barsky - Product Designer & Gen AI Developer" />
      
      {/* Canonical URL - Essential for SEO */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Enhanced indexing directives */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      
      {/* Enhanced Open Graph - Using project hero image */}
      <meta property="og:title" content={optimizedTitle} />
      <meta property="og:description" content={optimizedDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={socialMediaImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Hiram Barsky - Product Designer & Gen AI Developer" />
      <meta property="og:locale" content="en_US" />
      
      {/* Enhanced Twitter Card - Using project hero image */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={optimizedTitle} />
      <meta name="twitter:description" content={optimizedDescription} />
      <meta name="twitter:image" content={socialMediaImage} />
      <meta name="twitter:creator" content="@barskydesign" />
      <meta name="twitter:site" content="@barskydesign" />
      
      {/* Alternate URLs */}
      <link rel="alternate" hrefLang="en" href={canonicalUrl} />
      
      {/* Additional SEO meta tags */}
      <meta name="theme-color" content="#3B82F6" />
      <meta name="msapplication-TileColor" content="#3B82F6" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Safe structured data generation */}
      <script type="application/ld+json">
        {generateStructuredData()}
      </script>
    </Helmet>
  );
};

export default ProjectDetailSeo;