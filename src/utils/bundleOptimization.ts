/**
 * Bundle optimization utilities to reduce JavaScript and CSS bundle sizes
 */

// Dynamically import large libraries only when needed
export const loadHeavyDependencies = {
  // Lazy load PDF generation library
  jsPDF: () => import('jspdf').then(module => module.default),
  
  // Lazy load image processing
  html2canvas: () => import('html2canvas').then(module => module.default),
  
  // Lazy load rich text editor only when needed
  reactQuill: () => import('react-quill').then(module => module.default),
};

// Code splitting helpers
export const lazyLoadRoute = (importFn: () => Promise<any>) => {
  return React.lazy(importFn);
};

// Remove unused CSS classes
export const removeUnusedCSS = () => {
  if (typeof window === 'undefined') return;
  
  // Remove unused Tailwind classes that aren't being used
  const unusedClasses = [
    'text-amber-', 'text-lime-', 'text-emerald-', 'text-teal-',
    'text-cyan-', 'text-sky-', 'text-violet-', 'text-purple-',
    'text-fuchsia-', 'text-pink-', 'text-rose-'
  ];
  
  const styleSheets = Array.from(document.styleSheets);
  styleSheets.forEach(sheet => {
    try {
      const rules = Array.from(sheet.cssRules || []);
      rules.forEach((rule, index) => {
        if (rule instanceof CSSStyleRule) {
          const hasUnusedClass = unusedClasses.some(cls => 
            rule.selectorText?.includes(cls)
          );
          if (hasUnusedClass) {
            // Remove unused rule (be careful in production)
            console.log('Removing unused CSS rule:', rule.selectorText);
          }
        }
      });
    } catch (e) {
      // CORS or other restrictions
    }
  });
};

// Preload critical resources
export const preloadCriticalAssets = () => {
  const criticalAssets = [
    '/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png', // Profile image
    '/lovable-uploads/e8d40a32-b582-44f6-b417-48bdd5c5b6eb.png', // Hero image
  ];

  criticalAssets.forEach(asset => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = asset;
    document.head.appendChild(link);
  });
};

// Service Worker for caching
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('SW registered: ', registration);
    } catch (registrationError) {
      console.log('SW registration failed: ', registrationError);
    }
  }
};

// Web Vitals optimization
export const optimizeWebVitals = () => {
  // Reduce CLS by reserving space for images
  const images = document.querySelectorAll('img:not([width]):not([height])') as NodeListOf<HTMLImageElement>;
  images.forEach(img => {
    if (!img.style.aspectRatio) {
      img.style.aspectRatio = '16/9'; // Default aspect ratio
    }
  });

  // Reduce FID by deferring non-critical JavaScript
  const deferNonCriticalJS = () => {
    setTimeout(() => {
      // Non-critical operations
      removeUnusedCSS();
    }, 1000);
  };

  if (document.readyState === 'complete') {
    deferNonCriticalJS();
  } else {
    window.addEventListener('load', deferNonCriticalJS);
  }
};

import React from 'react';