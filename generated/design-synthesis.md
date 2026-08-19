# Managed Decline — Generated Design Synthesis

> **AUTO-GENERATED — DO NOT EDIT MANUALLY**
>
> This document is a derived view of the repository's source notes. If it disagrees with the source record, the source record wins. Regenerate this document from the complete current source set rather than patching it by hand.

**Generated:** 2026-08-19  
**Source scope:** all design notes currently under `notes/`. `prototypes/` currently contains no substantive findings.  
**Purpose:** current conceptual model, including accepted design, superseded design, developed directions, and unresolved work.

## Status language

- **Current accepted** — clearly accepted and not superseded.
- **Superseded / subsumed** — earlier accepted design replaced or incorporated by later accepted design.
- **Developed, not clearly accepted** — substantial direction without a clear acceptance signal in the source record.
- **Open** — still requires design or prototype evidence.

---

# 1. Core Direction

## Current accepted / established direction

Managed Decline is a **character-first contemporary British social RPG/comedy** rather than a Westminster or policy-management simulator. The player lives inside modern Britain, forms relationships, develops routines and commitments, notices social and institutional situations, intervenes selectively, and lives with persistent consequences.

The tonal foundation is affectionate social satire rather than simple national pessimism:

- British institutions, incentives, bureaucracy, hypocrisy, class anxiety and everyday dysfunction are major comic engines.
- No ideological faction should receive automatic authorial immunity.
- Characters should remain human rather than function as political mascots.
- Decline should coexist with affection, beauty, community, ordinary kindness and genuinely desirable parts of Britain.
- The implied critical stance is closer to **"this place can be wonderful; why are we accepting this?"** than **"Britain is terrible."**

The latest core-loop pass defines the player fantasy as:

> Observe a changing social world, identify people or situations you care about, choose how and whether to become involved, experience readable consequences, and discover that those consequences have changed your relationships, knowledge, commitments and future possibilities.

Compressed:

> **Notice → Care → Choose → Act → Consequence → Changed possibilities → Notice again.**

The game should therefore reward **reading society**, choosing what matters, and building a distinctive life rather than optimising a conventional stat build.

Sources: [core game loop](../notes/2026-08-19_core-game-loop-desire-formation-and-hook-supply.md), [British social RPG](../notes/2026-08-11_class-of-09-style-british-social-rpg.md), [wealth and social change](../notes/2026-08-11_wealth-and-social-change.md), [market positioning](../notes/2026-08-11_market-opportunity-and-target-audience-research.md).

## Secondary experience target

The game remains single-player, but it should also work unusually well as a **socially played single-player game** over screen share or streaming. Readable choices, strong personalities, incomplete information, emergent consequences and campaign-specific character history should give spectators material to argue about and remember.

Source: [single-player social watchability](../notes/2026-08-12_single-player-social-watchability-streaming-and-screen-share.md).

---

# 2. Experience & Systems

## Core loop and nested loops — Current accepted

The earlier loop:

> Explore diorama → notice something → approach → VN scene → choose/interact → world changes → resume exploration

remains useful, but the latest accepted design explicitly demotes it from the *true* core loop to a **presentation loop**.

The current design operates at three nested scales.

### Interaction loop

Observe/explore → notice a signal → interact → make a social or practical decision → receive an immediate reaction.

### Life/session loop

Decide what matters now → pursue, commit, ignore or withdraw → spend time/social capital → situations develop → experience consequences → reconsider priorities.

### Campaign/meta loop

Live a life → form relationships, routines and projects → gain knowledge and affordances → become embedded in new social worlds → affect people/places/institutions → accumulate campaign history → unlock different future possibilities.

Source: [core game loop](../notes/2026-08-19_core-game-loop-desire-formation-and-hook-supply.md).

## Player verbs — Emerging, not production-ready

The latest pass identifies a likely action vocabulary:

- **Observe** — wander, inspect, read, listen, check the phone.
- **Ask** — question, clarify, confront, gossip.
- **Connect** — visit, message, invite, introduce.
- **Commit** — promise, join, agree, organise, undertake.
- **Intervene** — help, persuade, expose, complain, spend, arrange.
- **Withdraw** — decline, ignore, leave, cancel, distance.
- **Create** — establish routines, organise activities, start projects, bring people together.

