import React from 'react';
import { useLocation } from 'react-router-dom';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface SEOBreadcrumbsProps {
  customBreadcrumbs?: BreadcrumbItem[];
  projectTitle?: string;
}

/**
 * SEO-optimized breadcrumb navigation with structured data
 */
export const SEOBreadcrumbs: React.FC<SEOBreadcrumbsProps> = ({
  customBreadcrumbs,
  projectTitle
}) => {
  const location = useLocation();
  
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (customBreadcrumbs) return customBreadcrumbs;
    
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { name: 'Home', url: 'https://barskydesign.pro' }
    ];
    
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      let name = segment.charAt(0).toUpperCase() + segment.slice(1);
      
      // Handle specific routes
      switch (segment) {
        case 'projects':
          name = 'Portfolio';
          break;
        case 'about':
          name = 'About';
          break;
        case 'contact':
          name = 'Contact';
          break;
        case 'blog':
          name = 'Blog';
          break;
        case 'services':
          name = 'Services';
          break;
        default:
          if (projectTitle && index === pathSegments.length - 1) {
            name = projectTitle;
          }
      }
      
      breadcrumbs.push({
        name,
        url: `https://barskydesign.pro${currentPath}`
      });
    });
    
    return breadcrumbs;
  };
  
  const breadcrumbs = generateBreadcrumbs();
  
  // Generate structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
  
  if (breadcrumbs.length <= 1) return null;
  
  return (
    <>
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      {/* Visual Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
          {breadcrumbs.map((item, index) => (
            <li key={item.url} className="flex items-center">
              {index > 0 && (
                <svg
                  className="w-4 h-4 mx-2 text-neutral-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              {index === breadcrumbs.length - 1 ? (
                <span className="font-medium text-neutral-900 dark:text-neutral-100">
                  {item.name}
                </span>
              ) : (
                <a
                  href={item.url}
                  className="hover:text-primary transition-colors duration-200"
                >
                  {item.name}
                </a>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};