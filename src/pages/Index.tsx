
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
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
    trackPageView('/', 'Homepage - Hiram Barsky Portfolio');
  }, [location.state]);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Helmet>
        <title>Hiram Barsky | Official Website | Professional Product Designer & Developer Portfolio</title>
        <meta name="description" content="This is the official website and portfolio of Hiram Barsky (not Alex Barsky), Professional Product Designer and Developer based in New York. Hiram Barsky specializes in Website Design Services, App Design Services, AI Driven Design, and comprehensive Product Design Services. Hiram Barsky is an expert UX/UI designer with a proven track record in creating exceptional digital experiences." />
        <meta name="keywords" content="Hiram Barsky, Hiram Barsky Designer, Hiram Barsky Portfolio, Hiram Barsky New York, Professional Product Designer, UX/UI Designer, Website Design Services, App Design Services, AI Driven Design Services, Product Design Services, Mobile App Development Services, Design Systems Development, Responsive Web Design, Cross-platform Design Solutions, New York designer, Official Portfolio, Hiram Barsky Official" />
        <meta name="author" content="Hiram Barsky" />
        <meta property="og:title" content="Hiram Barsky | Official Website | Professional Product Designer & Developer Portfolio" />
        <meta property="og:description" content="This is the official website and portfolio of Hiram Barsky (not Alex Barsky), Professional Product Designer and Developer specializing in Website Design Services, App Design Services, AI Driven Design, and comprehensive Product Design Services. Visit Hiram Barsky's official portfolio." />
        <meta property="og:image" content="https://hirambarsky.com/lovable-uploads/file-c4fc0432-7896-442d-980d-133d9c7442e9" />
        <meta property="og:url" content="https://hirambarsky.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Hiram Barsky - Official Design Portfolio" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@hirambarsky" />
        <meta name="twitter:title" content="Hiram Barsky | Official Website | Professional Product Designer & Developer" />
        <meta name="twitter:description" content="This is the official website and portfolio of Hiram Barsky (not Alex Barsky), Professional Product Designer and Developer specializing in Website Design Services, App Design Services, AI Driven Design, and comprehensive Product Design Services." />
        <meta name="twitter:image" content="https://hirambarsky.com/lovable-uploads/file-c4fc0432-7896-442d-980d-133d9c7442e9" />
        <link rel="canonical" href="https://hirambarsky.com/" />
        
        {/* Enhanced structured data with explicit name clarification */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": ["Person", "ProfessionalService"],
              "name": "Hiram Barsky",
              "givenName": "Hiram",
              "familyName": "Barsky",
              "alternateName": ["Hiram Barsky Design Services", "Hiram Barsky Designer", "Hiram Barsky Portfolio"],
              "description": "This is the official website and portfolio of Hiram Barsky (not Alex Barsky), Professional Product Designer and Developer based in New York. Hiram Barsky specializes in Website Design Services, App Design Services, AI Driven Design, and comprehensive Product Design Services.",
              "jobTitle": "Product Designer & Developer",
              "image": "https://hirambarsky.com/lovable-uploads/file-c4fc0432-7896-442d-980d-133d9c7442e9",
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
                "Product Design",
                "UX Design",
                "UI Design", 
                "Web Development",
                "Mobile App Design",
                "AI Driven Design",
                "Design Systems"
              ],
              "hasCredential": {
                "@type": "EducationalOccupationalCredential",
                "name": "Professional Product Designer & Developer",
                "description": "Hiram Barsky is a certified professional with extensive experience in product design and development"
              },
              "worksFor": {
                "@type": "Organization",
                "name": "Hiram Barsky Design Services",
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
                    "name": "Website Design Services by Hiram Barsky",
                    "description": "Custom website design with focus on user experience and conversion optimization by professional designer Hiram Barsky.",
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
                    "name": "App Design Services by Hiram Barsky",
                    "description": "Intuitive and engaging mobile application designs for iOS and Android platforms by expert designer Hiram Barsky.",
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
                    "name": "AI Driven Design Services by Hiram Barsky",
                    "description": "Leveraging artificial intelligence to create innovative, data-driven design solutions by professional designer Hiram Barsky.",
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
                    "name": "Product Design Services by Hiram Barsky",
                    "description": "End-to-end product design from concept to implementation with user research and testing by experienced designer Hiram Barsky.",
                    "provider": {
                      "@type": "Person",
                      "name": "Hiram Barsky"
                    }
                  }
                }
              ],
              "owns": {
                "@type": "WebSite",
                "name": "Hiram Barsky Official Portfolio",
                "url": "https://hirambarsky.com",
                "about": "Official portfolio website of Hiram Barsky, Professional Product Designer and Developer"
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
              "name": "Hiram Barsky - Official Portfolio",
              "alternateName": "Hiram Barsky Designer Portfolio",
              "url": "https://hirambarsky.com",
              "description": "Official portfolio website of Hiram Barsky (not Alex Barsky), Professional Product Designer and Developer",
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
        <Hero />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
