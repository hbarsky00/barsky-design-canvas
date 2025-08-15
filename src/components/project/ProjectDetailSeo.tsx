import React from "react";
import { Helmet } from "react-helmet-async";
import { ProjectProps } from "@/components/ProjectCard";
import { ProjectDetails } from "@/data/types/project";
import { normalizeUrl } from "@/utils/urlUtils";

interface ProjectDetailSeoProps {
  project: ProjectProps;
  details: ProjectDetails;
}

const ProjectDetailSeo: React.FC<ProjectDetailSeoProps> = ({ 
  project,
  details
}) => {
  // Get the current domain for proper image URLs
  const currentDomain = window.location.origin;
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
  
  // Use the project's hero image or fallback to your circular headshot
  const socialMediaImage = project.image 
    ? getImageUrl(project.image)
    : getImageUrl("/images/default-og-image.jpg");
  
  // Generate separate, optimized titles and descriptions
  const getOptimizedTitle = () => {
    // Use project title directly - no more than 60 characters
    return project.title.length > 60 
      ? project.title.substring(0, 57) + '...'
      : project.title;
  };
  
  const getOptimizedDescription = () => {
    // Use project description separately from title
    if (project.description && project.description.length > 10) {
      return project.description.length > 160 
        ? project.description.substring(0, 157) + '...'
        : project.description;
    }
    
    // Fallback descriptions based on project ID
    if (project.id === 'herbalink') {
      return "Discover how Gen AI integration and UX design created a wellness platform connecting users with certified herbalists.";
    }
    if (project.id === 'investor-loan-app') {
      return "FinTech platform transforming real estate investment management through AI-powered portfolio tracking and automated reporting.";
    }
    if (project.id === 'splittime') {
      return "See how AI-enhanced UX design reduced co-parenting scheduling conflicts by 73% through family-centered platform design.";
    }
    
    return "Product design case study showcasing UX research, design process, and AI-enhanced solutions by Hiram Barsky.";
  };
  
  const optimizedTitle = getOptimizedTitle();
  const optimizedDescription = getOptimizedDescription();
  
  // Generate SEO-friendly URL
  const projectMapping: Record<string, string> = {
    'herbalink': 'herbalink-mobile-herbalist-ux-design',
    'splittime': 'splittime-coparenting-app-design',
    'investor-loan-app': 'investor-loan-portfolio-management',
    'wholesale-distribution': 'wholesale-distribution-ai-solution'
  };
  const seoFriendlyId = projectMapping[project.id] || project.id;
  const canonicalUrl = normalizeUrl(`/project/${seoFriendlyId}`);

  return (
    <Helmet>
      {/* Separate title and description */}
      <title>{optimizedTitle} | Hiram Barsky Design</title>
      <meta name="description" content={optimizedDescription} />
      <meta name="keywords" content={`Hiram Barsky, Product Designer, Gen AI developer, ${tags.join(', ')}, user experience design, digital product design, design case study, UX consulting`} />
      <meta name="author" content="Hiram Barsky - Product Designer & Gen AI Developer" />
      
      {/* Enhanced indexing directives */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      
      {/* Enhanced Open Graph - Using project image or headshot fallback */}
      <meta property="og:title" content={optimizedTitle} />
      <meta property="og:description" content={optimizedDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={socialMediaImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Hiram Barsky - Product Designer & Gen AI Developer" />
      <meta property="og:locale" content="en_US" />
      
      {/* Enhanced Twitter Card */}
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
      
      {/* Enhanced structured data with design agency focus - Using project hero image */}
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            "name": "${project.title}",
            "description": "${optimizedDescription}",
            "url": "${canonicalUrl}",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "${canonicalUrl}"
            },
            "image": {
              "@type": "ImageObject",
              "url": "${socialMediaImage}",
              "width": 1200,
              "height": 630
            },
            "datePublished": "${new Date().toISOString().split('T')[0]}",
            "dateModified": "${new Date().toISOString().split('T')[0]}",
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
              "${tags.join('", "')}"
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
                  "name": "${project.title}",
                  "item": "${canonicalUrl}"
                }
              ]
            },
            "about": {
              "@type": "Thing",
              "name": "User Experience Design Process",
              "description": "Professional UX research and design methodology for improving digital product experiences and business outcomes"
            }
          }
        `}
      </script>
    </Helmet>
  );
};

export default ProjectDetailSeo;
