
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import EnhancedHero from "@/components/hero/EnhancedHero";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import SkillsShowcase from "@/components/home/SkillsShowcase";
import AboutPreview from "@/components/home/AboutPreview";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { trackPageView } from "@/lib/analytics";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    // If there's a scrollTo in the state, scroll to that section
    if (location.state && location.state.scrollTo) {
      const section = document.getElementById(location.state.scrollTo);
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
    
    // Track homepage view with additional details
    trackPageView('/', 'Homepage - Hiram Barsky Product Design Services');
  }, [location.state]);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Helmet>
        <title>Hiram Barsky | Rapid, High-Quality Product Design Services | UX Audits, MVP Design, Design Systems</title>
        <meta name="description" content="Hiram Barsky provides rapid, high-quality product design services including UX audits, MVP & mobile/web app design, design systems in Figma, developer-ready UI files, and UX strategy consulting. Professional Product Designer & Developer based in New York." />
        <meta name="keywords" content="Hiram Barsky, design, Product Design Services, UX Audits, MVP Design, Mobile App Design, Web App Design, Design Systems, Figma Design, Developer-ready UI Files, UX Strategy Consulting, Rapid Design Services, High-Quality Design, Product Designer New York, UX/UI Designer, Professional Design Services" />
        <meta name="author" content="Hiram Barsky" />
        <meta property="og:title" content="Hiram Barsky | Rapid, High-Quality Product Design Services" />
        <meta property="og:description" content="Hiram Barsky provides rapid, high-quality product design services including UX audits, MVP & mobile/web app design, design systems in Figma, developer-ready UI files, and UX strategy consulting." />
        <meta property="og:image" content="https://hirambarsky.com/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png" />
        <meta property="og:url" content="https://hirambarsky.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Hiram Barsky - Product Design Services" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@hirambarsky" />
        <meta name="twitter:title" content="Hiram Barsky | Rapid, High-Quality Product Design Services" />
        <meta name="twitter:description" content="Hiram Barsky provides rapid, high-quality product design services including UX audits, MVP & mobile/web app design, design systems in Figma, developer-ready UI files, and UX strategy consulting." />
        <meta name="twitter:image" content="https://hirambarsky.com/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png" />
        <link rel="canonical" href="https://hirambarsky.com/" />
        
        {/* Enhanced structured data */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": ["Person", "ProfessionalService"],
              "name": "Hiram Barsky",
              "givenName": "Hiram",
              "familyName": "Barsky",
              "alternateName": ["Hiram Barsky Product Design", "Hiram Barsky UX Designer", "Hiram Barsky Design Services"],
              "description": "Hiram Barsky provides rapid, high-quality product design services including UX audits, MVP & mobile/web app design, design systems in Figma, developer-ready UI files, and UX strategy consulting. Professional Product Designer & Developer based in New York.",
              "jobTitle": "Product Designer & Developer",
              "image": "https://hirambarsky.com/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png",
              "url": "https://hirambarsky.com",
              "mainEntityOfPage": "https://hirambarsky.com",
              "telephone": "+1-201-668-4754",
              "email": "hello@hirambarsky.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "New York",
                "addressRegion": "NY",
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "40.7128",
                "longitude": "-74.0060"
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday"
                ],
                "opens": "09:00",
                "closes": "18:00"
              },
              "sameAs": [
                "https://twitter.com/hirambarsky",
                "https://linkedin.com/in/hirambarsky",
                "https://instagram.com/hirambarsky"
              ],
              "priceRange": "$$",
              "knowsAbout": [
                "UX Audits",
                "MVP Design",
                "Mobile App Design",
                "Web App Design", 
                "Design Systems",
                "Figma Design",
                "Developer-ready UI Files",
                "UX Strategy Consulting"
              ],
              "hasCredential": {
                "@type": "EducationalOccupationalCredential",
                "name": "Professional Product Designer & Developer",
                "description": "Hiram Barsky specializes in rapid, high-quality product design services with expertise in UX audits and strategy consulting"
              },
              "worksFor": {
                "@type": "Organization",
                "name": "Hiram Barsky Product Design Services",
                "url": "https://hirambarsky.com",
                "founder": {
                  "@type": "Person",
                  "name": "Hiram Barsky"
                }
              },
              "makesOffer": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "UX Audits",
                    "description": "Comprehensive UX audits to identify usability issues and optimization opportunities by Hiram Barsky.",
                    "provider": {
                      "@type": "Person",
                      "name": "Hiram Barsky"
                    }
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "MVP & Mobile/Web App Design",
                    "description": "Complete MVP and application design for mobile and web platforms by Hiram Barsky.",
                    "provider": {
                      "@type": "Person",
                      "name": "Hiram Barsky"
                    }
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Design Systems in Figma",
                    "description": "Comprehensive design systems and component libraries in Figma by Hiram Barsky.",
                    "provider": {
                      "@type": "Person",
                      "name": "Hiram Barsky"
                    }
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Developer-ready UI Files",
                    "description": "Production-ready UI files optimized for developer handoff by Hiram Barsky.",
                    "provider": {
                      "@type": "Person",
                      "name": "Hiram Barsky"
                    }
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "UX Strategy Consulting",
                    "description": "Strategic UX consulting to align design decisions with business goals by Hiram Barsky.",
                    "provider": {
                      "@type": "Person",
                      "name": "Hiram Barsky"
                    }
                  }
                }
              ],
              "owns": {
                "@type": "WebSite",
                "name": "Hiram Barsky Product Design Services",
                "url": "https://hirambarsky.com",
                "about": "Professional product design services including UX audits, MVP design, and consulting"
              }
            }
          `}
        </script>
        
        {/* Additional WebSite structured data */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Hiram Barsky - Product Design Services",
              "alternateName": "Hiram Barsky Designer Portfolio",
              "url": "https://hirambarsky.com",
              "description": "Hiram Barsky provides rapid, high-quality product design services including UX audits, MVP & mobile/web app design, design systems in Figma, developer-ready UI files, and UX strategy consulting.",
              "author": {
                "@type": "Person",
                "name": "Hiram Barsky",
                "givenName": "Hiram",
                "familyName": "Barsky"
              },
              "creator": {
                "@type": "Person",
                "name": "Hiram Barsky"
              },
              "publisher": {
                "@type": "Person",
                "name": "Hiram Barsky"
              },
              "copyrightHolder": {
                "@type": "Person",
                "name": "Hiram Barsky"
              },
              "mainEntity": {
                "@type": "Person",
                "name": "Hiram Barsky"
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://hirambarsky.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }
          `}
        </script>
      </Helmet>
      
      <Header />
      <main className="flex-grow">
        <EnhancedHero />
        <FeaturedProjects />
        <SkillsShowcase />
        <AboutPreview />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
