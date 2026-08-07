/**
 * Touch Target Fixer - Actually fix spacing issues
 */

const MINIMUM_SIZE = 44; // 44px minimum touch target size
const MINIMUM_SPACING = 8; // 8px minimum spacing between targets

/**
 * Fix touch target spacing by adding CSS
 */
export const fixTouchTargetSpacing = () => {
const css = `
    /* Touch target fixes - ensure all interactive elements are 44px+ */
    button, a[href], [role="button"], [tabindex="0"], input[type="submit"], input[type="button"], 
    .clickable, .interactive, [onclick], .share-button {
      min-height: ${MINIMUM_SIZE}px !important;
      min-width: ${MINIMUM_SIZE}px !important;
      padding: 12px 16px !important;
      margin: 4px !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
    }
    
    /* Small icon buttons need special handling */
    .share-button, button.w-6, button.h-6, button[class*="w-8"], button[class*="h-8"] {
      min-width: ${MINIMUM_SIZE}px !important;
      min-height: ${MINIMUM_SIZE}px !important;
      padding: 8px !important;
    }
    
    /* Navigation elements - ensure proper spacing */
    nav button, nav a[href], header button, header a[href] {
      margin: 0 ${MINIMUM_SPACING}px !important;
      padding: 12px 16px !important;
      min-height: ${MINIMUM_SIZE}px !important;
    }
    
    /* Grid and flex layouts - responsive spacing */
    .grid {
      gap: 16px !important;
    }
    
    .flex {
      gap: ${MINIMUM_SPACING * 1.5}px !important;
    }
    
    /* Ensure proper spacing between interactive elements */
    .space-x-2 > * + *, .flex.gap-2 > * + * {
      margin-left: 16px !important;
    }
    
    .space-x-4 > * + *, .flex.gap-4 > * + * {
      margin-left: 24px !important;
    }
    
    /* Form elements spacing */
    form button, form input[type="submit"], form a[href] {
      margin: ${MINIMUM_SPACING}px 0 !important;
      min-height: ${MINIMUM_SIZE}px !important;
    }
    
    /* Card and gallery interaction elements */
    .card button, .card a[href], .gallery-image, .floating-element[onclick] {
      margin: ${MINIMUM_SPACING / 2}px !important;
      min-height: ${MINIMUM_SIZE}px !important;
    }
    
    /* Mobile-specific enhancements */
    @media (hover: none) and (pointer: coarse) {
      button, a[href], [role="button"], input[type="submit"], 
      .clickable, .interactive, [onclick] {
        min-height: 48px !important;
        min-width: 48px !important;
        padding: 14px 18px !important;
        margin: 6px !important;
      }
      
      /* Navigation on mobile */
      nav button, nav a[href] {
        padding: 16px 20px !important;
        margin: 0 6px !important;
      }
    }
  `;
  
  const styleElement = document.createElement('style');
  styleElement.id = 'touch-target-fixes';
  styleElement.textContent = css;
  
  // Remove existing fixes first
  const existing = document.getElementById('touch-target-fixes');
  if (existing) {
    existing.remove();
  }
  
  document.head.appendChild(styleElement);
};

/**
 * Initialize touch target fixes once
 */
export const initTouchTargetFixes = () => {
  // Apply fixes once page is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fixTouchTargetSpacing);
  } else {
    fixTouchTargetSpacing();
  }
};