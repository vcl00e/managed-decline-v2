# Playtest protocol

## Purpose

Test whether a dialogue-first *Managed Decline* evening can sustain a full session, whether the compact map creates voluntary narrative participation, and whether optional observation or sparse decisive action improves the experience without turning it into process.

This is not a survey of final art, final character appeal, final voice performance or production technology.

## Core questions

1. Does dialogue fatigue appear, and at what point?
2. Does the map create curiosity, anticipation and memory, or dead travel time?
3. Do players form an intention before the game names one?
4. Which attractors do they ignore, and do they feel punished for doing so?
5. Are the important choices genuinely plausible rather than obviously optimal?
6. Do optional observations get noticed?
7. When noticed, do observations alter later reasoning or merely add text?
8. Does the decisive physical key action improve ownership and recall?
9. When does support begin to feel like operating a process?
10. Do players remember places, movements, objects and aftermath as well as dialogue?

## Recruitment coverage

Recruit across, rather than assign permanent player types from, these orientations:

- story/character-led player;
- romance or life-sim player;
- narrative-RPG player;
- systems-oriented RPG player;
- comedy audience member who does not normally play visual novels;
- visual-novel player who tolerates little navigation friction.

A useful initial directional sample is 9–12 participants, approximately balanced across treatments. Increase only after the protocol and content are stable enough that more sessions will answer the same question.

## Experimental design

### First pass: between participants

Assign each participant one treatment only.

Advantages:

- no story-repetition fatigue;
- no memory of previous facts contaminating optional-observation use;
- no participant reverse-engineering the treatment purpose;
- more credible session-sustainability evidence.

Assignment should be balanced across:

```text
Passive diorama
Optional observation
Sparse decisive action
```

Within each treatment, balance the six possible opening location orders where sample size permits:

```text
Hall → Pub
Hall → Bus
Pub → Hall
Pub → Bus
Bus → Hall
Bus → Pub
```

The third location is always introduced by phone.

### Second pass: within participants

Run only after first-pass findings identify specific uncertain mechanisms. Participants may then compare two or three versions, but:

- counterbalance order with `?order=`;
- use `?blind=1`;
- do not run all three consecutively without a break;
- classify familiarity and story-repetition effects explicitly;
- focus the interview on interaction differences, not overall dramatic surprise.

Suggested Latin-square orders:

```text
ABC
BCA
CAB
```

Use the reverse set if more counterbalancing is needed:

```text
ACB
CBA
BAC
```

## Facilitator setup

Run:

```bash
npm start
```

For a blind assigned treatment, use a URL such as:

```text
http://127.0.0.1:4173/?blind=1&variant=observe&order=BCA
```

Record:

- prototype commit;
- browser and viewport;
- treatment ID;
- displayed blind label;
- opening location order;
- participant orientation and relevant familiarity;
- whether the participant has seen this story before.

Do not use `?annotate=1` in ordinary participant sessions.

## Participant briefing

Use neutral language:

> This is an unfinished narrative interaction prototype set during one evening. There is no assigned mission and no correct ending. Choose where to go and how to behave according to what interests you. The prototype stores your actions only in this browser so the run can be reviewed. You may stop at any time. Think aloud when it feels natural, but you do not need to narrate emotional scenes.

Do not tell the participant:

- that the band is the presumed main plot;
- that one treatment contains evidence;
- that the key is the intended climax;
- that a preferred hypothesis exists;
- that every location should be visited;
- that the treatments are ordered from less to more interaction.

## Before play

Ask:

1. What kinds of narrative games do you normally play?
2. How do you feel about visual-novel dialogue choices?
3. How do you feel about walking or map navigation between conversations?
4. Do you usually inspect optional environmental details?

Do not ask what outcome they intend before the world has presented attractors.

## Observation sheet

### Desire formation

Record the earliest moment the participant expresses or demonstrates a want.

Possible evidence:

- “I want to see Tabitha.”
- “I’m going to check whether the hall is actually closed.”
- “Theo clearly wants help, but I don’t care yet.”
- choosing the pub first because the player wants company;
- deciding to avoid Sophie;
- forming a plan around the key before anyone asks.

Classify:

- spontaneous and specific;
- spontaneous but weak;
- selected from obvious prompts;
- declared only after a character asks;
- never formed.

Also record competing warm intentions that remain unadopted.

### Map usefulness

Observe:

