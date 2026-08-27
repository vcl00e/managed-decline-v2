# Narrative Interaction Lab v007b — Friday Night, Free Social Topology

**Status:** ready for external playtest — internal regression/preflight gate passed

**Process:** governed by [`../REGRESSION-POLICY.md`](../REGRESSION-POLICY.md)

**Internal preflight evidence:** [`findings/000-2026-08-27-internal-preflight.md`](./findings/000-2026-08-27-internal-preflight.md)

## Baseline

The closest accepted same-domain baseline is `narrative-interaction-lab-v006b`.

V006b established a successful lived-space / focused-VN grammar:

- compact continuous geography;
- elastic diegetic time rather than a fixed invisible master timeline;
- socially permeable NPC situations rather than dialogue polling;
- contextual map interaction with low UI burden;
- meaningful positioning / presence / non-intervention;
- focused VN presentation when semantic bandwidth warrants it;
- ordinary observation and companionship as valid play;
- no requirement that the protagonist take over every situation.

The failed v007 iteration adds **non-baseline evidence** that remains useful:

- the compact community-hall / forecourt / side-yard layout was positively received as simple and elegant;
- a pleasure-first Friday-night gathering remains a suitable scenario direction;
- one-to-one and 2–4-person small-group gatherings remain desirable social scales;
- NPC-to-NPC conversation remains worth testing;
- audience and public/private provenance remain useful hidden state;
- accumulated character interpretation remains an important later consequence layer.

V007b must therefore be treated as:

> **v006b's accepted interaction/UI grammar + v007's useful hall/social-premise evidence + a deliberate new test of free social topology.**

It must **not** be treated as a patch that inherits v007's mandatory scene sequence or dashboard presentation.

## New question / hypothesis

Primary question:

> **Can the player freely regulate their social experience between solitude, one-to-one company and small groups inside a compact lived space, while sparse meaningful choices produce sufficiently immediate/readable consequences that the evening itself remains enjoyable?**

Secondary question:

> **Can NPC-to-NPC interaction and small-group social chemistry remain enjoyable and permeable when group participation is genuinely optional rather than an authored sequence the player must consume?**

Accumulated character interpretation remains present underneath the experiment, but it is **secondary**. V007b should first establish that the larger ordinary-life slice is enjoyable to inhabit and that the player can choose their preferred social bandwidth.

## Inherited accepted constraints

These are not under test and must be preserved.

### Narrative-first hierarchy

- the people, situation and atmosphere remain primary;
- interaction supports inhabitation and consequence rather than becoming a management interface;
- ordinary companionship, humour, wandering and observation are valid play;
- pressure is occasional texture, not the baseline engine of the evening.

### Low-friction lived-space UI

Ordinary map play inherits the v006b direction:

- the world occupies the primary screen area;
- contextual prompts appear transiently near/in the game presentation;
- no permanent right-hand dashboard;
- no scrolling `room tone` / event log;
- no permanent nearby-action list;
- no visible developer state in ordinary play;
- no objective/task list;
- development telemetry remains hidden and exportable separately.

### Elastic meaningful time

- no fixed-rate invisible timeline that forces waiting or anticipatory scrambling;
- compress genuinely empty time;
- keep time live when presence, observation, anticipation or possible action have meaning;
- no scene should require the player to wait for a timestamp.

### Social permeability

- NPCs are not dialogue inventories to poll;
- active situations expose meaningful ways to join, remain, observe, withdraw or stay elsewhere;
- NPCs can continue without protagonist management;
- non-intervention does not deadlock unrelated play.

### Player-controlled positioning

- physical/social position must be capable of changing participation, audience, intimacy, access or what happens next;
- the player may leave a group after joining it;
- the player may follow somebody who peels away without finishing the group's content;
- the player may remain where they are instead of following;
- the player may end the evening without consuming all surfaced content.

### Focused VN bandwidth

- VN is used for high-semantic or emotionally focused conversation;
- not every social interaction becomes a VN scene;
- NPC-to-NPC ambient conversation can occur on the map;
- entering VN must not secretly mark unrelated content complete;
- cancelling/withdrawing must return the player to the live social situation where appropriate.

