# Narrative Interaction Lab v007c — Friday Night, Substantive Social Routes

**Status:** ready for external playtest — regression and positive-experience gates passed internally

**Process:** governed by [`../REGRESSION-POLICY.md`](../REGRESSION-POLICY.md) and [`../EXPERIENCE-VALUE-POLICY.md`](../EXPERIENCE-VALUE-POLICY.md)

**Internal experience-value evidence:** [`findings/000-2026-08-28-internal-experience-preflight.md`](./findings/000-2026-08-28-internal-experience-preflight.md)

## Baseline

V007c is a targeted correction of the failed v007/v007b Friday-night experiments.

The player-facing baseline combines:

- **v006b accepted interaction grammar:** compact lived space, elastic meaningful time, contextual low-burden map UI, socially permeable situations, meaningful positioning, focused VN for high-bandwidth conversation, valid non-intervention;
- **v007 useful evidence:** the compact community-hall / forecourt / side-yard layout was positively received as simple and elegant; one-to-one and 2–4-person gatherings remain desirable social scales;
- **v007b useful correction:** the player controls social bandwidth; groups are possibilities rather than a required sampler; no dashboard; no invisible group railway; Priya can self-settle; meaningful choices need prompt visible acknowledgement;
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

- narrative and characters remain the primary experience;
- high-value focused conversation is retained when warranted;
- map interaction makes the narrative inhabitable and socially spatial rather than replacing meaningful scenes with empty wandering;
- ordinary companionship must not collapse into lack of experience;
- pressure is occasional texture, not the main engine of the evening.

### Social bandwidth freedom

- one-to-one, small-group, observation and leaving are all valid approaches;
- no group scene is required before one-to-one content;
- no one-to-one route is required before group content;
- the player may leave a social configuration rather than exhaust its authored material;
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

## Deliberate correction from v007b

The following v007b implementation assumption is rejected:

> **A quiet / low-pressure route does not need much authored material.**

V007c instead tests whether a one-to-one route can remain calm and voluntary while receiving high narrative bandwidth when the player demonstrates strong interest in that character.

# Experience Contracts

## A — Tabitha one-to-one evening

### Player desire

> **I want to spend meaningful time with Tabitha rather than consume the group activity.**

### Required value

The route must provide a coherent combination of:

- private humour and chemistry;
- character discovery;
- mutual attention;
- player self-expression;
- a shared observation/activity grounded in the place;
- conversational development rather than static small talk;
- at least one revealing choice with local acknowledgement;
- a concrete interpersonal payoff or new arrangement;
- a satisfying transition into more time together, the group, or leaving.

### Implemented bandwidth

```text
ARRIVE TOGETHER
        ↓
short focused opening
        ↓
PLAYER REMAINS WITH TABITHA
(map/world state carries the intention)
        ↓
SHARED NOTICEBOARD BEAT
light lived-space companionship
        ↓
FOCUSED PRIVATE VN
“The person outside the programme”
        ↓
NEW PRIVATE MOTIF / KNOWLEDGE / PLAN
        ↓
PLAYER PHYSICALLY FOLLOWS OR GOES ELSEWHERE
        ↓
PLAN-SPECIFIC CALLBACK
        ↓
WALK TOGETHER / REJOIN GROUP / LINGER
```

The route does **not** repeatedly ask whether the player still wants to stay with Tabitha.

### Implemented one-to-one content

#### Beat 1 — Outside the hall

Tabitha jokes about the building's laminated community notices and spots one titled **“Your Role in Community Resilience.”**

If the player chooses to stay outside, that creates sustained `withTabitha` state rather than unlocking another “stay here?” confirmation.

#### Beat 2 — Shared noticeboard

The player and Tabitha read the noticeboard together. **“Social Connection Drop-In — booking essential”** becomes their favourite.

This is a small contextual shared activity, not a notice-reading minigame. It gives the companionship something specific to notice together and creates a private comic motif.

#### Beat 3 — The person outside the programme

The shared hall/notice context develops into a substantive focused VN scene specific to Tabitha's accepted character identity.

The conversation moves through:

- “community resilience” reminding her of the follow-up workshops after the notorious council educational campaign;
- the absurdity of an institution responding to an accidental internet meme with more branded stationery;
- her irritation/amusement that people who recognise her assume they already know the conversation they are entitled to have with her;
- the gap between the searchable public symbol and her actual earlier life as a library worker;
- her knowledge of old civic buildings and their physical history;
- her noticing that the player stayed outside and looked at the place with her instead of immediately asking for the famous story.

The player can respond in three materially different ways:

1. **“I know the public story. I’m more interested in you.”**  
   Creates a concrete breakfast plan.

2. **“You absolutely use the infamous-goth thing when it gets you something.”**  
   Develops the private notice-ranking joke and a station-walk plan.

