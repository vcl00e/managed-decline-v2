# Narrative Interaction Lab v009 — internal preflight

**Date:** 2026-08-29

**Status:** internally worth an external playtest; does not claim that the interaction is fun

## Why this build exists

V008 failed because runtime reliability had been mistaken for experience quality. It also regressed the accepted presentation, turned Tabitha into a sequence of waypoints, and overloaded a short scene with institutional concepts.

V009 therefore changes only one experimental dimension after the UX baseline was independently recovered:

> **Can a co-located reciprocal activity make one-to-one time with Tabitha feel more like doing something together?**

## Pre-implementation review

The interaction was written and reviewed before implementation.

The complete immediate premise is:

> Tabitha finds an instant camera with two shots left. The two of you photograph each other and decide what happens to the prints.

No previous Managed Decline lore is required to understand the activity.

One writerly line was explicitly rejected before implementation:

> “At least this time I get to choose the version of me people keep.”

It was rejected because it explains the intended public-symbol theme instead of letting the activity carry any meaning itself.

## Interaction structure

The main route is:

```text
Tabitha points the camera at the player
→ player accepts or reverses who goes first
→ subject behaviour changes photographer response
→ first physical print appears
→ player may stop or use the final exposure
→ camera changes hands
→ player can directly instruct Tabitha when photographing her
→ second physical print appears
→ player decides how the prints are divided
```

Tabitha remains in the same social area throughout. There is no `move Tabitha to next content waypoint` step.

## Reciprocal evidence

The runtime tests establish that:

- Tabitha initiates the activity;
- the player can immediately reverse her proposed order;
- the player can directly choose how Tabitha is photographed;
- that choice changes the resulting Tabitha print;
- the player can stop after one picture;
- the final print allocation is player-directed;
- Tabitha's target coordinates never change through either complete route.

This is a materially different structure from v008's `NPC moves → player catches up → trigger` loop.

## First-pass comprehension review

Every focused node contains at most two pre-choice lines.

The scene requires only ordinary concepts:

- instant camera;
- two exposures;
- pose / take picture;
- developing print;
- trade / keep / leave prints.

The implementation contains none of v008's high-load terms such as `facilitator`, `resilience plan`, `trusted peer`, `susceptible` or `participant voice`.

The dialogue also avoids explicit relationship interpretation such as `the real you`, `I understand you` or `relationship progressed`.

## Recovered UX verification

V009 imports harness v003's player-facing CSS and presentation controller rather than copying or changing them.

At 1440×900, rendered CI verifies:

- shell width at least 1100px;
- focused VN width at least 940px;
- focused VN height at least 540px;
- VN placed centrally rather than at the bottom;
- focused text at least 26px;
- important situation text remains after 2.6 seconds rather than expiring.

V009's local CSS is restricted to non-structural accent styling and contains no `.shell`, `.stage`, `.vn-card` or `#vn-text` overrides.

## Runtime / browser verification

The first exact-branch browser run exposed a test-speed issue: automated VN traversal returned to the map and pressed `E` again inside the inherited 240ms duplicate-input lock. The runtime correctly ignored the input. Unit/model routes were already passing.

The browser test was corrected to respect the real input lock instead of weakening the lock or changing the scenario.

Exact-branch run **33273149382** then passed:

- scenario contract;
- two reciprocal route variants;
- order reversal;
- optional stop after first picture;
- no-waypoint guard;
- first-pass language guard;
- recovered-UX guard;
- rendered intended route;
- rendered reversed-order route;
- rendered cancel/resume;
- rapid duplicate-input protection;
- completed trace audit;
- HTTP smoke.

## Qualitative internal review

### What is improved enough to justify external testing

- The immediate situation is comprehensible without explanation.
- The activity contains mutual attention by its nature: one person is photographer while the other is subject, then those roles can reverse.
- Tabitha's initiative does not remove the player's direction. The player may reverse the order immediately and later give her a concrete instruction that she follows.
- The short lines are reactions to visible conduct, not exposition about the relationship.
- There is a real physical result: one or two prints with player-shaped content.
- The recovered UI makes focused dialogue visually dominant again and keeps contextual information readable.
- The scene can end after one picture, so using the second exposure is a new decision rather than repeated confirmation of `stay with Tabitha`.

### Remaining experiential risks

These cannot be established by tests:

- taking pictures may still feel like an obviously authored mini-scene rather than spontaneous company;
- the banter may be merely competent rather than genuinely funny;
- the activity may be too slight to create satisfying character progression;
- choosing how to divide the prints may feel designed rather than natural;
- the player may want richer conversation even if the reciprocal structure works.

Those are legitimate external questions. They are different from the basic UX, stuck-state and first-pass-comprehension failures that should have been caught internally in earlier builds.

## Readiness judgment

I would voluntarily continue through this short scene once to see both pictures develop and decide what happens to them. The interaction is simple enough to understand immediately and substantial enough to evaluate the reciprocal-companionship hypothesis.

Therefore v009 is worth one external playtest.

It is **not** accepted design unless the external result supports it.
