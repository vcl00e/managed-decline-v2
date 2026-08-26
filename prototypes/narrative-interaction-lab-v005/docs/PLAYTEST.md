# V005 playtest protocol

## Purpose

This test is exploratory rather than comparative.

Do not ask whether the player “used the systems correctly”. Observe what they naturally try to do in the continuous space.

## Before play

The player should not read:

- `docs/DESIGN.md`;
- `scenario.js`;
- the event schedule;
- the possible outcomes;
- debug mode.

Normal URL:

```text
http://127.0.0.1:4175
```

## What to tell the player

Only:

> Play it as if this were a small section of a game you had chosen. You said you'd help Maya with the radio night. Do whatever feels natural. You can leave through the front doors whenever you want, and you do not need to see everything.

Do not explain:

- that overhearing is being tested;
- what objects are meaningful;
- where the extension reel is;
- that Rowan can be followed;
- that events can be missed;
- that there are several resolutions;
- that space needs to justify itself against a VN baseline.

## Observe, do not coach

Record externally if practical:

- first destination after gaining control;
- first self-initiated interaction;
- first time the player changes direction because of something seen or heard;
- any attempt to follow an NPC;
- any moment they say what they are trying to accomplish;
- whether they systematically sweep rooms / people like checklist content;
- whether they seem relaxed about missing things or anxious about it;
- moments of dead walking;
- moments where physical positioning creates anticipation;
- any action they attempt that the prototype does not support;
- any moment they ask “what am I supposed to do?”;
- any moment they want to stop;
- completion / exit time.

If the player wants to stop, let them stop. Early exit is meaningful evidence.

## Especially valuable unsupported intentions

Write these down verbatim.

Examples:

- trying to eavesdrop through a door;
- wanting to text someone;
- trying to give Rowan's pack back;
- trying to move chairs or barricade a door;
- wanting to bring Priya to Maya;
- attempting to listen to the radio while walking elsewhere;
- wanting to wait in a particular place for somebody;
- trying to interrupt an ambient conversation;
- wanting to ask one NPC about something learned from another when no option exists.

Those gaps may reveal the next useful verb more reliably than our current design assumptions.

## Immediate debrief

Use the built-in debrief before discussing design intent.

The ratings deliberately test:

- self-authored intention;
- spatial consequence;
- physical agency;
- continuous-world feeling;
- chore feeling;
- preference over dialogue-only presentation;
- future pull.

The open questions are more important than the numbers.

## Interpretation

### Strong positive evidence

- player forms a concrete intention without a goal prompt;
- NPC movement creates curiosity or pursuit;
- player voluntarily abandons one possible activity for another;
- hearing / missing something feels like personal sequencing rather than content loss;
- material actions become part of a social strategy;
- player remembers where people were and why they went there;
- player describes their run in terms of “I decided to…” rather than “the game made me…”;
- the player specifically rejects the idea that the material would be better as a VN scene.

### Strong negative evidence

- “Where should I go?” dominates play;
- movement feels like menu navigation performed with feet;
- the player exhausts every NPC because that is obviously optimal;
- timed ambient events are perceived as unfair missable dialogue;
- the extension reel is experienced as a fetch quest;
- reading the property pack feels like a highlighted evidence pickup;
- the final collision feels like finding the correct ending trigger;
- the player wants a quest marker or checklist simply to make the space tolerable;
- the player says the good bits should have been cutscenes.

## After play

Export the readable JSON trace and save it in `findings/` with the written playtest finding.

Do not promote “continuous lived space” into accepted core design simply because this prototype exists. The prototype is evidence only after it has been played.
