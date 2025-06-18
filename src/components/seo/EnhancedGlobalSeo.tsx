
import React from "react";
import { Helmet } from "react-helmet-async";

interface EnhancedGlobalSeoProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  noIndex?: boolean;
  breadcrumbs?: Array<{
    name: string;
    url: string;
  }>;
  keywords?: string[];
  pageType?: 'homepage' | 'portfolio' | 'services' | 'blog' | 'project';
}

const EnhancedGlobalSeo: React.FC<EnhancedGlobalSeoProps> = ({
  title = "Barsky Design - Professional UX/UI Designer & Frontend Developer | Hire Top Design Talent",
  description = "Hire Barsky Design - Professional UX/UI Designer & Frontend Developer specializing in mobile app design, web development, startup MVP design, and AI-driven design solutions. 5+ years experience creating user-centered digital experiences.",
  canonicalUrl = "https://barskydesign.pro",
  ogImage = "https://barskydesign.pro/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png",
  noIndex = false,
  breadcrumbs = [],
  keywords = [],
  pageType = 'homepage'
}) => {
  
  // Enhanced keywords based on page type
  const getPageKeywords = () => {
    const baseKeywords = [
      "Barsky Design", "UX/UI Designer", "Frontend Developer", "Product Designer",
      "Mobile App Design", "Web Development", "Startup Design", "MVP Design",
      "Design Systems", "User Experience", "User Interface", "React Developer",
      "Freelance Designer", "Hire Designer", "Design Consultant"
    ];
    
    const customKeywords = keywords.length > 0 ? keywords : [];
    
    const pageSpecificKeywords = {
      homepage: ["Portfolio", "Design Services", "Freelance", "New York Designer"],
      portfolio: ["Case Studies", "Project Portfolio", "Design Examples", "UX Case Studies"],
      services: ["Design Services", "UX/UI Services", "Web Development Services", "Design Consultation"],
      blog: ["Design Blog", "UX Articles", "Design Tips", "Industry Insights"],
      project: ["Case Study", "Design Process", "Project Details", "Design Solution"]
    };
    
    return [...baseKeywords, ...customKeywords, ...pageSpecificKeywords[pageType]];
  };

  const allKeywords = getPageKeywords();
  const robotsContent = noIndex 
    ? "noindex, nofollow" 
    : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1";

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords.join(", ")} />
      <meta name="author" content="Barsky Design" />
      
      {/* Enhanced professional targeting */}
      <meta name="skills" content="UX/UI Design, Frontend Development, React, TypeScript, Figma, Adobe Creative Suite, Mobile App Design, Web Development, Design Systems, User Research" />
      <meta name="experience" content="5+ years professional design experience" />
      <meta name="location" content="New York, NY, USA" />
      <meta name="availability" content="Available for freelance projects and consulting" />
      
      {/* Explicit indexing directives */}
      <meta name="robots" content={robotsContent} />
      <meta name="googlebot" content={robotsContent} />
      <meta name="bingbot" content={robotsContent} />
      
      {/* Enhanced Open Graph with better targeting */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="profile" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Barsky Design - Professional Design Portfolio" />
      <meta property="og:locale" content="en_US" />
      <meta property="profile:first_name" content="Barsky" />
      <meta property="profile:last_name" content="Design" />
      <meta property="profile:username" content="barskydesign" />
      
      {/* Enhanced Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:creator" content="@barskydesign" />
      <meta name="twitter:site" content="@barskydesign" />
      
      {/* Professional networking meta tags */}
      <meta name="linkedin:owner" content="barsky-design" />
      <meta name="profession" content="UX/UI Designer & Frontend Developer" />
      
      {/* Canonical and alternate URLs */}
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang="en" href={canonicalUrl} />
      
      {/* Additional SEO meta tags */}
      <meta name="theme-color" content="#3B82F6" />
      <meta name="msapplication-TileColor" content="#3B82F6" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Enhanced structured data with professional focus */}
      <script type="application/ld+json">
        {`
          [
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://barskydesign.pro/#website",
              "name": "Barsky Design - Professional UX/UI Designer & Frontend Developer",
              "alternateName": "Barsky Design Portfolio",
              "url": "https://barskydesign.pro",
              "description": "${description}",
              "inLanguage": "en-US",
              "author": {
                "@type": "Organization",
                "@id": "https://barskydesign.pro/#organization"
              },
              "publisher": {
                "@type": "Organization",
                "@id": "https://barskydesign.pro/#organization"
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://barskydesign.pro/projects?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://barskydesign.pro/#organization",
              "name": "Barsky Design",
              "alternateName": ["Barsky Design Studio"],
              "description": "Barsky Design is a Professional UX/UI Design and Frontend Development studio with 5+ years of experience specializing in user-centered design, mobile app development, and startup MVP creation.",
              "url": "https://barskydesign.pro",
              "email": "hello@barskydesign.com",
              "telephone": "+1-201-668-4754",
              "image": "https://barskydesign.pro/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "New York",
                "addressRegion": "NY",
                "addressCountry": "US",
                "postalCode": "10001"
              },
              "sameAs": [
                "https://www.linkedin.com/company/barsky-design",
                "https://twitter.com/barskydesign",
                "https://instagram.com/barskydesign",
                "https://dribbble.com/barskydesign",
                "https://behance.net/barskydesign"
              ],
              "knowsAbout": [
                "UX/UI Design",
                "Frontend Development", 
                "Mobile App Design",
                "Web Development",
                "React Development",
                "TypeScript",
                "Design Systems",
                "User Research",
                "Prototyping",
                "Wireframing",
                "Figma",
                "Adobe Creative Suite",
                "Startup MVP Design",
                "AI-Driven Design"
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "@id": "https://barskydesign.pro/#service",
              "name": "Barsky Design Services",
              "description": "Professional UX/UI Design and Frontend Development Services",
              "provider": {
                "@type": "Organization",
                "@id": "https://barskydesign.pro/#organization"
              },
              "areaServed": "Worldwide",
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Design Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "UX/UI Design",
                      "description": "User experience and interface design for web and mobile applications"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Frontend Development",
                      "description": "React and TypeScript development for modern web applications"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Mobile App Design",
                      "description": "iOS and Android mobile application design"
                    }
                  }
                ]
              }
            }
            ${breadcrumbs.length > 0 ? `,
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                ${breadcrumbs.map((breadcrumb, index) => `
                {
                  "@type": "ListItem",
                  "position": ${index + 1},
                  "name": "${breadcrumb.name}",
                  "item": "${breadcrumb.url}"
                }`).join(',')}
              ]
            }` : ''}
          ]
        `}
      </script>
    </Helmet>
  );
};

export default EnhancedGlobalSeo;
