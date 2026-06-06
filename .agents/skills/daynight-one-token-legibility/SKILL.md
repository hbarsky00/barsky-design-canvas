# Skill: Day/Night Hero Legibility — One Token, Cardless, Aligned (Lovable)

**Use when:** A hero has a day/night theme where the DAY sky is genuinely light,
and text/pills go invisible in day, a card keeps reappearing, or rows look
misaligned.

**Corrects** the cardless-hero skill's "white text everywhere" rule. That rule
only works when the background is always dark. On a genuinely light day sky,
white text physically cannot read — day needs DARK text.

---

## The root cause

White text on a light background never passes contrast — no shadow or wash fully
saves it. A theme that goes truly light MUST use dark text in day and light text
at night. The breakage comes from MIXED colors: some elements hardcoded white,
some dark, a card present in one theme. The fix is one shared color token used by
everything, plus removing the card.

---

## The rule

1. **No card, either theme.** No panel/background/blur/border/rounded box behind
   the content. No theme-conditional version.
2. **One text color token, everywhere.** Every text element AND every pill label
   reads from the same token: dark (e.g. `slate-900`) in day, near-white (e.g.
   `slate-50`) at night. Zero hardcoded whites or darks anywhere.
3. **Pills use the token too** — border + label, visible in both themes.
4. **Aligned:** uniform pill width, descriptions on one left edge, each
   vertically centered with its pill, whole block centered at all breakpoints.

---

## Ready-to-paste Lovable prompt (scope-locked)

> ## SCOPE LOCK
> **TASK:** Fix the day-mode hero so text and pills are readable, remove the card
> in both themes, and fix description alignment. Same component, four steps.
>
> **STEP 1 — Kill the card (both themes).** Remove the panel behind the product
> block entirely — background, blur, border, rounded corners, shadow. No
> `dark:`/`light:` conditional version. Content sits directly on the sky in both
> themes.
>
> **STEP 2 — One text color, theme-aware (the real fix).** White text is
> invisible on the light day sky. Make EVERY text element read from ONE shared
> theme color token: dark (e.g. `slate-900`) in day/light, near-white (e.g.
> `slate-50`) in night/dark. Includes "Hey there! I am", the name, subtitle,
> tagline, the SHIPPED PRODUCTS / CONCEPT GAMES labels, the product pill labels,
> AND the descriptions. No element keeps a hardcoded white or dark — they ALL use
> the same token. Before editing, list every place a text color is currently
> hardcoded (especially whites) so none are missed.
>
> **STEP 3 — Pills visible in both themes.** Give the pills a border and label
> using that same token (dark border + label in day, light at night). Clearly
> visible against the sky in both.
>
> **STEP 4 — Align descriptions.** Make all pills the same width. Align every
> description to a single consistent left edge in a column right of the pills.
> Vertically center each description with its pill. Center the whole block
> horizontally at all breakpoints.
>
> **RULES:** smallest diff, touch only the hero component, do NOT change the
> gradient/sun/mountains. Restate the task and list files before editing. List
> every file and line changed.

---

## Verify after

- **Day:** every line, every pill label, every description is dark and clearly
  legible against the bright sky. No card.
- **Night:** everything light and legible. No card.
- All breakpoints: block centered, pills uniform, descriptions on one edge.

---

## The one honest limit (the transition midpoint)

A single token flips dark→light at a threshold mid-transition. At the exact
crossover the sky is medium-toned and contrast dips for a split second. That is
unavoidable with a cardless single-color approach. The ONLY way to be perfect at
every point of the transition is a full-bleed darkening wash + always-light text
(see the daytime-contrast-wash skill) — but that mutes the day sky, which is the
tradeoff you rejected. Cardless = accept the brief crossover dip. Pick your
poison; you can't have cardless AND perfect-at-every-frame.
