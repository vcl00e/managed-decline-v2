# Social Agency, Dramatic Kernels and Narrative-Supporting Mechanics

**Date:** 2026-08-23

**Status:** Accepted design direction

**Builds on:**
- `2026-08-19_core-game-loop-desire-formation-and-hook-supply.md`
- `2026-08-21_narrative-first-interaction-design-and-prototype-findings.md`
- `2026-08-12_character-model-personality-memory-relationships-and-growth.md`
- `2026-08-12_narrative-attention-player-evidence-and-personalised-story-control.md`

---

# Why this note exists

This discussion began with a question about why free-text LLM interaction appears to offer enormous player freedom and agency, while game research and playtesting often suggest that LLM input is not required to maximise agency in a story-driven game.

The discussion then exposed a more important design problem.

The target is **not** simply:

- free text versus dialogue choices;
- deterministic versus uncertain outcomes;
- low versus high cognitive load;
- deep relationship simulation;
- or adding conventional gameplay beside the narrative.

The target is:

> **Give the player a large and sophisticated space of meaningful human intentions, strategies and consequences without forcing them to wrestle with the interface or reduce the experience to manipulating relationship variables. Then couple those social systems to concrete world activity so that gameplay continuously manufactures dramatically meaningful situations.**

The accepted direction therefore combines five linked conclusions:

1. **Expressive freedom is not the same thing as agency.**
2. **A deep social model only matters if it creates richer player desires, dilemmas, strategies and consequences.**
3. **A social model alone risks becoming a “who trusts whom” simulator.**
4. **The game needs concrete activity outside the relationship itself, but that activity must generate relationship-relevant dramatic situations rather than sit beside the story.**
5. **The correct amount of mechanics is the smallest coupled mechanical ecology capable of repeatedly producing the desired range of narrative dilemmas and consequences.**

---

# 1. Agency: preserve intention through the whole loop

A player being allowed to type anything does not by itself create strong agency.

Free text mainly expands **linguistic and expressive possibility**. Agency depends on whether the game can preserve the player’s meaningful intention through the complete causal loop:

```text
PLAYER INTENTION
      ↓
ACTION / EXPRESSION
      ↓
SYSTEM INTERPRETATION
      ↓
WORLD + SOCIAL RESOLUTION
      ↓
PERSISTENT CONSEQUENCES
      ↓
OBSERVABLE FEEDBACK
      ↓
NEW POSSIBILITIES / PROBLEMS
      ↓
PLAYER FORMS A NEW PLAN
```

The useful design concept is **intention-to-consequence fidelity**:

> How much of the player’s meaningful intention survives from planning, through input and interpretation, into persistent state and future play?

A system can accept thousands of sentences but still have low agency if they collapse into a few generic outcomes.

Conversely, a constrained interface can support high agency if a small set of actions creates meaningfully different persistent consequences.

The desired game should achieve both:

- **high semantic / expressive coverage**;
- **high causal differentiation**.

---

# 2. Do not confuse useful cognitive depth with interface burden

The earlier discussion over-focused on uncertainty and briefly risked treating high cognitive demand as desirable merely because a small free-text romance study found higher mental demand alongside greater absorption and preference.

That conclusion is rejected.

The correct distinction is between different sources of cognitive load.

## Formulation load — minimise

Effort spent deciding:

- what sentence to type;
- how long it should be;
- what wording the AI will understand;
- whether sarcasm will parse correctly;
- whether the player has to invent a response from a blank box.

This is mostly interface tax.

## Strategic load — potentially valuable

Effort spent deciding:

- what the player actually wants;
- what another person appears to want;
- whether to apologise, conceal, confront, wait, compromise or take a risk;
- which objective should be sacrificed;
- what consequences are tolerable.

This can be the game.

## Diagnostic load — allow only when supported by evidence

Effort spent interpreting:

- why somebody reacted as they did;
- what the player may have misunderstood;
- which contextual factors mattered;
- what might work differently next time.

This can create mastery if the system supplies enough evidence to build a useful mental model.

## Repair load — minimise aggressively

Effort spent correcting the machine:

