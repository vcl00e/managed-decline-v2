# Narrative Interaction Harness v001

**Status:** internally verified infrastructure milestone — **not a narrative playtest build**

**Baseline:** the accepted `narrative-interaction-lab-v006b` lived-space / focused-VN grammar

**Process:** governed by [`../PROTOTYPE-POLICY.md`](../PROTOTYPE-POLICY.md)

**Internal evidence:** [`findings/000-2026-08-29-infrastructure-stabilisation.md`](./findings/000-2026-08-29-infrastructure-stabilisation.md)

## Purpose

The v007d external run exposed a basic stale-affordance loop that should never have reached the user:

- `inspect_seam` executed 35 times;
- the same visible output repeated 35 times;
- fictional time advanced on every repetition;
- the interaction never reached its focused exchange or ending.

This harness pauses scenario iteration and establishes a reusable, deliberately simple runtime foundation before further narrative experiments.

Its job is not to prove that a scene is fun. Its job is to prevent basic runtime, input, prompt and route failures from consuming external playtest time.

## Delta specification

### Baseline

The player-facing foundation inherits the strongest accepted same-domain conclusions from v006b:

- compact lived space;
- low-burden contextual prompts;
- elastic meaningful time;
- map and focused VN as two bandwidths of one causal interaction;
- spatial continuation after focused dialogue;
- no dashboard, objective list, event log or visible developer state;
- a player can leave or cancel rather than being trapped in a content sequence.

### New question

> **Can a reusable interaction shell prove rendered-client reliability, consumed-affordance invalidation, duplicate-input safety, route completion and trace health before narrative content is given to the user?**

### Inherited constraints

- accepted v006b map/VN presentation remains the UI baseline;
- fictional time may advance only with meaningful state change;
- consumed contextual actions must disappear;
- focused dialogue cancellation returns to a live, resumable situation;
- important spatial consequences occur on the map;
- development diagnostics stay hidden from ordinary play.

### Deliberate re-tests

None of the accepted v006b interaction grammar is being challenged.

### New-domain freedoms

This is infrastructure rather than a story experiment, so it may expose internal APIs and use deliberately plain fixture content. Those diagnostics are available through the test interface, not the player-facing UI.

### Not being tested

- dialogue quality;
- character appeal;
- romance progression;
- group interaction;
- authored scenario quality;
- campaign simulation;
- procedural or LLM dialogue.

## Stable shell

The harness separates:

```text
SCENARIO DATA
contextual actions, focused nodes, world targets
        ↓
RUNTIME CONTRACT
availability, consumption, state change, fictional time, trace
        ↓
PRESENTATION
map, contextual prompt, focused VN, return to map
        ↓
RELEASE GATE
unit checks, intended pass, adversarial pass,
uninformed pass, trace audit
```

The included fixture is intentionally trivial:

```text
move to Ari
→ help hold a loose panel
→ consumed prompt disappears
→ read the exposed label
→ focused exchange
→ try the old handle or leave it
→ spatial continuation / ending
```

It is not intended for external evaluation.

## Runtime invariants

The engine rejects or fails when:

- a non-repeatable action is accepted more than once;
- a consumed action remains the current prompt;
- fictional time advances without meaningful state change;
- a VN choice changes no meaningful state;
- an unavailable/stale action is invoked directly.

The browser layer additionally:

- ignores held-key auto-repeat;
- prevents rapid duplicate input from replaying an affordance;
- preserves one runtime object across reset so controllers cannot retain stale references;
- allows focused interaction to pause and resume in the live space.

## Trace anomaly detector

`src/trace-audit.js` and `tools/audit-trace.mjs` detect:

- repeated identical non-repeatable actions;
- repeated identical visible output;
- fictional-time advancement without meaningful change;
- stale consumed prompts;
- excessive unresolved action counts;
- repeated identical time-advance reasons.

The detector supports both harness traces and the older v007d trace shape.

The committed regression fixture is a reduced specimen derived from the uploaded v007d failure. The complete uploaded trace remains with the v007d findings.

## Rendered-client test passes

The E2E suite drives the actual HTML/CSS/ES modules in headless Chromium using Chrome DevTools Protocol and real keyboard events.

### Intended pass

Completes:

```text
movement
→ contextual action
→ changed prompt
→ focused VN
→ choice
→ return to map
→ movement
→ ending
```

### Adversarial pass

Holds/repeats the interaction key and verifies:

- only one action use;
- no chained stale affordance;
- no duplicate fictional-time advancement;
- prompt updates to the next valid interaction.

It also cancels a focused exchange and resumes from the live map.

### Uninformed pass

Uses only visible prompts and generic controls. It does not call model transition functions or use the authored route as a walkthrough.

## Important internal finding

The first rendered test exposed a defect that all unit tests had missed:

- resetting the page replaced the runtime object;
- the VN controller retained the old runtime reference;
- map actions appeared correct;
- VN choices operated on stale state and silently failed.

The rendered-client gate caught this before the harness branch was published. Reset now mutates the stable runtime through `runtime.reset(...)` rather than replacing it.

This is direct evidence that rendered tests are doing work the previous model-only process did not.

## Commands

Requires Node.js 22+ and Chromium/Chrome available as one of:

- `$CHROMIUM_PATH`;
- `google-chrome`;
- `google-chrome-stable`;
- `chromium`;
- `chromium-browser`.

```bash
cd prototypes/narrative-interaction-harness-v001
npm run check
npm run test:unit
npm run test:e2e
npm test
```

Audit a trace:

```bash
node tools/audit-trace.mjs path/to/trace.json
```

Verify that the committed v007d regression specimen is rejected:

```bash
npm run audit:v007d-fixture
```

Run the fixture manually for infrastructure inspection:

```bash
npm start
```

Open:

```text
http://127.0.0.1:4180
```

## Promotion rule

No narrative scenario should be placed in front of the user from this harness until all of the following are true:

1. unit/state invariants pass;
2. intended rendered route passes;
3. adversarial rendered pass passes;
4. uninformed rendered pass passes;
5. exported trace passes anomaly audit;
6. exact committed-branch CI passes;
7. a separate writing/interaction review judges the content itself worth testing.

Passing this harness is necessary, not sufficient, for a narrative prototype to be playtest-ready.
