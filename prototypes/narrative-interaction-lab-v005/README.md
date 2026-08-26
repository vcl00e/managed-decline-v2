# Narrative Interaction Lab v005 — Radio Free Bellwether

**Status:** ready for first playtest

V005 is a deliberately different experiment from the rejected v004 activity-spine build.

V004 was not useful evidence because it represented space as location-selection buttons and represented obligation as a hidden counter layered onto a scripted scene. It therefore mostly compared a visual novel with a visual novel that had extra controls.

V005 instead asks a more basic question:

> **When Managed Decline gives the player a small continuous social space containing people, physical affordances and events that do not wait for them, what do they naturally start doing — and does that create a kind of narrative agency worth having?**

It does **not** assume that “attention” is the core mechanic. The prototype is meant to expose player behaviour before we name the activity loop.

## New scenario: Radio Free Bellwether

Thursday evening. The player has promised Maya Nair they will help with her volunteer community-radio night at Bellwether Community Rooms.

The player arrives while:

- the radio mixer has an unreliable wall socket;
- caretaker Ben is still running the building as normal;
- June is making tea before the weekly broadcast;
- LocalityWorks representative Rowan Vale arrives for a “community asset familiarisation” viewing;
- his paperwork appears to assume the building will be vacant within days;
- a prospective workspace tenant is on her way;
- nobody currently using the hall appears to have been told it is supposed to be vacant.

There is no villain briefing and no announced objective. The player can help Maya, follow Rowan, talk to Ben or June, investigate something they notice, stay out of it, or leave.

The immediate satire is the collision between a visibly active community building and institutional language that has already classified it as an asset ready for activation.

## What is actually playable

This is a real-time top-down browser prototype, not a menu representation of a space.

- continuous WASD / arrow-key movement;
- collision geometry and connected rooms;
- NPCs physically moving through the building on their own schedules;
- ambient conversations with world positions and hearing radii;
- events that become **missed events** if the player is elsewhere;
- contextual conversations initiated by approaching people;
- a carryable extension reel and a radio mixer whose physical state matters;
- a dropped property briefing that can be noticed and read while it is still there;
- a side entrance whose availability depends on what the player learned from June;
- multiple ways for the eventual collision to resolve from actions taken in the world;
- the ability to leave before the situation resolves;
- movement / hearing / interaction / dialogue / outcome telemetry;
- an immediate debrief focused on self-directed activity rather than system comprehension.

Dialogue pauses world time so reading speed is not punished. Outside dialogue, the place continues.

## The crucial design constraint

The accepted work/routine rule remains:

> **Simulate commitments, not chores.**

The player does not repeatedly perform radio setup labour. There is one concrete problem — the dead mixer socket — whose physical solution matters because it changes what Maya can do when the evening collides with the property viewing.

Likewise, walking is not included because JRPGs have walking. It is included only to test whether presence, audience, overhearing, voluntary sequencing and material intervention create meaning that would be weaker as a scene menu.

## What success would look like

Strong evidence is behavioural, not merely a high rating.

Examples:

- the player decides, without prompting, that they want to follow Rowan into the courtyard;
- they abandon the extension-reel problem because a conversation elsewhere seems more important;
- they help Maya because they care about the broadcast rather than because it resembles a task marker;
- they notice the dropped briefing and become curious before anyone tells them to inspect it;
- they spend time with June or Priya despite those interactions not being necessary to “win”;
- they hear something from another room and change what they are doing;
- they realise they missed something and accept that as part of their version of events;
- a physical action such as powering the studio or opening the side door becomes part of a social strategy;
- they form a clear intention such as “I want the show to happen”, “I want to know what Rowan knows”, “I don't want these people pushed around”, or “I want to stay out of this” without the game naming it;
- afterward, the player would not want the same material reduced to a linear dialogue scene.

## What failure would look like

Treat v005 as a failure or major redesign signal if:

- walking mainly feels like travel time between dialogue boxes;
- the player waits for obvious prompts instead of forming intentions;
- the extension reel feels like a fetch quest;
- timed events create anxiety rather than a convincing sense of life continuing;
- important information is missed in a way that feels arbitrary or unfair;
- the player has no reason to care where NPCs are physically located;
- the player feels they should exhaust every conversation and object systematically;
- the strongest moments would be better if simply presented as authored VN beats;
- the final collision feels like an ending selector disguised as navigation;
- the new scenario is not entertaining independently of the experiment.

The most important negative answer is:

> **“I understood why I was walking around, but the game would have been better if it just showed me the good scenes.”**

If that is true, the extra gameplay layer has not justified itself.

## Run

Requires Node.js 18+.

```bash
cd prototypes/narrative-interaction-lab-v005
npm run check
npm test
npm start
```

Open:

```text
http://127.0.0.1:4175
```

Optional development state display:

```text
http://127.0.0.1:4175/?debug=1
```

Do not use debug mode for a normal playtest.

## Controls

- `WASD` / arrow keys — move
- `E` / Enter — interact
- `1–4` — dialogue choices

Touch controls are also present on narrow screens.

## Telemetry

Runs remain in browser `localStorage` until exported.

The trace records:

- sampled player position and current room;
- world time;
- ambient events heard;
- ambient events missed;
- contextual interactions;
- dialogue choices;
- object state changes;
- clash resolution;
- final hidden state;
- debrief ratings and written answers.

`Export traces` writes readable indented JSON.

## Not tested here

V005 does not attempt to prove:

- production art or final diorama aesthetics;
- a full workday or calendar system;
- procedural NPC simulation;
- LLM conversations;
- campaign-scale relationship persistence;
- final input design;
- full scenario replayability;
- whether this exact community-hall activity belongs in the shipped game.

The scenario is an instrument for discovering useful player activity, not a commitment to make community-radio setup the game's core loop.
