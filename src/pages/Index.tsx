
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
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Hiram Barsky | UX/UI Designer & Web Developer | Portfolio</title>
        <meta name="description" content="Experienced UX/UI designer and web developer specializing in website design, app design, and UX/UI consultation services. Based in New York." />
        <meta name="keywords" content="UI design, UX design, web development, website design, app design, mobile app, UX/UI consultation, product designer, design systems, user research, New York designer" />
        <meta property="og:title" content="Hiram Barsky | UX/UI Designer & Web Developer" />
        <meta property="og:description" content="Professional UX/UI design and web development services. Specializing in website design, app design, and UX/UI consultation." />
        <meta property="og:image" content="https://barskydesign.com/images/portfolio-preview.png" />
        <meta property="og:url" content="https://barskydesign.com/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hiram Barsky | UX/UI Designer & Web Developer" />
        <meta name="twitter:description" content="Professional UX/UI design and web development services." />
        <meta name="twitter:image" content="https://barskydesign.com/images/portfolio-preview.png" />
        <link rel="canonical" href="https://barskydesign.com/" />
        
        {/* Structured data for better SEO */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Hiram Barsky UX/UI Design",
              "image": "https://barskydesign.com/images/portfolio-preview.png",
              "url": "https://barskydesign.com",
              "telephone": "+1-123-456-7890",
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
                "https://twitter.com/barskydesign",
                "https://linkedin.com/in/hirambarsky",
                "https://instagram.com/barskydesign"
              ],
              "priceRange": "$$",
              "description": "Experienced UX/UI designer and web developer specializing in website design, app design, and UX/UI consultation services."
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
