# Final conclusion — Narrative Interaction Lab v005

Date: 2026-08-26

Status: **Concluded — directionally useful lived-space evidence, not proof of the final activity spine**

## What v005 was trying to establish

V005 replaced the rejected v004 location-menu abstraction with a genuinely continuous small social space.

Its question was not whether walking is intrinsically fun. It asked whether inhabiting a compact place containing moving people, independently occurring events and concrete physical affordances can add something valuable to *Managed Decline* that a dialogue-only VN scene cannot provide as naturally.

The initial playtest produced useful evidence, but the run also exposed severe dialogue/input defects. Finding 002 records the methodological correction: repeated dialogue selections and their relationship-state effects must not be treated as clean intentional player choices because conversations could not be cancelled and clustered NPC targeting could select the wrong person.

## Overall result

V005 succeeded at demonstrating several specific advantages of lived-space play:

- discovering a concrete practical problem without an announced quest;
- physically doing something useful inside the fiction;
- moving through a compact environment for a reason;
- seeing NPCs move and wanting to follow them before they disappeared;
- independent events making the environment feel alive;
- genuinely missing some information because the player was elsewhere;
- characters physically converging into a social gathering that felt warm and populated.

The tester rated self-authored intention, spatial relevance, physical agency and world continuity at 4/5.

However, preference for this treatment over the same material as a dialogue-only VN was only 3/5, and the tester reported lower immersion than v003. The spatial layer therefore did **not** justify replacing or diminishing the strong dialogue-first dramatic presentation established by v003.

The correct synthesis is not `v003 or v005`.

> **The next target is v003-quality authored conversational focus embedded inside a v005-style continuously inhabited world.**

## Accepted evidence to carry forward

### 1. A compact lived space can contribute real narrative value

Continuous space should be retained as a promising part of the hybrid rather than treated as dead traversal between VN scenes.

Its strongest functions in this test were:

- presence;
- anticipation;
- player-authored sequencing;
- visible character movement;
- independent activity;
- local discovery;
- physical intervention;
- social convergence;
- and the possibility of being elsewhere when something happens.

This is stronger evidence than v004 because these effects arose from actual movement and world timing rather than choosing locations from a menu.

### 2. NPC movement is intrinsically useful when it communicates intent or opportunity

The tester specifically wanted to chase moving characters and speak to them before they disappeared.

This supports using NPC movement as a narrative language:

- somebody leaving;
- somebody arriving;
- someone standing somewhere unusual;
- two people moving together;
- a character being sought;
- a group gradually converging;
- visible aftermath after an event.

The point is not simulation for its own sake. Movement should create curiosity, urgency, anticipation or social meaning.

### 3. Independent events should continue without waiting for the player

The tester liked that things started happening periodically and that the venue felt alive.

The player genuinely missed one scheduled information beat while elsewhere and caught others because of their location. This supports the principle that the world should continue without the protagonist while avoiding a punitive `quest failed` framing.

### 4. Discoverable practical activity is promising when it is a situated intervention

Restoring power to the radio mixer was the clearest successful non-dialogue activity.

What worked was not the fetch structure itself. The satisfying causal shape was:

```text
something the player cares about is failing
→ the player notices / understands a practical problem
→ they form their own intention to help
→ they physically intervene
→ the ongoing situation changes
```

The tester explicitly liked feeling that they were **actually doing something to help** and that the problem gave them a reason to interact with the environment.

The lesson is therefore **situated intervention**, not `environmental puzzle` or `fetch quest`.

Future practical actions should arise as directly as possible from the live human situation and preferably support more than one common-sense response. Avoid arbitrary item retrieval whose main function is to manufacture traversal.

### 5. Physical convergence can create warmth and social presence

The tester liked that actors eventually gathered into the same hall and described the environment as warm and populated.

This is a meaningful emotional function of the map. A group physically assembling can make a scene feel like a real occasion rather than a sequence of isolated conversation nodes.

## Rejected or corrected implementation directions

### 1. Do not turn dialogue into NPC state polling

The largest interaction failure was the feeling that progression required pressing `E` on every person and object in different orders to discover whether new content had appeared.

This is not acceptable as the social interaction loop.

NPCs should not behave like RPG terminals whose dialogue inventory must be refreshed manually after each world-state change.

Future interaction should communicate relevance through human and spatial cues:

- somebody calls the player's name;
- an NPC approaches;
- a visible argument begins;
- somebody has moved somewhere unusual;
- a character's pose or activity changes;
- overheard dialogue creates an obvious reason to intervene;
- a new high-semantic interaction is surfaced when the player's current context makes it relevant.

If nothing new is available, interaction should not trap the player in a redundant semantic-choice menu.

### 2. Space must not demote conversations

V003 remains stronger evidence for the desired dramatic presentation.

V005 made important conversations feel secondary to the map even though dialogue still consumed much of the actual play time. This produced the worst of both worlds: modal dialogue remained dominant in elapsed time while receiving weaker visual and dramatic focus.

