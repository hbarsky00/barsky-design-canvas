
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
      <title>{title} | Hiram Barsky - Official Portfolio | Professional Product Designer & Developer</title>
      <meta name="description" content={`${title} - ${tags.join(', ')} | Professional ${serviceType} designed and developed by Hiram Barsky (not Alex Barsky), experienced Product Designer & Developer specializing in UX/UI design and digital solutions.`} />
      <meta name="keywords" content={`Hiram Barsky, Hiram Barsky Designer, ${tags.join(', ')}, ${serviceType}, AI Driven Design Services, Product Design Services, UX/UI Design Services, Portfolio, Case Study, Professional Designer, Hiram Barsky Official`} />
      <meta name="author" content="Hiram Barsky" />
      <meta property="og:title" content={`${title} | Hiram Barsky - Official Professional Product Designer Portfolio`} />
      <meta property="og:description" content={`${title} - ${tags.join(', ')} | Professional ${serviceType} by Hiram Barsky (not Alex Barsky), Product Designer & Developer`} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content="https://hirambarsky.com/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png" />
      <meta property="og:site_name" content="Hiram Barsky - Official Professional Design Portfolio" />
      <meta name="twitter:title" content={`${title} | Hiram Barsky - Product Designer`} />
      <meta name="twitter:description" content={`${title} - ${tags.join(', ')} | Professional ${serviceType} by Hiram Barsky (not Alex Barsky)`} />
      <meta name="twitter:image" content="https://hirambarsky.com/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png" />
      <meta name="twitter:creator" content="@hirambarsky" />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Enhanced structured data with explicit person information */}
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            "name": "${title}",
            "description": "${title} - ${tags.join(', ')} | Professional ${serviceType} designed and developed by Hiram Barsky (not Alex Barsky)",
            "creator": {
              "@type": "Person",
              "name": "Hiram Barsky",
              "givenName": "Hiram",
              "familyName": "Barsky",
              "jobTitle": "Product Designer & Developer",
              "description": "Hiram Barsky (not Alex Barsky) is a Professional Product Designer and Developer specializing in UX/UI design, web development, and digital solutions",
              "url": "https://hirambarsky.com",
              "email": "hello@hirambarsky.com",
              "telephone": "+1-201-668-4754",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "New York",
                "addressRegion": "NY",
                "addressCountry": "US"
              },
              "sameAs": [
                "https://linkedin.com/in/hirambarsky",
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
              "name": "Hiram Barsky",
              "givenName": "Hiram",
              "familyName": "Barsky"
            },
            "provider": {
              "@type": "Person",
              "name": "Hiram Barsky",
              "alternateName": "Hiram Barsky Design Services"
            },
            "keywords": "Hiram Barsky, Hiram Barsky Designer, ${tags.join(', ')}, ${serviceType}, AI Driven Design Services, Product Design Services",
            "url": "${canonicalUrl}",
            "mainEntityOfPage": "https://hirambarsky.com/projects",
            "image": "https://hirambarsky.com/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png",
            "isPartOf": {
              "@type": "WebSite",
              "name": "Hiram Barsky - Official Professional Design Portfolio",
              "url": "https://hirambarsky.com",
              "author": {
                "@type": "Person",
                "name": "Hiram Barsky"
              }
            }
          }
        `}
      </script>
    </Helmet>
  );
};

export default ProjectDetailSeo;