- how quickly a first destination is chosen;
- whether the participant discusses people or only menu completion;
- whether returning to the lane creates anticipation;
- whether location status changes are noticed;
- whether the third-location call feels like interruption or arbitrary gating;
- whether the participant remembers where facts originated;
- whether short travel transitions feel welcome, neutral or dead.

Classify map contribution:

- essential social geography;
- useful sequencing and breath;
- attractive but neutral;
- dead travel/menu layer;
- actively confusing.

### Dialogue sustainability

Mark each point where the participant:

- skims;
- stops reading aloud after previously doing so;
- asks how much remains;
- chooses without considering meaning;
- becomes irritated by another choice;
- becomes more attentive because scenes converge;
- wants a quiet interval;
- wants more agency rather than less text.

Do not equate reading speed with disengagement. Ask afterward what changed in attention.

Classify burden by phase:

- appropriately quiet;
- proportionate;
- slightly interruptive;
- repetitive;
- administrative;
- scene-breaking.

### Choice quality

At major turns, note whether the participant can explain at least two plausible alternatives in ordinary human terms.

Warning signs:

- “This is clearly the good answer.”
- choosing based on apparent route coverage;
- assuming the game expects the player to fix the event;
- treating leaving with Tabitha as failure;
- interpreting the institutional contradiction as a single-answer puzzle;
- believing every conversational option is the same tone with cosmetic wording.

Classify agency:

- expressive;
- interpretive;
- consequential;
- committed;
- merely selectable;
- optimised;
- illusory.

### Optional observation

For Version B, record separately for each object:

```text
Hall inspection slip
Pub continuity invoice
```

Observe:

- whether the object is noticed;
- whether it is inspected without prompting;
- stated reason for inspecting;
- what the participant believes it means;
- whether the information changes a later destination, question or argument;
- whether funded later dialogue is selected;
- whether the participant wants a reasonable action the prototype does not support;
- whether inspection creates an expectation that all props are inspectable.

Classify contribution:

- transformed later reasoning;
- useful context;
- interesting but unused;
- redundant exposition;
- created unmet agency;
- encouraged completionist searching.

Do not prompt participants toward missed evidence during the run.

### Sparse decisive action

For Version C, observe:

- whether visible phone gestures add witness/social meaning;
- whether the participant perceives answer/decline/ring as conduct rather than UI handling;
- whether the brass-key options feel materially distinct before selection;
- whether one complete physical action is sufficient;
- whether the participant wants to speak instead;
- whether the action increases recall of ownership, consent or public residue;
- whether it feels ceremonious, contrived or administrative.

Classify:

- meaningfully embodied;
- clearer commitment;
- memorable but unnecessary;
- equivalent to dialogue;
- over-signalled climax;
- exposed process.

### Character and causal comprehension

Check whether the participant can distinguish:

- the isolated kitchen circuit from the main hall’s inspection result;
- the lost caretaking/supervision contract from the electrical fault;
- Sophie’s genuine continuity work from the public simplification;
- Raj’s commercial obligations from personal hostility;
- Maya’s informal responsibility from institutional authority;
- Theo’s desire to play from Cal’s employment constraint;
- Tabitha’s relationship to the key from legal control of the building.

False certainty is a failure mode. A participant may reasonably retain ambiguity, but should not invent a clean villain because the scene was unclear.

### Memory and residue

Without showing the final screen again, record spontaneous mentions of:

- Bellwether Rooms;
- Crown & Anchor;
- Moor Lane Stop;
- the green notice and white amendment strip;
- the official pub placard;
- the rain and bus shelter;
- Tabitha’s coat;
- the scratched brass key;
- the photograph/caption;
- who moved where;
- what physically remains after the ending.

## Immediate debrief

The prototype records five 1–5 ratings:

- presence;
- comprehension;
- agency;
- pull toward aftermath;
- interaction burden.

Treat these as prompts and comparative signals, not a validated scale.

Ask before explaining the treatment:

1. Tell me what happened this evening.
2. At what point did you first want something?
3. What did you want, and did that change?
4. Which situation felt most important to you? Why?
5. Which situation did you deliberately leave alone?
6. Did the game ever tell you what you were supposed to do, even indirectly?
7. Which decision felt most like yours?
8. Where did you feel you were merely confirming the story?
9. Did you ever want the game to stop asking for input?
10. Did you ever want more control than it offered?
11. What was actually wrong with the hall?
12. What was Sophie trying to accomplish?
13. What did the pub arrangement change or fail to change?
14. What does Tabitha now think of your conduct?
15. What place, movement, object, gesture or silence do you remember first?
16. What physically remains on Moor Lane after your ending?
17. What do you expect to happen tomorrow or next Friday?
18. What would you do differently on replay?

