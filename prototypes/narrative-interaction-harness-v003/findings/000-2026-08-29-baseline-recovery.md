# Narrative Interaction Harness v003 — baseline recovery result

**Date:** 2026-08-29

**Status:** internally verified player-facing control; not an external playtest result

## Trigger

V008 failed external playtest despite runtime reliability. The user reported:

- important messages were small, scattered and disappeared before they could be read;
- focused VN dialogue was smaller and pushed to the bottom;
- the UI used too little available screen space;
- spending time with Tabitha felt like repeatedly chasing her to the next waypoint;
- the dialogue required a second run to understand;
- the interaction was not fun or interesting.

The failure showed that harness v002's reliable runtime had accidentally become a new visual/UX baseline even though that presentation had never been externally accepted.

## Recovery objective

Keep the reliable v002 runtime contract while restoring already-supported player-facing strengths from v006b and known-good short-form material from v003.

This is a control, not a new design experiment.

## Recovered presentation

Harness v003 now enforces:

- shell width up to **1120px**;
- map stage height `min(72vh, 650px)` with a 520px desktop minimum;
- persistent situation text until the situation changes;
- persistent state-change feedback until another meaningful change supersedes it;
- no timer-driven narrative notices in the recovered player-facing application;
- centred focused VN up to **1000px** wide and at least **560px** high;
- desktop dialogue at approximately **27px** serif text;
- sparse contextual map controls;
- no dashboard, objective list or visible developer log.

These values are intentionally close to the accepted v006b presentation rather than invented as a new UI experiment.

## Golden control

The internal scenario uses a short v003-like Tabitha/public-sector-training beat because that material previously demonstrated humour, character pull and readable focused conversation.

The control deliberately keeps Tabitha spatially beside the player throughout the shared experience. Her actor target does not advance to a sequence of waypoints.

The test arc is:

```text
shared back-row situation
→ focused VN
→ short readable choices
→ focused VN develops
→ return to the same shared room
→ Tabitha remains beside the player
```

No new gameplay conclusion is inferred from the control.

## Verification

GitHub Actions run **33272731393** passed on exact branch head `e6ab33dc6ba665b123dc639b8dc639f93c156855`.

Passed checks:

1. scenario satisfies harness v002's reliable scenario contract;
2. control returns from focused VN to the same shared space;
3. Tabitha's target remains unchanged rather than becoming a waypoint;
4. CSS contract restores v006b-scale shell, stage, VN and dialogue text;
5. important player-facing text is persistent and the app contains no `setTimeout(...)` narrative expiry;
6. rendered Chromium at 1440×900 measures the actual shell/VN scale;
7. situation text remains present after 2.6 seconds, beyond v008's previous 2.2-second notice lifetime;
8. complete rendered interaction returns to `control_residue` with Tabitha still beside the player;
9. HTTP smoke passes.

The first five CI attempts exposed test/serving integration mistakes. Those were resolved internally; no external test was requested. The final run is the evidence-bearing one.

## Comparison to positive precedents

### v006b

Recovered:

- large map presentation;
- dominant focused VN for semantically important dialogue;
- readable typography;
- persistent contextual framing;
- map → VN → map continuity.

### v003

The control intentionally uses the same kind of immediate, simple satirical framing and short Tabitha exchanges that previously created strong humour and character pull. It does not claim to reproduce v003's external ratings; it establishes that the new reliable runtime no longer forces a visibly worse presentation.

## New invariant

> **Runtime infrastructure does not own the player-facing visual baseline.**

Future same-domain prototypes inherit this recovered shell unless the presentation itself is explicitly under re-test.

Important narrative/context information must not expire automatically. Disposable micro-feedback may still use a timer when losing it cannot impair comprehension.

## Next step

A new dyadic experiment may now be built as scenario/content on top of this recovered player-facing shell while leaving its UX fixed.

The unresolved interaction question is:

> **Can a simple, first-pass-legible activity create genuinely coupled one-to-one play in which Tabitha responds to the player's direction as well as initiating her own actions?**

The next candidate must remain co-located, avoid NPC waypoint chasing, and pass a first-pass comprehension review before implementation.
