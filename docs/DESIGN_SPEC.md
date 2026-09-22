# Design Specification

> **Authority**: Visual language and layout rules for barskydesign.pro.  
> **Companion Docs**: `DESIGN_TOKEN_SPEC.md` (tokens), `BUTTON_SPEC.md` (buttons)

---

## 1. Design Philosophy

- **Aesthetic**: Premium, editorial, glass-morphic — inspired by award-winning design portfolios
- **Tone**: Professional yet approachable; high-craft, not corporate
- **Target Audience**: Hiring managers, product leaders, potential clients evaluating UX design services
- **Differentiation**: Material Design 3.0 foundation with custom gradient overlays, glass effects, and micro-animations

---

## 2. Color Usage Guidelines

### 2.1 Background Hierarchy

| Context | Token | Notes |
|---------|-------|-------|
| Page background | `bg-background` | Near-white (`0 0% 99%`) |
| Alternate sections | `bg-muted` or surface-container variants | Subtle differentiation |
| Card surfaces | `bg-card` | Slight contrast from page |
| Hero/CTA sections | `--gradient-primary` or dark gradient | High-impact sections |
| Glass overlays | `--gradient-glass` + `backdrop-blur` | Premium panels |

### 2.2 Text Color Hierarchy

| Role | Token | Notes |
|------|-------|-------|
| Primary headings | `text-foreground` | Near-black for max readability |
| Body copy | `text-foreground` | Same as headings |
| Secondary/captions | `text-muted-foreground` | Lighter for hierarchy |
| On dark backgrounds | `text-primary-foreground` (white) | Via button variants, not raw classes |
| Links | `text-primary` | Brand blue |
| Accent highlights | `text-accent-foreground` | Purple accent |

### 2.3 Contrast Rules (CRITICAL)

- **WCAG AA minimum** (4.5:1 for body text, 3:1 for large text)
- Dark text on dark backgrounds = **FORBIDDEN**
- Light text on light backgrounds = **FORBIDDEN**
- Use button **variants** (not className overrides) for text color on colored backgrounds
- When in doubt, use the variant system — see `BUTTON_SPEC.md`

---

## 3. Typography Guidelines

### 3.1 Hierarchy

| Element | Font | Weight | Size Class | Notes |
|---------|------|--------|------------|-------|
| Hero H1 | Space Grotesk | Bold (700) | `text-display-small` → `text-display-large` responsive | Single H1 per page |
| Section H2 | Space Grotesk | Semibold (600) | `text-headline-medium` → `text-headline-large` | Clear section breaks |
| Subsection H3 | Space Grotesk | Medium (500) | `text-title-medium` → `text-title-large` | Within sections |
| Body | Inter | Regular (400) | `text-body-large` | Max-width 65ch for readability |
| Caption | Inter | Regular (400) | `text-body-small` | Muted foreground color |
| Eyebrow | Inter | Medium (500) | `text-label-small` → `text-label-large` | Uppercase tracking-wide |
| Button label | Inter | Medium–Semibold | `text-label-large` | Defined in button variants |

### 3.2 Rules

- **One H1 per page** — must match primary intent and contain main keyword
- **No arbitrary font sizes** — use the MD3 type scale
- **Max line width**: 65ch for body text (via `max-w-prose` or explicit `max-width`)
- **Eyebrow labels**: Always uppercase with `tracking-widest` or `tracking-wide`

---

## 4. Layout System

### 4.1 Page Structure

```
┌─────────────────────────────────────┐
│ Header (fixed, z-50)                │
├─────────────────────────────────────┤
│ Hero Section                        │
├─────────────────────────────────────┤
│ Content Sections (alternating bg)   │
│ ┌───────────────────────────────┐   │
│ │ max-w-7xl mx-auto px-4–8     │   │
│ └───────────────────────────────┘   │
├─────────────────────────────────────┤
│ CTA Section (gradient bg)           │
├─────────────────────────────────────┤
│ Footer                              │
└─────────────────────────────────────┘
```

### 4.2 Grid & Containers

