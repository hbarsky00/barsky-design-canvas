---
name: case-study-hover-video
description: Add hover-to-play video on case-study hero images and homepage case-study cards. Use whenever the user uploads a short video for a case study (e.g. "play this on hover for X like Herba/Fire Lion") and wants it to auto-play on hover of the hero image on /project/<slug> and on the matching homepage card.
---

# Case Study Hover Video

Hero images on case study pages and homepage case-study cards can swap to a muted, looping video on hover. The pattern is already wired — only data needs to change per case study.

## Files involved

- `src/components/case-study/SimpleCaseStudyPage.tsx` — `SimpleCaseStudyImage` supports an optional `hoverVideo: string`. The `HeroHoverMedia` component fades from image to video on mouse enter / touch.
- `src/components/home/VideoCaseStudiesSection.tsx` — homepage cards. Each entry already has a `video` field; `ModernProjectCard` auto-plays it on hover.
- `public/uploads/<slug>-hero.mp4` — canonical location for hero hover videos.

## Steps to add hover video for a case study

1. Copy the uploaded mp4 to `public/uploads/<slug>-hero.mp4` using `code--copy` (slug matches the route, e.g. `firelion`, `ringrival`, `catchbuddy`).
2. In `src/pages/Structured<Name>CaseStudy.tsx` (or `ManuscriptRxCaseStudy.tsx`), add `hoverVideo: "/uploads/<slug>-hero.mp4"` to the `heroImage` prop. Keep `src` and `alt` unchanged.
3. In `src/components/home/VideoCaseStudiesSection.tsx`, ensure the matching entry's `video` field points to the same file.
4. Do not touch nav, footer, copy, or other images.

## Rules

- Video must be muted, looping, `playsInline`, `preload="metadata"` (already handled by `HeroHoverMedia`).
- Never replace the still hero image — the image stays as the poster; the video only shows while hovered.
- One video per case study, always under `/uploads/`.
- File naming: `<slug>-hero.mp4` (lowercase, hyphenated slug matching the route).
