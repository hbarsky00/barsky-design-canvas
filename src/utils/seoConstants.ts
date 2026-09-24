
const getDynamicBaseUrl = (): string => {
  if (typeof window !== 'undefined') {
    const origin = window.location.origin;
    // Ensure we're using the production domain for canonical URLs
    if (origin.includes('localhost') || origin.includes('netlify.app')) {
      return 'https://barskydesign.pro';
    }
    return origin;
  }
  return 'https://barskydesign.pro';
};

export const SEO_CONSTANTS = {
  get BASE_URL() {
    return getDynamicBaseUrl();
  },
  DEFAULT_PROFILE_IMAGE: 'https://barskydesign.pro/images/hiram-barsky-headshot.webp',
  SITE_NAME: 'Hiram Barsky | Lead UX Designer | Driving Design Strategy',
  // Short form for <title> suffixes. SITE_NAME is 57 chars, so appending it to a
  // post title lands past the ~60 char SERP cut (one post shipped at 113).
  BRAND: 'Barsky Design',
  AUTHOR: 'Hiram Barsky',
  TWITTER_HANDLE: '@hirambarsky',
  DEFAULT_DESCRIPTION: 'Senior UX designer portfolio with case studies in AI, fintech, healthcare, and cyber — showing measurable user outcomes and product design impact.',
  
  // Meta tag defaults
  THEME_COLOR: '#3B82F6',
  LOCALE: 'en_US',
  LANGUAGE: 'English',
  
  // Social profiles
  SOCIAL_PROFILES: [
    'https://www.linkedin.com/in/hirambarsky',
    'https://twitter.com/hirambarsky',
    'https://github.com/hirambarsky'
  ]
};