| Element | Max Width | Padding |
|---------|-----------|---------|
| Content container | `max-w-7xl` (1400px) | `px-4 sm:px-6 lg:px-8` |
| Narrow content (text) | `max-w-3xl` | Centered with `mx-auto` |
| Card grid | `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` | `gap-6 lg:gap-8` |
| Case study images | `max-w-[1200px]` (hero) / `max-w-[900px]` (standard) | `mx-auto` |

### 4.3 Spacing Rules

| Context | Vertical | Notes |
|---------|----------|-------|
| Between major sections | `py-16 md:py-24` | Generous breathing room |
| Section title → content | `mb-8 md:mb-12` | Clear hierarchy |
| Card internal padding | `p-6 md:p-8` | Comfortable reading |
| Inline element gap | `gap-3` or `gap-4` | Consistent micro-spacing |

---

## 5. Component Guidelines

### 5.1 Cards

- Background: `bg-card` with `shadow-elevation-1` or `shadow-elevation-2`
- Border: `border border-border` (subtle)
- Radius: `rounded-lg` or `rounded-xl`
- Hover: Scale up `hover:scale-[1.02]` with `shadow-elevation-3` or `shadow-elevation-4`
- Transition: `transition-all duration-300`
- **Never** hardcode card colors — always use `bg-card text-card-foreground`

### 5.2 Buttons

See `BUTTON_SPEC.md` for complete specification. Key rules:
- Always use a variant — never override variant colors with className
- className is for layout only (`w-full`, `py-5`)
- On dark backgrounds → `variant="on-dark"` or `variant="brand"`
- On images → `variant="on-image"` or `variant="elevated"`

### 5.3 Images

- **Case Study Hero**: 16:9 aspect ratio, `max-w-[1200px]`, `rounded-2xl md:rounded-3xl`
- **Case Study Standard**: Free aspect, `max-w-[900px]`, `rounded-2xl`
- **All images**: Must have descriptive `alt` text with keywords
- **Quality**: Use `.image-high-quality` utility for crisp rendering
- **Hover**: Subtle `scale(1.02)` on case study images
- **Lazy loading**: All below-fold images use `loading="lazy"`

### 5.4 Icons

- Library: Lucide React
- Size: Consistent with context (`h-4 w-4` for buttons, `h-5 w-5` for nav, `h-6 w-6` for features)
- Color: Inherit from parent (`currentColor`) — never hardcode icon colors

---

## 6. Animation Guidelines

### 6.1 Page-Level Animations

| Element | Animation | Library |
|---------|-----------|---------|
| Section entrances | Fade up + slide | Framer Motion (scroll-triggered) |
| Hero elements | Staggered reveal | Framer Motion |
| Page transitions | Fade | React Router |

### 6.2 Micro-Interactions

| Element | Effect | Duration |
|---------|--------|----------|
| Buttons | Scale 1.02 + glow shadow | 300ms |
| Cards | Scale 1.02 + elevation lift | 300ms |
| Links | Color transition | 200ms |
| Navigation | Background opacity on scroll | 500ms |

### 6.3 Rules

- **Performance**: Use `will-change-transform` sparingly, only on animated elements
- **Reduce motion**: Respect `prefers-reduced-motion` — disable all non-essential animations
- **Duration**: Most interactions 200–500ms; never exceed 1s for UI elements
- **Easing**: Use design token curves (`--ease-spring`, `--ease-out-expo`)

---

## 7. Responsive Design

### 7.1 Mobile-First Approach

All styles are mobile-first. Desktop overrides use `md:` and `lg:` prefixes.

### 7.2 Touch Targets

- Minimum 44×44px for all interactive elements (`min-h-touch min-w-touch`)
- Adequate spacing between tap targets (min 8px gap)

### 7.3 Safe Areas

- Use `safe-area-inset-*` env variables for notched devices
- Hero container uses `.hero-container-mobile` for proper edge-to-edge padding

### 7.4 Key Breakpoint Behaviors

| Feature | Mobile (<768) | Tablet (768–1023) | Desktop (1024+) |
|---------|---------------|-------------------|-----------------|
| Navigation | Hamburger menu | Hamburger menu | Horizontal nav |
| Card grid | 1 column | 2 columns | 3 columns |
| Hero H1 | display-small | display-medium | display-large |
| Section padding | py-12 px-4 | py-16 px-6 | py-24 px-8 |
| Header | Appears after hero scroll | Always visible | Always visible |
