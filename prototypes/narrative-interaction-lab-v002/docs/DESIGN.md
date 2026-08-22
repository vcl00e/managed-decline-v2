# Design specification

## Decision lineage

The first Narrative Interaction Lab established several directional findings:

1. The dialogue baseline won every tested short slice.
2. The system-forward condition improved explicit clarity but damaged presence, agency and narrative pull through optimisation capture.
3. Separate support was most defensible in ensemble or institutional scenes where it changed information, witnesses, timing or residue.
4. Separate support was least defensible in intimate scenes where it converted readable subtext into operation.
5. Optional inspection created useful inference but also created affordance debt: once the game teaches that a detail can be inspected, the rest of the world must remain credible when it cannot be.

v002 accepts those findings. It does not repeat the original mechanics-versus-dialogue comparison.

## Core hypothesis

> Focused dialogue can remain the primary interaction layer across a sustained evening, while a compact diorama provides social geography, voluntary sequencing, anticipation, breathing space and visible aftermath.

The comparative question is:

> Does either optional observation or sparse decisive action add enough presence, interpretation, ownership or memory to justify its interruption and production cost?

## Test object

**Listening Exercise** is one Friday evening in Greystone.

The player arrives at Station Square shortly before Maya’s community-radio programme. Barlow Rooms is lit but the group’s booking has been suspended under a “temporary electrical access restriction.” The council is simultaneously preparing a listening-pilot press launch in the powered room. The radio event moves to The Lantern pub.

The situation is deliberately not a simple lie to expose:

- the electrical inspection has genuinely not occurred;
- the council’s pilot contractor has supplied paperwork the radio group never previously needed;
- a funded operator might keep the building open;
- existing community groups may become temporary guests or disappear without a formal closure decision;
- Nadia is defending institutional wording but may also be trying to prevent a worse outcome;
- public evidence can misrepresent Len or expose private caller details;
- keeping evidence private protects people while leaving the official account cleaner.

The player must read partial views and decide how to participate rather than discover one correct answer.

## Required session composition

The slice deliberately combines the elements identified for the next prototype:

| Requirement | Implementation |
|---|---|
| Compact diorama | Station Square with café, community hall and pub |
| Three locations | Platform One Café, Barlow Rooms, The Lantern |
| Five to six characters | Maya, Tabitha, Sophie, Theo, Nadia and Len |
| Intimate scene | The meaning of inviting and publicly arriving with Tabitha |
| Ensemble scene | The improvised Low Signal broadcast |
| Institutional/public contradiction | Closed community booking beside a powered listening launch |
| Phone interruption | A call forces synchronous attention while another person is present |
| Visible aftermath | Saturday wording, equipment, messages and possible pub routine |
| Elastic time | Routine setup and performance compress; attention points remain direct |
| No explicit task layer | No quest title, objective, score, meter or success state |

## What is held constant

The following must remain materially equivalent across conditions:

- authored prose and overall scene order;
- all substantive dialogue decisions;
- character motives and knowledge;
- map-level first-approach decisions;
- phone interruption and response options;
- the existence and later relevance of the closure notice and lit room;
- the same photograph problem and information-flow trade-offs;
- the same range of endings and persistent residues;
- visual staging, typography and response feedback;
- post-run questions and trace fields.

Condition-specific wording may acknowledge how an intention is enacted, but it must not add a better outcome or an obviously superior choice.

## Condition A — dialogue baseline + passive diorama

The baseline receives:

- passive staging;
- map-level social sequencing;
- dialogue choices that express spatial and material intentions;
- automatic performance of those intentions;
- immediate authored reaction;
- visible residue.

It receives **zero separate support inputs**.

Examples:

- “Come in with me” determines how the player and Tabitha cross the square.
- “Send the full image to Maya” determines the photograph’s destination.

The player does not manually walk each step or operate a file-transfer interface.

### Baseline hypothesis

The narrative already has enough agency and embodiment when intention, staging and consequence are legible. Additional operation may only add friction.

## Condition B — baseline + optional observation

This condition is identical to the baseline except at one genuine abstraction gap outside Barlow Rooms.

The player may:

1. read the laminated closure notice;
2. look through the side window.

Both are optional. The player may enter the conversation immediately, inspect one clue or inspect both. The observations alter later authored wording and give the player more specific grounds for interpretation. They do not unlock a correct route or supply a hidden score.

No other prop, room or character becomes inspectable.

### Observation hypothesis

Two constrained inspections may improve causal understanding, evidence memory and later choice quality because the institutional contradiction is materially present in the environment.