- “No, that was sarcasm.”
- “I meant to ask her, not threaten her.”
- “Why did the AI treat that as a confession?”

This is not desirable complexity.

The design objective is therefore:

> **Put the player’s thinking inside the fictional problem, not inside the control scheme or language model.**

Research context:

- The 2010 *Façade* interface comparison found free natural-language input engaging for many players, but also hardest to use, with players frequently uncertain what to say or how to phrase it. More constrained interfaces gave stronger control over outcomes. No interface maximised all forms of agency and engagement.  
  https://www.aaronareed.net/papers/Agency-FDG10.pdf
- A 2026 LLM romance prototype with 22 participants found free text increased mental demand, effort and discomfort while also increasing several engagement measures. This demonstrates a trade-off, not that high workload is good.  
  https://www.jstage.jst.go.jp/article/pjsai/JSAI2026/0/JSAI2026_2G1OS2102/_pdf/-char/en

The likely opportunity is to preserve the expressive value while engineering away much of the formulation burden.

---

# 3. A likely interaction direction: compositional intentions with optional free text

“Hybrid input” is not itself a proven answer, but it is a promising design hypothesis.

The strongest version would not simply place a text box beside three dialogue options.

Instead, the game can expose **contextually meaningful social affordances**.

Example:

```text
Current possible intentions:
- repair trust
- seek reassurance
- disclose something
- test a suspicion
- challenge an accusation
- negotiate a commitment
- set a boundary
- withdraw
- recruit an ally
- something else…
```

A second layer can express *how* the player attempts the action:

- topic;
- stance;
- disclosure / vulnerability;
- pressure;
- commitment;
- audience;
- timing;
- risk;
- honesty / deception.

Example:

```text
Repair trust
→ accept full responsibility
→ ask for a private conversation
→ make no demand for forgiveness
```

The game can then generate natural wording that the player may accept, alter or replace entirely.

Free text becomes an **expressive overflow channel** rather than a compulsory blank-page test.

This preserves recognition for players who do not know what to type while retaining a path for unanticipated intentions.

The key requirement is that nuanced expression must survive into mechanics. It is pointless to parse a sophisticated utterance and reduce it to:

```text
APOLOGY
trust += 3
```

A structured social act may instead preserve dimensions such as:

```text
social_act: admit_breach
accountability: full
pressure_for_forgiveness: none
request: private_conversation
audience: public
vulnerability: high
deception: false
commitment: repair_relationship
```

The internal implementation does not have to be wholly symbolic. It may combine authored rules, probabilistic models, planners, learned components and LLM judgments. Important state transitions should nevertheless be grounded, persisted and inspectable during development.

---

# 4. Feedback is as important as input

The design problem is not only how the player acts. It is how the game closes the loop.

After a meaningful action, the experience should eventually answer four different questions.

## A. Did the game understand what I attempted?

Desired clarity: **very high**.

Possible feedback:

- an intention preview;
- generated wording showing the interpretation;
- an NPC paraphrasing the implication;
- a natural clarification question if interpretation confidence is low;
- an optional interaction log.

## B. Did my action matter?

Desired clarity: **very high**.

The response should acknowledge meaningful dimensions of the action rather than merely produce fluent prose.

## C. What kind of consequence did it produce?

Desired clarity: **moderate to high**.

The game does not need to display `Trust +4`, but it should expose diagnostic behavioural evidence:

- somebody shares or withholds information;
- approaches or avoids the player;
- changes a plan;
- cancels an invitation;
- takes the player’s side;
- becomes affectionate but less trusting;
- accepts one request while refusing another.

## D. How did it alter future possibilities?

Consequences should change the later action space:

- topics open or close;
- promises become enforceable;
- invitations appear or disappear;
- secrets spread;
- alliances form;
- characters initiate new situations;
- a future confrontation occurs under different conditions.

The player does not need deterministic outcomes. They do need confidence that the system understood their action, that it mattered, and that continued observation can improve their model of the world.

---

# 5. Why a deep social model matters at all

The player should not care that the game contains a sophisticated social model.

The model matters only if it creates **more kinds of meaningful things for the player to want**.

A shallow dating game frequently collapses toward one objective:

