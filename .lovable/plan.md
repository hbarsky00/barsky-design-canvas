

## Problem

The Store page filter buttons ("All Products" / "Templates") have two accessibility and styling issues:

1. **The `touchTargetFixer.ts` is injecting global `!important` CSS overrides** on ALL buttons, links, and interactive elements — forcing padding, margin, display, and min-size with `!important`. This is destructive: it overrides the carefully designed button variant system, breaks layouts (e.g., forces `gap` on all `.flex` and `.grid` elements), and causes visual inconsistencies like the ones in the screenshot.

2. **The filter buttons use `variant="default"`** for the active state, which applies a blue gradient background — but the `Filter` icon inherits `currentColor` which should be white. The `touchTargetFixer` may be interfering with the rendering.

## Plan

### 1. Remove `touchTargetFixer.ts` entirely
This file injects destructive `!important` overrides on every interactive element globally. The button component already has proper `min-h-[44px]` and `min-w-[44px]` built into every variant and size. This fixer is actively harmful — it breaks the variant system and causes the visual issues the user is seeing.

- **Delete** `src/utils/touchTargetFixer.ts`
- **Update** `src/utils/performanceOptimizer.ts` to remove the import and call to `initTouchTargetFixes()`

### 2. Remove `accessibilityFixer.ts` 
This file uses a MutationObserver to continuously manipulate the DOM (adding aria attributes, skip links, etc.) on every DOM change. This is fragile, potentially interfering with React's rendering, and the accessibility concerns should be handled properly in components — not with runtime DOM manipulation.

- **Delete** `src/utils/accessibilityFixer.ts`
- **Update** `src/utils/performanceOptimizer.ts` to remove the import and call to `initAccessibilityFixes()`

### 3. Fix Store filter button variants
Per the BUTTON_SPEC, the active filter should use `variant="filled"` (primary action) and inactive filters should use `variant="outline"`. The current `variant="default"` works but `filled` is the canonical choice.

- **Update** `src/pages/Store.tsx` filter buttons: change `"default"` to `"filled"` for the active state — this ensures white text on gradient background with proper contrast.