### Choice consequence readability

- expressive/self-defining choices may remain mostly stance;
- choices intended to matter situationally should normally cast an observable shadow within the next interaction cycle;
- longer-term memory/interpretation may accumulate underneath;
- the prototype must not rely on hidden conduct tags as the main evidence that choices mattered.

## Deliberate re-tests / overrides

None of the accepted v006b interaction/UI conclusions are deliberately reopened in v007b.

V007b **does** deliberately test a new scale of the accepted social-positioning principle:

> Does player-controlled positioning still work when the lived space contains several simultaneous or adjacent social configurations rather than one central situation?

Evidence from the failed v007 that implied an authored sequence of social configurations is explicitly rejected as a baseline and is not being preserved.

## New-domain freedoms

The following elements are new enough to be designed for this experiment while still obeying higher-level accepted principles:

- small-group conversational topology;
- NPC-to-NPC group banter;
- groups splitting and re-forming;
- audience/provenance across 2–4-person gatherings;
- characters independently moving between the hall, forecourt and side yard;
- immediate social acknowledgements that depend on who is present;
- lightweight accumulated interpretation across public/private conduct.

The community-hall visual geometry may differ from v006b's flat because it is a different fictional place, but the **interaction-information burden** should not regress.

## Not being tested

Do not casually redesign these during v007b:

- overall map interaction UI paradigm;
- fixed versus elastic time (elastic is inherited);
- free text / compositional dialogue input;
- full party/crowd simulation;
- large procedural gossip networks;
- N² persistent relationship simulation;
- phone/asynchronous interaction;
- campaign-scale exploration;
- complex work/resource mechanics;
- objective/task UI;
- relationship scores or visible meters;
- LLM-owned canonical character state;
- a crisis/obligation-heavy scenario structure.

## Social topology target

The hall contains **possibilities**, not a required sampler.

At opening:

- the player and Tabitha arrive together at the forecourt;
- Maya and Alex are already inside around the radio setup;
- the player can stay outside with Tabitha, go inside, observe, or move between those spaces;
- spending quiet time with Tabitha must be meaningful immediately and must not require joining the radio group first.

Later:

- Priya arrives causally and is capable of entering / finding a social position without being collected by the protagonist;
- the player may meet her, ignore her, introduce her, make room for her, or remain with somebody else;
- if the player deliberately remains in quiet company outside, Priya's arrival is delayed long enough for that choice to be experienced rather than immediately overwritten by another social demand;
- Tabitha may peel away to the side yard based on her own social rhythm, not as a reward unlocked by completing a mandatory group scene;
- Maya/Alex can continue banter or radio activity without waiting for the player;
- the player can join a group, listen briefly, leave, follow someone else or simply remain elsewhere.

A plausible run may be mostly:

```text
Tabitha 1:1
→ quiet wandering
→ brief group contact
→ Tabitha 1:1
→ go home / walk together
```

Another may be:

```text
brief arrival with Tabitha
→ Maya/Alex group
→ Priya joins
→ mixed group
→ radio continuation
```

Another may be:

```text
observe
→ Priya 1:1
→ short group contact
→ leave alone
```

No one topology is the intended route.

## Choice/feedback target

V007b contains **fewer meaningful choices than v007**, with clearer local consequences.

Examples:

### Stay outside with Tabitha

Immediate observable shadow includes:

- Tabitha remains outside rather than entering immediately;
- the map explicitly reflects that she stayed with the player;
- another quiet-time affordance remains available;
- Maya/Alex continue inside without the player;
- Priya does not immediately appear and overwrite the chosen quiet interval.

### Join Maya and Alex

Immediate observable shadow may include:

- the protagonist is physically incorporated into the cluster;
- the NPC-to-NPC exchange changes to acknowledge presence;
- Tabitha may stay nearby, join later or peel away based on her current state;
- the player remains free to walk away.

### Let Priya find her own place

Immediate observable shadow may include:

- Priya heads into the hall independently;
- she no longer depends on the protagonist as her only social anchor;
- subsequent group membership/position visibly changes.

### Respect or cross a teasing boundary

Immediate observable shadow may include:

