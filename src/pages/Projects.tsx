
import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AllProjects from "./AllProjects";
import { usePageIndexing } from "@/hooks/usePageIndexing";

const Projects = () => {
  usePageIndexing();
  
  return (
    <>
      <Helmet>
        <title>Product Design & Gen AI Portfolio | Hiram Barsky - AI-Powered Web Applications</title>
        <meta name="description" content="Explore Product Design portfolio featuring Gen AI integration, intelligent web applications, and AI-powered user interfaces. Real case studies demonstrating AI-enhanced design solutions and user experience innovations." />
        <link rel="canonical" href="https://barskydesign.pro/projects" />
        
        {/* Enhanced indexing signals */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <meta name="bingbot" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Product Design & Gen AI Portfolio | AI-Powered Web Applications" />
        <meta property="og:description" content="Explore Product Design portfolio featuring Gen AI integration, intelligent web applications, and AI-powered user interfaces." />
        <meta property="og:url" content="https://barskydesign.pro/projects" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://barskydesign.pro/lovable-uploads/0021bf49-27e4-46b8-b948-ecdcd831a773.png" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Product Design & Gen AI Portfolio | AI-Powered Web Applications" />
        <meta name="twitter:description" content="Explore Product Design portfolio featuring Gen AI integration and intelligent web applications." />
        <meta name="twitter:image" content="https://barskydesign.pro/lovable-uploads/0021bf49-27e4-46b8-b948-ecdcd831a773.png" />
        
        {/* Structured data for portfolio */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "name": "Product Design & Gen AI Portfolio",
              "description": "Professional portfolio showcasing Product Design projects with Gen AI integration and intelligent web applications",
              "url": "https://barskydesign.pro/projects",
              "mainEntity": {
                "@type": "ItemList",
                "name": "AI-Enhanced Design Projects",
                "numberOfItems": 6,
                "itemListElement": [
                  {
                    "@type": "CreativeWork",
                    "position": 1,
                    "name": "SplitTime Co-Parenting App",
                    "url": "https://barskydesign.pro/project/splittime"
                  },
                  {
                    "@type": "CreativeWork", 
                    "position": 2,
                    "name": "HerbaLink Wellness Platform",
                    "url": "https://barskydesign.pro/project/herbalink"
                  }
                ]
              },
              "author": {
                "@type": "Person",
                "name": "Hiram Barsky",
                "jobTitle": "Product Designer & Gen AI Developer"
              }
            }
          `}
        </script>
      </Helmet>
      
      <AllProjects />
    </>
  );
};

export default Projects;
