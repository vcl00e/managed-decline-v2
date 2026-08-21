# Narrative Interaction Lab v001

A dependency-free comparative prototype suite for testing **narrative-supporting interaction** in *Managed Decline*.

This prototype does **not** attempt to prove the full narrative simulation, final UI, final writing, final characters, or production technology. It tests a narrower question:

> Can presence, expression, interpretation, commitment, material ritual and persistent residue make authored social narrative feel more inhabitable and consequential without turning *Managed Decline* into a mechanic-led game?

## Prototype matrix

The lab contains three narrative slices and three versions of each slice.

| Slice | Narrative problem |
|---|---|
| **The Borrowed Coat** | Intimacy, silence, physical distance, a phone interruption and a relationship object |
| **The Last Broadcast** | Ensemble attention, public/private conduct and several characters using one event differently |
| **Temporary Adjustment** | Conflicting accounts, environmental evidence and deciding what version of reality to circulate |

| Version | Purpose |
|---|---|
| **Dialogue baseline** | Establish what authored dialogue and conventional choices achieve without added handling |
| **Narrative support** | Add small physical, expressive, interpretive and material interactions with visible residue |
| **System-forward stress test** | Add explicit meters, goals or optimisation to test whether stronger mechanics clarify or dilute the narrative |

The system-forward versions are intentionally diagnostic. They are not recommendations.

## Run

Requires Node.js 18 or later.

```bash
cd prototypes/narrative-interaction-lab-v001
npm start
```

Open:

```text
http://127.0.0.1:4173
```

The prototype has no package dependencies and makes no network requests.

### Useful modes

```text
http://127.0.0.1:4173/?blind=1
```

Hides descriptive version names for comparative playtesting.

```text
http://127.0.0.1:4173/?annotate=1
```

Shows hypotheses and semantic action annotations for design review.

The two parameters can be combined.

## Test

```bash
npm test
```

The validator checks:

- every slice has all three versions;
- every version has a valid initial node;
- every action has an ID, label and valid destination;
- all nodes are reachable from the initial node;
- every version reaches at least one ending;
- action IDs are unique within a version;
- system-forward versions expose meters while the other versions do not rely on them.

## Telemetry

The prototype stores run traces in browser `localStorage` only.

Each trace contains:

- slice and version;
- timestamps and duration;
- every selected action;
- semantic action intent;
- before/after state snapshots;
- ending and residue;
- optional tester ratings and notes.

Use **Export traces** to download all local runs as JSON. Nothing is transmitted automatically.

## Research discipline

Do not evaluate the prototypes by asking only whether they were “fun.” Compare:

- causal comprehension;
- character understanding;
- felt presence;
- expressive agency;
- desire to see aftermath;
- remembered places, objects and gestures;
- interaction burden;
- whether players optimise instead of role-play;
- whether the support version outperforms the dialogue baseline;
- whether the system-forward version changes the perceived identity of the game.

See [`docs/PLAYTEST.md`](docs/PLAYTEST.md) for the protocol and [`docs/DESIGN.md`](docs/DESIGN.md) for the hypotheses and quality gates.

## Repository status

Prototype content is experimental evidence, not accepted game design. Substantial test sessions should be recorded as separate files under `findings/` according to the repository rules.
