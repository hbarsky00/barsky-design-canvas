
// Analytics utility to work with Google Analytics

/**
 * Tracks a page view in Google Analytics
 * @param path - The path to track (e.g., '/home')
 * @param title - The page title
 */
export const trackPageView = (path: string, title: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-VYKW0Y9K0T', {
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

/**
 * Tracks user engagement with specific content
 * @param contentType - The type of content (e.g., 'project', 'blog')
 * @param contentId - The ID of the content
 * @param contentName - The name of the content
 */
export const trackContentEngagement = (
  contentType: string,
  contentId: string,
  contentName: string
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'content_engagement', {
      content_type: contentType,
      content_id: contentId,
      content_name: contentName
    });
  }
};

/**
 * Tracks form submissions
 * @param formName - The name of the form (e.g., 'contact', 'newsletter')
 * @param formSuccess - Whether the form submission was successful
 */
export const trackFormSubmission = (
  formName: string,
  formSuccess: boolean
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'form_submission', {
      form_name: formName,
      form_success: formSuccess
    });
  }
};

/**
 * Every "Book a call" on the site goes through here. Before this, five
 * components each held their own copy of the bare Calendly URL, so a booking
 * could not be traced to the page that produced it in GA4 or in Calendly.
 * The UTM lands on the Calendly booking record; the event lands in GA4.
 */
export const CALENDLY_BASE = 'https://calendly.com/barskyuxdesignservices/30min';

export const calendlyUrl = (source: string) => {
  const path = typeof window !== 'undefined' ? window.location.pathname : '';
  const q = new URLSearchParams({
    utm_source: 'barskydesign.pro',
    utm_medium: 'site',
    utm_campaign: source,
    utm_content: path,
  });
  return `${CALENDLY_BASE}?${q.toString()}`;
};

export const trackBookCall = (source: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'book_call_click', {
      source,
      page_path: window.location.pathname,
    });
  }
};
