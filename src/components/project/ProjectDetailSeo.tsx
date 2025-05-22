
import React from "react";
import { Helmet } from "react-helmet-async";

interface ProjectDetailSeoProps {
  title: string;
  description: string;
  tags: string[];
  projectId: string;
}

const ProjectDetailSeo: React.FC<ProjectDetailSeoProps> = ({ 
  title, 
  description, 
  tags, 
  projectId 
}) => {
  // Determine the primary service category
  const getServiceType = () => {
    if (tags.includes("Mobile App")) return "App Design Services";
    if (tags.includes("Web App")) return "Website Design Services";
    return "Product Design Services";
  };
  
  const serviceType = getServiceType();
  
  // Generate slug for canonical URL
  const titleSlug = title.toLowerCase().replace(/\s+/g, '-');
  const canonicalUrl = `https://hirambarsky.com/project/${projectId}`;
  
  return (
    <Helmet>
      <title>{title} | Hiram Barsky Portfolio</title>
      <meta name="description" content={`${title} - ${tags.join(', ')} | Professional ${serviceType} by Hiram Barsky`} />
      <meta name="keywords" content={`${tags.join(', ')}, ${serviceType}, AI Driven Design Services, Product Design Services, UX/UI Design Services, Portfolio, Case Study, Hiram Barsky`} />
      <meta property="og:title" content={`${title} | Hiram Barsky Portfolio`} />
      <meta property="og:description" content={`${title} - ${tags.join(', ')} | Professional ${serviceType} by Hiram Barsky`} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content="https://hirambarsky.com/lovable-uploads/file-c4fc0432-7896-442d-980d-133d9c7442e9" />
      <meta name="twitter:title" content={`${title} | Hiram Barsky Portfolio`} />
      <meta name="twitter:description" content={`${title} - ${tags.join(', ')} | Professional ${serviceType}`} />
      <meta name="twitter:image" content="https://hirambarsky.com/lovable-uploads/file-c4fc0432-7896-442d-980d-133d9c7442e9" />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="author" content="Hiram Barsky" />
      <meta property="og:site_name" content="Hiram Barsky Portfolio" />
      
      {/* Structured data for project with more specific attribution to Hiram Barsky */}
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            "name": "${title}",
            "creator": {
              "@type": "Person",
              "name": "Hiram Barsky",
              "jobTitle": "Product Designer & Developer",
              "url": "https://hirambarsky.com",
              "sameAs": [
                "https://linkedin.com/in/hirambarsky",
                "https://twitter.com/hirambarsky",
                "https://instagram.com/hirambarsky"
              ]
            },
            "author": {
              "@type": "Person",
              "name": "Hiram Barsky"
            },
            "provider": {
              "@type": "Person",
              "name": "Hiram Barsky",
              "alternateName": "Hiram Barsky Design Services"
            },
            "keywords": "${tags.join(', ')}, ${serviceType}, AI Driven Design Services, Product Design Services",
            "url": "${canonicalUrl}",
            "mainEntityOfPage": "https://hirambarsky.com/projects",
            "description": "${title} - ${tags.join(', ')} | Professional ${serviceType} by Hiram Barsky",
            "image": "https://hirambarsky.com/lovable-uploads/file-c4fc0432-7896-442d-980d-133d9c7442e9"
          }
        `}
      </script>
    </Helmet>
  );
};

export default ProjectDetailSeo;
