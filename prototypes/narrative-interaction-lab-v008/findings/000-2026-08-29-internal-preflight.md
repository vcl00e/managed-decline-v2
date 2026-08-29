# V008 internal preflight — The Old Build

**Date:** 2026-08-29
**Status:** internally worth an external playtest after repository CI; not a user finding

## Purpose

V008 is the first narrative candidate integrated as a content module against the scenario-pluggable harness. It follows the v007d decision to keep the user out of basic runtime QA and to review interaction design and writing before implementation.

The target question is:

> **Does a short shared activity with Tabitha recover the comedy, character pull and meaningful participation of v003 without returning to monologue, fake relationship choices or brittle route plumbing?**

## Pre-implementation gates

Three documents were completed before scenario code:

1. candidate selection and rejection of another frontage investigation / room-setup busywork;
2. plain interaction script with no state labels or relationship objectives;
3. separate interaction and writing review.

The selected activity is operating and amending an abandoned build of the old council programme. This remains prototype-grade material rather than accepted canon.

## Exact played route

A rendered Chromium preflight used only ordinary movement, interaction and numbered dialogue input:

```text
follow Tabitha to kiosk
→ answer “Move her to Fiction”
→ tell Tabitha she nearly laughed at the archived outtake
→ follow the printer noise
→ physically take the sheet from the tray
→ write “BUY BISCUITS BEFORE HOUR SIX”
→ carry the sheet across the lobby
→ pin it to the staff noticeboard
```

The resulting state ended at 20:05 with:

- `firstAnswer: move_fiction`;
- `outtakeReaction: nearly_laughed`;
- `note: biscuits`;
- `destination: noticeboard`;
- no repeated actions, stale prompts, time anomalies or unresolved state.

The saved audit passes with zero errors and zero warnings.

## Runtime gate

Local verification passed:

- **11/11** v008 unit and writing checks;
- **5/5** rendered Chromium runs;
- intended complete route;
- rapid repeated-input protection;
- focused cancel/resume;
- immediate voluntary exit;
- alternative route that gives the amended artefact to Tabitha;
- healthy trace audit on completed routes.

V008 imports the harness application and scenario contract. It contains no local engine or VN controller.

## Interaction-design judgment

### What worked internally

- Tabitha initiates by leaving the entrance for the kiosk.
- The first choices operate the fictional programme rather than asking the player to announce a romantic stance.
- Character texture emerges through specific production details: the missing biscuits, the director's “more susceptible” note, and Tabitha opening forbidden facilitator tools.
- The printer creates a real transition back to the map rather than another dialogue screen.
- The player authors a physical object and then chooses where it remains.
- Earlier conduct changes later callbacks without a relationship score.
- The scene can be abandoned before or after engagement.

### Why it is not another monologue fix

No focused node contains more than three turns before player input. Choice responses are one or two lines. There is no public/private-identity explanation, reassurance speech, future-date reward or declaration that the relationship progressed.

### Comparison with v003

V003's strongest qualities were an immediate satirical hook, magnetic Tabitha company, comedy, emotional movement, participation and perceptible acknowledgement. V008 retains those targets but makes the pair privately operate and edit an artefact rather than sit through a facilitated presentation.

The new interaction is much shorter and more physical. It does not attempt to reproduce v003's full emotional arc.

## Writing judgment

The script is sufficiently specific and compact to justify a playtest. The strongest lines arise from the immediate activity rather than generic intimacy. The options read as actions, observations or text to write.

This does **not** prove that the sequence is funny or fresh in actual play.

## Remaining uncertainty

External testing is still needed to determine:

- whether the old-programme premise feels fresh enough after v003;
- whether operating a programme inside the game feels playful or too interface-heavy;
- whether the outtake creates a useful emotional change without becoming heavy;
- whether carrying and placing the printed sheet feels meaningful rather than adventure-game busywork;
- whether the player wants more time with Tabitha after the ending.

These are experiential questions rather than basic QA failures.

## Readiness conclusion

The candidate is internally worth the user's time **provided the exact repository branch passes CI after publication**. Passing tests are not being treated as proof of entertainment; they establish that the user can evaluate the unresolved experience without first repairing the build.
