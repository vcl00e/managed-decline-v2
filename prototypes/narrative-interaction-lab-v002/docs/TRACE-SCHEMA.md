# Trace schema

The browser exports one pretty-printed JSON document containing all completed local traces.

## Export envelope

```json
{
  "schemaVersion": 1,
  "prototype": "narrative-interaction-lab-v002",
  "exportedAt": "2026-08-22T00:00:00.000Z",
  "traceCount": 1,
  "traces": []
}
```

## Run record

Each item in `traces` contains:

```json
{
  "schemaVersion": 1,
  "prototype": "narrative-interaction-lab-v002",
  "scenario": "listening-exercise",
  "runId": "generated-uuid",
  "testerId": "T03",
  "facilitatorNote": "first exposure · group B",
  "mode": {
    "blind": true,
    "annotations": false
  },
  "condition": {
    "id": "observation",
    "displayedName": "Evening B",
    "canonicalName": "Baseline + optional observation"
  },
  "startedAt": "ISO timestamp",
  "startedEpochMs": 0,
  "events": [],
  "ending": {},
  "survey": {},
  "completedAt": "ISO timestamp",
  "durationMs": 0,
  "metrics": {}
}
```

`canonicalName` is retained even in blind mode so the researcher can analyse exported data. It is not shown to the tester during play.

## Event records

### Node entry

```json
{
  "type": "node_entered",
  "at": "ISO timestamp",
  "elapsedMs": 12000,
  "initial": false,
  "nodeId": "hall_map",
  "nodeType": "map",
  "phase": "hall",
  "clock": "18:07",
  "location": "hall",
  "state": {}
}
```

### Choice selection

```json
{
  "type": "choice_selected",
  "at": "ISO timestamp",
  "elapsedMs": 18000,
  "dwellMs": 4200,
  "nodeId": "hall_map",
  "choiceId": "observe_notice",
  "label": "Read the laminated closure notice",
  "kind": "observation",
  "intent": "Inspect the exact institutional wording before speaking.",
  "supportAction": true,
  "destination": "hall_map",
  "before": {},
  "after": {}
}
```

The state snapshots are intentionally verbose and readable. They make it possible to audit exactly which prior facts produced later text. Do not minify the export before committing anonymised test data.

## Ending

```json
{
  "id": "A quieter record",
  "title": "A quieter record",
  "summary": "Authored ending text",
  "residues": [
    "A saved recording of the improvised Low Signal broadcast"
  ],
  "finalState": {}
}
```

The ending records residue rather than a success/failure result.

## Survey

```json
{
  "submittedAt": "ISO timestamp",
  "ratings": {
    "presence": 4,
    "comprehension": 4,
    "agency": 4,
    "pull": 4,
    "choiceQuality": 4,
    "mapUsefulness": 4,
    "dialogueFatigue": 2,
    "processFeeling": 2,
    "burden": 2
  },
  "spontaneousIntentions": "...",
  "rememberedElements": "...",
  "choiceQuality": "...",
  "expectedAftermath": "...",
  "burdenPoint": "...",
  "notes": "..."
}
```

The rating and free-text fields intentionally overlap. Ratings support comparison; prose reveals why a rating occurred and whether the researcher is interpreting it correctly.

## Derived metrics

```json
{
  "choiceCount": 28,
  "nodeEntryCount": 29,
  "uniqueNodeCount": 27,
  "mapChoices": 5,
  "phoneChoices": 1,
  "observationChoices": 2,
  "decisiveChoices": 0,
  "supportActionCount": 2,
  "medianDecisionDwellMs": 4200
}
```

These values are descriptive. In particular, `supportActionCount` is not a player-facing score and must not be used to imply that more interaction is better.

## Privacy and repository use

Before committing exported data:

- remove or replace accidental real names;
- remove facilitator notes containing personal information;
- confirm free-text answers contain no identifying information;
- retain formatting so the JSON remains reviewable;
- record the consent and recruitment context outside the trace if required by the project’s research process.
