
// Canonical URLs must always point at the production domain regardless of the
// serving origin (Netlify subdomain, Lovable preview, localhost). Deriving from
// window.location.origin leaks preview domains into canonical/og:url tags.
const getDynamicBaseUrl = (): string => 'https://barskydesign.pro';

export const SEO_CONSTANTS = {
  get BASE_URL() {
    return getDynamicBaseUrl();
  },
  DEFAULT_PROFILE_IMAGE: 'https://barskydesign.pro/images/hiram-barsky-profile.png',
  SITE_NAME: 'Hiram Barsky | Lead UX Designer | Driving Design Strategy',
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
