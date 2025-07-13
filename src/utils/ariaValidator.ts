/**
 * ARIA Role Validator - Ensure proper parent-child relationships
 */

interface ARIARule {
  parentRole: string;
  requiredChildren: string[];
  allowedChildren?: string[];
}

const ARIA_RULES: ARIARule[] = [
  {
    parentRole: 'list',
    requiredChildren: ['listitem']
  },
  {
    parentRole: 'listbox',
    requiredChildren: ['option']
  },
  {
    parentRole: 'menu',
    requiredChildren: ['menuitem', 'menuitemcheckbox', 'menuitemradio']
  },
  {
    parentRole: 'menubar',
    requiredChildren: ['menuitem', 'menuitemcheckbox', 'menuitemradio']
  },
  {
    parentRole: 'tablist',
    requiredChildren: ['tab']
  },
  {
    parentRole: 'tree',
    requiredChildren: ['treeitem']
  },
  {
    parentRole: 'grid',
    requiredChildren: ['row']
  },
  {
    parentRole: 'row',
    requiredChildren: ['cell', 'columnheader', 'rowheader', 'gridcell']
  }
];

class ARIAValidator {
  private violations: Array<{element: Element, issue: string}> = [];

  /**
   * Fix button accessibility issues
   */
  fixButtonAccessibility() {
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(button => {
      // Ensure buttons have discernible text
      const hasText = button.textContent?.trim() || 
                      button.getAttribute('aria-label') || 
                      button.getAttribute('title') ||
                      button.querySelector('img')?.getAttribute('alt');
      
      if (!hasText) {
        // Try to infer purpose from context
        const icon = button.querySelector('svg, i');
        if (icon) {
          const className = icon.className || '';
          let inferredLabel = '';
          
          if (className.includes('menu')) inferredLabel = 'Menu';
          else if (className.includes('close') || className.includes('x')) inferredLabel = 'Close';
          else if (className.includes('search')) inferredLabel = 'Search';
          else if (className.includes('submit')) inferredLabel = 'Submit';
          else inferredLabel = 'Button';
          
          button.setAttribute('aria-label', inferredLabel);
        }
      }
      
      // Ensure proper ARIA attributes for interactive elements
      if (!button.hasAttribute('type') && button.tagName.toLowerCase() === 'button') {
        button.setAttribute('type', 'button');
      }
    });
  }

  /**
   * Validate ARIA parent-child relationships
   */
  validateARIARoles(): boolean {
    this.violations = [];
    let isValid = true;

    ARIA_RULES.forEach(rule => {
      const parents = document.querySelectorAll(`[role="${rule.parentRole}"]`);
      
      parents.forEach(parent => {
        const children = Array.from(parent.children);
        const childRoles = children.map(child => 
          child.getAttribute('role') || this.getImplicitRole(child)
        );
        
        const hasRequiredChildren = rule.requiredChildren.some(requiredRole =>
          childRoles.includes(requiredRole)
        );
        
        if (!hasRequiredChildren && children.length > 0) {
          this.violations.push({
            element: parent,
            issue: `Element with role="${rule.parentRole}" must contain children with roles: ${rule.requiredChildren.join(', ')}`
          });
          isValid = false;
          
          // Auto-fix common issues
          this.autoFixARIARole(parent, rule);
        }
      });
    });

    return isValid;
  }

  /**
   * Get implicit ARIA role for HTML elements
   */
  private getImplicitRole(element: Element): string {
    const tagName = element.tagName.toLowerCase();
    
    switch (tagName) {
      case 'li': return 'listitem';
      case 'ul': case 'ol': return 'list';
      case 'nav': return 'navigation';
      case 'main': return 'main';
      case 'header': return 'banner';
      case 'footer': return 'contentinfo';
      case 'aside': return 'complementary';
      case 'button': return 'button';
      case 'a': return element.hasAttribute('href') ? 'link' : 'generic';
      default: return 'generic';
    }
  }

  /**
   * Auto-fix common ARIA role issues
   */
  private autoFixARIARole(parent: Element, rule: ARIARule) {
    if (rule.parentRole === 'list') {
      // Fix list children
      Array.from(parent.children).forEach(child => {
        if (!child.hasAttribute('role') && child.tagName.toLowerCase() !== 'li') {
          child.setAttribute('role', 'listitem');
        }
      });
    }
    
    if (rule.parentRole === 'navigation') {
      // Ensure navigation has proper structure
      const links = parent.querySelectorAll('a');
      if (links.length > 0 && !parent.querySelector('[role="list"]')) {
        // Wrap links in a list structure
        const list = document.createElement('ul');
        list.setAttribute('role', 'list');
        
        links.forEach(link => {
          const listItem = document.createElement('li');
          listItem.setAttribute('role', 'listitem');
          listItem.appendChild(link.cloneNode(true));
          list.appendChild(listItem);
        });
      }
    }
  }

  /**
   * Enhanced image alt text validation
   */
  validateImageAltText() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
      const alt = img.getAttribute('alt');
      const isDecorative = img.hasAttribute('aria-hidden') && img.getAttribute('aria-hidden') === 'true';
      
      if (!isDecorative && (!alt || alt.trim() === '')) {
        // Try to generate alt text from context
        const figcaption = img.closest('figure')?.querySelector('figcaption');
        const title = img.getAttribute('title');
        const filename = img.src.split('/').pop()?.split('.')[0];
        
        let generatedAlt = '';
        if (figcaption?.textContent) {
          generatedAlt = figcaption.textContent.trim();
        } else if (title) {
          generatedAlt = title;
        } else if (filename) {
          generatedAlt = filename.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        } else {
          generatedAlt = 'Image';
        }
        
        img.setAttribute('alt', generatedAlt);
      }
    });
  }

  /**
   * Initialize comprehensive ARIA validation and fixes
   */
  initARIAValidation() {
    // Fix button accessibility
    this.fixButtonAccessibility();
    
    // Validate and fix ARIA roles
    this.validateARIARoles();
    
    // Fix image alt text
    this.validateImageAltText();
    
    // Monitor for dynamic content changes
    const observer = new MutationObserver(() => {
      this.fixButtonAccessibility();
      this.validateImageAltText();
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['role', 'aria-label', 'alt']
    });

    console.log('✅ ARIA validation and fixes applied');
    
    if (this.violations.length > 0) {
      console.warn('⚠️ ARIA violations found and fixed:', this.violations);
    }
    
    return observer;
  }
}

// Export singleton instance
export const ariaValidator = new ARIAValidator();

/**
 * Initialize ARIA validation
 */
export const initARIAValidation = () => {
  return ariaValidator.initARIAValidation();
};