Future treatment should use an explicit rhythm:

```text
lived-space exploration / observation
→ important conversation becomes the focus
→ strong VN-level authored presentation and semantic choices
→ return to the same continuous place
```

The map should supply presence, audience, timing and context; it should not force central dramatic conversations into small overhead bubbles or low-bandwidth query menus.

### 3. Ambient speech needs much stronger signalling

Independent ambient dialogue was conceptually successful but presentation was weak.

The tester reported missing the cue that something worth listening to had begun. Future versions should test:

- larger local bubbles / captions;
- clearer association with the speaking character;
- subtle mumbling / voice-like audio cues;
- stronger local camera framing;
- and possibly a short grace period when a nearby meaningful exchange starts.

The goal is to preserve unforced discovery without making important nearby speech visually ignorable.

### 4. The camera was too distant

The tester felt present in the venue but not sufficiently part of the immediate action in any room.

A closer local follow-camera should be the default direction for the next spatial prototype. The player should read nearby people, posture, speech and room detail easily while still knowing that a larger venue exists beyond the viewport.

The useful feeling is not `watch the whole simulation board` but `inhabit this local social cluster inside a larger living place`.

### 5. Do not use easy institutional conspiracy/reversal as the Managed Decline dramatic payoff

The scenario drifted toward a simplistic shape:

```text
young people uncover bureaucratic inconsistency
→ confront the responsible people
→ apparent institutional reversal
```

The tester felt this flattened the project into young messy trouble-makers complaining their way to a victory and undermined the complexity of *Managed Decline*.

Future scenarios should preserve underlying material reality even after hidden facts become clear.

For example:

- the council may genuinely lack money;
- the venue may genuinely be unsustainable on its current terms;
- commercial reuse may answer a real need;
- users can still suffer meaningful loss;
- contractors may have been given contradictory instructions without being villains;
- exposing a process failure can improve the transition without magically restoring the old funding base.

The stronger Managed Decline question is:

> **If something valuable cannot continue on its old terms, what do the people involved try to preserve, what do they accept, who absorbs the inconvenience or loss, and what arrangement can they actually make next?**

## Interaction defects that must not survive into the next prototype

### Dialogue cancellation

The initial build forced the player to choose a semantic option before leaving an opened conversation. This contaminated dialogue-choice telemetry.

A v005 hotfix now allows `Esc` / `Back out`, but cancellation should be first-class in the next implementation rather than a patch.

### Clustered NPC targeting

Raw nearest-distance targeting selected the wrong character when several NPCs were close together.

The next implementation should provide:

- visible current-target highlighting before interaction;
- player facing/direction as a strong targeting input;
- target hysteresis/stability;
- and lightweight disambiguation/cycling when required.

The player should know whom `E` will address before pressing it.

### Keyboard ownership

Global game controls remained active on the debrief form and generated invalid post-run interactions while swallowing bound letters typed into textareas.

This has been hotfixed in v005. Future implementations need explicit input contexts so gameplay controls are inactive whenever a text field or other UI owns keyboard input.

### Information provenance

The initial trace exposed wording that allowed the player to cite the briefing pack before actually reading it, because related knowledge had been acquired through another source.

Future dialogue generation/authoring must preserve **how the player knows something**, not just the underlying fact.

### NPC schedule/event coherence

Priya became interactable before her authored arrival event fired, producing a nonsensical `arrival missed` record while the player was already talking to her.

NPC movement, visibility and authored event beats must share one timeline/state source.

## What v005 does not prove

V005 does **not** establish:

- the final core loop;
- the final amount of exploration;
- that environmental tasks should be common;
- that every scenario should run continuously in real time;
- that important dialogue should occur inside the map UI;
- that the community-hall scenario is production-worthy;
- that the specific outcome structure was good;
- or that the current JavaScript interaction architecture should be retained.

It also does not provide clean evidence for individual dialogue preferences or relationship deltas because of the cancellation defect recorded in finding 002.

## Final design target for the next prototype

Carry forward this combination:

> **A close, lived diorama containing moving autonomous people and events worth noticing; occasional concrete situated interventions that arise naturally from what people are trying to do; important conversations returning to full authored VN-level dramatic focus; contextual social interaction instead of NPC polling; and materially complicated situations whose underlying scarcity or conflict cannot be abolished simply by discovering the truth.**

More compactly:

```text
LIVED PLACE
moving people + independent events + local discovery
        ↓
PLAYER FORMS A REAL INTENTION
follow / help / ask / intervene / stay / leave
        ↓
SITUATED ACTION
physical or social, whichever naturally carries the intention
        ↓
DRAMATIC CONVERSATION WHEN WARRANTED
strong VN-level focus and semantic choices
        ↓
WORLD RESUMES
people move, arrangements change, consequences remain
```

## Final status

**V005 is concluded as a directionally successful lived-space experiment with serious interaction and scenario caveats.**

Do not continue polishing *Radio Free Bellwether* merely to make this exact scenario production-quality. The next prototype should use a new scenario and test the synthesis above.