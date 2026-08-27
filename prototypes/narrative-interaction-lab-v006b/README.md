# Narrative Interaction Lab v006b — The Viewing

**Status:** concluded — successful targeted correction; proceed to v007

See [`findings/002-2026-08-26-final-conclusion.md`](./findings/002-2026-08-26-final-conclusion.md) for the accepted conclusions and v007 handoff.

V006b is a controlled revision of v006 using the same premise and core characters. It exists because the first v006 runs produced a very specific mixed result:

- the tester valued spatial presence when Priya arrived, when they were invited into Tabitha's private room, and when the final stay/leave choice changed where the protagonist actually went;
- focused VN presentation increased immersion for important dialogue;
- semantic choices helped the tester define their stance even when they did not branch the situation much;
- but the fixed invisible timeline created long periods of empty wandering, made NPC activity feel inaccessible, encouraged anticipatory scrambling, and made the player feel that the game controlled pacing arbitrarily.

V006b therefore does **not** broaden scope. It tests a narrower correction:

> **Can the same lived-space/VN synthesis work when continuous geography is retained but time is elastic, NPC activity is socially permeable, and the player participates by choosing where to put themselves rather than waiting for fixed timestamps?**

## Core design correction

V006 treated continuous place as continuous fixed-rate time.

V006b separates them:

> **Simulate meaningful presence, not elapsed seconds.**

The flat remains continuous. The protagonist can still move through it, notice arrivals, cross social thresholds and decide who to be with. But the authored evening now advances through causal phases rather than a 132-second master schedule.

The only short real-time windows occur while something active is happening:

- somebody is knocking;
- Alex and Priya are speaking and moving through the flat;
- Priya is waiting at the bedroom threshold;
- a question has been asked and Alex will answer if the player does not intervene.

There should be no period whose sole purpose is to wait for the next authored timestamp.

## The live-situation interaction grammar

V006 also overcorrected against NPC polling. Alex and Priya stopped behaving like dialogue terminals, but became largely non-participable moving scenery.

V006b makes **the current social situation** interactable instead of exposing a refreshed dialogue inventory on each person.

Examples:

### Priya at the door

The player can physically answer it, stay with Tabitha and let Alex answer, or simply fail to take responsibility before Alex does.

### The viewing begins

The player can:

- join Alex and Priya;
- stay with Tabitha;
- hang back and listen.

Those are positioning decisions, not generic `Talk` prompts.

### The bedroom threshold

The player can:

- wave Priya in immediately;
- ask the viewing to give Tabitha a minute;
- let Alex handle access.

The same doorway therefore carries privacy, authority and social meaning.

### The damp question

The player can:

- join the important conversation, which moves into full VN presentation;
- listen from the doorway;
- let Alex answer without taking over;
- inspect or photograph the physical evidence when relevant.

If the player does not intervene, Alex eventually answers because Priya actually asks him—not because an invisible global timer reaches the next story node.

## Experimental rhythm

```text
continuous place
    ↓
active human situation
    ↓
choose where to put yourself / whether to participate
    ↓
short spatial or ambient interaction
    ↓
important conversation becomes high-bandwidth enough to justify VN focus
    ↓
return to the same place with a changed practical/social situation
    ↓
next active situation, with empty time compressed
```

## What is deliberately unchanged

To preserve comparison with v006:

- Tabitha is still moving out;
- Alex still urgently needs a replacement tenant;
- Priya is still the prospective tenant;
- the agent is still delayed;
- the damp remains a real unresolved material problem;
- there is still no clean villain or magic institutional reversal;
- the final choice still asks whether to leave with Tabitha or stay with the viewing.

One term is now clearer: **before the run begins, the protagonist has already told Tabitha they will walk her to the station.** The final stay/leave decision therefore acts on a legible prior arrangement rather than appearing from nowhere.

## Spatial scope is smaller and denser

The map now contains only three semantically distinct areas:

- **entrance hall** — arrival, listening, leaving;
- **living room / kitchen** — the moving viewing and public/shared space;
- **Tabitha's room** — intimacy, privacy, damp evidence and the key access threshold.

A room is retained because it carries a different social function, not because a flat needs more floor area.

## Focused VN scenes

Important dialogue still takes over the presentation when warranted.

V006b is not testing whether all speech should remain on the map. It tests whether the *transition* into focused presentation feels justified after the player has been allowed to position themselves inside the preceding live situation.

Dialogue cancellation remains first-class. Cancelling a focused scene no longer falsely marks that scene as completed; the player returns to the live situation.

## Consequence design

V006b keeps two distinct kinds of choices:

### Expressive / stance choices

These may establish how the protagonist interprets their role without forcing large plot divergence.

Example:

> “It is not my room or my disclosure to make.”

Alex and Tabitha can still disclose the damp themselves. The player has declined authority rather than erased reality.

### Positioning / commitment choices

These alter what the protagonist actually lives through.

The strongest existing example remains:

> **Go with Tabitha / stay at the flat.**

V006b makes the pre-existing station promise explicit so the choice carries both spatial and commitment consequences.

## Debrief questions

The v006 debrief contained two ambiguous measures. V006b replaces them with questions that directly test the design:

- Did you ever feel you were waiting for the game to continue?
- Did you feel pressure to test NPCs or objects for hidden content?
- When did deciding where to be feel meaningful?
- Could you join or stay out of situations naturally?
- Did the transition into focused VN presentation improve the moment?
- Which choices mainly defined your stance?
- Which choices actually changed what happened next?
- Which map moments would lose meaning if automatically converted into VN transitions?
- Would removing the explorable space make the experience worse?
- Was your attention on the people/situation or on operating the prototype?

## Success criteria

V006b is successful enough to proceed to a larger v007 only if:

1. the dead-time complaint is substantially reduced or absent;
2. the player no longer feels ignored while NPCs are visibly doing relevant things;
3. there is little pressure to poll NPCs for refreshed content;
4. at least two positioning decisions feel humanly meaningful;
5. the focused VN transitions feel justified rather than like timer-triggered traps;
6. the player can distinguish stance-defining choices from choices that materially change subsequent play;
7. the map remains worth keeping because space carries social meaning that automatic scene transitions would flatten.

If this still feels like waiting between scenes, do not expand to v007. The temporal/interaction grammar remains unresolved.

## Run

Requires Node.js 18+.

```bash
cd prototypes/narrative-interaction-lab-v006b
npm run check
npm test
npm start
```

Open:

```text
http://127.0.0.1:4177
```

## Controls

- `WASD` / arrow keys — move
- `E` / Enter — interact with the highlighted contextual affordance
- `Tab` — cycle nearby contextual targets
- `1–4` — choose VN options
- `Enter` — advance VN dialogue
- `Esc` — cancel a focused conversation and return to the live situation

## Telemetry

Runs are stored under `md-v006b-runs` and export as readable indented JSON.

The trace records:

- causal phase changes;
- compressed fictional-time advances;
- position samples;
- ambient speech;
- explicit and inferred positioning decisions;
- live-situation interactions;
- knowledge provenance;
- commitments;
- material actions;
- VN choices and cancellations;
- final residue and debrief answers.
