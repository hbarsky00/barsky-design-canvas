
// Analytics utility to work with Google Analytics

/**
 * Tracks a page view in Google Analytics
 * @param path - The path to track (e.g., '/home')
 * @param title - The page title
 */
export const trackPageView = (path: string, title: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-7W0E6167T7', {
      page_path: path,
      page_title: title,
    });
  }
};

/**
 * Tracks a custom event in Google Analytics
 * @param action - The event action
 * @param category - The event category
 * @param label - The event label
 * @param value - The event value
 */
export const trackEvent = (
  action: string,
  category?: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
