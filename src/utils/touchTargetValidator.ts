/**
 * Touch Target Validation Utility
 * Ensures all interactive elements meet accessibility guidelines for touch targets
 */

interface TouchTargetResult {
  element: Element;
  width: number;
  height: number;
  isValid: boolean;
  type: string;
  id?: string;
  className?: string;
  ariaLabel?: string;
  issues: string[];
  suggestions: string[];
}

interface TouchTargetOptions {
  minSize: number;
  minSpacing: number;
  allowExceptions?: string[];
}

const DEFAULT_OPTIONS: TouchTargetOptions = {
  minSize: 44, // 44px minimum as per WCAG guidelines
  minSpacing: 8, // 8px minimum spacing between targets
  allowExceptions: ['[data-touch-exception]', '.touch-exception']
};

/**
 * Gets the actual rendered size of an element
 */
const getElementSize = (element: Element): { width: number; height: number } => {
  const rect = element.getBoundingClientRect();
  const computedStyle = window.getComputedStyle(element);
  
  // Include padding in touch target calculation
  const paddingX = parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight);
  const paddingY = parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom);
  
  return {
    width: rect.width + paddingX,
    height: rect.height + paddingY
  };
};

/**
 * Checks if elements are too close to each other
 */
const checkSpacing = (element: Element, allElements: Element[], minSpacing: number): string[] => {
  const issues: string[] = [];
  const rect = element.getBoundingClientRect();
  
  for (const otherElement of allElements) {
    if (element === otherElement) continue;
    
    const otherRect = otherElement.getBoundingClientRect();
    
    // Calculate distance between elements
    const horizontalDistance = Math.max(0, 
      Math.max(rect.left - otherRect.right, otherRect.left - rect.right)
    );
    const verticalDistance = Math.max(0, 
      Math.max(rect.top - otherRect.bottom, otherRect.top - rect.bottom)
    );
    
    const distance = Math.sqrt(horizontalDistance ** 2 + verticalDistance ** 2);
    
    if (distance < minSpacing) {
      issues.push(`Too close to another touch target (${Math.round(distance)}px apart, minimum ${minSpacing}px)`);
      break; // Only report one spacing issue per element
    }
  }
  
  return issues;
};

/**
 * Validates a single touch target
 */
export const validateTouchTarget = (
  element: Element,
  allElements: Element[],
  options: TouchTargetOptions = DEFAULT_OPTIONS
): TouchTargetResult => {
  const size = getElementSize(element);
  const issues: string[] = [];
  const suggestions: string[] = [];
  
  // Check if element is exempted
  const isExempted = options.allowExceptions?.some(selector => 
    element.matches(selector)
  ) || false;
  
  // Size validation
  const isSizeValid = size.width >= options.minSize && size.height >= options.minSize;
  
  if (!isSizeValid && !isExempted) {
    if (size.width < options.minSize) {
      issues.push(`Width too small: ${Math.round(size.width)}px (minimum ${options.minSize}px)`);
      suggestions.push(`Increase width to at least ${options.minSize}px`);
    }
    if (size.height < options.minSize) {
      issues.push(`Height too small: ${Math.round(size.height)}px (minimum ${options.minSize}px)`);
      suggestions.push(`Increase height to at least ${options.minSize}px`);
    }
  }
  
  // Spacing validation
  if (!isExempted) {
    const spacingIssues = checkSpacing(element, allElements, options.minSpacing);
    issues.push(...spacingIssues);
    
    if (spacingIssues.length > 0) {
      suggestions.push(`Add margin or padding to create ${options.minSpacing}px spacing`);
    }
  }
  
  // Additional suggestions for small targets
  if (size.width < options.minSize || size.height < options.minSize) {
    suggestions.push('Consider using padding instead of margin for clickable area');
    suggestions.push('Use min-width and min-height CSS properties');
  }
  
  return {
    element,
    width: size.width,
    height: size.height,
    isValid: (isSizeValid || isExempted) && issues.length === 0,
    type: element.tagName.toLowerCase(),
    id: element.id || undefined,
    className: element.className || undefined,
    ariaLabel: element.getAttribute('aria-label') || undefined,
    issues,
    suggestions
  };
};

/**
 * Validates all touch targets on the page
 */
