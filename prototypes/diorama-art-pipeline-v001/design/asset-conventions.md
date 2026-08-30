# Asset conventions — diorama art pipeline v001

## Coordinate and scale

- 1 Blender/Godot unit = 1 metre.
- +Y is up in exported glTF/GLB.
- Asset origins sit at ground level and near the useful placement centre.
- Buildings remain separate scene assets; street geometry, props and vegetation are independently placeable.

## Geometry

The prototype deliberately uses slightly exaggerated miniature proportions rather than literal architectural survey dimensions.

- doors and windows are slightly oversized for the elevated perspective camera;
- roof/chimney/drainpipe silhouettes are stronger than strict realism;
- kerbs and railings are thick enough to survive Wide framing;
- micro-detail that cannot survive the accepted camera range is omitted.

## Materials

Use a Metal/Rough PBR subset that round-trips cleanly through glTF:

- base colour;
- roughness;
- metallic where appropriate;
- emissive only for explicit light sources;
- no engine-specific Blender shader tricks in source assets.

Production texture work is deliberately deferred until this geometry/material/assembly workflow is accepted.

## Modularity test

The first kit contains separate assets for:

- corner shop;
- terrace end;
- curved road/pavement/kerb assembly;
- green edge/railing;
- bench;
- wheelie bin;
- lamp post;
- tree.

Success requires a second composition to be materially cheaper to assemble from these pieces than the first one.
