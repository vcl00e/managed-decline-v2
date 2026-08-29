# Narrative Interaction Lab v007d — external playtest: unplayable stale-affordance loop

**Date:** 2026-08-29

**Status:** external playtest evidence; v007d failed and should not be patched forward

**Trace:** [`managed-decline-v007d-traces-2026-08-29.json`](./managed-decline-v007d-traces-2026-08-29.json)

## User feedback

> this is unplayable. we seem to have reached a point where the prototyping is not helping to make progress. It is ok to fix the basics on the first few prototypes but I am not going to spend time giving detailed feedback correcting basic things on every single prototype. what do we do?

## Direct trace evidence

The run reached `side_search` and then accepted the same `inspect_seam` action **35 times**.

Each activation:

- recorded `inspect_seam` again;
- emitted the identical visible change, `You trace the straight mortar joint where the brick pattern changes.`;
- advanced fictional time by two minutes;
- left the activity in `side_search`;
- left `focusedExchangeSeen` as `false`;
- left `resolved` as `false`;
- left the run unfinished.

Fictional time advanced from **19:03 to 20:18** while the interaction never reached its next meaningful state.

This is a deterministic stale-affordance / duplicate-input loop, not an unresolved question about whether the interaction was enjoyable.

## Why the internal gate failed

The internal preflight followed the authored happy path and proved that one intended sequence could complete. It did not establish that the rendered client was robust under repeated input or that consumed contextual actions disappeared from the actual prompt system.

The model/state tests asserted intended transitions directly. They did not drive the real browser UI through the same interaction the player used.

The build was therefore incorrectly labelled ready despite lacking:

- rendered-client duplicate-input protection;
- consumed-affordance invalidation checks;
- stale-prompt detection;
- repeated-output trace auditing;
- interaction-budget / unresolved-run detection;
- adversarial and uninformed full-client passes.

## Accepted consequence

Stop the v007 scenario iteration. Do not create v007e and do not patch this build for another user test.

The next milestone is prototype infrastructure stabilisation:

1. build a reusable interaction harness from the accepted v006b map/VN baseline;
2. exercise the real rendered client with browser automation;
3. add automatic trace anomaly detection;
4. separate runtime reliability from interaction design and writing quality;
5. keep the user out of basic runtime and route QA.

## Release-gate requirement derived from this failure

A build must fail internally when any of the following occurs without an explicit repeatable-action declaration:

- an already-consumed action remains available;
- the same action/output pair executes repeatedly;
- fictional time advances without relevant state, information, position, affordance or social change;
- a displayed prompt remains stale after its action;
- a run exceeds a small interaction budget without resolving or offering a clear exit;
- holding or repeating the interaction key creates duplicate transitions;
- a full intended route cannot be completed through the rendered client.

The user should not be asked to test another narrative-interaction build until this infrastructure milestone passes independently.