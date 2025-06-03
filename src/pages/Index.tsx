
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
    trackPageView('/', 'Homepage - Hiram Barsky UX/UI Designer & Frontend Developer');
  }, [location.state]);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Helmet>
        <title>Hiram Barsky - UX/UI Designer & Frontend Developer | User-Centered Digital Experiences</title>
        <meta name="description" content="Hiram Barsky is a UX/UI Designer & Frontend Developer creating user-centered digital experiences through user research, wireframing, prototyping, and responsive frontend development." />
        <meta name="keywords" content="Hiram Barsky, UX/UI Designer, Frontend Developer, User Research, Wireframing, Prototyping, Visual Design, Figma, React, TypeScript, Responsive Design, Design Systems, Usability Testing" />
        <meta name="author" content="Hiram Barsky" />
        <meta property="og:title" content="Hiram Barsky - UX/UI Designer & Frontend Developer" />
        <meta property="og:description" content="Creating User-Centered Digital Experiences through user research, wireframing, prototyping, and responsive frontend development." />
        <meta property="og:image" content="https://barskydesign.pro/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png" />
        <meta property="og:url" content="https://barskydesign.pro/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Hiram Barsky - UX/UI Designer & Frontend Developer" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@hirambarsky" />
        <meta name="twitter:title" content="Hiram Barsky - UX/UI Designer & Frontend Developer" />
        <meta name="twitter:description" content="Creating User-Centered Digital Experiences through user research, wireframing, prototyping, and responsive frontend development." />
        <meta name="twitter:image" content="https://barskydesign.pro/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png" />
        <link rel="canonical" href="https://barskydesign.pro/" />
        
        {/* Enhanced structured data */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": ["Person", "ProfessionalService"],
              "name": "Hiram Barsky",
              "givenName": "Hiram",
              "familyName": "Barsky",
              "alternateName": ["Hiram Barsky UX Designer", "Hiram Barsky Frontend Developer", "Hiram Barsky Designer"],
              "description": "Hiram Barsky is a UX/UI Designer & Frontend Developer creating user-centered digital experiences through user research, wireframing, prototyping, and responsive frontend development.",
              "jobTitle": "UX/UI Designer & Frontend Developer",
              "image": "https://barskydesign.pro/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png",
              "url": "https://barskydesign.pro",
              "mainEntityOfPage": "https://barskydesign.pro",
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
                "User Research",
                "Wireframing",
                "Prototyping",
                "Visual Design",
                "Figma",
                "React",
                "TypeScript",
                "Responsive Design",
                "Design Systems",
                "Usability Testing"
              ],
              "hasCredential": {
                "@type": "EducationalOccupationalCredential",
                "name": "UX/UI Designer & Frontend Developer",
                "description": "Hiram Barsky specializes in creating user-centered digital experiences through comprehensive design and development expertise"
              },
              "worksFor": {
                "@type": "Organization",
                "name": "Hiram Barsky Design Services",
                "url": "https://barskydesign.pro",
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
                    "name": "User Research",
                    "description": "Comprehensive user research to understand user needs and behaviors by Hiram Barsky.",
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
                    "name": "Wireframing & Prototyping",
                    "description": "Strategic wireframing and interactive prototyping for optimal user experience by Hiram Barsky.",
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
                    "name": "Visual Design & Design Systems",
                    "description": "Beautiful visual design and scalable design systems by Hiram Barsky.",
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
                    "name": "React Development",
                    "description": "Modern React applications with TypeScript by Hiram Barsky.",
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
                    "name": "Responsive Design Implementation",
                    "description": "Mobile-first responsive web development by Hiram Barsky.",
                    "provider": {
                      "@type": "Person",
                      "name": "Hiram Barsky"
                    }
                  }
                }
              ],
              "owns": {
                "@type": "WebSite",
                "name": "Hiram Barsky Design Services",
                "url": "https://barskydesign.pro",
                "about": "UX/UI design and frontend development services"
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
              "name": "Hiram Barsky - UX/UI Designer & Frontend Developer",
              "alternateName": "Hiram Barsky Designer Portfolio",
              "url": "https://barskydesign.pro",
              "description": "Hiram Barsky is a UX/UI Designer & Frontend Developer creating user-centered digital experiences through user research, wireframing, prototyping, and responsive frontend development.",
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
                "target": "https://barskydesign.pro/search?q={search_term_string}",
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