This is not yet proven as the final production interaction set.

## Consequence and feedback — Current requirement, implementation open

The game should avoid explicit gamified readouts such as friendship points where qualitative social feedback is more appropriate, but it still needs a legible chain of response:

action → immediate reaction → social consequence → world consequence → later memory → changed possibility.

The major UX challenge is to make consequences **readable without making the simulation feel mechanical or omniscient**.

Source: [core game loop](../notes/2026-08-19_core-game-loop-desire-formation-and-hook-supply.md).

## Hidden situation network — Current accepted

The world should be driven by a shared hidden **situation network** rather than by isolated quest scripts or systems reacting directly to one another.

A situation may create or change underlying facts that are then observed differently by:

- characters;
- workplaces and institutions;
- environmental state;
- news;
- social media;
- prices/economic systems;
- political actors;
- the player.

Situations can **cause**, **influence**, or provide **context** for other situations. Propagation must remain bounded by domain, geography, institution and scale.

The simulation distinguishes:

- actual truth;
- character knowledge;
- character belief;
- public claims;
- rumours.

Different actors receive partial views. The player can therefore learn by triangulating behaviour, environments, messages, institutional language and competing accounts.

Source: [hidden situation network](../notes/2026-08-12_hidden-situation-network-and-coordinated-world-narratives.md).

## Narrative attention and threading — Developed core architecture

The narrative layer should not be an omnipotent drama AI. The intended responsibility split is:

> **The world decides what is true. Characters decide what they want. The player decides what matters. The narrative layer decides which true, relevant possibilities deserve attention now and how they should be presented.**

The proposed pipeline is:

world/character simulation → typed event ledger → story-signal sifter → player-pursuit/thread state → attention governor → opportunity/pressure composer → presentation director → scene/message/montage/environmental presentation → player action → simulation.

This layer may surface, defer, combine, compress or choose presentation for developments. It must not rewrite truth, manufacture hidden facts solely for drama, or reveal knowledge the protagonist does not possess.

Source: [narrative attention](../notes/2026-08-12_narrative-attention-player-evidence-and-personalised-story-control.md).

## Goals and motivation — Current direction

Do not routinely ask the player to declare abstract goals in a menu. Infer **in-game revealed interests and commitments** from repeated voluntary behaviour, while preserving the distinction between:

- fictional character preferences;
- observed human-player engagement with kinds of content.

Player interest can make related opportunities more likely to be surfaced, but the world must still exist independently rather than generating a personalised quest feed.

Sources: [narrative attention](../notes/2026-08-12_narrative-attention-player-evidence-and-personalised-story-control.md), [character personalisation](../notes/2026-08-12_character-personalisation-routines-young-adult-social-life-and-creative-crafts.md), [core game loop](../notes/2026-08-19_core-game-loop-desire-formation-and-hook-supply.md).

## Affordance progression — Current accepted through latest synthesis

Progression is primarily expansion and transformation of the player's **usable social world**, not conventional stat inflation.

Scenarios, relationships and commitments can change access to:

- people;
- groups;
- activities;
- places;
- services;
- institutions;
- transport;
- communication channels;
- routines;
- actions the player understands they can attempt.

Over time the player can move from initial life → social embedding → community/institutional access → wider social access → player-created access.

Source: [scenario identity and affordance progression](../notes/2026-08-18_scenario-identity-replayability-and-affordance-progression.md), reinforced by [core game loop](../notes/2026-08-19_core-game-loop-desire-formation-and-hook-supply.md).

## Diegetic time and routine — Current accepted

Foundation:

> **Diegetic calendar underneath, elastic narrative time above it, and direct gameplay only when the player's attention or agency matters.**

Days, appointments, work shifts, weekends, birthdays, deadlines and travel time are real in the simulation. Ordinary life compresses aggressively.

Routine should be **established interactively and then assumed until something meaningful interrupts it**. Work is a life structure and social ecosystem, not a repetitive job simulator. Missing something should normally produce aftermath because the world continued without the protagonist, not a generic `QUEST FAILED`.

Source: [work, routine and diegetic time](../notes/2026-08-12_work-routine-and-diegetic-time.md).

