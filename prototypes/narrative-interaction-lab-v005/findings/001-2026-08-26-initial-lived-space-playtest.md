# Initial playtest — Narrative Interaction Lab v005

Date: 2026-08-26

Status: **Directional one-tester evidence. Do not treat as final design acceptance.**

Scenario: **Radio Free Bellwether**

## Purpose

V005 was built after rejecting v004's location-menu abstraction. It tests whether a genuinely continuous small space can add something valuable to Managed Decline that a dialogue-only VN scene does not naturally provide.

The intended test was not whether walking itself is fun. It was whether physical presence can create useful activity, discovery, anticipation, continuity, spatially grounded social meaning and concrete ways to help or intervene without turning the game into a mechanical chore simulator.

## Quantitative trace summary

The run completed rather than being abandoned.

- wall-clock play time before completion: approximately **12m 41s**;
- simulated lived world time: **336.3s / 5m 36s**;
- approximately **56% of real play time occurred while world time was paused by modal dialogue**;
- **60 interactions** before completion;
- **42 dialogue choices**;
- all seven mapped areas were visited;
- approximately **25 room transitions** were recorded;
- sample distribution was approximately 57% main hall, 21% radio room, 11% foyer, with smaller visits to kitchen, courtyard, store and corridor;
- 6 of 8 scheduled ambient events were heard and 2 were genuinely missed because the player was elsewhere;
- final outcome: `formal_pause`.

Immediate ratings, 1–5:

- formed own intention without announced objective: **4**;
- moving through space changed what was noticed/chosen: **4**;
- meaningful physical agency difficult to express as dialogue only: **4**;
- place felt like it continued without waiting: **4**;
- interactions felt part of the situation rather than chores: **4**;
- preferred this treatment to the same material as dialogue-only VN: **3**;
- wanted to see what the evening led to afterward: **4**.

The numeric result is therefore **not a decisive victory over the dialogue baseline**. It is evidence that several target properties of lived-space play were successfully felt while the overall presentation/interaction quality remained weaker than v003.

## Strong positive evidence

### 1. Discoverable practical activity worked

The clearest positive feedback concerned getting the radio working.

The player liked that the mixer problem was **not announced as a quest**, could be discovered in the environment, gave them a concrete reason to explore, and made them feel they were actually helping rather than merely selecting a social stance.

The trace supports this. The player inspected the mixer early, separately asked Ben where the extension reel was, later found the reel in the store room, carried it back and powered the mixer. This was a self-maintained intention across movement, conversation, object discovery and physical resolution.

This is materially different from v004's fake `choose where to spend attention` abstraction.

However, the tester also described the exact implementation as artificial, clichéd and potentially grindy. The useful conclusion is **not `put fetch quests in Managed Decline`**. It is:

> A small concrete problem can create satisfying activity when the player discovers why it matters, understands what they are trying to make happen, and can physically contribute to it.

Future versions need stronger causal integration and preferably multiple common-sense ways to help, rather than arbitrary object retrieval.

### 2. NPC movement created pursuit and anticipation

The tester explicitly enjoyed seeing actors move around the map and reported wanting to **chase them and speak before they disappeared**.

This is strong evidence for one of the diorama's proposed functions: NPC position and movement can create anticipation and player-authored sequencing without a menu asking who to visit.

This should be preserved.

### 3. The environment felt alive because events occurred independently

The tester liked that things periodically started happening and said this made the environment feel more alive.

The trace shows real spatial consequence:

- `occupancy_sheet` occurred while the player was in the kitchen and was missed;
- later events were heard because the player happened to be near their source;
- the player moved toward the courtyard shortly before Rowan's call and heard it near the side-door area;
- the main clash occurred after several characters had physically converged.

This supports continuous world activity over a beat-selection interface.

### 4. Social convergence in physical space worked emotionally

The tester liked that the actors eventually gathered into the same hall. They described the venue as feeling **warm and populated**, like a gathering was actually happening.

This matters. A populated convergence is not merely visual decoration; it changes the feeling of a scene from `dialogue node` to `something occurring in a place with people around it`.

That is a credible advantage of the JRPG/VN hybrid format.

## Major negative evidence

### 1. Dialogue interaction regressed into exhaustive clicking

This is the largest problem.

The tester eventually felt forced to press `E` on everything and everyone in different orders to discover whether new dialogue or progression had appeared. They wanted to interact in a **common-sense, context-sensitive way** analogous to fixing the mixer, but the conversation system did not support it.

The trace strongly confirms this rather than leaving it as a vague impression:

- Ben was interacted with **12** times;
- Rowan **11** times;
- Maya **8** times;
- the choice `Any idea where the extension reel went?` was selected **6** times;
- `Is the building actually closing?` **5** times;
- `What's 'vacant possession target Monday'?` **4** times;
- several other prompts were repeated two or three times.

This is not desirable player curiosity. It is **state-polling through dialogue menus**.

The next treatment should eliminate this pattern. Characters should surface contextually changed concerns naturally, initiate conversations when appropriate, stop offering exhausted topics, and expose high-semantic choices that respond to the current situation rather than requiring the player to probe every NPC after every event.

