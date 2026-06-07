---
name: self-audit
description: Run a mandatory self-check before claiming any task is complete. Verifies scope was respected, no assumptions were made, requested replacements actually replaced (not duplicated), and failed attempts were reverted. Triggers on task completion, "done", "fixed", "shipped", or before any closing summary on this project.
---

# Self-Audit Before Done

You have a track record of declaring tasks complete while: changing things the user didn't ask for, duplicating instead of replacing, stacking speculative fixes without reverting failed ones, and re-introducing rejected ideas. This skill exists because the user is tired of catching these.

Run this audit silently BEFORE writing the closing sentence. If any check fails, fix it before responding — do not ship the response and apologize after.

## The 6-point audit

For every task, before you respond "done" in any form, verify:

1. **Exact ask.** Restate in one sentence what the user literally asked for. If your diff does more than that sentence, cut the extra.
2. **Replace means replace.** If the user said "replace X with Y" / "change X to Y" / "swap X for Y": confirm X is GONE from the rendered output, not sitting next to Y. Duplication = failure.
3. **No invented additions.** No halos, scrims, overlays, gradients, animations, tooltips, controls, toggles, "subtle" polish, or adjacent refactors unless explicitly requested.
4. **No rejected ideas resurrected.** Scan recent turns + memory for things the user removed or banned (user selectors, floating widgets, transition systems, runtime fixers, etc.). Confirm none crept back in.
5. **Failed attempts reverted.** If a previous attempt in this thread didn't work, the code from that attempt is removed — not layered under the new attempt.
6. **Verified, not assumed.** For visual/behavior changes: read the file post-edit (or check preview/logs) to confirm the change actually lands. "Should work" is not verified.

## Output rule

- If all 6 pass: respond with one short sentence. Do not list the audit.
- If any failed and you fixed it: respond with one short sentence describing the final state. Do not narrate the audit.
- If something is genuinely ambiguous: STOP and ask one focused question instead of shipping.

## Hard bans

- No "I think this is fixed" / "this should now work" / "try refreshing". Verify first.
- No bonus "while I was in there" changes mentioned in the closing.
- No apology-then-ship. Fix, then ship.

## Pairs with

- `no-assumptions` — governs intent.
- `scope-lock` — governs diff size.
- This skill — governs the moment before you hit send.
