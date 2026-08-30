# Narrative Interaction Lab v010 — The Way Back

**Status:** pre-implementation experiment; no external playtest until the movement, reciprocity, comprehension and recovered-UX gates pass.

**Runtime:** reliable narrative-interaction-harness-v002 engine/contract/trace layer.

**Player-facing shell:** merged narrative-interaction-harness-v003 recovered presentation. V010 must not modify it.

## Evidence inherited

V010 starts from two accepted findings:

1. **V006b — position matters.** Movement earns its place when approach, withdrawal, route, threshold, audience, presence or destination changes the social situation.
2. **V009 — reciprocity matters.** Co-located activity felt like spending time when both people acted on the same evolving thing and the player could redirect Tabitha.

V010 tests the combination rather than reopening either result.

## Primary question

> **Can player-led movement through a small lived space change the terms of one-to-one time with Tabitha while preserving the reciprocal “spending time together” quality of v009?**

## Premise

The community-hall event is over. The player and Tabitha are already leaving together for the station.

The station is visible on the far side of a compact neighbourhood map. Two ordinary routes connect them:

- a busier high street;
- a quieter cut-through.

The player leads. Tabitha accompanies rather than becoming a waypoint.

## Spatial grammar under test

```text
leave the hall together
        ↓
player physically leads to a fork
        ↓
HIGH STREET                CUT-THROUGH
public / lit / busier       quieter / more private
        ↓                         ↓
Tabitha suggests an         Tabitha suggests a
optional corner-shop stop   brief pocket-park stop
        ↓                         ↓
player accepts by moving    player accepts by moving
into that space, or keeps   into that space, or keeps
walking                     walking
        ↘                   ↙
          station approach
                ↓
        arrive / separate
```

No route-selection menu substitutes for the map. The player's path is the choice.

## Accompaniment contract

While `accompanying` is true:

- Tabitha maintains conversational proximity to the player;
- ordinary player movement causes Tabitha to follow the player, not vice versa;
- stopping causes the pair to settle rather than Tabitha continuing to the next beat;
- route landmarks never become Tabitha target waypoints;
- Tabitha may suggest, react, pause or disagree without silently taking control of locomotion;
- separation must be an explicit fictional event, not ordinary pathfinding drift.

## Experience promise

The player should be able to describe what happened in spatial verbs:

- left together;
- led Tabitha one way rather than another;
- kept walking or turned into a stop she suggested;
- occupied a more public or more private route;
- arrived together or separated at the station.

And in reciprocal verbs:

- Tabitha asked / suggested;
- player redirected the shared walk;
- Tabitha adapted to the player's route;
- the pair did something together at an optional stop;
- later conversation acknowledged the route and stop actually taken.

## Movement must matter

A v010 run fails its design question if movement is merely:

- walking between dialogue triggers;
- catching up with Tabitha;
- selecting a route whose only difference is cosmetic text;
- traversing empty distance before the same scene.

The two route families must change at least two of:

- audience / publicness;
- intimacy / conversational room;
- available shared stop;
- environmental observation;
- final callback at the station.

## First-pass comprehension

A cold reader should understand in one pass:

1. **What are we doing?** Walking to the station together.
2. **Who leads?** The player normally leads movement; Tabitha accompanies.
3. **What can movement change?** Route, publicness, optional stop and what the pair talk about later.
4. **Can I ignore a suggestion?** Yes. Keep walking.
5. **Do I need to chase Tabitha?** No.

## Not being tested

- whether every intimate scene needs movement;
- long-distance navigation;
- movement skill or timing;
- combat, stealth or traversal challenge;
- relationship meters;
- campaign-scale memory;
- production-canon geography.

## Release rule

Do not ask for an external playtest until:

- the original recovered shell remains unchanged;
- a rendered run requires substantial player movement to complete;
- both route families complete;
- optional stops can be accepted or declined spatially;
- Tabitha never becomes the next waypoint;
- first-pass language stays simple;
- a whole-play qualitative review judges the walk worth the user's time.
