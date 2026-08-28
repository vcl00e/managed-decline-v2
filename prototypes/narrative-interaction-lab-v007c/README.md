# Narrative Interaction Lab v007c — Friday Night, Substantive Social Routes

**Status:** design / delta specification — not playtest-ready

**Process:** governed by [`../REGRESSION-POLICY.md`](../REGRESSION-POLICY.md) and [`../EXPERIENCE-VALUE-POLICY.md`](../EXPERIENCE-VALUE-POLICY.md)

## Baseline

V007c is a targeted correction of the v007/v007b Friday-night experiment.

The player-facing baseline combines:

- **v006b accepted interaction grammar:** compact lived space, elastic meaningful time, contextual low-burden map UI, socially permeable situations, meaningful positioning, focused VN for high-bandwidth conversation, valid non-intervention;
- **v007 useful evidence:** the compact community-hall / forecourt / side-yard layout was positively received as simple and elegant; one-to-one and 2–4-person gatherings remain desirable social scales;
- **v007b useful correction:** the player must control social bandwidth; groups are possibilities rather than a required sampler; no dashboard; no invisible group railway; Priya can self-settle; meaningful choices need prompt visible acknowledgement;
- **v007b failed external finding:** route freedom is worthless when the route itself is nearly empty. A major one-to-one path must provide a substantial character experience rather than merely suppress group content.

The central correction is:

> **Preserve v007b's social freedom, but fund every promoted social mode with experience worth choosing.**

## New question / hypothesis

Primary question:

> **Can one continuous ordinary evening support both substantial one-to-one character time and optional small-group social life, with the player choosing the social texture while each route remains narratively worthwhile?**

Secondary question:

> **Can spatial behaviour carry sustained social intention between meaningful beats, reducing low-value confirmation prompts while allowing focused VN dialogue to appear when the chosen relationship actually warrants it?**

Accumulated character interpretation and audience/provenance remain secondary evidence layers. They must not displace the immediate quality of the evening.

## Inherited accepted constraints

These are not being reopened.

### Narrative-first interaction

- the narrative / characters remain the primary experience;
- high-value focused conversation is retained when warranted;
- map interaction exists to make the narrative inhabitable and socially spatial, not to replace meaningful scenes with empty wandering;
- ordinary companionship must not collapse into lack of experience;
- pressure is occasional texture, not the main engine of the evening.

### Social bandwidth freedom

- one-to-one, small-group, observation and leaving are all valid approaches;
- no group scene is required before one-to-one content;
- no one-to-one route is required before group content;
- the player may leave any social configuration rather than exhaust its authored material;
- the world continues without protagonist management;
- Priya can settle without being collected.

### Low-friction map UI

- no permanent side dashboard;
- no scrolling event/room-tone log;
- no permanent action list;
- no visible developer-state panel;
- the map is the dominant visual field;
- contextual prompts, transient notices and ambient speech only;
- development telemetry remains hidden/exportable.

### Elastic meaningful time

- no fixed invisible master timer;
- meaningful presence can remain live;
- genuinely empty intervals compress;
- no route waits for a timestamp simply to unlock authored content.

### Choice feedback

- situationally meaningful choices receive a local observable shadow;
- important later consequences may remain delayed;
- choices must not mainly write hidden tags.

## Deliberate re-tests / overrides

No accepted v006b/v007b UI, elasticity or social-permeability rule is deliberately reopened.

V007c deliberately corrects one v007b implementation assumption:

> **A quiet/low-pressure route does not need much authored material.**

That assumption is rejected.

V007c tests whether a one-to-one route can remain calm and voluntary while still receiving high narrative bandwidth when the player demonstrates strong interest in that character.

## New-domain freedoms

The following may be redesigned inside the established Friday-night domain:

- the specific Tabitha one-to-one scene sequence;
- how prolonged proximity/remaining with somebody carries intention;
- shared environmental/physical micro-activities during companionship;
- the timing and content of private VN transitions;
- how private motifs become later callbacks or arrangements;
- route-specific payoffs.

## Not being tested

Do not add or redesign:

- free-text dialogue;
- phone/asynchronous systems;
- large crowd simulation;
- procedural gossip networks;
- relationship meters;
- complex inventory/resource mechanics;
- task/objective UI;
- LLM-owned canonical state;
- campaign-scale exploration;
- crisis-heavy scenario structure.

# Experience Contracts

## Experience Contract A — Tabitha one-to-one evening

### Player desire

> **I want to spend meaningful time with Tabitha rather than consume the group activity.**

