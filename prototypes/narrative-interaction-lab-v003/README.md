# Narrative Interaction Lab v003

**Community Compass: Live** is an 8–12 minute *Managed Decline* prototype testing whether a short slice is immediately worth continuing.

It deliberately follows the hard failure of v002, whose structurally coherent arrangement-ecology test was abandoned after roughly two minutes as boring, not funny and emotionally flat.

V003 therefore reverses the order of operations:

> **Compelling character + comic premise + authored emotional journey first. Hidden causal machinery second.**

## Premise

Tabitha Mercer texts the player to Bellwether Library without explaining why.

The player arrives to find an earnest safeguarding workshop projecting the old `Community Compass` training scenario that made Tabitha infamous. The real Tabitha is sitting beside the player in the back row while the facilitator explains what people should do if their friend **Tabitha** begins expressing challenging views online.

The revised programme is initially ridiculous. Then it reveals a new restorative ending containing a first-person quote Tabitha never said, presenting her as somebody who was successfully corrected and reintegrated through volunteering.

The workshop subsequently attempts to connect its scheduled “lived experience contributor” remotely. Tabitha's phone rings in the room.

The player can ultimately:

- back a public reveal and let Tabitha take the room;
- leave with her rather than turn her into content;
- force the programme to source the fabricated quote before she reveals herself.

All three outcomes end on a personal future with Tabitha rather than a completion reward.

## Target emotional journey

```text
surprise
→ laughter
→ complicity / attraction
→ escalating farce
→ personal sting
→ oh-shit exposure
→ meaningful social choice
→ comic / intimate release
→ future pull
```

The slice is not considered successful merely because this structure exists in the source. It succeeds only if the player actually feels meaningful movement through it.

## Primary success criteria

The decisive questions are:

> **At about minute two, do you want minute three?**

and:

> **When the slice ends, do you want another scene with Tabitha?**

Secondary criteria:

- at least one genuine early laugh;
- rapid character curiosity, attraction or complicity;
- clear emotional shift when the fabricated quote appears;
- escalation rather than flat accumulation of information;
- choices that change social/emotional meaning;
- recognisably contemporary British institutional satire;
- no moment where the design machinery becomes the subject.

## Run

Requires Node.js 18+.

```bash
cd prototypes/narrative-interaction-lab-v003
npm run check
npm test
npm start
```

Open:

```text
http://127.0.0.1:4173
```

For design debugging only:

```text
http://127.0.0.1:4173/?annotate=1
```

Do not use annotation mode for a normal playtest.

## Telemetry

Runs are stored only in browser `localStorage` and are not transmitted.

The trace records:

- timestamps;
- node / emotional phase;
- every choice;
- semantic action intent;
- hidden before/after relationship, flags, memories and information;
- ending;
- immediate ratings and notes.

`Export traces` produces readable, indented JSON.

## What v003 does not test

It does **not** test:

- a 40-minute session;
- full arrangement ecology;
- open-world map rhythm;
- LLM/free-text input;
- final character art or animation;
- production-quality music/voice;
- campaign progression;
- replayability;
- whether Tabitha alone can carry a full game.

Those questions are intentionally downstream of proving that a small amount of Managed Decline is compelling at all.

See `docs/DESIGN.md` and `docs/PLAYTEST.md`.
