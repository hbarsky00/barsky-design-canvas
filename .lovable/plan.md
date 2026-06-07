## Fix: hero pill transition + mobile CTA clipping

Two real problems, one root cause for each. Scope is `src/styles/themes.css` only — no markup, no component logic.

### 1. Pill color flash during day↔night swap

Today the pill background/text/border swap **instantly** at the moment `.is-day` is added/removed on `.parallax-hero`, while the sky itself fades over 2.5s. That's the "odd" snap you see on the buttons.

Fix: add a transition on the pill's color properties so they crossfade on the same curve as the sky.

```css
.parallax-content .product-pill {
  transition:
    background-color 2.5s ease-in-out,
    border-color 2.5s ease-in-out,
    color 2.5s ease-in-out,
    box-shadow 2.5s ease-in-out;
}
.parallax-content .social-link {
  transition:
    background-color 2.5s ease-in-out,
    color 2.5s ease-in-out,
    box-shadow 2.5s ease-in-out,
    transform .15s ease;   /* keep hover snappy */
}
```

Hover transitions stay fast because hover uses `transform`/`background-color` on a different selector that already overrides.

### 2. "Book a Call" cut off on mobile + extra footer gap

`.parallax-content` currently has `padding-bottom: 96px` on ≤640px. Combined with the social-icons + book-call stack, the CTA gets pushed below the visible hero on a 390×728 viewport, and the inflated bottom padding is what's reading as "space back from the footer."

Fix on mobile only (≤640px):

```css
@media (max-width: 640px) {
  .parallax-content {
    padding-top: 96px;     /* was 120px — subtle lift */
    padding-bottom: 48px;  /* was 96px — kills the footer gap */
  }
  .parallax-content .social-icons { margin-top: 20px; }     /* was 28px */
  .parallax-content .book-call-wrap { margin-top: 8px; }    /* was 12px */
}
```

Desktop is untouched.

### Files
- `src/styles/themes.css` — pill/social transition properties + mobile padding block. ~12 lines changed.

### Out of scope
Hero component markup, footer component, theme picker, scene switcher, desktop spacing, copy.
