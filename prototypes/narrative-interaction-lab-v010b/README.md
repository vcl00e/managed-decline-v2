# Narrative Interaction Lab v010b — Walking Together

**Status:** corrective experiment; no external playtest until formation, narration, acknowledgement, density, recovered-UX and rendered-client gates pass.

**Baseline:** v010 partial-success scenario and merged narrative-interaction-harness-v003 presentation/runtime baseline.

## Why v010b exists

V010 established useful positive evidence:

- physical route choice felt worthwhile;
- movement added journey/exploration value that a dialogue choice could not;
- public versus quiet routes mattered somewhat;
- the player experienced the walk as a journey together.

It also exposed four defects:

1. Tabitha looked like a follower NPC even though the fiction said she was accompanying the player.
2. movement-triggered acknowledgement was not perceptible because the client did not refresh persistent narration during live movement;
3. top/right narration pulled attention away from the characters;
4. the journey was under-populated: there was not enough to do or notice.

V010b corrects those defects without reopening whether movement itself has value.

## Primary question

> **Does the same journey now feel like genuinely walking around somewhere with Tabitha, rather than controlling a player while an NPC follows behind?**

## Corrections under test

### 1. Travelling formation

When space permits, the pair walk side-by-side. Tabitha's desired position is derived from the player's travel heading plus a stable lateral formation slot, not the player's current position.

When a route becomes narrow, the formation temporarily compresses to single file. It expands again when space permits.

Tabitha only receives an independent destination after explicit separation.

### 2. Bottom-middle live narration

Important situation/feedback text is placed close to the lower-middle visual focus rather than opposite corners.

Movement-triggered state changes refresh the narration immediately. A reaction that exists only in state but is not visible to the player is treated as a failure.

### 3. Observable shadow for ignored conduct

Tabitha's optional-stop suggestion can still be declined by simply continuing to walk. When that happens she must visibly acknowledge it once, without stopping the walk or opening a choice menu.

### 4. Inhabited journey density

Each route gains a small ecology rather than more empty distance:

- one formation-changing environmental pinch point;
- multiple movement-triggered observations/reactions;
- the existing major optional shared stop;
- one lightweight optional micro-action that can be ignored;
- route-specific arrival callback.

The density target is **several things happening while walking**, not constant prompts.

## What must remain unchanged

- route selected through movement, not a route-choice menu;
- high street and cut-through remain materially/socially different;
- Tabitha does not walk ahead to authored waypoints;
- the player can ignore a suggestion by continuing to walk;
- focused VN is reserved for the existing larger shared stop;
- final station continuation/separation remains spatial;
- no relationship meter or objective list.

## External playtest gate

Only release if internal rendered tests prove:

- side-by-side formation on wide route;
- automatic single-file compression in a narrow section and return to side-by-side;
- persistent narration is bottom-middle at desktop size;
- movement-triggered narration updates without pressing `E`;
- ignored suggestion produces a visible Tabitha acknowledgement;
- both routes contain multiple non-menu journey beats;
- at least one optional micro-action can be used or ignored without blocking progress;
- the full route remains completable using real keyboard movement.
