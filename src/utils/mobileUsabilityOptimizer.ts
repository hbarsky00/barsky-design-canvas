/**
 * Mobile Usability Optimizer - Comprehensive mobile optimization
 */

import { fixTouchTargetSpacing } from './touchTargetFixer';

const MOBILE_BREAKPOINT = 768;

/**
 * Enhanced mobile touch target optimization
 */
export const optimizeMobileTouchTargets = () => {
  if (typeof window === 'undefined') return;

  const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
  
  if (isMobile) {
    // Apply touch target fixes
    fixTouchTargetSpacing();
    
    // Additional mobile-specific optimizations
    const mobileCSS = `
      /* Enhanced mobile touch targets */
      .mobile-optimized {
        min-height: 48px !important;
        min-width: 48px !important;
        padding: 12px 16px !important;
        margin: 8px 4px !important;
      }
      
      /* Mobile navigation enhancements */
      .mobile-menu button,
      .mobile-menu a[href] {
        min-height: 56px !important;
        padding: 16px 24px !important;
        font-size: 16px !important;
        line-height: 1.5 !important;
      }
      
      /* Mobile form optimizations */
      input[type="text"],
      input[type="email"],
      input[type="tel"],
      textarea,
      select {
        min-height: 48px !important;
        padding: 12px 16px !important;
        font-size: 16px !important;
        line-height: 1.5 !important;
      }
      
      /* Mobile card interactions */
      .card,
      .glass-card,
      .glass-card-elevated {
        margin: 8px 0 !important;
        padding: 16px !important;
      }
      
      /* Mobile floating elements */
      .floating-element {
        margin: 12px 8px !important;
        padding: 16px !important;
      }
      
      /* Mobile share buttons */
      .share-button {
        min-width: 48px !important;
        min-height: 48px !important;
        padding: 12px !important;
      }
    `;
    
    const styleElement = document.createElement('style');
    styleElement.id = 'mobile-usability-fixes';
    styleElement.textContent = mobileCSS;
    
    // Remove existing mobile fixes
    const existing = document.getElementById('mobile-usability-fixes');
    if (existing) {
      existing.remove();
    }
    
    document.head.appendChild(styleElement);
    
    console.log('📱 Mobile touch targets optimized');
  }
};

/**
 * Enhanced responsive design fixes
 */
export const optimizeResponsiveDesign = () => {
  if (typeof window === 'undefined') return;

  // Ensure proper viewport handling
  const viewportMeta = document.querySelector('meta[name="viewport"]');
  if (viewportMeta) {
    viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes');
  }

  // Add responsive content sizing
  const responsiveCSS = `
    /* Responsive content sizing */
    .responsive-content {
      max-width: 100% !important;
      height: auto !important;
      box-sizing: border-box !important;
    }
    
    /* Responsive images */
    img {
      max-width: 100% !important;
      height: auto !important;
      display: block !important;
    }
    
    /* Responsive text */
    .responsive-text {
      font-size: clamp(16px, 4vw, 18px) !important;
      line-height: 1.6 !important;
    }
    
    /* Responsive containers */
    .container,
    .section-container {
      max-width: 100% !important;
      padding: 0 16px !important;
    }
    
    /* Mobile-first grid */
    .grid {
      grid-template-columns: 1fr !important;
    }
    
    @media (min-width: 768px) {
      .grid {
        grid-template-columns: repeat(2, 1fr) !important;
      }
    }
    
    @media (min-width: 1024px) {
      .grid {
        grid-template-columns: repeat(3, 1fr) !important;
      }
    }
  `;
  
  const styleElement = document.createElement('style');
  styleElement.id = 'responsive-design-fixes';
  styleElement.textContent = responsiveCSS;
  
  // Remove existing responsive fixes
  const existing = document.getElementById('responsive-design-fixes');
  if (existing) {
    existing.remove();
  }
  
  document.head.appendChild(styleElement);
  
  console.log('📐 Responsive design optimized');
};

/**
 * Monitor mobile usability metrics
 */
export const monitorMobileUsability = () => {
  if (typeof window === 'undefined') return;

  const checkTouchTargets = () => {
    const interactiveElements = document.querySelectorAll('button, a[href], [role="button"], input[type="submit"]');
    let improperTargets = 0;
    
    interactiveElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const minSize = 44;
      
      if (rect.width < minSize || rect.height < minSize) {
        improperTargets++;
      }
    });
    
    const usabilityScore = Math.max(0, 100 - (improperTargets / interactiveElements.length) * 100);
    
    console.log('📊 Mobile Usability Score:', Math.round(usabilityScore) + '%');
    
    if (usabilityScore < 90) {
      console.warn('⚠️ Mobile usability needs improvement');
    }
    
    return usabilityScore;
  };
  
  // Check usability after page load
  window.addEventListener('load', () => {
    setTimeout(checkTouchTargets, 1000);
  });
  
  // Check usability on resize
  window.addEventListener('resize', () => {
    setTimeout(checkTouchTargets, 300);
  });
};

/**
 * Initialize comprehensive mobile optimization
 */
export const initMobileOptimization = () => {
  if (typeof window === 'undefined') return;
  
  // Apply optimizations
  optimizeMobileTouchTargets();
  optimizeResponsiveDesign();
  monitorMobileUsability();
  
  // Re-apply on window resize
  window.addEventListener('resize', () => {
    setTimeout(() => {
      optimizeMobileTouchTargets();
      optimizeResponsiveDesign();
    }, 300);
  });
  
  console.log('🚀 Mobile optimization initialized');
};