# V004 rejected prototype conclusion

**Date:** 2026-08-26

**Status:** **Rejected before formal playtesting. Concluded as an invalid implementation of the intended research question.**

## What v004 was supposed to test

The unresolved design question after v003 was:

> **What does the player repeatedly do, moment to moment, that makes authored narrative better rather than interrupting it?**

V003 had already shown that a tightly authored dialogue-led scene could be highly compelling. The next prototype therefore needed to discover whether a concrete activity / spatial layer could contribute something that dialogue alone could not naturally provide, without turning Managed Decline into a mechanical game with story bolted on.

The intended candidate loop was roughly:

```text
arrive somewhere
→ notice what is happening
→ decide where / who to engage
→ do something concrete
→ other things continue
→ situation evolves
→ continue
```

The key research burden was not to prove that `attention` was the answer. It was to discover what actual player activity should feel like.

## What v004 actually implemented

V004 turned that question into three controlled browser conditions built around the already-used **Community Compass / Tabitha** material:

- **A — Dialogue baseline:** authored dialogue progression.
- **B — Spatial attention:** choose among abstract locations and commit each beat to a place / contextual action.
- **C — Situated obligation:** the same structure with hidden library-work backlog accumulating when ordinary work was ignored.

Movement between locations was free, but the meaningful unit remained a scripted beat. In the workshop, the player explicitly selected `Stay for the next part`; elsewhere they selected a contextual action and thereby spent the beat away from the scene.

This was internally coherent as a controlled experiment, but it was not an adequate experiential representation of the design question.

## Why the prototype was rejected

The prototype was inspected and rejected before formal playtesting because its interaction model made the comparison largely meaningless.

### 1. It simulated space as a menu, not as inhabitation

The player did not actually:

- walk through a place;
- see people moving;
- overhear something because they were nearby;
- notice somebody in an unusual location;
- follow a character;
- linger;
- interrupt;
- encounter an object while doing something else;
- physically leave a conversation;
- or discover a problem through the environment.

Instead, the spatial conditions were effectively:

```text
choose location
→ choose action
→ advance authored beat
```

That tests additional navigation / selection overhead, not the value of a lived physical world.

### 2. `Attention` was prematurely formalised rather than discovered

The design discussion had identified attention as a promising structural property: more things may deserve attention than the player can fully engage with.

V004 incorrectly converted that hypothesis into the explicit experimental mechanism:

> **one beat = one meaningful attention commitment**

This baked the proposed answer into the prototype before establishing that this is how Managed Decline should actually feel.

The prototype therefore asked whether the player liked an authored `attention allocation` abstraction rather than observing how players naturally direct attention in a living situation.

### 3. The obligation condition tested backlog pressure, not meaningful routine

Condition C added a hidden work backlog and diegetic descriptions of service pressure.

Although hidden rather than exposed numerically, the underlying activity was still a sequence of contextual `work actions` selected to clear accumulated pressure.

This did not adequately test the accepted work principle:

> **Simulate commitments, not chores.**

The project needed to discover when ordinary activity becomes interesting because of the human situation around it, not whether a hidden chore queue can create tension against a dialogue scene.

### 4. Reusing Community Compass biased the prototype toward the already-successful format

Community Compass was deliberately built as a tightly authored short-form dramatic scene and had already performed strongly in v003.

Reusing the same material was defensible for experimental control, but counterproductive for the next design problem.

The resulting comparison was too close to:

> **Do you prefer this successful VN scene, or the same successful VN scene with additional spatial / work controls?**

That is not the interesting question.

The activity layer needs to demonstrate a compelling experience that the dialogue-only form cannot naturally provide.

### 5. Simultaneity and missing events were authored branches, not lived world behaviour

Events did not genuinely continue through independent actor/world behaviour. A player spent a scripted beat at one location and the workshop beat was marked attended or missed.

This made `missing something` a branch-selection property rather than the consequence of inhabiting a world in which multiple people and activities continue without the protagonist.

The distinction matters because the desired emotional effect is:

> **The world continued without me.**

not:

> **I selected the branch where I miss event 4.**

### 6. The experiment optimised methodological cleanliness over experiential validity

The central mistake was confusing a clean A/B/C experimental structure with a useful game prototype.

The user rejected the prototype because it did not actually instantiate the player experience under investigation. A controlled comparison cannot rescue an invalid treatment.

## Evidence status

There is **no formal v004 playtest dataset** and no quantitative result should be inferred.

Do **not** use v004 as evidence that:

- continuous exploration is weak;
- ordinary obligations are weak;
- attention is or is not the core activity;
- a VN baseline is necessarily superior;
- or players dislike spatial narrative activity.

Those questions were not validly tested.

The evidence v004 does provide is methodological:

> **A prototype must represent the experiential property being investigated at the level the player actually feels it. Abstracting that property too early can produce a clean experiment that answers the wrong question.**

## What should have been built instead

The corrective target was a single small but genuinely continuous environment in which the player could naturally:

- move through nearby spaces;
- see characters move independently;
- approach or leave people;
- overhear local events;
- notice changes because of physical proximity;
- interact with a few concrete objects / situations;
- have at most one extremely light ordinary responsibility;
- allow events to continue while elsewhere;
- and form intentions without the game explicitly declaring an `attention` system.

The research question then becomes observational:

> **What does the player naturally start doing, and which of those behaviours make the narrative better?**

Examples of useful behaviour to observe:

- following somebody because their movement creates curiosity;
- staying with a person because their company matters;
- abandoning an ordinary task when something more important happens;
- finishing the task first for role / personal reasons;
- overhearing something while en route somewhere else;
- returning to discover that something happened without the player;
- physically helping in a way that dialogue alone cannot express.

Only after observing such behaviour should the project abstract a core loop from it.

## Carry-forward requirements

The next prototype should therefore:

1. **Use a new scenario.** Avoid replay fatigue and avoid building the experiment around a scene already proven in dialogue form.
2. **Use genuinely continuous space.** No location-selection abstraction as the principal representation of exploration.
3. **Let actors and events continue independently.** Presence and absence should emerge from where the player actually is.
4. **Include concrete physical affordances only where their physical form matters.** Avoid mechanics added merely to increase activity count.
5. **Do not expose or formalise `attention` as the answer.** Let prioritisation emerge from the situation.
6. **Observe player-created intentions and sequencing.** Derive the activity spine from behaviour rather than enforcing it upfront.
7. **Judge the added layer by its unique contribution.** The burden is to produce something desirable that would disappear if the same material were reduced to a VN.

## Final conclusion

V004 is a **failed prototype, but a useful methodological failure**.

It should remain in the repository as historical evidence of what *not* to test:

> **Managed Decline's activity layer cannot be discovered by bolting an abstract location/attention system and a hidden chore backlog onto an already-successful dialogue scene.**

The correct next step was to build a new scenario as a genuinely inhabited continuous place and observe what forms of physical, spatial and social activity become intrinsically valuable to the narrative.

That corrective direction led directly to v005.
