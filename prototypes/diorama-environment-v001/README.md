# Diorama Environment v001 — spatial greybox

**Status:** active playtest iteration

**Runtime:** Godot 4.7-compatible GDScript, self-contained; no Blender assets and no dependency on the narrative interaction harness.

## Baseline

This is a new-domain prototype, but it is **not** starting the camera grammar from zero.

The first playable iteration inherited the v2 diorama notes but accidentally reopened presentation questions that had already received hands-on testing in `managed-decline-v1`. After the first v001 playtest, the relevant v1 evidence was recovered and is now treated as inherited evidence for this prototype.

Relevant accepted baseline:

- walking exists to make places, people and situations spatially meaningful, not as dead travel time;
- the world should feel like a compressed miniature/model-set version of contemporary Britain;
- meaningful things should normally be tens of seconds apart rather than several minutes apart;
- the miniature world should be pleasant to traverse in its own right;
- **perspective** previously felt more intimate than orthographic, while the miniature identity came from composition/proportions rather than projection;
- a **large camera dead-zone with immediate correction** previously felt better than a continuously trailing follow camera;
- smooth **exact 45° camera rotation** was accepted, with no default free mouse orbit;
- discrete **Close / Standard / Wide** framing states fit better than arbitrary analogue camera fiddling;
- `canvas_items + expand` responsive presentation was accepted;
- story-led physical continuity is preferable to NPC teleport/marker progression;
- recent v2 narrative-prototype evidence says shared activity must feel like being with another character, not repeatedly chasing an autonomous NPC.

Primary recovered sources:

- `managed-decline-v1/docs/TEST_FINDINGS.md`;
- `managed-decline-v1/docs/VERTICAL_SLICE_01_ACCEPTED_FINDINGS.md`.

## New question / hypothesis

> Can an organic, compact Godot greybox retain the pleasant miniature traversal previously demonstrated in v1 while supporting a more organic neighbourhood topology and companion presence, without continuous camera motion making the player dizzy?

This version is intended to settle spatial rules before serious Blender asset work.

## Inherited accepted constraints

- compressed geography rather than realistic travel distances;
- organic/bendy composition rather than a square tile-grid presentation;
- walking should support noticing, anticipation, pacing and player-authored sequencing;
- perspective miniature presentation;
- large dead-zone exploration camera with immediate translation correction;
- smooth discrete 45° rotation rather than free mouse orbit;
- discrete authored framing states;
- responsive world presentation;
- the space should work as a little authored stage rather than a generic open world;
- player positioning should matter without constant prompts or objective text;
- a companion should be able to share space with the player without demanding pursuit.

## Deliberate re-tests / overrides

The first v001 implementation used orthographic projection and continuous smoothed camera following. That implementation is now deliberately overridden because:

1. v1 already had stronger accepted hands-on evidence for perspective + dead-zone;
2. the first v001 playtest reported that the motion/bobbing helped solidity and momentum but was strong enough to risk dizziness;
3. the same playtest found value in both closer and farther framing and asked for some scenes to be capable of going closer.

The player movement acceleration remains in place so the useful sense of momentum is not removed with the camera drift.

## New-domain freedoms

This prototype remains free to choose:

- greybox proportions and map dimensions;
- exact dead-zone bounds;
- exact Close / Standard / Wide distances;
- organic route composition;
- companion follow tuning;
- placeholder colour language;
- lightweight spatial telemetry.

Current camera tuning deliberately makes **Close** closer than the v1 baseline so it can probe the user's request for more intimate scene framing.

## Not being tested

- final art direction;
- Blender modelling quality;
- final shaders, lighting or weather;
- finished NPC AI;
- VN transitions or dialogue quality;
- quests, objectives or progression;
- final environmental satire;
- final environment occlusion treatment;
- exact production architecture for buildings or props.

The Tabitha object is explicitly a **spatial companion proxy**, not a character-behaviour prototype.

## Regression probes

1. Walking remains pleasant without an objective marker.
2. The camera can remain still while the player moves around within a substantial part of the composition.
3. Crossing the dead-zone boundary corrects the framing promptly rather than making the camera drift after the player.
4. Movement remains screen-relative after Z/X camera rotation.
5. Close / Standard / Wide are materially distinct and repeatable.
6. Close can support personal spatial staging; Wide can show the model-set composition.
7. The bend and side passage remain understandable at multiple 45° camera angles.
8. Tabitha remains nearby instead of marching ahead and demanding pursuit.
9. No disappearing toast or tiny transient text is required to understand the test.

