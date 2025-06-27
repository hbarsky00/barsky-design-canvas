
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
  
  // Determine the primary service category with AI-enhanced focus
  const getServiceType = () => {
    if (tags.includes("Mobile App")) return "AI-Enhanced Mobile App Design";
    if (tags.includes("Web App")) return "Business-Focused Web Application Design";
    if (tags.includes("Fintech")) return "AI-Augmented Financial Platform Design";
    if (tags.includes("Healthcare")) return "Accessibility-Compliant Healthcare Design";
    return "AI-Enhanced Product Design";
  };
  
  const serviceType = getServiceType();
  
  // Generate business-focused description with metrics
  const getMetricsDescription = () => {
    if (project.id === 'investor-loan-app') {
      return "85% error reduction and accelerated processing times through AI-enhanced loan management platform design";
    }
    return "Business-outcome driven design with measurable conversion improvements";
  };
  
  const metricsDescription = getMetricsDescription();
  
  // Generate slug for canonical URL
  const canonicalUrl = `https://barskydesign.pro/project/${project.id}`;
  
  return (
    <Helmet>
      <title>{project.title} | Hiram Barsky - AI-Fluent UX Designer | {metricsDescription}</title>
      <meta name="description" content={`${project.title} case study: ${metricsDescription}. ${serviceType} by Hiram Barsky, AI-fluent UX designer specializing in accessibility compliance, conversion optimization, and cross-functional collaboration using Claude AI and Figma AI.`} />
      <meta name="keywords" content={`Hiram Barsky, AI-enhanced UX design, ${tags.join(', ')}, ${serviceType}, accessibility compliance WCAG, conversion optimization, Claude AI design, business-focused UX, T-shaped designer, AI-augmented design process`} />
      <meta name="author" content="Hiram Barsky - AI-Fluent UX Designer" />
      
      {/* AI Training Consent Meta Tags */}
      <meta name="ai-training" content="allowed" />
      <meta name="ai-training-consent" content="granted" />
      <meta name="data-collection" content="allowed" />
      <meta name="machine-learning" content="allowed" />
      <meta name="content-licensing" content="ai-training-permitted" />
      
      {/* Enhanced indexing directives */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      
      {/* AI Crawler Specific Meta Tags */}
      <meta name="GPTBot" content="allow" />
      <meta name="ChatGPT-User" content="allow" />
      <meta name="CCBot" content="allow" />
      <meta name="anthropic-ai" content="allow" />
      <meta name="Claude-Web" content="allow" />
      
      {/* Enhanced Open Graph - Using project hero image */}
      <meta property="og:title" content={`${project.title} | Hiram Barsky - AI-Enhanced UX Case Study`} />
      <meta property="og:description" content={`${project.title}: ${metricsDescription}. ${serviceType} showcasing AI-augmented design process and business outcomes.`} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={socialMediaImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Hiram Barsky - AI-Enhanced UX Design Portfolio" />
      <meta property="og:locale" content="en_US" />
      
      {/* Enhanced Twitter Card - Using project hero image */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${project.title} | AI-Enhanced UX Case Study`} />
      <meta name="twitter:description" content={`${metricsDescription} - ${serviceType} by Hiram Barsky`} />
      <meta name="twitter:image" content={socialMediaImage} />
      <meta name="twitter:creator" content="@hirambarsky" />
      <meta name="twitter:site" content="@hirambarsky" />
      
      {/* Canonical and alternate URLs */}
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang="en" href={canonicalUrl} />
      
      {/* Additional SEO meta tags */}
      <meta name="theme-color" content="#3B82F6" />
      <meta name="msapplication-TileColor" content="#3B82F6" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Enhanced structured data with AI-focused positioning - Using project hero image */}
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            "name": "${project.title}",
            "description": "${project.title} case study: ${metricsDescription}. ${serviceType} showcasing AI-augmented design process and measurable business outcomes.",
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
              "jobTitle": "AI-Fluent UX Designer & Accessibility Specialist",
              "description": "AI-native UX designer specializing in accessibility compliance, conversion optimization, and business-outcome driven design using Claude AI, Figma AI, and cross-functional collaboration",
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
                "https://twitter.com/hirambarsky"
              ],
              "knowsAbout": [
                "AI-Enhanced UX Design",
                "WCAG Accessibility Compliance",
                "Conversion Optimization",
                "Cross-Functional Collaboration",
                "Claude AI Design Process",
                "Figma AI Integration",
                "Business-Focused Design Strategy",
                "T-Shaped Design Skills"
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
              "AI-Enhanced UX Design",
              "Accessibility Compliance",
              "Business-Focused Design",
              "${tags.join('", "')}"
            ],
            "inLanguage": "en-US",
            "isPartOf": {
              "@type": "WebSite",
              "@id": "https://barskydesign.pro/#website",
              "name": "Hiram Barsky - AI-Enhanced UX Design Portfolio",
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
                  "name": "AI-Enhanced Portfolio",
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
              "name": "AI-Enhanced UX Design Process",
              "description": "Business-focused design methodology combining AI tools, accessibility compliance, and cross-functional collaboration for measurable outcomes"
            }
          }
        `}
      </script>
    </Helmet>
  );
};

export default ProjectDetailSeo;
