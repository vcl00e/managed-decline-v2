# Narrative Interaction Lab v010b — Walking Together

**Status:** internally approved for one external playtest — exact documented head must remain green.

**Baseline:** v010 partial-success scenario and merged narrative-interaction-harness-v003 presentation/runtime baseline.

**Internal review:** [`findings/000-2026-08-30-internal-preflight.md`](./findings/000-2026-08-30-internal-preflight.md)

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

When space permits, the pair walk side-by-side. On the main route corridors, Tabitha occupies a stable lateral slot derived from the corridor's station-ward travel tangent rather than simply chasing the player's current position.

When a route becomes narrow, the formation temporarily compresses to single file. It expands again when space permits.

Free player heading is still used when genuinely turning off the corridor into a stop or station approach.

Tabitha only receives an independent destination after explicit separation.

### 2. Bottom-middle live narration

Important situation/feedback text is placed close to the lower-middle visual focus rather than opposite corners.

Movement-triggered state changes refresh the narration immediately. A reaction that exists only in state but is not visible to the player is treated as a failure.

### 3. Observable shadow for ignored conduct

Tabitha's optional-stop suggestion can still be declined by simply continuing to walk. When that happens she visibly acknowledges it once, without stopping the walk or opening a choice menu.

### 4. Inhabited journey density

Each route gains a small ecology rather than more empty distance:

- one formation-changing environmental pinch point;
- multiple movement-triggered observations/reactions;
- the existing major optional shared stop;
- one lightweight optional micro-action that can be ignored;
- route-specific arrival callback.

The density target is **several things happening while walking**, not constant prompts.

## What remains unchanged from v010

- route selected through movement, not a route-choice menu;
- high street and cut-through remain materially/socially different;
- Tabitha does not walk ahead to authored waypoints;
- the player can ignore a suggestion by continuing to walk;
- focused VN is reserved for the existing larger shared stop;
- final station continuation/separation remains spatial;
- no relationship meter or objective list.

## Internal failures caught before release

The corrective branch was not promoted after its first green-looking implementation. Exact-branch tests exposed and corrected:

- movement feedback that could be overwritten before it was meaningfully readable;
- companion formation rotating behind the player after tiny steering corrections;
- adjacent journey events firing too close together and becoming notification pile-up;
- an aggregate density assertion that did not actually correspond to the experiences the player saw.

These are documented in the internal preflight.

## Verification

Corrective code head `d4eb287685535d907d8c67b4a4f957916ff52d97` passed GitHub Actions run `33331692845`.

That rendered-client gate verifies:

- side-by-side accompaniment on wide route;
- automatic single-file compression through a pinch point;
- return to side-by-side afterwards;
- bottom-middle narration geometry at 1440×900;
- movement-triggered narration updating without pressing `E`;
- ignored suggestion producing a visible once-only Tabitha acknowledgement;
- high-street bus-display observation and optional shared micro-action;
- quiet-route window observation, park stop and fox micro-action;
- optional micro-actions not becoming route gates;
- route completion using actual keyboard movement;
- explicit visible separation after goodbye;
- trace health;
- HTTP smoke.

A fresh exact-head run after this readiness documentation must also pass before external playtest.

## Run

Requires Node.js 22+.

```bash
cd prototypes/narrative-interaction-lab-v010b
npm test
npm start
```

Open:

```text
http://127.0.0.1:4211
```

Controls:

- `WASD` / arrows — move;
- `E` / `Enter` — contextual action;
- `Tab` — cycle nearby affordances;
- `1–4` — focused choice;
- `Esc` — return from the larger optional stop to the live space.

## External playtest

Play **one route naturally**. Do not try to cover both routes or QA the formation controller.

Primary question:

> **Does this now feel like genuinely walking around somewhere with Tabitha, rather than controlling a player while an NPC follows behind?**

Useful secondary feedback:

- Does side-by-side → single-file → side-by-side actually read as two people walking together?
- Is the bottom-middle narration easier to follow while moving?
- If you ignore Tabitha's suggestion, is her acknowledgement clear without becoming intrusive?
- Does the journey now feel inhabited enough?
- Do the extra observations and micro-actions feel natural, or like authored content pockets / prompt clutter?
- Does movement retain the journey/exploration value that worked in v010?

Export the trace at the end if the run completes.