3. **“Tell me one thing about you that has nothing to do with that video.”**  
   Reveals Tabitha's interest in municipal architecture and creates a plan to visit an old library with a ridiculous carved ventilation tower.

The point is not a crisis or therapy scene. Ordinary company becomes more particular.

#### Beat 4 — Changed lived-space context

After the private scene:

- the chosen plan exists in state;
- the private motif persists;
- Tabitha physically moves toward the side yard;
- the player may follow, go inside, or leave the private route;
- unrelated Priya arrival is held out of the shared/private feedback window rather than interrupting it.

#### Beat 5 — Callback / payoff

If the player follows Tabitha to the side yard, a plan-specific callback incorporates what happened earlier.

Examples:

- breakfast remains a real plan;
- the notice-ranking joke develops;
- the old-library route recalls the 1908 hall plaque and the planned library visit.

The player can then:

- walk toward the station with Tabitha;
- go into the hall together while carrying the private context into group play;
- remain together a little longer.

The leave-together route only ends after this earned payoff; it cannot unlock from one short scene plus elapsed time.

## B — Small-group radio route

### Player desire

> **I want to be around several people, enjoy their chemistry, and participate without having to drive every conversation.**

Implemented value includes:

- Maya/Alex NPC-to-NPC banter;
- joining, listening, or remaining beside Tabitha;
- map-level observation without mandatory VN;
- optional focused group material;
- optional audience-sensitive story material when the relevant people are actually present;
- social continuation / afterparty possibility;
- no requirement to consume every group beat.

## C — Priya-selective one-to-one route

### Player desire

> **I am interested in Priya but not necessarily the radio crowd.**

Priya can self-settle without being shepherded. Her private route is intentionally shorter than Tabitha's because she arrives later, but it contains:

- character-specific private conversation;
- shared uncertainty / reassurance choices;
- a concrete chips arrangement option;
- visible behavioral or arrangement consequences;
- no radio-group prerequisite.

## D — Observer / low-intervention route

### Player desire

> **I want to inhabit the evening, listen, notice and move without constantly choosing dialogue.**

Observer play contains actual material to observe:

- Maya/Alex exchanges;
- changed positions / arrivals;
- NPC initiative;
- environmental humour/details;
- opportunities that may be ignored;
- valid leaving.

It is intentionally lower semantic bandwidth than choosing a character, but it is not an empty time-skip route.

# Regression / experience-value gates

All relevant v007b guards remain:

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
- `with_tabitha` is sustained through world state rather than repeated confirmation prompts;
- Tabitha's route contains opening + shared activity + substantive private scene + reincorporating callback + payoff;
- at least one substantive private scene exists before any group content is required;
- Tabitha's ending cannot become available immediately after one short scene plus time advancement;
- group content cannot silently erase established private context;
- unrelated arrivals do not overwrite the quiet route's immediate/shared feedback window;
- long NPC social movement cannot snap characters back to static spawn and make later social beats unreachable;
- scene choices that end the run do not advance an extra world beat afterward.

# Internal readiness evidence

The complete qualitative preflight is recorded in:

[`findings/000-2026-08-28-internal-experience-preflight.md`](./findings/000-2026-08-28-internal-experience-preflight.md)

It includes:

- exact-branch CI/runtime verification;
- content/bandwidth inventory;
- complete rendered Tabitha route;
- route-value review against all Experience Contract questions;
- comparison with the strongest relevant v006/v006b precedents;
- empty-freedom scan;
- internal failures found and corrected before external testing.

The complete rendered Tabitha path reaches:

```text
opening
→ shared noticeboard beat
→ substantive private VN
→ concrete future plan
→ physical movement to side yard
→ plan-specific callback
→ leave together / rejoin / linger
```

The build is considered **substantive enough to justify external testing**, not proven fun. Actual writing quality, pacing, chemistry and enjoyment remain external questions.

# Run

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

- `WASD` / arrow keys — move;
- `Tab` — cycle nearby contextual affordances;
- `E` / `Enter` — use the highlighted affordance;
- `Enter` — advance focused VN dialogue;
- `1–4` — choose VN options;
- `Esc` — return from a focused conversation to the live space.

## Telemetry

Runs are stored locally under `md-v007c-runs` and export as readable indented JSON.

Telemetry records:

- meaningful-beat advancement;
- conduct;
- audience/privacy context;
- immediate visible state changes;
- scenes actually entered;
- private motifs and arrangements;
- accumulated interpretations;
- residue;
- debrief responses;
- chronological trace.

## Current implementation principle

> **The player chooses social bandwidth, but every promoted bandwidth contains actual game. Quiet company means substantive private narrative, not absence of group content. Spatial behaviour carries continuing intent between worthwhile beats; focused VN is used when the chosen relationship earns it; and the evening should leave the player with something specific that happened between them and the people they chose.**
