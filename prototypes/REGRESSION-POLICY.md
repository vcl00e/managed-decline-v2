# Prototype Regression Policy

**Status:** accepted project workflow

## Purpose

Managed Decline prototypes are intended to build knowledge and implementation capability gradually.

A new prototype must not casually discard or contradict accepted design findings from earlier work in the same domain. Otherwise playtesting repeatedly rediscovers already-corrected failures instead of answering genuinely new questions.

At the same time, accepted design is not immutable. Later prototypes may deliberately challenge, refine or replace earlier accepted design when there is a reason to test it.

The governing principle is:

> **Accepted designs are inherited defaults, not permanent laws. A later prototype may override them deliberately, but may not ignore them accidentally.**

This policy is a development/process rule. It does not replace the repository's chronological notes and prototype findings as the evidence base for current design.

---

## 1. Accepted design remains chronological and revisable

The root repository design-pass rules continue to apply.

Before designing or implementing a prototype, derive the relevant current accepted design from:

1. accepted decisions in `notes/`;
2. accepted decisions and conclusions in earlier prototype `findings/`;
3. later accepted evidence taking precedence where it clearly supersedes, refines or qualifies earlier evidence.

A newer implementation does **not** supersede an accepted design merely because the code behaves differently.

A newer speculative idea does **not** supersede an accepted design merely because it appears in a prototype proposal.

An earlier accepted design is superseded only when later evidence and user acceptance establish the change.

If accepted designs appear to conflict and chronology does not resolve the conflict, identify that as an unresolved contradiction before treating either interpretation as the prototype baseline.

---

## 2. Distinguish inheritance from deliberate re-testing

Every prototype must classify relevant prior accepted designs into one of three categories.

### A. Inherited constraints

Accepted designs relevant to the same area being implemented but **not currently under test**.

These should be preserved.

Examples:

- an accepted interaction grammar while testing character memory;
- accepted pacing while testing small-group social topology;
- accepted low-friction map UI while testing a larger scenario using the same map interaction domain.

### B. Explicitly under re-test

An accepted design may be deliberately challenged when there is a concrete reason to question it.

The prototype README must state:

- the accepted design being challenged;
- why it is worth reopening;
- what alternative is being tested;
- what evidence would justify superseding the old design.

Until the new result is tested and accepted, the previous design remains the current accepted design outside that experiment.

### C. New or materially different domain

A prototype may use different UI, controls, presentation or mechanics when testing genuinely different functionality where earlier implementation decisions do not apply directly.

For example, a phone interaction prototype need not visually imitate a diorama-map prototype merely because both belong to Managed Decline.

However, higher-level accepted principles still apply where relevant: narrative priority, cognitive-load limits, consequence readability, non-obligatory participation, etc.

---

## 3. Same-domain work inherits earlier learnings

When a new prototype extends or revises an already-tested domain, the burden is on the new prototype to preserve prior accepted strengths.

Do not redesign settled aspects merely because rebuilding them is convenient.

The default implementation rule is:

> **Anything not required to test the new hypothesis inherits the last accepted behaviour/design in that domain.**

A prototype may of course refactor code or simplify implementation internally. What must be preserved is the accepted player-facing behaviour unless that behaviour is explicitly under re-test.

---

## 4. Every prototype requires a delta specification

Before implementation, its README or design specification must contain these headings.

### Baseline

What prior prototype/design is the closest accepted starting point?

### New question / hypothesis

What genuinely unresolved question is this prototype intended to answer?

### Inherited accepted constraints

Which relevant accepted behaviours/designs must remain true?

### Deliberate re-tests / overrides

Which accepted designs, if any, are intentionally being challenged? If none, say so.

### New-domain freedoms

Which parts are new enough that a different UI/mechanic/presentation is intentionally unconstrained by older implementation details?

### Not being tested

Which adjacent systems must not be casually redesigned during this experiment?

### Regression probes

What concrete paths/checks will demonstrate that accepted behaviours are still available?

A prototype without this delta specification is not ready to implement.

---

## 5. Limit the experimental risk cluster

A prototype may require several features, but they should serve one coherent unresolved risk.

Avoid changing unrelated dimensions simultaneously.

For example, testing small-group interaction may reasonably require:

- multiple characters;
- audience tracking;
- group splitting/rejoining;
- NPC-to-NPC dialogue.

It does not automatically justify also replacing:

- accepted map UI;
- accepted time behaviour;
- accepted VN transition rules;
- consequence feedback;
- interaction prompting.

If a second change is necessary, identify it explicitly in the delta specification so it can be reviewed rather than slipping in unnoticed.

---

## 6. System tests and experience-regression tests are different

Passing unit tests does not establish that a prototype has preserved the accepted experience.

### System correctness tests

These verify things such as:

- state transitions;
- memory/provenance;
- commitment tracking;
- deterministic outcomes;
- route validity;
- serialization;
- targeting.

### Experience-regression tests

These verify inherited player-facing possibilities and prohibitions.

Examples:

- a player who wants quiet company can reach it without completing unrelated group scenes;
- non-intervention does not deadlock unrelated play;
- the player can leave a group after joining it;
- a meaningful positioning choice changes something observable;
- a previously removed polling requirement has not returned;
- ordinary map play has not acquired a permanent dashboard/log if the accepted same-domain design avoided one;
- a player is not forced through an authored sequence that the previous design established should be voluntary.

