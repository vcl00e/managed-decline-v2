# V007c internal review — active-experience refactor

**Date:** 2026-08-28

**Status:** internal design / whole-play evidence; not a user playtest finding

## Why this refactor was necessary

The first v007c correction funded the Tabitha route with more authored material, but the underlying response risked becoming patch-driven:

- one policy for regressions;
- another policy for experience value;
- route-specific tests for each prior failure;
- a growing set of Tabitha-specific completion flags.

That could prevent known mistakes without establishing a reusable way to design good social experiences.

The correction therefore has two parts:

1. consolidate prototype workflow into one three-gate policy;
2. refactor the Friday-night implementation around a shared **active-experience lifecycle** rather than a separate route state machine for every social preference.

## Architectural result

The shared layer now tracks:

- current focus;
- social mode;
- player desire;
- promised value;
- lifecycle stage;
- fulfilled promise dimensions;
- interruption tolerance;
- suspension / resumption when the player changes focus.

Character-specific content remains authored. The system does not attempt to procedurally manufacture intimacy, humour or dialogue.

This is a useful middle ground:

- less route-specific state plumbing;
- no universal social simulator;
- still enough structure to ask whether a promoted experience is actually funded.

## Exact technical verification

Local Node 22 verification passed:

- syntax checks for all JavaScript modules;
- 18 tests covering the shared lifecycle, route structure, regression safety and structural Experience Contract coverage;
- HTTP smoke test.

The test suite explicitly verifies that old route-completion flags such as `tabithaPrivateDone`, `radioGroupSceneDone` and `priyaPrivateDone` are no longer the progression architecture.

Tests remain structural evidence only.

## Rendered whole-play review

Chromium could not navigate directly to localhost because of the environment’s browser policy. The tested HTML, CSS and ES modules were therefore injected into an `about:blank` page through Blob module URLs. Actual keyboard events, movement, focused-dialogue choices and screenshots were used.

### Experience A — Tabitha one-to-one

**Player desire:** spend meaningful time with Tabitha and avoid the radio group.

**Complete played sequence:**

```text
opening with Tabitha
→ choose not to enter
→ shared noticeboard interaction
→ substantive private VN scene
→ ask about the person beyond the public campaign
→ old-library plan formed
→ walk physically to the side yard
→ plan-specific callback
→ remain a little longer
→ leave with Tabitha
```

**What the experience provided:**

- immediate private humour;
- a shared environmental object rather than abstract time advancement;
- a focused conversation with actual character discovery;
- player expression through three materially different stances;
- a concrete future plan;
- a later callback that used the chosen plan;
- a deliberate leave-together payoff.

**Development:**

The route moved from a generic arrival joke to a private motif, then to Tabitha’s relationship with her public image, then to an interest and future plan unrelated to that image.

It no longer asked the player to confirm staying repeatedly.

**Comparison with positive precedent:**

- retained v006b’s useful transition from lived space into focused VN;
- retained the value of physically following / staying with somebody;
- produced a visible and experiential leave-together outcome rather than only hidden interpretation;
- provided substantially more private context than the failed v007b route.

**Internal judgment:**

This route is now clearly a real authored experience rather than empty freedom. Whether the particular dialogue is genuinely compelling, too explicit, too long or too centred on Tabitha’s parody backstory remains an appropriate external playtest question.

### Experience B — radio group

**Player desire:** enjoy ensemble chemistry without managing every person.

**Complete played sequence:**

```text
enter hall without completing Tabitha private route
→ join Maya and Alex
→ take part in the joke
→ stay for a distinct next-track map beat
→ Priya and Tabitha settle independently
→ audience-sensitive group story
→ closure scene
→ continue with Maya
```

**What the experience provided:**

- NPC-to-NPC banter before player choice;
- optional participation;
- a map-level continuation instead of immediate repeated VN;
- independent NPC initiative;
- one audience-sensitive decision;
- an external world change;
- a concrete group continuation.

**Internal judgment:**

The group route now has a coherent arc without requiring the private route. It may still feel authored or joke-dense in real play; that remains unresolved. It is not structurally a compulsory group curriculum.

### Experience C — Priya-selective

**Player desire:** engage Priya without joining the radio group.

**Complete played sequence:**

```text
observe the radio corner from the edge
→ watch the room settle
→ Priya enters and self-settles
→ approach Priya
→ focused private scene
→ form a chips plan
→ leave with Priya
```

**What the experience provided:**

- no radio-group VN requirement;
- visible self-settling rather than protagonist shepherding;
- private character material;
- a clear, low-pressure plan;
- a distinct ending.

**Internal judgment:**

The route is shorter than Tabitha’s by design because Priya arrives later, but it is no longer a placeholder. There is some real-time movement while Priya crosses the room; the player can move toward her or continue observing rather than wait passively.

### Experience D — observer

**Player desire:** inhabit and read the room with no focused group dialogue.

**Complete played sequence:**

```text
listen to Maya/Alex from the edge
→ watch Priya and the room settle
→ watch the room split into smaller circles
→ watch the group adapt to closure
→ leave alone
```

**What the experience provided:**

- four distinct observations rather than one time skip;
- NPC-to-NPC chemistry;
- visible social reconfiguration;
- independent arrivals and movement;
- environmental / institutional change;
- a contained ending with zero VN scenes.

**Internal judgment:**

The observer route now contains actual changing material. It is still necessarily lighter in self-expression than direct social routes. Whether four prompted observations feel natural or like an authored observation checklist remains an external question.

## Whole-slice judgment

### What is now systemic rather than patched

- all promoted social modes use the same lifecycle vocabulary;
- changing focus suspends and preserves context;
- low-interruption private experiences protect their own payoff window;
- route availability and route value are represented separately;
- group, Priya and observer play are funded rather than existing only as topology tests;
- progression no longer depends on a separate chain of `...Done` flags for each route.

### What remains authored and specific by design

- Tabitha’s noticeboard / public-image / municipal-building material;
- Maya and Alex’s radio banter;
- Priya’s social-comfort material;
- specific endings and callbacks.

Those are content, not architecture. The final game should contain many different character-specific experience shapes rather than repeating the noticeboard sequence.

### Remaining uncertainty

The refactor does **not** prove:

- the writing is enjoyable;
- the Tabitha scene earns its length;
- the parody material and private character material are balanced correctly;
- the group humour feels natural;
- the map prompts are sufficiently invisible;
- changing focus feels organic rather than selecting experience packages;
- the active-experience abstraction is useful at campaign scale.

These are now legitimate unresolved questions rather than obvious missing-content or route-gating failures.

## Readiness conclusion

The build is internally worth an external playtest because every promoted social mode now contains a coherent, complete experience and the architecture is no longer a stack of route-specific patches.

The external test should focus on:

> **Does the game feel as though it develops what the player actually wants, or can the underlying experience packaging still be felt?**
