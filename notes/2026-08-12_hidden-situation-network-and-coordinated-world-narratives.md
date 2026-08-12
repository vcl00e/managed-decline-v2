# Hidden Situation Network and Coordinated World Narratives

**Date:** 2026-08-12

## Decision

Managed Decline should use a shared hidden **situation network** as a core narrative/simulation layer.

The stock-market discussion exposed a broader architectural idea: NPC stories, behaviours, environmental changes, headlines, institutions, politics, prices and other systems should not generally be scripted as independent reactions to one another. They should instead observe and respond to the same underlying situations from different positions and with different information.

The objective is not to simulate Britain in exhaustive detail. The objective is to create a relatively small causal system that produces **cohesive comedy, recognisable consequences, replayable perspectives and a sense that the world has history**.

The stock market should be treated as only one downstream consumer of this system.

---

## Core principle: one hidden reality, many experiences of it

A situation creates or changes game-world facts. Different parts of the game then interpret those facts according to their role.

For example, a council outsourcing programme might simultaneously produce:

- changes to council-worker schedules and moods;
- consultants appearing in an office;
- union activity;
- residents experiencing service disruption;
- official notices describing a “modernisation programme”;
- hostile or supportive newspaper framing;
- environmental consequences such as rubbish accumulating;
- altered business costs;
- political pressure;
- movement in the contractor's fictional share price.

None of these systems should need to tell the others what to do directly. They subscribe to the same underlying situation state.

This lets the player encounter the same narrative through radically different routes: walking through a neighbourhood, knowing an affected NPC, working in an institution, reading the news, following social media, noticing changed routines, or seeing an investment move unexpectedly.

The comedy comes from the **coordination and contradiction** between these views rather than from a narrator explaining the joke.

---

## Situations, not isolated events

The basic simulation unit should usually be a **situation**, not a one-shot event.

An event such as “the council outsources waste collection” is too narrow. A situation such as **Waste Service Reform** can persist over time and contain:

- causes and pressures;
- actors and stakeholders;
- current stage;
- hidden facts;
- public awareness;
- rumours and beliefs;
- institutional responses;
- consequences;
- links to other situations;
- possible trajectories and outcomes.

A situation might move through stages such as:

**Pressure → Proposal → Rumour → Contest → Decision → Rollout → Consequences → Response → Aftermath**

Not every situation needs every stage, and these stages should not imply a fixed quest chain. Stages can branch, stall, reverse, skip or be modified by other situations.

The player may discover a situation at any point. Someone who sees the early rumours has a different experience from someone who encounters only the consequences weeks later.

---

## Situations should form a network

Hidden situations should not normally exist as sealed quest bubbles. They can interact in three simple ways:

### 1. Cause

One situation can create another.

Examples:

- major employer closure → local retail decline;
- retail decline → regeneration programme;
- regeneration programme → property speculation;
- property speculation → rent pressure.

This allows the world to develop history without requiring an explicit scripted mega-quest.

### 2. Influence

One situation can modify the state or trajectory of another.

Examples:

- national immigration restrictions increase recruitment difficulty in an existing hospital staffing crisis;
- a worsening council budget increases pressure to outsource services;
- a flood diverts staff and money, worsening an unrelated inspection backlog.

The source situation does not have to “own” the target story. It simply changes the pressures under which it evolves.

### 3. Context

Some situations alter how actors interpret or respond to another situation without directly causing it.

Examples:

- an approaching election makes councillors more sensitive to a waste crisis;
- a recent scandal makes journalists more suspicious of a new procurement programme;
- an ongoing cost-of-living crisis changes how residents respond to a rent increase.

These three relationship types should be enough for an initial implementation. Avoid a giant unconstrained causal AI.

---

## Shared pressures reduce connection complexity

Not every situation needs explicit links to every other situation. A small set of shared pressure variables can provide indirect coupling.

Possible pressures include:

- public anger;
- council budget;
- housing pressure;
- institutional capacity;
- political pressure;
- local economic health;
- consumer confidence;
- employment security;
- community cohesion;
- infrastructure quality;
- energy pressure;
- social unrest.

Situations modify relevant pressures; other situations read them.

Example:

**Waste crisis → public anger rises → election volatility rises → councillors become more risk-averse → controversial housing decision is delayed.**

There is no need for a special rule saying that a waste crisis delays a housing project. The relationship emerges through shared pressure.

This should be used conservatively. The aim is comprehensible emergent causality, not maximum interconnectedness.

---

## Bounded propagation is essential

A major failure mode would be making every situation affect everything.

Each situation should declare a limited set of domains, stakeholders and geographic/institutional scope, for example:

- housing;
- council;
- neighbourhood;
- employment;
- health;
- transport;
- education;
- policing;
- media;
- finance.

Situations interact strongly within their relevant domains, may weakly influence adjacent domains through shared pressures, and normally ignore unrelated systems.

Likewise, not every situation deserves full-world presentation.

