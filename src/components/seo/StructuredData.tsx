
import React from "react";
import { Helmet } from "react-helmet-async";

const StructuredData: React.FC = () => {
  const personStructuredData = {
    "@context": "https://schema.org",
    "@type": ["Person", "ProfessionalService"],
    "name": "Barsky Design",
    "alternateName": ["Barsky Design UX Designer", "Barsky Design Frontend Developer", "Barsky Design Designer"],
    "description": "Barsky Design is a UX/UI Designer & Frontend Developer creating user-centered digital experiences through user research, wireframing, prototyping, and responsive frontend development.",
    "jobTitle": "UX/UI Designer & Frontend Developer",
    "image": "https://barskydesign.pro/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png",
    "url": "https://barskydesign.pro",
    "mainEntityOfPage": "https://barskydesign.pro",
    "telephone": "+1-201-668-4754",
    "email": "hello@barskydesign.com",
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
      "https://www.linkedin.com/company/barsky-design",
      "https://instagram.com/barskydesign"
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
      "description": "Barsky Design specializes in creating user-centered digital experiences through comprehensive design and development expertise"
    },
    "worksFor": {
      "@type": "Organization",
      "name": "Barsky Design Services",
      "url": "https://barskydesign.pro",
      "founder": {
        "@type": "Person",
        "name": "Barsky Design"
      }
    },
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "User Research",
          "description": "Comprehensive user research to understand user needs and behaviors by Barsky Design.",
          "provider": {
            "@type": "Person",
            "name": "Barsky Design"
          }
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Wireframing & Prototyping",
          "description": "Strategic wireframing and interactive prototyping for optimal user experience by Barsky Design.",
          "provider": {
            "@type": "Person",
            "name": "Barsky Design"
          }
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Visual Design & Design Systems",
          "description": "Beautiful visual design and scalable design systems by Barsky Design.",
          "provider": {
            "@type": "Person",
            "name": "Barsky Design"
          }
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "React Development",
          "description": "Modern React applications with TypeScript by Barsky Design.",
          "provider": {
            "@type": "Person",
            "name": "Barsky Design"
          }
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Responsive Design Implementation",
          "description": "Mobile-first responsive web development by Barsky Design.",
          "provider": {
            "@type": "Person",
            "name": "Barsky Design"
          }
        }
      }
    ],
    "owns": {
      "@type": "WebSite",
      "name": "Barsky Design Services",
      "url": "https://barskydesign.pro",
      "about": "UX/UI design and frontend development services"
    }
  };

  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Barsky Design - UX/UI Designer & Frontend Developer",
    "alternateName": "Barsky Design Portfolio",
    "url": "https://barskydesign.pro",
    "description": "Barsky Design is a UX/UI Designer & Frontend Developer creating user-centered digital experiences through user research, wireframing, prototyping, and responsive frontend development.",
    "author": {
      "@type": "Person",
      "name": "Barsky Design"
    },
    "creator": {
      "@type": "Person",
      "name": "Barsky Design"
    },
    "publisher": {
      "@type": "Person",
      "name": "Barsky Design"
    },
    "copyrightHolder": {
      "@type": "Person",
      "name": "Barsky Design"
    },
    "mainEntity": {
      "@type": "Person",
      "name": "Barsky Design"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://barskydesign.pro/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(personStructuredData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteStructuredData)}
      </script>
    </Helmet>
  );
};

export default StructuredData;
