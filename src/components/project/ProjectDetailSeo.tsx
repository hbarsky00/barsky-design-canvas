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
  
  // Determine the primary service category
  const getServiceType = () => {
    if (tags.includes("Mobile App")) return "App Design Services";
    if (tags.includes("Web App")) return "Website Design Services";
    return "Product Design Services";
  };
  
  const serviceType = getServiceType();
  
  // Generate slug for canonical URL
  const titleSlug = project.title.toLowerCase().replace(/\s+/g, '-');
  const canonicalUrl = `https://barskydesign.pro/project/${project.id}`;
  
  return (
    <Helmet>
      <title>{project.title} | Barsky Design - Official Portfolio | Professional Product Designer & Developer</title>
      <meta name="description" content={`${project.title} - ${tags.join(', ')} | Professional ${serviceType} designed and developed by Barsky Design, experienced Product Designer & Developer specializing in UX/UI design and digital solutions.`} />
      <meta name="keywords" content={`Barsky Design, ${tags.join(', ')}, ${serviceType}, AI Driven Design Services, Product Design Services, UX/UI Design Services, Portfolio, Case Study, Professional Designer, Barsky Design Official`} />
      <meta name="author" content="Barsky Design" />
      
      {/* Explicit indexing directives */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      
      {/* Enhanced Open Graph */}
      <meta property="og:title" content={`${project.title} | Barsky Design - Official Professional Product Designer Portfolio`} />
      <meta property="og:description" content={`${project.title} - ${tags.join(', ')} | Professional ${serviceType} by Barsky Design, Product Designer & Developer`} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content="https://barskydesign.pro/lovable-uploads/0021bf49-27e4-46b8-b948-ecdcd831a773.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Barsky Design - Official Professional Design Portfolio" />
      <meta property="og:locale" content="en_US" />
      
      {/* Enhanced Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${project.title} | Barsky Design - Product Designer`} />
      <meta name="twitter:description" content={`${project.title} - ${tags.join(', ')} | Professional ${serviceType} by Barsky Design`} />
      <meta name="twitter:image" content="https://barskydesign.pro/lovable-uploads/0021bf49-27e4-46b8-b948-ecdcd831a773.png" />
      <meta name="twitter:creator" content="@barskydesign" />
      <meta name="twitter:site" content="@barskydesign" />
      
      {/* Canonical and alternate URLs */}
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang="en" href={canonicalUrl} />
      
      {/* Additional SEO meta tags */}
      <meta name="theme-color" content="#3B82F6" />
      <meta name="msapplication-TileColor" content="#3B82F6" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Enhanced structured data with explicit person information */}
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            "name": "${project.title}",
            "description": "${project.title} - ${tags.join(', ')} | Professional ${serviceType} designed and developed by Barsky Design",
            "url": "${canonicalUrl}",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "${canonicalUrl}"
            },
            "image": {
              "@type": "ImageObject",
              "url": "https://barskydesign.pro/lovable-uploads/0021bf49-27e4-46b8-b948-ecdcd831a773.png",
              "width": 1200,
              "height": 630
            },
            "datePublished": "2024-01-01",
            "dateModified": "${new Date().toISOString().split('T')[0]}",
            "creator": {
              "@type": "Organization",
              "name": "Barsky Design",
              "description": "Barsky Design is a Professional Product Design and Development studio specializing in UX/UI design, web development, and digital solutions",
              "url": "https://barskydesign.pro",
              "email": "hello@barskydesign.com",
              "telephone": "+1-201-668-4754",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "New York",
                "addressRegion": "NY",
                "addressCountry": "US"
              },
              "sameAs": [
                "https://www.linkedin.com/company/barsky-design",
                "https://twitter.com/barskydesign",
                "https://instagram.com/barskydesign"
              ],
              "knowsAbout": [
                "Product Design",
                "UX/UI Design", 
                "Web Development",
                "Mobile App Design",
                "AI Driven Design",
                "Design Systems"
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
              "Product Designer", 
              "UX/UI Design",
              "${tags.join('", "')}"
            ],
            "inLanguage": "en-US",
            "isPartOf": {
              "@type": "WebSite",
              "@id": "https://barskydesign.pro/#website",
              "name": "Barsky Design - Official Professional Design Portfolio",
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
                  "name": "Projects",
                  "item": "https://barskydesign.pro/projects"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "${project.title}",
                  "item": "${canonicalUrl}"
                }
              ]
            }
          }
        `}
      </script>
    </Helmet>
  );
};

export default ProjectDetailSeo;
