# Playtest protocol — Narrative Interaction Lab v004

## Purpose

This test compares three interaction treatments around substantially the same dramatic material.

It is not a test of final map art, movement feel, production UI, job simulation depth, economy, campaign progression or full NPC scheduling.

The question is whether the activity layer **earns its cognitive and pacing cost**.

## Condition assignment

For a clean first impression, open one of:

```text
http://127.0.0.1:4174/?condition=a
http://127.0.0.1:4174/?condition=b
http://127.0.0.1:4174/?condition=c
```

Do not explain what A/B/C mean. Do not use `annotate=1`.

### Avoid fixed-order replay

The content is deliberately shared across conditions.

Do not treat one tester playing A → B → C as clean comparative evidence. The later versions will inherit familiarity with jokes, emotional turns and the reveal.

Preferred approaches:

1. **Between-subject:** each first-time tester sees one condition.
2. **Counterbalanced:** if testers must play more than one condition, vary order across participants.
3. **Developer continuation:** use the existing v003 result as historical baseline evidence and test B/C first.

## Facilitator instruction

Tell the participant only:

> Play naturally. There is no correct route. If you want to stop, stop.

Do not tell them:

- that attention is the hypothesised core resource;
- that missed scenes are being measured;
- that work pressure differs between versions;
- that the dialogue baseline previously tested well;
- what counts as success.

## During play

Do not coach.

Record externally where possible:

- time to first clear intention;
- first moment they move somewhere without being prompted by an objective;
- first time they hesitate between two activities;
- any spontaneous statement such as “I want to…”;
- visible amusement;
- signs that movement/activity is irritating;
- signs that work pressure changes a decision;
- reload/restart desire after missing something;
- any moment they say they wish the game would simply advance the story;
- abandonment time and beat.

## Built-in debrief

The prototype records ten ratings:

1. wanted to continue around minute two;
2. felt like doing rather than merely navigating dialogue;
3. formed own intentions without announced objectives;
4. location/activity improved immersion;
5. actions expressed decisions dialogue alone could not;
6. non-dialogue activity felt like chores;
7. operating the game distracted from the situation;
8. cared about what might be happening elsewhere;
9. exact sequence would be better as a straightforward VN;
10. wanted more time with Tabitha.

Items 6, 7 and 9 are negative indicators.

Do not collapse the result into one average score.

## Immediate interview

Prioritise these questions:

1. **What did you decide you wanted, before the game told you to want it?**
2. **Was there a moment when two places or responsibilities both mattered?**
3. **Which action could not have been expressed as well by a dialogue option?**
4. **What did the interface make you do that felt unnecessary?**
5. **Would you remove the spatial/activity layer if you could? Why?**

Then use the remaining built-in prompts.

## Condition-specific interpretation

### A — Dialogue baseline

Strong if pacing remains tight, the emotional arc remains legible, choices feel expressive and the tester does not miss non-dialogue activity.

Weak if the tester describes passivity, wishes they could leave/inspect/attend to something else, or choices feel like stance selection without action.

### B — Spatial attention

Strong if the player forms a route or priority themselves, missing a beat feels owned rather than punitive, location matters, contextual actions create identity/role expression, and movement does not feel like filler.

Weak if the player always beelines to the workshop, every other location feels obviously secondary, the commitment click is pure friction, or they would prefer A.

### C — Situated obligation

Strong if work pressure creates genuine but non-optimisation tension, the player sometimes chooses ordinary work for human/role reasons, presence/absence becomes narratively meaningful, final acknowledgement feels earned, and the player still wants Tabitha/story rather than simply clearing tasks.

Weak if work becomes busywork, queue state dominates thought, the player wants efficiency tools, the player resents story interruptions, or pacing collapses.

## Decision rule

Do not select the condition with the most activity.

Select the **least mechanical condition that produces a material experiential gain**.

A spatial/mechanical layer must justify itself against the already-strong dialogue baseline.

If B or C does not create agency that the tester would miss when removed, prefer A.

## After play

Use `Export traces`.

Store the readable JSON under:

```text
prototypes/narrative-interaction-lab-v004/findings/
```

alongside a written finding.

Do not treat the prototype implementation as accepted game design until the evidence is discussed and the user accepts the resulting conclusion.
