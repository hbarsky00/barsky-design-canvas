
import React from "react";
import { Helmet } from "react-helmet-async";

const ServicesStructuredData = () => {
  return (
    <Helmet>
      <title>Professional Design Services | UX/UI Design | Web & Mobile App Development | Hiram Barsky</title>
      <meta name="description" content="Expert UX/UI design and development services for websites and mobile applications. Specializing in user-centered design, responsive web development, and cross-platform mobile apps." />
      <meta name="keywords" content="UX design services, UI design company, website design services, app design services, mobile app development, UX consultant, UI designer, web development services, product design, design systems" />
      <link rel="canonical" href="https://hirambarsky.com/services" />
      
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
            "description": "Professional UX/UI design and development services for websites and mobile applications, focusing on user-centered design principles and modern development practices.",
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
                  "serviceType": "Website Design",
                  "description": "Custom website design with focus on user experience and conversion optimization."
                },
                {
                  "@type": "Service",
                  "serviceType": "Mobile App Design",
                  "description": "Intuitive and engaging mobile application designs for iOS and Android platforms."
                },
                {
                  "@type": "Service",
                  "serviceType": "UX Consultation",
                  "description": "Expert UX consultation services to improve existing products or guide new development."
                },
                {
                  "@type": "Service",
                  "serviceType": "Design Systems",
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