- Tabitha's line/tone/position changes now;
- the group responds differently;
- later private interpretation can still remember the public act.

The implementation prefers **visible behavioural consequences over explanatory text**.

## Modest world disturbance

The hall's absurd closure policy may emerge later in the evening, but only as something that changes the social shape of the night rather than becoming the night's objective.

The player is free to:

- help lightly;
- laugh and let Maya handle it;
- leave with somebody;
- go elsewhere;
- ignore it and end the night.

No `save the radio night` structure.

## Regression probes

These must remain passing before external playtesting.

### Route/topology probes

1. **Quiet-player route:** spend the majority of the run with Tabitha without completing a mandatory group scene.
2. **Social-player route:** voluntarily spend the majority of the run in small groups and reach meaningful group variation.
3. **Observer route:** listen/wander with minimal direct choices without deadlocking the evening.
4. **Selective route:** engage Priya while largely ignoring the radio crowd, or engage the radio crowd while largely ignoring Priya.
5. **Leave route:** end the evening without consuming all available social scenes.
6. **Group-exit route:** join a group and leave it before exhausting its authored interaction.
7. **Follow route:** follow someone who peels away without completing the current group's content.
8. **No-shepherd route:** allow Priya to join/settle without the player collecting or introducing her.

### UI probes

- ordinary play contains no permanent side dashboard;
- ordinary play contains no scrolling ambient/event log;
- ordinary play contains no permanent action list;
- debug state is absent from player-facing presentation;
- the world remains the dominant visual field;
- contextual prompts are sparse and local/transient.

### Time/pacing probes

- no route requires waiting for a timestamp;
- staying quietly with somebody is chosen inhabitation, not dead time;
- unrelated developments can progress after meaningful participation/non-participation without forcing social coverage.

### Choice-feedback probes

- multiple situational choices produce visible acknowledgement within the next interaction cycle;
- no early sequence consists mainly of choices whose only effect is hidden telemetry;
- private/public audience difference is observable in at least one interaction;
- choosing quiet company is visibly acknowledged before unrelated social arrivals occur.

### Anti-pattern scan

Explicitly check for recurrence of:

- dialogue terminal;
- animated scenery when participation matters;
- invisible railway;
- dashboard creep;
- deferred consequence fog;
- obligation treadmill;
- protagonist gravity;
- interaction inflation.

## Preflight personas

Internal preflight includes:

- **quiet player:** mostly Tabitha one-to-one time;
- **social player:** groups and group variation;
- **observer:** listening/wandering and zero required VN scenes;
- **Priya-selective player:** Priya without the radio route;
- **uninterested player:** leaving rather than following the evening's opportunities.

The critical quiet-player path was additionally exercised through a rendered Chromium page with actual keyboard interaction.

## Playtest-ready gate

The current build has passed:

- syntax/build checks;
- exact-branch GitHub Actions execution;
- HTTP runtime smoke test;
- state/model tests;
- route/topology regression tests;
- UI regression scan;
- immediate-feedback regression checks;
- five contrasting scripted player-intent preflights;
- rendered quiet-player interaction preflight;
- targeted scan for the known v006/v006b/v007 failure classes relevant to this build.

See [`findings/000-2026-08-27-internal-preflight.md`](./findings/000-2026-08-27-internal-preflight.md) for the evidence and limitations.

The remaining questions are intentionally experiential and require the user's playtest rather than more internal simulation.

## Run

Requires Node.js 18+.

```bash
cd prototypes/narrative-interaction-lab-v007b
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
- `Esc` — leave a focused conversation and return to the live space.

## Telemetry

Runs are stored locally under `md-v007b-runs` and export as readable indented JSON.

Telemetry records:

- fictional-time / meaningful-beat advancement;
- conduct;
- audience and privacy context;
- immediate visible state changes;
- scenes actually entered;
- accumulated character interpretations;
- residue;
- debrief answers;
- chronological trace.

## Current implementation principle

> **The hall supplies social possibilities. The player chooses their social bandwidth. Groups may form around them, but the prototype must not schedule a curriculum of group interaction. Choices should alter the lived situation soon enough to be felt, while accumulated interpretation remains a secondary longer-term layer.**
