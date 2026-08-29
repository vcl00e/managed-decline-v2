# Harness v002 internal finding — scenario pluggability

**Date:** 2026-08-29
**Status:** internal infrastructure evidence; no user playtest requested

## Question

Could the merged reliability harness become a true scenario shell rather than another prototype whose engine and renderer happened to be named “harness”?

## Finding

Yes, at the tested scale.

The v001 implementation imported one concrete scenario directly, projected `ari.target` as meaningful state and drew Ari, ROOM 4, the loose panel and old door in the application layer. Replacing that content would therefore have reopened the supposedly stable core.

V002 moves those responsibilities into a validated scenario contract. The engine, client, VN controller and renderer no longer contain fixture-specific names or coordinates.

## Two-fixture proof

The same core completes:

### Fixture A — loose panel

```text
approach Ari
→ hold panel
→ read ROOM 4
→ focused choice
→ follow to door / leave it
```

### Fixture B — parcel

```text
approach Nia
→ lift parcel
→ read FLAT 2B
→ focused choice
→ carry to lift / leave at desk
```

The fixtures differ in actor, object, world dimensions, clock, actions, focused dialogue, destinations, rendering and endings.

## Automated evidence

- 10 unit/contract/trace tests passed.
- 4 real Chromium tests passed.
- Both scenarios completed through rendered keyboard input.
- Repeated interaction did not chain stale actions.
- Cancel/resume returned to the appropriate scenario-defined prompt.
- A static independence test rejected fixture names in the core modules.

## Scope limit

This proves only that a small narrative interaction can be supplied as a module without modifying the shell. It does not establish that the contract is sufficient for campaign-scale simulation, crowds, multiple simultaneous situations or production Godot architecture.

## Consequence

V008 may be implemented as a scenario/content package against this shell. Changes to `src/engine.js`, `src/create-app.js`, `src/vn.js`, `src/render.js` or `src/trace-audit.js` during v008 integration should be treated as a failed separation unless a genuinely new runtime requirement is explicitly reviewed.
