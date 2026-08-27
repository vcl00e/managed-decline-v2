# Narrative Interaction Lab v007b — internal preflight

**Date:** 2026-08-27

**Status:** internal readiness evidence; not a user playtest finding

## Purpose

This preflight exists under `prototypes/REGRESSION-POLICY.md` to prevent the user from spending another playtest rediscovering failures already identified in v006/v006b or the failed v007 iteration.

It is not evidence that v007b is fun or successful. It establishes that the build is sufficiently regression-checked to justify asking the user to test the genuinely unresolved experiential questions.

## Exact-branch CI verification

GitHub Actions verified the committed `prototype/narrative-interaction-lab-v007b` branch rather than a local working copy.

The verification job passed:

- JavaScript syntax checks;
- state/model tests;
- experience-regression tests;
- goal-directed persona preflight tests;
- HTTP smoke test.

The final regression suite contains 16 checks across three layers.

### System / route checks

Verified that:

- the quiet route is available from the opening without group content;
- choosing quiet time does not immediately trigger an unrelated social arrival;
- a quiet player can reach an ending without any group scene;
- entering the social room causes relevant world activity earlier without making it mandatory elsewhere;
- Priya can settle without protagonist shepherding;
- joining a group does not create a completion gate for leaving;
- meaningful situational choices create immediate visible state;
- a public boundary choice changes Tabitha immediately and remains available to later interpretation.

### Goal-directed persona checks

Scripted state/topology preflights were completed for:

- **quiet player:** mostly Tabitha one-to-one, no mandatory group scenes;
- **social player:** voluntary group participation and mixed-group material;
- **observer:** complete run with zero VN scenes;
- **Priya-selective player:** meaningful Priya route while avoiding the radio group;
- **uninterested player:** leaves before closure/group content.

### Experience-regression checks

Verified that:

- ordinary play contains no permanent dashboard, room-tone log, nearby-action list or developer-state panel;
- no group scene is a prerequisite for Tabitha's quiet topology;
- observer play advances the world without entering a VN group scene;
- the immediate feedback from choosing quiet company remains visible before any unrelated arrival is allowed to occur.

## Rendered quiet-player preflight

A rendered Chromium preflight was performed by injecting the locally equivalent build into an `about:blank` page because this environment's browser policy blocks direct navigation to localhost/file URLs.

The important previously failed path was exercised through actual keyboard input and rendered UI:

1. opening prompt offered `Spend a moment with Tabitha`;
2. focused conversation opened normally;
3. the player selected `Let's stay out here a bit first`;
4. Tabitha immediately replied to that specific choice;
5. returning to the map showed the visible consequence `Tabitha stays with you rather than heading inside`;
6. Priya was not yet present or mentioned;
7. the next contextual affordance was `Stay here together a while`;
8. only after choosing that additional quiet interval did Priya arrive;
9. her arrival did not require the player to interact with or shepherd her.

The rendered map remained the dominant visual field with only:

- small HUD labels;
- transient situation/notice text;
- one contextual interaction prompt;
- no right-hand information panel;
- no scrolling ambient log;
- no visible developer state.

## Regression discovered and corrected during preflight

An earlier internal v007b build allowed Priya to arrive immediately after the first Tabitha scene. Although her interaction was optional, this still intruded visually on the quiet-player route and could overwrite the immediate map acknowledgement of choosing to stay with Tabitha.

This was corrected before external playtest.

Current rule:

- if the player enters the social room, Priya may arrive after the first meaningful beat;
- if the player deliberately remains outside, her arrival waits until the player has had an additional meaningful quiet interval;
- after arriving, Priya gets a one-beat opportunity for player interaction and then independently settles if ignored.

A dedicated regression test now protects this ordering.

## What this preflight does not prove

The following remain genuine external playtest questions:

- whether the evening is actually enjoyable;
- whether social-bandwidth control feels natural rather than merely technically available;
- whether one-to-one and small-group configurations feel meaningfully different;
- whether NPC-to-NPC speech feels like social life rather than content to wait through;
- whether the map prompts and movement feel elegant in real use;
- whether immediate consequences are noticeable without feeling mechanically over-signalled;
- whether the social world feels alive rather than sparse or synthetic;
- whether accumulated character interpretation is convincing enough to matter.

Those are appropriate uses of the user's playtest time because they cannot be established by automated regression checks alone.

## Internal readiness conclusion

No known v006/v006b or failed-v007 regression remains knowingly present in the tested paths.

The build is suitable for an external v007b playtest focused on the unresolved experiential question:

> **Can the player choose their own social bandwidth and enjoy the resulting ordinary evening while their choices produce readable local consequences?**
