import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BlogBreadcrumbsProps {
  currentTitle?: string;
  currentSlug?: string;
}

/**
 * SEO-optimized breadcrumb navigation for blog pages
 * Improves site structure and provides clear navigation hierarchy
 */
export const BlogBreadcrumbs: React.FC<BlogBreadcrumbsProps> = ({ 
  currentTitle, 
  currentSlug 
}) => {
  const isOnBlogPage = !currentSlug;
  
  return (
    <nav 
      aria-label="Breadcrumb navigation" 
      className="mb-6"
    >
      <ol className="flex items-center text-sm text-gray-600 space-x-2">
        {/* Home */}
        <li>
          <Link 
            to="/" 
            className="flex items-center hover:text-blue-600 transition-colors duration-200"
            title="Return to homepage"
          >
            <Home className="w-4 h-4 mr-1" />
            Home
          </Link>
        </li>
        
        <li>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </li>
        
        {/* Blog */}
        <li>
          {isOnBlogPage ? (
            <span className="font-medium text-gray-900">UX Design Blog</span>
          ) : (
            <Link 
              to="/blog" 
              className="hover:text-blue-600 transition-colors duration-200"
              title="View all blog posts"
            >
              UX Design Blog
            </Link>
          )}
        </li>
        
        {/* Current Post */}
        {currentTitle && currentSlug && (
          <>
            <li>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </li>
            <li>
              <span 
                className="font-medium text-gray-900 line-clamp-1"
                title={currentTitle}
              >
                {currentTitle.length > 50 
                  ? `${currentTitle.substring(0, 50)}...` 
                  : currentTitle
                }
              </span>
            </li>
          </>
        )}
      </ol>
      
      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://barskydesign.pro/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "UX Design Blog",
                "item": "https://barskydesign.pro/blog"
              },
              ...(currentTitle && currentSlug ? [{
                "@type": "ListItem",
                "position": 3,
                "name": currentTitle,
                "item": `https://barskydesign.pro/blog/${currentSlug}`
              }] : [])
            ]
          })
        }}
      />
    </nav>
  );
};

export default BlogBreadcrumbs;