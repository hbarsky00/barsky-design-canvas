# Design Token Specification

> **Authority**: This is the single source of truth for all design tokens used in barskydesign.pro.  
> **Location**: Tokens are defined in `src/index.css` (CSS variables) and mapped in `tailwind.config.ts`.  
> **Rule**: Components MUST use semantic Tailwind classes — never raw hex/rgb/hsl values in `className`.

---

## 1. Color System (Material Design 3.0)

All colors are HSL. CSS variables use the format `H S% L%` (without `hsl()` wrapper). Tailwind wraps them in `hsl()`.

### 1.1 Primary Palette

| Token | Variable | Light Value | Usage |
|-------|----------|-------------|-------|
| `--primary` | `--md-sys-color-primary` | `231 92% 58%` | Primary brand actions, links, active states |
| `--primary-foreground` | `--md-sys-color-on-primary` | `0 0% 100%` | Text/icons on primary surfaces |
| `--primary-container` | `--md-sys-color-primary-container` | `231 100% 96%` | Subtle primary backgrounds |
| `--on-primary-container` | `--md-sys-color-on-primary-container` | `231 100% 8%` | Text on primary containers |

### 1.2 Secondary Palette

| Token | Variable | Light Value | Usage |
|-------|----------|-------------|-------|
| `--secondary` | mapped from `secondary-container` | `220 20% 95%` | Low-emphasis backgrounds |
| `--secondary-foreground` | mapped from `on-secondary-container` | `220 30% 12%` | Text on secondary surfaces |

### 1.3 Tertiary / Accent Palette

| Token | Variable | Light Value | Usage |
|-------|----------|-------------|-------|
| `--accent` | mapped from `tertiary-container` | `263 100% 95%` | Accent backgrounds, highlights |
| `--accent-foreground` | mapped from `on-tertiary-container` | `263 100% 12%` | Text on accent surfaces |
| Tertiary direct | `--md-sys-color-tertiary` | `263 85% 67%` | Energetic purple accents |

### 1.4 Error / Destructive

| Token | Light Value | Usage |
|-------|-------------|-------|
| `--destructive` | `0 84% 60%` | Error states, destructive actions |
| `--destructive-foreground` | `0 0% 100%` | Text on error surfaces |

### 1.5 Surface System

| Token | Light Value | Usage |
|-------|-------------|-------|
| `--background` (surface) | `0 0% 99%` | Page background |
| `--foreground` (on-surface) | `220 15% 8%` | Primary body text |
| `--muted` (surface-container-high) | `220 30% 93%` | Muted backgrounds |
| `--muted-foreground` (on-surface-variant) | `220 12% 28%` | Secondary/caption text |
| `--card` (surface-container) | `220 25% 95%` | Card backgrounds |
| `--card-foreground` | `220 15% 8%` | Card text |
| `--border` (outline-variant) | `220 20% 82%` | Borders, dividers |
| `--input` | `220 20% 82%` | Input field borders |
| `--ring` | `231 92% 58%` | Focus rings |

### 1.6 Brand Colors

| Token | Maps To | Usage |
|-------|---------|-------|
| `--barsky-blue` | `--md-sys-color-primary` | Brand blue |
| `--barsky-dark` | `--md-sys-color-on-surface` | Dark text |
| `--barsky-text` | `--md-sys-color-on-surface` | Body text |
| `--barsky-text-light` | `--md-sys-color-on-surface-variant` | Muted text |
| `--barsky-accent` | `--md-sys-color-tertiary` | Accent purple |

### 1.7 Tech Stack Badge Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--tech-ai` | `187 100% 42%` | AI tool badges (cyan) |
| `--tech-dev` | `270 91% 65%` | Dev stack badges (purple) |
| `--tech-design` | `25 95% 53%` | Design tool badges (orange) |
| `--tech-badge-bg` | `220 20% 10%` | Badge background |

---

## 2. Typography Scale

Font families:
- **Display/Headings**: `Space Grotesk` → `font-display`
- **Body/UI**: `Inter` → `font-sans` / `font-body`
- **Code**: System monospace → `font-mono`

### Scale Reference

| Role | Tailwind Class | Size | Line Height |
|------|---------------|------|-------------|
| Display Large | `text-display-large` | 3.5625rem (57px) | 4rem (64px) |
| Display Medium | `text-display-medium` | 2.8125rem (45px) | 3.25rem (52px) |
| Display Small | `text-display-small` | 2.25rem (36px) | 2.75rem (44px) |
| Headline Large | `text-headline-large` | 2rem (32px) | 2.5rem (40px) |
| Headline Medium | `text-headline-medium` | 1.75rem (28px) | 2.25rem (36px) |
| Headline Small | `text-headline-small` | 1.5rem (24px) | 2rem (32px) |
| Title Large | `text-title-large` | 1.375rem (22px) | 1.75rem (28px) |
| Title Medium | `text-title-medium` | 1rem (16px) | 1.5rem (24px) |
| Title Small | `text-title-small` | 0.875rem (14px) | 1.25rem (20px) |
| Body Large | `text-body-large` | 1rem (16px) | 1.5rem (24px) |
| Body Medium | `text-body-medium` | 0.875rem (14px) | 1.25rem (20px) |
| Body Small | `text-body-small` | 0.75rem (12px) | 1rem (16px) |
| Label Large | `text-label-large` | 0.875rem (14px) | 1.25rem (20px) |
| Label Medium | `text-label-medium` | 0.75rem (12px) | 1rem (16px) |
| Label Small | `text-label-small` | 0.6875rem (11px) | 1rem (16px) |