> Make character X like / date the player.

A deeper social model can support desires such as:

- I want her to trust me.
- I want him to respect me despite disagreement.
- I want her to forgive me, without necessarily restarting the romance.
- I want him to choose me without manipulating him.
- I want to keep this casual without hurting her.
- I want to tell the truth without revealing somebody else’s confidence.
- I want to protect my friend even if it damages my romance.
- I want these two people to reconcile.
- I want to make somebody jealous.
- I want to stop being jealous.
- I want to become somebody this character could respect.
- I finally got the relationship I pursued, but I am beginning to think it is bad for both of us.

The purpose of social depth is therefore:

> **Create deeper player desires, deeper obstacles to those desires, and richer consequences for how the player pursues them.**

A useful test for every social variable, memory feature or relationship mechanic is:

> **What new desire, dilemma, strategy, consequence or story becomes possible because this exists?**

If the answer is only “the NPC response becomes more realistic,” the feature is low priority.

---

# 6. But a deep social model alone becomes a trust simulator

This was an important correction.

If most problems reduce to manipulating:

- trust;
- attraction;
- jealousy;
- reputation;
- obligations;
- secrets;
- who knows whom;

then the game risks becoming a sophisticated **social-state simulator** rather than a full narrative game.

Relationships need a domain of action outside themselves.

People become interesting partly because they:

- solve problems together;
- make things;
- compete;
- depend on each other;
- take risks;
- share scarce resources;
- make sacrifices;
- fail each other;
- pursue incompatible goals.

The stronger principle is:

> **Do not merely simulate relationships. Simulate consequential situations that relationships matter inside.**

The player should have non-dialogue verbs and concrete world objectives.

Dialogue becomes one action channel among several rather than the entirety of play.

---

# 7. Interdependent action is the gameplay

The target architecture is not:

```text
GAMEPLAY             ROMANCE
combat               dialogue
exploration          dates
crafting              relationship meter
```

That produces a mechanical game with a story attached.

The desired architecture is coupled:

```text
           WORLD / ACTIVITY SYSTEM
     project / work / investigation /
    exploration / creation / resources
                   ↕
           SITUATIONAL SYSTEM
     dependency / conflict / scarcity /
      risk / coordination / information
                   ↕
             SOCIAL SYSTEM
    beliefs / memory / commitments /
 relationships / goals / interpretation
                   ↕
               NARRATIVE
```

The crucial rule is bidirectional:

> **Major world mechanics should be capable of producing interpersonal consequences, and important interpersonal states should alter world-gameplay possibilities.**

If the activity is fun but relationships never affect it, it is probably a minigame attached to the story.

If the activity merely changes relationship state, it is still a trust simulator.

The target is **coupling**.

---

# 8. The activity should not be defined by occupation or genre

“Running a restaurant,” “investigation,” “politics,” “music,” “medicine,” “survival” and “archaeology” are domains or settings, not sufficiently precise definitions of gameplay.

The activity should instead be defined in terms of the **recurring decision structure**.

Examples:

### Restaurant domain

Weak definition:

> Run a restaurant.

Useful definition:

> **Make commitments under limited time and decide who or what gets sacrificed when those commitments collide.**

### Investigation domain

Useful definition:

> **Form beliefs from incomplete evidence and decide whom to trust with those beliefs and what risks to take before certainty is available.**

### Expedition domain

Useful definition:

> **Take consequential risks while depending on people whose competence, judgment and motives are imperfectly understood.**

### Political campaign domain

Useful definition:

> **Build coalitions while deciding what values, promises and relationships may be compromised in pursuit of an external objective.**

These formulations identify what the player repeatedly reasons about.

---

# 9. Define the game’s dramatic kernel before choosing mechanics

The accepted design term for this is the **dramatic kernel**:

> **A repeatable kind of problem that is mechanically interesting and simultaneously exposes character, relationship and value conflicts.**

A strong dramatic kernel should have at least four properties.

## 1. Genuine trade-offs

There should regularly be no action that improves everything.

For example, the player cannot simultaneously:

- protect someone’s feelings;
- tell the whole truth;
- meet the deadline;
- preserve their own reputation;
- and secure the external objective.

## 2. Character differences alter the solution

Different characters should change strategy because they:

- notice different things;
- tolerate different risks;
- have different competencies;
- possess different information;
- pursue different priorities;
- react differently to pressure.

Characters should not merely provide numerical bonuses.

## 3. Actions generate new situations

Outcomes should create narrative fuel:

- a deadline is missed;
- somebody sees something;
- a debt or promise is created;
- evidence disappears;
- somebody takes responsibility for the player;
- success creates resentment;
- another opportunity appears.

## 4. Social state and world mechanics affect one another

If the coupling only works one way, the systems remain partly bolted together.

---

# 10. Choose the activity from the human questions

Do not start with:

> What gameplay genre goes with romance?

Start with:

> **What recurring external situations naturally force the human questions this narrative wants to explore?**

Example human question:

> Can two ambitious people love one another without one becoming subordinate to the other?

A business, restaurant, touring band or political setting may fit not because those activities are inherently romantic, but because they naturally generate:

- hierarchy;
- recognition;
- credit;
- ownership;
- opportunity cost;
- financial pressure;
- incompatible opportunities;
- sacrifice;
- conflicting standards.

The activity is good when **the mechanical problem and the relationship problem are manifestations of the same underlying dilemma**.

---

# 11. Candidate activity properties with high narrative yield

The following kinds of mechanics are especially promising because they naturally create interdependence and meaningful state.

## Time

Time scarcity turns values into behaviour.

One evening cannot simultaneously be used to:

- prepare for work;
- help a friend;
- pursue a lead;
- attend a romantic event;
- rest;
- meet another person.

The strong implementation produces multiple consequences from one commitment rather than simply spending an action point for affection.

## Information

Information is both mechanically actionable and narratively meaningful.

Information can be:

- discovered;
- verified;
- concealed;
- revealed;
- traded;
- entrusted;
- misrepresented;
- acted upon.

Who knows something, who told them, and whether the information is true can matter simultaneously to strategy and relationships.

## Commitments / promises / obligations

These naturally create future constraints, expectations and dilemmas.

They are both game state and narrative state.

## Money / resources

Money has high dramatic yield when it determines meaningful human possibilities:

- whose career gets prioritised;
- whether somebody needs another job;
- whether to accept help from somebody untrusted;
- whether to move;
- whether to lend money;
- whether dependency enters a relationship.

It has low dramatic yield when it is mostly used to buy generic upgrades or affection gifts.

## Shared projects / creation

Building or creating something together naturally supports:

- ownership;
- ambition;
- creative disagreement;
- division of labour;
- recognition;
- compromise;
- sacrifice.

The created object can become persistent material history rather than merely a progress bar.

## Specialisation and dependence

Characters can possess genuine capabilities that change what is possible.

The player may love someone who is a poor choice for a task, dislike someone they desperately need, or choose between competence and loyalty.

## Coordination

Shared performance can turn relationship development into mechanical fluency:

- cooking;
- playing music;
- navigating;
- running a con;
- performing;
- managing a crisis.

The player gradually learns another person’s tendencies rather than merely levelling a relationship score.

## Physical / spatial activity

Going places, manipulating objects and observing who shows up or stays behind gives relationships meaning beyond dialogue.

Sometimes “she came” or “he stayed” can carry more weight than another long conversation.

---

# 12. Mechanics should carry meaningful state

A useful filter is whether a mechanic’s state is both:

> **mechanically actionable**

and

> **narratively interpretable**.

High-value examples:

- evidence;
- promises;
- debts;
- scheduled commitments;
- ownership shares;
- shared possessions;
- messages;
- secrets;
- locations;
- invitations;
- opportunities.

Lower-value examples are systems whose state is mainly operational and self-contained unless the game is specifically about mastering them.

This does not mean generic mechanics are forbidden. It means they must earn their complexity through narrative coupling.

---

# 13. How much mechanics? Use mechanical dramatic yield, not feature count

There is no meaningful universal number of mechanics.

The better criterion is **mechanical dramatic yield**:

