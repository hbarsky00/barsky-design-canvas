# AEO rotation log

Answer Engine Optimization passes on barskydesign.pro (barsky-design-canvas). One lever per run; six-lever cycles.
Levers: 1) entity hardening  2) extractable Q&A  3) citable resource content  4) structured-data sweep  5) llms.txt / cross-web consistency  6) content freshness / gap-fill.

Sibling log for the *other* Hiram site (barsky.design, different repo): `~/Documents/barskydesign/docs/aeo-log.md` — don't confuse the two.

## Cycle 1 (started 2026-08-05)
- [x] entity hardening — 2026-08-05 — dynamic Organization schema (`structuredDataUtils.ts`) gained `sameAs`, and the founder Person gained `knowsAbout` (8 real skills from /about's SkillsShowcase) and `alumniOf` (6 real employers from /about's ProfessionalJourney: PNC, Bank of America, Deloitte, TCS, KPMG, Express Scripts). Also fixed two real bugs found while doing this: (1) `logo` pointed at `/logo.png`, which 404s — repointed to the same headshot the static shell already uses; (2) `SEO_CONSTANTS.SOCIAL_PROFILES` had a dead GitHub URL (github.com/hirambarsky, 404) and a dead Twitter/X handle (@hirambarsky, verified 404 on both twitter.com and x.com with a browser UA) — corrected GitHub to github.com/hbarsky00 (matches this repo's git remote, verified 200), removed the dead Twitter/X entry rather than guess a replacement. Static index.html's LocalBusiness sameAs also got the GitHub addition for cross-page consistency. Re-ran capture-bodies (schema is Helmet-managed, not visible-body copy, but still needs recapture). FLAG for Hiram: no verified real Twitter/X handle — let me know if you have one and want it added back, or if the TWITTER_HANDLE meta tags (`@hirambarsky`, used in twitter:site/twitter:creator sitewide) should also be removed to match.