## Phone and networked life — Developed direction

The diegetic phone is intended as one of the game's core interfaces and as a second social space alongside the physical world.

Priority functions include:

1. DMs and group chats;
2. calls;
3. news/local information;
4. social feed;
5. email;
6. video/content feed.

All should expose or affect the **same underlying world simulation**, not become separate minigames.

Channel identities differ:

- group chat = ambient social pressure, plans and gossip;
- calls = immediate demand for attention;
- email = formal/institutional Britain;
- social media = audience-dependent interpretation, including indifference;
- news/content feeds = competing frames whose visual professionalism does not guarantee truth.

The phone also acts as external social memory through contacts, recent context and relationships.

Sources: [diegetic phone](../notes/2026-08-11_diegetic-phone-social-media-news-bureaucracy-and-dating.md), [NPC overload/social memory](../notes/2026-08-11_managing-npc-overload-and-social-memory.md).

## Scenario architecture — Current accepted

Scenarios should have an **identity envelope**: the invariant material that keeps them recognisable, surrounded by authored variation.

Key classes include:

- signature scenarios;
- major character episodes;
- recurring situation families;
- social activities;
- micro-events;
- ambience.

Signature scenarios preserve landmark premise/dramatic/iconic material while varying routes, relationships, information distribution and consequences. Recurring families preserve mechanism/tone/interaction grammar while varying cast, location, cause, stakes, information and resolution.

The system should remember recent **structural patterns**, not only scenario IDs, so recurring content can avoid repeating the same solution rhythm.

The useful distinction is:

- **Landmark content** — designed to be remembered.
- **Connective content** — variable life that makes landmarks arrive naturally.

Source: [scenario identity](../notes/2026-08-18_scenario-identity-replayability-and-affordance-progression.md).

---

# 3. World & Situations

## Physical world: dense diorama Britain — Established direction

The physical world should feel like a **beautiful miniature/model-set Britain that the player can walk through**, not a large literal city simulation.

Important qualities:

- compact, dense areas rather than long empty traversal;
- a slightly elevated fixed or semi-fixed camera;
- orthographic or near-orthographic presentation is a strong candidate;
- exaggerated building proportions and model-like scenic composition;
- changing characters, props, lighting and environmental details communicate story state;
- walking exists for spatial memory, anticipation, pacing, discovery and player-authored encounter order.

The diorama is therefore both **world navigation** and **visual pleasure**.

Source: [JRPG diorama exploration](../notes/2026-08-11_jrpg-diorama-exploration-goals-and-emergent-cutscenes.md).

## Britain should contain beauty as well as decline — Developed direction

The world should show ordinary and beautiful Britain from the beginning: parks, coast, canals, pubs, old architecture, gardens, museums, local traditions, community events and people being decent to one another.

Economic or social mobility can reveal additional Britains rather than simply making the game nicer. Wealth should change social access, relationships and assumptions, opening different ecosystems while preserving the central social premise.

Source: [wealth and social change](../notes/2026-08-11_wealth-and-social-change.md).

## Situations live in the world, not in quest bubbles — Current accepted

Situation state should appear through:

- altered NPC routines;
- absent or newly present people;
- environmental change;
- queues and service disruption;
- notices and documents;
- local media;
- group chats;
- rumours;
- prices;
- institutional behaviour;
- player access.

The same underlying situation may therefore be discovered from several routes and at different stages.

Source: [hidden situation network](../notes/2026-08-12_hidden-situation-network-and-coordinated-world-narratives.md).

## Personal places and home — Developed direction

The player should gradually acquire places that feel like **their** pub, café, park, takeaway, library, club or habitual route. These locations become narrative infrastructure because characters can find the player there, routines can be interrupted there, and changes to the place can matter personally.

The home should be a constrained persistent reflection of the player's life rather than a freeform building simulator. A small number of meaningful state-driven changes, gifts, possessions, relationships and living arrangements are preferred to a huge furniture catalogue.

Sources: [character personalisation](../notes/2026-08-12_character-personalisation-routines-young-adult-social-life-and-creative-crafts.md), [pets/home/wardrobe](../notes/2026-08-11_pets-home-wardrobe-and-lifestyle-state.md).

## Online spaces can function as places — Developed direction

