# Narrative Interaction Lab v007c — Friday Night, Active Social Experiences

**Status:** ready for external playtest after consolidated-policy, architecture and whole-play preflight

**Process:** governed by [`../PROTOTYPE-POLICY.md`](../PROTOTYPE-POLICY.md)

**Internal review:** [`findings/001-2026-08-28-active-experience-refactor.md`](./findings/001-2026-08-28-active-experience-refactor.md)

## Baseline

V007c remains a correction of the failed v007/v007b Friday-night prototypes.

It inherits:

- v006b’s accepted lived-space / focused-VN grammar;
- the compact hall / forecourt / side-yard layout that was positively received;
- low-burden map UI with no dashboard or permanent action list;
- elastic meaningful time;
- player-controlled social bandwidth;
- optional small-group, one-to-one, observer and leave approaches;
- immediate local acknowledgement for situationally meaningful choices.

It rejects two failed implementations:

- v007’s authored curriculum of group interaction;
- v007b’s technically available but nearly empty one-to-one route.

## New question / hypothesis

> **Can the player choose a social experience—one-to-one, small group, observer or selective—and have that chosen experience develop into something worthwhile without the game forcing a route curriculum?**

A secondary architectural question is:

> **Can the prototype reason about the player’s currently chosen experience rather than accumulating a separate flag chain for every route?**

## Inherited accepted constraints

- narrative and characters remain primary;
- important conversation may receive substantial focused VN treatment;
- map play carries presence, audience, continuity and freedom to change focus;
- no fixed invisible timer;
- no dashboard, log, objective list or visible developer state;
- NPCs can act without protagonist management;
- groups are optional and permeable;
- non-intervention must still contain something worth experiencing;
- meaningful choices receive timely observable acknowledgement.

## Deliberate re-tests / overrides

No accepted v006b UI, timing or social-permeability conclusion is reopened.

The implementation deliberately replaces v007b’s route-specific progression flags with a shared **active-experience lifecycle**.

This is an implementation experiment, not a claim that the final game requires one universal experience engine.

## New-domain freedoms

- defining current social focus and mode;
- suspending and resuming a chosen experience when the player changes focus;
- experience-specific interruption tolerance;
- explicit promise coverage for internal review;
- observer and group development through map-level material rather than only VN scenes.

## Not being tested

- free text or compositional input;
- phone / asynchronous interaction;
- large crowds or procedural gossip;
- relationship meters;
- campaign-scale simulation;
- complex work, resource or task systems;
- LLM-owned canonical state.

# Active-experience architecture

The scenario defines four promoted experiences:

| Experience | Mode | Player desire | Core promise |
|---|---|---|---|
| `tabitha_companionship` | one-to-one | meaningful time with Tabitha | mutual attention, shared activity, discovery, expression, plan, payoff |
| `radio_group` | small group | enjoy ensemble chemistry without driving every line | NPC chemistry, optional participation, audience meaning, social payoff |
| `priya_companionship` | selective one-to-one | quieter Priya time without joining the group | discovery, expression, concrete plan |
| `observer_evening` | observer | inhabit and read the room without constant dialogue choices | NPC-to-NPC observation, social rhythm, world change, contained payoff |

Each experience uses the same lifecycle vocabulary:

```text
ENTRY
→ DEVELOPMENT
→ PARTICIPATION
→ PAYOFF
→ RESIDUE / COMPLETE
```

The player can change focus. The prior experience is suspended rather than erased, so private context can survive rejoining a group.

Low-interruption experiences can temporarily hold unrelated arrivals back until the chosen interaction has actually delivered its payoff.

The architecture is intentionally light:

- authored scenes and world actions still determine content;
- character-specific outcomes remain authored;
- the shared layer only tracks current focus, development stage, promised value and continuity.

# Implemented experiences

## Tabitha one-to-one

```text
arrive together
→ choose to remain with her
→ inspect the hall noticeboard together
→ substantial private VN conversation
→ form a specific plan / private motif
→ follow her to the side yard
→ plan-specific callback
→ leave together, rejoin the group or continue quietly
```

The route cannot end after the opening interaction. It must deliver shared activity, character discovery, a meaningful response and a payoff first.

Spatial behaviour carries the continuing intention; the game does not repeatedly ask whether the player still wants to stay.

## Radio group

```text
join Maya and Alex
→ NPC-to-NPC banter with optional participation
→ stay for a distinct next-track map beat
→ Priya and Tabitha settle independently
→ optional audience-sensitive group story
→ closure changes the group’s shape
→ afterparty / other continuation
```

The group does not require Tabitha’s private route.

## Priya-selective

Priya can arrive and settle without being collected. A player can observe the room, approach her directly, have a focused private conversation and form a chips plan without completing the radio-group scene.

## Observer

The observer experience contains several distinct map-level observations:

1. Maya/Alex radio chemistry;
2. Priya and the room settling;
3. the room splitting into smaller circles;
4. the group adapting to the closure policy;
5. a contained decision to leave.

It contains no required focused VN scene and is not implemented as one time skip.

# Regression probes

The build verifies that:

- ordinary UI contains no dashboard, action log or developer panel;
- no group scene gates Tabitha content;
- quiet play cannot terminate after one short interaction;
- unrelated arrivals do not invade the unfinished private experience;
- changing focus suspends rather than deletes prior context;
- group play develops without the private route;
- Priya-selective play develops without the radio-group scene;
- observer play develops without focused group dialogue;
- route progression is carried by the shared lifecycle rather than a new route-specific completion-flag maze;
- all four promoted experiences have explicit desires, promises and progression arcs.

Automated tests establish structure and regression safety only. They do not establish whether the writing, chemistry or pacing are good.

# Whole-play review

Rendered headless-browser preflights completed the full:

- Tabitha one-to-one experience;
- radio-group experience;
- observer experience;
- Priya-selective experience.

The preflight record describes what each experience actually provided, where it remained uncertain and why the build is now worth an external test.

# External playtest question

> **When you choose a social experience, does it feel as though the game understands what you wanted and develops it into something worth continuing—or does it still feel like selecting a route package?**

Do not attempt to cover all content. Change focus whenever your actual interest changes.

## Run

Requires Node.js 18+.

```bash
cd prototypes/narrative-interaction-lab-v007c
npm run check
npm test
npm start
```

Open:

```text
http://127.0.0.1:4177
```

## Controls

- `WASD` / arrows — move;
- `Tab` — cycle nearby contextual affordances;
- `E` / `Enter` — interact;
- `Enter` — advance focused dialogue;
- `1–4` — choose;
- `Esc` — leave focused dialogue and return to the live space.

## Telemetry

Readable JSON records:

- active-experience changes;
- experience events and promise coverage;
- conduct, audience and privacy;
- visible local changes;
- fictional beats;
- character interpretations;
- residue;
- debrief answers.
