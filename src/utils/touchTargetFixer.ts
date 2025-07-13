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
    button, a, [role="button"], [tabindex="0"], input[type="submit"], input[type="button"] {
      min-height: ${MINIMUM_SIZE}px !important;
      min-width: ${MINIMUM_SIZE}px !important;
      padding: 12px 16px !important;
    }
    
    /* Specific spacing fixes for common problematic areas */
    .space-x-2 > * + *, .flex.gap-2 > * + * {
      margin-left: 16px !important;
    }
    
    .space-x-4 > * + *, .flex.gap-4 > * + * {
      margin-left: 24px !important;
    }
    
    /* Navigation and header spacing */
    nav button, nav a, header button, header a {
      margin: 0 8px !important;
      padding: 12px 16px !important;
    }
    
    /* Grid and flex layouts */
    .grid {
      gap: 16px !important;
    }
    
    .flex {
      gap: 12px !important;
    }
    
    /* Form elements */
    form button, form input[type="submit"] {
      margin: 8px 0 !important;
    }
    
    /* Card actions */
    .card button, .card a {
      margin: 4px !important;
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