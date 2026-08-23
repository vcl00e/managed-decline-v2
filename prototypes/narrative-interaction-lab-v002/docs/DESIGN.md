# Arrangement ecology prototype design

## Status

Formative prototype. Evidence from this implementation is not automatically accepted game design.

## Research basis

`narrative-interaction-lab-v001` established that, for its three short test slices:

- authored dialogue baseline was preferred to narrative-support and system-forward treatments;
- operationalising emotional subtext into required gestures reduced presence and perceived agency;
- optional environmental investigation remained promising but incurred affordance debt;
- explicit objectives/meters caused optimisation capture;
- dialogue should remain primary while space, phone, time and occasional physical actions frame and preserve narrative meaning.

That result did not establish that dialogue-heavy play could sustain a full session or define the external activity needed to prevent the game collapsing into a relationship-state simulation.

The accepted August 23 activity design supplies the current hypothesis:

> A situation is what is happening in the world. An arrangement is what people are trying to make happen inside it.

The repeatable dramatic kernel is:

> A concrete thing somebody cares about becomes difficult because material conditions, institutions, incomplete information and other people's needs cannot all be reconciled. The player decides what to preserve, what to compromise and where the resulting cost lands, then lives through the event and its residue.

## Primary research question

> Can one 35–45 minute dialogue-first evening make the player feel that they are **making life work with people when the terms no longer add up**, rather than merely selecting relationship outcomes or operating an exposed system?

## Falsifiable success criteria

The post-play interview should establish whether the participant can, in their own words:

1. articulate what they were trying to preserve;
2. identify terms that could not all coexist;
3. describe at least one way a relationship changed a practical possibility;
4. describe at least one way a practical decision changed a relationship;
5. identify a point where they knowingly allowed a cost/disappointment/risk to land somewhere;
6. describe a revised plan after circumstances changed;
7. remember the convergence as a lived event rather than a report;
8. identify persistent residue that creates a new desire or concern;
9. describe their thinking primarily in fictional/social terms rather than system-operation terms.

Failure signals include:

- "I was just looking for the correct ending";
- "I inspected everything because that is what the game wanted";
- "the key was basically an inventory item";
- "I could not tell why my earlier promises mattered";
- "everyone just had a trust value";
- "the map was dead travel";
- "I had no idea what I could care about until the game told me";
- "the morning was just an ending summary rather than a changed life".

## Content architecture

### Background world situations

**Bellwether access failure**

- a kitchen electrical fault is real and isolated;
- the main room passed inspection;
- the caretaker contract ended;
- no replacement is active;
- the council compresses this into a public electrical-closure framing.

**Evening transport contraction**

- the later bus is removed for "resource availability";
- the last useful service is 21:12;
- the change is not generated to punish the player; it is already true in the world;
- it converts Tabitha's casual evening plan into a time-bounded arrangement.

### Foreground human arrangements

**Performance**

Desired future: the Thursday group gets some kind of ending and Theo's song gets a first hearing.

Potential forms: adult acoustic pub set, one song in the hall, cancellation, or continuation without the player.

**Tabitha evening**

Desired future: chips, private time and a viable bus home.

The player may commit, keep it tentative, decline, reaffirm, renegotiate or break/release it.

**Continuity record**

Desired future: Sophie can demonstrate that her substitute room genuinely preserved something without requiring the player to endorse a false equivalence.

The player may agree to a conditional photograph, refuse, demand corrected framing, or later redirect the public record.

## State families

### Presence/audience

Implemented through opening location order, phone conduct, pub convergence and the choice to leave.

### Commitments/expectations

Explicit hidden state records whether the player created concrete expectations with Maya, Tabitha or Sophie. NPC dialogue later references those commitments without exposing them as task cards.

### Information/framing

Optional observations can establish:

- main room passed;
- kitchen fault isolated;
- no premises closure order;
- pub minimum spend;
- youth-access restriction;
- council payment dependency.

Nadia's online space allows partial information to be held, published cautiously, contained, or later turned into a durable public record.

### Access/belonging

The brass key can physically unlock a side door but does not grant institutional authority. Access is therefore relational and contextual rather than binary key-gating.

Aftermath can make the hall, pub or Mutuals channel more socially usable in future.

### Material means

Only high-semantic material state is represented: the key, public photographs/notices, and venue access. There is no generic inventory.

### Character interpretation/memory

The prototype stores relationship positions and memory motifs only where they support later interpretation or residue. No player-facing relationship metric exists.

### Residue

Every ending changes some combination of:

- public wording;
- place familiarity/access;
- who holds the key;
- what was performed;
- what became public;
- future invitations;
- remembered conduct.

## Interaction thresholds

Dialogue remains the high-bandwidth default.

An explicit physical/material input is justified only when it changes at least one of:

- possession;
- witness state;
- consent;
- public/private meaning;
- information flow;
- commitment;
- persistent material residue.

This is why the prototype exposes phone-answering conduct and the final key/photo/leave act, but not walking, sitting, reaching, or other intermediate gesture chains.

## Long-form rhythm

1. **Open life** — leave work with several attractors and no task.
2. **First arrangement contact** — voluntary location choice.
3. **Map return** — brief interpretive space.
4. **Second arrangement contact** — another voluntary choice.
5. **Unchosen situation enters** — the third location calls.
6. **Online space** — public/private information pressure.
7. **Convergence** — all arrangements become mutually visible.
8. **Commitment collision** — earlier words begin constraining present conduct.
9. **Public framing** — information produces consequences before resolution.
10. **Practical possibilities** — several incomplete settlements become legible.
11. **Breathing space** — the substitute venue briefly becomes an ordinary social room.
12. **Intimate renegotiation** — Tabitha's time and key remain personal rather than abstract resources.
13. **High-semantic act** — one physical choice carries several meanings at once.
14. **Morning residue** — changed people/places/messages create future pull.

## Deliberate non-goals

Do not add for this test:

- free-text/LLM input;
- visible values;
- a universal planner;
- action points;
- time-budget UI;
- generic inventory;
- crafting;
- routine work interaction;
- a random complication director;
- full autonomous NPC simulation;
- production art requirements.

Those would confound the question this prototype is meant to answer.
