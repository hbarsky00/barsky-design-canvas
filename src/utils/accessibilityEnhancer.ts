/**
 * Accessibility Enhancement System
 * Improves ARIA roles, button text, and keyboard navigation
 */

export interface AccessibilityConfig {
  enforceAriaLabels: boolean;
  enhanceKeyboardNavigation: boolean;
  validateButtonText: boolean;
  screenReaderOptimization: boolean;
}

export const accessibilityConfig: AccessibilityConfig = {
  enforceAriaLabels: true,
  enhanceKeyboardNavigation: true,
  validateButtonText: true,
  screenReaderOptimization: true
};

/**
 * Fix buttons without discernible text
 */
export const fixButtonText = (): void => {
  const buttons = document.querySelectorAll('button, [role="button"]');
  
  buttons.forEach((button) => {
    const element = button as HTMLElement;
    const hasText = element.textContent?.trim();
    const hasAriaLabel = element.getAttribute('aria-label');
    const hasAriaLabelledby = element.getAttribute('aria-labelledby');
    const hasTitle = element.getAttribute('title');
    
    // If button has no discernible text
    if (!hasText && !hasAriaLabel && !hasAriaLabelledby && !hasTitle) {
      // Check for icon context
      const icon = element.querySelector('svg, i, [class*="icon"]');
      if (icon) {
        // Generate appropriate label based on context
        const contextLabel = generateContextualLabel(element);
        element.setAttribute('aria-label', contextLabel);
        element.setAttribute('title', contextLabel);
      }
    }
  });
};

/**
 * Generate contextual label for buttons without text
 */
const generateContextualLabel = (element: HTMLElement): string => {
  // Check common button patterns
  const classes = element.className.toLowerCase();
  const parent = element.parentElement;
  
  if (classes.includes('close') || classes.includes('dismiss')) {
    return 'Close';
  }
  
  if (classes.includes('menu') || classes.includes('hamburger')) {
    return 'Open menu';
  }
  
  if (classes.includes('search')) {
    return 'Search';
  }
  
  if (classes.includes('submit')) {
    return 'Submit form';
  }
  
  if (classes.includes('edit')) {
    return 'Edit';
  }
  
  if (classes.includes('delete') || classes.includes('remove')) {
    return 'Delete';
  }
  
  if (classes.includes('expand') || classes.includes('collapse')) {
    return 'Toggle section';
  }
  
  if (classes.includes('share')) {
    return 'Share';
  }
  
  if (classes.includes('download')) {
    return 'Download';
  }
  
  if (classes.includes('play')) {
    return 'Play';
  }
  
  if (classes.includes('pause')) {
    return 'Pause';
  }
  
  // Check parent context
  if (parent) {
    const parentText = parent.textContent?.trim();
    if (parentText) {
      return `Action for ${parentText}`;
    }
  }
  
  return 'Button';
};

/**
 * Enhance ARIA roles for interactive elements
 */
export const enhanceAriaRoles = (): void => {
  // Navigation elements
  const navElements = document.querySelectorAll('nav:not([role])');
  navElements.forEach(nav => {
    nav.setAttribute('role', 'navigation');
    if (!nav.getAttribute('aria-label')) {
      nav.setAttribute('aria-label', 'Main navigation');
    }
  });
  
  // Main content areas
  const mainElements = document.querySelectorAll('main:not([role])');
  mainElements.forEach(main => {
    main.setAttribute('role', 'main');
  });
  
  // Complementary content
  const asideElements = document.querySelectorAll('aside:not([role])');
  asideElements.forEach(aside => {
    aside.setAttribute('role', 'complementary');
  });
  
  // Content info (footer)
  const footerElements = document.querySelectorAll('footer:not([role])');
  footerElements.forEach(footer => {
    footer.setAttribute('role', 'contentinfo');
  });
  
  // Banner (header)
  const headerElements = document.querySelectorAll('header:not([role])');
  headerElements.forEach(header => {
    header.setAttribute('role', 'banner');
  });
  
  // Lists that act as menus
  const menuLists = document.querySelectorAll('ul.menu, ol.menu, [class*="menu"] ul, [class*="menu"] ol');
  menuLists.forEach(list => {
    if (!list.getAttribute('role')) {
      list.setAttribute('role', 'menu');
      const items = list.querySelectorAll('li');
      items.forEach(item => {
        if (!item.getAttribute('role')) {
          item.setAttribute('role', 'menuitem');
        }
      });
    }
  });
  
  // Tabs
  const tabLists = document.querySelectorAll('[class*="tab"]');
  tabLists.forEach(tab => {
    if (tab.querySelector('[class*="tab-item"]')) {
      tab.setAttribute('role', 'tablist');
      const items = tab.querySelectorAll('[class*="tab-item"]');
      items.forEach((item, index) => {
        item.setAttribute('role', 'tab');
        item.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
        if (!item.getAttribute('aria-controls')) {
          item.setAttribute('aria-controls', `tabpanel-${index}`);
        }
      });
    }
  });
};