## Experience promises

### Player desire: wander and look

**Promise:** a compact neighbourhood with a curved street, terraces, green, corner shop, flats, bus stop and side passage provides enough spatial structure to make movement informative.

**Bandwidth:** uninterrupted lived-space movement.

**Development:** the player moves through a bend with multiple sightlines into a green, frontage cluster and optional side route.

**Payoff / residue:** the player should be able to describe the neighbourhood from memory after only a short walk.

### Player desire: feel grounded while moving

**Promise:** character acceleration preserves some physical momentum while the camera does not continuously chase every small movement.

**Bandwidth:** player movement plus a large camera dead-zone.

**Development:** the player can move freely inside the composition; the camera only translates when they push beyond the authored screen-space envelope.

**Payoff / residue:** movement should feel tactile without producing the dizziness reported in the first v001 test.

### Player desire: spend time beside a character

**Promise:** Tabitha remains company rather than becoming the destination.

**Bandwidth:** movement/proximity only, with three persistent observational captions when both characters arrive at the same place.

**Development:** the proxy follows the player's sustained movement intention, catches up if necessary and never deliberately runs ahead to demand pursuit.

**Payoff / residue:** the playtest can judge whether shared spatial presence feels materially different from following an autonomous NPC.

### Player desire: compare authored framing

**Promise:** Close / Standard / Wide can be compared instantly with `C`, while Z/X changes the authored viewpoint by exact 45° increments.

**Bandwidth:** explicit prototype controls rather than a production camera menu.

**Development:** Close prioritises people/local detail; Standard balances navigation and composition; Wide exposes more of the miniature.

**Payoff / residue:** the test should establish where each framing has value rather than forcing one universal distance.

## What is in the greybox

- 46 × 37 metre compressed model-set base;
- one curved main road with a pavement envelope;
- one narrower side route;
- five terrace fronts;
- corner shop;
- small flat block;
- garage/service block;
- public green, bench and trees;
- bus stop/shelter;
- fences and visible model edges;
- player capsule;
- Tabitha companion proxy;
- two staged NPCs near the shop as a visibility/curiosity probe.

All geometry is generated from Godot primitives so this prototype tests layout before asset production.

## Run

Use Godot 4.7.x:

```text
1. Open Godot Project Manager.
2. Import prototypes/diorama-environment-v001/project.godot.
3. Open the project.
4. Run the project.
```

## Controls

- `WASD` / arrow keys — walk, always relative to the current camera;
- `C` — cycle Close / Standard / Wide framing;
- `Z` / `X` — rotate smoothly to the previous/next exact 45° view;
- `F1` — hide/show the test HUD;
- `F8` — save a small JSON playtest trace under Godot's `user://` data location.

There is deliberately no objective marker and no interact button in v001.

## External playtest

Do **not** exhaustively inspect every combination. Wander naturally.

Pay particular attention to:

1. Does the dead-zone remove enough of the dizzy/trailing-camera feeling while keeping movement solid?
2. Is **Close** now close enough for a personal spatial beat?
3. Where does **Wide** improve the scene rather than merely making the character small?
4. Does perspective feel more like being *inside* the miniature than the earlier orthographic implementation?
5. Does Z/X rotation improve understanding/pleasure, or does this organic map only work from selected authored angles?
6. Does movement remain intuitive after rotation?
7. Does any building hide the player or the route badly enough that the accepted v1 soft-occlusion solution needs to be ported immediately?
8. Does Tabitha feel like she is with you rather than being chased?

The main output is still whether the spatial grammar is strong enough to justify making one small corner properly in Blender.

## Trace fields

`F8` records:

- elapsed time;
- distance walked;
- perspective projection;
- chosen framing preset;
- camera angle;
- dead-zone dimensions;
- fraction of time Tabitha was within the shared-presence radius;
- maximum companion separation;
- visited shared stops and landmarks;
- final player position.

The trace is supplementary. Subjective playtest feedback remains primary evidence.
