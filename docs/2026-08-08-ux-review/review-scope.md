---
review_date: 2026-08-08
target: http://localhost:8080
flows:
  - homepage: hero -> case studies -> blog teaser -> contact/footer
  - case study detail (e.g. /project/ring-rival, /project/business-management)
  - blog index -> blog post (e.g. /blog/case-study-writing)
viewports: [desktop (1280x900), mobile (375x812)]
persona: a founder/hiring manager evaluating whether to book a call with Hiram, landing from a shared link or search result
screenshots: docs/2026-08-08-ux-review/screens/
context: |
  Post tonight's changes: hero redesign (asymmetric layout + stats), new favicon/OG image,
  removed hover-upload overlay from case study images, 2-column grid for multi-image
  case-study blocks, and a full rewrite of all 10 blog posts + SEO metadata fixes.
  This review is a final quality pass before pushing to origin/deploying.
---