A voice call/community can be treated narratively like another location: the player joins, people come and go, plans form, gossip spreads and relationships develop. Online friendship should not automatically be framed as inferior to physical friendship.

Source: [online friends and digital social life](../notes/2026-08-12_online-friends-gaming-and-digital-social-life.md).

---

# 4. Characters & Performance

## Character model — Current accepted

Important characters are:

> **Strong authored identity + small behavioural policies + bounded autobiographical memory + bounded social graph + slow adaptive growth.**

The game should not attempt a full psychological simulation.

Stable and changing layers are kept separate:

- character spine;
- behavioural style;
- voice;
- beliefs;
- relationships;
- arc state;
- current concerns;
- emotion;
- working memory.

A compact character spine uses wants, fears, values, contradictions, coping strategies and social effects. Behaviour is expressed through recognisable policies rather than dozens of opaque sliders.

Source: [character model](../notes/2026-08-12_character-model-personality-memory-relationships-and-growth.md).

## Dialogue control — Established direction

The simulation should operate through a constrained semantic/control vocabulary. Surface prose is a separate realisation layer.

Canonical facts, actions, secrets and relationship events must remain outside unrestricted model control. The LLM may help select intent or realise bounded language, but **arbitrary generated strings should not own canonical game state**.

Sources: [LLM-safe conversations](../notes/2026-08-11_llm-safe-emergent-npc-conversations.md), [character model](../notes/2026-08-12_character-model-personality-memory-relationships-and-growth.md).

## Large cast, small active social set — Developed direction

The total world can contain many people while the player's current working set remains small.

Useful cast tiers:

- core cast;
- recurring locals;
- story/support characters;
- ambient population.

Characters should enter memory through relationship and role, not just names. Reappearances should provide lightweight reminders. Strong silhouette, hairstyle, clothing, posture, accessories, voice and usual context support recognition.

The narrative scheduler should avoid activating too many socially significant NPCs simultaneously.

Source: [NPC overload and social memory](../notes/2026-08-11_managing-npc-overload-and-social-memory.md).

## Tabitha / the public-symbol character — Accepted character direction

Tabitha Mercer is developed as an original character inspired by the cultural phenomenon around an institutional extremism-awareness character, not as a copied character asset.

The important dramatic idea is:

- she has become a public/political symbol;
- institutions, supporters and opponents construct incompatible versions of her;
- the actual person is more complicated than any of those versions;
- a relationship with her asks whether the player can know someone after public discourse has turned them into a symbol.

Later scenario work treats the associated Community Compass material as a likely signature scenario with a strong identity envelope.

The source notes repeatedly caution against copying protected character expression or relying on a casual parody defence; commercial release should receive specialist legal review.

Sources: [Amelia reference / Tabitha](../notes/2026-08-11_amelia-reference-in-game.md), [scenario identity](../notes/2026-08-18_scenario-identity-replayability-and-affordance-progression.md).

## Player avatar — Developed, not clearly accepted

A promising direction is a modular world avatar whose primary jobs are:

- recognition;
- self-expression;
- social signalling;
- physical comedy;
- continuity across scenes/photos/events;
- low production multiplication.

A **faceless world avatar** is specifically explored: hair, silhouette, clothing, posture, accessories and animation carry identity, while NPC portraits and dialogue choices carry facial/emotional acting in VN scenes.

The source proposes qualitative height/build bands and a rigged paper-doll approach rather than arbitrary image stretching.

Source: [character personalisation](../notes/2026-08-12_character-personalisation-routines-young-adult-social-life-and-creative-crafts.md).

---

# 5. Visual Language

## Established visual foundation

The clearest current visual identity is the combination of:

- miniature/diorama physical spaces;
- curated scenic composition;
- compact 3D navigation;
- 2D/VN character presentation for dialogue;
- visually distinctive characters;
- persistent environmental state.

The diorama should feel deliberately model-like rather than merely like a low-cost 3D town.

Source: [JRPG diorama exploration](../notes/2026-08-11_jrpg-diorama-exploration-goals-and-emergent-cutscenes.md).

## Character readability

With a large cast, recognition at a glance is more important than realistic homogeneity. Important characters should have stable visual bundles of silhouette, hairstyle, clothing archetype, posture and accessories.

