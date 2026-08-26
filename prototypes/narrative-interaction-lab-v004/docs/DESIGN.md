# Design specification — Activity Spine

## Starting evidence

Narrative Interaction Lab v003 succeeded on its narrow first-order goals for the initial tester: immediate continuation desire, comedy, Tabitha pull, emotional movement, meaningful social participation and desire for another scene.

Its accepted hierarchy put compelling premise, character company, authored emotional movement and expressive participation above the hidden arrangement machinery.

V004 therefore does not ask whether adding mechanics can make weak content entertaining.

It asks:

> **What is the smallest non-dialogue activity layer that makes strong narrative content more interactive rather than less?**

## Design problem

The project needs gameplay that supports the narrative without becoming either:

1. a visual novel with pointless walking bolted on; or
2. a mechanical game with story bolted on.

A useful gameplay layer must create forms of agency that authored dialogue alone cannot express.

The current candidate is **situated attention**.

The player cannot meaningfully participate in every simultaneous situation. Their location, presence, absence, ordinary obligations and concrete actions determine which parts of the world become *their* story.

## Why reuse Community Compass

A fresh scenario would introduce a serious confound:

> If the prototype feels worse, is the activity model bad or is the new scene simply less entertaining than v003?

V004 therefore reuses the proven Community Compass dramatic spine and changes the player's situation around it.

The player is now covering the final half-hour of a library shift. Tabitha's invitation is not a new quest. It is an interruption inside an already-legible ordinary context.

This gives the prototype a controlled way to ask whether work, space and absence help.

The scenario remains prototype-grade test material, not accepted production lore.

## Experimental conditions

### A — Dialogue baseline

The scene behaves like a conventional narrative interaction prototype:

```text
authored beat
→ high-semantic response
→ authored beat
```

This preserves the strengths of v003.

### B — Spatial attention

The world has four abstract locations.

The clock advances only when the player commits a beat to an action. Moving between locations does not itself consume time.

This is deliberate:

- movement should not become a tax;
- the test is attention, not navigation dexterity;
- players may inspect the situation before deciding;
- spatial awareness can matter without pathfinding overhead.

However, the player cannot enter the workshop, read the entire dramatic beat, leave, and then retroactively spend that same minute elsewhere.

At Learning Suite Two the player initially receives only a **cue**.

Selecting:

```text
Stay for the next part.
```

commits the beat to the workshop.

The authored content then plays and the player chooses the same high-semantic response available in Version A.

This creates a meaningful distinction between noticing, committing attention and responding.

### C — Situated obligation

C is identical to B except that unattended work persists.

Each dramatic beat generates a small hidden amount of service demand. Contextual work actions clear some of it.

The backlog is never shown numerically to the player. Instead it is translated into diegetic states:

```text
desk under control
→ a couple of things waiting
→ small queue
→ queue visible from foyer
→ conspicuously unattended service point
```

The final scene acknowledges the accumulated state.

This is intentionally not a resource-management game.

## Why the work model is hidden and shallow

A visible bar such as `WORK PRESSURE 63%` would immediately teach the player to optimise it.

That would test a management loop rather than the desired narrative pressure.

The intended experience is closer to:

> “I want to stay with Tabitha, but I can hear the bell going again.”

The number exists only because prototypes need deterministic state and telemetry.

The fiction, not the meter, is the interface.

## One beat = one meaningful commitment

A beat is not intended to simulate a fixed exact minute. It is an experimental unit representing one opportunity to commit attention.

Within a beat the player may move freely before committing.

Once they commit to the workshop, movement is locked until the social response is chosen.

A contextual action elsewhere advances the beat immediately.

This prevents omniscient play while keeping the control surface small.

## What spatial absence should buy us

Missing content is not automatically good.

Absence earns its place only if it creates at least one of these:

- ownership: “that happened because I chose to be elsewhere”;
- curiosity: “what happened in there?”;
- consequence: a later scene differs because the player was absent;
- character meaning: someone notices presence or absence;
- world continuity: events do not wait politely for the protagonist.

If players simply feel punished for not clicking the obviously correct room, the design has failed.

## Why contextual work actions exist in B as well as C

B and C expose the same kinds of ordinary activity so the comparison is cleaner.

In B those actions are opportunities, but there is no persistent job-state penalty.

In C the same actions also manage a continuing obligation.

This isolates the value of **pressure/persistence** from the value of **space/contextual action**.

## Player-facing information hierarchy

In the spatial conditions the interface should tell the player:

1. where they are;
2. what they can currently notice there;
3. roughly what other spaces contain;
4. what contextual action is available;
5. when they are about to commit the beat.

It should not tell them:

- what the correct goal is;
- which content is “main story”;
- which choice maximises relationship;
- how many points of work remain;
- what they are statistically likely to miss.

## Cognitive-load target

The player should never get stuck trying to invent an input.

The control vocabulary is deliberately tiny:

- move to place;
- stay / engage;
- choose one context-specific action;
- choose one high-semantic social response.

The situation should be difficult to prioritise. The interface should be easy to operate.

## Expected failure modes

### B feels like VN plus pointless walking

Evidence:

- players always walk directly to the workshop;
- location never changes intention;
- movement is described as friction;
- players want an auto-follow-story button.

Interpretation: spatial presentation alone has not justified itself.

### C creates optimisation behaviour

Evidence:

- players think primarily about keeping the hidden queue low;
- they resent Tabitha for interfering with work;
- they ask for a visible meter or efficiency feedback;
- the strongest emotion is task-completion relief.

Interpretation: obligation has become the game rather than supporting the narrative.

### Missing scenes feels punitive

Evidence:

- players believe they “failed” by being elsewhere;
- they reload to see the canonical content;
- offscreen events feel like withheld writing rather than a living world.

Interpretation: opportunity design is too binary or too obviously hierarchical.

### Extra actions damage pacing

Evidence:

- more clicks reduce comedy timing;
- players lose the thread while moving;
- the workshop commitment step feels bureaucratic;
- dramatic beats become menus around scenes.

Interpretation: the activity layer costs more attention than it creates.

## Strong positive evidence

The strongest result would sound like:

> “I knew I wanted to stay with Tabitha, but I also genuinely wanted to help the people waiting. I chose one, understood what I was giving up, and the result felt like my version of the scene.”

An even stronger result would be:

> “I would not want to remove the spatial/activity layer, because then the choice I cared about would disappear.”

## Decision after test

### A still clearly best

Move toward:

> **VN / narrative adventure with selective exploration and rare material actions.**

Do not keep mechanics merely to preserve the JRPG label.

### B best

Candidate core becomes:

> **narrative + exploration + attention + contextual interaction**

Keep obligations very light or mostly non-persistent.

### C best

Candidate core becomes:

> **ordinary obligations create pressure against which narrative priorities become meaningful**

Then work, schedules, money and place have a coherent supporting role.

### None clearly works

Do not add another layer. Re-examine the activity proposition itself rather than increasing systemic complexity.
