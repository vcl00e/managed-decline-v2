# Prototype Development Policy

**Status:** accepted project workflow

**Supersedes:** `REGRESSION-POLICY.md` and `EXPERIENCE-VALUE-POLICY.md`

## Purpose

Managed Decline prototypes must build upward from accepted evidence without becoming a growing collection of defensive rules for the previous failure.

The workflow therefore uses three gates:

1. **Inheritance** — preserve relevant accepted design unless it is deliberately reopened.
2. **Experience promise** — fund the player experiences the prototype invites.
3. **Whole-play review** — judge the complete experience, not only its state graph or checklist.

The governing principle is:

> **Preserve what has been learned, make an explicit promise about the new experience, and do not send the user a build until the complete experience is genuinely worth testing.**

This policy does not replace the repository’s chronological notes and prototype findings. Those remain the evidence base for current accepted design.

---

# Gate 1 — Inheritance

## 1. Accepted design is chronological and revisable

Before designing or implementing a prototype, derive the relevant current accepted design from:

1. accepted decisions in `notes/`;
2. accepted conclusions in earlier prototype `findings/`;
3. later accepted evidence where it clearly supersedes, refines or qualifies earlier evidence.

Accepted design is an inherited default, not a permanent law.

A later prototype may deliberately challenge or replace it, but a new implementation does not supersede it merely because the code behaves differently.

If accepted designs conflict and chronology does not resolve the conflict, identify the contradiction before implementation.

## 2. Same-domain work inherits prior player-facing strengths

When extending an already-tested interaction domain:

> **Anything not required to test the new hypothesis inherits the last accepted player-facing behaviour in that domain.**

Internal refactoring is unrestricted. Player-facing behaviour is preserved unless explicitly under re-test.

A genuinely different domain may use different UI, controls or presentation. Higher-level accepted principles still apply where relevant.

## 3. Every prototype begins with a delta specification

Before implementation, the README or design specification must state:

### Baseline

The closest accepted starting point.

### New question / hypothesis

The genuinely unresolved question being tested.

### Inherited accepted constraints

What must remain true.

### Deliberate re-tests / overrides

What accepted design is being challenged, why, and what evidence would justify replacing it. State `none` when applicable.

### New-domain freedoms

What is genuinely new and therefore not constrained by earlier implementation details.

### Not being tested

Adjacent systems that must not drift into the experiment.

### Regression probes

Concrete checks that inherited behaviour is still available.

### Experience promises

The major player desires the prototype invites and what worthwhile experience each one is promised.

A prototype without this specification is not ready to implement.

## 4. Limit the experimental risk cluster

Several features may be required, but they should serve one coherent unresolved risk.

Do not casually change unrelated dimensions such as UI, time, presentation or feedback merely because rebuilding them is convenient.

---

# Gate 2 — Experience promise

## 5. Do not expose an unfunded experience

A meaningful-looking affordance creates a promise.

Examples:

- `Stay with Tabitha` promises worthwhile Tabitha time.
- `Join the radio group` promises ensemble chemistry and participation.
- `Observe` promises something meaningful to notice.
- `Visit Maya’s flat` promises a place or encounter worth visiting.

Do not expose the affordance merely so the route graph can claim it exists.

> **Freedom to receive less game is not meaningful freedom.**

If a player desire is not adequately funded, either fund it or stop presenting it as a major possibility in that prototype.

## 6. Define an Experience Contract for each major promoted player desire

An Experience Contract is concise. It answers:

### Player desire

What is the player actually trying to experience?

### Experience promise

What makes choosing it worthwhile?

### Appropriate bandwidth

What mixture of lived-space interaction, observation, physical ritual, NPC-to-NPC dialogue, focused VN or other presentation does it warrant?

### Development

How does the experience become more specific, interesting or meaningful rather than merely persist?

### Payoff and residue

What crystallises, changes, becomes memorable or carries forward?

Experience Contracts are not line-count quotas and do not require equal routes. Different desires can offer different pleasures and lengths. Each must be credible on its own terms.

## 7. Use the active-experience model when it clarifies design

For social and narrative slices, designers should reason about the player’s **currently chosen experience**, not only a route through flags.

A useful internal model is:

```text
FOCUS
Who or what currently matters?

MODE
One-to-one / group / observer / practical / exploratory / other

PLAYER DESIRE
What has the player demonstrated they want?

EXPERIENCE PROMISE
What value is now owed?

CURRENT MATERIAL
People, place, objects, situations and authored material available now

ARC
Entry → development → participation → payoff → residue

INTERRUPTION TOLERANCE
How readily should unrelated material intrude?
```

This is a design and authoring aid, not a required universal runtime framework.

The game may implement it with authored state, situation logic, narrative attention, character policy or another suitable architecture.

## 8. Let sustained behaviour carry sustained intention

Once the player has clearly demonstrated an intention through positioning or a meaningful choice, do not repeatedly ask them to reconfirm it without new stakes.

Avoid:

```text
choose to stay
→ confirm staying
→ confirm lingering
→ little happens
```

Prefer:

```text
remain with someone
→ the chosen experience develops
→ focused interaction when warranted
→ return to lived space
→ player remains free to stay, change focus or leave
```