> **How many interesting decisions, consequences, character revelations and future situations does this mechanic generate for the amount of complexity it asks the player to learn?**

For every proposed mechanic, ask whether it does at least two of the following:

1. Creates interesting external decisions.
2. Creates or changes interpersonal situations.
3. Lets player skill or mastery meaningfully develop.
4. Produces persistent consequences the narrative can use.
5. Expresses something about the game’s central human questions.

A mechanic that does only one should be treated with suspicion.

A mechanic that does none should be cut.

The target is **combinatorial depth**, not breadth of feature categories.

---

# 14. Three layers of mechanics

A useful scope-control model is to divide mechanics into three layers.

## Layer 1 — Core decision mechanics

These are systems the player genuinely learns and masters.

Keep this group relatively small.

Possible families include:

- time;
- information;
- commitments;
- resources;
- project / world state;
- choosing people to involve or depend upon.

Their interactions create depth.

## Layer 2 — Expressive mechanics

These define *how* a core action is performed.

Example: the decision is to reveal evidence to somebody.

Expressive dimensions might include:

- reveal everything or selectively;
- ask what they know first;
- lie about the source;
- show it privately or publicly;
- make a demand or ask for help;
- reveal it immediately or later.

LLMs may be particularly valuable here because combinatorial expression is expensive to author manually.

## Layer 3 — Texture mechanics

These create embodiment, pacing and materiality but should normally remain mechanically light unless central to the game:

- movement;
- choosing where to sit;
- ordering food;
- dressing;
- taking photographs;
- texting;
- travel;
- decorating;
- handling objects.

Their job is to make the world tangible and allow context to carry meaning, not to become independent optimisation systems.

---

# 15. Coupling density: detect mechanics that are becoming separate games

A practical design heuristic is a **coupling matrix**.

Example system set:

| | Time | Money | Project | Information | Relationships |
|---|---:|---:|---:|---:|---:|
| **Time** | — | ✓ | ✓ | ✓ | ✓ |
| **Money** | ✓ | — | ✓ | | ✓ |
| **Project** | ✓ | ✓ | — | ✓ | ✓ |
| **Information** | ✓ | | ✓ | — | ✓ |
| **Relationships** | ✓ | ✓ | ✓ | ✓ | — |

A proposed mechanic that mostly interacts with itself may be becoming a game inside the game.

This is not a validated academic metric; it is a production heuristic for maintaining narrative-system integration.

---

# 16. Stop deepening a subsystem when mastery stops producing narrative decisions

A subsystem has crossed the useful boundary when additional mastery mostly produces better performance **inside the subsystem itself** rather than new dramatically meaningful decisions.

Example restaurant system:

Useful depth:

- dishes consume different time;
- ingredients are scarce;
- staff have different strengths;
- quality competes with throughput;
- mistakes affect reputation and people.

Potentially excessive depth, unless the game is fundamentally about being a chef:

- detailed knife techniques;
- precise pan-temperature simulation;
- large spice-modifier trees;
- complex execution mechanics whose main reward is culinary optimisation.

The stop rule is:

> **Stop adding depth when the dominant reward becomes subsystem performance rather than richer narrative decision-making.**

---

# 17. Attention share: measure what players think about

A crucial playtest question is:

> **When the player is thinking hard, what are they thinking about?**

Good examples:

- “Do I keep this person on the team even though they are angry with the person I need?”
- “Can I afford to keep this promise and still meet the deadline?”
- “Do I tell her what I know now or verify it first?”

Warning signs:

- “What sentence does the AI expect?”
- “What is the optimal grinding route?”
- “Which upgrade gives 4% more efficiency?”
- “How do I exploit the economy?”

The desired cognitive effort concerns **human goals, trade-offs, evidence, strategy and consequence**.

---

# 18. Three prototype tests for integration

## Test A — Remove the dialogue

Temporarily replace prose with functional summaries:

- “Maya refuses.”
- “Daniel offers to help.”
- “Lena asks you to cover her shift.”

Does the game still produce:

- dilemmas;
- trade-offs;
- different strategies;
- reversals;
- meaningful consequences?

If not, the writing may be manufacturing nearly all the interesting situations.