export const validateAllTouchTargets = (
  container: Element | Document = document,
  options: TouchTargetOptions = DEFAULT_OPTIONS
): {
  validTargets: TouchTargetResult[];
  invalidTargets: TouchTargetResult[];
  totalTargets: number;
  validationScore: number;
} => {
  // Select all interactive elements
  const interactiveSelectors = [
    'button',
    'a[href]',
    'input[type="button"]',
    'input[type="submit"]',
    'input[type="reset"]',
    'input[type="checkbox"]',
    'input[type="radio"]',
    'select',
    'textarea',
    '[role="button"]',
    '[role="link"]',
    '[role="checkbox"]',
    '[role="radio"]',
    '[role="tab"]',
    '[role="menuitem"]',
    '[tabindex="0"]',
    '[onclick]'
  ];
  
  const elements = Array.from(
    container.querySelectorAll(interactiveSelectors.join(', '))
  ).filter(el => {
    // Filter out hidden elements
    const style = window.getComputedStyle(el);
    return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
  });
  
  const results = elements.map(element => 
    validateTouchTarget(element, elements, options)
  );
  
  const validTargets = results.filter(r => r.isValid);
  const invalidTargets = results.filter(r => !r.isValid);
  const validationScore = elements.length > 0 ? (validTargets.length / elements.length) * 100 : 100;
  
  // Log results
  console.group('👆 Touch Target Validation Results');
  console.log(`✅ Valid: ${validTargets.length}`);
  console.log(`❌ Invalid: ${invalidTargets.length}`);
  console.log(`📊 Score: ${Math.round(validationScore)}%`);
  
  if (invalidTargets.length > 0) {
    console.warn('Invalid touch targets found:');
    invalidTargets.forEach(target => {
      console.warn(`${target.type}${target.id ? '#' + target.id : ''}:`, target.issues);
    });
  }
  
  console.groupEnd();
  
  return {
    validTargets,
    invalidTargets,
    totalTargets: elements.length,
    validationScore
  };
};

/**
 * Provides CSS fixes for common touch target issues
 */
export const generateTouchTargetFixes = (invalidTargets: TouchTargetResult[]): string => {
  const fixes: string[] = [];
  
  invalidTargets.forEach(target => {
    const selector = target.id 
      ? `#${target.id}` 
      : target.className 
        ? `.${target.className.split(' ')[0]}` 
        : target.type;
    
    const needsWidth = target.width < DEFAULT_OPTIONS.minSize;
    const needsHeight = target.height < DEFAULT_OPTIONS.minSize;
    
    if (needsWidth || needsHeight) {
      const rules: string[] = [];
      
      if (needsWidth) {
        rules.push(`min-width: ${DEFAULT_OPTIONS.minSize}px`);
      }
      if (needsHeight) {
        rules.push(`min-height: ${DEFAULT_OPTIONS.minSize}px`);
      }
      
      // Add padding for better touch area
      rules.push('padding: 8px 12px');
      rules.push('display: inline-flex');
      rules.push('align-items: center');
      rules.push('justify-content: center');
      
      fixes.push(`${selector} {\n  ${rules.join(';\n  ')};\n}`);
    }
  });
  
  return fixes.join('\n\n');
};

/**
 * Automatically applies CSS fixes for touch targets
 */
export const applyTouchTargetFixes = (invalidTargets: TouchTargetResult[]): void => {
  const css = generateTouchTargetFixes(invalidTargets);
  
  if (css) {
    // Create or update style element
    let styleElement = document.getElementById('touch-target-fixes') as HTMLStyleElement;
    
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = 'touch-target-fixes';
      styleElement.setAttribute('data-generated', 'touch-target-validator');
      document.head.appendChild(styleElement);
    }
    
    styleElement.textContent = `/* Auto-generated touch target fixes */\n${css}`;
    console.log('🔧 Applied automatic touch target fixes');
  }
};

/**
 * Monitors touch targets and applies fixes automatically
 */
export const monitorTouchTargets = (autoFix: boolean = false): (() => void) => {
  let observer: MutationObserver;
  
  const runValidation = () => {
    const results = validateAllTouchTargets();
    
    if (autoFix && results.invalidTargets.length > 0) {
      applyTouchTargetFixes(results.invalidTargets);
    }
    
    return results;
  };
  
  // Run initial validation
  runValidation();
  
  // Set up DOM observation for dynamic content
  observer = new MutationObserver(() => {
    // Debounce validation to avoid excessive runs
    setTimeout(runValidation, 500);
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class', 'style']
  });
  
  // Return cleanup function
  return () => {
    if (observer) {
      observer.disconnect();
    }
  };
};