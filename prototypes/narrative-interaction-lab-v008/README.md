# Narrative Interaction Lab v008 — The Old Build

**Status:** internally approved for external playtest after exact-branch CI

**Runtime:** imports `../narrative-interaction-harness-v002/`; does not copy or modify the harness core

**Internal review:** [`findings/000-2026-08-29-internal-preflight.md`](./findings/000-2026-08-29-internal-preflight.md)

## Baseline and evidence

V008 inherits:

- v003's accepted entertainment hierarchy: hook, character magnetism, authored movement, meaningful participation and acknowledgement before hidden systems;
- v006b's compact lived-space / focused-VN grammar, elastic time and meaningful positioning;
- the merged prototype policy and release-gate separation between runtime reliability, interaction design and writing quality;
- v007–v007d failure evidence: no group curriculum, empty company, monologue-as-interaction, relationship-slogan choices, bespoke route engines or user-discovered stale prompts.

## Question

> **Can a short one-to-one Tabitha interaction feel like enjoyable shared activity—with both people initiating, short natural exchanges, player-authored residue and meaningful map/VN continuity—rather than a monologue or a small scripted investigation?**

## Premise

A forgotten council kiosk in the community-hall lobby still contains an archived build of the programme that turned Tabitha into a cautionary character.

Tabitha approaches it herself. The pair can:

- answer one of its ridiculous questions;
- react to an unused recording;
- accidentally open facilitator tools;
- retrieve a printed personal resilience plan;
- amend its facilitator notes;
- decide where the physical sheet remains.

This is controlled prototype material, not accepted production canon.

## Interaction shape

```text
TABITHA LEAVES THE ENTRANCE FOR THE KIOSK
        ↓
player follows / leaves
        ↓
operate the archived question together
        ↓
short outtake reaction
        ↓
Tabitha opens facilitator tools
        ↓
printer starts in live space
        ↓
player follows and takes the sheet
        ↓
amend the facilitator notes
        ↓
return to live space holding the artefact
        ↓
pin / return / give / take away / leave
```

No relationship meter, future-date reward or “real you” reassurance is used to certify progression. The changed artefact, callbacks and physical destination are the residue.

## Internal gates passed

Local prepublication verification:

- **11/11** unit and writing checks;
- **5/5** rendered Chromium tests;
- rapid repeated-input protection;
- cancel/resume;
- immediate voluntary exit;
- two distinct complete artefact destinations;
- completed trace with zero audit errors or warnings;
- maximum three pre-choice turns in any focused node;
- no local engine, VN controller or duplicated runtime.

## Run

Requires Node.js 22+.

```bash
cd prototypes/narrative-interaction-lab-v008
npm test
npm start
```

Open:

```text
http://127.0.0.1:4188
```

## Controls

- `WASD` / arrows — move;
- `E` / `Enter` — use the contextual action;
- `Tab` — cycle when more than one nearby action exists;
- `1–4` — choose during focused interaction;
- `Esc` — leave focused interaction and return to the live space.

## External playtest

Do not cover every option. Follow or leave Tabitha according to actual interest.

Primary question:

> **Did this feel like doing something with Tabitha that was enjoyable in itself, or could you still feel the game delivering a packaged interaction?**

Useful feedback concerns:

- desire to continue spending time with her;
- whether the writing sounds natural and specific;
- whether the programme is fun to operate or feels like another menu;
- whether map transitions add to the interaction;
- whether the amended sheet feels like meaningful residue;
- any point where attention drops.

Basic runtime, duplicate-input, route and trace QA should already have been handled internally.
