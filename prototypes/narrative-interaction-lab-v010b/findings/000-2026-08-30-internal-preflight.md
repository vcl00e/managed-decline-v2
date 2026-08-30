# V010b internal corrective preflight — 2026-08-30

## Status

**Internally approved for one external playtest, subject to an exact-head rerun after this finding/readiness documentation is committed.**

V010b is a corrective continuation of v010, not a new narrative scenario.

## External defects inherited from v010

The v010 external playtest produced four specific corrective requirements:

1. Tabitha felt narratively present but visually looked like a follower NPC.
2. ignoring her stop suggestion did not produce a perceptible acknowledgement in the player's run.
3. live narration in the top/right was hard to read while focusing on the characters near the middle of the map.
4. movement had journey/exploration value, but there was not enough happening during the route.

The positive v010 evidence remains inherited: physical route choice was worthwhile, public/quiet framing mattered somewhat, and movement added shared journey/exploration value that a dialogue menu could not.

## Corrective implementation

### 1. Formation-based accompaniment

V010b no longer treats ordinary accompaniment as `Tabitha targets the player's current/recent position`.

On the two long route corridors, companion geometry uses the corridor's stable station-ward tangent:

- wide path → lateral side-by-side slot;
- environmental pinch → single-file slot;
- path opens → lateral slot again.

Free player heading is still used when genuinely turning off the corridor into a stop or station approach.

This prevents tiny steering corrections from rotating Tabitha around the player or making her look like she is continually catching up.

Independent Tabitha pathing is still reserved for explicit post-goodbye separation.

### 2. Live movement narration

The v010 external failure revealed a concrete client bug/omission: movement-triggered changes could update `state.memory.currentFeedback`, but the recovered client refreshed the narration DOM only after explicit contextual actions or VN changes.

V010b uses a local travel client that:

- reads `scenario.feedbackText(state)` / `memory.currentFeedback`;
- refreshes persistent narration during the animation loop only when the text actually changes;
- therefore makes movement-triggered observations and reactions visible without requiring `E`.

The merged harness is not modified by this experiment.

### 3. Bottom-middle narration

V010b moves important live situation/feedback copy into a bottom-middle container close to the player's visual focus on the character pair.

The inherited large focused VN is not resized or overridden.

### 4. Observable shadow for ignored suggestion

Continuing past the shop or park remains the rejection input.

After the stop falls behind, Tabitha visibly acknowledges the conduct once while walking continues:

- high street: `No crisps. Severe administration.`
- quiet route: `No five minutes. Relentless forward motion.`

No rejection menu or forced stop is introduced.

### 5. Journey ecology

Each route now contains a sparse sequence of movement-authored beats rather than more empty distance.

High street:

- bus-shelter pinch / formation compression;
- bus-display observation;
- optional shared look at the display;
- existing shop suggestion/stop;
- perceptible acknowledgement when the shop is declined;
- route-specific continuation/arrival context.

Quiet route:

- railings pinch / formation compression;
- upstairs-window observation;
- existing park suggestion/stop;
- later fox observation;
- optional shared pause for the fox;
- route-specific continuation/arrival context.

The bus-display/window observations and later suggestions were deliberately spatially separated after early CI exposed that densely adjacent movement events could overwrite each other's narration.

## Internal failures caught before release

The exact-branch gate failed several times and the failures were retained as useful QA evidence rather than bypassed.

### Failure A — acknowledgement overwrite

A generic late-route journey beat could overwrite the ignored-suggestion reaction when both became true in one movement tick.

Correction:

- meaningful conduct acknowledgement is narratively dominant on the declined-stop path;
- generic later ambience does not immediately replace it.

### Failure B — follower geometry after tiny steering correction

A small final vertical/horizontal correction could rotate the remembered travel heading and put Tabitha behind the player even though the route was a horizontal corridor.

Correction:

- route-corridor formation is anchored to the corridor tangent;
- free heading remains for genuine turns.

### Failure C — density events colliding

The bus-display observation and shop suggestion, and then the upstairs-window observation and park suggestion, could fire too close together.

Correction:

- suggestion presentation is deferred a short spatial distance so the route reads as several distinct moments rather than a notification pile-up.

### Failure D — misleading aggregate density assertion

The rendered high-street test originally demanded an arbitrary `journeyBeatCount >= 4`, even though several experienced beats (formation pinch, route suggestion) were tracked in other state families.

Correction:

- the rendered gate now checks the actual experienced components directly rather than inflating production state to satisfy a test counter.

## Verification

Code head `d4eb287685535d907d8c67b4a4f957916ff52d97` passed GitHub Actions run `33331692845` after the formation correction.

The gate covers:

- syntax/scenario contract;
- wide-path lateral formation target;
- rendered side-by-side travel;
- environmental single-file compression;
- return to side-by-side;
- bottom-middle narration geometry at 1440×900;
- live movement narration refresh;
- once-only ignored-suggestion acknowledgement visible in the rendered client;
- high-street bus-display micro-action;
- quiet-route park stop and fox micro-action;
- optional micro-actions not becoming route gates;
- route completion with real keyboard movement;
- explicit post-goodbye separation;
- trace audit;
- HTTP smoke.

A final exact-head run is required after readiness documentation is committed.

## Qualitative internal review

**Pass for one external playtest, not a claim of experiential success.**

The corrective build now appears to preserve v010's useful spatial structure while directly addressing the user's four complaints.

The density remains intentionally sparse. It adds shared observations and optional moments rather than constant interaction prompts.

The unresolved question is experiential and should not be answered by automation:

> **Does this now feel like genuinely walking around somewhere with Tabitha, rather than controlling a player while an NPC follows behind?**

Secondary external questions:

- Does the side-by-side / single-file / side-by-side behaviour actually read as two people walking together?
- Is bottom-middle narration easier to follow while moving?
- Is the ignored suggestion clearly acknowledged without becoming intrusive?
- Does the route now feel inhabited enough?
- Do the new beats feel natural, or like authored content pockets / prompt clutter?
