
import React from "react";
import { Helmet } from "react-helmet-async";

const ServicesStructuredData = () => {
  return (
    <Helmet>
      <title>Professional Design Services | Product Design | Web & Mobile App Development | Hiram Barsky</title>
      <meta name="description" content="Expert Product Design and development services for websites and mobile applications. Specializing in user-centered design, responsive web development, and AI-driven design solutions." />
      <meta name="keywords" content="Website Design Services, App Design Services, AI Driven Design Services, Product Design Services, Mobile App Development Services, Design Systems Development, Responsive Web Design, Cross-platform Design Solutions" />
      
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Design Services",
            "provider": {
              "@type": "ProfessionalService",
              "name": "Hiram Barsky Design Services",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "New York",
                "addressRegion": "NY",
                "addressCountry": "US"
              }
            },
            "areaServed": {
              "@type": "Country",
              "name": "United States"
            },
            "description": "Professional Product Design and development services for websites and mobile applications, focusing on user-centered design principles, AI-driven solutions, and modern development practices.",
            "offers": {
              "@type": "Offer",
              "availability": "https://schema.org/InStock",
              "priceSpecification": {
                "@type": "PriceSpecification",
                "price": "150.00",
                "priceCurrency": "USD",
                "unitText": "hour"
              }
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Design Services",
              "itemListElement": [
                {
                  "@type": "Service",
                  "serviceType": "Website Design Services",
                  "description": "Custom website design with focus on user experience, conversion optimization, and responsive layouts."
                },
                {
                  "@type": "Service",
                  "serviceType": "App Design Services",
                  "description": "Intuitive and engaging mobile application designs for iOS and Android platforms."
                },
                {
                  "@type": "Service",
                  "serviceType": "AI Driven Design Services",
                  "description": "Leveraging artificial intelligence to create innovative, data-driven design solutions."
                },
                {
                  "@type": "Service",
                  "serviceType": "Product Design Services",
                  "description": "End-to-end product design from concept to implementation with user research and testing."
                },
                {
                  "@type": "Service",
                  "serviceType": "Design Systems Development",
                  "description": "Creation of comprehensive design systems for consistent product experience."
                }
              ]
            }
          }
        `}
      </script>
    </Helmet>
  );
};

export default ServicesStructuredData;
