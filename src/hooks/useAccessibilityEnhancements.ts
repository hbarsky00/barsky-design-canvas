import { useEffect } from 'react';

/**
 * Hook to enhance accessibility across the application
 */
export const useAccessibilityEnhancements = () => {
  useEffect(() => {
    // Add aria-labels to buttons without accessible names
    const enhanceButtons = () => {
      const buttons = document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])');
      buttons.forEach(button => {
        const buttonElement = button as HTMLButtonElement;
        const textContent = buttonElement.textContent?.trim();
        
        if (!textContent) {
          // Check for icon-only buttons
          const icon = buttonElement.querySelector('svg, [class*="icon"]');
          if (icon) {
            const iconClass = icon.className;
            if (iconClass.includes('menu')) {
              buttonElement.setAttribute('aria-label', 'Open navigation menu');
            } else if (iconClass.includes('close') || iconClass.includes('x')) {
              buttonElement.setAttribute('aria-label', 'Close');
            } else if (iconClass.includes('search')) {
              buttonElement.setAttribute('aria-label', 'Search');
            } else {
              buttonElement.setAttribute('aria-label', 'Action button');
            }
          }
        }
      });
    };

    // Add descriptive text to links without discernible names
    const enhanceLinks = () => {
      const links = document.querySelectorAll('a:not([aria-label]):not([aria-labelledby])');
      links.forEach(link => {
        const linkElement = link as HTMLAnchorElement;
        const textContent = linkElement.textContent?.trim();
        const href = linkElement.href;
        
        if (!textContent || textContent.length < 3) {
          // Check if it's an icon-only link
          const icon = linkElement.querySelector('svg, [class*="icon"]');
          if (icon && href) {
            if (href.includes('linkedin')) {
              linkElement.setAttribute('aria-label', 'Visit LinkedIn profile (opens in new tab)');
            } else if (href.includes('github')) {
              linkElement.setAttribute('aria-label', 'View GitHub repository (opens in new tab)');
            } else if (href.includes('mailto')) {
              linkElement.setAttribute('aria-label', 'Send email');
            } else if (href.includes('tel')) {
              linkElement.setAttribute('aria-label', 'Call phone number');
            } else {
              linkElement.setAttribute('aria-label', `Visit ${new URL(href).hostname}`);
            }
          }
        }
      });
    };

    // Check color contrast ratios and enhance if needed
    const enhanceColorContrast = () => {
      // Add high contrast class for better accessibility
      const lowContrastElements = document.querySelectorAll('.text-gray-400, .text-gray-500, .text-slate-400');
      lowContrastElements.forEach(element => {
        element.classList.add('text-gray-600');
        element.classList.remove('text-gray-400', 'text-gray-500', 'text-slate-400');
      });
    };

    // Add skip links for keyboard navigation
    const addSkipLinks = () => {
      if (!document.querySelector('.skip-link')) {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-link sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:bg-blue-600 focus:text-white focus:px-4 focus:py-2';
        skipLink.textContent = 'Skip to main content';
        document.body.insertBefore(skipLink, document.body.firstChild);
      }
    };

    // Apply enhancements
    enhanceButtons();
    enhanceLinks();
    enhanceColorContrast();
    addSkipLinks();

    // Re-run enhancements when DOM changes
    const observer = new MutationObserver(() => {
      setTimeout(() => {
        enhanceButtons();
        enhanceLinks();
      }, 100);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      observer.disconnect();
    };
  }, []);
};