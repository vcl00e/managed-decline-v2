# Narrative Interaction Lab v007d — Dyadic Interaction Grammar

**Status:** design / delta specification — implementation not yet playtest-ready

**Process:** governed by [`../PROTOTYPE-POLICY.md`](../PROTOTYPE-POLICY.md)

## Baseline

The closest accepted interaction baseline remains `narrative-interaction-lab-v006b`:

- compact lived space;
- elastic meaningful time;
- social positioning as narrative interaction;
- situations rather than NPC dialogue inventories;
- low-burden contextual map UI;
- focused VN for genuinely high-bandwidth interaction;
- non-intervention without dead time;
- immediate situation divergence when causally warranted.

V007/v007b/v007c add useful failure evidence:

- do not force a curriculum of group scenes;
- social bandwidth belongs to the player;
- quiet company must contain actual experience;
- more dialogue is not automatically more interaction;
- a long character monologue plus an authored stance selector is not satisfying one-to-one play;
- route/experience tracking can preserve intent but cannot manufacture gameplay.

The accepted activity direction is more fundamental:

> **Read a shared situation, participate in it, and live through what happens.**

## New question / hypothesis

Primary question:

> **Can one-to-one time with a character become intrinsically engaging when conversation is braided through a concrete shared activity, both participants take initiative, and the player repeatedly changes what happens through short contextual actions and responses?**

Secondary question:

> **Can the map and focused VN operate at a finer grain as two bandwidths of one reciprocal interaction rather than `map trigger → dialogue dump → map trigger`?**

## Inherited accepted constraints

These are not under re-test:

- narrative and character remain primary;
- the map remains the dominant ordinary-play surface;
- no dashboard, objective list, event log or developer panel;
- time remains elastic rather than fixed-rate;
- spatial position must matter when it changes participation or continuation;
- the player can stop, leave, hang back or redirect rather than exhaust authored content;
- important dialogue may use focused VN, but VN must serve interaction rather than exposition delivery;
- choices should arise from the immediate fiction rather than expose designer-authored relationship goals;
- character facts should preferentially emerge because they matter to what is happening now.

## Deliberate re-test / correction

V007d rejects the v007c assumption that a one-to-one experience can be made interactive primarily by funding it with enough authored dialogue and a later payoff.

The targeted correction is:

> **The experience must have a playable dyadic activity kernel before relationship interpretation, future plans or route rewards are counted as value.**

The active-experience lifecycle from v007c is not used as the progression engine here. It may remain a useful later tracking concept, but this prototype should succeed without needing a promise/coverage abstraction to make the interaction feel alive.

## Not being tested

Do not expand this prototype into:

- a full Friday-night social ecology;
- group interaction;
- Priya or Maya routes;
- accumulated campaign-scale relationship simulation;
- relationship meters;
- phone/asynchronous interaction;
- free-text dialogue;
- large exploration;
- work/resource systems;
- procedural dialogue or LLM-owned canonical state.

This is intentionally a **one-character, one-activity** experiment.

# Shared activity kernel

## Situation

Outside the community hall, a new vinyl banner reading **COMMUNITY RESILIENCE HUB** has been fixed over part of the building's older stone frontage.

Tabitha notices that the banner appears to cover the original carved name of the building. She becomes curious and starts investigating it.

The player is not assigned an objective. Tabitha can begin without them.

## Why this activity

It supports the desired interaction grammar because it contains:

- something concrete to look at and manipulate;
- multiple physical positions;
- incomplete information;
- small discoveries;
- reasons for Tabitha to demonstrate knowledge without reciting biography;
- opportunities for the player to help, challenge, notice, tease, redirect or stop;
- natural movement from forecourt to side of building;
- a possible focused conversation that emerges from what the player actually did.

The activity is intentionally trivial in stakes. The test is **companionship through doing something together**, not crisis management.

# Dyadic interaction grammar under test

A successful run should look more like:

```text
TABITHA NOTICES / INITIATES
        ↓
PLAYER FOLLOWS, HANGS BACK OR REDIRECTS
        ↓
SOMEBODY ACTS ON THE SHARED OBJECT
        ↓
SHORT REACTION / EXCHANGE
        ↓
PLAYER CHANGES THE SITUATION
        ↓
TABITHA RESPONDS OR INITIATES NEXT MOVE
        ↓
DISCOVERY / MISUNDERSTANDING / JOKE / DISAGREEMENT
        ↓
FOCUSED VN ONLY IF CONVERSATION EARNS IT
        ↓
RETURN TO SHARED ACTIVITY
        ↓
A DIFFERENT INTERPERSONAL STATE EXISTS BECAUSE OF WHAT THEY DID
```

## Required properties

### 1. Mutual initiative

Tabitha must do things without waiting for the player:

- notice the hidden stonework;
- walk toward it;
- try an approach;
- ask for help or react when none is given;
- suggest checking the side of the building;
- abandon or change an idea when appropriate.

