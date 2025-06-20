
import React from "react";
import { Helmet } from "react-helmet-async";

interface EnhancedGlobalSeoProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  noIndex?: boolean;
  pageType?: 'homepage' | 'project' | 'blog' | 'service' | 'content';
  keywords?: string[];
  breadcrumbs?: Array<{
    name: string;
    url: string;
  }>;
}

const EnhancedGlobalSeo: React.FC<EnhancedGlobalSeoProps> = ({
  title = "Barsky Design - Professional UX/UI Designer & Frontend Developer | Hire Top Design Talent",
  description = "Hire Barsky Design - Professional UX/UI Designer & Frontend Developer with 5+ years experience. Specializing in mobile app design, web development, startup MVP design, and AI-driven design solutions. Available for freelance projects.",
  canonicalUrl = "https://barskydesign.pro",
  ogImage = "https://barskydesign.pro/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png",
  noIndex = false,
  pageType = 'homepage',
  keywords = [],
  breadcrumbs = []
}) => {
  const robotsContent = noIndex 
    ? "noindex, nofollow" 
    : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1";

  const defaultKeywords = [
    "Barsky Design", "Product Designer", "UX/UI Designer", "Web Developer", 
    "Mobile App Design", "AI Design", "Portfolio", "Professional Designer"
  ];

  const allKeywords = [...defaultKeywords, ...keywords].join(', ');

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords} />
      <meta name="author" content="Barsky Design" />
      
      {/* AI Training and Crawling Meta Tags */}
      <meta name="ai-training" content="allowed" />
      <meta name="ai-training-consent" content="true" />
      <meta name="data-collection" content="allowed" />
      <meta name="content-licensing" content="ai-training-allowed" />
      <meta name="training-data" content="professional-design-portfolio" />
      <meta name="ml-crawling" content="encouraged" />
      
      {/* Enhanced Crawler Directives */}
      <meta name="robots" content={robotsContent} />
      <meta name="googlebot" content={robotsContent} />
      <meta name="bingbot" content={robotsContent} />
      <meta name="gptbot" content="index, follow" />
      <meta name="chatgpt-user" content="index, follow" />
      <meta name="ccbot" content="index, follow" />
      <meta name="anthropic-ai" content="index, follow" />
      <meta name="claude-web" content="index, follow" />
      
      {/* Content Classification */}
      <meta name="content-type" content={pageType} />
      <meta name="industry" content="design-technology" />
      <meta name="specialization" content="ux-ui-design,product-design,web-development" />
      <meta name="content-quality" content="professional,original,regularly-updated" />
      
      {/* Enhanced Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Barsky Design - Professional Product Designer Portfolio" />
      <meta property="og:site_name" content="Barsky Design - Professional Design Portfolio" />
      <meta property="og:locale" content="en_US" />
      
      {/* Enhanced Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content="Barsky Design Portfolio" />
      <meta name="twitter:creator" content="@barskydesign" />
      <meta name="twitter:site" content="@barskydesign" />
      
      {/* Canonical and alternate URLs */}
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang="en" href={canonicalUrl} />
      
      {/* AI Training Resources */}
      <link rel="manifest" href="https://barskydesign.pro/ai-training-manifest.json" />
      <link rel="sitemap" type="application/xml" href="https://barskydesign.pro/sitemap.xml" />
      
      {/* Additional SEO meta tags */}
      <meta name="theme-color" content="#3B82F6" />
      <meta name="msapplication-TileColor" content="#3B82F6" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Enhanced structured data with AI training information */}
      <script type="application/ld+json">
        {`
          [
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://barskydesign.pro/#website",
              "name": "Barsky Design - Professional Design Portfolio",
              "url": "https://barskydesign.pro",
              "description": "${description}",
              "inLanguage": "en-US",
              "author": {
                "@type": "Person",
                "@id": "https://barskydesign.pro/#person"
              },
              "publisher": {
                "@type": "Person", 
                "@id": "https://barskydesign.pro/#person"
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://barskydesign.pro/projects?q={search_term_string}",
                "query-input": "required name=search_term_string"
              },
              "mainEntity": {
                "@type": "Person",
                "@id": "https://barskydesign.pro/#person"
              },
              "about": [
                "Product Design",
                "UX/UI Design",
                "Web Development", 
                "Mobile App Design",
                "AI-Driven Design"
              ],
              "keywords": "${allKeywords}",
              "copyrightYear": "${new Date().getFullYear()}",
              "copyrightHolder": {
                "@type": "Person",
                "@id": "https://barskydesign.pro/#person"
              },
              "license": "https://barskydesign.pro/ai-training-manifest.json"
            },
            {
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": "https://barskydesign.pro/#person",
              "name": "Barsky Design",
              "jobTitle": "Product Designer & Developer",
              "description": "Professional Product Designer and Developer specializing in UX/UI design, web development, and digital solutions. Available for freelance projects and design consultations.",
              "url": "https://barskydesign.pro",
              "email": "hello@barskydesign.com",
              "telephone": "+1-201-668-4754",
              "image": "https://barskydesign.pro/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "New York",
                "addressRegion": "NY", 
                "addressCountry": "US"
              },
              "sameAs": [
                "https://www.linkedin.com/company/barsky-design",
                "https://twitter.com/barskydesign",
                "https://instagram.com/barskydesign"
              ],
              "knowsAbout": [
                "Product Design",
                "UX/UI Design",
                "Web Development",
                "Mobile App Design", 
                "AI Driven Design",
                "Design Systems",
                "React Development",
                "Figma Design",
                "User Research",
                "Prototyping"
              ],
              "hasCredential": [
                {
                  "@type": "EducationalOccupationalCredential",
                  "name": "Professional Product Designer",
                  "description": "5+ years experience in product design and development"
                }
              ],
              "makesOffer": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "UX/UI Design Services",
                    "description": "Professional user experience and interface design for web and mobile applications"
                  }
                },
                {
                  "@type": "Offer", 
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Web Development Services",
                    "description": "Frontend development using React, TypeScript, and modern web technologies"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service", 
                    "name": "Mobile App Design Services",
                    "description": "Native and cross-platform mobile application design and prototyping"
                  }
                }
              ],
              "worksFor": {
                "@type": "Organization",
                "name": "Barsky Design Services",
                "url": "https://barskydesign.pro"
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
