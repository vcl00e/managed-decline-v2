# Playtest protocol

## Purpose

This is not a systems-completeness test. It asks whether a short piece of *Managed Decline* is compelling enough that the player wants more.

The previous prototype was abandoned after approximately two minutes. Therefore **early abandonment is primary evidence**, not something the facilitator should try to prevent.

## Before play

The participant should not read:

- `story.js`;
- `docs/DESIGN.md`;
- this protocol beyond necessary run instructions;
- ending descriptions;
- emotional-phase labels.

Use normal mode:

```text
http://127.0.0.1:4173
```

Do not use `?annotate=1` during the test.

## Facilitator instruction

Tell the participant only:

> Play this as you would a game you chose for yourself. If you want to stop, stop. I care about the moment you lose interest as much as what happens if you finish.

Do not explain:

- who Tabitha parodies;
- the intended emotional journey;
- that comedy is being measured;
- the three endings;
- why particular choices exist.

Recognition should help the joke but must not be required for it.

## During play

Do not coach.

Record externally if possible:

- start time;
- first visible laugh or amused reaction;
- first spontaneous positive comment about Tabitha or the premise;
- first sign of boredom/confusion;
- any moment the participant says what they hope happens next;
- abandonment time and exact beat if they stop;
- completion time.

If the participant wants to stop, **do not ask them to finish for data completeness**.

The most important question is whether the slice earns the next minute.

## Immediate debrief

Use the built-in ratings before discussing the design:

1. At about minute two, I wanted to continue.
2. I found the slice genuinely funny.
3. I wanted more time with Tabitha.
4. My emotional state changed meaningfully during the slice.
5. My choices changed the social/emotional meaning.
6. I wanted another scene when it ended.

Then ask the built-in interview questions.

Prioritise the participant's wording over numeric ratings.

## Interpretation

### Strong positive evidence

Examples:

- laughs before the premise has to be explained;
- wants to know what the workshop says next;
- expresses attraction, affection, curiosity or protective concern toward Tabitha;
- visibly changes response when the fabricated quote appears;
- has a clear preference about reveal / leave / source without treating it as a morality quiz;
- remembers the projector image or particular lines;
- reaches the end and asks what happens next.

### Strong negative evidence

Examples:

- boredom before the fabricated quote;
- no genuine laughs;
- Tabitha reads as “trying too hard to be witty”;
- player understands the satire intellectually but feels no pull;
- emotional sting feels manipulative or obvious;
- final choice feels like three equivalent ways to be supportive;
- participant is relieved when it ends;
- participant again stops around minute two.

## One-tester discipline

A single developer/tester run is directional evidence, not population evidence. However, another rapid abandonment from the intended core audience is sufficient reason to stop and redesign rather than average the failure away.

If the initial tester enjoys the slice, repeat with several people who differ in:

- familiarity with the Amelia / public-sector-training reference;
- appetite for political satire;
- romance / character-driven game interest;
- visual-novel familiarity.

The slice must work for someone who does **not** know the reference while offering an extra recognition reward to somebody who does.

## After play

Export the readable JSON trace and store it under this prototype's `findings/` directory alongside the written finding.

Do not merge positive design conclusions into the game merely because the prototype exists. Record the evidence first.