Movement, proximity, following, remaining and leaving can carry intention until circumstances meaningfully change.

## 9. Distinguish interaction noise from experience substance

When a prototype is exhausting, remove low-value interaction rather than indiscriminately removing narrative content.

### Interaction noise

- repeated confirmation of an established intention;
- prompts used only to advance time;
- trivial choices with nearly identical consequences;
- choices whose main effect is hidden telemetry;
- mechanics added only to create test samples.

### Experience substance

- character discovery;
- humour and chemistry;
- meaningful observation;
- intimacy or revealing disagreement;
- shared activity with interpersonal meaning;
- consequential expression;
- changed understanding, possibility or residue.

The target is:

> **Fewer low-value interactions, not less experience.**

## 10. Timely acknowledgement remains required

A choice intended to matter within the current situation should normally cast an observable shadow within the next interaction cycle through changed dialogue, behaviour, position, audience, affordance, arrangement or world state.

Long-term consequences may still be delayed or subtle.

Purely expressive choices may remain primarily self-definition, but the prototype must not disguise hidden tags as broad agency.

---

# Gate 3 — Whole-play review

## 11. Automated tests establish safety, not quality

Automated tests are appropriate for:

- state transitions;
- route topology;
- determinism and serialization;
- audience, provenance and commitments;
- movement and targeting;
- absence of known UI regressions;
- immediate observable state changes.

They cannot establish:

- whether dialogue is interesting;
- whether chemistry works;
- whether pacing feels natural;
- whether a scene earns its bandwidth;
- whether an experience is fun or emotionally satisfying.

Do not treat a passing test suite as evidence of entertainment quality.

## 12. Complete route-value preflight is mandatory

For every major Experience Contract, perform the complete experience with that player desire as the goal.

The review must answer:

1. What did this player want?
2. What worthwhile experience did the build actually provide?
3. What did the player learn, feel, do, share, understand or accomplish?
4. How did the experience develop?
5. Was the presentation bandwidth appropriate?
6. What was the payoff or residue?
7. Did the route create something, rather than merely suppress other content?
8. Would it still look worth choosing if the player knew what it contained?
9. How did it compare with the strongest relevant accepted moments from earlier prototypes?
10. Would the reviewer voluntarily continue playing?

Weak answers block external playtest.

A valid internal conclusion is:

> technically sound, but not good enough to send to the user.

## 13. Review the whole slice, not only named routes

After goal-directed preflights, play the build normally from beginning to end.

Judge:

- overall rhythm;
- cumulative cognitive load;
- whether transitions feel authored or mechanical;
- whether the world feels alive rather than sparse or dashboard-driven;
- whether different player interests receive appropriate attention;
- whether the ending feels earned rather than abrupt;
- whether the prototype is actually testing the intended question.

## 14. Compare against positive precedents

A new prototype must not merely avoid old bugs while becoming less interesting than earlier successful material.

Identify the strongest relevant accepted moments and ask whether the new slice preserves or exceeds the qualities that made them work.

---

# Known anti-patterns

Before external playtest, scan for relevant recurring failures.

### Dialogue terminal

NPC behaves like an inventory of refreshed dialogue to poll.

### Animated scenery

NPC activity is visible but not naturally joinable or avoidable when it matters.

### Invisible railway

Apparent freedom hides a required authored sequence.

### Dashboard creep

Simulation complexity leaks into panels, logs or permanent action lists.

### Deferred consequence fog

Sophisticated hidden state has little observable effect.

### Obligation treadmill

Ordinary life becomes a queue of requests and people to disappoint.

### Protagonist gravity

Situations require player intervention to continue.

### Interaction inflation

The tested feature is overrepresented merely to generate evidence.

### Empty freedom

A promoted player preference is technically permitted but provides little worthwhile experience.

### Content starvation

Calm, observation, non-intervention or one-to-one play is treated as permission to remove narrative substance.

---

# Playtest-ready gate

A prototype is ready for the user only when all three gates pass.

## Inheritance

- relevant accepted design derived;
- deliberate re-tests documented;
- same-domain UI, pacing and interaction strengths preserved;
- route/topology and known-regression probes pass.

## Experience promise

- major promoted player desires identified;
- each has a credible Experience Contract;
- no meaningful-looking affordance is conspicuously unfunded;
- interaction noise is controlled;
- meaningful choices receive suitable acknowledgement.

## Whole-play review

- technical checks and runtime smoke pass;
- contrasting goal-directed preflights completed;
- complete qualitative reviews written;
- positive precedents compared;
- full-slice playthrough completed;
- no major route exhibits empty freedom or content starvation;
- reviewer judges the build worth the user’s time.

---

# Updating accepted design after a test

A prototype may expose a real conflict with accepted design. That is legitimate progress.

Use the sequence:

```text
accepted design
→ explicit re-test or newly exposed conflict
→ prototype evidence
→ user evaluation
→ revised design explicitly accepted
→ future prototypes inherit it
```

Do not silently rewrite historical notes or treat implementation drift as supersession.

---

## Concise principle

> **Build upward from accepted evidence. Promise only experiences the prototype actually funds. Use tests to prevent avoidable failure, use judgment to assess quality, and reserve the user’s playtest time for questions that remain genuinely unresolved after complete internal play.**
