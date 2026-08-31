# V010 internal preflight — The Way Back

**Date:** 2026-08-30

**Status:** internally worth one external playtest; not accepted design.

## Question

> **Can player-led movement through a small lived space change the terms of one-to-one time with Tabitha while preserving the reciprocal “spending time together” quality established by v009?**

## What was reviewed before implementation

V010 was first written as a plain interaction and separately reviewed for:

- first-pass comprehension;
- movement having social consequence;
- Tabitha initiative without locomotion control;
- avoidance of NPC waypoint chasing;
- route not becoming a personality/affinity test;
- focused VN appearing only where attention genuinely narrows;
- short ordinary dialogue.

## Exact technical gate

GitHub Actions run `33324195373` on exact branch commit `8fe9a8500a6de1ee74a824e2ff4da7fb4f26b4d2` passed **15/15** checks plus HTTP smoke.

Rendered Chromium tests used actual keyboard movement.

### Rendered high-street route

The browser:

1. walked from the hall to the physical fork;
2. moved upward and then east to commit the high street through position;
3. confirmed Tabitha remained near the player;
4. walked into the corner-shop alcove after Tabitha's suggestion;
5. completed the short shared shop interaction in the recovered large VN;
6. walked back to the street;
7. continued across the map to the station entrance;
8. entered the station together;
9. completed with a healthy trace.

### Rendered quiet route

The browser:

1. walked from the hall into the lower cut-through;
2. confirmed the quieter route changed the situation framing;
3. walked into the pocket park after Tabitha's suggestion;
4. completed the short shared pause;
5. resumed the walk together;
6. walked to the station forecourt;
7. explicitly chose to peel off;
8. observed Tabitha begin moving independently only after that goodbye;
9. waited until visible separation existed;
10. ended by heading the other way.

Additional rendered checks proved that:

- a suggestion can be declined simply by continuing to walk;
- cancelling an optional focused stop can be resumed without losing the interaction;
- recovered v006b-scale presentation remains intact;
- important context still persists rather than expiring.

## Whole-play qualitative review

### What now appears materially different from v008

V008's movement shape was:

```text
Tabitha chooses next waypoint
→ player catches her
→ content
→ Tabitha chooses next waypoint
```

V010's movement shape is:

```text
player leads shared walk
→ Tabitha keeps pace
→ player physically selects route
→ Tabitha suggests without leaving
→ player turns into the stop or keeps walking
→ pair resumes together
→ player physically chooses arrival or separation
```

The companion is no longer the navigation objective.

### Why movement is doing real work

The map is not removable without changing the experiment:

- route is selected spatially, not in dialogue;
- high street and cut-through produce different public/private terms;
- each route exposes a different optional shared stop;
- ignoring a suggestion is expressed by continuing movement;
- the station ending depends on where the player physically leads the pair;
- separation becomes visible movement only after the player explicitly ends accompaniment.

### Why reciprocity is still present

Tabitha:

- asks which way;
- adapts to the player's route;
- suggests one optional stop;
- accepts being ignored without punishment;
- participates in the stop if chosen;
- gives a callback based on the actual shared walk.

The player:

- controls route and pace;
- accepts/declines suggestion spatially;
- chooses the shared stop's small activity;
- controls the final continuation/separation point.

## Remaining uncertainty

Automated and author review cannot settle whether the movement feels **meaningful and companionable in the hand** rather than like walking between authored pockets.

External playtest should therefore focus on:

1. Did walking with Tabitha feel like moving **together**, rather than her following like a pet or the player following her?
2. Did the route fork feel worth physically navigating?
3. Did entering or ignoring the optional stop feel natural through movement?
4. Did the high-street / cut-through distinction perceptibly change the social experience?
5. Did movement add something that would be lost if these decisions were ordinary dialogue choices?
6. Did any stretch feel like empty locomotion tax?

## Readiness conclusion

V010 is worth one natural external playthrough.

Passing this test would not mean every Managed Decline scene should contain movement. It would establish that the same narrative-interaction foundation can support both:

- stationary reciprocal intimacy when place is stable;
- player-led shared movement when spatial position changes the situation.
