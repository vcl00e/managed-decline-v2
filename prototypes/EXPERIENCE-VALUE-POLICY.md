# Prototype Experience Value Policy

**Status:** accepted project workflow

**Extends:** [`REGRESSION-POLICY.md`](./REGRESSION-POLICY.md)

## Purpose

The regression policy prevents new prototypes from casually reintroducing failures the project has already corrected.

That is necessary but not sufficient.

V007b demonstrated a second failure class: a prototype can preserve freedom, topology, UI and state correctness while still offering a poor or nearly empty experience along a major player route.

The governing principle is:

> **A prototype route is not ready merely because it is reachable and regression-safe. Any major player route the experiment invites must provide a credible, worthwhile experience for choosing it.**

This policy protects **positive experiential value**. It does not prescribe a universal amount of dialogue, drama, mechanics or content. The required experience depends on the route and experimental question.

---

## 1. Preserve why an accepted design worked, not only its surface behaviour

When inheriting earlier accepted design, derive both:

1. the player-facing behaviour that was accepted; and
2. the experiential reason it was valuable.

Example:

An earlier finding may establish that non-intervention is valid play.

A weak inheritance is:

> The player can avoid intervening.

The stronger inherited requirement may be:

> The player can avoid intervening **without the game collapsing into lack of experience**; companionship, observation, humour, private context or another worthwhile mode remains available.

A regression review must therefore ask not only:

> Is the old behaviour still possible?

but also:

> Does it still perform the function for which it was accepted?

---

## 2. Every major tested route needs an Experience Contract

Before implementation, identify the major player approaches that the prototype itself invites or claims to test.

For each one, specify:

### Player desire

What does the player choosing this route actually want?

Examples:

- spend meaningful time with one character;
- enjoy a small social group;
- observe and understand an unfolding situation;
- pursue a practical objective;
- explore a place;
- withdraw from a social situation;
- investigate something they care about.

### Intended pleasures / value

What makes this route worth choosing?

Possible sources include:

- character discovery;
- humour;
- intimacy;
- affection;
- self-expression;
- social chemistry;
- curiosity / discovery;
- interpretation;
- atmosphere;
- shared routine or activity;
- material interaction;
- strategic reasoning;
- consequential choice;
- anticipation;
- payoff;
- visible residue;
- a change in future possibilities.

Not every route needs all of these. It needs a coherent enough combination to support the advertised player desire.

### Narrative / interaction bandwidth

What level of presentation is warranted?

For example:

- ambient map interaction;
- a small physical ritual;
- NPC-to-NPC dialogue;
- focused VN conversation;
- a longer authored sequence;
- a mix that rises and falls in bandwidth.

Do not assume that a low-pressure route should also be low-content or low-bandwidth.

### Expected development

What changes over the route?

Examples:

- the player learns something meaningful;
- conversational texture develops;
- a relationship acquires a new motif;
- the player and character share a memorable moment;
- a new arrangement forms;
- the player's understanding changes;
- an emotional stance becomes clearer;
- a future possibility opens;
- the player simply experiences a satisfying contained social beat.

A route may be subtle without being static.

---

## 3. Lower social pressure must not imply lower content quality

A central Managed Decline rule is:

> **Choosing lower social bandwidth must not automatically mean choosing drastically lower narrative or experiential bandwidth.**

A player who chooses one-to-one company over a group is selecting a different social texture, not asking the game to remove most of its meaningful content.

Likewise:

- choosing to observe is not necessarily choosing an empty screen;
- choosing non-intervention is not necessarily choosing no experience;
- choosing ordinary companionship is not necessarily choosing a time-skip;
- choosing calm is not necessarily choosing triviality.

The content can become quieter, more intimate, more observational or less decision-heavy while remaining substantial.

---

## 4. Distinguish interaction noise from narrative substance

When a prototype is exhausting, do not automatically reduce all interaction or dialogue.

Identify which material is low-value overhead versus high-value experience.

### Interaction noise

Examples:

- repeated confirmation of an already clear intention;
- multiple trivial choices whose outcomes are nearly identical;
- prompts required only to keep time moving;
- dialogue choices that merely write hidden tags;
- repeatedly asking whether the player still wants to remain with someone;
- mechanical busywork added only to create samples for telemetry.

Cut aggressively.

### Narrative / experiential substance

Examples:

- meaningful character dialogue;
- humour that develops chemistry;
- revealing disagreement;
- a shared activity with interpersonal meaning;
- significant observation;
- consequential disclosure;
- intimacy;
- a memorable social shift;
- meaningful world interaction;
- a choice whose consequences alter the lived situation.

Preserve or deepen when it serves the route.

The target is:

> **Fewer low-value interactions, not less experience.**

---

## 5. Spatial behaviour should carry sustained intention when possible

If the player has already clearly demonstrated an intention through positioning or a meaningful choice, do not repeatedly ask them to reconfirm it without new fictional stakes.

Avoid:

