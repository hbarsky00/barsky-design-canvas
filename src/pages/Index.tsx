
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
        <title>Hiram Barsky | Product Designer & Developer | Professional Design Services</title>
        <meta name="description" content="Professional design services by Hiram Barsky, specializing in Website Design Services, App Design Services, AI Driven Design, and comprehensive Product Design Services." />
        <meta name="keywords" content="Website Design Services, App Design Services, AI Driven Design Services, Product Design Services, UX/UI Design Services, Mobile App Development Services, Design Systems Development, Responsive Web Design, Cross-platform Design Solutions, New York designer" />
        <meta property="og:title" content="Hiram Barsky | Professional Design Services" />
        <meta property="og:description" content="Professional design services by Hiram Barsky, specializing in Website Design Services, App Design Services, AI Driven Design, and comprehensive Product Design Services." />
        <meta property="og:image" content="https://hirambarsky.com/lovable-uploads/file-c4fc0432-7896-442d-980d-133d9c7442e9" />
        <meta property="og:url" content="https://hirambarsky.com/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hiram Barsky | Professional Design Services" />
        <meta name="twitter:description" content="Professional design services by Hiram Barsky, specializing in Website Design Services, App Design Services, AI Driven Design, and comprehensive Product Design Services." />
        <meta name="twitter:image" content="https://hirambarsky.com/lovable-uploads/file-c4fc0432-7896-442d-980d-133d9c7442e9" />
        <link rel="canonical" href="https://hirambarsky.com/" />
        
        {/* Structured data for better SEO */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Hiram Barsky Design Services",
              "image": "https://hirambarsky.com/lovable-uploads/file-c4fc0432-7896-442d-980d-133d9c7442e9",
              "url": "https://hirambarsky.com",
              "telephone": "+1-201-668-4754",
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
              "description": "Professional design services by Hiram Barsky, specializing in Website Design Services, App Design Services, AI Driven Design, and comprehensive Product Design Services.",
              "makesOffer": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Website Design Services",
                    "description": "Custom website design with focus on user experience and conversion optimization."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "App Design Services",
                    "description": "Intuitive and engaging mobile application designs for iOS and Android platforms."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "AI Driven Design Services",
                    "description": "Leveraging artificial intelligence to create innovative, data-driven design solutions."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Product Design Services",
                    "description": "End-to-end product design from concept to implementation with user research and testing."
                  }
                }
              ]
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