Source: [NPC overload and social memory](../notes/2026-08-11_managing-npc-overload-and-social-memory.md).

## Lifestyle as visual state

Wardrobe, home, possessions and potentially pets should represent social and personal state without turning into life-sim maintenance systems.

Wardrobe is especially valuable because clothes can communicate class, subculture, occupation, aspiration and deliberate ridiculousness while producing social reactions.

Source: [pets/home/wardrobe](../notes/2026-08-11_pets-home-wardrobe-and-lifestyle-state.md).

## Open visual-development area

The current notes do **not yet establish a consolidated accepted specification** for:

- the final 2D character rendering style;
- expression sets;
- pose grammar;
- micro-animation language;
- exact transition between diorama characters and VN presentation;
- production rules for keeping those assets coherent at scale.

These should remain visible as an active design route rather than being inferred from unrelated notes.

---

# 6. Audio & Music

## Character voice system — Current accepted

Managed Decline should not currently depend on conventional full-dialogue TTS for main characters.

The accepted direction is a stylised system using:

- pre-generated pseudo-English performances;
- non-linguistic vocalisations;
- occasional recognisable English words/phrases;
- metadata-driven performance reservoirs;
- repetition avoidance/cooldowns.

Text carries exact lexical meaning while audio carries speaker identity, prosody, mood, intensity, rhythm and comic timing.

Character voices should be **original synthetic voice designs based on abstract specifications**, not clones of identifiable real people.

Source: [offline TTS and synthetic voices](../notes/2026-08-12_offline-tts-pseudo-english-and-original-synthetic-character-voices.md).

## Diegetic synthetic speech — Current accepted

Conventional synthetic TTS is useful where artificiality is appropriate or funny:

- council phone systems;
- railway announcements;
- self-checkouts;
- automated customer service;
- voicemail;
- satnav;
- spam;
- corporate training;
- internet rubbish;
- PA/radio background material.

Source: [offline TTS and synthetic voices](../notes/2026-08-12_offline-tts-pseudo-english-and-original-synthetic-character-voices.md).

## Music — Open design route

Current notes provide only limited music-system direction. Scenario design establishes that a **distinctive music cue can be part of a scenario's sensory/iconic identity**, but the repository does not yet contain an accepted overall music language or album-design system.

Open work includes:

- musical palette and references;
- character/place/scenario motifs;
- whether music reacts systemically to world state;
- how music supports recovery, tension and ordinary life;
- album artwork and sequencing;
- relationship between in-game score and a standalone album identity.

Source: [scenario identity](../notes/2026-08-18_scenario-identity-replayability-and-affordance-progression.md).

---

# 7. Identity & Presentation

## Market-facing identity — Developed direction

Do not lead with **"British political simulator"**.

The stronger identity is:

> a funny, character-first game about ordinary life in contemporary Britain, where society is fraying around you, relationships matter, and the town remembers what you do.

British specificity is an asset rather than something to sand away. Politics and institutions are sources of circumstances, not the sole genre proposition.

Source: [market opportunity and target audience](../notes/2026-08-11_market-opportunity-and-target-audience-research.md).

## Clip and social readability — Developed direction

Scenes and choices should frequently be understandable enough to produce short memorable comedy clips. Streaming/screen-share play benefits from:

- concise readable choice shapes;
- purposeful dialogue;
- strong character reactions;
- visible consequences;
- enough pause for spectators to discuss decisions;
- campaign-specific stories viewers can compare.

Sources: [market opportunity](../notes/2026-08-11_market-opportunity-and-target-audience-research.md), [single-player social watchability](../notes/2026-08-12_single-player-social-watchability-streaming-and-screen-share.md).

## Album / broader graphic identity — Open

The current note set does not yet establish a consolidated accepted direction for:

- album art;
- logo/title treatment;
- key art;
- soundtrack packaging;
- broader graphic system beyond the diegetic phone/institutional interfaces discussed in system notes.

---

# 8. Cross-System Concepts

These concepts are intentionally repeated across disciplinary boundaries because their value lies in connecting systems.

## One reality, many representations

A single hidden situation should be capable of appearing as:

