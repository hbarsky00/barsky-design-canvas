
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
  
  // Generate concise, problem-focused titles (50-60 chars)
  const getOptimizedTitle = () => {
    if (project.id === 'herbalink') {
      return "Herbal App UX Design | Trust & Access | Hiram Barsky";
    }
    if (project.id === 'investor-loan-app') {
      return "Fintech UX Design | Loan Platform | Hiram Barsky";
    }
    if (project.id === 'medication-app') {
      return "Healthcare App UX | Patient Care | Hiram Barsky";
    }
    if (project.id === 'splittime') {
      return "Team Management UX | Workflow Design | Hiram Barsky";
    }
    if (project.id === 'gold2crypto') {
      return "Crypto Trading UX | Investment App | Hiram Barsky";
    }
    if (project.id === 'dae-search') {
      return "Search Platform UX | Data Discovery | Hiram Barsky";
    }
    if (project.id === 'barskyjoint') {
      return "Cannabis Platform UX | E-commerce | Hiram Barsky";
    }
    return `${project.title.substring(0, 35)} | Hiram Barsky`;
  };
  
  // Generate concise, results-focused descriptions (150-160 chars)
  const getOptimizedDescription = () => {
    if (project.id === 'herbalink') {
      return "UX case study: Herbal consultation app design solving trust issues and improving accessibility for wellness seekers. 40% increase in user engagement.";
    }
    if (project.id === 'investor-loan-app') {
      return "Fintech UX design case study: Loan management platform reducing errors by 85% and streamlining investment workflows for better user experience.";
    }
    if (project.id === 'medication-app') {
      return "Healthcare app UX design: Medication tracking solution improving patient adherence and care coordination through user-centered design approach.";
    }
    if (project.id === 'splittime') {
      return "Team management UX case study: Workflow optimization platform design improving productivity and collaboration for distributed teams.";
    }
    if (project.id === 'gold2crypto') {
      return "Crypto trading platform UX design: Investment app interface solving complexity issues and improving user confidence in digital asset trading.";
    }
    if (project.id === 'dae-search') {
      return "Search platform UX design: Data discovery interface improving findability and user efficiency through strategic information architecture.";
    }
    if (project.id === 'barskyjoint') {
      return "Cannabis e-commerce UX design: Platform interface solving regulatory compliance and user trust issues in regulated market space.";
    }
    return `${project.title} UX design case study by Hiram Barsky - UX/UI Product Designer & Gen AI Developer specializing in user-centered solutions.`;
  };
  
  const optimizedTitle = getOptimizedTitle();
  const optimizedDescription = getOptimizedDescription();
  
  // Generate slug for canonical URL
  const canonicalUrl = `https://barskydesign.pro/project/${project.id}`;
  
  return (
    <Helmet>
      <title>{optimizedTitle}</title>
      <meta name="description" content={optimizedDescription} />
      <meta name="keywords" content={`Hiram Barsky, UX UI designer, Gen AI developer, ${tags.join(', ')}, user experience design, digital product design, design case study, UX consulting`} />
      <meta name="author" content="Hiram Barsky - UX/UI Product Designer & Gen AI Developer" />
      
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
      <meta property="og:site_name" content="Hiram Barsky - UX/UI Product Designer & Gen AI Developer" />
      <meta property="og:locale" content="en_US" />
      
      {/* Enhanced Twitter Card - Using project hero image */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={optimizedTitle} />
      <meta name="twitter:description" content={optimizedDescription} />
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
              "jobTitle": "UX/UI Product Designer & Gen AI Developer",
              "description": "Expert UX/UI Product Designer specializing in Gen AI integration and intelligent web applications",
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
                "UX/UI Product Design",
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
              "UX UI Designer",
              "Gen AI Developer",
              "User Experience Design",
              "${tags.join('", "')}"
            ],
            "inLanguage": "en-US",
            "isPartOf": {
              "@type": "WebSite",
              "@id": "https://barskydesign.pro/#website",
              "name": "Hiram Barsky - UX/UI Product Designer & Gen AI Developer",
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
