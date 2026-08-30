# V010 movement / reciprocity / writing review

**Decision:** proceed to implementation, but only if the runtime preserves the conditions below.

## First-pass comprehension

The scene is understandable without project vocabulary:

- two people are walking to a station;
- the player chooses the route by walking;
- Tabitha stays with the player;
- she may suggest a stop;
- the player can turn into that space or keep going;
- both routes eventually reach the station.

No explanatory lore is required.

## What movement contributes

Movement changes more than position:

| Movement | Social consequence |
| --- | --- |
| high street | more public / busier atmosphere; corner-shop stop becomes available |
| cut-through | quieter / more private atmosphere; pocket-park stop becomes available |
| enter optional stop | shared activity / pause becomes possible |
| keep walking | preserves momentum and declines suggestion without a dialogue rejection |
| station entrance | continue accompanying Tabitha to the barriers |
| forecourt edge | explicitly separate here |

This satisfies the v006b requirement that movement change participation, audience, intimacy, access or what happens next.

## What reciprocity contributes

Tabitha is not passive scenery:

- she asks which way without taking control;
- she keeps pace with the player's route;
- she suggests one context-appropriate stop;
- she adapts if the player ignores it;
- at an accepted stop, both participate in the same small activity;
- she later remembers the route/stop in a callback.

The player is not passive either:

- route is player-led movement;
- accepting a suggestion requires a spatial turn;
- declining requires no menu — just keep walking;
- the player chooses the final separation/continuation location.

## Anti-chase requirement

Implementation must not do any of these:

```text
Tabitha target = high street landmark
Tabitha target = shop
Tabitha target = pocket park
Tabitha target = station
```

During ordinary accompaniment, Tabitha's target must be derived from player position / companionship spacing.

The only valid independent departure is after the player explicitly selects separation at the end.

## Anti-trigger-walk requirement

A route cannot merely be a long hallway with dialogue nodes.

The player should experience route choice through:

- a visible fork;
- different spatial texture;
- different public/private framing;
- different optional shared affordance;
- a different later callback.

The implementation should not interrupt walking every few seconds with VN scenes.

## Focused VN use

Focused VN is justified only for the optional stop because attention temporarily narrows onto a shared moment.

The route choice itself remains on the map.
The decision to ignore a stop remains on the map.
The final station separation remains on the map.

## Writing review

The dialogue is intentionally ordinary and short. It does not attempt to carry a political thesis.

Potentially writerly lines rejected during review:

- `It's quieter here. People act differently when nobody is looking.` — explains intended intimacy effect.
- `See? Route choice changes the terms of the evening.` — design-language leakage.
- `I like that you picked the quiet way.` — risks turning route into approval currency.

Retained lines are immediate reactions to the walk.

## Risk: route as personality test

The high street must not mean `extrovert` and the cut-through must not mean `intimate/good relationship`.

Both routes must be valid experiences:

- high street can be funny, social and energetic;
- cut-through can be quiet and companionable;
- stopping is not automatically better than continuing;
- no hidden affinity reward attaches to either route.

## Risk: sticky accompaniment becoming an invisible tether

Tabitha should look like a companion, not a pet following the cursor.

Implementation should:

- allow a small natural following distance;
- use faster catch-up only when separation grows too large;
- stop her when comfortably near the player;
- not teleport unless needed for reset/testing;
- retain visible independent animation even while following.

## Internal playtest questions

Before external release, answer from a rendered run:

1. Did I actually need to move to complete the scene?
2. Could I tell where the route fork was without UI instruction?
3. Did Tabitha stay with me naturally rather than making me follow her?
4. Did choosing one route produce a perceptibly different few minutes?
5. Could I decline her suggestion simply by continuing?
6. Did stopping feel like a shared pause rather than a content node?
7. Did the final spatial choice visibly change what happened?
8. If all route labels were removed, would movement still be worth having?

Any `no` blocks external playtest.