Both categories are required before a prototype is declared ready for user playtesting.

---

## 7. Test the topology, not only the state values

For narrative/social prototypes, automated or scripted regression checks should test whether different **routes through the experience remain possible**.

Useful route probes include:

- quiet / one-to-one route;
- group-social route;
- observer route;
- selective-interest route;
- non-intervention / leave route.

The exact probes depend on the prototype.

The important requirement is that a test should detect an **invisible railway**: apparent spatial/social freedom that secretly requires one authored sequence before other meaningful possibilities unlock.

---

## 8. Meaningful choices need timely observable acknowledgement

Long-term consequences may remain delayed, subtle or partially hidden.

However, if a choice is intended to matter within the current situation, the prototype should normally provide an observable shadow within the next interaction cycle through at least one of:

- changed dialogue;
- changed NPC behaviour;
- changed position or audience;
- changed available affordance;
- changed arrangement;
- changed physical/world state;
- a clearly different immediate continuation.

Purely expressive choices may legitimately remain self-definition, but the build must not present many apparently consequential choices that merely write hidden tags and defer all acknowledgement until the ending.

---

## 9. UI regression gate

UI is allowed to change when a prototype is genuinely testing a new or different interaction domain.

But when extending the **same interaction domain**, earlier accepted UI lessons are inherited unless deliberately reopened.

Before playtest, check for accidental developer-tool leakage such as:

- persistent explanatory dashboards;
- scrolling ambient/event logs;
- permanent objective/action lists;
- visible developer state;
- dense panels that make the experience feel like operating a web application;
- duplicated information that was previously communicated through the fictional world.

Development telemetry may exist, but it should normally be hidden from ordinary play and exported separately.

---

## 10. Known anti-pattern regression scan

Before playtest, explicitly check relevant known failure modes.

### Dialogue terminal

NPC behaves like an inventory of refreshed dialogue to poll.

### Animated scenery

NPC activity is visible but not naturally joinable/avoidable when it matters.

### Invisible railway

The player appears free but meaningful later possibilities require an authored sequence they did not choose.

### Dashboard creep

Simulation complexity is externalised into panels/logs rather than communicated through the game experience.

### Deferred consequence fog

Choices update sophisticated hidden state while the player receives little evidence that anything changed.

### Obligation treadmill

Ordinary life becomes a queue of requests, deadlines and people to disappoint.

### Protagonist gravity

Situations require the player to intervene in order for the world or unrelated play to continue.

### Interaction inflation

A new feature is overrepresented simply because the prototype needs enough samples to test it.

The anti-pattern list can grow as later playtests identify recurring failure classes.

---

## 11. Preflight self-play before user playtest

Before asking the user to spend time on a build, perform a goal-directed preflight rather than only a happy-path completeness run.

For a social prototype, relevant probes may include:

- **quiet player:** wants to spend most of the time with one person;
- **social player:** actively seeks groups and new people;
- **observer:** prefers listening, wandering and minimal intervention;
- **selective player:** cares about one person/situation and ignores another;
- **uninterested player:** declines the surfaced complication and leaves.

The exact profiles should be adapted to the experiment.

If an intended player approach is blocked without a strong fictional/design reason, the prototype is not ready for external playtesting.

---

## 12. Playtest-ready gate

A prototype should only be described as **ready for playtest** after all relevant categories pass.

### Technical

- syntax/build checks pass;
- runtime smoke test passes;
- state/unit tests pass.

### Experimental validity

- the new hypothesis is actually exercised;
- telemetry/evidence can answer the experimental question;
- unrelated systems have not accidentally become experimental variables.

### Regression

- relevant inherited accepted designs were identified;
- explicit re-tests are documented;
- route/topology probes pass;
- UI regression scan passes;
- relevant anti-pattern scan passes;
- meaningful-choice feedback is sufficient for the experiment.

### Experience preflight

- a complete self-play has been performed;
- contrasting player-intent paths have been attempted;
- no known previously corrected failure has knowingly returned unless it is explicitly under re-test.

---

## 13. How accepted design changes after a new test

A prototype finding may show that an inherited accepted design no longer works at larger scale or conflicts with another important goal.

That is legitimate progress, not a regression failure.

The required sequence is:

```text
existing accepted design
        ↓
explicit re-test or newly exposed conflict
        ↓
prototype evidence
        ↓
user evaluates finding
        ↓
new/qualified design explicitly accepted
        ↓
future prototypes inherit the updated design
```

Do not silently rewrite old findings or historical notes. Preserve the chronology.

---

## 14. Protect the user's playtest budget

The user's playtest time should primarily answer **genuinely unresolved design questions**.

Internal preflight should catch obvious returns of already-rejected behaviour whenever practical.

Some regressions will only become visible when accepted systems interact at a new scale. Those are valuable findings. The goal is not to eliminate all failure; it is to avoid wasting playtests on failures that prior evidence already predicted.

---

## Prototype design principle

> **Build upward from accepted evidence. Preserve same-domain learnings by default. Reopen them deliberately when necessary. Use new UI and mechanics freely where genuinely new functionality requires them, but do not let implementation convenience erase knowledge the project has already paid to obtain.**
