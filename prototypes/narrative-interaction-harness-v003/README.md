# Narrative Interaction Harness v003 — Player-Facing Baseline Recovery

**Status:** internal control / infrastructure milestone — not an external playtest build

**Runtime:** reuses `../narrative-interaction-harness-v002/src/engine.js`, scenario contract and trace auditor

**Player-facing baseline:** restores the strongest accepted v006b presentation scale and focused-VN treatment instead of inheriting harness v002's generic compact shell

## Purpose

V008 proved that runtime reliability and player-facing experience must remain separate concerns. Harness v002 successfully prevents stale affordances and duplicate-input loops, but its generic presentation regressed already-tested UX.

Harness v003 therefore keeps the reliable runtime and replaces only the player-facing shell.

The internal control uses known-good v003-style Tabitha material. It is not a new story test. The question is narrower:

> **Can the reliable runtime reproduce the scale, readability, focused-VN emphasis and low-burden map presentation that had already worked before new interaction design is attempted?**

## Recovered presentation contract

- player-facing shell uses up to 1120px rather than the compact 980px generic harness;
- map stage uses substantial viewport height (`min(72vh, 650px)`);
- important situation/context text persists until superseded;
- state-change feedback also persists until the next meaningful change;
- no important narrative information is placed in a two-second disappearing toast;
- focused VN is centred and visually dominant: up to 1000px wide, at least 560px tall;
- focused dialogue uses approximately 27px serif text at desktop sizes;
- controls remain sparse and contextual;
- no dashboard, objective list or permanent developer log.

## Golden control

The control deliberately reuses the *kind* of material that succeeded in v003:

- Tabitha beside the player during an absurd public-sector training presentation;
- immediate joke and character pull;
- short focused dialogue turns;
- clear choices that can be understood on first reading;
- Tabitha remains socially and spatially with the player rather than becoming a waypoint.

The control is not intended to generate new design evidence. It exists to catch presentation regression.

## Run

```bash
cd prototypes/narrative-interaction-harness-v003
npm test
npm start
```

Open `http://127.0.0.1:4190`.

## Promotion rule

Future narrative prototypes should use this player-facing shell (or deliberately re-test it) while continuing to use harness v002's runtime contract.

A new prototype may not shrink the UI, reintroduce transient important text, or change focused-VN scale merely because a new scenario is being tested.
