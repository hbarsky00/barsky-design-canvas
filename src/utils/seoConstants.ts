
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
  // Only ever used as the og:image / twitter:image fallback (seoBuilder.ts).
  // It was a 896x1195 portrait shipped under og:image:width 1200 /
  // og:image:height 630, so every share rendered a portrait in a landscape
  // card. This is the real 1200x630 card, which was sitting unused.
  DEFAULT_PROFILE_IMAGE: 'https://barskydesign.pro/images/og/site.png',
  // The <title> fallback for a page with no entry in STATIC_PAGE_SEO. It is a
  // title, not the site's name — og:site_name uses BRAND below, and the
  // Organization schema's name is "Barsky Design".
  //
  // It used to read "Hiram Barsky | Lead UX Designer | Driving Design
  // Strategy", which is the positioning this site retired: the Person schema
  // on every page says jobTitle "Product Designer & Front-End Developer" while
  // og:site_name said Lead UX Designer, on all 74 built pages. Composed here
  // from AUTHOR and that same schema jobTitle so the two cannot drift again.
  SITE_NAME: 'Hiram Barsky — Product Designer & Front-End Developer',
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
  // These are the machine-readable identity for the site, so they have to match
  // the links a human actually gets. The footer, contact page and hero all point
  // at /in/hiram-barsky and github.com/hbarsky00; this list pointed at
  // /in/hirambarsky and github.com/hirambarsky, neither of which is his.
  SOCIAL_PROFILES: [
    'https://www.linkedin.com/in/hiram-barsky',
    'https://github.com/hbarsky00'
  ]
};
