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
  // DISABLED: Canonical tags are now handled by DynamicSeo component to prevent duplicates
  // This hook is kept for backwards compatibility but does nothing
  return;
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
    
    // Case Studies - map to SEO-friendly URLs
    '/case-study-herbalink': '/case-studies/herbalink-mobile-herbalist-ux-design',
    '/project/herbalink': '/case-studies/herbalink-mobile-herbalist-ux-design',
    '/case-study-splittime': '/case-studies/splittime-coparenting-app-design', 
    '/project/splittime': '/case-studies/splittime-coparenting-app-design',
    '/case-study-investor-loan': '/case-studies/investor-loan-portfolio-management',
    '/project/investor-loan-app': '/case-studies/investor-loan-portfolio-management',
    '/project/wholesale-distribution': '/case-studies/wholesale-distribution-ai-solution',
    
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
  
  // Handle project details - map to SEO-friendly URLs
  if (pathname.startsWith('/project/')) {
    const projectId = pathname.replace('/project/', '');
    const projectMapping: Record<string, string> = {
      'herbalink': 'herbalink-mobile-herbalist-ux-design',
      'splittime': 'splittime-coparenting-app-design',
      'investor-loan-app': 'investor-loan-portfolio-management',
      'wholesale-distribution': 'wholesale-distribution-ai-solution'
    };
    const seoFriendlyId = projectMapping[projectId] || projectId;
    return `${baseUrl}/case-studies/${seoFriendlyId}`;
  }
  
  // Handle case studies
  if (pathname.startsWith('/case-studies/')) {
    return `${baseUrl}${pathname}`;
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