# Narrative Interaction Lab v010 — The Way Back

**Status:** internally approved for one external playtest after movement, reciprocity, comprehension, recovered-UX and rendered-client gates.

**Runtime:** reliable narrative-interaction-harness-v002 engine/contract/trace layer.

**Player-facing shell:** merged narrative-interaction-harness-v003 recovered presentation. V010 does not modify it.

**Internal review:** [`findings/000-2026-08-30-internal-preflight.md`](./findings/000-2026-08-30-internal-preflight.md)

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

The two route families change:

- audience / publicness;
- conversational room / intimacy;
- available shared stop;
- environmental observation;
- final route callback.

## First-pass comprehension

A cold reader should understand in one pass:

1. **What are we doing?** Walking to the station together.
2. **Who leads?** The player normally leads movement; Tabitha accompanies.
3. **What can movement change?** Route, publicness, optional stop and what the pair talk about later.
4. **Can I ignore a suggestion?** Yes. Keep walking.
5. **Do I need to chase Tabitha?** No.

## Verification

Exact-branch run `33324195373` passed **15/15** checks plus HTTP smoke.

Rendered Chromium playthroughs used actual keyboard movement and covered:

- high street → shop stop → station entrance together;
- quiet cut-through → park stop → explicit forecourt separation;
- declining the shop by continuing to walk;
- cancel/resume at an optional stop;
- accompaniment proximity;
- recovered desktop UI/VN dimensions;
- trace health.

## Run

Requires Node.js 22+.

```bash
cd prototypes/narrative-interaction-lab-v010
npm test
npm start
```

Open:

```text
http://127.0.0.1:4210
```

Controls:

- `WASD` / arrows — move;
- `E` / `Enter` — contextual action;
- `Tab` — cycle nearby affordances;
- `1–4` — focused choice;
- `Esc` — return from an optional focused stop to the live space.

## External playtest

Play once naturally. Do not try to cover both routes.

Primary question:

> **Did walking with Tabitha feel like moving together through a place, with spatial choices that changed the time you were having, or did it still feel like walking between authored content pockets?**

Useful feedback:

- whether Tabitha felt beside you rather than like a follower or waypoint;
- whether physically choosing the route was worthwhile;
- whether turning into / ignoring the optional stop felt natural;
- whether the public vs quiet route distinction mattered in play;
- whether any walking felt like locomotion tax;
- whether movement added something that ordinary dialogue choices could not.

Export the trace at the end if the run completes.

## Not being tested

- whether every intimate scene needs movement;
- long-distance navigation;
- movement skill or timing;
- combat, stealth or traversal challenge;
- relationship meters;
- campaign-scale memory;
- production-canon geography.
