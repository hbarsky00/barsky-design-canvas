
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Pricing from "@/components/Pricing";
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
        <title>Hiram Barsky | Product Designer & Developer | Portfolio</title>
        <meta name="description" content="Experienced Product Designer and Developer specializing in website design, app design, and UX/UI consultation services. Based in New York." />
        <meta name="keywords" content="UI design, UX design, web development, website design, app design, mobile app, UX/UI consultation, product designer, design systems, user research, New York designer" />
        <meta property="og:title" content="Hiram Barsky | Product Designer & Developer" />
        <meta property="og:description" content="Professional Product Design and Development services. Specializing in website design, app design, and UX/UI consultation." />
        <meta property="og:image" content="https://hirambarsky.com/lovable-uploads/file-c4fc0432-7896-442d-980d-133d9c7442e9" />
        <meta property="og:url" content="https://hirambarsky.com/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hiram Barsky | Product Designer & Developer" />
        <meta name="twitter:description" content="Professional Product Design and Development services." />
        <meta name="twitter:image" content="https://hirambarsky.com/lovable-uploads/file-c4fc0432-7896-442d-980d-133d9c7442e9" />
        <link rel="canonical" href="https://hirambarsky.com/" />
        
        {/* Structured data for better SEO */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Hiram Barsky Product Design",
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
              "description": "Experienced Product Designer and Developer specializing in website design, app design, and UX/UI consultation services."
            }
          `}
        </script>
      </Helmet>
      
      <Header />
      <main className="flex-grow">
        <Hero />
        <Projects />
        <About />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
