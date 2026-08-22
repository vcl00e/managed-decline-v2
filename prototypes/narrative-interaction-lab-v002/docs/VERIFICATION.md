# Verification record

- **Date:** 2026-08-22
- **Prototype:** `narrative-interaction-lab-v002`
- **Purpose:** implementation verification only; this is **not human playtest evidence**

## Environment

- Node.js `v22.16.0` used for validation and local serving; the declared minimum remains Node.js 18.
- npm `10.9.2`.
- Chromium `144.0.7559.96` used for automated browser-path checks.
- Linux x86-64 test environment.

## Structural validation

Command:

```bash
npm test
```

Result:

```text
baseline: 40 reachable nodes, 104 choices, routes 24–28 decisions.
observation: 40 reachable nodes, 106 choices, routes 24–30 decisions.
decisive: 41 reachable nodes, 107 choices, routes 25–29 decisions.
Validated 3 conditions successfully.
```

The validator establishes that:

- all condition-specific nodes are reachable;
- every structural route reaches a phone interruption, Saturday aftermath and an ending;
- baseline contains no separate observation or decisive-action input;
- observation contains exactly two optional inspections at one hall-map node, and supports both inspecting everything and inspecting nothing;
- decisive contains exactly three unavoidable intervention points, with ten alternatives across them;
- important authored decisions retain several credible alternatives;
- route lengths remain inside the intended long-form prototype budget;
- the browser shell has no external assets, network-transmission API, progress bar or meter;
- trace export remains pretty-printed, readable JSON;
- the documented prototype, scenario, playtest, trace and findings files are present.

## HTTP serving checks

The local server was started on `127.0.0.1:4173`. The following responses were verified:

| Request | Expected | Result |
|---|---:|---:|
| `/` | 200 | 200 |
| `/app.js` | 200 | 200 |
| `/story.mjs` | 200 | 200 |
| `/styles.css` | 200 | 200 |
| `/docs/PLAYTEST.md` | 200 | 200 |
| `/missing` | 404 | 404 |

The server applies no-cache headers and rejects traversal outside the prototype root.

## Automated browser-path checks

Each condition was exercised from the start screen through the Saturday aftermath, ending, post-run survey and local trace-save path. The route selector deliberately chose the first visible authored response at ordinary nodes; the observation run used both optional inspections.

| Condition | Choices | Node entries | Unique nodes | Map choices | Phone | Observations | Decisive actions | Recorded events | Browser exceptions/warnings |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Baseline | 26 | 27 | 27 | 5 | 1 | 0 | 0 | 53 | 0 |
| Optional observation | 28 | 29 | 27 | 5 | 1 | 2 | 0 | 57 | 0 |
| Sparse decisive actions | 27 | 28 | 28 | 5 | 1 | 0 | 3 | 55 | 0 |

All three automated routes reached the ending titled **A quieter record**. That shared ending title reflects the selected automated choices and is not the only possible ending state.

Blind-mode checks also confirmed:

- the start screen labels the conditions only as `Evening A`, `Evening B` and `Evening C`;
- the condition disclosure is hidden;
- a preassigned condition can be selected through the query string;
- the in-run condition label remains neutral;
- design annotations remain hidden.

### Browser harness limitation

The execution environment’s Chromium policy blocked reliable direct navigation to localhost and file URLs. For runtime verification, the exact `index.html`, `styles.css`, `story.mjs` and `app.js` sources were combined into one no-network document and loaded with the Chrome DevTools Protocol.

Two harness-only substitutions were made:

1. the requested query string was injected directly so each assigned condition could be exercised;
2. browser `localStorage` was replaced by a same-interface in-memory store because an `about:blank` document has an opaque origin.

No story graph, renderer, survey, telemetry transformation or interaction logic was changed. HTTP serving and the production `localStorage` calls were checked separately by the structural/static tests. A brief manual run from the actual local server remains appropriate before external testing on another machine.

## Visual review

Desktop captures were inspected at 1365×900 and 1440×1100 for:

- start-screen hierarchy and condition selection;
- arrival diorama readability;
- focused dialogue layout;
- optional-observation presentation;
- pub ensemble state;
- decisive-action presentation;
- Saturday aftermath;
- survey and saved-trace states.

The compact map, story panel, choice controls and research forms remained legible. A 390×844 mobile emulation also showed no horizontal overflow: document `scrollWidth` remained 390 px, the diorama and story panel stacked at 366 px wide, and the arrival map retained three usable numbered hotspots. A few condition-revealing phrases discovered during this review were removed from player-facing scene prose and map legends; the corresponding research explanations remain available only in non-blind condition descriptions or annotation mode.

## What remains unverified

Implementation verification cannot establish:

- actual 25–40 minute human completion time;
- dialogue fatigue;
- emotional engagement or character attachment;
- whether players notice and use optional observations voluntarily;
- whether decisive actions improve memory or ownership;
- whether the three conditions feel meaningfully different without revealing the comparison;
- accessibility with screen readers, switch controls or a broad device matrix;
- production-quality art, audio, animation or timing.

Those are the purpose of the human protocol in [`PLAYTEST.md`](PLAYTEST.md). Findings should be recorded under `findings/` only after real sessions.
