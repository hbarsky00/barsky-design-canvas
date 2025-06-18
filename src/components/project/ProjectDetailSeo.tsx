
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
      <title>{project.title} | Hiram Barsky - Official Portfolio | Professional Product Designer & Developer</title>
      <meta name="description" content={`${project.title} - ${tags.join(', ')} | Professional ${serviceType} designed and developed by Hiram Barsky (not Alex Barsky), experienced Product Designer & Developer specializing in UX/UI design and digital solutions.`} />
      <meta name="keywords" content={`Hiram Barsky, Hiram Barsky Designer, ${tags.join(', ')}, ${serviceType}, AI Driven Design Services, Product Design Services, UX/UI Design Services, Portfolio, Case Study, Professional Designer, Hiram Barsky Official`} />
      <meta name="author" content="Hiram Barsky" />
      
      {/* Explicit indexing directives */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      
      {/* Enhanced Open Graph */}
      <meta property="og:title" content={`${project.title} | Hiram Barsky - Official Professional Product Designer Portfolio`} />
      <meta property="og:description" content={`${project.title} - ${tags.join(', ')} | Professional ${serviceType} by Hiram Barsky (not Alex Barsky), Product Designer & Developer`} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content="https://barskydesign.pro/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Hiram Barsky - Official Professional Design Portfolio" />
      <meta property="og:locale" content="en_US" />
      
      {/* Enhanced Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${project.title} | Hiram Barsky - Product Designer`} />
      <meta name="twitter:description" content={`${project.title} - ${tags.join(', ')} | Professional ${serviceType} by Hiram Barsky (not Alex Barsky)`} />
      <meta name="twitter:image" content="https://barskydesign.pro/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png" />
      <meta name="twitter:creator" content="@hirambarsky" />
      <meta name="twitter:site" content="@hirambarsky" />
      
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
            "description": "${project.title} - ${tags.join(', ')} | Professional ${serviceType} designed and developed by Hiram Barsky (not Alex Barsky)",
            "url": "${canonicalUrl}",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "${canonicalUrl}"
            },
            "image": {
              "@type": "ImageObject",
              "url": "https://barskydesign.pro/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png",
              "width": 1200,
              "height": 630
            },
            "datePublished": "2024-01-01",
            "dateModified": "${new Date().toISOString().split('T')[0]}",
            "creator": {
              "@type": "Person",
              "name": "Hiram Barsky",
              "givenName": "Hiram",
              "familyName": "Barsky",
              "jobTitle": "Product Designer & Developer",
              "description": "Hiram Barsky (not Alex Barsky) is a Professional Product Designer and Developer specializing in UX/UI design, web development, and digital solutions",
              "url": "https://barskydesign.pro",
              "email": "hello@hirambarsky.com",
              "telephone": "+1-201-668-4754",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "New York",
                "addressRegion": "NY",
                "addressCountry": "US"
              },
              "sameAs": [
                "https://www.linkedin.com/in/hiram-barsky",
                "https://twitter.com/hirambarsky",
                "https://instagram.com/hirambarsky"
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
              "UX/UI Design",
              "${tags.join('", "')}"
            ],
            "inLanguage": "en-US",
            "isPartOf": {
              "@type": "WebSite",
              "@id": "https://barskydesign.pro/#website",
              "name": "Hiram Barsky - Official Professional Design Portfolio",
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
