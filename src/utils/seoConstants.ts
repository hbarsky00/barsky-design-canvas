
const getDynamicBaseUrl = (): string => {
  if (typeof window !== 'undefined') {
    const origin = window.location.origin;
    // Ensure we're using the production domain for canonical URLs
    if (origin.includes('lovable.app') || origin.includes('localhost')) {
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
  DEFAULT_PROFILE_IMAGE: 'https://barskydesign.pro/images/hiram-barsky-profile.png',
  // 1200x630 — the actual OG/Twitter card size every platform expects. The old
  // fallback was the 896x1195 portrait headshot, which every share preview
  // (Slack, iMessage, LinkedIn, X) was center-cropping or squashing into a
  // landscape frame despite buildSEO() declaring 1200x630 for it.
  DEFAULT_OG_IMAGE: 'https://barskydesign.pro/images/og/site.png',
  SITE_NAME: 'Hiram Barsky | I Design and Develop Software',
  AUTHOR: 'Hiram Barsky',
  TWITTER_HANDLE: '@hirambarsky',
  DEFAULT_DESCRIPTION: 'I design and develop SaaS, web apps, mobile apps and internal tools. One person, start to finish: design, front end, database and launch.',
  
  // Meta tag defaults
  THEME_COLOR: '#3B82F6',
  LOCALE: 'en_US',
  LANGUAGE: 'English',
  
  // Social profiles
  SOCIAL_PROFILES: [
    'https://www.linkedin.com/in/hiram-barsky',
    'https://twitter.com/hirambarsky',
    'https://github.com/hbarsky00'
  ]
};
