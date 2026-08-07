/**
 * Accessibility Fixer - Real ARIA and a11y improvements
 */

interface AccessibilityIssue {
  element: Element;
  issue: string;
  severity: 'error' | 'warning' | 'info';
  fix?: () => void;
}

/**
 * Audit and fix accessibility issues
 */
export const auditAndFixAccessibility = (): AccessibilityIssue[] => {
  const issues: AccessibilityIssue[] = [];

  // Fix missing alt text
  document.querySelectorAll('img:not([alt])').forEach((img) => {
    const issue: AccessibilityIssue = {
      element: img,
      issue: 'Image missing alt attribute',
      severity: 'error',
      fix: () => {
        const imgElement = img as HTMLImageElement;
        // Try to derive alt text from context
        const caption = img.closest('figure')?.querySelector('figcaption')?.textContent;
        const title = imgElement.title;
        const fileName = imgElement.src.split('/').pop()?.split('.')[0];
        
        imgElement.alt = caption || title || `Image: ${fileName}` || 'Image';
      }
    };
    issues.push(issue);
    issue.fix?.();
  });

  // Fix empty alt text on decorative images
  document.querySelectorAll('img[alt=""]').forEach((img) => {
    const imgElement = img as HTMLImageElement;
    if (!imgElement.hasAttribute('role')) {
      imgElement.setAttribute('role', 'presentation');
      imgElement.setAttribute('aria-hidden', 'true');
    }
  });

  // Fix missing form labels
  document.querySelectorAll('input:not([aria-label]):not([aria-labelledby])').forEach((input) => {
    const inputElement = input as HTMLInputElement;
    const label = document.querySelector(`label[for="${inputElement.id}"]`);
    
    if (!label && inputElement.id) {
      const issue: AccessibilityIssue = {
        element: input,
        issue: 'Form input missing label',
        severity: 'error',
        fix: () => {
          // Add aria-label based on placeholder or name
          const placeholder = inputElement.placeholder;
          const name = inputElement.name;
          inputElement.setAttribute('aria-label', placeholder || name || 'Input field');
        }
      };
      issues.push(issue);
      issue.fix?.();
    }
  });

  // Fix missing button text
  document.querySelectorAll('button:empty, button:not([aria-label]):not([aria-labelledby])').forEach((button) => {
    const buttonElement = button as HTMLButtonElement;
    const hasIcon = buttonElement.querySelector('svg, i, [class*="icon"]');
    
    if (hasIcon && !buttonElement.textContent?.trim()) {
      const issue: AccessibilityIssue = {
        element: button,
        issue: 'Icon button missing accessible name',
        severity: 'error',
        fix: () => {
          // Try to derive button purpose from context
          const purpose = buttonElement.className.includes('share') ? 'Share' :
                         buttonElement.className.includes('close') ? 'Close' :
                         buttonElement.className.includes('menu') ? 'Menu' :
                         buttonElement.title || 'Button';
          
          buttonElement.setAttribute('aria-label', purpose);
        }
      };
      issues.push(issue);
      issue.fix?.();
    }
  });

  // Fix missing heading hierarchy
  const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
  let lastLevel = 0;
  
  headings.forEach((heading) => {
    const level = parseInt(heading.tagName[1]);
    
    if (level > lastLevel + 1) {
      issues.push({
        element: heading,
        issue: `Heading level ${level} skips level ${lastLevel + 1}`,
        severity: 'warning'
      });
    }
    
    lastLevel = level;
  });

  // Fix focus management
  document.querySelectorAll('[tabindex]').forEach((element) => {
    const tabindex = element.getAttribute('tabindex');
    if (tabindex && parseInt(tabindex) > 0) {
      issues.push({
        element: element,
        issue: 'Positive tabindex detected - can break tab order',
        severity: 'warning',
        fix: () => {
          element.setAttribute('tabindex', '0');
        }
      });
    }
  });

  // Add skip links if missing
  if (!document.querySelector('[href="#main"], [href="#content"]')) {
    const issue: AccessibilityIssue = {
      element: document.body,
      issue: 'Missing skip to main content link',
      severity: 'warning',
      fix: () => {
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white';
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Add main landmark if missing
        const main = document.querySelector('main') || document.querySelector('#main');
        if (!main) {
          const content = document.querySelector('[id*="content"], .content, main') as HTMLElement;
          if (content && !content.id) {
            content.id = 'main';
          }
        }
      }
    };
    issues.push(issue);
    issue.fix?.();
  }

  return issues;
};

/**
 * Add ARIA landmarks
 */
export const addAriaLandmarks = () => {
  // Add main landmark
  const main = document.querySelector('main');
  if (main && !main.getAttribute('role')) {
    main.setAttribute('role', 'main');
  }

  // Add navigation landmarks
  document.querySelectorAll('nav').forEach((nav) => {
    if (!nav.getAttribute('role')) {
      nav.setAttribute('role', 'navigation');
    }
    
    if (!nav.getAttribute('aria-label')) {
      const isMain = nav.querySelector('[href="/"], [href="#home"]');
      nav.setAttribute('aria-label', isMain ? 'Main navigation' : 'Navigation');
    }
  });

  // Add banner and contentinfo
  const header = document.querySelector('header');
  if (header && !header.getAttribute('role')) {
    header.setAttribute('role', 'banner');
  }

  const footer = document.querySelector('footer');
  if (footer && !footer.getAttribute('role')) {
    footer.setAttribute('role', 'contentinfo');
  }
};

/**
 * Initialize accessibility fixes
 */
export const initAccessibilityFixes = () => {
  // Run initial audit and fixes
  const issues = auditAndFixAccessibility();
  addAriaLandmarks();
  
  console.log(`Fixed ${issues.length} accessibility issues`);
  
  // Monitor for new content
  const observer = new MutationObserver(() => {
    auditAndFixAccessibility();
    addAriaLandmarks();
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  return observer;
};