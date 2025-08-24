
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
  DEFAULT_PROFILE_IMAGE: 'https://barskyux.com/wp-content/uploads/2025/06/IMG_20250531_123836_952.webp',
  SITE_NAME: 'Hiram Barsky Design',
  AUTHOR: 'Hiram Barsky',
  TWITTER_HANDLE: '@hirambarsky',
  DEFAULT_DESCRIPTION: 'Senior Product Designer & AI Developer with 15+ years experience. Specializing in UX research, design systems, and Gen AI integration for business growth.',
  
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
