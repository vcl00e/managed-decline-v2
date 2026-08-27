# Final conclusion — Narrative Interaction Lab v006

Date: 2026-08-26

Status: **Concluded — mixed synthesis evidence; spatial/VN value retained, temporal interaction grammar rejected**

## What v006 was trying to establish

V006 was the first direct synthesis test after v003 and v005.

It asked whether:

- a continuously inhabited compact space;
- meaningful physical/spatial actions;
- and v003-style focused VN conversations

could operate as one causal experience rather than alternating as separate modes.

The scenario reused Tabitha deliberately so the test would not confound the hybrid structure with an unproven lead character.

## Overall result

V006 produced **important positive evidence for both ends of the hybrid**, but the implementation connecting them failed.

The tester valued spatial presence in several specific moments:

- knowing where Priya would arrive and reacting to that arrival spatially;
- being invited physically into Tabitha's private room;
- making a bedroom-access decision;
- and especially the final choice to leave with Tabitha or remain at the flat.

The tester later clarified that important conversations **did benefit from focused VN treatment and that the VN presentation increased immersion**.

However, the continuous-world layer was paced by a fixed invisible schedule. Between authored beats, the player frequently had nothing meaningful to do and could not naturally join NPC activity. This created:

- dead time;
- anticipatory scrambling;
- polling pressure;
- a feeling of being ignored by active NPCs;
- and loss of control over pacing.

Therefore v006 does **not** establish the intended synthesis as implemented.

The correct conclusion is not "remove the diorama" and not "remove VN scenes".

> **Keep continuous social geography and focused VN drama, but reject continuous fixed-rate time and non-participable NPC choreography as the connective tissue between them.**

---

# Accepted design evidence

## 1. Spatial embodiment is valuable when location itself has social meaning

The strongest spatial evidence did not come from generic exploration.

It came from moments where moving or occupying space changed the human meaning of the situation.

Examples from the test:

- entering Tabitha's room made an invitation into private space feel significant;
- Priya's arrival created anticipation because the entrance had a known physical location;
- deciding whether to remain at the flat or leave with Tabitha produced an immediately legible social and spatial consequence.

This suggests a more precise purpose for the diorama:

> **Space is valuable when crossing, remaining, approaching, following, leaving or being absent changes social meaning.**

The diorama should therefore prioritise:

- public/private thresholds;
- arrival and departure;
- audience;
- proximity;
- accompaniment;
- joining or avoiding a group;
- visible aftermath;
- and choices about where the protagonist puts themselves.

Walking distance for its own sake remains low value.

## 2. Focused VN presentation remains the preferred high-bandwidth mode for important conversation

The original debrief question failed to measure this cleanly because nearly all important conversation had already been promoted into VN presentation.

Post-playtest clarification is positive:

> **Important dialogue felt more immersive in focused VN presentation.**

The next question is therefore not whether important conversation should remain on the map.

It is:

> **When does a live social situation become important enough to justify switching into focused VN bandwidth?**

The desired architecture remains:

```text
lived space / ambient interaction
→ dramatic threshold
→ focused VN conversation
→ return to the same world
```

## 3. Expressive agency and situation divergence are different and both matter

V006's debrief incorrectly bundled several kinds of consequence together.

The tester clarified that the semantic choices often mattered because they changed how the player framed their own role in the situation, even when the external plot changed little.

This is useful **expressive agency**.

Choices can define:

- whether the protagonist sees themselves as responsible;
- whether they defer to another person's authority;
- whether they prioritise honesty, privacy or diplomacy;
- whether they intervene or deliberately stay out.

Not every such choice needs a large branch.

But the game should distinguish three consequence levels:

### A. Self-definition

What stance did the player choose?

### B. Fictional acknowledgement

How did relevant characters interpret that stance?

### C. Situation divergence

Did the action materially change what happens next?

A strong narrative system should support all three without demanding level C from every expressive choice.

## 4. Positioning/commitment choices can carry especially strong agency

The final **leave with Tabitha / stay at the flat** choice was the strongest choice in v006.

It worked because it simultaneously changed:

- physical presence;
- social priority;
- what the protagonist would participate in next;
- and the visible trajectory of the scene.

The player did not need a meter or explanation to understand the consequence.

This supports a major Managed Decline pattern:

> **High-consequence choices often concern presence, commitments, access, disclosure, resources or irreversible action rather than merely selecting a conversational attitude.**

Expressive dialogue choices and larger commitment/positioning choices should coexist.

---

# Rejected implementation directions

## 1. Reject the fixed master timeline as the default live-space pacing model

The prototype advanced through a sequence of global timestamps regardless of whether the player had meaningful activity available.

This caused the player to recognise the invisible machinery and search for ways to spend time before the next authored beat fired.

The failure was not simply "real time is bad".

The stronger distinction is:

> **Time the player chooses how to spend can feel lived. Time they must burn until a script advances feels like waiting.**

Future live-space scenes should use causal beats, event prerequisites, loose windows and time compression rather than a rigid second-by-second master script.

