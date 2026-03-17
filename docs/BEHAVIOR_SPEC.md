# Behavior Specification

> **Authority**: Interaction patterns, state management, and responsive behavior for barskydesign.pro.

---

## 1. Navigation Behavior

### 1.1 Header

| State | Behavior |
|-------|----------|
| Homepage, above hero | Header is hidden (`-translate-y-full opacity-0`) |
| Homepage, past hero | Header slides in from top (500ms transition) |
| Non-homepage | Header always visible |
| Scrolled | `bg-background border-b border-border shadow-sm` |
| Mobile (<1024px) | Hamburger menu replaces horizontal nav |
| Desktop (≥1024px) | Full horizontal navigation |

### 1.2 Mobile Menu

- Toggle: Hamburger icon button
- Open: Full-height overlay with nav links
- Close: X button, outside click, or link click
- Each link click navigates and closes menu

### 1.3 Active Link Detection

- Current route highlighted in navigation
- Hash-based sections on homepage tracked via scroll position
- `isLinkActive()` function determines active state

---

## 2. Scroll Behavior

### 2.1 Smooth Scrolling

- Anchor links (`/#projects`, `/#services`) use smooth scroll
- `handleLinkClick` manages both route navigation and hash scrolling

### 2.2 Scroll-Triggered Animations

- Sections animate in on viewport entry (Framer Motion)
- Typical pattern: fade up from 20px below, 0.5s duration
- Staggered children with 100–200ms delays
- **Respect `prefers-reduced-motion`**: Disable all non-essential animations

### 2.3 Scroll Position

- Page scroll resets to top on route change
- Header height set as CSS variable `--header-height` for offset calculations

---

## 3. Interactive Elements

### 3.1 Buttons

Full spec in `BUTTON_SPEC.md`. Key behaviors:

| Interaction | Effect |
|-------------|--------|
| Hover | Scale 1.02, glow shadow, shimmer sweep |
| Active/Press | Scale 0.98 |
| Focus | Ring outline (hidden for mouse, visible for keyboard) |
| Disabled | Reduced opacity, no interactions |

### 3.2 Cards (Project/Blog)

| Interaction | Effect |
|-------------|--------|
| Hover | Scale 1.02, elevation lift (shadow-elevation-3 → 4) |
| Case study card hover | Border color transition, gradient overlay |
| Click | Navigate to detail page |

### 3.3 Images (Case Study)

| Interaction | Effect |
|-------------|--------|
| Hover | `scale(1.02)` on image within container |
| Load | Progressive: background color → image |
| Quality | `.image-high-quality` filter for crispness |

### 3.4 Links

| Type | Behavior |
|------|----------|
| Internal navigation | React Router `<Link>`, no page reload |
| External links | `target="_blank" rel="noopener noreferrer"` |
| Anchor links | Smooth scroll with header offset |

---

## 4. Form Behavior

### 4.1 Contact Form

| Action | Behavior |
|--------|----------|
| Submit | Insert to `leads` table, show success toast |
| Validation | Client-side required fields (name, email) |
| Error | Toast notification with error message |
| Loading | Button disabled with loading indicator |
| Success | Form resets, success toast displayed |

### 4.2 Input Fields

- Border: `border-input` → `border-primary` on focus
- Transition: 200ms color transition
- Min height: 44px (touch target)
- Error state: `border-destructive` with error message below

---

## 5. State Management

### 5.1 Client State

| State | Storage | Scope |
|-------|---------|-------|
| Scroll position | In-memory | Per session |
| Active navigation | URL + scroll spy | Derived |
| Mobile menu open | `useState` | Component |
| Header visibility | Scroll listener | Component |
| SEO data | `useState` + `useMemo` | Per route |

### 5.2 Server State

| State | Source | Caching |
|-------|--------|---------|
| SEO metadata | `seo_meta` table | Fetched per route change |
| Blog posts | Static `blogData.ts` + DB | Build-time + runtime |
| Case studies | Static data files | Build-time |
| Leads | Write-only to DB | No read-back |

---

## 6. Loading States

| Context | Behavior |
|---------|----------|
| Page load | Suspense fallback (loading indicator) |
| Image load | Lazy loading with `loading="lazy"` |
| Data fetch (SEO) | Background fetch, no loading UI (falls back to static) |
| Form submission | Button loading state |
| Route change | Suspense boundary handles code-split chunks |

---

## 7. Error Handling

| Error | Behavior |
|-------|----------|
| Unknown route | Redirect to `/` (catch-all) |
| Unknown project | Fallback SEO with project ID in title |
| Failed SEO fetch | Silently fall back to static data |
| Form submission error | Toast with error message |
| Image load failure | Background color remains visible |

---

## 8. Performance Requirements

| Metric | Target |
|--------|--------|
| Largest Contentful Paint (LCP) | < 2.5s |
| First Input Delay (FID) | < 100ms |
| Cumulative Layout Shift (CLS) | < 0.1 |
| Time to Interactive (TTI) | < 3.5s |
| Total bundle size | Minimize via code splitting |

### 8.1 Optimization Strategies

- **Code splitting**: Route-level lazy loading via `React.lazy` + `Suspense`
- **Image optimization**: WebP format, responsive sizes, lazy loading
- **Font loading**: `display: swap` for web fonts
- **CSS**: Tailwind purges unused styles
- **Prerendering**: Static HTML for critical pages (SEO + performance)

---

## 9. Accessibility

| Requirement | Implementation |
|-------------|---------------|
| Keyboard navigation | All interactive elements focusable |
| Screen readers | Semantic HTML (`<main>`, `<nav>`, `<article>`, `<section>`) |
| Alt text | All images have descriptive alt attributes |
| Color contrast | WCAG AA minimum (enforced by design token system) |
| Touch targets | 44×44px minimum |
| Focus indicators | Visible for keyboard users (`:focus-visible`) |
| Reduced motion | Respect `prefers-reduced-motion` media query |
