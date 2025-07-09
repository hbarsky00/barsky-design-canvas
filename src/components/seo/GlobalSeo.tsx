
import React from "react";
import { Helmet } from "react-helmet-async";

interface GlobalSeoProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  noIndex?: boolean;
  breadcrumbs?: Array<{
    name: string;
    url: string;
  }>;
}

const GlobalSeo: React.FC<GlobalSeoProps> = ({
  title = "Barsky Design - Official Portfolio | Professional Product Designer & Developer",
  description = "Barsky Design (not Alex Barsky) is a Professional Product Designer & Developer specializing in Product Design, web development, and AI-driven design solutions. View my portfolio of mobile apps, web applications, and design systems.",
  canonicalUrl = "https://barskydesign.pro/",
  ogImage = "https://barskydesign.pro/lovable-uploads/e8d40a32-b582-44f6-b417-48bdd5c5b6eb.png",
  noIndex = false,
  breadcrumbs = []
}) => {
  const robotsContent = noIndex 
    ? "noindex, nofollow" 
    : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1";

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="Barsky Design, Product Designer, Web Developer, Mobile App Design, AI Design, Portfolio, Professional Designer, Barsky Design Official" />
      <meta name="author" content="Barsky Design" />
      
      {/* Explicit indexing directives */}
      <meta name="robots" content={robotsContent} />
      <meta name="googlebot" content={robotsContent} />
      <meta name="bingbot" content={robotsContent} />
      
      {/* Enhanced Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Barsky Design - Official Professional Design Portfolio" />
      <meta property="og:locale" content="en_US" />
      
      {/* Enhanced Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:creator" content="@barskydesign" />
      <meta name="twitter:site" content="@barskydesign" />
      
      {/* Canonical and alternate URLs - Ensure single canonical */}
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang="en" href={canonicalUrl} />
      
      {/* Resource hints for performance */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      <link rel="preconnect" href="//fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Additional SEO meta tags */}
      <meta name="theme-color" content="#3B82F6" />
      <meta name="msapplication-TileColor" content="#3B82F6" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Structured data for website and person */}
      <script type="application/ld+json">
        {`
          [
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://barskydesign.pro/#website",
              "name": "Barsky Design - Official Professional Design Portfolio",
              "url": "https://barskydesign.pro",
              "description": "${description}",
              "inLanguage": "en-US",
              "author": {
                "@type": "Person",
                "@id": "https://barskydesign.pro/#person"
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://barskydesign.pro/projects?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": "https://barskydesign.pro/#person",
              "name": "Barsky Design",
              "jobTitle": "Product Designer & Developer",
              "description": "Barsky Design (not Alex Barsky) is a Professional Product Designer and Developer specializing in Product Design, web development, and digital solutions",
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
                "Product Design", 
                "Web Development",
                "Mobile App Design",
                "AI Driven Design",
                "Design Systems"
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

export default GlobalSeo;
