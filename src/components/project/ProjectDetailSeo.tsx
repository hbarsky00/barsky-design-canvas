
import React from "react";
import { Helmet } from "react-helmet-async";
import { ProjectProps } from "@/components/ProjectCard";
import { ProjectDetails } from "@/data/types/project";

interface ProjectDetailSeoProps {
  project: ProjectProps;
  details: ProjectDetails;
}

const ProjectDetailSeo: React.FC<ProjectDetailSeoProps> = ({ 
  project,
  details
}) => {
  // Safely handle tags array
  const tags = project.tags || [];
  
  // Use the project's hero image for social media sharing
  const socialMediaImage = `https://barskydesign.pro${project.image}`;
  
  // Determine the primary service category with design agency focus
  const getServiceType = () => {
    if (tags.includes("Mobile App")) return "Professional Mobile App Design";
    if (tags.includes("Web App")) return "Business Web Application Design";
    if (tags.includes("Fintech")) return "Financial Platform UX Design";
    if (tags.includes("Healthcare")) return "Healthcare Application Design";
    return "User Experience Design";
  };
  
  const serviceType = getServiceType();
  
  // Generate business-focused description with outcomes
  const getProjectDescription = () => {
    if (project.id === 'herbalink') {
      return "Comprehensive UX research and design for herbal consultation platform, improving user trust and accessibility";
    }
    if (project.id === 'investor-loan-app') {
      return "Financial platform design with 85% error reduction and streamlined loan processing workflows";
    }
    return "User-centered design case study with measurable business impact and improved user experience";
  };
  
  const projectDescription = getProjectDescription();
  
  // Generate slug for canonical URL
  const canonicalUrl = `https://barskydesign.pro/project/${project.id}`;
  
  return (
    <Helmet>
      <title>{project.title} Case Study | Barsky Design - UX Research & Design Agency | {serviceType}</title>
      <meta name="description" content={`${project.title} case study by Barsky Design: ${projectDescription}. Professional UX research and design agency specializing in user-centered design solutions that improve digital product experiences and drive business results.`} />
      <meta name="keywords" content={`Barsky Design, UX research agency, design agency, ${tags.join(', ')}, ${serviceType}, user experience design, digital product design, design case study, UX consulting`} />
      <meta name="author" content="Barsky Design - UX Research & Design Agency" />
      
      {/* Enhanced indexing directives */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      
      {/* Enhanced Open Graph - Using project hero image */}
      <meta property="og:title" content={`${project.title} Case Study | Barsky Design`} />
      <meta property="og:description" content={`${project.title}: ${projectDescription}. Professional UX research and design agency case study showcasing user-centered design solutions.`} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={socialMediaImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Barsky Design - UX Research & Design Agency" />
      <meta property="og:locale" content="en_US" />
      
      {/* Enhanced Twitter Card - Using project hero image */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${project.title} | Barsky Design Case Study`} />
      <meta name="twitter:description" content={`${projectDescription} - Professional UX research and design agency`} />
      <meta name="twitter:image" content={socialMediaImage} />
      <meta name="twitter:creator" content="@barskydesign" />
      <meta name="twitter:site" content="@barskydesign" />
      
      {/* Canonical and alternate URLs */}
      <link rel="canonical" href={canonicalUrl} />
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
            "description": "${project.title} case study: ${projectDescription}. Professional UX research and design agency showcasing user-centered design solutions.",
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
              "@type": "Organization",
              "name": "Barsky Design",
              "description": "Professional UX research and design agency specializing in user-centered design solutions that improve digital product experiences",
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
              "serviceType": [
                "UX Research",
                "User Experience Design",
                "Digital Product Design",
                "Design Strategy",
                "User Testing",
                "Design Consultation"
              ]
            },
            "author": {
              "@type": "Organization",
              "@id": "https://barskydesign.pro/#organization",
              "name": "Barsky Design"
            },
            "provider": {
              "@type": "Organization",
              "@id": "https://barskydesign.pro/#organization",
              "name": "Barsky Design"
            },
            "keywords": [
              "Barsky Design",
              "UX Research Agency",
              "Design Agency",
              "User Experience Design",
              "${tags.join('", "')}"
            ],
            "inLanguage": "en-US",
            "isPartOf": {
              "@type": "WebSite",
              "@id": "https://barskydesign.pro/#website",
              "name": "Barsky Design - UX Research & Design Agency",
              "url": "https://barskydesign.pro",
              "author": {
                "@type": "Organization",
                "@id": "https://barskydesign.pro/#organization"
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
