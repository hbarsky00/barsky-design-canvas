/**
 * Unified Accessibility Manager - Consolidates all accessibility enhancements
 * Eliminates conflicts between multiple accessibility systems
 */

interface AccessibilityConfig {
  touchTargets: {
    minSize: number;
    minSpacing: number;
  };
  keyboard: {
    focusOutlineColor: string;
    tabIndexStart: number;
  };
  aria: {
    validateOnMount: boolean;
    autoFixCommonIssues: boolean;
  };
}

class AccessibilityManager {
  private config: AccessibilityConfig = {
    touchTargets: {
      minSize: 48, // 48px minimum touch target
      minSpacing: 8
    },
    keyboard: {
      focusOutlineColor: 'hsl(var(--primary))',
      tabIndexStart: 1
    },
    aria: {
      validateOnMount: true,
      autoFixCommonIssues: true
    }
  };

  private isInitialized = false;
  private cleanupFunctions: (() => void)[] = [];

  initialize() {
    if (this.isInitialized || typeof window === 'undefined') return;
    
    this.isInitialized = true;
    
    // Phase 1: Touch Target Optimization
    this.optimizeTouchTargets();
    
    // Phase 2: Keyboard Navigation
    this.enhanceKeyboardNavigation();
    
    // Phase 3: ARIA Validation and Fixes
    this.initializeAriaValidation();
    
    // Phase 4: Focus Management
    this.initializeFocusManagement();
    
    console.log('♿ Accessibility Manager initialized');
  }

  private optimizeTouchTargets() {
    const touchTargetCSS = `
      /* Touch target optimization */
      @media (hover: none) and (pointer: coarse) {
        button, [role="button"], .clickable, a {
          min-height: ${this.config.touchTargets.minSize}px;
          min-width: ${this.config.touchTargets.minSize}px;
          padding: 12px 16px;
          margin: ${this.config.touchTargets.minSpacing / 2}px;
          position: relative;
        }
        
        input, textarea, select {
          min-height: ${this.config.touchTargets.minSize}px;
          font-size: 16px; /* Prevent zoom on iOS */
        }
        
        /* Increase touch target for small elements */
        .small-touch-target::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: ${this.config.touchTargets.minSize}px;
          height: ${this.config.touchTargets.minSize}px;
          min-width: ${this.config.touchTargets.minSize}px;
          min-height: ${this.config.touchTargets.minSize}px;
        }
      }
    `;
    
    const style = document.createElement('style');
    style.textContent = touchTargetCSS;
    document.head.appendChild(style);
  }

  private enhanceKeyboardNavigation() {
    const keyboardCSS = `
      /* Enhanced keyboard navigation */
      *:focus {
        outline: 2px solid ${this.config.keyboard.focusOutlineColor};
        outline-offset: 2px;
      }
      
      /* Skip link for keyboard users */
      .skip-link {
        position: absolute;
        top: -40px;
        left: 6px;
        background: hsl(var(--primary));
        color: hsl(var(--primary-foreground));
        padding: 8px;
        z-index: 1000;
        text-decoration: none;
        border-radius: 4px;
      }
      
      .skip-link:focus {
        top: 6px;
      }
    `;
    
    const style = document.createElement('style');
    style.textContent = keyboardCSS;
    document.head.appendChild(style);
    
    // Add skip link if not present
    if (!document.querySelector('.skip-link')) {
      const skipLink = document.createElement('a');
      skipLink.href = '#main-content';
      skipLink.className = 'skip-link';
      skipLink.textContent = 'Skip to main content';
      document.body.insertBefore(skipLink, document.body.firstChild);
    }
    
    // Enhanced keyboard navigation
    const handleKeyboardNavigation = (e: KeyboardEvent) => {
      // Escape key to close modals/dropdowns
      if (e.key === 'Escape') {
        const activeElement = document.activeElement as HTMLElement;
        if (activeElement?.closest('[role="dialog"], [role="menu"], [role="listbox"]')) {
          activeElement.blur();
        }
      }
      
      // Tab management for complex components
      if (e.key === 'Tab') {
        this.manageFocusOrder(e);
      }
    };
    
    document.addEventListener('keydown', handleKeyboardNavigation);
    this.cleanupFunctions.push(() => {
      document.removeEventListener('keydown', handleKeyboardNavigation);
    });
  }

