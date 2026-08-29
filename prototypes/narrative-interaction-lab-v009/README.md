# Narrative Interaction Lab v009 — Two Pictures

**Status:** internally approved for one external playtest after exact-branch CI; not accepted design

**Runtime:** harness v002 reliable engine/contract/trace layer

**Player-facing shell:** harness v003 recovered presentation; v009 does not modify it

**Internal preflight:** [`findings/000-2026-08-29-internal-preflight.md`](./findings/000-2026-08-29-internal-preflight.md)

## Baseline

V009 begins from the recovered golden baseline established after v008:

- v006b-scale map and focused VN presentation;
- persistent important context rather than disappearing narrative toasts;
- reliable contextual-action/runtime/trace protections from harness v002;
- v003-style priority on immediate character pull, readable dialogue and perceptible acknowledgement;
- sticky companionship: Tabitha does not repeatedly become the next waypoint.

## New question

> **Can a simple, first-pass-legible activity create genuinely reciprocal one-to-one time in which Tabitha both initiates and responds to the player's direction, while the activity itself is enjoyable enough to support character company?**

## Premise

A cheap instant camera has been left on a table after an event in the community hall. It has two shots left.

Tabitha picks it up while already standing with the player and points it at them.

The pair can:

- let Tabitha take the first picture or reverse the order;
- decide how to pose / direct the other person;
- react to the first developing photo;
- take the second photo;
- decide what happens to the two physical prints.

The entire interaction happens in one social area. Ordinary relocation is not part of the experiment.

## Why this candidate

The activity is understandable in one sentence and does not require institutional lore.

It is reciprocal by construction:

```text
Tabitha aims the camera at the player
→ player accepts or redirects
→ first photographer responds to the subject's choice
→ camera changes hands
→ second subject responds to the player's direction
→ both inspect the physical results together
→ the player can determine the final exchange / ownership of the prints
```

The player is not merely following Tabitha's sequence. They can change who goes first, direct her when holding the camera, and determine the physical residue.

## Inherited constraints

- do not change harness v003 CSS or presentation controller;
- no important text expires automatically;
- focused VN remains large and centred;
- no NPC waypoint chasing;
- no relationship meter, affinity score or future-date reward;
- no public-symbol exposition speech;
- no generic reassurance choice such as `I care about the real you`;
- no complicated institutional vocabulary;
- no objective list/dashboard;
- player can leave before beginning or stop after the first picture.

## Not being tested

- large-group ecology;
- long-term relationship memory;
- campaign progression;
- procedural dialogue;
- exploration complexity;
- whether instant photography belongs in production canon.

## Experience contract

### Player desire

Spend a few minutes doing something playful and mutual with Tabitha.

### Experience promise

- mutual attention rather than chasing;
- Tabitha initiates, but the player can redirect;
- each person is briefly subject and photographer;
- short natural banter rooted in what just happened;
- a visible pair of prints that record the interaction;
- a final physical choice about who keeps which picture.

### Development

The interaction shifts from Tabitha initially holding the camera to shared authorship. The player can reverse who goes first; when the player becomes photographer, Tabitha follows their concrete direction and reacts to it.

### Payoff / residue

One or two prints exist in the world. Their captions/content reflect the chosen poses and order. The ending records who keeps which print; this is residue, not a relationship reward screen.

## First-pass comprehension requirement

A cold reader must be able to answer after one read:

1. What is happening? — Two people have an instant camera with two shots.
2. What does Tabitha want? — To use it together / tease the player with a photo.
3. What can the player do? — Accept, reverse the order, direct the photo, stop after one shot, and decide what happens to the prints.
4. What changed? — Specific photos now exist and their ownership is decided.

The internal preflight passed this requirement without relying on prior lore.

## Run

Requires Node.js 22+.

```bash
git checkout prototype/narrative-interaction-lab-v009
cd prototypes/narrative-interaction-lab-v009
npm test
npm start
```

Open:

```text
http://127.0.0.1:4199
```

## Controls

- `WASD` / arrows — move;
- `E` / `Enter` — contextual action;
- `Tab` — cycle when multiple nearby map actions are available;
- `1–4` — choose during focused interaction;
- `Esc` — leave focused interaction and return to the live space.

## External playtest

Do not cover branches. Play once according to what you actually want to do.

Primary question:

> **Did taking the two pictures feel like actually spending playful, reciprocal time with Tabitha, or did it still feel like consuming a packaged character scene?**

Useful feedback:

- whether the recovered UX is comfortably readable again;
- whether you felt socially together rather than following her;
- whether reversing/directing the interaction felt natural;
- whether the banter was actually enjoyable;
- whether you wanted the second picture after seeing the first;
- whether the prints felt like satisfying residue or contrived payoff;
- where attention dropped, if it did.

Basic runtime, duplicate-input, route, UI-scale and first-pass-comprehension checks are handled internally.
