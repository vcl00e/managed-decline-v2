# Playtest protocol

## Primary research question

> Over one sustained narrative evening, does optional observation or sparse decisive action improve presence, interpretation, agency and memory enough to justify its interruption and production cost relative to a dialogue-first baseline?

## Secondary questions

- Does focused dialogue remain engaging across approximately 25–40 minutes?
- Does the diorama help players decide where to put attention, or merely decorate the text?
- Do players form intentions before the institutional problem is explicitly explained?
- Are the important choices genuinely plural, or does one route feel author-approved?
- Do players understand the difference between truth, official wording, belief and public evidence?
- Do players remember places and residue rather than only plot summary?
- When does support begin to feel administrative or like operating a process?
- Does the player expect the pub, hall or relationships to behave differently later?

## Do not disclose before play

Do not tell a tester:

- that one condition is a baseline;
- that observation or decisive action is the variable;
- that the dialogue baseline won v001;
- that the hall contains exactly two inspectable clues;
- that the photograph is a test of public versus private information flow;
- that the pub may become a recurring affordance;
- that the test is looking for dialogue fatigue.

Use `?blind=1` for formal sessions.

## Preferred assignment

### Primary evidence: first exposure only

Use independent first-exposure groups wherever practical. Each tester plays one condition without seeing the others. Assign roughly equal numbers to A, B and C and rotate assignment rather than choosing based on tester preference.

A useful directional batch is:

```text
A: 6–10 first-exposure testers
B: 6–10 first-exposure testers
C: 6–10 first-exposure testers
```

This is not a claim that those numbers guarantee statistical power. The purpose is to avoid drawing production conclusions from one person or one route while keeping the prototype stage proportionate.

### Secondary evidence: direct comparison subset

After first-exposure data is recorded, a smaller subset may replay the other conditions for explicit contrast. Treat their first run as the primary observation and later runs as qualitative comparative evidence because story knowledge and repeated prose create carryover.

Counterbalance replay order with six orders:

| Group | Order |
|---|---|
| 1 | A → B → C |
| 2 | B → C → A |
| 3 | C → A → B |
| 4 | A → C → B |
| 5 | C → B → A |
| 6 | B → A → C |

Do not average all replay runs as though they were independent first exposures.

## Setup

1. Run `npm test` before the session batch.
2. Start the local server with `npm start`.
3. Open the assigned blind link.
4. Use an anonymous tester ID.
5. In the facilitator note, record assignment and exposure, for example:

```text
first exposure · group B · session 2026-08-24
```

6. Confirm that the tester understands data remains local until exported.
7. Ask the tester to think aloud only if the session is explicitly a think-aloud study. Do not mix silent and think-aloud timings without marking them.
8. Do not demonstrate the map hotspots beyond saying that visible choices may be selected with mouse or number keys.

## Facilitator introduction

Use wording close to:

> This is one Friday evening in a narrative game prototype. There is no hidden objective you are expected to optimise. Read the situation and choose how you would want the protagonist to participate. Some consequences will remain uncertain. Please complete the questions from memory at the end before discussing the test with me.

Then stop explaining.

## During play

The facilitator may help only with an interface failure.

Do not answer:

- “What am I supposed to do?”
- “Is this clue important?”
- “Will this hurt the relationship?”
- “Can I come back later?”
- “Is Nadia lying?”

A neutral response is:

> Choose based on what the evening currently means to you. The prototype is testing that interpretation.

Record notable spontaneous remarks separately, especially:

- goals formed before explicit conflict;
- references to map geography;
- assumptions about future access;
- frustration at unclickable scenery;
- statements that a choice is obvious or fake;
- first-person action retellings;
- visible loss of attention or choice fatigue.

Do not direct the tester toward optional observations.

## End-of-run sequence

1. Let the tester read the ending and residue list.
2. Ask them to continue to the built-in questions.
3. Do not discuss the condition until the form is saved.
4. Export the readable JSON.
5. Conduct a brief interview after export.

Suggested interview prompts:

- “Tell me what happened as though you were telling a friend about your evening.”
- “What were you trying to achieve before the hall explanation became clear?”
- “Which choice was hardest for the right reason?”
- “Which choice felt fake, redundant or pre-decided?”
- “What did the map let you do that plain dialogue would not?”
- “What do you think happens next Thursday?”
- “Did any separate interaction improve a scene? Did any interrupt it?”
- “What did you believe Nadia, Maya and Len each knew or wanted?”

Avoid asking leading questions such as “Did the observations improve comprehension?”

## Built-in ratings

All ratings use 1–5 agreement scales:

- presence;
- comprehension;
- agency;
- narrative pull;
- choice quality;
- map usefulness;
- dialogue fatigue;
- process feeling;
- burden.

High dialogue-fatigue, process-feeling and burden values are negative. Do not combine all ratings into one opaque quality score.

## Trace measures

The export supports inspection of:

- total elapsed time;
- number and order of decisions;
- dwell time per decision;
- map and phone decisions;
- optional observation use;
- decisive-action count;
- route and ending;
- before/after state for every choice;
- remembered intentions and expected aftermath.

Treat dwell time carefully. Long dwell may indicate meaningful conflict, confusion, interruption or reading difficulty. Use the accompanying choice and interview evidence.

## Condition-specific analysis

### A — baseline

Look for:

- sustained attention without additional operation;
- first-person retelling despite automatic staging;
- whether dialogue labels carry enough physical meaning;
- whether the map alone creates useful agency and place memory.

### B — observation

Look for:

- proportion who inspect zero, one or two clues;
- whether inspection is voluntary or feels compulsory;
- recall of exact wording, extension lead and equipment label;
- later choices or explanations that use observed evidence;
- complaints that other props should also be inspectable;
- whether non-inspectors still understand the situation.

Do not interpret high inspection use by itself as success. Players may click because the affordance exists, not because it improves the experience.

### C — decisive action

Look for:

- whether players retell “I walked with her,” “I put the speaker outside” or “I sent the photograph”;
- whether the action is remembered more strongly than its equivalent dialogue label;
- whether each action changes perceived witnesses, audience or information flow;
- whether three interventions feel sparse or still too procedural;
- whether one action point appears mechanically privileged over dialogue.

## Comparative decision rules

Do not continue a support condition because it is more novel or visibly interactive.

A support condition should show a credible advantage in at least two high-priority areas such as presence, agency, causal understanding, place/action memory or expected aftermath, while remaining no worse or acceptably close on narrative pull, dialogue fatigue, process feeling and burden.

Strong reasons to retain **only the baseline** include:

- equal or better first-person retelling;
- equal comprehension without clue controls;
- stronger pull and lower burden;
- support remembered as redundant confirmation;
- no meaningful difference in expected aftermath.

Strong reasons to continue **observation selectively** include:

- players use exact observed evidence in later reasoning;
- non-use remains viable;
- clues improve memory and choice quality;
- affordance debt is limited and understood.

Strong reasons to continue **decisive actions selectively** include:

- interventions dominate spontaneous memory for the right reason;
- consequences are inferred without scores;
- players distinguish the alternatives as social acts;
- the rhythm still feels like one evening rather than three mechanics.

## Findings report

Create a numbered file under `findings/` containing:

- date and tester count;
- assignment and exposure structure;
- condition-level medians or distributions;
- route and observation/action usage;
- representative paraphrased comments;
- contradictions and outliers;
- confounds;
- decision: continue, revise, retest or kill;
- exact implementation changes justified by the evidence.

Do not silently rewrite this design document to make later results look predicted.
