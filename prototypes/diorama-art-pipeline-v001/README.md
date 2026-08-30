# Diorama Art Pipeline v001 — corner shop bend

**Status:** implementation candidate for first representative-art playtest

**Runtime:** Godot 4.7.x

**Art path under test:** Blender source kit → embedded glTF → reusable Godot scene assembly

## Baseline

This prototype begins after `diorama-environment-v001` settled the main spatial grammar.

Inherited accepted baseline:

- perspective miniature presentation;
- 34° exploration FOV as the current starting point;
- large dead-zone camera with immediate translation correction;
- screen-relative movement with retained acceleration/momentum;
- smooth exact 45° rotation with no default free mouse orbit;
- discrete Close / Standard / Wide framing as narrative/spatial staging vocabulary;
- responsive `canvas_items + expand` presentation;
- restrained O2/R1-style soft occlusion when substantial architecture blocks most of the player's upper body;
- narration panel is a useful surface, but narration must describe or frame valid observable material rather than tell the player what a relationship is supposed to feel like.

The previous follower proxy did **not** establish companionship. This prototype does not attempt to solve that problem.

## New question / hypothesis

> Can one representative Managed Decline street corner achieve a distinctive, attractive miniature-Britain look through a reusable Blender → embedded glTF → Godot workflow, while preserving the accepted movement/camera grammar and making a second environment materially cheaper to build?

The prototype is successful only if both visual quality **and reuse** are credible.

## Inherited constraints

- do not reopen orthographic versus perspective without a concrete art regression;
- do not replace the dead-zone with continuous camera chase;
- keep Close / Standard / Wide available while representative art establishes their useful ranges;
- preserve readable traversal under architectural occlusion;
- maintain compressed geography and authored composition rather than literal town scale;
- the place should feel cared-for and specific, not merely like a generic run-down game environment;
- humour/decline should emerge from accumulated detail, maintenance, signage, temporary fixes and mismatch rather than turning the place into visual misery.

## Deliberate re-tests / overrides

### Framing values

The **vocabulary** Close / Standard / Wide is inherited. Exact radii/heights are deliberately re-tuned against representative geometry because the previous values were tested against grey boxes.

### Model proportions

Greybox building proportions are not inherited. The art kit may exaggerate windows, doors, kerbs, roof silhouettes and props if that improves miniature readability.

## New-domain freedoms

- Blender mesh topology and source organisation;
- glTF asset boundaries;
- material palette and roughness;
- modular building/prop decomposition;
- environment dressing density;
- representative lighting;
- production naming/origin conventions;
- how much detail belongs in geometry versus later textures.

## Not being tested

- final texture resolution or complete PBR texture sets;
- final character models/animation;
- companionship;
- quests, progression or authored scenario quality;
- final weather/time-of-day system;
- LOD/streaming for a full town;
- procedural generation of whole neighbourhoods;
- interiors;
- final production occlusion architecture.

## Prototype corner

The test composition contains:

- a reusable corner shop with layered shopfront, windows, fascia, awning, door, drainpipe, rooftop vents and service extension;
- a reusable terrace-end house with gable silhouette, windows, door, sills, garden wall, chimney and satellite detail;
- a curved road asset with separate asphalt, pavement, kerbs and double-yellow geometry;
- a green-edge/railing module;
- reusable bench, wheelie bin, lamp post and tree assets;
- warm/cool late-afternoon lighting in Godot;
- readable environmental narration at several points.

The Godot scene assembles these as separate embedded `.gltf` assets. It is intentionally **not** one monolithic exported street scene.

## Blender / glTF workflow

Godot recommends glTF 2.0 for 3D scenes. This prototype commits embedded `.gltf` assets so the entire artifact remains plain-text/versionable through the available repository connection; the Blender source generator uses the same embedded glTF form. Production may switch to `.glb` later without changing the asset boundaries.

See:

- `assets/source/blender/generate_art_kit.py`
- `design/asset-conventions.md`
- `assets/README.md`

### Environment limitation for the initial implementation

The assistant execution environment used to create this branch does not contain a Blender or Godot binary. Therefore:

- the Blender source generator is committed but was not executed here;
- the initial embedded glTF assets were generated from the same parametric asset specification using a local glTF-capable geometry surrogate so the Godot scene is immediately testable;
- the first local Blender regeneration is an explicit pipeline gate;
- the first local Godot launch remains the runtime/rendering gate.

This limitation is recorded rather than disguised.

## Run

1. Open `prototypes/diorama-art-pipeline-v001/project.godot` in Godot 4.7.x.
2. Allow the glTF imports to complete.
3. Run the project.

Optional Blender verification first:

```bash
cd prototypes/diorama-art-pipeline-v001
blender --background --factory-startup --python assets/source/blender/generate_art_kit.py
```

Then reopen/focus Godot so the refreshed glTF assets import.

## Controls

- `WASD` / arrow keys — walk;
- `C` — cycle Close / Standard / Wide framing;
- `Z` / `X` — rotate by exact 45° increments;
- `F1` — hide/show test HUD.

## Experience promises

### Player desire: enjoy looking at the place

**Promise:** even this small corner should begin to communicate a distinctive little-Britain miniature identity rather than merely being legible game geometry.

**Bandwidth:** uninterrupted exploration with restrained environmental narration.

**Development:** road bend, shopfront detail, terrace silhouette, green edge and props should produce different compositions as the player moves/rotates.

**Payoff/residue:** the player should remember at least two visual details without being prompted to inspect them.

### Player desire: feel spatial/narrative framing

**Promise:** Close, Standard and Wide should have visibly different uses with representative environment assets rather than only changing how large grey boxes appear.

**Bandwidth:** direct `C` comparison during ordinary movement.

**Development:** Close should reveal authored façade/prop detail; Wide should improve open bend/green/geographic compositions; Standard should remain comfortable general exploration.

**Payoff/residue:** the playtest should identify where each framing belongs in the eventual narrative staging grammar.

### Developer desire: reuse the kit

**Promise:** the corner is assembled from reusable asset scenes rather than one bespoke model.

**Development:** buildings, street, green edge and props remain separately placeable and independently exportable.

**Payoff/residue:** the next street composition should reuse several of these assets with little or no remodelling.

## First playtest questions

Do not judge this against finished AAA environment art. Judge whether the **direction and production method** are worth funding.

1. Does the scene now look like the beginning of a distinctive miniature Britain, or still primarily like programmer art?
2. Which specific objects/details sell or fail the miniature effect?
3. Does Close reveal worthwhile authored detail, or merely make simple geometry more obvious?
4. Does Wide make the bend/green composition more attractive and understandable?
5. Are the current exaggerated proportions helping readability or making the architecture toy-like in the wrong way?
6. Does rotating the camera expose bad backs/sides that need to become part of the asset standard?
7. Does soft occlusion remain unobtrusive with imported art assets?
8. Does the environmental narration complement the scene without explaining what you are supposed to feel?
9. Most importantly: does this look promising enough to justify replacing the surrogate glTF assets with the Blender-generated exports and then adding a first proper texture/material pass?

## Decision rule

If the answer to question 9 is **no**, do not expand the asset library. Rework the visual thesis or asset proportions first.

If **yes**, the next pass should be a focused Blender/material iteration on this same corner followed by a **second composition made substantially from the same kit**. That second composition is the reuse test.
