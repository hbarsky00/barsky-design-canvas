# Button Design, Behavior & Function Spec

## Core Principle
**Every button must use a variant. Never override variant colors with className.**

---

## Variant Reference

| Variant | Background | Text | Use Case |
|---------|-----------|------|----------|
| `filled` (default) | Primary gradient → purple | **White** | Primary actions (Submit, Save, Send) |
| `brand` | Primary → blue → purple gradient | **White** | Hero CTAs, prominent actions |
| `outline` | Transparent | Primary color | Secondary actions alongside filled/brand |
| `case-study` | Transparent → gradient on hover | Primary → **White** on hover | Card CTAs for case studies |
| `on-dark` | White/10 | **White** | Buttons on dark/gradient backgrounds |
| `on-image` | Black/40 | **White** | Buttons overlaying images |
| `elevated` | White → gray gradient | Primary | Overlay buttons on light image hovers |
| `ghost` | Transparent | Primary | Tertiary/minimal actions |
| `text` | Transparent | Primary | Inline text-level actions |
| `link` | None | Primary underline | Inline links |
| `destructive` | Red gradient | **White** | Delete/dangerous actions |
| `secondary` | Secondary bg | Secondary foreground | Low-emphasis actions |
| `filled-tonal` | Secondary | Secondary foreground | Medium-emphasis alternative |
| `high-contrast` | Dark gray | **White** | Maximum contrast needed |

---

## Rules (MUST FOLLOW)

### 1. Never hardcode colors on buttons
```tsx
// ❌ WRONG — dark blue bg + dark text = unreadable
<Button className="bg-blue-600 text-blue-700">

// ❌ WRONG — overriding variant colors defeats the system
<Button variant="brand" className="bg-white text-blue-600">

// ❌ WRONG — forcing colors with !important
<Button className="!text-white [&_*]:!text-white">

// ✅ CORRECT — use the right variant
<Button variant="brand">
<Button variant="on-dark">
<Button variant="elevated">
```

### 2. Use `variant="outlined"` → DOES NOT EXIST. Use `variant="outline"`
```tsx
// ❌ WRONG — falls back to default "filled" 
<Button variant="outlined">

// ✅ CORRECT
<Button variant="outline">
```

### 3. Buttons on dark/gradient backgrounds
```tsx
// ❌ WRONG
<Button variant="secondary" className="bg-white/10 text-white">

// ✅ CORRECT
<Button variant="on-dark">
```

### 4. Buttons overlaying images (hover states on cards)
```tsx
// ❌ WRONG
<Button variant="outline" className="bg-white/90 hover:bg-white border-gray-300">

// ✅ CORRECT
<Button variant="elevated">   // white bg, primary text
<Button variant="on-image">   // for dark image overlays
```

### 5. className is for layout only
Allowed in className: `w-full`, `sm:w-auto`, `py-5`, `px-8`, `font-semibold`
Forbidden in className: Any `text-*`, `bg-*`, `border-*` color classes, `!important` overrides

### 6. Contrast rule
- Dark backgrounds (blue, purple, gradient, image) → text MUST be white → use `filled`, `brand`, `on-dark`, `on-image`, `destructive`
- Light backgrounds → text can be primary/dark → use `outline`, `elevated`, `ghost`, `secondary`
- NEVER: dark text on dark bg, light text on light bg

---

## Context-Specific Guidance

### Hero Section
- Primary CTA: `variant="brand" size="lg"`
- Secondary CTA: `variant="outline" size="lg"`

### Case Study Cards
- View Case Study: `variant="case-study"`
- View Live: `variant="outline"`

### Image Hover Overlays
- On dark image overlay: `variant="on-image"` or `variant="elevated"`

### Contact/CTA Sections (gradient bg)
- Primary: `variant="on-dark"` or white bg button
- Secondary: `variant="on-dark"`

### Forms
- Submit: `variant="filled"` (default, no extra classes needed)

### Navigation/Toolbar
- Actions: `variant="ghost" size="sm"` or `variant="ghost" size="icon"`
