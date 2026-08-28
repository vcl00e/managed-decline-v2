# v007c internal experience-value preflight

**Date:** 2026-08-28

**Status:** internal readiness evidence; not an external playtest finding

## Why this preflight exists

V007b passed the earlier regression/topology gate yet still failed badly in external play because the one-to-one route was **reachable but nearly empty**.

The player chose to stay with Tabitha and received:

- a short opening;
- a thin choice/reaction;
- an almost contentless “stay here together” interval;
- very little focused character material;
- then a sudden ending.

The external reaction was effectively: **“was that it?”**

That exposed the anti-pattern now called **empty freedom**: the game technically permits a player preference but gives little worthwhile experience for choosing it.

V007c is therefore evaluated under two independent gates:

1. regression safety — prior accepted interaction/UI findings remain protected;
2. positive experience value — the major routes the prototype invites must contain credible experiences worth choosing.

This file records the second gate in addition to technical/regression verification.

---

# Technical / regression verification

The committed `prototype/narrative-interaction-lab-v007c` branch was verified by GitHub Actions after the latest runtime corrections.

The exact-branch verification job passed:

- JavaScript syntax checks;
- state / route tests;
- UI / regression tests;
- content-bandwidth tests;
- Experience Contract preflight tests;
- HTTP runtime smoke test.

The current test suite includes guards for:

- a substantive Tabitha route before payoff;
- no ending unlock from one short scene plus time advancement;
- a concrete private plan / motif;
- no group-scene requirement for Tabitha;
- independent group access;
- Priya self-settling without shepherding;
- valid early/solo leaving;
- minimum authored bandwidth in the private scene;
- no dashboard/action-log/debug UI regression;
- observer play without forced group VN;
- sustained private intention rather than repeated “stay” confirmations;
- no unrelated Priya arrival inside the shared/private feedback window;
- no long-distance NPC movement snap-back that could make a social destination unreachable.

These checks establish structure and regression safety. They do not, by themselves, establish that the writing is enjoyable.

---

# Complete rendered Tabitha-route preflight

A complete rendered quiet-player route was exercised through actual keyboard interaction in Chromium using the locally equivalent final build. Direct navigation to localhost/file URLs is restricted in this environment, so the build was injected into a browser page for interaction.

The route was completed end-to-end after the final runtime corrections.

## Beat 1 — arrive together

The map begins with the player and Tabitha outside the hall while Maya and Alex are already inside.

The contextual prompt is:

> **Spend a moment with Tabitha**

The opening focused scene establishes the hall’s laminated community notices as a shared joke rather than immediately presenting the radio group as the next required content.

The quiet-player choice used in preflight was:

> **“Let’s not go in yet.”**

Tabitha responds specifically and stays outside.

The map then visibly reflects the decision rather than merely recording it in telemetry:

> **Tabitha stays outside with you and turns toward the noticeboard.**

No repeated “do you still want to stay?” choice is required.

## Beat 2 — shared activity in lived space

The next relevant map affordance is the physical noticeboard.

The pair read it together. The favourite becomes:

> **“Social Connection Drop-In — booking essential.”**

This is deliberately a lightweight environmental interaction rather than a notice-reading minigame. Its function is to give the companionship something shared to notice and establish a private comic motif.

The map acknowledges that the object is now part of the relationship context rather than generic scenery.

## Beat 3 — substantive focused private conversation

The shared notice/building context opens the focused VN scene:

> **The person outside the programme**

The conversation is specific to Tabitha’s accepted character identity rather than generic “introvert / social battery” writing.

It develops through:

- the phrase “community resilience” reminding her of follow-up workshops after the notorious council educational campaign;
- her joke that the institutional response to accidentally turning a safeguarding character into an internet meme was more branded stationery;
- irritation/amusement at how people who recognise her assume they already know which conversation they are entitled to have with her;
- the distinction between the searchable public symbol and her actual earlier life as a library worker;
- her genuine knowledge of old civic buildings and their strange physical history;
- her noticing that the player stayed outside and looked at the place with her instead of immediately asking for the famous “lore.”

The preflight used the choice:

> **“Tell me one thing about you that has nothing to do with that video.”**

That produces a character-specific development rather than generic reassurance:

- Tabitha notices the original stone plaque beneath the modern vinyl “Resilience Hub” sign;
- explains that the hall used to be an institute;
- reveals her eye for municipal architecture;
- offers to show the player an old library near the station with a ridiculous carved ventilation tower;
- qualifies the invitation with: do not call it a date unless it becomes one by accident.

