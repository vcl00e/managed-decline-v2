# Narrative Interaction Lab v009 — Two Pictures

**Status:** pre-external candidate; must pass interaction, comprehension, recovered-UX and rendered-client gates before playtest

**Runtime:** harness v002 reliable engine/contract/trace layer

**Player-facing shell:** harness v003 recovered presentation; v009 must not modify it

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

The interaction should shift from Tabitha initially holding the camera to genuinely shared authorship. By the second picture, the player is able to direct Tabitha and she reacts to that direction.

### Payoff / residue

Two prints exist in the world. Their captions/content reflect the chosen poses and order. The ending records who keeps which print; this is residue, not a relationship reward screen.

## First-pass comprehension requirement

A cold reader must be able to answer after one read:

1. What is happening? — Two people have an instant camera with two shots.
2. What does Tabitha want? — To use it together / tease the player with a photo.
3. What can the player do? — Accept, reverse the order, direct the photo, react, and decide what happens to the prints.
4. What changed? — Two specific photos now exist and their ownership is decided.

Failure on any of these blocks implementation/external playtest.
