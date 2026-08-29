# Narrative Interaction Lab v008 — external playtest failure

**Date:** 2026-08-29

**Status:** external playtest evidence; v008 failed and should not be patched forward

## User feedback

> the ux was noticeably worse than before. messages in small text pop up all over the place and disappear before i could properly read them. the vn dialogue was smaller and at the bottom. the ui is so small compared to the screen space i have. I felt like i was chasing tabitha around non stop like she was just doing her own thing with me trying to tag along. we weren't really doing anything together. the dialogue was kind of complicated and had to run it twice to understand it. didn't find it fun or interesting at all.

## Failure classification

This is not a single writing miss. V008 failed in three separate layers.

### 1. Player-facing UX regression

Harness v002's generic shell silently replaced accepted same-domain presentation strengths.

Compared with v006b:

- the shell was narrower;
- focused VN presentation was substantially smaller and bottom-aligned rather than a large centred focus state;
- map feedback relied on small transient notices;
- important text could disappear before the player had finished reading it.

This violated the inheritance rule even though the runtime mechanics were more reliable.

### 2. False companionship through waypoint chasing

V008 implemented Tabitha's initiative by repeatedly moving her to the next authored location:

```text
entrance → kiosk → printer → bench
```

The player's next meaningful action was then proximity-gated at those destinations.

That creates:

```text
NPC advances sequence
→ player catches up
→ player triggers authored beat
→ NPC advances sequence again
```

This is not shared activity. It is an NPC-led obstacle course.

Accepted correction:

> **Companionship is sticky.** Once the pair are spending time together, ordinary relocation happens together unless separation, following, refusing to follow, or choosing another social focus is itself the meaningful decision.

NPC agency should appear through proposals, questions, actions, reactions, refusal, humour, mistakes and changes of mind—not by continuously becoming the next waypoint.

### 3. First-pass comprehension failure

The scene required the player to decode too much in a short span:

- archived training programme logic;
- an unused recording;
- facilitator tools;
- production direction;
- approved social activity;
- trusted peer;
- personal resilience plan;
- facilitator notes;
- callbacks to the first kiosk answer.

The player needed a second run to understand the dialogue.

Accepted correction:

> **First-pass comprehension is a release gate.** A player should be able to understand the immediate situation, conversational stakes and available responses on the first normal playthrough. Satirical subtext may reward attention; basic scene comprehension may not require replay.

## Process failure

The internal preflight correctly established runtime robustness, short dialogue turns and route completion, but incorrectly judged the build worth external testing.

The missing checks were:

1. compare actual presentation scale against the strongest accepted precedent, not just functional UI requirements;
2. cold-read the complete dialogue for first-pass comprehension rather than measuring compactness;
3. describe the social experience in relational verbs. If the description is mainly `follow / reach / trigger`, it is not reciprocal companionship;
4. verify that the second character responds to the player's direction, rather than only inviting the player into the NPC's direction.

## Recovery decision

Do not create a direct v008 correction.

Before another experimental scenario:

1. preserve harness v002's runtime reliability layer;
2. replace its generic UX baseline with a player-facing shell that restores v006b scale, focused VN and persistent situation text;
3. reproduce known-good v003/v006b strengths as an internal control;
4. only after the control passes, add one new **co-located reciprocal** interaction while keeping the recovered presentation fixed;
5. do not ask the user to test the baseline-recovery work.

## New dyadic criterion

> **Shared activity requires coupling, not merely two characters participating in the same authored sequence.**

A credible dyadic interaction should contain repeated causal exchange:

```text
Tabitha acts or proposes
→ player responds
→ Tabitha changes because of that response
→ player can initiate or redirect
→ Tabitha responds to the player's direction
→ the shared situation develops while they remain socially together
```

That is the unresolved design target after baseline recovery.
