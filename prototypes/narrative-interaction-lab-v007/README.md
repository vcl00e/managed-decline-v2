# Narrative Interaction Lab v007 — Friday Night

**Status:** ready for playtest

**Builds directly on:** `narrative-interaction-lab-v006b`

V006b established that continuous geography, elastic diegetic time, socially permeable situations and focused VN presentation can work together as one interaction grammar. Its remaining bottleneck was no longer basic presentation. It was whether characters can interpret **patterns of conduct across multiple actions and social contexts** and carry those interpretations into future behaviour.

V007 expands scope carefully without turning *Managed Decline* into an obligation or crisis simulator.

## Primary question

> **Can a mostly enjoyable ordinary slice of life combine one-to-one and small-group interaction such that the player's presence, audience, introductions, teasing, private/public behaviour and final social choices accumulate into believable character interpretation and meaningful next-day residue?**

The baseline experience is intentionally pleasure-first: music, banter, drifting between people, a community hall, low-stakes teasing, optional private moments and deciding where the night goes next.

The modest practical disturbance — the hall's new 21:30 closure policy — exists to change the social shape of the evening. The player is not appointed to solve it.

## Secondary group-interaction question

> **Can 2–4-person gatherings preserve agency while NPCs also talk to one another, so the player can enjoy being inside a social situation without becoming either a passive cutscene viewer or the centre of every exchange?**

V007 deliberately does **not** test full party simulation, large crowds, procedural gossip networks or N² relationship state.

## Social scope

Five significant characters appear across the evening:

- **Tabitha** — the person the player arrived with;
- **Maya** — runs the community radio night;
- **Alex** — helping with the setup;
- **Priya** — knows the player but not the radio crowd;
- **Elliot** — caretaker / reluctant sound engineer.

Only roughly 2–4 people are socially active at once.

The evening moves naturally between:

- one-to-one arrival with Tabitha;
- a small Maya/Alex/Tabitha group;
- Priya joining an existing group;
- a low-stakes group story where audience matters;
- optional one-to-one moments with Tabitha or Priya;
- a group response to the hall closure notice;
- a final choice between a group continuation, one-to-one continuations or going home alone.

## Interaction grammar carried forward from v006b

### Lived-space layer

- move through one continuous compact social space;
- approach or remain outside a group;
- follow someone who peels away;
- remain with the room rather than following;
- let another person join without personally shepherding them;
- choose where to be when the evening splits.

### Focused VN layer

Used when semantic bandwidth is useful:

- joining an existing group;
- introductions;
- audience-sensitive teasing;
- private one-to-one exchanges;
- the closure announcement;
- deciding where the night goes next.

NPC-to-NPC dialogue is intentionally present. The player is not required to answer every line.

## Conduct model

The prototype stores **factual conduct evidence**, not relationship scores.

Each meaningful act can retain:

```text
what happened
who it targeted
who witnessed it
the channel
public/private context
semantic conduct tags
```

Examples:

```text
introduced Priya to the room
let Tabitha tell her own story
crossed Tabitha's teasing line in public
followed Tabitha outside
made room for Priya
helped move the radio setup
went to the afterparty
walked toward the station with Tabitha
```

At the end of the evening deterministic authored rules interpret the pattern for Tabitha, Maya and Priya.

The player does not see labels such as `drifts_but_comes_back` during play. A developer trace exposes them after the run so the playtest can distinguish correct interpretation from merely pleasant prose.

No LLM owns canonical state in this experiment.

## Residue

Sunday morning shows concrete consequences such as:

- being added to the radio-night group chat;
- Maya's flat becoming socially accessible;
- a follow-up message from Priya;
- a photo or private joke with Tabitha;
- Priya and Maya recognising one another independently because the player introduced them;
- the hall becoming a familiar place in the protagonist's life.

Most residue is deliberately neutral or positive. V007 is testing whether ordinary social conduct can matter, not whether the game can manufacture punishment.

## Important non-intervention rules

The prototype must not imply that every social development requires protagonist management.

Accordingly:

- Priya can join the group without the player going to collect her;
- the player can remain with the group rather than following somebody outside;
- private conversations are optional;
- the hall closure can be enjoyed as absurdity while Maya handles it;
- going home alone is a valid ending;
- no hidden objective requires the player to maximise attendance or social coverage.

## Success criteria

V007 is successful enough to continue if:

1. simply spending time in the evening is enjoyable rather than merely a vehicle for consequences;
2. one-to-one and small-group interaction feel like meaningfully different social textures;
3. NPC-to-NPC dialogue makes the world feel social without making the player feel locked out;
4. the player does not feel required to manage every person or optimise the evening;
5. audience and public/private context make at least one choice feel meaningfully different;
6. at least one character's next-day interpretation convincingly reflects multiple earlier actions rather than only the final choice;
7. different characters can form different readable interpretations from overlapping conduct;
8. different runs produce different social residue without a success/failure hierarchy;
9. the player's attention remains mainly on people and situations rather than operating the prototype;
10. the resulting Sunday state creates some desire to continue living this particular version of the protagonist's life.

## Failure signals

Treat these as important failures even if the state model works technically:

- “I was trying to talk to everybody so I didn't miss content.”
- “Everyone waited for me to make the conversation happen.”
- “The group scenes were just cutscenes with extra portraits.”
- “I felt like I was scheduling relationship obligations.”
- “The characters only seemed to remember my last choice.”
- “The evening was pleasant only because the writing was pleasant; deciding where to be added nothing.”
- “I could not tell why the Sunday reactions happened.”

## Run

Requires Node.js 18+.

```bash
cd prototypes/narrative-interaction-lab-v007
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
- `E` / `Enter` — use selected contextual action;
- `Enter` — advance focused VN dialogue;
- `1–4` — choose VN options.

## Telemetry

The exported run JSON is readable and indented. It records:

- causal phase changes;
- player conduct;
- target and audience;
- public/private context;
- semantic conduct tags;
- final character interpretations and supporting evidence;
- persistent residue;
- debrief responses;
- the chronological trace.