The player must not be the sole motor of the interaction.

### 2. Concrete player participation

The player should repeatedly be able to change what happens through context-specific actions such as:

- hold a loose edge of the banner;
- shine a phone torch;
- read letters Tabitha cannot see;
- inspect another part of the wall;
- check the side entrance instead;
- tell her not to pull at council property;
- let her handle it;
- follow when she moves;
- walk away.

These are examples, not a universal verb menu.

### 3. Short conversational turns

Avoid long uninterrupted exposition blocks.

Working rule for this experiment:

> **Before a character has delivered several consecutive substantive lines, ask whether the player or the physical situation should have had a chance to act.**

Focused VN should normally alternate short exchanges, contextual choices and changed state.

### 4. Natural options

Player dialogue choices should be things a person might plausibly say **right now**, not summaries of a desired relationship stance.

Prefer:

- `How do you know that?`
- `No chance.`
- `Hold this.`
- `You're going to get us banned.`
- `Show me.`
- silence / keep looking.

Avoid:

- `I'm interested in the real you.`
- `You don't have to perform around me.`
- `Tell me something unrelated to your public identity.`

### 5. Character information through use

If Tabitha reveals that she worked in a library or knows municipal architecture, it should happen because that knowledge helps explain a current discovery.

The interaction should still work if no biography paragraph is ever delivered.

### 6. Interaction-produced progression

Progression means the pair behave differently because of the shared activity.

Examples:

- they develop a running joke while solving the problem;
- Tabitha starts handing the player things without asking because they have become a working pair;
- she trusts or distrusts the player's judgment about how far to push the investigation;
- the player learns how she behaves when curious, embarrassed, challenged or proven wrong;
- they discover something together that changes the immediate next action.

A future plan is optional and **does not count as proof of progression by itself**.

# Prototype activity shape

## Beat A — notice

Tabitha notices the banner covering old stone lettering and walks over.

The player can follow immediately, look elsewhere, or head inside/leave. If they do not engage, Tabitha still investigates briefly on her own.

## Beat B — first attempt

At the banner she tries to see behind a loose lower corner.

Possible player contributions alter the physical state:

- hold the corner;
- use a phone torch;
- read what is visible;
- warn her off;
- do nothing.

Different actions should reveal different partial information or prompt different next moves.

## Beat C — inference

The pair now have fragments of a carved name/date.

Conversation remains short and contextual. Tabitha's architectural knowledge can emerge here because it helps interpret the fragment.

The player may challenge her interpretation, ask how she knows, or test another idea physically.

## Beat D — side of building

Tabitha may suggest checking where the old entrance would have been and physically moves around the side.

Following is a spatial narrative choice, not a dialogue confirmation.

At the side they can find evidence such as blocked masonry, old fixing holes or a surviving plaque fragment.

## Beat E — focused exchange if earned

Only after enough shared conduct exists should a focused VN exchange occur.

It should be a back-and-forth conversation about what just happened, not a biography dump. The player's earlier conduct changes available lines and Tabitha's assumptions.

## Beat F — natural resolution

The interaction can resolve through:

- satisfying the curiosity and going inside;
- continuing around the building;
- leaving together;
- player losing interest and walking away;
- Tabitha deciding they have pushed it far enough;
- a small disagreement about whether to keep meddling.

There is no mandatory relationship reward.

# Readiness probes

Before external playtest, the build must pass these qualitative questions:

1. **What did the player physically or socially do with Tabitha?** The answer must contain several actions, not `selected supportive dialogue`.
2. **What did Tabitha initiate?** More than dialogue delivery.
3. **Could the interaction change before the ending?** Earlier actions must alter later state, dialogue or available continuation.
4. **Did character information emerge from the activity?** No biography dump required.
5. **Were player options natural in context?** No relationship-design slogans.
6. **Did any focused VN section operate as back-and-forth interaction rather than a monologue?**
7. **Could the player stop or redirect naturally?**
8. **If all relationship labels, future-plan rewards and telemetry were hidden, would the activity itself still be worth doing?**
9. **Would the reviewer voluntarily continue interacting with Tabitha?**

Any weak answer blocks external playtest.

# Technical regression probes

Automated tests should verify only what they can actually establish:

- no dashboard / action-log regression;
- no fixed timer requirement;
- Tabitha can initiate without player interaction;
- multiple first-attempt actions produce different physical state;
- player can decline/leave without deadlock;
- following Tabitha to the side is optional;
- early action changes later dialogue/state;
- no focused scene contains a long unbroken intro monologue;
- the interaction cannot complete solely through time advancement;
- the final state depends on conduct during the shared activity.

## External playtest question

> **Did this feel like actually doing something with Tabitha and getting to know her through the interaction, or did it still feel like walking between authored dialogue nodes?**