Possible propagation scales:

- **personal:** affects one or a few people;
- **social/group:** affects a friendship group, workplace or family;
- **local:** affects a neighbourhood or institution;
- **citywide:** affects many routines and services;
- **national:** can alter politics, prices, employment and headlines.

A breakup should normally remain a personal story. A transport strike should visibly alter large parts of the city.

This prevents the world from feeling like every person and institution is mysteriously revolving around the same handful of plot points.

---

## Separate reality, knowledge and public narrative

A central mechanic should distinguish between:

- **actual state:** what is really true in the simulation;
- **belief state:** what a particular NPC or group believes;
- **public state:** what has been announced or widely reported;
- **rumour state:** claims circulating without confirmation.

This supports situations that are:

- true but unknown;
- false but widely believed;
- true and leaked;
- publicly announced but misunderstood;
- old news to insiders but new to the public;
- deliberately or accidentally misrepresented.

This distinction is valuable for comedy and for player reasoning.

Example:

The council has not formally decided to close a library. Residents believe closure is certain. A campaign starts. The council states that “no decision has been taken.” The player later notices removal boxes already being delivered. The council insists that purchasing boxes should not be interpreted as prejudging the consultation.

The humour comes from conflicting states and incentives, not from a game-authored punchline explaining that bureaucracy is absurd.

---

## Different actors should have different partial views

NPCs and institutions should not receive omniscient situation data.

Information should be exposed according to position and relationships.

For the same procurement situation:

- a journalist may know an announcement is imminent;
- a civil servant may know redundancies are being prepared;
- a consultant may know a contract is close;
- a union representative may only know management requested an unusual meeting;
- a resident may notice surveyors appearing;
- a finance NPC may know that investors already expect the outcome.

No single character needs to provide the “correct answer.” The player can triangulate.

NPC behaviour should be a source of information as well as dialogue. Changed work hours, cancelled plans, unusual visitors, missing staff, protests, queues, environmental changes and altered routines can all reveal situation state indirectly.

This supports one of the desired player skills for Managed Decline: **reading society**.

---

## Character stories belong inside the same network

There should not be a hard separation between “world simulation” and “character arcs.”

Personal situations can reference institutional situations and vice versa.

Example:

An NPC's mother is waiting for an operation. The personal situation references an existing hospital-capacity situation. A national healthcare decision changes hospital staffing; this affects the mother's treatment; that changes the NPC's stress, work attendance, relationship availability, finances and dialogue.

The political event therefore produces an emotional consequence without forcing a political conversation.

Causality can also flow upward.

A minor personal incident may become a local scandal if it is filmed, shared, picked up by a journalist and amplified by politicians. A personal situation can therefore become a public situation when the relevant conditions exist.

---

## Simulation determines circumstance; authored systems determine expression

Managed Decline should **not** dynamically generate every part of a story.

The simulation is good for determining:

- what is happening;
- who is affected;
- who knows;
- who cares;
- what changed;
- what pressures are rising or falling;
- which authored narrative material has become relevant.

Authored character/narrative systems should determine how those facts are expressed entertainingly.

A useful high-level pipeline is:

**Situation state → affected character/institution → emotional or strategic response → authored scene/behaviour/line family → contextual realisation**

This preserves authored comedy, character voice and quality control while still allowing the world to combine material in novel contexts.

The system should avoid an unconstrained LLM inventing causal facts that do not exist in the game state.

---

## The world should tell stories through more than conversation

One purpose of the situation network is to prevent emergent narrative from collapsing into NPC chat.

A situation can manifest through:

- NPC schedules and destinations;
- absences and changed routines;
- crowds and queues;
- environmental deterioration or improvement;
- construction and roadworks;
- shops opening or closing;
- protests and posters;
- notices and letters;
- social-media posts;
- headlines;
- emails;
- institutional language;
- prices and bills;
- employment changes;
- clothing/status changes;
- police/security presence;
- relationships and social-group behaviour;
- stock prices where economically relevant.

This makes walking around and observing the JRPG world narratively meaningful rather than merely a way to move between dialogue scenes.

---

## Cohesive comedy through multiple responses

The strongest comedy often occurs when several systems respond consistently to the same situation but frame it differently.

Example: a council launches an anti-loneliness programme.

Possible coordinated consequences:

- official announcement celebrates a multimillion-pound community initiative;
- an existing community centre closes after losing funding;
- an elderly NPC loses their weekly club;
- a consultant wins a programme contract;
- the council installs a QR-code “community connection point”;
- the QR code fails;
- local media photographs the mayor beside it;
- it is vandalised;
- the council spends heavily replacing it.

No narrator has to explain the satire. The world itself creates the comic contradiction.

The same architecture can support escalating comic situation families: an institution solves a problem, creates a secondary problem, responds to that problem, and eventually declares the original programme a success according to a narrow metric.

These escalation patterns should be authored possibilities, not arbitrary procedural chaos.

