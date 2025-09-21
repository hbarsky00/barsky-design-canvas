
const getDynamicBaseUrl = (): string => {
  if (typeof window !== 'undefined') {
    const origin = window.location.origin;
    // Ensure we're using the production domain for canonical URLs
    if (origin.includes('lovable.app') || origin.includes('localhost')) {
      return 'https://barskydesign.pro';
    }
    return origin;
  }
  return process.env.REACT_APP_BASE_URL || 'https://barskydesign.pro';
};

export const SEO_CONSTANTS = {
  get BASE_URL() {
    return getDynamicBaseUrl();
  },
  DEFAULT_PROFILE_IMAGE: 'https://barskydesign.pro/images/hiram-barsky-headshot.jpg',
  SITE_NAME: 'Hiram Barsky | Lead UX Designer | Driving Design Strategy',
  AUTHOR: 'Hiram Barsky',
  TWITTER_HANDLE: '@hirambarsky',
  DEFAULT_DESCRIPTION: 'Driving Design Strategy & Leadership | Passion for High Craft, Gen AI, Cyber & Fintech',
  
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
