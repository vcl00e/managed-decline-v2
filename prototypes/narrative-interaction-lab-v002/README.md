# Narrative Interaction Lab v002 — Listening Exercise

- **Status:** test-ready comparative prototype
- **Scenario status:** research fixture; not automatically canon for *Managed Decline*
- **Expected run length:** approximately 25–40 minutes
**Runtime:** dependency-free browser application; Node.js 18 or later is used only for the local server and validator

## Purpose

v001 found that focused dialogue substantially outperformed both the narrative-support and system-forward variants in all three short slices. Small support actions remained potentially useful where they changed context, information or visible aftermath, but they became harmful when they operationalised subtext, interrupted intimate rhythm or announced the correct problem to solve.

v002 therefore does **not** test whether mechanics should replace dialogue. It tests a narrower production question:

> Across one sustained evening, how much support can a dialogue-first narrative use before support becomes process?

The prototype holds one authored evening constant and compares three conditions:

| ID | Condition | Separate support input |
|---|---|---|
| `baseline` | Dialogue baseline + passive diorama | None |
| `observation` | Baseline + optional observation | Two optional inspections at one abstraction gap |
| `decisive` | Baseline + sparse decisive actions | Three mandatory intervention points, one at each major scene |

Every condition retains:

- the same characters, situation and dramatic spine;
- frequent map-level social sequencing;
- focused dialogue choices;
- a phone interruption;
- an intimate thread, ensemble scene and institutional contradiction;
- immediate reaction and Saturday-morning aftermath;
- no objectives, relationship meters, correctness indicators or optimisation sidebar.

The dialogue baseline is allowed to win.

## Run

```bash
cd prototypes/narrative-interaction-lab-v002
npm test
npm start
```

Then open:

```text
http://127.0.0.1:4173
```

The server binds to `127.0.0.1` and stores no data. Set another port with either:

```bash
PORT=4180 npm start
node server.mjs --port=4180
```

## Test modes

Query parameters may be combined.

```text
?blind=1
```

Uses neutral condition names (`Evening A`, `Evening B`, `Evening C`) and removes the condition disclosure from the start screen.

```text
?annotate=1
```

Shows design intent under choices and node-level implementation annotations. Use only for internal review, never for a blind playtest.

```text
?variant=baseline
?variant=observation
?variant=decisive
```

Preselects a condition. It does not auto-start the run, so the tester can still enter an anonymous identifier.

Recommended formal links:

```text
http://127.0.0.1:4173/?blind=1&variant=baseline
http://127.0.0.1:4173/?blind=1&variant=observation
http://127.0.0.1:4173/?blind=1&variant=decisive
```

## Data handling

All telemetry remains in browser `localStorage` until it is exported or cleared. Nothing is transmitted.

A completed trace records:

- anonymous tester and facilitator labels;
- condition and test mode;
- node entries and choice selections;
- decision dwell time;
- before/after state snapshots;
- map, phone, observation and decisive-action counts;
- ending state and concrete residues;
- post-run ratings and free-text answers.

Use **Export readable JSON** after each batch. The file is pretty-printed rather than compressed. See [`docs/TRACE-SCHEMA.md`](docs/TRACE-SCHEMA.md).

Do not use a real name in the tester field. The prototype has no consent-management or personal-data workflow.

## Files

```text
index.html                         application shell
styles.css                        responsive UI and CSS diorama
app.js                            runtime, rendering, telemetry and survey
story.mjs                         authored condition graphs and state
server.mjs                        no-cache local static server
validate.mjs                      graph, dosage and privacy checks
scenario-payload/                 human-readable scenario contract
docs/DESIGN.md                    hypotheses and implementation boundaries
docs/PLAYTEST.md                  facilitator and analysis protocol
docs/SCENARIO.md                  narrative/situation specification
docs/TRACE-SCHEMA.md              exported JSON structure
docs/VERIFICATION.md              implementation verification record
findings/README.md                location for numbered findings reports
```

## Validation

`npm test` currently verifies that:

- all runtime nodes are reachable in each condition;
- every route reaches the phone interruption, visible aftermath and ending;
- the baseline exposes no separate support action;
- observation exposes exactly two optional inspections at the hall and no decisive action;
- decisive exposes exactly three unavoidable action points and no observation controls;
- route lengths remain in the intended long-form test range;
- important decisions retain several authored alternatives;
- the app has no external resources, network transmission code, progress bars or meters;
- JSON export remains human-readable.

Automated browser routes have completed all three conditions end to end, including the post-run survey and trace-save path, without a runtime exception or console warning. Blind naming and hidden annotations were also checked. See [`docs/VERIFICATION.md`](docs/VERIFICATION.md) for the exact route metrics and harness limitation.

## Current limitations

- The CSS diorama is an interaction and staging proxy, not a production-art test.
- There is no audio, voice, character animation or final timing treatment.
- The tester cannot save and resume an incomplete run.
- The scenario tests one tonal and social configuration; results should not be generalised to every romance, bureaucracy or ensemble scene.
- Human findings do not exist until actual blind playtests are run and recorded under `findings/`.
- Text, names and institutions in **Listening Exercise** are provisional research material.
