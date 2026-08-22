# Narrative Interaction Lab v002

A dependency-free, long-form prototype for testing **session sustainability and narrative-support dosage** in *Managed Decline*.

It deliberately follows `narrative-interaction-lab-v001` rather than repeating that prototype’s baseline/support/system comparison. The first lab established that strong authored dialogue can outperform extra handling, especially when subtext is operationalised into required gestures. This version asks the remaining question:

> Can a dialogue-first evening sustain attention across exploration, several scenes, a phone interruption, ensemble conflict, intimacy and visible aftermath—and how much additional support helps before it feels like process?

## The evening

**One Evening on Moor Lane** begins after work with no assigned task. Three places are active on one compact lane:

- **Bellwether Rooms** — a community hall whose main room has passed inspection, while its caretaking contract has quietly ended;
- **The Crown & Anchor** — a pub hired as the council’s official “continuity venue” under terms that conflict with the public story;
- **Moor Lane Stop** — a bus shelter where Tabitha has found a scratched brass hall key in an old coat.

The player chooses which two situations to visit and in what order. The third interrupts by phone. Six characters then converge at the pub around a dropped community performance, an institutional contradiction, a disputed publicity photograph and the question of what the brass key should now mean.

The prototype never announces an objective. Helping Theo’s band, correcting the public account, protecting Maya, spending time with Tabitha, or simply leaving remain possible intentions rather than quest labels.

## Treatments

All versions use the same characters, dialogue architecture, locations, order freedom, four aftermaths and hidden narrative state.

| Version | Treatment |
|---|---|
| **Passive diorama** | Destination and dialogue choices only. Physical conduct is realised through staging and prose. |
| **Optional observation** | Adds exactly two optional discoveries: the hall inspection slip and the pub invoice. Each disappears after use and funds later authored dialogue. |
| **Sparse decisive action** | Adds visible handling only where physical form changes possession, witnesses, consent or persistent residue: phone gestures and the final handling of the brass key. |

There are no meters, scores, quest lists, objectives or player-facing state sidebars in any treatment.

## Run

Requires Node.js 18 or later.

```bash
cd prototypes/narrative-interaction-lab-v002
npm start
```

Open:

```text
http://127.0.0.1:4173
```

The prototype has no package dependencies and makes no network requests.

## Useful modes

```text
?blind=1
```

Shows Version A/B/C rather than the treatment names.

```text
?annotate=1
```

Shows design annotations and action-intent tags.

```text
?variant=passive
?variant=observe
?variant=decisive
```

Starts a treatment directly.

```text
?order=ABC
?order=BCA
```

Changes the displayed treatment order for counterbalancing. Valid orders are `ABC`, `ACB`, `BAC`, `BCA`, `CAB` and `CBA`.

Parameters can be combined:

```text
http://127.0.0.1:4173/?blind=1&order=BCA
```

## Validate

```bash
npm test
npm run check
```

The validator checks, among other things:

- exactly three locations, six characters and three treatments;
- valid graph targets and unique action IDs;
- no dead ends;
- complete reachability for all authored nodes;
- all four aftermaths remain reachable in every treatment;
- every ordered pair of opening locations produces the correct unvisited-location phone interruption;
- optional observations disappear after discovery and unlock funded later dialogue;
- sparse decisive actions exist only in the intended treatment;
- the source contains no quest/objective/meter/score fields or state-sidebar implementation;
- browser exports remain readable, indented JSON.

## Telemetry

Run traces are stored only in browser `localStorage` under a version-specific key. Nothing is transmitted.

A trace records:

- treatment and displayed blind label;
- timestamps, duration and completion/abandonment;
- every destination and dialogue/material action;
- semantic action intent;
- before/after story snapshots;
- optional observations;
- decisive material acts;
- ending and visible residue;
- immediate tester ratings and notes.

Use **Export traces** to download all local records as readable JSON. The export is intentionally not compressed.

## Test discipline

The prototype is not intended to prove final writing, art, performance, animation, campaign structure or production technology. It isolates:

- dialogue fatigue over a longer session;
- whether voluntary map sequencing creates intention, anticipation and memory;
- whether the map feels useful or like dead travel time;
- whether optional observation is noticed and meaningfully funded;
- whether one sparse physical commitment improves memory and ownership;
- where support begins to expose process;
- whether people remember places, movements, objects and aftermath as well as dialogue;
- whether several plausible intentions form without an objective announcement.

See [`docs/DESIGN.md`](docs/DESIGN.md) for the experimental design and [`docs/PLAYTEST.md`](docs/PLAYTEST.md) for the protocol.

## File layout

```text
narrative-interaction-lab-v002/
├── index.html
├── app.js
├── engine.js
├── story.js
├── styles.css
├── server.mjs
├── tests/validate.mjs
├── docs/
│   ├── DESIGN.md
│   └── PLAYTEST.md
└── findings/
    └── README.md
```

The story source is intentionally readable JavaScript rather than a compressed payload. Findings produced by this version belong under its own `findings/` directory.
