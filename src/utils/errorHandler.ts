/**
 * Global error handler for JavaScript errors during page load
 */

export const setupGlobalErrorHandling = () => {
  // Handle uncaught JavaScript errors
  window.addEventListener('error', (event) => {
    console.error('JavaScript Error:', {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      error: event.error
    });
    
    // Don't let errors break the page
    event.preventDefault();
  });

  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled Promise Rejection:', event.reason);
    
    // Prevent the default behavior (logging to console)
    event.preventDefault();
  });

  // Handle resource loading errors
  window.addEventListener('error', (event) => {
    if (event.target !== window) {
      const target = event.target as Element;
      if (target.tagName === 'IMG') {
        console.warn('Image failed to load:', (target as HTMLImageElement).src);
        // Remove failed image to prevent repeated errors
        (target as HTMLImageElement).style.display = 'none';
      } else if (target.tagName === 'SCRIPT') {
        console.warn('Script failed to load:', (target as HTMLScriptElement).src);
      } else if (target.tagName === 'LINK') {
        console.warn('CSS failed to load:', (target as HTMLLinkElement).href);
      }
    }
  }, true);
};

export const safelyExecute = <T>(fn: () => T, fallback?: T): T | undefined => {
  try {
    return fn();
  } catch (error) {
    console.error('Safe execution error:', error);
    return fallback;
  }
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};