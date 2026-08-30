# V010b pre-implementation review

## Scope check

V010b is a corrective pass, not a new scenario.

It preserves v010's successful evidence:

- route choice through physical movement;
- journey/exploration value;
- public versus quiet route distinction;
- optional stop accepted or declined spatially;
- explicit station continuation/separation.

It changes only:

1. companion locomotion presentation;
2. live narration placement/refresh;
3. acknowledgement of ignored suggestion;
4. event/activity density during the walk.

## Formation review

**Pass.**

The travelling formation has a positive experiential purpose: make accompaniment visible rather than merely declared in narration.

Requirements:

- stable side slot while travelling forward;
- no constant orbiting around the player;
- narrow-space single-file mode must be caused by environment geometry, not arbitrary animation;
- automatic return to side-by-side afterwards;
- independent Tabitha pathing remains reserved for explicit separation.

## Narration review

**Pass.**

V010 exposed a client defect: movement-triggered feedback could change in state without the persistent narration DOM updating. V010b must refresh narration during live movement and test that rendered text changes without any interaction key.

Bottom-middle placement is appropriate for live movement because player gaze is concentrated on the central character pair. Time/status may remain peripheral.

## Ignored-conduct review

**Pass with hard visibility gate.**

The input `keep walking` already exists and felt natural. The missing piece is perceptible acknowledgement.

The response must:

- happen once;
- not stop movement;
- not open VN;
- name the conduct indirectly through character reaction;
- persist long enough to be read;
- leave a small later callback where useful.

## Density review

**Pass.**

The proposed additions are not an interaction-icon chain.

Per route:

- one environmental formation change;
- at least two movement-triggered observations/reactions;
- one existing substantial optional stop;
- one small optional micro-action;
- route-specific arrival callback.

This is enough to test whether the journey feels inhabited without turning ordinary walking into constant prompting.

## Writing / comprehension review

**Pass.**

The new lines depend only on immediately visible things: bus shelter, bus display, shop, railings, upstairs window, park, fox.

No institutional premise must be decoded and no line explains the intended relationship meaning.

## Release blockers

Do not send externally if any of these occur:

- Tabitha spends normal wide-path travel materially behind the player;
- she oscillates across the player when heading changes slightly;
- side-by-side formation clips far outside the path network;
- movement-triggered narration requires pressing `E` to become visible;
- the ignored suggestion can pass without a rendered acknowledgement;
- narration remains top/right at desktop scale;
- optional micro-actions block route completion;
- added events produce prompt saturation;
- v010's route/stop/station choices regress.
