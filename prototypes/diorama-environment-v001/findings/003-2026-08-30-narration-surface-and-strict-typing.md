# Diorama Environment v001 — narration surface and strict typing

**Date:** 2026-08-30

## User correction

The bottom narration panel itself was good and should not have been removed. The problem was the previous companion copy, which told the player what Tabitha's proximity was supposed to mean instead of showing it.

Accepted distinction:

- **keep the narration surface** as useful presentation bandwidth for valid narration;
- do **not** use narration to certify companionship, relationship state or intended emotion;
- narration should describe observable world/situation detail, physical beats, or other material that earns narration bandwidth.

For this greybox, the three shared-stop captions have been converted from relationship explanation into observable environmental narration.

## Runtime correction

The first soft-occlusion build produced a GDScript parser failure because warnings are treated as errors and a local variable inferred its type from `Dictionary.get()`, which returns `Variant`.

The runtime now uses explicit static types at Variant boundaries and other ambiguous locals rather than suppressing the warning.

This is a runtime correction only; it does not change the accepted occlusion hypothesis.
