# External playtest — partial success: movement adds journey value, but accompaniment and route density remain weak

**Date:** 2026-08-30

## Player report

The player reported that v010 was a meaningful improvement over stationary harness scenarios because movement made the scene feel like a **journey and experience together** and like the pair **explored together**.

Specific feedback:

1. **Narration placement regressed.** The player preferred narration at the bottom-middle of the screen, as in earlier prototypes. Reading small text at the top-right competed with watching the characters in the middle of the screen.
2. **Narrative companionship worked better than visual locomotion.** Tabitha felt narratively with the player, but on the map she still looked like she was following. The player explicitly asked whether the pair can visibly **walk together** rather than leader + follower.
3. **Ignored suggestion lacked acknowledgement.** Continuing to walk past Tabitha's suggestion was mechanically recognised, but she did not react in the player's run. This violates the earlier accepted requirement that meaningful conduct cast an observable shadow.
4. **Route distinction mattered somewhat.** Public/quiet spatial differentiation was perceptible and worthwhile, though still light.
5. **Movement added something dialogue could not.** The player said the route choice felt worthwhile and movement made the scene feel like a journey/experience and shared exploration.
6. **The route was underfunded.** There was not enough to do. The problem was not locomotion tax so much as low activity density during the journey.

## Conclusion

V010 is a **partial success**.

It positively supports:

> **Meaningful player-led movement can add journey, exploration and shared-experience value that a dialogue choice alone does not provide.**

It also supports the spatial-choice premise from v006b: physically choosing a route can feel worthwhile when routes change the social/environmental context.

However, v010 does **not** yet solve shared locomotion or movement-rich companionship.

The current accompaniment implementation is still visually:

```text
player moves
→ Tabitha targets the player's current/recent position
→ Tabitha trails behind
```

This reads as a follower NPC even when the narrative frames the pair as walking together.

The desired locomotion grammar is instead:

> **When accompaniment is established, both characters should visibly occupy a travelling formation. Ordinary player movement should reposition the pair together, with Tabitha beside/around the player rather than perpetually chasing the player's previous position.**

## New requirements

### 1. Shared locomotion / formation

Implement accompaniment as a travelling formation rather than simple follow-target AI.

Desired behaviour:

- on sufficiently wide paths, Tabitha walks roughly alongside the player at a stable lateral offset;
- on narrow paths/doors, formation can naturally collapse to single file;
- when the player stops, Tabitha settles beside/near them instead of catching up from behind;
- turns should not cause instant side-flipping or orbiting;
- Tabitha can independently stop, diverge or leave only when fiction makes that meaningful;
- the controller should remain a presentation/locomotion layer, not a relationship system.

### 2. Conduct acknowledgement

Spatial non-intervention must receive an observable shadow when a character made a meaningful suggestion.

If the player ignores/passes a suggestion:

- Tabitha should acknowledge it naturally once;
- the acknowledgement should not require a rejection menu;
- later route dialogue/callback may remember it when appropriate;
- the reaction must not punish the player for continuing.

This restates the established rule:

> **Characters interpret patterns of conduct; ignored invitations/suggestions should not disappear as though they never occurred.**

### 3. Journey activity density

A movement-rich scene needs more than one route choice and one optional stop.

The route should contain a sparse ecology of things that can happen **while moving**, for example:

- environmental observations that prompt short reciprocal comments;
- small choices of pace/position/route;
- crossing/threshold moments;
- optional micro-stops;
- a person/place/event encountered differently by route;
- moments where either character initiates and the other can respond;
- quiet stretches that are intentionally atmospheric rather than merely empty.

This does **not** mean filling every metre with prompts. The target is enough variation that the journey feels inhabited rather than like travel between content pockets.

### 4. Narration placement

Return important live narration/situation text to a readable **bottom-middle** placement near the player's focal area.

Requirements:

- large enough to read without shifting attention to a screen corner;
- does not obscure characters or contextual prompts;
- persistent until superseded when information matters;
- peripheral HUD information may remain in corners, but narrative copy should not.

## What remains accepted from v010

Do not throw away the parts that worked:

- player physically chooses route;
- route choice feels worthwhile;
- public/quiet route framing can matter;
- movement creates journey/exploration value;
- Tabitha should not become a sequence of fixed waypoints;
- suggestions can be accepted or declined through movement;
- explicit separation can visibly break accompaniment.

## Next question

The next experiment should not ask whether movement matters again. That has positive evidence.

It should ask:

> **Can a player and Tabitha visibly walk together in a shared formation while a denser but still natural sequence of route events, acknowledgements and observations makes the journey feel inhabited rather than sparse?**

This should preserve v009's reciprocal companionship and v010's spatial choice rather than inventing a new interaction grammar.