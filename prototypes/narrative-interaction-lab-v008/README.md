# Narrative Interaction Lab v008 — The Old Build

**Status:** failed external playtest — retained as evidence; do not patch forward

**Runtime:** imports `../narrative-interaction-harness-v002/`; does not copy or modify the harness core

**Internal review:** [`findings/000-2026-08-29-internal-preflight.md`](./findings/000-2026-08-29-internal-preflight.md)

**External failure:** [`findings/001-2026-08-29-external-playtest-ux-chase-comprehension.md`](./findings/001-2026-08-29-external-playtest-ux-chase-comprehension.md)

## Baseline and evidence

V008 attempted to inherit:

- v003's accepted entertainment hierarchy: hook, character magnetism, authored movement, meaningful participation and acknowledgement before hidden systems;
- v006b's compact lived-space / focused-VN grammar, elastic time and meaningful positioning;
- the merged prototype policy and release-gate separation between runtime reliability, interaction design and writing quality;
- v007–v007d failure evidence: no group curriculum, empty company, monologue-as-interaction, relationship-slogan choices, bespoke route engines or user-discovered stale prompts.

The external playtest showed that it did **not** successfully preserve those player-facing strengths.

## Original question

> **Can a short one-to-one Tabitha interaction feel like enjoyable shared activity—with both people initiating, short natural exchanges, player-authored residue and meaningful map/VN continuity—rather than a monologue or a small scripted investigation?**

## Result

**No.** The experiment failed for three independent reasons:

1. **UX regression:** the generic harness shell shrank the player-facing presentation, used small timed notices for important information, and reduced focused VN dialogue to a smaller bottom-aligned card compared with the accepted v006b treatment.
2. **Companionship failure:** Tabitha repeatedly moved to the next waypoint while the player followed to unlock the next beat. NPC agency was incorrectly implemented as the NPC walking ahead, producing a chase rather than a shared activity.
3. **First-pass comprehension failure:** the short sequence still required decoding too much institutional vocabulary and callback logic. The player ran it twice to understand it and did not find it fun or interesting.

Passing runtime and writing checks did not make the experience worth playing. The internal readiness judgment was therefore wrong.

## Accepted recovery direction

Do not make a direct v008 patch.

Keep harness v002's runtime reliability work, but stop treating its generic player-facing shell as the visual/UX baseline. Before another new narrative experiment:

1. restore the accepted v006b-scale map and focused-VN presentation on top of the reliable runtime;
2. reproduce known-good v003/v006b qualities as an internal control;
3. require important state/context text to persist until superseded rather than disappearing on a short timer;
4. treat companionship as sticky: ordinary relocation while spending time together should not require tailing the NPC;
5. define shared activity as **coupled reciprocal action**, not alternating NPC waypoints and player triggers;
6. add a first-pass comprehension gate before external testing;
7. compare new builds against positive precedents, not only against bug/regression checklists.

## Historical interaction shape

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

This shape is retained as evidence of what **not** to use as a dyadic interaction grammar.

## Run

The failed build remains runnable for historical inspection only:

```bash
cd prototypes/narrative-interaction-lab-v008
npm test
npm start
```

Open `http://127.0.0.1:4188`.
