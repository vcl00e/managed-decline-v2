# Narrative Interaction Lab v006 — The Viewing

**Status:** concluded — mixed synthesis evidence; corrected by v006b

V006 follows the final conclusion of v005. It does not ask whether walking or continuous space are intrinsically fun. V005 already produced directionally useful evidence that a compact lived place can add presence, anticipation, independent activity, voluntary sequencing, situated intervention and physical social convergence.

V006 tested the unresolved synthesis:

> **Can v003-quality authored conversational focus exist inside a v005-style continuously inhabited world, with each mode doing a distinct narrative job and sharing one causal state?**

The answer was mixed. The playtest retained strong evidence for socially meaningful space and focused VN conversation, but rejected the fixed real-time master schedule and non-participable NPC choreography used to connect them. See `findings/002-2026-08-26-final-conclusion.md` for the accepted conclusion and the v006b handoff.

## Scenario

Thursday evening. Tabitha is moving out of a rented flat. Her flatmate Alex urgently needs a replacement tenant because carrying the whole rent is not viable. Priya, the prospective replacement, arrives early for a viewing. The letting agent is late and tells them to proceed without him.

There is a real damp problem in Tabitha's room. It has been reported before but not properly resolved. Tabitha wants to leave without spending her final minutes turning her housing history into another public argument. Priya deserves enough information to decide what she is taking on. Alex needs the room filled. None of those interests are fake, and exposing the truth does not magically remove the underlying scarcity.

The prototype's recurring question is therefore not “can the player solve the damp?” It is:

> **What does the player try to preserve when several legitimate human terms cannot all coexist, and where do they allow the cost to land?**

## What is playable

- close top-down continuous movement inside one compact flat;
- autonomous NPC movement and timed arrivals that continue without the player;
- contextual interaction prompts rather than an NPC dialogue-polling loop;
- facing-weighted targeting, visible target highlighting, hysteresis and Tab cycling;
- a front-door arrival the player can catch or miss;
- a bedroom-access action that carries privacy/social meaning;
- direct observation of the damp and optional creation of photographic evidence;
- important conversations that take over the presentation as full VN-style scenes;
- world time paused during VN scenes so reading speed is not punished;
- choices that modify the physical/social state visible after returning to the flat;
- explicit knowledge provenance rather than flat fact possession;
- one shared world timeline for NPC schedules and authored events;
- dialogue cancellation with Esc;
- input contexts so gameplay keys do not fire while forms own the keyboard;
- readable local telemetry and a focused debrief.

## Experimental rhythm

```text
inhabit the flat
→ notice a human situation
→ form an intention
→ act spatially/materially when that carries meaning
→ enter high-bandwidth authored conversation when warranted
→ return to the same place
→ see changed positions, knowledge, expectations and residue
→ form the next intention
```

## Success criteria

The decisive evidence is not simply a preference score.

V006 was directionally successful if the tester could identify:

1. a spatial/world moment that would lose meaning if reduced to dialogue;
2. an important conversation that clearly benefited from full VN presentation;
3. a spatial or material decision that changed the later dramatic conversation;
4. a dialogue choice that changed the subsequent lived situation;
5. an intention they formed before the game named an objective;
6. what they were trying to preserve and what cost they accepted;
7. little or no pressure to poll every NPC for refreshed content.

The strongest result would have been:

> **The player wants both modes because they understand that each is carrying information and agency the other handles poorly.**

The final findings show that individual spatial moments and VN focus were valuable, while the fixed-time connective layer failed. The original debrief also conflated expressive agency, fictional acknowledgement and material divergence; those are separated in the findings.

## Failure criteria

The synthesis required redesign if:

- the player mostly walked between conversations;
- the player systematically pressed E on everyone to look for new content;
- VN scenes felt detached from what happened on the map;
- spatial actions merely selected which authored scene played;
- dialogue outcomes were not legible after returning to the world;
- the timed world created arbitrary anxiety rather than presence;
- the player would prefer the whole scenario as a linear VN;
- the material problem read as a puzzle with a correct solution;
- the scenario's tension collapsed into “reveal the bad landlord and win.”

Several of these warning signs appeared, especially dead time, polling pressure, inaccessible NPC activity and timer-driven pacing. They are the direct reason v006b was created.

## Deliberate scope limits

V006 did **not** test:

- multiple locations;
- phone gameplay as a full interaction layer;
- work or calendar systems;
- free-text dialogue;
- long-term romance progression;
- procedural NPC planning;
- the full arrangement ecology across an evening and following morning;
- campaign-scale persistence;
- production art;
- whether this exact scenario belongs in the final game.

## Run

Requires Node.js 18+.

```bash
cd prototypes/narrative-interaction-lab-v006
npm run check
npm test
npm start
```

Open:

```text
http://127.0.0.1:4176
```

## Controls

- `WASD` / arrow keys — move
- `E` / Enter — interact with the highlighted contextual affordance
- `Tab` — cycle nearby contextual targets when ambiguity exists
- `1–4` — choose VN options
- `Enter` — advance a VN line
- `Esc` — back out of a VN scene

## Telemetry

Runs are stored in browser `localStorage` under `md-v006-runs` and may be exported as readable indented JSON from the debrief.

The trace records world events, position samples, interactions, knowledge with provenance, commitments, situated actions, semantic choices, door/access decisions and final outcome residue.