/**
 * Enhance keyboard navigation
 */
export const enhanceKeyboardNavigation = (): void => {
  // Add keyboard support to clickable elements
  const clickableElements = document.querySelectorAll('[onclick], .cursor-pointer, .clickable');
  clickableElements.forEach(element => {
    const el = element as HTMLElement;
    
    // Add tabindex if not already present
    if (!el.hasAttribute('tabindex')) {
      el.setAttribute('tabindex', '0');
    }
    
    // Add keyboard event handler
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        el.click();
      }
    });
  });
  
  // Improve focus management
  const focusableElements = document.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  focusableElements.forEach((element, index) => {
    const el = element as HTMLElement;
    
    // Add focus indicators
    el.addEventListener('focus', () => {
      el.classList.add('focus-visible');
    });
    
    el.addEventListener('blur', () => {
      el.classList.remove('focus-visible');
    });
    
    // Skip links functionality
    if (index === 0) {
      const skipLink = document.createElement('a');
      skipLink.href = '#main-content';
      skipLink.textContent = 'Skip to main content';
      skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:bg-white focus:text-black focus:p-2';
      document.body.insertBefore(skipLink, document.body.firstChild);
    }
  });
};

/**
 * Optimize for screen readers
 */
export const optimizeScreenReader = (): void => {
  // Add live regions for dynamic content
  const liveRegion = document.createElement('div');
  liveRegion.id = 'live-region';
  liveRegion.setAttribute('aria-live', 'polite');
  liveRegion.setAttribute('aria-atomic', 'true');
  liveRegion.className = 'sr-only';
  document.body.appendChild(liveRegion);
  
  // Announce page changes
  const announcePageChange = (message: string) => {
    liveRegion.textContent = message;
    setTimeout(() => {
      liveRegion.textContent = '';
    }, 1000);
  };
  
  // Listen for route changes
  let lastPath = window.location.pathname;
  const observer = new MutationObserver(() => {
    const currentPath = window.location.pathname;
    if (currentPath !== lastPath) {
      lastPath = currentPath;
      const pageTitle = document.title;
      announcePageChange(`Navigated to ${pageTitle}`);
    }
  });
  
  observer.observe(document.body, { childList: true, subtree: true });
  
  // Improve image alt text
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    if (!img.alt) {
      // Check if image is decorative
      const isDecorative = img.closest('[role="presentation"]') ||
                          img.classList.contains('decorative') ||
                          img.closest('.decorative');
      
      if (isDecorative) {
        img.alt = '';
        img.setAttribute('role', 'presentation');
      } else {
        // Generate alt text from context
        const figcaption = img.closest('figure')?.querySelector('figcaption');
        if (figcaption) {
          img.alt = figcaption.textContent || 'Image';
        } else {
          img.alt = 'Image';
        }
      }
    }
  });
  
  // Add heading hierarchy validation
  validateHeadingHierarchy();
};

/**
 * Validate heading hierarchy
 */
const validateHeadingHierarchy = (): void => {
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  let previousLevel = 0;
  
  headings.forEach((heading, index) => {
    const level = parseInt(heading.tagName.charAt(1));
    
    if (index === 0 && level !== 1) {
      console.warn('Page should start with h1 heading');
    }
    
    if (level > previousLevel + 1) {
      console.warn(`Heading level skip detected: ${heading.tagName} follows h${previousLevel}`);
    }
    
    previousLevel = level;
  });
};

/**
 * Initialize all accessibility enhancements
 */
export const initAccessibilityEnhancements = (): void => {
  if (accessibilityConfig.validateButtonText) {
    fixButtonText();
  }
  
  if (accessibilityConfig.enforceAriaLabels) {
    enhanceAriaRoles();
  }
  
  if (accessibilityConfig.enhanceKeyboardNavigation) {
    enhanceKeyboardNavigation();
  }
  
  if (accessibilityConfig.screenReaderOptimization) {
    optimizeScreenReader();
  }
  
  // Re-run enhancements when DOM changes
  const observer = new MutationObserver(() => {
    setTimeout(() => {
      if (accessibilityConfig.validateButtonText) {
        fixButtonText();
      }
      if (accessibilityConfig.enforceAriaLabels) {
        enhanceAriaRoles();
      }
    }, 100);
  });
  
  observer.observe(document.body, { childList: true, subtree: true });
  
  console.log('✅ Accessibility enhancements initialized');
};