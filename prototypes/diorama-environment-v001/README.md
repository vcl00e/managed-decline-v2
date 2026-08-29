# Diorama Environment v001 — spatial greybox

**Status:** implementation candidate for external playtest

**Runtime:** Godot 4.x, self-contained; no Blender assets and no dependency on the narrative interaction harness.

## Baseline

This is a new-domain prototype. It inherits the accepted diorama/exploration design rather than the player-facing UI of the browser narrative labs.

Relevant accepted baseline:

- walking exists to make places, people and situations spatially meaningful, not as dead travel time;
- the world should feel like a compressed miniature/model-set version of contemporary Britain;
- exploration should use a fixed or semi-fixed elevated camera with no player camera control required for ordinary play;
- meaningful things should normally be tens of seconds apart rather than several minutes apart;
- diorama exploration should flow into narrative situations, while important world changes can remain visible in the map;
- recent narrative-prototype evidence says shared activity must feel like being with another character, not repeatedly chasing an autonomous NPC.

## New question / hypothesis

> Can a small, organic Godot greybox already make walking around feel legible and pleasant enough to justify the diorama format, while keeping a companion spatially present without turning her into something the player must chase?

This version is intended to settle spatial rules before any serious Blender asset work.

## Inherited accepted constraints

- compressed geography rather than realistic travel distances;
- organic/bendy composition rather than a square tile-grid presentation;
- walking should support noticing, anticipation, pacing and player-authored sequencing;
- no free camera rotation is required;
- the space should work as a little authored stage rather than a generic open world;
- player positioning should matter without constant prompts or objective text;
- a companion should be able to share space with the player without demanding pursuit.

## Deliberate re-tests / overrides

None. The prototype is testing a new implementation domain.

## New-domain freedoms

Because no previous Godot environment prototype exists, this version is free to choose:

- greybox proportions and map dimensions;
- camera height, angle and orthographic size;
- Godot scene/script structure;
- placeholder colour language;
- collision and movement tuning;
- lightweight spatial telemetry.

The `C` key deliberately exposes three camera framings so the playtest can compare them without rebuilding the project.

## Not being tested

- final art direction;
- Blender modelling quality;
- shaders, final lighting or weather;
- production navigation/pathfinding;
- finished NPC AI;
- VN transitions or dialogue quality;
- quests, objectives or progression;
- final environmental satire;
- exact production architecture for buildings or props.

The Tabitha object is explicitly a **spatial companion proxy**, not a character-behaviour prototype.

## Regression probes

Even though this is a new domain, check that it remains compatible with accepted higher-level design:

1. You can walk freely without accepting an objective.
2. You can notice the two-person situation near the corner shop from the map.
3. The street bends and side passage remain readable without a minimap.
4. The player can leave the obvious main route and return without getting lost.
5. Tabitha remains nearby when you explore instead of marching to a destination and making you follow.
6. No disappearing toast or tiny transient text is needed to understand what to do.

## Experience promises

### Player desire: wander and look

**Promise:** a compact neighbourhood with a curved street, terraces, green, corner shop, flats, bus stop and side passage should provide enough visual/spatial structure to make movement itself informative.

**Bandwidth:** uninterrupted lived-space movement.

**Development:** the player moves from the near bus-stop end through a bend with multiple sightlines into a green, frontage cluster and optional side route.

**Payoff / residue:** the player should be able to describe the neighbourhood from memory after only a short walk.

### Player desire: spend time beside a character

**Promise:** Tabitha remains company rather than becoming the destination.

**Bandwidth:** movement/proximity only, with three persistent observational captions when both characters arrive at the same place.

**Development:** the proxy follows the player's sustained movement intention, catches up if necessary and never deliberately runs ahead to demand pursuit.

**Payoff / residue:** the playtest can judge whether shared spatial presence feels materially different from following an autonomous NPC.

### Player desire: compare diorama framing

**Promise:** three orthographic framings can be compared instantly with `C`.

**Bandwidth:** one explicit test control rather than a production camera menu.

**Development:** closer, baseline and wide views change the balance between character readability and model-set composition.

**Payoff / residue:** one camera range should emerge as the best starting point for the Blender art-pipeline test.

## What is in the greybox

- 46 × 37 metre compressed model-set base;
- one curved main road with a pavement envelope;
- one narrower side route;
- five terrace fronts;
- corner shop;
- small three-storey flat block;
- garage/service block;
- public green, bench and trees;
- bus stop/shelter;
- fences and visible model edges;
- player capsule;
- Tabitha companion proxy;
- two staged NPCs near the shop as a visibility/curiosity probe.

All geometry is generated from Godot primitives so this prototype tests layout before asset production.

## Run

Use Godot 4.x:

```text
1. Open Godot Project Manager.
2. Import prototypes/diorama-environment-v001/project.godot.
3. Open the project.
4. Press F6/F5 (Run Project).
```

## Controls

- `WASD` / arrow keys — walk;
- `C` — cycle closer / baseline / wide orthographic framing;
- `F1` — hide/show the test HUD;
- `F8` — save a small JSON playtest trace under Godot's `user://` data location.

There is deliberately no objective marker and no interact button in v001.

## External playtest

Do **not** try to exhaustively inspect the map. Wander according to genuine curiosity for a few minutes.

Afterwards answer:

1. Did walking around this ugly greybox already feel spatially coherent, or did it feel like moving through arbitrary boxes?
2. Which camera framing did you prefer: closer, baseline or wide? Why?
3. Could you understand the bend, green, shop, flats and side passage without a minimap?
4. Did the geography feel pleasantly compressed, too cramped or too spread out?
5. Did Tabitha feel like she was **with you**, or did her movement still attract unwanted attention?
6. Did you notice the two NPCs by the shop before reaching them? Did their presence create curiosity?
7. Was there any point where a building or camera angle hid something you needed to understand?
8. Did you ever enjoy simply looking at the little place despite the primitive art?

The most important output is not whether the greybox is attractive. It is whether the spatial grammar is strong enough to justify making one small corner properly in Blender next.

## Trace fields

`F8` records only prototype-local spatial metrics:

- elapsed time;
- distance walked;
- chosen camera preset at export;
- fraction of time Tabitha was within the shared-presence radius;
- maximum companion separation;
- which shared stops and landmarks were reached;
- final player position.

The trace is supplementary. Subjective playtest feedback remains the primary evidence.
