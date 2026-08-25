# Narrative Interaction Lab v004

**Community Compass: On Shift** is the next *Managed Decline* prototype after the successful short-form v003 test.

V003 established that a tightly authored scene can produce immediate hook, comedy, character pull, emotional movement and useful expressive agency. V004 does **not** try to prove that again. It asks what non-dialogue activity earns its place around that narrative rather than diluting it.

## Research question

> **Does a low-cognitive-load activity spine make the same dramatic material more game-like and more personally authored without making it feel like work?**

The prototype keeps the proven `Community Compass` dramatic spine and changes the player's situation: they are covering the last half-hour of a Bellwether Library shift while Tabitha draws them into Learning Suite Two.

The library is deliberately ordinary. The interesting pressure comes from the fact that several things can deserve attention at once.

## Conditions

### Version A — dialogue baseline

Direct authored progression with high-semantic dialogue choices.

No map, job pressure, queue or location selection.

This is the control and should feel closest to v003.

### Version B — spatial attention

The dramatic clock continues through the same beats, but the player can move between:

- staff desk;
- Learning Suite Two;
- foyer;
- pavement.

Movement itself is free. The player commits **one beat of attention** by choosing an activity.

Entering the workshop does not reveal the whole beat for free. The player must choose `Stay for the next part`; after committing, they see the authored material and make the same high-semantic response choice as Version A.

If they instead spend the beat elsewhere, that workshop beat is missed.

There is no persistent penalty for leaving routine work undone.

### Version C — situated obligation

Uses the same spatial model and the same activities as Version B.

The difference is that ordinary library work persists when ignored. The queue is represented diegetically rather than as a visible meter. It can grow from:

- a couple of ordinary things waiting;
- to a small queue;
- to a conspicuously unattended service point.

Work actions reduce that hidden backlog. The final scene acknowledges how the shift went.

The system is intentionally shallow. It tests whether ordinary obligation creates meaningful dramatic pressure — not whether a library job can become a management game.

## Core hypothesis

The strongest candidate activity spine is:

```text
notice
→ decide what deserves attention
→ position yourself
→ commit one beat
→ act
→ miss / affect other things
→ situation changes
```

The important resource is **attention**, not a visible stat.

Relationships, places, work, objects and time should matter because they place the player inside situations and force meaningful prioritisation — not because they create dashboards to optimise.

## Hard constraints

V004 deliberately has:

- no quest log;
- no announced objective;
- no visible trust meter;
- no visible work meter;
- no inventory screen;
- no skill checks;
- no free-text input;
- no verb-combination puzzle;
- no movement cost;
- no grind loop;
- no attempt to turn library work into a minigame.

The complexity should remain in **what is happening**, not in operating the interface.

## Run

Requires Node.js 18+.

```bash
cd prototypes/narrative-interaction-lab-v004
npm run check
npm test
npm start
```

Open the neutral condition selector:

```text
http://127.0.0.1:4174
```

Controlled-condition links:

```text
http://127.0.0.1:4174/?condition=a
http://127.0.0.1:4174/?condition=b
http://127.0.0.1:4174/?condition=c
```

Design annotation mode:

```text
http://127.0.0.1:4174/?condition=c&annotate=1
```

Do not use annotation mode for a normal playtest.

## Telemetry

Runs are stored only in browser `localStorage` and are not transmitted.

The trace records:

- condition;
- timestamps;
- every movement;
- workshop-attention commitments;
- every action;
- action location and semantic intent;
- attended and missed dramatic beats;
- hidden work backlog before/after actions;
- relationship / flag / memory / information state;
- dramatic outcome;
- final ending;
- immediate ratings and notes.

`Export traces` produces readable, indented JSON.

## Primary decision rule

A more mechanical condition does **not** win merely because it creates more decisions.

Version B or C earns a place in the game only if it materially improves several of these:

- sense of doing rather than merely selecting dialogue;
- spontaneous self-authored intention;
- care about where the player is;
- decisions that dialogue alone could not express;
- sense that other things continue without the player;
- narrative emergence / personal ownership;

while **not** materially worsening:

- minute-to-minute desire to continue;
- character pull;
- comprehension;
- cognitive load;
- chore / busywork feeling;
- pacing.

The killer question remains:

> **Would this exact experience have been better if the game simply presented the authored scene?**

If the answer is yes, the extra control surface has not justified itself.

## Test-order warning

The three conditions share dramatic material. Replaying them in a fixed A → B → C order will contaminate the result through familiarity and loss of surprise.

For external testers, prefer:

- one condition per first-time tester; or
- counterbalanced order across testers if within-subject comparison is necessary.

For the developer, v003 already provides useful historical evidence for the dialogue-first baseline, so the first informative v004 runs are B and C.

See `docs/DESIGN.md` and `docs/PLAYTEST.md`.