## 2. Reject the false binary of NPC polling versus NPC inaccessibility

V006 correctly tried to avoid turning NPCs into dialogue terminals.

But it overcorrected: Alex and Priya could move and conduct a viewing while the player was largely unable to participate.

This produced the feeling of being ignored.

The correct interaction unit should be:

> **the live social situation**

rather than:

> **the NPC's refreshed dialogue inventory**.

For example, when Alex is showing Priya the flat, possible actions are not necessarily `Talk to Alex` and `Talk to Priya`.

They may be:

- join the viewing;
- stay with Tabitha;
- hang back and listen;
- leave them to it;
- answer if addressed;
- intervene when a threshold or decision becomes relevant.

This preserves contextual participation without restoring exhaustive polling.

## 3. Do not create spatial breadth without semantic breadth

The tester felt several areas of the flat were effectively irrelevant because most meaningful action occurred around Tabitha's room and the damp.

A room should earn its existence through a distinct social function, not merely architectural realism.

The production direction should be:

> **compact interactive topology, rich environmental texture.**

A small space can still feel lived-in through possessions, furniture, clutter, personal history and visual detail without every area becoming a separate interaction zone.

---

# Corrected interpretation of the original success criteria

## Spatial moment that would lose meaning as dialogue-only

**Supported.**

Priya's arrival and entering Tabitha's room are clear examples.

## Important conversation benefits from focused VN presentation

**Supported after clarification.**

The original debrief question was malformed; the tester later stated that focused VN treatment increased immersion.

## Spatial/material decision changes later drama

**Partially supported.**

The bedroom access decision did alter later scene framing, but the effect was not especially salient compared with the final positioning choice.

## VN/dialogue choice changes the resumed world

**Weakly supported for most semantic choices. Strongly supported for the final stay/leave decision.**

The criterion itself should be split into self-definition, acknowledgement and actual situation divergence.

## Player forms own intention

**Supported.**

The tester formed a stance around diplomacy, personal boundaries and allowing Alex/Priya to make their own decisions.

## Player understands what they are preserving

**Partially supported.**

The tester could articulate their own stance but lacked enough prior context about Tabitha and Alex's responsibilities to know precisely whose obligation the viewing was.

## Little/no pressure to poll

**Failed.**

Both runs reported pressure to search for refreshed content or interactions.

## Timed world creates convincing life rather than arbitrary anxiety

**Mixed, overall failed.**

Priya's arrival created good spatial anticipation. The larger fixed schedule created dead-time and pacing anxiety.

---

# Interaction defect affecting evidence

The final consequence summary in one run incorrectly reported the player's quiet promise as broken after the player chose to let Alex explain the damp.

The underlying state model had actually resolved that commitment as kept.

This mismatch contaminated the consequence-feedback measure.

Future tests must ensure outcome summaries are derived from the actual resolved commitment state rather than a broader condition such as `dampDisclosed`.

---

# What v006 does not prove

V006 does **not** prove:

- that the full diorama production cost is justified at campaign scale;
- that all important conversations need exactly the same VN treatment;
- that every scene should run in real time;
- that every semantic dialogue choice needs large external divergence;
- that the flat-viewing scenario is production-worthy;
- that the final arrangement ecology is solved;
- or that multiple simultaneous commitments can be handled coherently.

It also does not provide clean evidence against consequence persistence in principle because one outcome summary was incorrect and the debrief bundled different consequence constructs together.

---

# Final design correction

The next synthesis target should be:

```text
CONTINUOUS SOCIAL GEOGRAPHY
people + thresholds + audience + movement
        ↓
ELASTIC DIEGETIC TIME
compress periods with no meaningful presence/observation/action
        ↓
LIVE SOCIAL SITUATION
NPC activity can be joined, avoided, followed or observed
        ↓
PLAYER POSITIONS THEMSELVES
approach / remain / withdraw / accompany / intercept / stay elsewhere
        ↓
FOCUSED VN CONVERSATION WHEN WARRANTED
high-bandwidth authored presentation + semantic choices
        ↓
RETURN TO THE SAME WORLD
consequences and changed participation become legible
```

The key spatial rule is:

> **Simulate meaningful presence, not elapsed seconds.**

The key interaction rule is:

> **Make situations participable without turning people into content terminals.**

---

# Final status

**V006 is concluded as a mixed but highly informative synthesis test.**

Retain:

- compact lived space;
- socially meaningful thresholds;
- arrivals/departures;
- positioning and commitment choices;
- focused VN treatment for important dialogue;
- expressive semantic choices.

Reject or redesign:

- fixed global event timing;
- empty real-time gaps;
- NPC activity the player can see but not naturally join;
- spatial areas without distinct narrative function;
- debrief measures that conflate expression, acknowledgement and causal divergence.

The direct corrective experiment is **v006b**, using the same scenario but replacing the fixed timeline with elastic time and live-situation participation. Do not expand to a larger v007 arrangement ecology until that correction succeeds.