  private initializeAriaValidation() {
    if (!this.config.aria.validateOnMount) return;
    
    const validateAriaLabels = () => {
      const interactiveElements = document.querySelectorAll(
        'button, a, input, textarea, select, [role="button"], [role="link"], [role="menuitem"]'
      );
      
      interactiveElements.forEach(element => {
        const hasAriaLabel = element.hasAttribute('aria-label');
        const hasAriaLabelledby = element.hasAttribute('aria-labelledby');
        const hasTextContent = element.textContent?.trim();
        const hasAltText = element.hasAttribute('alt');
        
        if (!hasAriaLabel && !hasAriaLabelledby && !hasTextContent && !hasAltText) {
          if (this.config.aria.autoFixCommonIssues) {
            // Auto-fix common issues
            const tagName = element.tagName.toLowerCase();
            const role = element.getAttribute('role');
            
            if (tagName === 'button' || role === 'button') {
              element.setAttribute('aria-label', 'Button');
            } else if (tagName === 'a' || role === 'link') {
              element.setAttribute('aria-label', 'Link');
            }
          }
          
          console.warn('Accessibility: Interactive element missing accessible name:', element);
        }
      });
    };
    
    // Validate on load
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', validateAriaLabels);
    } else {
      validateAriaLabels();
    }
    
    // Validate when DOM changes
    const observer = new MutationObserver(validateAriaLabels);
    observer.observe(document.body, { childList: true, subtree: true });
    
    this.cleanupFunctions.push(() => observer.disconnect());
  }

  private initializeFocusManagement() {
    // Focus trap for modals
    const manageFocusTrap = (container: HTMLElement) => {
      const focusableElements = container.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements.length === 0) return;
      
      const firstFocusable = focusableElements[0] as HTMLElement;
      const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;
      
      const handleFocusTrap = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
              lastFocusable.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastFocusable) {
              firstFocusable.focus();
              e.preventDefault();
            }
          }
        }
      };
      
      container.addEventListener('keydown', handleFocusTrap);
      return () => container.removeEventListener('keydown', handleFocusTrap);
    };
    
    // Apply focus trap to modals
    const observeModals = () => {
      const modals = document.querySelectorAll('[role="dialog"], .modal');
      modals.forEach(modal => {
        const cleanup = manageFocusTrap(modal as HTMLElement);
        if (cleanup) this.cleanupFunctions.push(cleanup);
      });
    };
    
    observeModals();
    
    const modalObserver = new MutationObserver(observeModals);
    modalObserver.observe(document.body, { childList: true, subtree: true });
    
    this.cleanupFunctions.push(() => modalObserver.disconnect());
  }

  private manageFocusOrder(e: KeyboardEvent) {
    // Enhanced focus order management for complex components
    const activeElement = document.activeElement as HTMLElement;
    
    if (activeElement?.closest('[role="tablist"]')) {
      // Tab component keyboard navigation
      e.preventDefault();
      const tablist = activeElement.closest('[role="tablist"]');
      const tabs = tablist?.querySelectorAll('[role="tab"]');
      
      if (tabs) {
        const currentIndex = Array.from(tabs).indexOf(activeElement);
        const nextIndex = e.shiftKey ? currentIndex - 1 : currentIndex + 1;
        const nextTab = tabs[nextIndex] as HTMLElement;
        
        if (nextTab) {
          nextTab.focus();
        }
      }
    }
  }

  cleanup() {
    this.cleanupFunctions.forEach(cleanup => cleanup());
    this.cleanupFunctions = [];
    this.isInitialized = false;
  }
}

export const accessibilityManager = new AccessibilityManager();