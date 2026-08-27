# Narrative Interaction Lab v007 — Friday Night

**Status:** failed playtest iteration — archived; proceed to targeted correction v007b

See [`findings/001-2026-08-27-regression-playtest.md`](./findings/001-2026-08-27-regression-playtest.md) for the playtest failure, diagnosis and accepted v007b correction target.

**Builds directly on:** `narrative-interaction-lab-v006b`

V006b established that continuous geography, elastic diegetic time, socially permeable situations and focused VN presentation can work together as one interaction grammar. Its remaining bottleneck was no longer basic presentation. It was whether characters can interpret **patterns of conduct across multiple actions and social contexts** and carry those interpretations into future behaviour.

V007 attempted to expand scope with a pleasure-first community-radio evening, one-to-one and small-group configurations, audience-aware conduct and accumulated character interpretation.

The implementation failed because it regressed accepted same-domain behaviour from v006b:

- a permanent dense side dashboard competed with the fictional world;
- an authored sequence forced repeated group interaction before quieter one-to-one play became freely available;
- many choices wrote hidden conduct evidence without timely visible acknowledgement;
- the group-interaction test was overrepresented, making the run exhausting for a player who wanted quieter company.

The hall layout itself was positively received and remains useful evidence.

Do **not** use this implementation as the baseline for further extension. V007b should rebuild from the accepted v006b interaction/UI grammar plus the useful v007 hall/social-premise evidence, under `prototypes/REGRESSION-POLICY.md`.

## Historical experimental questions

V007 originally asked:

> **Can a mostly enjoyable ordinary slice of life combine one-to-one and small-group interaction such that the player's presence, audience, introductions, teasing, private/public behaviour and final social choices accumulate into believable character interpretation and meaningful next-day residue?**

and secondarily:

> **Can 2–4-person gatherings preserve agency while NPCs also talk to one another, so the player can enjoy being inside a social situation without becoming either a passive cutscene viewer or the centre of every exchange?**

Those questions remain relevant, but this implementation did not provide a valid test because it constrained social pacing too heavily and regressed the accepted map presentation.

## Retained evidence

Useful ideas that should carry forward where compatible with the regression policy:

- compact community hall / forecourt / side-yard topology;
- pleasure-first Friday-night premise;
- one-to-one and 2–4-person gatherings;
- NPC-to-NPC conversation;
- audience and public/private provenance;
- deterministic accumulated conduct interpretation;
- mostly neutral/positive residue;
- non-intervention and going home as valid play.

## Run (historical failed build)

Requires Node.js 18+.

```bash
cd prototypes/narrative-interaction-lab-v007
npm run check
npm test
npm start
```

Open `http://127.0.0.1:4177`.

This build is retained for historical comparison only; it is not recommended for further user playtesting.