```text
choose to stay with someone
→ confirm staying
→ confirm lingering
→ little happens
```

Prefer:

```text
remain with someone
→ lived interaction continues
→ a conversational / physical / observational opening develops
→ focused interaction when warranted
→ return to lived space
→ player remains free to stay, move, join others or leave
```

Movement, proximity, following, remaining and leaving can carry social intention across time until circumstances meaningfully change.

---

## 6. Route-value preflight is mandatory

Regression tests answer whether a route exists and avoids known failures.

Route-value preflight answers whether it is worth choosing.

For every major Experience Contract, perform a complete goal-directed preflight and write a short qualitative review answering:

1. **What did this player want?**
2. **What worthwhile experience did the route actually provide?**
3. **What did the player learn, feel, do, share or accomplish?**
4. **How did the experience develop rather than merely persist?**
5. **Did it contain enough high-value material for the interest the game invited?**
6. **Was presentation bandwidth appropriate, including focused treatment where warranted?**
7. **Did the player receive an actual payoff, memorable beat, changed understanding, relationship development or other satisfying result?**
8. **Did choosing this route produce something rather than merely suppressing other content?**
9. **Would this route look worth choosing if the player knew what it contained?**
10. **How does its quality compare with the strongest relevant moments from earlier accepted prototypes?**

A route that is technically reachable but answers these poorly is **not playtest-ready**.

---

## 7. Content / bandwidth review is required before external playtest

Before declaring a build ready, inventory the actual content available to each major tested player approach.

This is not a quota system. Do not equalise routes by line count.

Instead check for gross asymmetry such as:

- group route receives several authored scenes while one-to-one route receives a time-skip;
- intervention route contains all narrative development while non-intervention contains nothing;
- one character receives high-bandwidth interaction while another advertised route receives placeholder material;
- one route has a clear payoff while another simply terminates.

If asymmetry is intentional, explain why the route is still valuable on its own terms.

---

## 8. Compare against positive precedents, not only past bugs

Before external playtest, identify the strongest relevant moments established by earlier prototypes or accepted findings.

Ask:

> Does the new implementation preserve or exceed the experiential qualities we already know can work?

For Managed Decline this may include, depending on the experiment:

- focused VN increasing immersion for important conversation;
- a spatial stay/leave choice visibly changing what the player actually experiences;
- meaningful positioning relative to people;
- ordinary companionship rewarding non-intervention;
- player choices affecting how they personally frame a situation;
- immediate visible divergence when a commitment-bearing choice warrants it.

Passing anti-regression checks while becoming less interesting than earlier successful material is still a failure.

---

## 9. New anti-pattern: Empty freedom

### Empty freedom

The game technically permits a player preference or route, but provides little worthwhile experience for choosing it.

Symptoms include:

- a route exists mainly so a regression test can say it exists;
- avoiding group content removes nearly all meaningful content;
- “spend time together” is implemented as time advancement with little interpersonal material;
- a player reaches the end and reacts with “was that it?”;
- choosing a character produces much less narrative substance than the game implicitly promised;
- freedom means freedom to receive less game.

A prototype containing empty freedom on a major advertised/tested route is not ready for external playtesting.

---

## 10. Playtest-ready gate now has two independent dimensions

A prototype must pass **both**:

### A. Regression safety

Per `REGRESSION-POLICY.md`:

- inherited design preserved unless explicitly reopened;
- route/topology valid;
- UI and pacing regressions absent;
- known anti-patterns checked;
- system correctness established.

### B. Positive experience value

Per this policy:

- each major tested route has an Experience Contract;
- complete route-value preflight performed;
- actual content/bandwidth reviewed;
- positive precedents compared;
- no major route exhibits empty freedom;
- route is judged sufficiently substantive to justify user playtest time.

Passing A does not imply B.

Passing B does not excuse regressions under A.

---

## 11. Evidence standard

Automated tests are useful for route topology, state and structural assertions.

They cannot establish enjoyment, intimacy, humour, narrative substance or whether a scene earns its bandwidth.

Therefore the positive-experience gate requires **qualitative self-review of the complete player experience**, supported by structural checks where useful.

The preflight record should identify remaining uncertainty honestly. It may conclude:

> technically sound but not good enough to send to the user.

That is a successful internal preflight outcome.

---

## 12. Protect the user's playtest budget

The user's role is to answer unresolved experiential questions that require an external player perspective.

The user should not be the first person to discover that a route:

- barely contains content;
- has no meaningful payoff;
- lacks the focused interaction the scenario obviously calls for;
- terminates abruptly;
- is substantially weaker than earlier successful prototype material.

Those are internal design-review failures whenever they are visible from the build itself.

---

## Concise rule

> **Freedom is only valuable when there is something worthwhile to do with it. A route must be both available and worth choosing. Preserve accepted strengths, remove interaction noise, fund the player desires the prototype invites, and do not send a build to external playtest until complete route preflights show actual experiential value.**
