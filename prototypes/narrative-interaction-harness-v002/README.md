# Narrative Interaction Harness v002 — Scenario-Pluggable Shell

**Status:** internally verified infrastructure milestone — **not a narrative playtest build**

**Baseline:** merged `narrative-interaction-harness-v001` and the accepted v006b lived-space / focused-VN grammar

## Purpose

Harness v001 successfully added rendered-client testing, consumed-affordance invalidation, repeated-input protection and trace anomaly detection. It still hard-coded its Ari/panel fixture inside the application and engine-facing presentation.

V002 makes the infrastructure genuinely reusable:

> **A scenario supplies state, actors, actions, VN nodes, meaningful-state projection and rendering. The stable shell owns input, movement, action consumption, time, VN lifecycle, telemetry, trace audit and browser release tests.**

The harness is proved with two unrelated dummy scenarios:

- **Loose panel:** Ari, an exposed room label and an old door at 19:03.
- **Misdelivered parcel:** Nia, a crushed address label and a lift at 12:17.

Neither fixture is intended for external evaluation.

## Stable architecture

```text
SCENARIO MODULE
- world dimensions and spawn
- actors and visual treatment
- initial state
- meaningful-state projection
- contextual actions
- focused VN graph
- rendering
- ending summary
        ↓
GENERIC RUNTIME
- availability and consumption
- stale-action rejection
- fictional-time invariants
- actor movement
- VN choice application
- cancellation and resumption
- trace and visible changes
        ↓
GENERIC CLIENT
- map rendering entry point
- keyboard movement
- interaction lock / key-repeat rejection
- prompt cycling
- VN controller
- trace export
        ↓
RELEASE GATE
- unit/contract checks
- two-scenario rendered completion
- adversarial repeated input
- cancel/resume
- trace audit
```

## Scenario contract

A scenario exports one object with:

- `id`, `title`, `world`, `initialStage`;
- `actors` and player presentation;
- `createState(runId)`;
- `meaningfulState(state)`;
- `actions`;
- `vnGraph`;
- `render(context, state, helpers)`;
- optional cancellation, tick, labels and ending summaries.

`src/scenario-contract.js` validates both the definition and its initial state.

## Regression protection

The generic runtime fails or rejects when:

- a non-repeatable action is used twice;
- an unavailable/stale action is invoked;
- an action advances fictional time without meaningful state change;
- a consumed action remains the current prompt;
- a VN choice changes no meaningful state;
- held or rapid repeated input attempts to replay an affordance.

`src/trace-audit.js` remains scenario-agnostic and detects repeated actions, outputs, stale prompts, time-without-change and unresolved interaction budgets.

## Verification

Local prepublication verification passed:

- **10/10** unit, contract, independence and trace tests;
- **4/4** rendered Chromium tests;
- both dummy scenarios complete through the same engine/client;
- rapid repeated interaction cannot replay a consumed action;
- focused interaction can cancel and resume;
- core files contain no Ari, Nia, panel or parcel state names.

Passing this harness proves runtime separation and reliability only. It does not prove narrative quality.

## Commands

Requires Node.js 22+ and Chromium/Chrome.

```bash
cd prototypes/narrative-interaction-harness-v002
CHROMIUM_PATH=/path/to/chromium npm test
npm start
```

Open either fixture:

```text
http://127.0.0.1:4182/?scenario=panel-fixture
http://127.0.0.1:4182/?scenario=parcel-fixture
```

## Promotion rule

Future narrative experiments should import this shell rather than copy or edit it. A content prototype must still pass separate interaction-design, writing-quality and whole-play gates before user playtesting.