## Test B — Remove mechanical jargon

Can each meaningful decision be described as a dramatically comprehensible action?

Good:

- “I worked late.”
- “I told her first.”
- “I trusted him with the evidence.”
- “I took the promotion.”
- “I chose Lena for the trip.”

Warning:

- “I upgraded efficiency from 12% to 18%.”

If the action loses meaning outside mechanical jargon, it may not be carrying enough narrative content.

## Test C — Scene-generation test

Does the mechanic regularly produce states worth dramatizing?

Strong:

> You promised Maya you would attend her opening. A critical source will only meet you that same evening. Daniel offers to meet the source instead, but you do not fully trust him.

Weak:

> You lack enough energy points to perform the date activity.

The first system generates a scene. The second mostly gates content.

---

# 19. Narrative and mechanics should share one causal substrate

The target is not:

> story + gameplay

and not merely:

> story integrated with gameplay.

The stronger target is:

> **A mechanical system whose ordinary operation continuously produces dramatically meaningful situations, while narrative context gives those mechanical states human meaning.**

A useful loop is:

```text
        DRAMATIC KERNEL
   recurring human dilemma
             ↓
       ACTIVITY SYSTEM
 time / information / resources /
 commitments / external objective
             ↓
        PLAYER DECISION
             ↓
       WORLD CONSEQUENCE
          ↙       ↘
 external state   human meaning
          ↘       ↙
      CHARACTER RESPONSE
             ↓
   NEW DRAMATIC SITUATION
             ↓
        PLAYER DECISION
```

The activity is therefore not present to entertain the player between scenes.

> **The activity is the machine that manufactures the scenes.**

---

# 20. NPC initiative remains important, but it is not the whole game

A social model should answer more than “how much does this person trust the player?”

It should influence:

> **Given our history, this person’s goals, the current situation and external stakes, what will this person actually do?**

Characters should sometimes:

- invite or avoid the player;
- investigate independently;
- seek reassurance;
- confront;
- court another person;
- expose a secret;
- pursue career or project opportunities;
- make sacrifices;
- refuse help;
- attempt repair themselves.

But their actions should engage with the world/activity system, not circulate endlessly inside relationship state.

---

# 21. Rejected framings — do not regress to these

The following conclusions were explicitly rejected or corrected during the discussion.

## Rejected: “The main design problem is uncertainty”

Uncertainty can be useful, but it is not the thesis. The central issue is balancing expressive depth, cognitive accessibility and causal feedback.

## Rejected: “High input cognitive load may be good because it increases immersion”

Do not confuse correlation in a small prototype with a design goal. Formulation and repair burden should generally be reduced.

## Rejected: “Free text equals high agency”

Free text expands expressive possibility but only creates strong agency when meaningfully interpreted, persisted and reflected in future play.

## Rejected: “Hybrid input is already the proven answer”

It is a promising hypothesis that should be tested against alternatives.

## Rejected: “A deep social model is sufficient gameplay”

Without external goals and actions, it can collapse into a trust/relationship simulator.

## Rejected: “Choose an occupational fantasy and add mechanics for it”

Restaurant, journalism, politics, music, etc. are domains. Define the recurring dramatic decision structure first.

## Rejected: “More mechanics makes the game more game-like”

Additional systems can dilute the narrative. Prefer a small number of strongly coupled mechanics with high dramatic yield.

## Rejected: “The activity should remain fun with the story removed”

This conflicts with the accepted narrative-first hierarchy from the 2026-08-21 note. The activity may derive much of its meaning from narrative context. It must produce meaningful decisions and consequences, not necessarily stand alone as an independent toy.

---

# 22. Research-informed evaluation plan

Current LLM game research is still too immature to prescribe an optimal input ratio or final architecture. Short prototype studies can establish trade-offs but not long-term mastery, fatigue, coherence or attachment.

Future prototypes should therefore evaluate the full loop rather than asking only whether players like free text.

Useful measures:

| Measure | Question |
|---|---|
| **Intent coverage** | Could the player express the social/world action they actually wanted? |
| **Novel-intent yield** | How often did free text enable a valid mechanically meaningful intention unavailable in the structured interface? |
| **Formulation burden** | How much time, rewriting, abandonment or help did input require? |
| **Interpretation fidelity** | Did the system’s structured interpretation match what the player meant? |
| **Causal comprehension** | Can the player explain what the game understood and why the situation changed? |
| **State divergence** | Do different strategies create genuinely different world/social states rather than different prose? |
| **Predictive mastery** | Do players become better at anticipating consequences over repeated sessions? |
| **Strategic diversity** | Are there several viable ways to pursue goals? |
| **Attention share** | Is player thought focused on the fictional dilemma or on interface/system exploitation? |
| **Long-term fatigue** | Do players increasingly avoid conversations, free text or complex systems? |
| **Narrative ownership** | Do players describe events as consequences of what they chose to do rather than branches they selected? |

Possible experimental conditions:

1. dynamic / authored choices;
2. compositional intention interface;
3. compositional intentions + optional free text;

crossed with:

1. basic NPC-response feedback;
2. layered semantic + causal feedback.

Longer repeated-session tests are required before concluding that any interface supports real mastery rather than novelty.

---

# 23. What this means specifically for Managed Decline

This note does **not** yet select Managed Decline’s final recurring activity or mechanical ecology.

That would be premature.

The accepted next design problem is now much narrower and better specified:

> **Identify Managed Decline’s central recurring human questions and dramatic dilemmas, then derive the smallest activity system whose normal operation repeatedly produces those dilemmas in contemporary British life.**

Candidate mechanics should then be tested for:

- dramatic yield;
- coupling density;
- meaningful state;
- attention share;
- compatibility with the narrative-first hierarchy;
- ability to create consequences without grind;
- ability to generate distinctive character situations;
- ability to make the player’s concrete world goals and relationships affect one another bidirectionally.

The final activity could involve work, money, information, commitments, places, projects, political/social situations, creative activity, bureaucracy or some combination, but the domain should be chosen **after** defining the dramatic kernel.

The design should resist turning Managed Decline into:

- a generic RPG with romance scenes;
- a management game with dialogue attached;
- a VN with decorative minigames;
- or an LLM social sandbox with no external stakes.

---

# Accepted principles

1. **The player does not care about the sophistication of the social model itself; they care about the desires, dilemmas, people and consequences it enables.**
2. **Simplicity should compress a sophisticated possibility space, not erase it.**
3. **Freedom only matters when player intention survives into persistent consequence.**
4. **Minimise formulation and repair burden; preserve meaningful strategic and interpretive depth.**
5. **Feedback must confirm interpretation, effect, consequence type and future-state change.**
6. **Do not reduce relationships to trust/attraction optimisation.**
7. **Give the player concrete world goals and non-dialogue verbs.**
8. **Interdependent action is the stronger gameplay foundation: people should matter because the player does consequential things with, for, against and because of them.**
9. **Define the activity by its recurring decision structure, not by its occupational or genre label.**
10. **Choose a dramatic kernel before choosing detailed mechanics.**
11. **Prefer mechanics whose state is both mechanically actionable and narratively meaningful.**
12. **Prefer combinatorial depth among a small number of strongly coupled systems over many independent mechanic categories.**
13. **Stop deepening a subsystem when mastery mainly improves performance inside that subsystem rather than creating richer dramatic decisions.**
14. **Measure what players think about: the difficult thought should concern fictional people, goals, evidence and trade-offs, not interface operation.**
15. **The activity should manufacture scenes rather than occupy the player between them.**
16. **Narrative meaning and game mechanics should operate on the same causal state.**
17. **The next task is to derive Managed Decline’s actual activity/mechanical ecology from its dramatic kernel rather than selecting a familiar gameplay genre first.**

---

# Concise design statement

> **Managed Decline should not bolt story onto mechanics or bolt mechanics onto story. Its activity system should repeatedly create concrete, consequential human dilemmas; its social and narrative systems should interpret and remember how the player handled them; and those consequences should reshape what the player can do next. The right amount of mechanics is the minimum coupled ecology capable of generating that range of situations without becoming an independent optimisation game.**