### Intended value

This route must provide a real character experience containing a coherent combination of:

- private humour and chemistry;
- character discovery;
- a sense of mutual attention;
- self-expression / how the player responds to Tabitha;
- at least one shared observation or small activity grounded in the place;
- a conversational development rather than static small talk;
- at least one meaningful/revealing choice with local acknowledgement;
- a concrete interpersonal payoff or new arrangement;
- a satisfying transition out of the route, whether into more time together, the group or leaving.

### Narrative / interaction bandwidth

The route should rise and fall rather than remain one continuous VN.

Target shape:

```text
ARRIVE TOGETHER
        ↓
short focused opening
        ↓
PLAYER REMAINS WITH TABITHA
(map position now carries the intention)
        ↓
LIGHT LIVED COMPANIONSHIP
shared noticeboard / overheard radio / small physical joke
        ↓
FOCUSED PRIVATE CONVERSATION
substantive enough to justify VN
        ↓
RETURN TO MAP WITH CHANGED CONTEXT
new private motif / knowledge / plan
        ↓
OPTIONAL SECOND BEAT OR NATURAL EXIT
walk together / go inside together / remain / split up
```

Do **not** implement this as repeated `stay here` confirmations.

### Content requirement

The route must contain at minimum:

1. a meaningful opening interaction;
2. one substantive private VN scene with actual development, not two lines plus a choice;
3. one shared environmental or physical micro-activity/observation whose meaning comes from doing it together;
4. a second interpersonal beat that incorporates what happened earlier;
5. a payoff that changes the immediate/future social state.

This is not a line-count quota. These five functions must be experientially present.

### Route development

The one-to-one route should move from **arriving together** to **having created something specific between you during this evening**.

Candidate private motif for the prototype:

> The hall is full of over-serious laminated community notices. Tabitha and the player begin privately ranking / photographing the worst ones, turning an initially incidental joke into a shared bit. That opens a more meaningful conversation about why Tabitha likes people but often wants social life in smaller doses, and whether the two of them need an organised reason to spend time together.

This is intentionally low-pressure. The meaningful development is not a crisis. It is that ordinary company becomes more particular.

Possible payoff:

- a concrete future quiet plan (breakfast / walk / another place) becomes available;
- a private joke/motif persists;
- Tabitha later references how the player handled the conversation;
- if the player subsequently joins the group, their earlier private context changes the group experience rather than being erased.

## Experience Contract B — Small-group radio route

### Player desire

> **I want to be around several people, enjoy their chemistry, and participate without having to drive every conversation.**

### Intended value

- NPC-to-NPC banter;
- player can join, listen or leave;
- at least one group choice where audience genuinely changes meaning;
- social chemistry rather than a queue of NPC-to-player dialogue;
- a concrete social payoff such as being included in a later continuation / new connection;
- no requirement to consume every group beat.

### Bandwidth

Mostly lived-space + ambient dialogue, with focused VN only for a group exchange that is semantically dense enough to justify it.

## Experience Contract C — Priya-selective one-to-one route

### Player desire

> **I am interested in Priya but not necessarily the radio crowd.**

### Intended value

This route can be shorter than the Tabitha route because Priya arrives later, but it must still contain:

- meaningful private interaction;
- some character discovery or chemistry;
- a concrete plan/possibility or changed relationship context;
- no requirement to join the radio group.

## Experience Contract D — Observer / low-intervention route

### Player desire

> **I want to inhabit the evening, listen, notice and move without constantly choosing dialogue.**

### Intended value

Observation must contain actual material to observe:

- NPC-to-NPC exchanges;
- changes in who is where;
- readable social rhythms;
- environmental humour/details;
- opportunities that can be ignored without deadlock;
- a satisfying ability to leave or later approach something that became interesting.

Observer play must not be an empty time-skip route.

# One-to-one content design — Tabitha

The private route will use the existing hall rather than invent a separate minigame.

## Beat 1 — Outside the hall

Short focused arrival scene.

If the player signals that they want to stay outside, this establishes sustained `with_tabitha` intention.

The game then stops asking the player to reconfirm staying until circumstances change.

## Beat 2 — The noticeboard

While the pair remain together, Tabitha notices a badly curated community noticeboard / laminated council material near the forecourt.

This is a lightweight shared physical/observational interaction:

- inspect one of the notices together;
- Tabitha comments;
- the player can join the joke, defend it, or notice something else;
- one selected notice can become a private callback later.

