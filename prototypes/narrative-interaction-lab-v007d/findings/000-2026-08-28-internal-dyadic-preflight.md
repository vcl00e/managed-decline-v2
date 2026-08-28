# Narrative Interaction Lab v007d — internal dyadic interaction preflight

**Date:** 2026-08-28

**Status:** internal readiness evidence; not a user playtest finding

## Purpose

V007d isolates the one-to-one interaction problem exposed by the failed v007c external playtest.

The targeted question is:

> **Can one-to-one time with a character become intrinsically engaging when conversation is braided through a concrete shared activity, both participants take initiative, and the player repeatedly changes what happens through short contextual actions and responses?**

This preflight does **not** claim that the interaction is fun. It checks whether the build has actually moved beyond the previously failed structure of `walk to trigger → receive monologue → choose authored relationship stance → receive payoff` far enough to justify an external test.

## Exact-branch technical verification

GitHub Actions verified the committed `prototype/narrative-interaction-lab-v007d` branch.

The exact branch passed:

- JavaScript syntax checks;
- **14/14** dyadic interaction / regression tests;
- HTTP runtime smoke test.

The automated tests establish structural facts only. In particular they verify that:

- Tabitha initiates without player input;
- different first-attempt actions produce different physical and interpersonal state;
- a cautious path can continue without touching the vinyl banner;
- player discoveries change later state and who receives credit;
- the interaction cannot complete through time advancement alone;
- ending state retains conduct-dependent differences;
- the final spatial continuation begins before the run ends;
- a cooperative route contains physical action, discovery, movement and resolution;
- skeptical conduct casts a later shadow;
- cautious conduct changes the final callback;
- the player can leave without completing the investigation;
- the focused exchange is a repeated-turn graph rather than an intro monologue;
- player options avoid the relationship-slogan language that failed in v007c;
- ordinary play contains no dashboard, action log, objective list or developer panel.

## Shared activity used for the experiment

Outside the community hall, a vinyl banner reading **COMMUNITY RESILIENCE HUB** has been fixed over part of the older stone frontage.

Tabitha notices that it appears to cover the building's original carved name and investigates it.

This was chosen because it supplies a small concrete shared problem without turning the evening into a crisis:

- incomplete physical information;
- things both people can do;
- reasons to move around the building;
- opportunities to help, challenge, hang back or redirect;
- a reason for Tabitha's old-building knowledge to become relevant rather than delivered as biography;
- a natural boundary between light map interaction and a focused conversational exchange.

## Rendered whole-interaction preflight

The local implementation was exercised through a rendered Chromium page with actual keyboard movement and contextual interaction.

### Cooperative run played

The complete run was:

```text
Tabitha independently notices the covered stonework
→ walks to the banner and starts investigating
→ player physically follows her
→ player holds the loose corner of the vinyl
→ player reads the exposed stone letters
→ Tabitha infers there may have been an old entrance round the side
→ Tabitha independently walks around the building
→ player physically follows
→ player inspects the brick seam
→ focused exchange opens only after the shared investigation has produced something to discuss
→ Tabitha says: “There. You found the edge of it. Look lower down.”
→ player chooses [Run your fingers along the joint.]
→ player discovers a rust rectangle and old screw holes / hinge scar
→ Tabitha reacts to that physical discovery
→ player confirms the doorway inference
→ Tabitha independently goes to check a surviving plaque
→ player physically follows and examines it
→ the plaque reveals READING ROOM
→ player chooses to keep circling the building
→ Tabitha physically heads toward the back/low-wall area
→ only after that spatial continuation occurs does the run finish
```

## Readiness questions

### 1. What did the player actually do with Tabitha?

The answer is now concrete rather than `selected supportive dialogue`:

- followed her to something she noticed;
- held part of the banner while she looked behind it;
- read exposed lettering;
- followed her around the building;
- inspected a masonry seam;
- physically discovered an old hinge position;
- tested / confirmed her interpretation;
- followed her to a surviving plaque;
- chose whether to keep investigating, go inside or leave.

**Internal answer:** passes the minimum interaction bar.

### 2. What did Tabitha initiate?

She does more than deliver dialogue:

- notices the banner/stone mismatch herself;
- walks to the banner without player command;
- starts trying to inspect it;
- forms an inference from what the pair find;
- decides to check the side of the building;
- physically goes there;
- responds to the player's discoveries and skepticism;
- later decides to check the plaque;
- physically moves again;
- participates in the chosen continuation.

**Internal answer:** reciprocal enough to justify external testing.

### 3. Can the interaction change before the ending?

Yes.

The first participation can be:

- cooperative / player holds the banner;
- player uses a phone torch;
- Tabitha-led / player lets her handle it;
- cautious / player tells her not to peel council property.

Later the player can:

- find the letters themselves;
- inspect other stonework;
- challenge Tabitha's initial inference;
- find the hinge evidence;
- accept or resist the doorway interpretation.

Those differences alter later state and callbacks before the final continuation.

### 4. Does character information emerge from activity?

The focused exchange can reveal that Tabitha learned to read altered civic buildings while working at an old library, but only if the player asks **“How do you know?”** after she correctly identifies a doorway pattern.

Her response is tied to the immediate activity:

> “Library job. Old buildings teach you where people used to be allowed in.”

If the player does not pursue that question, the interaction can continue without the biography branch.

**Internal answer:** substantially improved over v007c's exposition block.

### 5. Are player options natural in the immediate context?

Focused options include things such as:

- `How do you know?`
- `Could still just be a repair.`
- `[Run your fingers along the joint.]`
- `You are enjoying this way too much.`
- `[Check the rust mark instead of answering.]`
- `All right. Show me the bit you mean.`

They are responses to the current shared object / claim, not explicit relationship-design statements such as `I'm interested in the real you`.

**Internal answer:** sufficiently natural for external evaluation, though actual voice quality remains unproven.

### 6. Does focused VN operate as interaction rather than monologue?

The focused section begins with one current Tabitha line and gives the player an immediate response/action. Subsequent nodes are short Tabitha reactions followed by another player response or a return to the map.

One path:

```text
TABITHA
“There. You found the edge of it. Look lower down.”

PLAYER
[Run your fingers along the joint.]

TABITHA
“There. Rust rectangle and two screw holes. That is better evidence than my entire speech.”

PLAYER
“So it was a door.”
```

Physical discovery is applied during the focused exchange and changes the world state.

**Internal answer:** yes structurally. Whether it feels genuinely conversational rather than a branching dialogue graph remains an external question.

### 7. Can the player stop or redirect?

Yes:

- ignore Tabitha's initial curiosity;
- leave the area;
- go inside rather than investigate;
- avoid touching the banner;
- challenge the interpretation;
- decline to follow her around the side;
- stop after partial investigation;
- choose inside / further exploration / leaving after resolution.

The interaction does not require a fixed timer or completion to let the run proceed/finish.

### 8. Is the activity still something without relationship labels or rewards?

There is no relationship meter, mandatory future plan or declared `character_discovery completed` reward in v007d.

The immediate reward is the joint activity itself: noticing, testing, discovering, being right/wrong together, and changing how the pair coordinate.

**Internal answer:** it now has enough intrinsic interaction to test. Whether the clue hunt is actually entertaining is unresolved.

### 9. Would the reviewer voluntarily continue interacting with Tabitha?

The rendered cooperative run created enough curiosity to continue from frontage → side wall → plaque without needing a relationship reward as motivation.

This is a meaningful improvement over v007c, where the motivation to continue was largely authored dialogue / promised relationship progression.

**Internal answer:** yes for this short prototype, with reservations below.

## Regression / quality issue found during rendered preflight

The initial local implementation ended immediately after the final continuation choice, so selecting `keep looking` could send the player directly to the debrief before the spatial consequence was actually experienced.

That repeated a class of problem already corrected in v006b: a spatial/social choice should visibly change what happens next when causally warranted.

It was corrected before external playtest.

Current behaviour:

- `Keep circling the building` makes Tabitha physically head toward the back / low-wall area and say that she wants to look for another old room marker;
- `Go inside` makes her physically head back toward the entrance;
- the run finishes only after the chosen movement has begun / reached its intended continuation point.

A regression test protects this ordering.

## What remains genuinely unresolved

This internal pass **does not prove**:

- that investigating an old building is intrinsically fun rather than merely more interactive;
- that the contextual prompts feel natural rather than like a small adventure-game puzzle;
- that Tabitha's short dialogue now sounds convincingly human;
- that the clue sequence is too authored / linear despite offering local variation;
- that the interaction produces enough interpersonal progression without explicit relationship language;
- that the same dyadic grammar generalises to very different activities such as cooking, walking, helping, watching something, shopping, travelling or hanging out;
- that focused VN is the right presentation for every conversational beat.

These are appropriate external playtest questions.

## Internal readiness conclusion

V007d clears the specific failure that blocked another useful playtest of v007c:

> **The player and Tabitha now reciprocally do something together, and conversation emerges from that activity instead of replacing it.**

The correct external question is therefore:

> **Did this feel like actually doing something with Tabitha and getting to know her through the interaction, or did it still feel like walking through a small authored investigation?**
