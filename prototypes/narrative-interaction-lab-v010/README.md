# Narrative Interaction Lab v010 — The Way Back

**Status:** external playtest complete — **partial success**. Movement added journey/exploration value, but shared locomotion, conduct acknowledgement, narration placement and journey activity density remain unresolved.

**Runtime:** reliable narrative-interaction-harness-v002 engine/contract/trace layer.

**Player-facing shell:** merged narrative-interaction-harness-v003 recovered presentation. V010 does not modify it.

**Internal review:** [`findings/000-2026-08-30-internal-preflight.md`](./findings/000-2026-08-30-internal-preflight.md)

**External finding:** [`findings/001-2026-08-30-external-playtest-partial-success.md`](./findings/001-2026-08-30-external-playtest-partial-success.md)

## Evidence inherited

V010 starts from two accepted findings:

1. **V006b — position matters.** Movement earns its place when approach, withdrawal, route, threshold, audience, presence or destination changes the social situation.
2. **V009 — reciprocity matters.** Co-located activity felt like spending time when both people acted on the same evolving thing and the player could redirect Tabitha.

V010 tests the combination rather than reopening either result.

## Primary question

> **Can player-led movement through a small lived space change the terms of one-to-one time with Tabitha while preserving the reciprocal “spending time together” quality of v009?**

## External answer

**Partly.**

Positive evidence:

- physically choosing the route felt worthwhile;
- public vs quiet route distinction mattered somewhat;
- movement added something a dialogue choice could not;
- the run felt like a journey / experience together and like the pair explored together;
- movement itself was not reported as locomotion tax.

Unresolved / failed aspects:

- Tabitha looked like a follower NPC on the map even though she felt narratively with the player;
- ignoring her suggestion did not receive the expected character acknowledgement in the player's run;
- the journey did not contain enough activity;
- important live narration was harder to read at the top/right while attention was on characters in the middle; bottom-middle narration was preferred.

Therefore the reusable conclusion is narrower than a full success:

> **Meaningful player-led movement can add journey, exploration and shared-experience value that dialogue alone cannot, but accompaniment must visually read as walking together and the journey needs enough reciprocal/event density to feel inhabited.**

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

V010's initial implementation maintained proximity by making Tabitha target the player's position. External play showed that this was not enough: it visually read as **following**.

The next implementation must distinguish:

```text
FOLLOWING
player moves → companion catches up to previous/current player position
```

from:

```text
WALKING TOGETHER
player movement establishes a travelling formation → companion occupies a nearby side/formation slot → both visibly move as a pair
```

Formation may collapse naturally to single file on narrow paths or thresholds, but ordinary wide-path movement should not look like perpetual catch-up.

## Movement must matter

A movement-rich run fails if movement is merely:

- walking between dialogue triggers;
- catching up with Tabitha;
- selecting a route whose only difference is cosmetic text;
- traversing empty distance before the same scene.

The v010 route families changed:

- audience / publicness;
- conversational room / intimacy;
- available shared stop;
- environmental observation;
- final route callback.

External play confirmed these spatial differences were worthwhile, but the route was underfunded: more things need to happen **during** the journey without turning every few metres into a prompt.

## Conduct acknowledgement

V010 allowed a suggestion to be declined by simply continuing to walk. That interaction form was accepted as natural, but the player's run did not receive a noticeable Tabitha reaction.

The next implementation must preserve the no-menu spatial decline while ensuring the conduct casts an observable shadow:

- a short immediate acknowledgement;
- and/or a later callback;
- never a punishment for not stopping.

## Narration placement

Important live narration should return to a readable **bottom-middle** placement near the player's visual focal area.

Corner HUDs may carry peripheral status, but narrative copy should not require looking away from the characters to read small text.

## Journey density

The next movement experiment should add a sparse ecology of route events rather than simply more distance:

- environmental observations with short reciprocal comments;
- occasional route/pace/position choices;
- thresholds or crossings;
- optional micro-stops;
- an encountered person/place/event that differs by route;
- character initiative and player response while still moving;
- intentional quiet stretches.

The target is **inhabited movement**, not prompt saturation.

## Verification

Pre-playtest exact-branch runs passed the automated/runtime gates, including two rendered keyboard-driven routes.

Those checks established technical viability but did not predict the external locomotion/readability/density issues above.

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

## Next question

Do not rerun v010 for design feedback.

The next corrective experiment should ask:

> **Can Tabitha and the player visibly walk together in a shared travelling formation while a denser but still natural sequence of observations, acknowledgements and route events makes the journey feel inhabited?**

That experiment should preserve the parts v010 already validated: physical route choice, exploration value, public/private spatial differentiation and explicit separation.