---

## False narratives and imperfect causal inference

The game should not always reward the most cynical interpretation or make every apparent causal story true.

Sometimes:

- everyone believes A caused B, while C actually caused B;
- a newspaper misattributes a problem;
- a politician exploits an unrelated failure;
- apparent corruption is genuine;
- apparent corruption is actually spectacular incompetence;
- a widely mocked policy happens to work;
- a supposedly competent institution gets lucky.

This is important both for satire and for player inference. Players should learn to investigate and compare evidence rather than decode a single ideological rulebook.

---

## Stock market as one downstream consumer

A small fictional stock market remains a good fit, but it should consume situation state rather than operate as a separate minigame.

Companies can have hidden sensitivities to a small number of world factors. Market movement can be conceptualised as:

**company exposure × economic effect × surprise/expectation + sector movement + small noise**

The important mechanic is **surprise**. Markets react to the difference between what was expected and what actually happened, not merely to whether a headline sounds positive or negative.

Information can therefore propagate in stages:

**Rumour → development → decision → consequence**

Prices may move before the public headline if the outcome is already widely expected. Once information is obvious to everyone, most of the opportunity should already be gone.

This means profitable investment depends on observing the world, relationships, institutions and indirect signals rather than clicking on obvious headlines.

Not every story should have financial consequences. The market responds only when a situation has an economically meaningful connection.

---

## Save/reload determinism

The hidden situation system should not reroll outcomes when the player reloads.

Use a campaign/world seed and deterministic event/situation randomness. When a situation is instantiated, its relevant stochastic trajectory can be committed early or generated deterministically from values such as:

`campaign_seed + situation_id + stage`

Reloading therefore restores the same underlying world rather than rerolling a stock movement, contract outcome or story branch at the moment the player acts.

This blocks simple “reload until favourable RNG” abuse.

It cannot completely prevent a player from learning future information, reloading an old save and acting on that knowledge. The game should not distort its entire save system to solve this. Instead, reduce the reward for such behaviour through design:

- situations unfold over longer horizons;
- many opportunities and consequences happen simultaneously;
- investments are not instant-resolution bets;
- portfolio changes can be limited to meaningful periodic decisions;
- the profitable skill is a thesis about the world, not guessing a single binary roll.

---

## Player actions feed back into situations

The player should not merely observe procedural scenery.

Player actions can modify the same shared situation state, for example by:

- passing on a rumour;
- exposing or leaking information;
- helping an NPC;
- persuading an actor;
- making a complaint;
- organising an activity or protest;
- sabotaging something;
- choosing not to intervene;
- spending or investing money;
- bringing two characters or institutions into contact.

The result should feed back into the situation network, allowing consequences to appear through other systems later.

This is where the architecture becomes interactive emergent storytelling rather than merely background simulation.

---

## Candidate architecture

At a high level:

```text
                     SHARED WORLD PRESSURES
              economy / politics / services / place
                              ↓ ↑
                       SITUATION NETWORK
                 ↙            ↓            ↘
          institutional      local        personal
            situations     situations    situations
                 ↘            ↓            ↙
                        consequences
                             ↓
       ┌─────────────────────┼─────────────────────┐
       ↓                     ↓                     ↓
      NPCs              environment             media
       ↓                     ↓                     ↓
 behaviour/voice       visible change      framing/rumour
 relationships          routines/place       institutions
       \                     |                     /
        \________________ PLAYER _________________/
                             ↓
                          actions
                             ↓
                       situation network
```

Finance/stock prices, where present, consume economically relevant outputs from the same situation network rather than requiring their own narrative truth.

---

## Definition of a Managed Decline story

This architecture suggests a useful broader definition:

> A story in Managed Decline can be a situation with causes, stakeholders, evolving stages, possible trajectories, incomplete knowledge and persistent consequences that can interact with other situations.

Authored material supplies memorable characters, dialogue, scenes, jokes and dramatic beats.

The simulation determines which material becomes relevant, when it appears, which context surrounds it, what other situations it collides with, and what lasting consequences remain in the world.

Long-running situations should be allowed to leave persistent traces. A playthrough should feel as though it accumulated its own history rather than merely drawing unrelated encounters from a deck.

---

## Scope and implementation discipline

This is a candidate **core design pillar**, but implementation should begin small.

A useful prototype could contain:

- a handful of shared pressure variables;
- a small set of situation domains;
- several staged situation templates;
- cause / influence / context links;
- 10–15 affected NPCs;
- a few environmental manifestations;
- multiple media/institutional framings;
- optionally 5–6 fictional companies consuming economically relevant state.

The key prototype test is not whether the simulation is economically realistic. It is:

> Can players notice that several apparently separate experiences belong to the same evolving situation, infer plausible causes without being explicitly told, and enjoy the resulting comedy and consequences?

If that works, Managed Decline can create the impression of a socially coherent, reactive world with much less complexity than a universal simulation would require.
