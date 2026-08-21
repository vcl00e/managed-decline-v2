# Initial comparative playtest

**Date:** 2026-08-21  
**Prototype:** `narrative-interaction-lab-v001`  
**Status:** Prototype evidence; not automatically accepted game design

## Raw evidence

The exact browser export supplied after testing is stored directly as readable JSON:

`001-2026-08-21-initial-comparative-playtest.json`

It is the supplied test export unchanged and can be opened directly in GitHub or any text editor.

SHA-256 of the original JSON:

```text
d46d4f2319ab9b941977270230dc5465056b237e0b8114ea9320fdf560dac209
```

## Test coverage

One tester completed all nine routes:

- three narrative slices: intimacy, ensemble, institution;
- three variants per slice: dialogue baseline, narrative support, system-forward stress test.

The test was not blind and variant order was baseline -> support -> system within each slice, so order, familiarity and expectation effects remain possible confounds. This evidence is directional and valuable for creative alignment, not population-level validation.

## Aggregate ratings

| Variant | Presence | Comprehension | Agency | Pull | Burden (lower better) | Mean duration |
|---|---:|---:|---:|---:|---:|---:|
| Dialogue baseline | 4.0 | 3.7 | 4.0 | 4.0 | 2.0 | 2m 30s |
| Narrative support | 3.3 | 3.3 | 3.0 | 3.3 | 3.0 | 3m 02s |
| System-forward | 1.0 | 3.3 | 1.7 | 1.0 | 3.7 | 1m 17s |

## Strong findings

### 1. Dialogue baseline was preferred in every slice

The baseline consistently produced the strongest combination of presence, agency, pull and low burden. The tester described even the weaker ensemble plot as something they still felt they had "lived" because the writing and situational detail carried the moment.

The working interpretation is not simply "dialogue good, mechanics bad". Dialogue choices often carried high semantic bandwidth at once: intention, tone, interpretation, social risk, relationship position and plausible deniability. Splitting these into separate physical operations could flatten one rich dramatic decision into several narrower confirmations.

### 2. Intimacy was harmed most by operationalising subtext

In `The Borrowed Coat`, the support version exposed a chain of physical confirmations such as sitting beside Tabitha, beginning to remove the coat, not moving away from touch, declining the call visibly and walking her to the bus door.

The tester felt these were the only sensible actions if pursuing intimacy. Presence, comprehension and agency all fell substantially compared with the dialogue baseline.

Working rule:

> Do not decompose an already coherent emotional intention into multiple required gestures merely to increase physical interaction.

Physical staging can often realise a dialogue choice automatically. A physical action earns separate input when it creates a genuinely different meaning, witness state, information flow, commitment or persistent material consequence.

### 3. Narrative support remained viable in ensemble and institutional scenes

The support variants for `The Last Broadcast` and `Temporary Adjustment` retained meaningful immersion. Spatial sequencing, waiting for somebody, introducing people, inspecting a notice and revealing contradictory environmental evidence were not inherently damaging.

However, the tester reported focusing more on outcomes and feeling further away from the narrative when the scene was exposed as an explicit process.

This suggests that support is most promising when it changes scene context or reveals narrative information, and least promising when it asks the player to operate every intermediate dramatic beat.

### 4. Optional environmental investigation is promising but creates affordance debt

In `Temporary Adjustment`, inspecting the notice and uncovering the crossed-out timetable supported comprehension and remained immersive.

The tester then wanted to take a course of action that the authored option list did not support. This identifies an important design cost:

> Once the game teaches the player that they can inspect the world, gather evidence and formulate action from it, the game creates an expectation that the resulting agency will be funded.

A support layer can therefore make a conventional authored choice set feel more restrictive if it implies a wider action space than the game actually supports.

### 5. Explicit goals and visible meters caused optimisation capture

The system-forward variants failed consistently as player-facing narrative interaction.

The tester described the intimacy version as "completing a tax form". In the ensemble version, the announced goal and visible values caused them to stop reading the dialogue and choose options according to optimisation. In the institutional version, the tester distrusted and ignored the `+2` values and was disappointed when actions did not produce lived feedback before the next abstract choice.

Working rule:

> Clarity should usually come from character behaviour, staging, consequences and persistent world changes rather than exposing the internal evaluation model.

Hidden state remains compatible with the design; exposing that state as the game is not.

## Accepted interpretation after discussion

The subsequent design discussion accepted the following current hypothesis:

> **Dialogue should be the primary interaction layer. The diorama, phone, time system and occasional diegetic actions should frame, vary and preserve the narrative rather than compete with it.**

The current preferred support model is:

### Passive support — always present

- character positioning and movement;
- facial/body animation;
- objects and environmental state;
- music, weather and ambient activity;
- automatic physical realisation of selected dialogue intent.

### Map-level agency — frequent

Use the diorama to decide:

- where to go;
- whom to approach;
- whom to avoid or follow;
- whether to stay or leave;
- which person or situation receives attention first.

### Optional observation — occasional

Examples:

- read a notice;
- inspect an object;
- listen at the edge of a group;
- check a message;
- photograph something;
- compare visible accounts.

These should reveal context that can alter later authored dialogue rather than populate an exposed evidence score.

### Decisive material actions — sparse

Examples:

- give or keep a meaningful object;
- post or delete a photograph;
- hand evidence to somebody privately;
- sign or refuse something;
- answer or decline an interruption;
- leave with one person rather than another.

Expose these when physical form changes meaning, witnesses, information flow, commitment, timing or persistent residue.

### Landmark micro-mechanics — rare

A signature scenario may justify a bespoke interaction when that interaction embodies its theme and can be understood almost immediately. These should not become the default interaction cadence.

## Purpose of the diorama under this hypothesis

The map does not need to justify itself as a conventional mechanical sandbox. Its narrative functions are:

- social geography;
- voluntary sequencing;
- anticipation before dialogue begins;
- breathing space between dense scenes;
- attachment to recurring places;
- visible aftermath and environmental memory;
- discovery of events without explicit quest announcements;
- British visual and cultural identity.

The current design target is therefore:

> **A dialogue-first social RPG in which the diorama makes the narrative spatial, voluntary and persistent, but usually does not interrupt a strong scene merely to prove that the environment is interactive.**

## Remaining question

This test did **not** establish that short dialogue-choice scenes can sustain a full campaign. It established that the tested support and system-forward alternatives did not improve these scenes.

The next prototype should therefore test long-form rhythm and support dosage rather than repeat the same comparison. A useful next experiment is a 25–40 minute single-evening slice containing:

- one compact diorama;
- several locations and characters;
- focused dialogue;
- an ensemble scene;
- an institutional/public contradiction;
- phone interruption;
- visible aftermath;
- no announced objective or exposed meters.

Compare:

1. dialogue baseline plus passive diorama staging;
2. baseline plus genuinely optional observation;
3. baseline plus only sparse decisive physical actions.

Primary questions should be dialogue fatigue, map usefulness, optional-observation use, choice quality, memory of places and actions, and the point at which support begins to feel like process.
