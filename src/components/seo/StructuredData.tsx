
import React from "react";
import { Helmet } from "react-helmet-async";

const StructuredData: React.FC = () => {
  const personStructuredData = {
    "@context": "https://schema.org",
    "@type": ["Person", "ProfessionalService"],
    "name": "Hiram Barsky Design",
    "alternateName": ["Hiram Barsky", "Hiram Barsky UX Designer", "Hiram Barsky Frontend Developer", "Hiram Barsky Designer"],
    "description": "Hiram Barsky is a Product Designer & Frontend Developer creating user-centered digital experiences through user research, wireframing, prototyping, and responsive frontend development.",
    "jobTitle": "Product Designer & Frontend Developer",
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
      "https://www.linkedin.com/company/hiram-barsky-design",
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
      "name": "Product Designer & Frontend Developer",
      "description": "Hiram Barsky Design specializes in creating user-centered digital experiences through comprehensive design and development expertise"
    },
    "worksFor": {
      "@type": "Organization",
      "name": "Hiram Barsky Design",
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
          "description": "Comprehensive user research to understand user needs and behaviors by Hiram Barsky Design.",
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
          "description": "Strategic wireframing and interactive prototyping for optimal user experience by Hiram Barsky Design.",
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
          "description": "Beautiful visual design and scalable design systems by Hiram Barsky Design.",
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
          "description": "Modern React applications with TypeScript by Hiram Barsky Design.",
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
          "description": "Mobile-first responsive web development by Hiram Barsky Design.",
          "provider": {
            "@type": "Person",
            "name": "Hiram Barsky"
          }
        }
      }
    ],
    "owns": {
      "@type": "WebSite",
      "name": "Hiram Barsky Design",
      "url": "https://barskydesign.pro",
      "about": "Product Design and frontend development services"
    }
  };

  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Hiram Barsky Design - Product Designer & Frontend Developer",
    "alternateName": "Hiram Barsky Design Portfolio",
    "url": "https://barskydesign.pro",
    "description": "Hiram Barsky is a Product Designer & Frontend Developer creating user-centered digital experiences through user research, wireframing, prototyping, and responsive frontend development.",
    "author": {
      "@type": "Person",
      "name": "Hiram Barsky"
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
