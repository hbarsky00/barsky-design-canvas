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
    /* Touch target fixes */
    button, a, [role="button"], [tabindex="0"] {
      min-height: ${MINIMUM_SIZE}px !important;
      min-width: ${MINIMUM_SIZE}px !important;
    }
    
    /* Add spacing between adjacent interactive elements */
    button + button,
    a + a,
    button + a,
    a + button {
      margin-left: ${MINIMUM_SPACING}px !important;
    }
    
    /* Flex containers with interactive children */
    .flex button:not(:last-child),
    .flex a:not(:last-child) {
      margin-right: ${MINIMUM_SPACING}px !important;
    }
    
    /* Navigation spacing */
    nav a:not(:last-child) {
      margin-right: ${MINIMUM_SPACING}px !important;
    }
    
    /* Form element spacing */
    .space-x-2 > *:not(:last-child) {
      margin-right: ${MINIMUM_SPACING}px !important;
    }
    
    .space-x-4 > *:not(:last-child) {
      margin-right: 16px !important;
    }
    
    /* Grid gaps */
    .grid {
      gap: ${MINIMUM_SPACING}px !important;
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
  console.log('✅ Touch target spacing fixed');
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