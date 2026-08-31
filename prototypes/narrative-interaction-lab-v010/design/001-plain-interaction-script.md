# V010 plain interaction script — The Way Back

**Purpose:** judge the shared movement and spoken interaction before runtime/state machinery is written.

## Opening

The community hall is shutting up behind them. It has recently rained; the pavement is wet but the rain has mostly stopped.

The player and Tabitha are already leaving together. The station is several streets away.

At the first junction, one route runs past the lit high street. Another cuts behind a row of small civic buildings and a pocket park.

Tabitha looks from one to the other but does not move away from the player.

**Tabitha:** “Which way?”

**Tabitha:** “I’m not emotionally attached to either pavement.”

No route-selection dialogue appears. The player simply walks.

## Accompaniment

As the player moves, Tabitha stays with them. If the player stops, she stops. If the player changes direction before committing to a route, she changes with them.

The game should make it visually obvious that they are walking **together**, not that the player is following her.

## High-street route

The high street is brighter and busier. A takeaway has three people outside. Buses pass. The late corner shop is still open.

The persistent situation text changes to reflect that the pair are in a more public space.

Tabitha keeps pace and glances at the shop.

**Tabitha:** “I could eat something.”

A beat.

**Tabitha:** “Your call.”

She does not enter the shop herself.

### If the player turns into the shop entrance

A contextual interaction becomes available: **Go in together.**

Focused exchange:

**Tabitha:** “Pick something. I’ll judge it.”

Player choices:

- **Salt and vinegar.**
- **Chocolate.**
- **Nothing. I just wanted to look.**

Responses remain short:

- salt and vinegar → **Tabitha:** “Correct. Aggressive but correct.”
- chocolate → **Tabitha:** “Predictable. Fine.”
- nothing → **Tabitha:** “Window-shopping a Londis. Aspirational.”

They return to the same high-street pavement together. No one relocates independently.

### If the player keeps walking

The shop falls behind them.

**Tabitha:** “Fine. Starvation route.”

She continues with the player. No penalty, resentment meter or lost-content warning.

## Quiet cut-through

The cut-through is quieter. There is less traffic and more space between people. A tiny fenced pocket park remains open with one dry bench under a tree.

The persistent situation text makes the privacy difference legible without announcing a relationship effect.

Tabitha notices the bench while staying beside the player.

**Tabitha:** “Five minutes?”

Then:

**Tabitha:** “Or not. I’m capable of continuous walking.”

### If the player turns into the park

A contextual interaction becomes available: **Sit for a minute together.**

Focused exchange:

They sit. The hall is still visible through the gap between buildings.

**Tabitha:** “It looks better from over here.”

Player choices:

- **“Most things do.”**
- **“You wanted a break.”**
- **[Sit quietly for a moment.]**

Responses:

- most things → **Tabitha:** “Strong local-planning policy.”
- wanted a break → **Tabitha:** “Yes. I contain fatigue.”
- quiet → after a beat, **Tabitha:** “This is fine.”

The exchange is deliberately small. It exists because the player chose a quieter route and physically stopped.

They stand and resume the same walk together.

### If the player keeps walking

The park falls behind.

Tabitha falls back into step without treating the ignored suggestion as a failure.

**Tabitha:** “Continuous walking it is.”

## Route convergence

The routes meet near the station forecourt.

The route should have affected the preceding few minutes, not just an end-of-scene label.

At the station approach, Tabitha gives a short callback based on actual conduct.

Examples:

- high street + shop → **Tabitha:** “Good route. We acquired crisps.”
- high street + no shop → **Tabitha:** “Efficient. Brutal, but efficient.”
- cut-through + park → **Tabitha:** “That was better than standing in the hall pretending not to leave.”
- cut-through + no park → **Tabitha:** “You walk like you have somewhere to be.”

## Ending space

At the station there are two nearby spatial endings rather than one dialogue menu:

### Station entrance

If the player leads to the entrance, a contextual action appears: **Go in with Tabitha to the barriers.**

Tabitha goes in with the player. The run ends with the pair arriving together.

### Forecourt edge

If the player instead leads to the edge of the forecourt, a contextual action appears: **Peel off here.**

The player stops. Tabitha also stops.

**Tabitha:** “Right. See you.”

She leaves only after the separation has been explicitly chosen.

## Interaction criterion

A successful run should demonstrate all of these without explanatory UI:

1. The player must physically travel a meaningful distance.
2. The player selects the route through movement.
3. Tabitha accompanies the player rather than moving to route waypoints.
4. Tabitha can suggest a stop without taking locomotion control.
5. The player accepts or declines that suggestion spatially.
6. Route changes publicness/private space and available shared activity.
7. The pair resume movement together after a stop.
8. The player physically chooses how the shared walk ends.
9. The final callback reflects actual route/stop conduct.

The walk should still feel like time with Tabitha if all hidden route labels and telemetry are removed.