The scene therefore produces actual new knowledge, interpersonal meaning and a concrete future possibility.

## Beat 4 — changed lived-space context

Returning to the map does not reset the social situation.

Visible result:

> **Tabitha has offered to show you the old library and its absurd ventilation tower tomorrow.**

Tabitha then moves toward the side yard. The player physically follows if they want to continue the one-to-one route.

A rendered preflight caught a runtime bug here: the previous NPC synchronisation code could snap a character making a long move back toward their original spawn. This made the callback structurally present but physically unreachable.

That bug was fixed before external playtest. A regression guard now protects against its return.

## Beat 5 — callback / payoff

At the side yard the player reaches:

> **Sit on the low wall with Tabitha**

The callback scene does not start from zero. For the old-library route, Tabitha has checked the plaque and says it dates from 1908. She jokes that a vinyl “Resilience Hub” banner has been placed over more than a century of the building’s actual name and reiterates the library plan.

The preflight then chose:

> **“Let’s just walk toward the station from here.”**

The route ends through an actual shared next action rather than an arbitrary time cutoff.

Tabitha’s final response includes:

> “Come on. We can judge municipal typography on the way.”

Only after that payoff does the debrief open.

---

# Route-value review — Tabitha one-to-one

## 1. What did this player want?

Meaningful time with Tabitha instead of consuming the available group activity.

## 2. What worthwhile experience did the route provide?

The route now contains:

- a focused opening;
- a shared environmental joke/activity;
- a substantive character-specific private conversation;
- new personal information;
- a meaningful response choice;
- a concrete future arrangement;
- a changed map/social state;
- physical continuation to another part of the space;
- a plan-specific callback;
- an earned leave-together payoff.

It is no longer “group content removed.” It is its own route.

## 3. What did the player learn, feel, do or share?

The player learns something about Tabitha beyond her public parody hook:

- her former library work;
- her familiarity with old civic buildings;
- the gap between being a searchable political/internet symbol and being an ordinary person with specific interests;
- the fact that she notices whether somebody approaches her as a person or as a story they already know.

The pair also create a specific shared context from the hall itself rather than discussing character lore in an abstract void.

## 4. How does the experience develop?

The route moves through:

```text
incidental joke about the building
→ shared observation
→ public-symbol / private-person distinction
→ player stance toward that distinction
→ concrete future invitation
→ physically follow the relationship into another space
→ callback that proves the earlier moment persisted
→ leave together
```

That is materially stronger than v007b’s static “remain together until ending” structure.

## 5. Is there enough high-value material for the interest invited?

Internally: **yes, enough to justify external testing.**

The route contains a substantial focused scene and a complete experiential arc. This does not prove the player will like the writing, but it removes the obvious content starvation that should never have reached the previous external playtest.

## 6. Is the presentation bandwidth appropriate?

Internally: **yes.**

The route alternates:

```text
map presence
→ focused opening
→ map/shared object
→ high-bandwidth private VN
→ map movement
→ focused callback
→ physical/social exit
```

It therefore restores the v006b principle that important semantic conversation can benefit from focused VN presentation without turning every small interaction into VN.

## 7. Is there a payoff?

Yes. The private scene creates one of several concrete possibilities:

- breakfast;
- a station walk built around the notice-ranking joke;
- an old-library / municipal-architecture outing.

The later callback reincorporates the chosen plan. Leaving together is an actual lived next action, not merely a summary card.

## 8. Does the route produce something rather than merely suppress other content?

Yes. It produces character knowledge, a private motif, an arrangement, changed behavior/position and later residue.

## 9. Would the route look worth choosing if the player knew what it contained?

Internal judgment: **yes, sufficiently to justify external testing.**

It offers a distinct pleasure from the radio group: specific private character discovery and shared attention rather than social breadth.

## 10. Comparison with positive precedents

Compared with the strongest relevant v006/v006b findings:

### Focused conversation

V006/v006b established that important dialogue benefited from focused VN treatment. V007c restores that on the private route rather than treating “quiet” as an excuse to avoid authored conversation.

### Spatial positioning

V006b’s strongest spatial choices mattered because being somewhere changed what the player actually experienced. In v007c, staying with Tabitha opens the notice/private route, while entering the hall opens group material. The spatial choice therefore changes lived content rather than only telemetry.

### Non-intervention / companionship

V006b explicitly required that staying with somebody instead of intervening must not collapse into lack of experience. V007c funds that companionship with humor, private context, shared observation and future plans.

