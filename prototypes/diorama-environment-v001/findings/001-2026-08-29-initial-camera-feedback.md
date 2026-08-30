# 001 — 2026-08-29 initial camera and framing playtest

## User feedback

The prototype runs after the parser fix.

The movement/camera motion produced a useful sense of solidity and momentum, but the visible bobbing/trailing effect was strong enough that it could disorient the player or feel dizzy. The user wanted that effect **reduced, not eliminated**.

The `C` framing comparison also suggested that:

- some scenes should be able to come **closer** than the initial close preset;
- farther framing is still useful in other situations.

The user asked to recover the earlier playtest evidence from `managed-decline-v1` and apply it rather than rediscovering settled presentation rules.

## Recovered v1 evidence

Relevant accepted findings in `managed-decline-v1`:

- perspective miniature/diorama was preferred to orthographic because it felt more intimate and inside the world;
- a large dead-zone camera was preferred to continuous following;
- dead-zone correction should be immediate/tactile;
- smooth exact 45-degree rotation was accepted;
- no default free mouse orbit;
- discrete Close / Standard / Wide framing states were preferred to arbitrary analogue zoom;
- responsive `canvas_items + expand` presentation was accepted;
- closer Near/Beside social staging felt more personal;
- physical NPC travel was preferred to teleport/quest-marker continuity.

Sources:

- `docs/TEST_FINDINGS.md`;
- `docs/VERTICAL_SLICE_01_ACCEPTED_FINDINGS.md`.

## Applied to diorama-environment-v001

This remains the same conceptual prototype version; the camera implementation is corrected rather than starting v002.

Changes:

1. orthographic projection -> **34° perspective**;
2. continuous smoothed translation -> **large dead-zone with immediate translation correction**;
3. retain smooth motion only for deliberate **45° rotation**;
4. add `Z` / `X` exact 45° rotation;
5. make player movement derive from the actual camera basis so controls remain screen-relative after rotation;
6. retain discrete `C` framing states;
7. make **Close** substantially closer while keeping Standard and Wide;
8. explicitly set responsive `canvas_items + expand`;
9. retain player acceleration rather than flattening movement responsiveness;
10. extend trace output with projection, framing and camera-angle data.

## Deliberately not ported yet

The accepted v1 O2/R1 soft-occlusion system is recorded as relevant evidence but is not blindly copied in this pass.

Reason: this organic map has different building masses, sightlines and route topology. The updated playtest now explicitly asks whether the new perspective/rotation causes a real occlusion problem. If it does, O2/R1 is the inherited starting solution rather than reopening the rejected deep-ghost/dither experiments.

## Next evidence wanted

The next run should establish:

- whether the dead-zone reduces dizziness enough;
- whether Close is now genuinely useful for personal staging;
- where Wide framing is beneficial;
- whether perspective recovers the stronger miniature feeling from v1;
- whether 45° rotation helps or harms this more organic map;
- whether occlusion actually blocks navigation in this layout;
- whether Tabitha still reads as company rather than a target.