### 2. The prototype de-emphasised conversations even though dialogue remains the strongest dramatic channel

The tester reported substantially lower immersion than v003 and specifically felt that conversations were no longer the main focus when they should have been.

This does **not** imply removing the space. The stronger interpretation is that v005 combined a useful continuous environment with a weak conversation presentation.

The trace is consistent with this. Although the world was continuous, approximately **56% of the real play session was still spent while world time was paused by modal dialogue**. Dialogue remained most of the actual elapsed experience, but visually and interactively it had been reduced to a secondary overlay.

The next treatment should therefore be hybrid in presentation as well as architecture:

> exploration / observation in the diorama → strong authored conversation focus when a conversation matters → return to the same continuous place.

The spatial layer should not force the dialogue layer to become tiny ambient UI.

### 3. Ambient speech did not command attention correctly

The tester felt that overhead speech bubbles lacked a strong cue that something worth listening to had begun. Suggested improvements included larger, more readable bubbles and diegetic mumbling / voice-like audio cues.

This is a presentation problem rather than evidence against ambient events.

The underlying independent-event system was positively received. The signalling needs improvement.

### 4. The camera was too distant

The tester said the map made them feel present in the venue but **not part of the immediate action in a room**. The map was too zoomed out.

This is important for the visual target. The diorama should communicate a whole living place without making the player emotionally remote from the local cluster they currently occupy.

A stronger next test should use a closer camera / viewport with enough local framing that nearby actors, posture, bubbles and room detail become legible, while movement still reveals the broader venue.

### 5. The scenario's political framing was too easy and morally flattening

The tester disliked the feeling that a group of young people could uncover a bureaucratic conspiracy, complain loudly and thereby produce a meaningful reversal. They specifically felt this drifted toward `young messy and woke trouble makers` and undermined the beauty/complexity of Managed Decline.

This criticism should be accepted as a scenario-design failure, not defended as satire.

The external material condition should remain real:

- the council may genuinely lack money;
- the building may genuinely be financially unsustainable;
- commercialisation / disposal may have legitimate practical rationale;
- people using the building still have real commitments and losses;
- contractors may be acting on incorrect or simplified instructions without being villains;
- exposing a process failure should not magically restore the funding base.

The more Managed Decline-specific dramatic question is therefore not `can we expose the bad closure?` but something closer to:

> **Given that something valuable probably cannot continue on its old terms, what do these people try to preserve, what do they accept, who gets inconvenienced or displaced, and what new arrangement can they actually make?**

A delay, correction or better transition may be possible. A moral victory that abolishes the underlying scarcity should not be the default payoff.

## Concrete implementation defects exposed by the trace

### Feedback-form keyboard capture

The global keyboard handler continues intercepting gameplay keys while textareas are focused. The tester could not type letters bound to movement/interact controls into the feedback form and had to type elsewhere and paste the response.

This is a clear bug. Gameplay key handling must ignore `input`, `textarea`, `select` and contenteditable targets, and active movement keys must be cleared when entering the debrief.

The exported trace also contains **23 extra `exit` interaction events after `run_finished`**, confirming that gameplay input/event recording remained active after completion.

### Repeated exhausted affordances

The side door was interacted with **11 times** before completion, and the mixer **6 times**. Some of this was deliberate checking, but combined with the tester's description it indicates poor state signalling and failure to retire or transform resolved affordances.

Once an object's meaningful state has been established, its prompt should change clearly or disappear unless a genuinely new action is available.

### Knowledge / dialogue provenance mismatch

At world time 161.9 the player could tell Ben that the `briefing pack assumes vacant possession Monday` **before the briefing pack was dropped at 166 and read at 170.6**.

The player had learned related information from Rowan's courtyard call, but the dialogue option falsely attributed that knowledge to a document they had not seen. Information provenance must survive into dialogue wording.

### Priya arrival timing incoherence

The player interacted with Priya at world time 221.1, before the scheduled `priya_arrives` event at 222. The arrival event then registered as missed while the player was already talking to her in the hall.

NPC visibility/movement scheduling and authored ambient arrival beats need one source of truth.

## Working conclusion

V005 gives enough evidence to reject the earlier fear that continuous exploration merely adds dead walking.

The successful pieces were specific:

- discovering a concrete reason to act;
- physically helping;
- moving through a compact place;
- seeing NPCs go somewhere and wanting to follow;
- events continuing without the player;
- missing some information because of where the player was;
- people physically converging into a populated social event.

Those are real experiential gains that a pure VN does not provide as naturally.

But v005 also demonstrates that **space cannot be allowed to demote the narrative presentation or turn dialogue into an exhaustive query interface**.

The next design target should therefore not be `add more mechanics`.

It should be:

> **Keep the lived space, moving people and discoverable practical agency, but restore v003-level conversational focus and make social interaction as context-sensitive and common-sense as the successful physical interaction.**

The prototype is directionally useful but not concluded as proof of the final Managed Decline activity spine.
