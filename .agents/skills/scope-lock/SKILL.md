---
name: scope-lock
description: Apply when the user invokes "scope lock", asks for the smallest possible diff, or warns against refactoring/restyling/touching unrelated code. Forces single-task, minimal-diff edits with a stop-and-ask on ambiguity and a file report at the end.
---

# Scope Lock — Stop Over-Editing

Use whenever the user signals scope discipline ("scope lock", "smallest diff", "only change X", "don't touch anything else"). Default to this discipline on any narrow visual/CSS fix on this project — past sessions have over-reached and broken working code.

## Rules (non-negotiable)

- Change ONLY what the task explicitly requires. Smallest possible diff.
- Do NOT refactor, rename, reformat, reorganize, or "improve" code outside the task.
- Do NOT modify unrelated files. Do NOT add/upgrade/remove dependencies.
- Do NOT change design tokens, theme, routing, global styles, state, or component APIs unless the task names them.
- Preserve all existing behavior, styling, and layout the task doesn't mention.

## Workflow

1. **Before editing:** Restate the task in one sentence. List the exact files you intend to touch. If the task is ambiguous or appears to need anything outside its named scope — STOP and ask. Do not guess.
2. **Edit:** Prefer `code--line_replace` over rewrites. Target only the specific lines/classes the task names.
3. **After editing:** List every file changed with the specific lines/classes, and confirm what you deliberately left untouched.

## Bundled requests

If the user sends multiple changes in one prompt, treat each as a separate task and either (a) ask which to do first, or (b) do them as clearly delimited, independently minimal diffs.

## When the user says "you changed X, outside scope"

Revert X immediately. Keep only the originally requested change. Do not negotiate.