Do not correct their account until it is fully recorded.

## Treatment-specific interview

### Version A: Passive diorama

- Was destination choice enough to make the evening feel self-directed?
- Which automatically staged actions should have been explicit, if any?
- Did any scene feel too passive?
- Did the map provide sufficient non-dialogue rhythm?

### Version B: Optional observation

After the unprompted retelling, reveal any missed observations.

- Did you understand those objects were optional?
- Why did you inspect or ignore them?
- Did the discovered information produce a response you could not express?
- Did inspecting one object make you want to inspect everything?
- Would removing the observations improve the scene?

### Version C: Sparse decisive action

- Did the phone gestures change the meaning of the calls?
- Was the final key action more personal because it was framed physically?
- Did the key interaction add anything the dialogue had not already established?
- Did it make the scene feel more like a game mechanic?
- Which explicit physical input should survive into production?

## Comparative interview

Use only for participants who have played more than one treatment.

- Which produced the strongest continuous evening rather than the strongest single moment?
- Which made you remember the lane as a place?
- Which made your conduct feel most personal?
- Which kept you attending to characters rather than interfaces?
- Which gave enough control with the least friction?
- Did optional observation broaden agency or expose missing options?
- Did the physical key action improve ownership or simply dramatise a menu choice?
- Which treatment should be the default grammar?
- Which individual support elements should be retained even if their treatment loses overall?

## Trace review

After the interview, compare the participant account with the exported trace.

Useful derived measures:

- total duration;
- duration by phase;
- time to first destination;
- time to first stated intention, from facilitator notes;
- opening order;
- completed versus abandoned;
- choice count;
- observation count and time spent;
- material-action count;
- ending distribution;
- number of meaningful returns to map;
- number of moments classified as unwanted input;
- number of reasonable but unsupported desired actions.

Do not rank routes by completion speed. Fast play may indicate fluency, skimming or low engagement.

## Decision heuristics

### Continue passive diorama as the default when

- the session remains engaging without extra handling;
- players form intentions through location/character attraction;
- map order is remembered and affects retelling;
- dialogue fatigue is controlled by rhythm and convergence;
- automatically staged physical conduct is understood;
- participants do not ask for routine gesture control.

### Continue optional observation when

- it is found voluntarily by a meaningful share of players;
- it changes interpretation or later conduct;
- later dialogue funds the implications;
- missed observations do not damage baseline comprehension;
- inspection does not cause completionist prop sweeping;
- unsupported desired actions remain rare and addressable.

### Reduce or remove optional observation when

- it becomes mandatory in practice;
- players search because the treatment teaches search, not because they are curious;
- it merely repeats dialogue;
- participants formulate broader agency the game cannot support;
- it adds time without improving memory, comprehension or expression.

### Continue sparse decisive action when

- participants describe the act physically and remember who possessed or witnessed the key;
- the physical form changes interpretation;
- one input feels proportionate;
- it strengthens residue and future expectation;
- it does not create demand to operate every surrounding gesture.

### Reduce or remove decisive action when

- the dialogue choice already carried the same meaning;
- the key feels artificially promoted into a mechanic;
- phone gestures become repetitive;
- participants focus on performing the interaction correctly;
- explicit handling lowers emotional presence.

### Revise the whole slice before drawing dosage conclusions when

- the underlying story is not compelling;
- character motives are broadly misunderstood;
- the band problem becomes an obvious assigned mission;
- one ending reads as success and the others as failure;
- the three locations are not distinct in memory;
- duration falls well below or above the intended range for reasons unrelated to treatment;
- several important turns lack multiple plausible choices.

## Findings record

For each substantial test, create:

```text
findings/NNN-YYYY-MM-DD-short-description.md
```

Store the readable browser export alongside it:

```text
findings/NNN-YYYY-MM-DD-short-description.json
```

Include:

- prototype commit;
- participant context;
- treatment and blind label;
- opening order;
- completion status and duration;
- raw export filename;
- observed desire formation;
- phase-by-phase burden;
- retelling before correction;
- memory of locations, movements and objects;
- optional-observation or decisive-action evidence;
- unsupported desired actions;
- classifications;
- continue/revise/kill implications;
- explicit accepted design decisions, if any.

Prototype findings remain evidence, not automatically accepted game design.
