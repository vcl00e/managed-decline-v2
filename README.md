# Managed Decline v2

This repository is deliberately simple. It keeps the original design conversations and prototype test history, and derives the current game design from those records when needed.

There is **no manually maintained master design document**. That avoids duplicated summaries drifting out of sync with the conversations that produced them.

## Structure

```text
managed-decline-v2/
├── README.md
├── notes/
├── prototypes/
│   └── <prototype-name>-vNNN/
│       └── findings/
└── game/
    ├── v001/
    ├── v002/
    └── ...
```

## Notes

`notes/` contains verbatim ChatGPT conversations used for design, research, exploration, and decisions.

### Rules

- Normally, **one chat conversation = one note file**.
- Preserve the conversation verbatim, including the order of user and assistant messages.
- Do not split one conversation into multiple topic notes merely because several systems or ideas were discussed.
- A note may contain exploratory ideas, rejected ideas, accepted designs, revisions, integrations, and open questions together.
- Historical notes are not updated just because a later conversation changes the design.
- If an old design is later superseded, the old note remains an accurate record of what was accepted at that time.
- Notes can be removed deliberately when the user decides that conversation should no longer form part of the design record.

Suggested filename:

```text
YYYY-MM-DD_chat-title.md
```

Example:

```text
2026-08-10_character-design.md
```

## What counts as accepted design

An assistant suggestion is **not** accepted merely because it appears in a note.

Treat an idea as accepted when the user clearly endorses it in context, for example by agreeing with it, selecting it, confirming it, asking to keep it, or explicitly stating that it is the design.

Acceptance must be interpreted from the surrounding conversation. For example, `Agreed` applies to the proposal it is responding to, including any qualifications the user gives.

## Dynamic design passes

When the current design is needed, derive it from the repository rather than relying on a separate summary file.

A design pass should inspect the relevant notes chronologically and, where relevant, prototype findings.

### Design-pass rules

1. Identify ideas that were explicitly accepted by the user.
2. Distinguish accepted designs from suggestions, exploration, questions, and rejected ideas.
3. Interpret accepted designs chronologically.
4. A later accepted design may replace, refine, extend, combine, or integrate earlier accepted designs.
5. Older notes do **not** need to explicitly say that they were superseded. Infer supersession from later accepted conversations when the relationship is clear.
6. A more detailed later design may subsume an earlier design without contradicting it.
7. A later integrated design may supersede or refine parts of several older designs at once.
8. Newer does not automatically mean authoritative. A newer idea that remains exploratory does not replace an older accepted design.
9. **Never silently reconcile contradictory accepted designs.**
10. If chronology and context clearly establish that one accepted design supersedes another, use the newer accepted design and identify the older one as superseded when useful.
11. If two accepted designs conflict and the conversation history does not clearly resolve the conflict, report the contradiction as unresolved and identify the source files.
12. Do not rewrite historical notes merely to make the derived design cleaner.

When useful, a dynamic design view should distinguish:

- current accepted design;
- older accepted design that has been superseded or subsumed;
- exploratory ideas;
- unresolved questions;
- unresolved contradictions.

Dynamic summaries, system maps, dependency views, contradiction checks, and similar views should normally be generated on demand rather than saved as additional authoritative documents.

## Prototypes

Prototype work must follow [`prototypes/PROTOTYPE-POLICY.md`](./prototypes/PROTOTYPE-POLICY.md).

The policy uses three gates:

1. preserve relevant accepted design unless deliberately reopened;
2. define and fund the player experiences the prototype invites;
3. review the complete played experience rather than treating passing state tests as evidence of quality.

Accepted designs remain inherited defaults rather than permanent laws. New UI or mechanics are appropriate where genuinely different functionality requires them; same-domain work inherits prior player-facing strengths unless explicitly under re-test.

Each conceptual prototype uses a stable base name and a three-digit version number:

```text
<prototype-name>-v001
<prototype-name>-v002
<prototype-name>-v003
```

Examples:

```text
movement-v001/
movement-v002/
vn-interaction-v001/
npc-simulation-v001/
```

Do not create vaguely overlapping names such as `movement-new`, `new-movement`, `movement-final`, or `movement-experiment` when the work is really the next version of the same prototype.

Continue updating the same prototype version while iterating on that implementation. Increment the version when deliberately starting the conceptual prototype again as a new version or rebuild.

### Prototype findings

Findings belong **inside the prototype version that produced them**:

```text
prototypes/
└── movement-v002/
    ├── ...prototype files...
    └── findings/
        ├── 001-2026-08-11-initial-test.md
        ├── 002-2026-08-11-camera-scaling.md
        └── 003-2026-08-12-vn-transition.md
```

Rules:

- Do not move prototype findings into `notes/`.
- Do not mix findings from different prototype versions.
- Each substantial test/feedback conversation should create a new findings file.
- Findings may be verbatim conversation records when that is the most useful record.
- Prototype findings are evidence, not automatically accepted game design.
- If the user explicitly accepts a design decision during prototype testing, a later design pass may treat that decision as accepted while keeping the record in that prototype's `findings/` folder.

Suggested findings filename:

```text
NNN-YYYY-MM-DD-short-description.md
```

## Game attempts

Production-game attempts live under numbered folders:

```text
game/v001/
game/v002/
game/v003/
```

Keep developing within the current version during normal iteration.

Create the next version only when deliberately starting the game implementation again from scratch or making a genuine new implementation attempt. Previous versions remain available as historical implementations.

## Working with ChatGPT

Typical requests can be direct:

- `Do a design pass over all notes and tell me the current accepted character design.`
- `Find every accepted design that affects narrative control.`
- `Check the notes for unresolved contradictions around progression.`
- `Work out the latest overall accepted design across these systems.`
- `Read the movement prototype findings and compare v001 with v002.`
- `Before changing this system, identify other accepted designs that appear to depend on it.`

The repository stores the conversations and evidence. ChatGPT generates the useful current view when it is needed.
