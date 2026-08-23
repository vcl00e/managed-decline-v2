# Narrative Interaction Lab v002

A dependency-free, long-form formative prototype for testing the current **arrangement ecology** in *Managed Decline*.

This version supersedes the earlier untested v002 support-dosage design before that branch produced findings. `narrative-interaction-lab-v001` established a strong directional result: dialogue-first presentation beat more operational/system-forward interaction in every tested slice. The August 23 design pass then supplied the missing activity model:

> **Managed Decline is a dialogue-first social RPG about entering, making, altering, keeping and breaking human arrangements under pressure.**

This prototype asks whether that model actually produces compelling play for roughly one sustained session.

## The evening

**One Evening on Moor Lane** begins after work with no assigned mission. Three physical places are active:

- **Bellwether Rooms** — a community hall with a real electrical fault, a passed main room, and no current authorised caretaker;
- **The Crown & Anchor** — the council's substitute venue, genuinely useful but materially different from the public claim of seamless continuity;
- **Moor Lane Stop** — where Tabitha has found an old Bellwether key in her mother's coat while the last bus quietly moves earlier.

The player may visit any two locations in either order. The unvisited situation then interrupts by phone. Nadia's online neighbourhood voice room provides a fourth social space before all three arrangements converge at the pub.

Foreground arrangements:

1. Maya/Theo's attempt to give the Thursday group some kind of ending and first hearing for a song;
2. Tabitha's private plan to get chips and leave the lane before the shortened last-bus window closes;
3. Sophie's attempt to make the substitute venue genuinely count, including a conditional publicity photograph.

The arrangements collide around time, incomplete information, public framing, authority, access, and a brass side-door key that is physically useful without conferring permission.

## What is implemented

Only the mechanical ecology needed for the experiment:

- presence and audience;
- commitments and expectations;
- information and framing;
- access and belonging;
- limited material state;
- relationship positions and memory;
- persistent residue.

Player-facing interaction uses:

- dialogue as the primary input;
- frequent map-level attention choice during the open-life phase;
- two optional environmental observations;
- phone/public-private conduct;
- one high-semantic material climax;
- no announced objective, visible relationship values, action points, quest log, plan canvas, inventory game, or state sidebar.

## Run

Requires Node.js 18+.

```bash
cd prototypes/narrative-interaction-lab-v002
npm start
```

Open:

```text
http://127.0.0.1:4173
```

For hidden-state design debugging:

```text
http://127.0.0.1:4173/?annotate=1
```

Do not use annotation mode for a normal participant session.

## Validate

```bash
npm test
npm run check
```

Current validation checks include:

- exactly three physical locations, six important characters and three foreground arrangements;
- unique action IDs and valid node targets;
- all six ordered pairs of opening locations correctly trigger the unvisited-location phone interruption;
- representative routes reach all four aftermaths;
- a complete representative route contains at least 4,200 authored words;
- no browser network requests;
- readable, indented JSON trace export;
- no exposed quest/objective/meter/state-sidebar vocabulary or UI.

At the time of this revision the implementation validates **31 nodes and 84 authored actions**. The shortest representative complete route contains about **4,300 authored words**, before player deliberation and debrief.

## Telemetry

Run traces are stored only in browser `localStorage`. Nothing is transmitted.

A trace records:

- timestamps and duration;
- every map, dialogue, observation, phone/material action;
- semantic action intent;
- complete hidden before/after state snapshots;
- arrangements and commitments;
- information and access;
- material possession/public-record state;
- relationship positions and memories;
- final residue and aftermath;
- immediate tester ratings and notes.

Use **Export traces** for readable JSON.

## What this prototype does not prove

It does not prove final writing quality, production art, animation, LLM dialogue, full campaign simulation, autonomous NPC scheduling, campaign-length progression, or market fit.

It is specifically trying to falsify the current core activity hypothesis before production architecture hardens around it.

See `docs/DESIGN.md` and `docs/PLAYTEST.md`.
