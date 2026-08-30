# Diorama environment v001 — camera, occlusion and companion findings

**Date:** 2026-08-30
**Status:** external playtest findings; accepted where explicitly concluded below

## Player feedback

After the v1 camera findings were restored into v001:

1. **Dead-zone / movement:** the player reported that the prototype was **not dizzy anymore**. The movement weight remained acceptable.
2. **Close framing:** Close appears useful for intimate spaces, but needs representative models and real scenes before exact tuning can be settled.
3. **Wide framing:** Wide appears useful in wider spaces. The player proposed that close versus wide should support the narrative rather than being merely a manual viewing preference.
4. **Perspective:** perspective somewhat increased the feeling of being inside a miniature.
5. **45-degree rotation:** Z/X rotation was useful and pleasant. It made traversal feel more like walking around a model rather than adding unwanted camera-management work.
6. **Occlusion:** buildings do significantly obscure the player/Tabitha in the current perspective layout.
7. **Companion proxy:** the narration became clearer, but the text was rejected as tell-not-show. Tabitha still felt like she was simply following the player around rather than sharing an activity.

## Accepted / inherited conclusions

### Camera motion

The large dead-zone is accepted for this prototype direction. It removed the dizziness created by continual camera chase while preserving the useful sense of movement weight.

Do not return to a continuously trailing exploration camera without a concrete later regression.

### Perspective and rotation

The earlier v1 findings remain valid in this organic map:

- perspective miniature remains the baseline;
- exact smooth 45-degree camera rotation is useful;
- no default free mouse orbit is required.

### Framing is narrative staging vocabulary

Close / Standard / Wide should not be thought of only as player zoom settings.

Current design direction:

> camera distance is part of narrative and spatial staging.

Examples:

- Close can support intimate social arrangements, small interiors or detailed interaction;
- Standard can support ordinary exploration and local social space;
- Wide can support open spaces, ensemble situations, arrivals/departures, spectacle or situations where geography itself matters.

The `C` control remains useful in prototypes for comparing framing, but production scenes may select or bias framing contextually.

Exact distances remain deferred until representative art and authored scenes exist.

### Occlusion problem is confirmed

The perspective/rotation grammar exposes real building occlusion in the current organic map.

This activates the already-tested v1 starting solution rather than reopening rejected experiments:

- current camera/player geometry is authoritative;
- upper-body readability matters more than feet/lower legs;
- substantial buildings may receive a restrained soft shaded reveal;
- avoid strong fade while enough of the character remains readable;
- use only restrained R1-style anticipation;
- stacked substantial occluders may reveal together;
- do not use disappearing roofs, deep whole-building ghosting or dither/Alpha-Hash cutaways.

The v001 runtime now contains a lightweight GDScript version of that baseline for this greybox.

### Reliable following does not create companionship

The spatial-companion hypothesis is **not validated** by this test.

The proxy succeeded mechanically at staying near the player and avoiding the earlier chase problem, but the resulting experience was still essentially:

> Tabitha follows me around.

The explanatory captions made the intended interpretation clearer but did not create the experience; they were tell-not-show and are now hidden.

Do not try to fix this by adding more narration, relationship labels or increasingly elaborate follow-distance logic.

A future companionship test needs an actual **shared activity / social situation** in which both characters have meaningful reasons to act, react, stop, look, participate, initiate and move together. Spatial continuity should support that activity; it cannot substitute for it.

## Implication for the next prototype

The environment greybox has now done enough to justify an art-pipeline test once the soft-occlusion runtime receives a basic smoke test.

The next art prototype should:

- use perspective + dead-zone + 45-degree rotation as inherited defaults;
- treat Close / Standard / Wide as authored staging vocabulary;
- retain soft occlusion as a world-readability requirement;
- not attempt to prove companionship using a follower proxy;
- use a real small scene/activity later when testing two-character spatial interaction;
- focus its main risk on whether a reusable Blender → GLB → Godot kit can produce a genuinely attractive Managed Decline diorama efficiently.
