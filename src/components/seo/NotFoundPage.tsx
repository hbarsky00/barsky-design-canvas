import React from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

interface NotFoundPageProps {
  customTitle?: string;
  customDescription?: string;
  showSuggestions?: boolean;
}

/**
 * SEO-optimized 404 error page component
 */
export const NotFoundPage: React.FC<NotFoundPageProps> = ({
  customTitle = "Page Not Found - Hiram Barsky | Product Designer & Gen AI Developer",
  customDescription = "The page you're looking for doesn't exist. Explore my portfolio of product design and AI development work, or contact me for custom solutions.",
  showSuggestions = true
}) => {
  const location = useLocation();
  const currentUrl = `https://barskydesign.pro${location.pathname}`;
  
  const suggestions = [
    { title: "Portfolio", url: "/projects", description: "View my latest product design and development work" },
    { title: "About Me", url: "/about", description: "Learn about my design process and experience" },
    { title: "Services", url: "/services", description: "Discover my UX design and AI development services" },
    { title: "Contact", url: "/contact", description: "Get in touch for your next project" },
    { title: "Blog", url: "/blog", description: "Read insights on design and technology" }
  ];
  
  // Log 404 for analytics (in real implementation, you'd send this to your analytics service)
  React.useEffect(() => {
    console.warn(`404 Error: Page not found - ${currentUrl}`);
    
    // In a real application, you would send this to your analytics service
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_not_found', {
        page_location: currentUrl,
        page_title: customTitle
      });
    }
  }, [currentUrl, customTitle]);
  
  return (
    <>
      <Helmet>
        {/* SEO Meta Tags for 404 */}
        <title>{customTitle}</title>
        <meta name="description" content={customDescription} />
        <meta name="robots" content="noindex,follow" />
        
        {/* Open Graph for 404 */}
        <meta property="og:title" content={customTitle} />
        <meta property="og:description" content={customDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:image" content="https://barskydesign.pro/lovable-uploads/e8d40a32-b582-44f6-b417-48bdd5c5b6eb.png" />
        
        {/* Twitter Card for 404 */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={customTitle} />
        <meta name="twitter:description" content={customDescription} />
        
        {/* Canonical for 404 */}
        <link rel="canonical" href="https://barskydesign.pro/404" />
        
        {/* HTTP Status for crawlers */}
        <meta httpEquiv="status" content="404" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col justify-center items-center px-4 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">
        <div className="max-w-4xl mx-auto text-center">
          {/* 404 Hero Section */}
          <div className="mb-12">
            <h1 className="text-8xl md:text-9xl font-bold text-primary mb-6">
              404
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Page Not Found
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-8">
              The page you're looking for doesn't exist or has been moved. 
              Don't worry, let me help you find what you need.
            </p>
            
            {/* Current URL display for debugging */}
            <div className="bg-neutral-200 dark:bg-neutral-700 rounded-lg p-4 mb-8 text-sm font-mono">
              <span className="text-neutral-500 dark:text-neutral-400">Requested URL:</span>
              <br />
              <span className="text-neutral-900 dark:text-neutral-100">{currentUrl}</span>
            </div>
          </div>
          
          {/* Navigation Suggestions */}
          {showSuggestions && (
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-8">
                Explore My Work
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {suggestions.map((suggestion) => (
                  <a
                    key={suggestion.url}
                    href={suggestion.url}
                    className="group bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-neutral-200 dark:border-neutral-700 hover:border-primary/20"
                  >
                    <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2 group-hover:text-primary transition-colors">
                      {suggestion.title}
                    </h4>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                      {suggestion.description}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          )}
          
          {/* Contact CTA */}
          <div className="bg-primary/5 dark:bg-primary/10 rounded-2xl p-8 border border-primary/20">
            <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Looking for something specific?
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              I'm here to help you find what you need or discuss your next project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                Contact Me
              </a>
              <a
                href="/"
                className="bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 px-8 py-3 rounded-lg border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors font-medium"
              >
                Go Home
              </a>
            </div>
          </div>
        </div>
        
        {/* SEO-friendly footer for 404 */}
        <footer className="mt-16 text-center text-sm text-neutral-500 dark:text-neutral-400">
          <p>
            © 2024 Hiram Barsky - Product Designer & Gen AI Developer | 
            <a href="/sitemap.xml" className="hover:text-primary transition-colors ml-1">
              Sitemap
            </a>
          </p>
        </footer>
      </div>
      
      {/* Structured data for 404 page */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Page Not Found",
          "description": customDescription,
          "url": currentUrl,
          "mainEntity": {
            "@type": "Thing",
            "name": "404 Error",
            "description": "The requested page could not be found"
          },
          "isPartOf": {
            "@type": "WebSite",
            "name": "Barsky Design - Product Designer & Gen AI Developer",
            "url": "https://barskydesign.pro"
          },
          "breadcrumb": {
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
                "name": "404 Error",
                "item": currentUrl
              }
            ]
          }
        })}
      </script>
    </>
  );
};