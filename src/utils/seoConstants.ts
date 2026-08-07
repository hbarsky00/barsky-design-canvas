
// Canonical URLs must always point at the production domain regardless of the
// serving origin (Netlify subdomain, Lovable preview, localhost). Deriving from
// window.location.origin leaks preview domains into canonical/og:url tags.
const getDynamicBaseUrl = (): string => 'https://barskydesign.pro';

export const SEO_CONSTANTS = {
  get BASE_URL() {
    return getDynamicBaseUrl();
  },
  DEFAULT_PROFILE_IMAGE: 'https://barskydesign.pro/images/hiram-barsky-profile.png',
  // Matches the static og:site_name in index.html — kept in sync so the
  // client-rendered <head> (after hydration) never disagrees with what
  // non-JS crawlers see in the raw HTML shell.
  SITE_NAME: 'Hiram Barsky Design',
  // Short title suffix, matching scripts/prerender-seo.ts's SITE_SUFFIX
  // exactly. Used for blog/product titles instead of SITE_NAME so the
  // client-rendered <title> matches the prerendered static one instead of
  // growing a second, longer suffix on top of it.
  TITLE_SUFFIX: ' — Hiram Barsky',
  AUTHOR: 'Hiram Barsky',
  TWITTER_HANDLE: '@hirambarsky',
  DEFAULT_DESCRIPTION: 'Senior UX designer portfolio with case studies in AI, fintech, healthcare, and cyber — showing measurable user outcomes and product design impact.',
  
  // Meta tag defaults
  THEME_COLOR: '#3B82F6',
  LOCALE: 'en_US',
  LANGUAGE: 'English',
  
  // Social profiles — used for entity sameAs (structuredDataUtils.ts). Every
  // entry here must actually resolve; a dead sameAs target hurts entity
  // resolution more than having no sameAs at all. LinkedIn returns 999 to
  // automated requests (its standard anti-bot wall, not evidence it's dead —
  // matches the handle used consistently across this project). github.com/
  // hirambarsky and twitter.com/hirambarsky were both dead (404, verified
  // with a browser UA on twitter.com and x.com) — github.com/hbarsky00 is
  // the real one (matches this repo's own git remote). No verified Twitter/X
  // handle exists; omitted rather than guessed — flag to Hiram if he wants
  // one added back.
  //
  // LinkedIn corrected 2026-08-06 (full CTA audit): was 'hirambarsky' (no
  // hyphen), the only place in the codebase using that slug. Every other
  // live LinkedIn link sitewide — Footer.tsx, ContactInformation.tsx
  // (/contact), HeroContent.tsx (homepage hero) — uses the hyphenated
  // 'hiram-barsky'. Can't verify either via curl (LinkedIn returns 999 to
  // bots regardless of slug), but 8-to-1 agreement across every other
  // real, live usage is strong enough to trust over the schema's lone
  // outlier.
  SOCIAL_PROFILES: [
    'https://www.linkedin.com/in/hiram-barsky',
    'https://github.com/hbarsky00'
  ]
};