### Responsive Mapping

| Context | Mobile | Tablet+ | Desktop+ |
|---------|--------|---------|----------|
| Hero H1 | `display-small` | `display-medium` | `display-large` |
| Section Title | `headline-medium` | `headline-large` | `headline-large` |
| Subsection | `title-medium` | `title-large` | `title-large` |
| Eyebrow | `label-small` | `label-medium` | `label-large` |

---

## 3. Elevation / Shadow System

| Tailwind Class | Token | Description |
|---------------|-------|-------------|
| `shadow-elevation-0` | Level 0 | No shadow |
| `shadow-elevation-1` | Level 1 | Subtle resting state |
| `shadow-elevation-2` | Level 2 | Cards, raised surfaces |
| `shadow-elevation-3` | Level 3 | Dialogs, elevated cards |
| `shadow-elevation-4` | Level 4 | Hover states |
| `shadow-elevation-5` | Level 5 | Maximum elevation (modals) |

### Special Shadows

| Variable | Value | Usage |
|----------|-------|-------|
| `--shadow-glow` | `0 0 32px hsl(231 92% 58% / 0.15)` | Brand glow on buttons |
| `--shadow-glow-hover` | `0 0 48px hsl(231 92% 58% / 0.25)` | Hover glow |
| `--shadow-soft` | `0 4px 20px rgba(0,0,0,0.03)` | Gentle card lift |
| `--shadow-medium` | `0 8px 40px rgba(0,0,0,0.08)` | Prominent sections |
| `--shadow-large` | `0 16px 64px rgba(0,0,0,0.12)` | Hero/modal depth |

---

## 4. Shape / Border Radius

| Tailwind | Token | Value | Usage |
|----------|-------|-------|-------|
| `rounded-none` | corner-none | 0px | Hard edges |
| `rounded-xs` | corner-extra-small | 4px | Badges, chips |
| `rounded-sm` | corner-small | 8px | Small cards |
| `rounded-md` | corner-medium | 12px | Default (buttons, inputs) |
| `rounded-lg` | corner-large | 16px | Cards, containers |
| `rounded-xl` | corner-extra-large | 28px | Prominent cards |
| `rounded-full` | corner-full | 9999px | Pills, avatars |

---

## 5. Gradient System

| Variable | Value | Usage |
|----------|-------|-------|
| `--gradient-primary` | `135deg, primary → tertiary` | Hero CTAs, brand emphasis |
| `--gradient-secondary` | `135deg, secondary → secondary-container` | Subtle section bgs |
| `--gradient-accent` | `135deg, tertiary → chart-4` | Highlights |
| `--gradient-surface` | `180deg, white → surface-container-low` | Page section transitions |
| `--gradient-glass` | `135deg, white/90 → white/60` | Glass morphism |

---

## 6. Animation Curves

| Variable | Value | Usage |
|----------|-------|-------|
| `--ease-spring` | `cubic-bezier(0.175, 0.885, 0.32, 1.275)` | Bouncy interactions |
| `--ease-out-expo` | `cubic-bezier(0.19, 1, 0.22, 1)` | Smooth exits |
| `--ease-out-quart` | `cubic-bezier(0.25, 1, 0.5, 1)` | Natural deceleration |
| `--ease-anticipate` | `cubic-bezier(0.68, -0.55, 0.265, 1.55)` | Dramatic spring |

---

## 7. Spacing & Layout

| Token | Value | Usage |
|-------|-------|-------|
| `safe-top/right/bottom/left` | `env(safe-area-inset-*)` | Mobile notch/safe areas |
| `min-w-touch` / `min-h-touch` | `44px` | Minimum tap target size |
| Container max-width | `1400px` (2xl) | Content container |
| Container padding | `2rem` | Default horizontal padding |

### Breakpoints

| Name | Value | Description |
|------|-------|-------------|
| `xs` | 375px | Small phones |
| `sm` | 640px | Large phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | Small desktops |
| `xl` | 1280px | Large desktops |
| `2xl` | 1536px | Ultra-wide |
| `mobile` | max: 767px | Mobile-only styles |
| `tablet` | 768–1023px | Tablet-only styles |
| `desktop` | min: 1024px | Desktop-only styles |

---

## 8. Enforcement Rules

1. **Never** use raw color values (`text-white`, `bg-blue-600`, `#hex`) in component `className`
2. **Always** use semantic tokens (`text-foreground`, `bg-primary`, `text-muted-foreground`)
3. **Gradients** must reference CSS variables, not inline values
4. **New colors** must be added to `:root` in `index.css` first, then mapped in `tailwind.config.ts`
5. **Dark mode** is defined in `.dark` class — tokens auto-switch
6. **Typography** uses the MD3 scale — never arbitrary font sizes
7. **Shadows** use the elevation system — never arbitrary box-shadow values