- NPC behaviour;
- altered routines;
- a changed diorama;
- a group-chat rumour;
- an official email;
- a headline;
- a price or economic consequence;
- a relationship problem;
- an institutional response.

The player reconstructs reality from these representations rather than receiving an omniscient quest explanation.

Sources: [hidden situation network](../notes/2026-08-12_hidden-situation-network-and-coordinated-world-narratives.md), [diegetic phone](../notes/2026-08-11_diegetic-phone-social-media-news-bureaucracy-and-dating.md).

## World continuity rather than protagonist waiting rooms

Diegetic time, routines, phone communication, situation progression and narrative attention all support the same principle:

> **The world continues without the player.**

Ignoring or missing something is therefore often a meaningful choice that creates aftermath rather than a failure screen.

Sources: [work and diegetic time](../notes/2026-08-12_work-routine-and-diegetic-time.md), [core game loop](../notes/2026-08-19_core-game-loop-desire-formation-and-hook-supply.md).

## Identity through use

Customisation is most valuable when the simulation can notice it and other characters can react to it.

This applies across:

- wardrobe;
- home;
- favourite places;
- routines;
- phone/digital identity;
- hobbies and creative expression;
- pets;
- possessions;
- social relationships.

The common rule is to prefer **meaningful state with narrative consequences** over large catalogues or maintenance meters.

Sources: [character personalisation](../notes/2026-08-12_character-personalisation-routines-young-adult-social-life-and-creative-crafts.md), [pets/home/wardrobe](../notes/2026-08-11_pets-home-wardrobe-and-lifestyle-state.md).

## Affordance progression connects story and RPG progression

A relationship, scenario or recurring activity can simultaneously:

- tell a story;
- establish a routine;
- introduce a place;
- create a social group;
- teach the player an action they can attempt;
- unlock new future situations.

This allows narrative participation itself to function as RPG progression.

Sources: [scenario identity and affordance progression](../notes/2026-08-18_scenario-identity-replayability-and-affordance-progression.md), [core game loop](../notes/2026-08-19_core-game-loop-desire-formation-and-hook-supply.md).

## Comedy through incompatible frames

A recurring Managed Decline mechanism is the contrast between:

- official institutional language;
- private knowledge;
- public narrative;
- online interpretation;
- lived physical reality.

No one channel should simply be designated "the truthful one". The humour and player skill come from learning why each account looks the way it does.

Sources: [hidden situation network](../notes/2026-08-12_hidden-situation-network-and-coordinated-world-narratives.md), [diegetic phone](../notes/2026-08-11_diegetic-phone-social-media-news-bureaucracy-and-dating.md).

## Scenario identity crosses disciplines

A signature scenario's identity envelope can include:

- premise;
- dramatic pressures;
- mechanical reasoning;
- character relationships;
- visual locations/props;
- interface/document motifs;
- music cues;
- thematic questions.

This is exactly the kind of concept that should not be forced into only a writing, map, character-art or music category.

Source: [scenario identity](../notes/2026-08-18_scenario-identity-replayability-and-affordance-progression.md).

---

# 9. Decisions & Canon

## Current accepted decisions with clear source signals

| Decision | Current state | Source |
|---|---|---|
| Shared hidden situation network is a core narrative/simulation layer. | **Current accepted** | [Hidden Situation Network](../notes/2026-08-12_hidden-situation-network-and-coordinated-world-narratives.md) |
| Important characters use strong authored identity plus bounded adaptive state/memory/social graph. | **Current accepted** | [Character Model](../notes/2026-08-12_character-model-personality-memory-relationships-and-growth.md) |
| Time is diegetic underneath elastic narrative compression; routine should not become busywork. | **Current accepted** | [Work, Routine and Diegetic Time](../notes/2026-08-12_work-routine-and-diegetic-time.md) |
| Main-character voice direction uses stylised pseudo-English/original synthetic performances rather than conventional full-dialogue TTS. | **Current accepted** | [Offline TTS and Voices](../notes/2026-08-12_offline-tts-pseudo-english-and-original-synthetic-character-voices.md) |
| Scenarios preserve recognisable identity through identity envelopes and structured variation. | **Current accepted** | [Scenario Identity](../notes/2026-08-18_scenario-identity-replayability-and-affordance-progression.md) |
| Current core loop is Notice → Care → Choose → Act → Consequence → Changed possibilities → Notice again. | **Current accepted design direction** | [Core Game Loop](../notes/2026-08-19_core-game-loop-desire-formation-and-hook-supply.md) |

