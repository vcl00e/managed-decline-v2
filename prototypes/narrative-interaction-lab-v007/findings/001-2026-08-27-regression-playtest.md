# Narrative Interaction Lab v007 — regression playtest

**Date:** 2026-08-27

**Status:** failed iteration; do not continue this build

## Tester feedback

The tester stopped during the `free_social` phase at the point where the UI said:

> **What is happening here**
>
> The evening has loosened up. Tabitha has drifted outside; Priya is lingering near the tea table; the radio crowd is still going.

They stopped because the run had become too exhausting to continue.

Specific feedback:

- the permanent panel on the right-hand side was annoying and too dense to scan-read;
- the panel made the experience feel like a web application rather than a game;
- the tester wanted time alone with somebody but the prototype repeatedly delivered group activity / group discussion instead;
- choices did not seem to do anything;
- the compact hall layout itself was liked and described as simple and elegant.

## Diagnosis

These were structural regressions rather than presentation polish issues.

### 1. Dashboard creep

V006b had already established a low-friction same-domain map presentation: world view plus sparse contextual notice/situation/interaction prompting, with development state kept out of ordinary play.

V007 replaced this with a permanent side column containing:

- `What is happening here`;
- `Nearby possibilities`;
- `Room tone`;
- developer state.

This externalised the simulation into a dashboard and competed with the fictional world for attention.

The map layout itself was not the failure and should be retained as useful evidence.

### 2. Invisible social railway

The intended design was a variety of one-to-one and small-group gatherings.

The implementation instead authored a required sequence:

```text
Tabitha one-to-one
→ join radio group
→ Priya joins group
→ mandatory group story
→ free-social phase
→ quieter one-to-one opportunities finally become central
```

In particular, the `kebab_story` group scene was required before the prototype reached `free_social` and before Tabitha's outside/private social configuration became available.

This meant a player who wanted quiet one-to-one company could not regulate their own social bandwidth. The prototype demonstrated a planned variety of social configurations rather than letting the player choose which social texture they wanted.

Accepted correction:

> **The world may contain one-to-one and small-group configurations, but the player should be able to regulate their social bandwidth by approaching, remaining, leaving, following, staying elsewhere or ending the evening. Variety should emerge from social topology rather than be imposed as an authored sampler.**

### 3. Deferred consequence fog

Most early choices wrote hidden conduct tags such as:

- `group_participation`;
- `played_along`;
- `publicly_with_tabitha`;
- `respected_story_ownership`;
- `social_bridge`.

The stronger interpretation and residue were deferred until the final aftermath.

Therefore the tester received little immediate evidence that choices changed anything during the portion they played.

Accepted correction:

> **A meaningful situational choice should normally cast an observable shadow within the next interaction cycle — changed behaviour, position, audience, dialogue, affordance, arrangement or continuation — while longer-term interpretation may still accumulate underneath.**

Purely expressive/self-defining choices remain valid, but the prototype must not present many apparently consequential choices whose only immediate effect is hidden telemetry.

### 4. Interaction inflation

Because v007 wanted to test group interaction and accumulated interpretation, the build overrepresented group interactions in order to obtain enough experimental samples.

This made the experimenter's need to gather evidence dominate the player's preferred experience.

Accepted correction:

> **Testing a feature does not justify forcing the player to consume a large quantity of that feature. Put the affordance in the world and test whether/how the player voluntarily uses it.**

## What remains valuable from v007

Do not discard everything from the failed build.

Retain as useful evidence:

- the compact community-hall / forecourt / side-yard topology;
- the pleasure-first Friday-night premise;
- one-to-one and 2–4-person gatherings as appropriate social scales;
- NPC-to-NPC conversation as desirable when it does not imprison the player;
- audience and public/private provenance as useful hidden state;
- deterministic accumulated conduct interpretation as a worthwhile longer-term target;
- mostly neutral/positive residue and ordinary-life progression;
- non-intervention and going home as valid play.

## Accepted v007 correction target

The next iteration should be a targeted correction, `narrative-interaction-lab-v007b`, rather than extending the failed sequence.

Primary question:

> **Can the player freely regulate their social experience between solitude, one-to-one company and small groups inside a compact lived space, while sparse meaningful choices produce sufficiently immediate/readable consequences that the evening itself remains enjoyable?**

Accumulated character interpretation remains present underneath, but it is secondary until the larger social slice is enjoyable to inhabit.

## Required v007b regressions to prevent

Before external playtest, verify at minimum:

- no permanent right-hand dashboard / scrolling room-tone log / visible developer state during ordinary play;
- quiet company with Tabitha is reachable from the opening without completing an unrelated group scene;
- a player can spend most of the run one-to-one if they prefer;
- a player can spend most of the run with groups if they prefer;
- a player can observe with minimal participation;
- Priya can join social space without protagonist shepherding;
- ignoring Priya does not deadlock unrelated play;
- joining a group does not require finishing all of that group's content before leaving;
- no group scene is a universal prerequisite for later social possibilities;
- meaningful choices have timely visible acknowledgement;
- non-intervention and leaving remain valid;
- the player is not asked to scan a permanent action/situation dashboard.

## Process finding

This playtest also exposed a development-process failure: v007 preserved some conceptual lessons from v006b but did not treat them as inherited regression constraints. New experimental goals quietly overrode previously accepted same-domain behaviour.

This resulted in the accepted repository-wide `prototypes/REGRESSION-POLICY.md` workflow:

> **Accepted designs are inherited defaults, not permanent laws. A later prototype may override them deliberately, but may not ignore them accidentally.**

Future prototype playtests should primarily answer genuinely unresolved questions rather than rediscover already-corrected failures.