### Immediate and later consequence

The private choices receive immediate response, change the map state, create a specific plan and later receive a callback. They therefore combine self-definition, fictional acknowledgement and situation residue rather than postponing everything until an ending summary.

### Commitment-bearing payoff

The later choice to walk toward the station changes what the player actually does next, retaining the clarity that made v006b’s final stay/leave decision one of its strongest moments.

Internal conclusion: **the route is no longer structurally cleaner but experientially weaker than the successful v006b material. It is at least credible enough to test externally.**

---

# Content / bandwidth inventory across promoted routes

This inventory is qualitative, not a line-count quota.

## Tabitha one-to-one

Funded with:

- focused opening;
- shared environmental beat;
- substantive private VN;
- three meaningfully different private stances/plans;
- changed physical/social state;
- plan-specific callback;
- leave/rejoin/linger payoff choices;
- private context can be reincorporated if the player later joins the group.

This is the deepest route in the current experiment because Tabitha is the initial companion and the previous failure was specifically one-to-one starvation.

## Small-group radio route

Funded with:

- active Maya/Alex banter;
- player can join, listen or remain alongside Tabitha;
- map-level observation exists without mandatory VN;
- optional focused group scene;
- optional later audience-sensitive story when the necessary people are actually present;
- social continuation / afterparty availability can result.

The route is not required before private content.

## Priya-selective route

Priya arrives and self-settles without protagonist shepherding.

Her private scene is intentionally shorter than Tabitha’s because she arrives later, but contains:

- several lines of character-specific material about being comfortable in purposeful rooms but less so in pure social space;
- choices for shared uncertainty, reassurance or a concrete chips plan;
- visible behavioral/arrangement consequence;
- no radio-group prerequisite.

## Observer / low-intervention route

Contains:

- actual Maya/Alex ambient material to hear;
- visible social movement and arrival/self-settling;
- no forced VN requirement;
- ability to leave when desired.

It is intentionally lower semantic bandwidth, but it is observation of actual content rather than an empty time-skip.

---

# Empty-freedom scan

## Tabitha

**Pass internally.** The route is not merely reachable; it contains substantial authored/reactive content and payoff.

## Group

**Pass structurally / provisional experientially.** There is real banter, participation, observation and continuation. External quality remains unproven.

## Priya

**Pass structurally / provisional experientially.** The route contains focused material and a concrete possibility, but is intentionally smaller than Tabitha’s.

## Observer

**Pass for the limited experiment.** Observation contains actual social material and does not pretend to be the same high-bandwidth experience as deliberately choosing a person.

---

# Failures caught internally during this preflight

The positive-value gate produced useful failures before external testing:

1. **Generic-character draft** — the first substantial private conversation was too generic and could have belonged to any introverted character. It was rewritten around Tabitha’s accepted public-symbol/private-person contradiction, library work and municipal-history interests.
2. **Priya feedback interruption** — an unrelated arrival could visually overwrite the shared/private Tabitha beat. Quiet-route timing was changed so the chosen one-to-one sequence gets its own feedback window.
3. **Post-ending beat** — a choice that ended the run could still advance one additional world beat. Scene resolution now skips further beat advancement once the run has ended.
4. **NPC snap-back** — Tabitha’s long move to the side yard could be reset toward spawn, making the callback inaccessible in rendered play. The snap logic was removed and a regression guard added.

These are examples of issues that the user should not be the first person to discover.

---

# Remaining uncertainty

This preflight does **not** establish that the user will enjoy v007c.

Remaining genuine external questions include:

- whether the private writing is actually engaging rather than merely substantial;
- whether the public-symbol / old-building material feels like Tabitha rather than exposition;
- whether the noticeboard beat feels natural or over-authored;
- whether the map → VN → map rhythm feels pleasant in actual play;
- whether the later callback/payoff feels earned rather than obviously designed;
- whether small-group interaction remains fun when chosen voluntarily;
- whether the relative route sizes feel appropriate;
- whether accumulated character interpretation is noticeable and believable enough to matter.

Those are appropriate external playtest questions because the build now contains enough experience to evaluate them.

## Internal readiness conclusion

**V007c is suitable for external playtesting once the exact committed branch remains green after this finding/status update.**

The important change from v007b is not simply “more dialogue.” It is that the player’s declared desire—meaningful one-to-one time with Tabitha—is now actually funded with a complete character experience, while the free social topology and low-friction UI corrections remain intact.
