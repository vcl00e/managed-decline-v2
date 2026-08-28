# Narrative Interaction Lab v007d — Dyadic Interaction Grammar

**Status:** ready for external playtest — exact-branch checks and dyadic whole-play preflight passed

**Process:** governed by [`../PROTOTYPE-POLICY.md`](../PROTOTYPE-POLICY.md)

**Internal review:** [`findings/000-2026-08-28-internal-dyadic-preflight.md`](./findings/000-2026-08-28-internal-dyadic-preflight.md)

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

V007/v007b/v007c add failure evidence that is now inherited:

- do not force a curriculum of social scenes;
- social bandwidth belongs to the player;
- quiet company must contain actual experience;
- more dialogue is not automatically more interaction;
- a long character monologue plus an authored stance selector is not satisfying one-to-one play;
- route/experience tracking can preserve intent but cannot manufacture gameplay.

The more fundamental accepted activity direction is:

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
- no dashboard, objective list, event log or visible developer panel;
- time remains elastic rather than fixed-rate;
- spatial position matters when it changes participation or continuation;
- the player can stop, leave, hang back or redirect rather than exhaust authored content;
- focused VN serves interaction rather than exposition delivery;
- choices arise from immediate fiction rather than designer-authored relationship goals;
- character facts preferentially emerge because they matter to what is happening now.

## Deliberate correction

V007d rejects the v007c assumption that a one-to-one experience can be made interactive primarily by funding it with enough authored dialogue and a later payoff.

> **The experience must have a playable dyadic activity kernel before relationship interpretation, future plans or route rewards count as value.**

The v007c active-experience lifecycle is not the progression engine here. V007d must succeed through the interaction itself.

## Not being tested

This prototype deliberately excludes:

- group interaction;
- Priya/Maya routes;
- campaign-scale character interpretation;
- relationship meters;
- phone/asynchronous interaction;
- free-text dialogue;
- large exploration;
- work/resource systems;
- procedural dialogue or LLM-owned canonical state.

It is intentionally a **one-character, one-activity** experiment.

# Shared activity kernel

Outside the community hall, a new vinyl banner reading **COMMUNITY RESILIENCE HUB** covers part of the building's older stone frontage.

Tabitha notices that it appears to cover the original carved name and starts investigating it herself. The player receives no objective and may follow, help, challenge, hang back or leave.

The activity provides:

- a concrete object to inspect/manipulate;
- incomplete information;
- different physical positions;
- small discoveries;
- reasons for Tabitha's old-building knowledge to become useful rather than recited as biography;
- opportunities to help, challenge, notice, tease, redirect or stop;
- movement from the frontage around the side of the building;
- a focused conversation only after the joint activity has created something worth discussing.

The stakes are intentionally trivial. The experiment is **companionship through doing something together**.

# Implemented interaction grammar

A typical cooperative run is:

```text
TABITHA NOTICES THE COVERED STONEWORK
        ↓
walks to the banner herself
        ↓
PLAYER PHYSICALLY FOLLOWS
        ↓
holds the loose banner corner
        ↓
reads exposed stone letters
        ↓
TABITHA INFERS AN OLD ENTRANCE MAY BE ROUND THE SIDE
        ↓
walks round the building herself
        ↓
PLAYER FOLLOWS / INSPECTS THE BRICK SEAM
        ↓
SHORT FOCUSED EXCHANGE
        ↓
player physically finds a hinge scar / screw holes
        ↓
TABITHA REACTS TO THE PLAYER'S DISCOVERY
        ↓
player tests or confirms the doorway inference
        ↓
TABITHA GOES TO CHECK A SURVIVING PLAQUE
        ↓
PLAYER FOLLOWS AND FINDS “READING ROOM”
        ↓
player chooses to keep looking, go inside or stop
        ↓
chosen spatial continuation visibly occurs before the run ends
```

## Mutual initiative

Tabitha can:

- notice the mismatch without player input;
- walk to the banner;
- try to inspect it;
- make or revise an inference;
- suggest checking the side wall;
- physically go there;
- react to the player's evidence/skepticism;
- go to the plaque herself;
- participate in the final continuation.

The player is not the only motor of the interaction.

## Concrete player participation

Contextual actions include:

- hold the loose banner corner;
- use a phone torch;
- let Tabitha handle it;
- warn her not to peel council property;
- read exposed letters;
- inspect stonework;
- challenge her interpretation;
- inspect a brick seam;
- search for an old hinge position;
- follow her to new positions;
- stop and leave.

Different early conduct affects later physical/interpersonal state and callbacks.

## Focused dialogue

The focused section is a repeated short-turn graph rather than a monologue.

For example:

```text
TABITHA
“There. You found the edge of it. Look lower down.”

PLAYER
- How do you know?
- Could still just be a repair.
- [Run your fingers along the joint.]
- You are enjoying this way too much.
```

A physical choice can immediately alter the world state:

```text
PLAYER
[Run your fingers along the joint.]

TABITHA
“There. Rust rectangle and two screw holes. That is better evidence than my entire speech.”
```

If the player asks `How do you know?`, Tabitha's old-library experience can emerge because it is useful to the current inference:

> “Library job. Old buildings teach you where people used to be allowed in.”

The player does not need to ask, and the activity can continue without a biography branch.

# Variation

The initial approach can be:

- **cooperative:** hold the vinyl while Tabitha looks;
- **practical:** use a phone torch;
- **Tabitha-led:** let her make the questionable choices;
- **cautious:** tell her not to peel council property and investigate only the masonry.

Later the player can find evidence first, challenge Tabitha's doorway theory, inspect a different clue or stop entirely.

The final callback reflects conduct such as caution, skepticism, teasing or who found the hinge evidence.

# Internal readiness evidence

Exact committed-branch CI passed:

- syntax checks;
- **14/14** dyadic interaction / regression tests;
- HTTP smoke test.

The complete rendered cooperative interaction was also played with actual movement and contextual inputs. See the internal review for the full sequence and qualitative answers.

Automated checks are intentionally limited to structural claims. They do **not** establish that the clue hunt, writing or chemistry are enjoyable.

## Key preflight correction

The first local build ended immediately after the final continuation choice. That was rejected because it repeated a failure already corrected in v006b: a consequential spatial choice should visibly change what the player experiences next.

Current behavior:

- `Keep circling the building` makes Tabitha physically head toward the back/low-wall area before the run finishes;
- `Go inside` makes her physically return toward the entrance;
- the debrief occurs only after the chosen spatial continuation begins / reaches its destination.

# External playtest question

> **Did this feel like actually doing something with Tabitha and getting to know her through the interaction, or did it still feel like walking through a small authored investigation?**

Specific unresolved questions:

- Is the shared investigation genuinely enjoyable or just more interactive?
- Do the contextual actions feel natural rather than adventure-game busywork?
- Does Tabitha's dialogue sound human now?
- Does character information emerge naturally enough from what you are doing?
- Do your earlier actions noticeably affect how the interaction develops?
- Does the map/VN alternation feel like one continuous interaction?
- Is there enough interpersonal progression without explicit relationship-game language?

## Run

Requires Node.js 18+.

```bash
cd prototypes/narrative-interaction-lab-v007d
npm run check
npm test
npm start
```

Open:

```text
http://127.0.0.1:4177
```

## Controls

- `WASD` / arrow keys — move;
- `Tab` — cycle nearby contextual actions;
- `E` / `Enter` — use the highlighted action;
- `1–4` — choose during focused dialogue;
- `Esc` — leave focused dialogue and return to the map.

Do not try to find all branches. React to Tabitha and the building as you naturally would.
