import { useEffect } from 'react';

/**
 * Comprehensive accessibility validation and enhancement
 */
export const useAccessibilityValidator = () => {
  useEffect(() => {
    const validateAndEnhance = () => {
      // Ensure all buttons have accessible names
      enhanceButtonAccessibility();
      
      // Validate ARIA roles and relationships
      validateAriaStructure();
      
      // Enhance touch targets for mobile
      enhanceTouchTargets();
      
      // Validate content structure
      validateContentStructure();
      
      console.log('♿ Accessibility validation complete');
    };

    // Run validation after DOM is fully loaded
    setTimeout(validateAndEnhance, 1000);
  }, []);
};

const enhanceButtonAccessibility = () => {
  const buttons = document.querySelectorAll('button, [role="button"]');
  
  buttons.forEach((button) => {
    const buttonElement = button as HTMLElement;
    
    // Check if button has accessible name
    const hasAccessibleName = 
      buttonElement.getAttribute('aria-label') ||
      buttonElement.getAttribute('aria-labelledby') ||
      buttonElement.textContent?.trim() ||
      buttonElement.querySelector('[aria-label]');
    
    if (!hasAccessibleName) {
      // Try to infer purpose from context
      const iconElement = buttonElement.querySelector('svg, [class*="icon"]');
      if (iconElement) {
        const classList = Array.from(iconElement.classList).join(' ');
        let label = 'Action button';
        
        if (classList.includes('menu') || classList.includes('hamburger')) {
          label = 'Open navigation menu';
        } else if (classList.includes('close') || classList.includes('x')) {
          label = 'Close';
        } else if (classList.includes('search')) {
          label = 'Search';
        } else if (classList.includes('share')) {
          label = 'Share';
        } else if (classList.includes('download')) {
          label = 'Download';
        } else if (classList.includes('play')) {
          label = 'Play video';
        } else if (classList.includes('expand') || classList.includes('fullscreen')) {
          label = 'View full screen';
        }
        
        buttonElement.setAttribute('aria-label', label);
      }
    }
    
    // Ensure interactive elements are keyboard accessible
    if (!buttonElement.hasAttribute('tabindex') && buttonElement.tagName !== 'BUTTON') {
      buttonElement.setAttribute('tabindex', '0');
    }
  });
};

const validateAriaStructure = () => {
  // Check for proper heading hierarchy
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  let previousLevel = 0;
  
  headings.forEach((heading) => {
    const level = parseInt(heading.tagName.charAt(1));
    if (level > previousLevel + 1) {
      console.warn('⚠️ Heading hierarchy skip detected:', heading);
    }
    previousLevel = level;
  });
  
  // Validate list structures
  const lists = document.querySelectorAll('[role="list"]');
  lists.forEach((list) => {
    const listItems = list.querySelectorAll('[role="listitem"], li');
    if (listItems.length === 0) {
      console.warn('⚠️ Empty list detected:', list);
    }
  });
  
  // Check navigation landmarks
  const navElements = document.querySelectorAll('nav, [role="navigation"]');
  navElements.forEach((nav) => {
    if (!nav.getAttribute('aria-label') && !nav.getAttribute('aria-labelledby')) {
      const navElement = nav as HTMLElement;
      navElement.setAttribute('aria-label', 'Navigation');
    }
  });
};

const enhanceTouchTargets = () => {
  const interactiveElements = document.querySelectorAll(
    'button, a, [role="button"], [tabindex="0"], input, textarea, select'
  );
  
  interactiveElements.forEach((element) => {
    const el = element as HTMLElement;
    const rect = el.getBoundingClientRect();
    
    // Check if touch target is too small (minimum 44x44px)
    if (rect.width < 44 || rect.height < 44) {
      if (window.innerWidth <= 768) { // Mobile only
        el.style.minHeight = '44px';
        el.style.minWidth = '44px';
        el.style.display = el.style.display || 'inline-flex';
        el.style.alignItems = 'center';
        el.style.justifyContent = 'center';
      }
    }
  });
};

const validateContentStructure = () => {
  // Check for proper main landmark
  const mainElements = document.querySelectorAll('main, [role="main"]');
  if (mainElements.length === 0) {
    console.warn('⚠️ No main landmark found');
  } else if (mainElements.length > 1) {
    console.warn('⚠️ Multiple main landmarks found');
  }
  
  // Check for skip links
  const skipLinks = document.querySelectorAll('a[href="#main-content"], a[href="#main"]');
  if (skipLinks.length === 0) {
    console.warn('⚠️ No skip links found');
  }
  
  // Validate image alt text
  const images = document.querySelectorAll('img');
  images.forEach((img) => {
    if (!img.hasAttribute('alt')) {
      console.warn('⚠️ Image missing alt attribute:', img.src);
      img.setAttribute('alt', ''); // Decorative image fallback
    }
  });
  
  // Check color contrast (basic validation)
  const textElements = document.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6');
  textElements.forEach((element) => {
    const el = element as HTMLElement;
    const computedStyle = window.getComputedStyle(el);
    const color = computedStyle.color;
    const backgroundColor = computedStyle.backgroundColor;
    
    // Basic contrast warning for pure white text on white background
    if (color === 'rgb(255, 255, 255)' && backgroundColor === 'rgba(0, 0, 0, 0)') {
      console.warn('⚠️ Potential contrast issue:', element);
    }
  });
};