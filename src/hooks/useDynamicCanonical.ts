import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface CanonicalTagProps {
  url?: string;
}

/**
 * Dynamic canonical tag system that sets page-specific canonical URLs
 * Fixes SEO issues by ensuring each page has its own canonical URL
 */
export const useDynamicCanonical = ({ url }: CanonicalTagProps = {}) => {
  const location = useLocation();
  
  useEffect(() => {
    // Remove any existing canonical tags to prevent duplicates
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.remove();
    }
    
    // Generate the canonical URL
    const baseUrl = 'https://barskydesign.pro';
    const canonicalUrl = url || `${baseUrl}${location.pathname}`;
    
    // Create and append new canonical tag
    const canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    canonicalLink.href = canonicalUrl;
    document.head.appendChild(canonicalLink);
    
    console.log(`✅ Canonical tag set for: ${canonicalUrl}`);
    
    // Cleanup function to remove canonical tag when component unmounts
    return () => {
      const linkToRemove = document.querySelector(`link[rel="canonical"][href="${canonicalUrl}"]`);
      if (linkToRemove) {
        linkToRemove.remove();
      }
    };
  }, [location.pathname, url]);
};

/**
 * Generate canonical URL based on route patterns
 */
export const getCanonicalUrl = (pathname: string): string => {
  const baseUrl = 'https://barskydesign.pro';
  
  // Define route mappings for clean URLs
  const routeMappings: Record<string, string> = {
    '/': '/',
    '/about': '/about',
    '/services': '/services',
    '/projects': '/portfolio', // Map to portfolio for SEO
    '/contact': '/contact',
    '/blog': '/blog',
    
    // Case Studies - map to clean URLs
    '/case-study-herbalink': '/case-studies/herbalink',
    '/project/herbalink': '/case-studies/herbalink',
    '/case-study-splittime': '/case-studies/splittime', 
    '/project/splittime': '/case-studies/splittime',
    '/case-study-investor-loan': '/case-studies/investor-loan-app',
    '/project/investor-loan-app': '/case-studies/investor-loan-app',
    '/project/wholesale-distribution': '/case-studies/wholesale-distribution',
    
    // Service pages
    '/design-services/ux-ui-design': '/services/ux-ui-design',
    '/design-services/web-development': '/services/web-development',
    '/design-services/mobile-app-design': '/services/mobile-app-design',
    
    // Additional pages
    '/services/mvp-validation': '/services/mvp-validation',
    '/services/conversion-audit': '/services/conversion-audit',
    '/services/ai-redesign': '/services/ai-redesign',
    '/free-audit': '/free-audit',
    '/get-started': '/get-started'
  };
  
  // Check for direct mapping first
  const mappedPath = routeMappings[pathname];
  if (mappedPath) {
    return `${baseUrl}${mappedPath}`;
  }
  
  // Handle blog posts with slugs
  if (pathname.startsWith('/blog/')) {
    return `${baseUrl}${pathname}`;
  }
  
  // Handle project details
  if (pathname.startsWith('/project/')) {
    const projectId = pathname.replace('/project/', '');
    return `${baseUrl}/case-studies/${projectId}`;
  }
  
  // Default to current pathname
  return `${baseUrl}${pathname}`;
};

/**
 * Component to inject canonical tag into document head
 */
export const CanonicalTag: React.FC<CanonicalTagProps> = ({ url }) => {
  useDynamicCanonical({ url });
  return null; // This component doesn't render anything
};