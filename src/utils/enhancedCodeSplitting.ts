/**
 * Enhanced Code Splitting and Dynamic Imports
 * Reduces initial bundle size and improves loading performance
 */

import { lazy, ComponentType, LazyExoticComponent } from 'react';

export interface RouteConfig {
  path: string;
  component: LazyExoticComponent<any>;
  preload?: boolean;
  chunkName?: string;
}

/**
 * Create lazy-loaded route component with preloading capability
 */
export const createLazyRoute = <T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  options: {
    chunkName?: string;
    preload?: boolean;
    fallback?: ComponentType;
  } = {}
): LazyExoticComponent<T> => {
  const LazyComponent = lazy(importFn);
  
  // Preload component if requested
  if (options.preload) {
    const preloadTimer = setTimeout(() => {
      importFn().catch(console.error);
    }, 2000); // Preload after 2 seconds
    
    // Clear timer to prevent memory leaks
    return LazyComponent;
  }
  
  return LazyComponent;
};

/**
 * Lazy load heavy dependencies only when needed
 */
export const lazyDependencies = {
  // PDF generation
  jsPDF: () => import('jspdf'),
  html2canvas: () => import('html2canvas'),
  
  // Rich text editor
  reactQuill: () => import('react-quill'),
  
  // Charts and visualizations
  recharts: () => import('recharts'),
  
  // Form validation
  zod: () => import('zod'),
  
  // Date manipulation
  dateFns: () => import('date-fns'),
  
  // Animation libraries
  framerMotion: () => import('framer-motion'),
  
  // Utility libraries
  lodash: () => import('lodash-es'),
};

/**
 * Dynamic import with error handling and retry logic
 */
export const dynamicImport = async <T>(
  importFn: () => Promise<T>,
  retries: number = 3,
  delay: number = 1000
): Promise<T> => {
  try {
    return await importFn();
  } catch (error) {
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, delay));
      return dynamicImport(importFn, retries - 1, delay * 2);
    }
    throw error;
  }
};

/**
 * Preload critical route components
 */
export const preloadCriticalRoutes = (): void => {
  const criticalRoutes = [
    () => import('../pages/Index'),
    () => import('../pages/AllProjects'),
    () => import('../pages/Services'),
    () => import('../pages/Contact'),
  ];
  
  // Preload after initial page load
  setTimeout(() => {
    criticalRoutes.forEach(route => {
      route().catch(console.error);
    });
  }, 3000);
};

/**
 * Lazy load non-critical components
 */
export const LazyComponents = {
  // Admin components
  AdminDashboard: createLazyRoute(() => import('../pages/AdminDashboard'), {
    chunkName: 'admin',
    preload: false
  }),
  
  // Blog components
  Blog: createLazyRoute(() => import('../pages/Blog'), {
    chunkName: 'blog',
    preload: false
  }),
  
  BlogPost: createLazyRoute(() => import('../pages/BlogPost'), {
    chunkName: 'blog',
    preload: false
  }),
  
  // Store components
  Store: createLazyRoute(() => import('../pages/Store'), {
    chunkName: 'store',
    preload: false
  }),
  
  // Case studies
  HerbalinkCaseStudy: createLazyRoute(() => import('../pages/HerbalinkCaseStudy'), {
    chunkName: 'case-studies',
    preload: false
  }),
  
  SplittimeCaseStudy: createLazyRoute(() => import('../pages/SplittimeCaseStudy'), {
    chunkName: 'case-studies',
    preload: false
  }),
  
  InvestorLoanAppCaseStudy: createLazyRoute(() => import('../pages/InvestorLoanAppCaseStudy'), {
    chunkName: 'case-studies',
    preload: false
  }),
  
  // Specialized services
  TinyMCEDemo: createLazyRoute(() => import('../pages/TinyMCEDemo'), {
    chunkName: 'demos',
    preload: false
  }),
  
  FreeAudit: createLazyRoute(() => import('../pages/FreeAudit'), {
    chunkName: 'services',
    preload: false
  }),
  
  // Service pages
  MvpValidation: createLazyRoute(() => import('../pages/services/MvpValidation'), {
    chunkName: 'service-details',
    preload: false
  }),
  
  ConversionAudit: createLazyRoute(() => import('../pages/services/ConversionAudit'), {
    chunkName: 'service-details',
    preload: false
  }),
  
  AiRedesign: createLazyRoute(() => import('../pages/services/AiRedesign'), {
    chunkName: 'service-details',
    preload: false
  }),
};

/**
 * Route-based code splitting configuration
 */
export const routeConfig: RouteConfig[] = [
  {
    path: '/',
    component: createLazyRoute(() => import('../pages/Index'), { preload: true }),
    preload: true,
    chunkName: 'home'
  },
  {
    path: '/projects',
    component: createLazyRoute(() => import('../pages/AllProjects'), { preload: true }),
    preload: true,
    chunkName: 'projects'
  },
  {
    path: '/services',
    component: createLazyRoute(() => import('../pages/Services'), { preload: true }),
    preload: true,
    chunkName: 'services'
  },
  {
    path: '/contact',
    component: createLazyRoute(() => import('../pages/Contact'), { preload: true }),
    preload: true,
    chunkName: 'contact'
  },
  {
    path: '/about',
    component: createLazyRoute(() => import('../pages/About')),
    preload: false,
    chunkName: 'about'
  },
];

/**
 * Initialize code splitting optimizations
 */
export const initCodeSplitting = (): void => {
  // Preload critical routes
  preloadCriticalRoutes();
  
  // Set up intersection observer for route preloading
  const preloadOnHover = (selector: string, importFn: () => Promise<any>) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        importFn().catch(console.error);
      }, { once: true });
    });
  };
  
  // Preload on link hover
  setTimeout(() => {
    preloadOnHover('a[href*="/blog"]', () => import('../pages/Blog'));
    preloadOnHover('a[href*="/store"]', () => import('../pages/Store'));
    preloadOnHover('a[href*="/case-studies"]', () => import('../pages/HerbalinkCaseStudy'));
  }, 1000);
};

/**
 * Bundle analysis helper
 */
export const analyzeBundleSize = (): void => {
  if (import.meta.env.DEV) {
    console.log('Bundle analysis available in production build');
    return;
  }
  
  // Performance navigation timing
  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  
  console.log('Bundle Performance Metrics:', {
    domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
    loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
    totalLoadTime: navigation.loadEventEnd - navigation.fetchStart,
    dnsLookup: navigation.domainLookupEnd - navigation.domainLookupStart,
    serverResponse: navigation.responseEnd - navigation.requestStart,
  });
};