The point is not a notice-reading mechanic. It gives the companionship a shared object and creates a private motif.

## Beat 3 — Five minutes without a reason

A substantive focused VN scene develops naturally after the shared beat.

Core conversational movement:

1. humour about the hall / notice;
2. Tabitha admits she likes Maya and likes people but often experiences organised socialising as something she has to perform correctly;
3. she observes that the player chose to remain outside rather than immediately collecting the evening's available social content;
4. the conversation turns toward whether spending time together needs a stated reason/event;
5. the player's stance matters: reassure without making her a problem, tease, relate personally, or push her toward joining the room;
6. Tabitha responds according to the chosen stance;
7. a concrete future possibility or changed immediate plan emerges.

This is not intended as therapy or crisis dialogue. It should remain funny, specific and ordinary.

## Beat 4 — Changed map state

After the focused scene:

- Tabitha's behaviour/position reflects the conversation;
- the private notice motif remains visible/callback-capable;
- one future plan may now exist;
- the player is free to continue outside, walk around, enter the hall with her, enter alone, or eventually leave.

## Beat 5 — Reincorporation / payoff

A later short beat must incorporate the earlier private route.

Examples:

- if the player and Tabitha go inside together, she quietly references the notice/private joke during group activity;
- if they remain outside, a second smaller conversation builds on the earlier stance rather than starting from zero;
- if the player leaves with Tabitha, the ending acknowledges the particular time they spent together and the new plan/motif;
- if the player abandons the private plan to chase group content, Tabitha may interpret that pattern, but it should not automatically be punitive.

# Route-value preflight requirements

Before external playtest, the complete build must be self-played and qualitatively reviewed for each Experience Contract.

## Tabitha route — mandatory qualitative questions

- Did the route feel like spending actual time with Tabitha rather than choosing to receive less game?
- What did I learn about her that I did not know at the start?
- What did she learn / infer about my stance?
- What did we actually share or do together?
- Was the focused VN scene substantial enough to justify choosing her?
- Did the conversation develop rather than loop on “social battery” small talk?
- Did the shared environmental beat feel contextual rather than like a minigame?
- Did the route create a memorable private motif, plan or changed relationship context?
- Did the ending / next transition feel earned rather than sudden?
- If I knew this content in advance, would choosing the quiet route still look appealing?

Any weak answer blocks external playtest.

## Positive precedent comparison

The Tabitha route must be compared against the strongest relevant accepted evidence from v006/v006b:

- important conversation benefited from focused VN treatment;
- positioning mattered when it changed who the player stayed with;
- the final stay/leave choice was strong because it visibly changed what happened next;
- non-intervention remained valuable when it still produced companionship / private context;
- choices could be worthwhile as self-definition when characters and later events acknowledged them.

V007c is not ready if its one-to-one route is structurally cleaner but experientially weaker than those established moments.

# Regression probes

All v007b regression guards continue to apply:

- no dashboard creep;
- no mandatory group railway;
- no Priya shepherding requirement;
- no forced social coverage;
- group exit remains possible;
- quiet route does not wait for fixed timestamps;
- choices receive immediate acknowledgement;
- observer/non-intervention does not deadlock.

Additional v007c guards:

- **empty freedom:** no major route is merely reachable with negligible worthwhile content;
- `with_tabitha` is sustained through proximity / world state rather than repeated confirmation prompts;
- the Tabitha route contains its required five experiential functions;
- at least one substantive private scene remains available before any group content is required;
- the Tabitha ending cannot become available immediately after a single short scene + time advance;
- group content cannot consume or silently invalidate established private context;
- private route payoff is reincorporated later.

# Playtest-ready standard

Do not mark v007c ready until both policies pass.

### Regression safety

- technical checks;
- state tests;
- route/topology tests;
- UI scan;
- anti-pattern scan;
- exact-branch CI / runtime smoke.

### Positive experience value

- all Experience Contracts implemented;
- content/bandwidth inventory reviewed;
- complete qualitative route-value self-play for Tabitha, group, Priya-selective and observer approaches;
- positive-precedent comparison written down;
- no major route exhibits empty freedom;
- complete Tabitha route judged internally worth choosing before the user is asked to test it.

## Current implementation principle

> **The player chooses social bandwidth, but every promoted bandwidth contains actual game. Quiet company means substantive private narrative, not absence of group content. Spatial behaviour carries continuing intent between worthwhile beats; focused VN is used when the chosen relationship earns it; and the evening should leave the player with something specific that happened between them and the people they chose.**
