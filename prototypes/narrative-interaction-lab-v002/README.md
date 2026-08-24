# Narrative Interaction Lab v002

A dependency-free long-form formative prototype that attempted to test the **arrangement ecology** in *Managed Decline*.

## Status: failed early

The prototype is retained as historical implementation and evidence. On 2026-08-24 the tester abandoned it after roughly two minutes and reported that it was boring, not funny and had no clear emotional journey.

This is treated as a **hard failure of the prototype construction**, not a request for a polish pass. The arrangement ecology may remain useful as hidden causal machinery, but this version mistakenly treated causal arrangement structure as sufficient content architecture.

See:

- `findings/001-2026-08-24-early-abandonment.md`

Do not use v002 as the current playtest baseline. The next conceptual prototype is `narrative-interaction-lab-v003`, an 8–12 minute slice focused first on immediate hook, comedy, character desire, deliberate emotional movement, escalation, payoff and desire to continue.

## What v002 attempted

**One Evening on Moor Lane** began after work with no assigned mission. Three physical places were active:

- **Bellwether Rooms** — a community hall with a real electrical fault, a passed main room, and no current authorised caretaker;
- **The Crown & Anchor** — the council's substitute venue, genuinely useful but materially different from the public claim of seamless continuity;
- **Moor Lane Stop** — where Tabitha had found an old Bellwether key while the last-bus window shortened.

The player could visit any two locations in either order. The unvisited situation then interrupted by phone. An online neighbourhood voice room provided a fourth social space before three foreground arrangements converged.

The prototype implemented hidden state for presence, commitments, information, access, limited material state, relationship positions and residue while keeping the player-facing interaction dialogue-first.

## Why it failed

The implementation began from the causal model rather than from a compelling emotional/comic experience. It supplied several reasonable situations before supplying a reason to care about any of them. Its characters were too reasonable, its satire too understated, and its emotional progression too flat.

The central correction is:

> **The arrangement ecology should explain how compelling drama becomes interactive and consequential. It does not generate compelling drama by itself.**

## Historical run instructions

Requires Node.js 18+.

```bash
cd prototypes/narrative-interaction-lab-v002
npm start
```

Open:

```text
http://127.0.0.1:4173
```

For hidden-state design debugging:

```text
http://127.0.0.1:4173/?annotate=1
```

## Validation

```bash
npm test
npm run check
```

The validator checks structural properties only. Structural correctness did not prevent experiential failure; that is itself an important finding from this version.

## Telemetry

Run traces remain local-only and export as readable JSON.

## Evidence discipline

Do not promote v002 design choices into accepted game design merely because they are implemented. Findings produced by this version belong under its own `findings/` directory.
