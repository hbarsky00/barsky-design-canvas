---
name: sun-moon-arc
description: Use when a hero has a day/night theme but the sun/moon sit in a fixed spot. Makes the active celestial body rise, arc across, and set in sync with the sky transition. Single-driver rule — sun and sky must read from the same transition value, never two independent timers. Pairs with cardless-hero-text (a moving glow is only safe over shadowed text, not theme-bound colors).
---

# Sun/Moon Arc Synced to Day-Night Transition (Lovable)

**Use when:** A hero has a day/night theme but the sun (and moon) sit in a fixed spot. Goal: the active celestial body rises on one side, arcs across, and sets on the other — in sync with the sky transition.

## The one rule that makes it work

**Single driver.** The sun's position and the sky gradient must read from the SAME transition value (the same progress variable / scroll / timer that already animates day→night). Two separate animations = sun in the wrong place for the sky color = looks broken. Sync first, prettify second.

## Why it's safe to add now

The hero text is cardless with a text-shadow (see `cardless-hero-text`), so the bright glow can travel anywhere and the text still reads. A moving sun would break a theme-bound-color approach — it does not break a shadowed one.

## Caveats to bake in

- **No collisions.** The arc must never put the sun/moon under the theme-toggle (palette) button or directly behind the headline.
- **Mobile containment.** Scale the arc down on small screens so the body stays on-screen, not clipped at the edges.
- **One body at a time.** Sun visible in day, moon in night; the moon should be up when the sun is down (they're inverses).

## Sequencing note

This skill moves the sun, and the alignment/mountains prompt touches the same hero background area. Run them one at a time with a check between. Recommended order: **cardless text → alignment/mountains → sun arc** — the arc is the polish layer on top of a stable composition.

---

## Ready-to-paste Lovable prompt (scope-locked)

> ## SCOPE LOCK
>
> **TASK:** Make the sun and moon arc across the sky in sync with the day/night transition — rise on one side, set on the other — instead of sitting in a fixed spot.
>
> 1. Drive the celestial body's position from the SAME transition value that already controls the day/night gradient. Do NOT create a separate independent timer — sun/moon and sky must stay in sync.
> 2. Sun (day): rises from the lower-left, arcs up across the top, lowers toward the lower-right as night approaches. Moon (night): the inverse — up while the sun is down, arcing across and lowering as day returns. Use a shallow parabolic arc (horizontal left→right, vertical peaking near center-top). Clean optional implementation: place sun and moon 180° apart on one circular track so the moon rises as the sun sets.
> 3. Keep the arc CONTAINED — the sun/moon must never overlap the theme-toggle (palette) button or sit behind the headline. Scale the arc down on mobile so it stays on-screen.
> 4. Do NOT change the gradient colors, the text, the mountains, or the layout — only the sun/moon position and the moon's appearance during the arc.
>
> **RULES:** smallest diff, touch only the hero background / celestial component. Restate the task and list the files before editing, stop and ask if anything is ambiguous, list every file and class you changed when done.

---

## Verify after

- Run the full day→night transition: the sun descends on one side exactly as the moon rises, and both track the sky color (no body stuck in a bright sky or a dark one).
- Check mobile, tablet, desktop: the body stays on-screen and never collides with the toggle button or the headline.
- Confirm the text (cardless + shadow) still reads at every point in the arc.

## Pairs with

- `cardless-hero-text` — prerequisite. The moving glow is only safe over shadowed text.
- `scope-lock` — embedded in the prompt (restate, list files, smallest diff, stop on ambiguity).
