

## Plan: Remove Floating Elements, Fix Hero Spacing & Section Gaps

### What's wrong
1. **Build error**: `BuyMeCoffeeButton` is imported in `App.tsx` (line 9) but never used — TypeScript strict mode fails on unused imports
2. **Buy Me a Coffee** button in `FloatingButtonGroup` overlaps mobile CTA
3. **Hotjar script** in `index.html` injects a floating widget
4. **Large gap** between hero and case studies sections
5. **Hero spacing** is too loose on mobile

### Changes

**1. Fix build error + remove Buy Me a Coffee**
- `src/App.tsx`: Remove the unused `BuyMeCoffeeButton` import (line 9)
- `src/components/shared/BuyMeCoffeeButton.tsx`: Delete this file entirely
- `src/components/shared/FloatingButtonGroup.tsx`: Remove the Buy Me a Coffee button, keep only the Scroll to Top button

**2. Remove Hotjar**
- `index.html`: Remove the Hotjar tracking script block (lines 67-77)

**3. Tighten hero-to-sections gap**
- `src/components/homepage/HomepageLayout.tsx`: Reduce `space-y-2 md:space-y-6` on `<main>` to `space-y-0 md:space-y-2`, and reduce padding on the case studies `SectionTransition`

**4. Tighten hero mobile spacing**
- `src/components/hero/MinimalHero.tsx`: Reduce `pb-16 sm:pb-20` to `pb-6 sm:pb-10`, tighten `gap-4 sm:gap-5` to `gap-3 sm:gap-4`, reduce Continue button bottom spacing

### No changes to
- SEO system, navigation, design system tokens, colors, fonts, or content