### Main risk

The controls may teach a broader inspection grammar the prototype cannot honour, turning passive scenery elsewhere into apparently missing interaction.

## Condition C — baseline + sparse decisive actions

This condition replaces three high-level dialogue commitments with separate spatial or material enactments:

1. **Arrival:** walk with Tabitha, let her cross first or ask her to wait.
2. **Broadcast:** place the speaker inside, in the doorway or in the square.
3. **Photograph:** transfer it to Maya, attach it to Nadia’s email, post a cautious crop or put the devices away.

Each point:

- occurs once;
- changes presence, witnesses, audience, publicness or information flow;
- receives an immediate reaction;
- leaves later visible or remembered residue;
- is followed by focused narrative rather than another operation chain.

There is no equipment minigame, movement challenge, evidence inventory or virality prediction.

### Decisive-action hypothesis

A very small number of consequential physical acts may produce stronger first-person retelling and place/action memory than an equivalent dialogue label.

### Main risk

Even three inputs may interrupt dramatic continuity, make the action feel artificially privileged or merely restate an intention already clear in dialogue.

## Support budget

| Scene | Baseline | Observation | Decisive |
|---|---:|---:|---:|
| Arrival / intimate threshold | 0 | 0 | 1 spatial action |
| Hall / abstraction gap | 0 | 0–2 optional observations | 0 |
| Pub / audience setup | 0 | 0 | 1 material action |
| Photograph / information flow | 0 | 0 | 1 material action |
| All other focused scenes | 0 | 0 | 0 |

No condition chains separate support actions without an immediate authored response.

## Core interaction language

Across all conditions the recurring player grammar is:

```text
choose where to be
→ attend to a partial account
→ interpret without complete certainty
→ speak, withhold, commit or decline
→ affect witnesses, information or access
→ see immediate reaction
→ encounter visible aftermath
```

The actual skill under test is social reading and participation, not clicking speed or system optimisation.

## Choice-quality requirements

Important choices must satisfy all of the following:

- at least two alternatives are credible for a thoughtful player;
- alternatives differ in social or causal meaning, not only tone;
- no label promises a guaranteed result;
- no option is framed as the game-approved answer;
- knowledge in the label is limited to what the player can currently know;
- declining, waiting, keeping something private or leaving may be legitimate;
- later reaction makes the choice inferable without exposing a score.

The photograph decision is the clearest test. Public pressure, private leverage, institutional record and continued privacy must all carry a defensible benefit and cost.

## Feedback grammar

Every major commitment has a visible shadow:

```text
choice
→ immediate response from present people
→ changed account or behaviour
→ later phone/public interpretation
→ Saturday environmental or access residue
→ character memory
```

Feedback must be legible enough that the player believes the evening changed, but not so explicit that the outcome becomes a solved optimisation table.

## Diorama function

The CSS diorama is not decorative illustration. It performs six test functions:

1. **Social geography:** café, hall and pub remain mutually visible.
2. **Voluntary sequencing:** the player chooses whom to approach first.
3. **Anticipation:** people and contradictions are visible before focused dialogue.
4. **Breathing space:** the map separates concentrated scenes without filler traversal.
5. **Place memory:** the same square is revisited under changed social conditions.
6. **Visible aftermath:** Saturday reuses the geography rather than reporting a quest result.

The map should fail the test if players describe it only as attractive background.

## Non-goals

v002 does not test:

- final character art, animation or environment production quality;
- combat-like systemic depth;
- freeform walking or dexterity;
- a full phone interface;
- procedural scenario generation;
- campaign-scale routine compression;
- romance-route quality in isolation;
- whether the specific Greystone scenario should become canon;
- statistical significance from one internal run.

## Continue evidence

A support condition merits further production exploration when it improves several of the following without increasing process feeling or burden:

- first-person descriptions of what the player did;
- memory of a place, movement, object or physical consequence;
- causal understanding grounded in observed evidence;
- belief that choices altered scene meaning;
- expectation of specific future aftermath or access;
- credible disagreement between alternatives;
- desire to continue after the ensemble scene;
- low dialogue fatigue across the full evening.

## Kill or simplify evidence

Remove or collapse the support mechanism when:

- players say the dialogue label already carried the same meaning;
- the support input feels like confirmation rather than action;
- players focus on operating it correctly;
- observation makes every unclickable detail feel broken;
- the intervention is remembered mainly as UI;
- the baseline produces equal or stronger memory and agency with less burden;
- support makes the relationship or institution easier to optimise than to interpret;
- the action creates a production promise the wider game cannot afford.
