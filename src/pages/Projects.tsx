
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
        <title>AI-Enhanced UX Portfolio | Hiram Barsky - Professional Design Projects</title>
        <meta name="description" content="Explore AI-enhanced UX/UI design portfolio featuring conversion-optimized mobile apps, web applications, and accessibility-compliant interfaces. Real case studies with measurable business outcomes and ROI-driven design solutions." />
        <link rel="canonical" href="https://barskydesign.pro/projects" />
        
        {/* Enhanced indexing signals */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <meta name="bingbot" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content="AI-Enhanced UX Portfolio | Professional Design Projects" />
        <meta property="og:description" content="Explore AI-enhanced UX/UI design portfolio featuring conversion-optimized mobile apps, web applications, and accessibility-compliant interfaces." />
        <meta property="og:url" content="https://barskydesign.pro/projects" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://barskydesign.pro/lovable-uploads/0021bf49-27e4-46b8-b948-ecdcd831a773.png" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI-Enhanced UX Portfolio | Professional Design Projects" />
        <meta name="twitter:description" content="Explore AI-enhanced UX/UI design portfolio featuring conversion-optimized mobile apps and web applications." />
        <meta name="twitter:image" content="https://barskydesign.pro/lovable-uploads/0021bf49-27e4-46b8-b948-ecdcd831a773.png" />
        
        {/* Structured data for portfolio */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "name": "AI-Enhanced UX Design Portfolio",
              "description": "Professional portfolio showcasing AI-augmented UX/UI design projects with measurable business outcomes",
              "url": "https://barskydesign.pro/projects",
              "mainEntity": {
                "@type": "ItemList",
                "name": "Design Portfolio Projects",
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
                "jobTitle": "AI-Fluent UX Designer"
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
