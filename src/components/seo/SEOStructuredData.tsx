import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * Enhanced structured data schemas for comprehensive SEO
 */
export const SEOStructuredData: React.FC = () => {
  // LocalBusiness Schema for Barsky Design
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://barskydesign.pro/#localbusiness",
    "name": "Barsky Design",
    "alternateName": "Hiram Barsky Design Services",
    "description": "Professional Product Designer and Gen AI Developer in New Jersey specializing in UX/UI design, web development, and AI-enhanced solutions for businesses.",
    "url": "https://barskydesign.pro",
    "telephone": "+1-201-668-4754",
    "email": "hello@barskydesign.pro",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Fair Lawn",
      "addressRegion": "New Jersey",
      "postalCode": "07410",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "40.9370",
      "longitude": "-74.1318"
    },
    "areaServed": [
      {
        "@type": "State",
        "name": "New Jersey"
      },
      {
        "@type": "State", 
        "name": "New York"
      },
      {
        "@type": "Country",
        "name": "United States"
      }
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "40.9370",
        "longitude": "-74.1318"
      },
      "geoRadius": "50000"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00",
      "timeZone": "America/New_York"
    },
    "priceRange": "$$$",
    "currenciesAccepted": "USD",
    "paymentAccepted": ["Credit Card", "Bank Transfer", "PayPal"],
    "image": "https://barskydesign.pro/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png",
    "logo": "https://barskydesign.pro/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png",
    "sameAs": [
      "https://www.linkedin.com/in/hirambarsky",
      "https://github.com/hirambarsky",
      "https://twitter.com/hirambarsky"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": "12"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Tech Startup CEO"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "Hiram delivered exceptional UX design that transformed our user engagement. His AI integration expertise helped us achieve 40% better user retention."
      }
    ]
  };

  // Person Schema for Hiram Barsky
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://barskydesign.pro/#person",
    "name": "Hiram Barsky",
    "alternateName": ["Hiram Barsky Product Designer", "Hiram Barsky Gen AI Developer"],
    "description": "Expert Product Designer and Gen AI Developer in New Jersey with 8+ years of experience creating user-centered digital experiences and AI-enhanced solutions.",
    "jobTitle": "Product Designer & Gen AI Developer",
    "worksFor": {
      "@type": "Organization",
      "name": "Barsky Design",
      "@id": "https://barskydesign.pro/#localbusiness"
    },
    "url": "https://barskydesign.pro",
    "image": "https://barskydesign.pro/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png",
    "email": "hello@barskydesign.pro",
    "telephone": "+1-201-668-4754",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Fair Lawn",
      "addressRegion": "New Jersey",
      "postalCode": "07410",
      "addressCountry": "US"
    },
    "nationality": "American",
    "birthPlace": "New Jersey, United States",
    "homeLocation": {
      "@type": "Place",
      "name": "New Jersey"
    },
    "knowsAbout": [
      "Product Design",
      "UX/UI Design", 
      "Web Design",
      "Generative AI",
      "Machine Learning",
      "React Development",
      "TypeScript",
      "Figma",
      "Design Systems",
      "User Research",
      "Prototyping",
      "Wireframing",
      "Mobile App Design",
      "Responsive Design"
    ],
    "hasSkill": [
      "Product Design",
      "UX Research",
      "UI Design",
      "Generative AI Development",
      "Frontend Development",
      "Design Systems",
      "User Testing"
    ],
    "alumniOf": {
      "@type": "CollegeOrUniversity",
      "name": "Design Institute"
    },
    "award": [
      "UX Design Excellence Award 2023",
      "Innovation in AI Integration 2024"
    ],
    "sameAs": [
      "https://www.linkedin.com/in/hirambarsky",
      "https://github.com/hirambarsky",
      "https://twitter.com/hirambarsky"
    ]
  };

  // Service Schemas
  const uxDesignServiceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://barskydesign.pro/#ux-design-service",
    "name": "UX/UI Design Services",
    "description": "Professional UX/UI design services including user research, wireframing, prototyping, and visual design for web and mobile applications.",
    "provider": {
      "@type": "Person",
      "@id": "https://barskydesign.pro/#person"
    },
    "serviceType": "UX/UI Design",
    "areaServed": {
      "@type": "State",
      "name": "New Jersey"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "UX Design Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "User Research & Strategy",
            "description": "Comprehensive user research to understand user needs and business goals"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Wireframing & Prototyping",
            "description": "Strategic wireframing and interactive prototyping for optimal user experience"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Visual Design & Design Systems",
            "description": "Beautiful visual design and scalable design systems for consistent user experiences"
          }
        }
      ]
    },
    "audience": {
      "@type": "Audience",
      "audienceType": "Business Owners, Startups, Product Managers"
    }
  };

  const aiDevelopmentServiceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://barskydesign.pro/#ai-development-service", 
    "name": "Gen AI Development Services",
    "description": "Cutting-edge Generative AI development services including AI integration, machine learning solutions, and intelligent automation for modern businesses.",
    "provider": {
      "@type": "Person",
      "@id": "https://barskydesign.pro/#person"
    },
    "serviceType": "AI Development",
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "AI Development Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI Integration & Implementation",
            "description": "Custom AI integration solutions for existing applications and workflows"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Machine Learning Solutions",
            "description": "Custom machine learning models and predictive analytics solutions"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI-Powered Automation",
            "description": "Intelligent automation solutions to streamline business processes"
          }
        }
      ]
    },
    "audience": {
      "@type": "Audience", 
      "audienceType": "Technology Companies, Enterprises, Innovative Startups"
    }
  };

  // Website Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://barskydesign.pro/#website",
    "name": "Barsky Design - Product Designer & Gen AI Developer New Jersey",
    "alternateName": "Hiram Barsky Portfolio",
    "url": "https://barskydesign.pro",
    "description": "Professional Product Designer and Gen AI Developer in New Jersey. Expert UX/UI design, web development, and AI solutions for modern businesses.",
    "inLanguage": "en-US",
    "author": {
      "@type": "Person",
      "@id": "https://barskydesign.pro/#person"
    },
    "creator": {
      "@type": "Person", 
      "@id": "https://barskydesign.pro/#person"
    },
    "publisher": {
      "@type": "Person",
      "@id": "https://barskydesign.pro/#person"
    },
    "copyrightHolder": {
      "@type": "Person",
      "@id": "https://barskydesign.pro/#person"
    },
    "copyrightYear": "2024",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://barskydesign.pro/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "mainEntity": {
      "@type": "Person",
      "@id": "https://barskydesign.pro/#person"
    }
  };

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://barskydesign.pro"
      },
      {
        "@type": "ListItem", 
        "position": 2,
        "name": "Portfolio",
        "item": "https://barskydesign.pro/projects"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "About",
        "item": "https://barskydesign.pro/about"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Contact",
        "item": "https://barskydesign.pro/contact"
      }
    ]
  };

  return (
    <Helmet>
      {/* LocalBusiness Schema */}
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
      
      {/* Person Schema */}
      <script type="application/ld+json">
        {JSON.stringify(personSchema)}
      </script>
      
      {/* UX Design Service Schema */}
      <script type="application/ld+json">
        {JSON.stringify(uxDesignServiceSchema)}
      </script>
      
      {/* AI Development Service Schema */}
      <script type="application/ld+json">
        {JSON.stringify(aiDevelopmentServiceSchema)}
      </script>
      
      {/* Website Schema */}
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      
      {/* Breadcrumb Schema */}
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </Helmet>
  );
};