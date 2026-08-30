# Diorama Environment v001 — occlusion accepted

**Date:** 2026-08-30

## External playtest result

Question:

> Can you still understand where you and Tabitha are without the buildings visibly doing something ugly or distracting?

User response:

> yes

## Conclusion

The soft occlusion treatment passes the final greybox merge gate.

Accepted for this prototype baseline:

- traversal remains readable when substantial buildings obstruct the player/companion;
- the visibility response is not visually ugly or distracting in hands-on use;
- retain the inherited O2/R1 direction as the starting occlusion grammar for future representative environment work;
- do not reopen disappearing roofs, deep whole-building ghosting or dither/Alpha-Hash cutaways without a concrete regression.

This closes `diorama-environment-v001` as a spatial/camera greybox. Further work should move to representative environment art rather than adding more greybox systems.

Next prototype direction: `diorama-art-pipeline-v001` — one small corner taken through Blender -> GLB -> reusable Godot scene assembly while inheriting the accepted perspective/dead-zone/discrete-framing/45-degree-rotation/soft-occlusion grammar.
