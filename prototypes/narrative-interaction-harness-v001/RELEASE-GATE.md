# Narrative prototype release gate

This gate separates **runtime reliability**, **interaction design**, and **writing quality**. A build proceeds in order and cannot use success at one layer as evidence for another.

## Layer 1 — Runtime reliability

Required automated evidence:

- syntax/build passes;
- model invariants pass;
- consumed actions disappear;
- stale actions are rejected;
- fictional time advances only with meaningful change;
- focused cancellation resumes safely;
- a complete route works through the rendered client;
- held/repeated inputs do not duplicate transitions;
- exported trace passes anomaly audit;
- exact branch CI passes.

Failure at this layer blocks all external playtesting.

## Layer 2 — Interaction design

Required internal review:

- what does the player actually do;
- what does the other participant initiate;
- how earlier conduct changes later possibilities;
- whether map and VN operate as one causal interaction;
- whether the player can redirect, stop or leave;
- whether the interaction remains worthwhile without progression labels.

This review is qualitative. Unit tests cannot certify it.

## Layer 3 — Writing quality

Review the spoken script independently of the implementation:

- remove state labels and intended relationship outcomes;
- reject exposition disguised as intimacy;
- reject choices that state the designer's desired emotional reading;
- check for interruption, misunderstanding, resistance and change of direction;
- check that player responses sound plausible in the immediate moment;
- use a fresh critic who did not write the scene;
- reject the content before integration when it is boring on the page.

## Required rendered passes

### Intended

Play the expected route using only player-facing controls.

### Adversarial

Repeat input, hold keys, cancel focused interaction, leave and return, approach from unusual positions, and try already-consumed actions.

### Uninformed

Follow only visible information and generic controls without consulting the implementation plan.

## Trace stop conditions

The build fails when the audit detects any undeclared form of:

- repeated identical action;
- repeated identical output;
- stale prompt;
- time advancement without state change;
- unresolved interaction budget;
- duplicate non-repeatable use.

A scenario may declare an action repeatable only when repetition intentionally produces meaningful variation or accumulation.

## External user role

The user should answer unresolved experiential questions such as:

- did this feel socially alive;
- was this person appealing to spend time with;
- did conduct feel expressive;
- was the writing funny, natural or moving;
- did they want to continue.

The user is not the first runtime tester, stuck-state detector, duplicate-input tester or dialogue copy editor.
