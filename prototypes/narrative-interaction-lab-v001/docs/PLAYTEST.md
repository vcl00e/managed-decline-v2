# Playtest protocol

## Purpose

Determine whether the **narrative-support** versions strengthen the same authored narrative without introducing mechanic-led distortion or excessive interaction burden.

This is not a content-preference survey and not a test of final art quality.

## Participants

Test at minimum across these orientations:

- story/character-led player;
- role-player or romance/life-sim player;
- narrative-RPG or systems-oriented player;
- player who enjoys comedy but does not normally play visual novels.

Do not infer a stable player type from one session. The categories are recruitment coverage, not personality labels.

## Order

Each participant should play all three versions of one slice before moving to another slice.

Counterbalance version order across participants. Example Latin-square orders:

```text
A → B → C
B → C → A
C → A → B
```

Use `?blind=1` so the interface shows Version A/B/C rather than descriptive labels.

Do not explain the preferred hypothesis.

## Before play

Tell the participant:

- there is no correct ending;
- choices may affect emotional meaning rather than success;
- the prototype logs local actions;
- they may stop if a scene becomes tedious;
- they should think aloud when natural, but silence is acceptable during emotional reading.

Do not explain valid routes.

## During play

Record observations under these headings.

### Comprehension

- Does the player know who wants what?
- Do they understand why an option exists?
- Can they separate observed fact from interpretation?
- Do they notice public/private distinctions?

### Presence

- Do they refer to where they are standing or whom they are beside?
- Do they react to interruptions as interruptions rather than menu events?
- Do they remember the physical scene afterward?

### Expression

- Do they select an action because it fits their protagonist?
- Do they resist an apparently beneficial choice on role-playing grounds?
- Does silence or withdrawal feel valid rather than like missing content?

### Burden

- Does the player hesitate because the decision is meaningful or because the UI is laborious?
- Do they want the scene to stop asking for input?
- Are repeated actions becoming administrative?

### Optimisation capture

- Does the player discuss values, winning or route efficiency instead of people?
- Does exposed state make behaviour mechanical?
- Do they reload because one result appears objectively superior?

### Narrative pull

- Do they want to see the next message, visit or aftermath?
- Do they speculate about what a character now thinks?
- Do they form a desire that the interface did not explicitly assign?

## Immediate interview

Ask before revealing the version labels.

1. What happened?
2. What were you trying to communicate or accomplish?
3. Which part felt most like your decision?
4. What changed because of you?
5. What would have happened anyway?
6. What does each important character now think or want?
7. What place, object, gesture or silence do you remember?
8. Where did the game ask for input when you wanted to listen?
9. What do you expect to happen next?
10. What would you do differently if replaying this version?

## Comparative interview

After all three versions of a slice:

- Which version produced the strongest character scene?
- Which version made your conduct feel most personal?
- Which version was easiest to understand?
- Which version felt most like operating a game system?
- Did that game-system feeling improve or damage the experience?
- Which actions should be retained if only one version could ship?
- Was any version stronger precisely because it asked for less input?

## Evidence classification

Use categorical findings rather than one aggregate fun score.

### Interaction contribution

- essential;
- helpful;
- neutral;
- distracting;
- harmful.

### Causal comprehension

- clear;
- mostly clear;
- confused;
- falsely certain.

### Character understanding

- specific and coherent;
- plausible but shallow;
- contradictory;
- not retained.

### Agency

- expressive;
- consequential;
- merely selectable;
- optimised;
- illusory.

### Residue

- vivid and expected;
- noticed after prompting;
- abstract;
- absent.

### Burden

- appropriately quiet;
- proportionate;
- slightly interruptive;
- administrative;
- scene-breaking.

## Findings files

Each substantial test or feedback conversation should create a new findings file under:

```text
findings/NNN-YYYY-MM-DD-short-description.md
```

Include:

- prototype version and commit;
- participant context;
- order played;
- exported trace filename or relevant excerpts;
- observed behaviour;
- participant retelling;
- classifications;
- continue/kill implications;
- explicit design decisions, if any.

Findings are evidence, not automatically accepted design.
