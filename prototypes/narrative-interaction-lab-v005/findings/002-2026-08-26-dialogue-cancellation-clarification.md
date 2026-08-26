# Dialogue cancellation clarification — v005 initial playtest

Date: 2026-08-26

Status: **Important methodological correction to finding 001**

## Tester clarification

After exporting the initial `Radio Free Bellwether` trace, the tester clarified that an engaged conversation could not be cancelled before selecting one of its semantic dialogue options.

This mattered in two recurring cases:

1. a conversation was opened intentionally, but none of the displayed options represented anything the tester currently wanted to say;
2. several characters were standing close together and `E` selected a different NPC from the one the tester intended to approach.

In both cases the tester sometimes clicked an arbitrary dialogue option simply to regain control of the character.

## Consequence for the trace

Treat the trace's dialogue-choice counts as **contaminated input data**.

Do not infer player preference, desired conversational stance or relationship intention from repeated selections such as:

- asking Ben where the extension reel went;
- asking Ben whether the building was closing;
- asking Rowan about vacant possession / community asset familiarisation;
- repeated post-resolution lines with Maya or other characters.

Some selections were genuine and some were effectively a `close conversation` command forced through a semantic choice. The trace does not distinguish them.

The same caution applies to relationship-state deltas caused by those selections.

The spatial trace, object interactions, event-heard/event-missed data and tester's written feedback remain useful because this defect does not invalidate the fact that the player moved through the space, pursued NPCs, restored the mixer, noticed independent events and formed local intentions.

## Related input bug confirmed by trace

The exported run contains 23 `interaction` events **after** `run_finished`, all targeting the front-door exit. These occurred while the tester was on the feedback screen and independently reported that bound keyboard letters could not be typed normally into the form.

These events are invalid telemetry and must be ignored.

## Fixes applied after the run

A prototype-level interaction guard has been added on branch `prototype/narrative-interaction-lab-v005-lived-space`:

- `Escape` can back out of an open choice dialogue without selecting a semantic response;
- open choice dialogues display a visible `Back out · Esc` control;
- keyboard input originating in text inputs, textareas, selects or contenteditable elements is stopped before it reaches the game's global controls;
- the interaction guard is included in the syntax-check script.

This is an expedient v005 hotfix, not the desired long-term architecture. A future implementation should make cancellation and input-context ownership first-class parts of the game interaction system rather than relying on a guard script.

## Remaining targeting defect

Cancellation makes a wrong interaction cheap to undo, but it does **not** solve why the wrong NPC was selected.

V005 currently chooses the closest interactable candidate by raw distance. When several people gather together, this is insufficient.

A future implementation should use at least:

- a clearly highlighted current target before interaction;
- player facing / direction as a strong targeting signal rather than distance alone;
- target stability so tiny position changes do not rapidly switch the selected character;
- explicit disambiguation or cycling when multiple nearby characters remain plausible.

This should be treated as an interaction-quality requirement for the next spatial prototype.