## Explicit supersession / reinterpretation

### Earlier exploration/VN loop

**Earlier accepted form:** explore diorama → notice → approach → VN scene → choose → world-state change → resume exploration.

**Current interpretation:** still valid as a presentation/interaction loop, but **subsumed** by the broader social-life core loop above.

Source: [core game loop](../notes/2026-08-19_core-game-loop-desire-formation-and-hook-supply.md), referring back to [JRPG diorama exploration](../notes/2026-08-11_jrpg-diorama-exploration-goals-and-emergent-cutscenes.md).

## No contradiction silently resolved

This generated pass does not intentionally reconcile conflicting accepted designs. Where a design is substantial but lacks a clear acceptance signal in the source excerpt, it is described as developed rather than promoted to canon.

---

# 10. Open Questions / Unresolved

## Highest-priority gameplay validation

The latest accepted core-loop pass identifies these as the main production gaps:

- final recurring player-verb vocabulary;
- immediate feedback grammar;
- cadence of meaningful decisions;
- onboarding;
- cognitive readability;
- whether the 10–30 minute moment-to-moment experience is actually fun.

A core-loop prototype is the clearest next validation step.

Source: [core game loop](../notes/2026-08-19_core-game-loop-desire-formation-and-hook-supply.md).

## Narrative-system implementation

The situation network, event ledger, sifter, pursuit model, attention governor and presentation director are conceptually coherent but collectively ambitious. They need implementation boundaries, instrumentation and prototype tests that prove they remain comprehensible and do not become an opaque "narrative AI".

Sources: [narrative attention](../notes/2026-08-12_narrative-attention-player-evidence-and-personalised-story-control.md), [hidden situation network](../notes/2026-08-12_hidden-situation-network-and-coordinated-world-narratives.md).

## Voice endurance

Pseudo-English has an accepted conceptual direction but still needs a listening prototype to establish whether it remains pleasant and expressive across long dialogue-heavy sessions.

Source: [offline TTS and voices](../notes/2026-08-12_offline-tts-pseudo-english-and-original-synthetic-character-voices.md).

## 2D character art and micro-animation

Still requires a consolidated accepted specification for:

- portrait style;
- expression vocabulary;
- pose vocabulary;
- micro-animation;
- animation degradation/variation rules if any;
- diorama-to-VN continuity;
- scalable asset-production constraints.

## Music and album design

Still requires a dedicated pass covering:

- score identity;
- instrumentation;
- motifs;
- adaptive behaviour;
- scenario/character/place cues;
- soundtrack album sequencing;
- album artwork/graphic identity.

## Diorama production pipeline

The aesthetic direction is strong, but production still needs explicit rules for:

- modularity;
- camera/framing constraints;
- AI-assisted asset generation;
- consistency/quality control;
- environmental state variants;
- navigation/collision;
- how many unique locations are economically sustainable.

Source: [JRPG diorama exploration](../notes/2026-08-11_jrpg-diorama-exploration-goals-and-emergent-cutscenes.md).

## Player avatar

The faceless modular avatar is a developed direction rather than clearly established canon. It needs a deliberate decision and visual prototype.

Source: [character personalisation](../notes/2026-08-12_character-personalisation-routines-young-adult-social-life-and-creative-crafts.md).

## Wealth as structural turn

Wealth/social mobility is a strong developed concept, but the source set does not clearly establish whether a major wealth transition is mandatory campaign structure, one possible trajectory, or a family of scenario outcomes.

Source: [wealth and social change](../notes/2026-08-11_wealth-and-social-change.md).

## Legal review

The project deliberately touches politics, identity, satire and recognisable cultural phenomena. The notes develop practical risk-reduction rules, but a commercial release should still receive specialist legal review rather than treating design discussion as legal clearance.

Sources: [British social RPG](../notes/2026-08-11_class-of-09-style-british-social-rpg.md), [Amelia reference / Tabitha](../notes/2026-08-11_amelia-reference-in-game.md).
