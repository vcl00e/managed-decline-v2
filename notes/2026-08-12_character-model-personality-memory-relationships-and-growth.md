# Character model: personality, memory, relationships, voice and growth

**Status:** Agreed design direction

**Context:** Spin-off from the JRPG Movement and Design discussion, especially deliberate automated characters, LLM safety, fixed control vocabularies, and the Narrative Experience Control discussion about maintaining an interesting authored experience while allowing characters to change subtly over time.

## Problem

Managed Decline needs characters who are distinctive, recognisable and capable of persistent relationships with the player without turning each NPC into an opaque psychology simulation.

The system needs to represent:

- personality;
- behaviours, habits and tendencies;
- how a character tends to make other people feel;
- grammar, vocabulary and narrative voice;
- backstory;
- beliefs and knowledge;
- current emotions;
- memories of experiences, especially experiences involving the player;
- subtle character growth over time;
- social relationships in a world that may contain many generated NPCs.

It must also avoid an explosion of hidden state and pairwise relationships. A large party, for example, must not result in a permanent relationship object for every pair of attendees.

## Core principle

Do **not** attempt to simulate a complete human mind.

Instead, each important character should be an **authored identity with a small, legible adaptive layer**:

> Strong authored identity + small behavioural policies + bounded autobiographical memory + bounded social graph + slow adaptive growth.

The narrative controller creates meaningful pressures and opportunities for change. The character system decides how those pressures are expressed. The LLM is primarily a constrained realiser of dialogue and micro-behaviour rather than the owner of psychology or canonical game state.

A hidden variable should only exist if it:

1. changes future decisions;
2. produces an observable difference the player can eventually notice; and
3. can be represented compactly enough to remain understandable and testable.

## 1. Separate stable identity from changing state

Character information should be divided into layers with very different rates of change.

| Layer | Examples | Change rate |
|---|---|---|
| Character spine | values, central contradiction, wants, fears, coping style | almost never |
| Behavioural style | habits, conversational moves, stress responses | slowly |
| Voice | grammar, register, idioms, rhythm, characteristic constructions | extremely slowly |
| Beliefs | opinions, assumptions and interpretations | slowly |
| Relationships | familiarity, trust, friction, obligations | episodically |
| Arc state | lessons being learned, defensive adaptations | very slowly |
| Current concerns | goals, worries, unresolved tasks | scenes/days |
| Emotion | irritation, excitement, shame, fear, etc. | minutes/scenes |
| Working memory | what just happened in the current interaction | seconds/minutes |

This keeps temporary anger from becoming a personality rewrite and prevents relationship changes from automatically rewriting worldview.

## 2. Give important characters a small character spine

A useful minimal authored structure is:

```yaml
character_spine:
  primary_want:
  primary_fear:
  core_value:
  contradiction:
  coping_strategy:
  social_effect:
```

The **contradiction** is especially important because it generates behaviour better than a list of adjectives.

Examples:

- A character desperately wants to be regarded as competent but becomes reckless whenever they suspect somebody thinks they need help.
- A character wants everybody to feel included but handles conflict by joking until it becomes impossible to ignore.

The system should favour these generative tensions over generic traits such as `confident`, `friendly` or `kind`.

## 3. Model a character's social signature

Each character can have an authored **social signature** describing how their presence tends to affect people around them.

Examples:

- makes uncertain people feel more uncertain;
- makes people feel as if they are already part of the joke;
- makes others unusually willing to confess things while also feeling slightly analysed;
- raises the energy of a room even when doing so is inappropriate.

Do not store the resulting feeling as a permanent A→B stat for every pair of people.

Instead calculate temporary scene responses from:

```text
Character A's social signals
× Character B's sensitivities
× current context
→ temporary social response
```

For example, a character may emit `status_pressure`, `impatience` and `competence`. A status-sensitive character may become defensive while somebody who admires competence may become attentive.

This creates interpersonal chemistry without another huge persistent-state system.

## 4. Behaviour should be policies, not dozens of personality sliders

Large sets of continuous traits such as `agreeableness = 0.61`, `jealousy = 0.41`, etc. may be useful during procedural generation but should not be the main runtime model.

Instead characters should have **recognisable response tendencies**:

```yaml
behaviour:
  when_embarrassed:
    default: make_joke
    alternatives: [change_subject, minimise]

  when_status_challenged:
    default: counterattack
    alternatives: [show_off, dismiss]

  when_someone_is_upset:
    default: practical_help
    alternatives: [awkward_reassurance]

  when_personally_vulnerable:
    default: deflect
    trusted_person_patch: partial_disclosure
```

Weighted alternatives can stop characters becoming robotic while keeping them recognisable.

A shared fixed conversational control vocabulary could include intents such as:

```text
ASK
ANSWER
TEASE
REASSURE
CHALLENGE
EVADE
DEFLECT
DISCLOSE
PROBE
APOLOGISE
BARGAIN
FLATTER
WARN
DISMISS
INVITE
REFUSE
CHANGE_SUBJECT
LEAVE
```

The simulation operates in this constrained semantic space.

## 5. Separate control vocabulary from surface language

There should be two vocabularies.

### Control vocabulary

Hard constrained. Actions, intentions, concepts, gestures, game objects, relationship events and narrative events come from the game's ontology. The LLM cannot invent new canonical actions or facts.

### Surface-language vocabulary

Much looser, but strongly conditioned by the character's authored voice.

A character voice specification might include:

```yaml
voice:
  register: informal_educated
  directness: high
  sentence_length: short
  contractions: frequent
  hedging: rare

  discourse_markers:
    preferred: ["look", "right", "anyway"]
    avoid: ["indeed", "moreover"]

  humour:
    style: dry_understatement

  profanity:
    frequency: occasional
    intensity: mild

  metaphor_domains:
    preferred: [work, football, bureaucracy]

  conversational_tendencies:
    - answers questions with questions when defensive
    - rarely gives enthusiastic praise
    - uses people's names when annoyed

  prohibited:
    - faux-philosophical monologues
    - inappropriate Americanisms outside known exposure
    - theatrical villain language
```

The LLM may therefore have substantial expressive freedom in English while the **space of things it is allowed to mean remains constrained**.

For Managed Decline's British identity, character distinction should rely more on syntax, rhythm, register, vocabulary, understatement, euphemism, swearing, class signalling and code-switching than on exaggerated phonetic accent spelling.

## 6. Represent backstory as causal atoms

Do not feed or maintain giant runtime biographies. Break backstory into meaningful atoms that have behavioural or narrative consequences.

```yaml
backstory_atom:
  fact: "Was expelled from sixth form."
  meaning_to_character: "Still considers it proof authority is arbitrary."
  behavioural_effect: authority_challenge
  emotional_trigger: condescension
  who_knows: [mother, old_friend]
  disclosure_level: private
```

Backstory earns persistent storage when it affects behaviour, knowledge, relationships or narrative possibilities.

Disclosure level must be controlled outside the LLM so the model cannot casually dump secrets or unrevealed biography.

## 7. Keep world truth, character knowledge and character belief separate

These are different things.

### World truth

Canonical fact in the game state:

> The landlord raised the rent.

### Character knowledge

What a character has actually learned:

> Chloe knows the landlord raised the rent.

### Character belief

What the character infers or believes:

> Chloe believes Ben complained to the landlord.

The belief may be wrong.

Exceptional knowledge can be represented compactly:

```text
CLAIM: ben_reported_party
STATE: suspects
SOURCE: alice
CONFIDENCE: medium
```

Most mundane knowledge should come from **knowledge packages** such as:

```text
works_at_pub
lives_in_neighbourhood
student_at_college
knows_local_bus_routes
follows_football
```

A pub worker should not require hundreds of individual facts merely to understand ordinary pub work.

## 8. Keep emotion deliberately low-resolution

Avoid large emotion vectors.

A compact emotional state is sufficient:

```yaml
emotion:
  primary: angry
  secondary: embarrassed
  intensity: 2   # 0-3
  target: player
  cause: publicly_criticised
```

Personality and coping policy determine how the emotion is expressed. Two angry characters can therefore behave completely differently.

Emotion should normally decay automatically unless an unresolved concern keeps reactivating it.

## 9. Character growth should modify expression rather than replace identity

Important characters should have an authored **arc question**.

Example:

> Can Ella learn to ask people for help without interpreting dependency as humiliation?

Ella may consistently value independence and fear appearing incompetent. Growth should not delete those traits. Instead it gradually changes the available and likely responses.

Early:

```text
vulnerability -> deny
vulnerability -> joke
vulnerability -> leave
```

Later:

```text
vulnerability -> joke
vulnerability -> partial honesty
vulnerability -> ask trusted person privately
```

The character remains recognisably Ella, but the player can notice meaningful change.

Growth can be implemented as changes in response eligibility and weighting rather than as a generic maturity level.

For example:

```text
baseline:
DEFLECT              60%
DENY                 25%
PARTIAL_DISCLOSURE   15%

after growth:
DEFLECT              40%
PARTIAL_DISCLOSURE   40%
ASK_FOR_HELP         20%
```

Her humour, voice and major values may remain essentially unchanged.

## 10. Growth should require narrative evidence, not grindable XP

Do not allow the player to grind character development by repeatedly selecting the nicest response.

A useful arc pattern is:

```text
pressure
→ habitual response
→ consequence
→ reflection
→ later similar pressure
```

The game records meaningful evidence, for example:

```text
Ella refused help -> disaster
Ella accepted help reluctantly -> positive outcome
Player respected Ella's vulnerability
Ella witnessed somebody else admit failure without losing status
```

After several distinct meaningful experiences, an adaptation becomes eligible.

The narrative controller can decide whether the story is ready for that behavioural change without dictating every line of dialogue.

## 11. Memory should be bounded and hierarchical

Characters should not retain complete dialogue logs.

Useful memory layers are:

| Memory | Example | Lifetime |
|---|---|---|
| Working | "You just insulted my boss." | current interaction |
| Episodic | "You covered for me at the council meeting." | persistent but bounded |
| Relationship summary | "You tend to help me when things go wrong." | very persistent |
| Landmark memory | "We got arrested together." | effectively permanent |

Store memories structurally rather than primarily as generated prose:

```yaml
event: helped_hide_mistake
participants: [player, ella]
location: office
outcome: success
ella_appraisal:
  gratitude: high
  embarrassment: medium
salience: 8
private: true
```

When referenced later, the current voice system realises the memory in dialogue. This allows the *same memory* to be expressed differently after character growth.

## 12. Memory must support eviction and compression

A plausible bounded budget for important characters is approximately:

```text
~10-20 autobiographical landmarks
~5-10 relationship-defining events per major relationship
several unresolved current incidents
recent conversational context
```

Numbers should be tuned during prototyping rather than treated as final constants.

Lower-salience incidents can be compressed into relationship beliefs.

For example, several separate acts of assistance might become:

```text
relationship belief:
"Player is dependable when I am in trouble."
evidence: 3
```

Some individual landmark incidents can remain while lesser supporting incidents are discarded.

## 13. Prevent relationship explosion with relationship tiers

Do not simply declare that only named characters may have relationships, because that would make generated NPCs visibly second-class and prevent emergent attachment.

Use social tiers instead.

### Crowd / extras

- no persistent dyadic relationships;
- derive behaviour from social context and group membership.

### Recurring procedural characters

- persistent identity;
- limited memories;
- can recognise the player and a small number of relevant people.

### Supporting characters

- limited persistent relationship slots;
- potentially around 5-10 meaningful dyadic relationships, to be tuned.

### Core characters

- authored major relationships;
- some capacity for emergent additional relationships.

Crucially, characters may be **promoted between tiers**.

If the player repeatedly involves a generated shop worker, neighbour or acquaintance in meaningful events, that person can become a persistent supporting character.

> Narrative importance creates namedness rather than namedness creating narrative importance.

## 14. Parties and large gatherings should use shared event nodes, not N² relationships

A party of 40 attendees contains 780 possible pairs. A party of 100 contains 4,950. Most of these pairs should never become persistent relationship objects.

Instead create one shared event node:

```text
EVENT_914:
Sam's birthday party
participants:
  Alice
  Ben
  Chloe
  ...
```

Participants can remember that they attended the event.

If Alice later meets Chloe, the system can discover that they share `Sam's birthday party` and permit dialogue such as remembering or recognising one another from it without requiring a pre-existing Alice↔Chloe relationship object.

If the player explicitly introduces people, store a lightweight introduction marker associated with the event or social context rather than immediately allocating full relationships.

## 15. Meeting someone is not the same as forming a relationship

Useful social recognition levels are:

```text
UNKNOWN
RECOGNISABLE
ACQUAINTED
RELATIONSHIP
SIGNIFICANT_RELATIONSHIP
```

Most people at a large gathering should never progress beyond `RECOGNISABLE` or `ACQUAINTED`.

A full relationship object should only be allocated after meaningful direct interaction, repeated contact, a salient shared incident, mutual relevance to goals, adoption by a narrative storyline, or deliberate repeated player involvement.

This creates a natural throttle on social-state growth.

## 16. Prefer group relationships for weak social ties

Many apparent person-to-person relationships are better represented by social-group state.

Instead of storing that Alice likes every member of a football club individually, store something like:

```text
Alice:
  group: football_club
  belonging: strong
  status: respected

Ben:
  group: football_club
  belonging: weak
  status: newcomer
```

Initial behaviour between them can be inferred from that context.

A dedicated dyadic Alice↔Ben relationship is created only if their individual history becomes meaningful.

This is effectively **lazy allocation of social state**.

## 17. Keep persistent relationship objects compact

Even important relationships do not need numerous meters.

A relationship might contain:

```yaml
relationship:
  familiarity: close
  trust: high
  friction: moderate

  current_issue: unpaid_debt

  motifs:
    - mutual_teasing
    - ella_hates_being_helped

  landmark_memories:
    - office_coverup
    - disastrous_birthday
```

Recurring **relationship motifs** can be more narratively productive than another continuous statistic.

Examples include:

- constantly competing;
- habitually covering for each other;
- flirting by arguing;
- mentorship;
- a shared secret;
- inability to discuss a particular incident;
- former friends pretending not to care.

## 18. The LLM must never own persistent state

The desired runtime architecture is approximately:

```text
WORLD STATE
    ↓
NARRATIVE CONTROLLER
    decides what is currently permissible/relevant
    ↓
CHARACTER DECISION SYSTEM
    selects goals + conversational/physical intent
    ↓
MEMORY RETRIEVAL
    retrieves a small number of relevant memories
    ↓
VOICE SYSTEM
    supplies character language constraints
    ↓
LLM
    realises the selected intent
    ↓
VALIDATOR
    checks facts / permissions / vocabulary / actions
    ↓
GAME STATE REDUCER
    applies deterministic consequences
```

The LLM can receive information such as:

```text
INTENT:
    reassure_player

EMOTION:
    embarrassed, intensity 1

RELATIONSHIP:
    familiar / high trust / mild friction

RELEVANT MEMORY:
    player covered for character at work

CURRENT ARC PATCH:
    now occasionally admits uncertainty

KNOWN FACTS:
    [...]

FORBIDDEN DISCLOSURES:
    [...]

VOICE:
    [...]
```

It may realise this as dialogue, but it must not be allowed to author canonical state transitions such as:

```text
trust += 7
ella_has_learned_vulnerability = true
player_now_knows_secret_32 = true
```

Those consequences belong to deterministic game logic.

This is important for save-game correctness, testing, narrative validation and debugging.

## 19. Important hidden state must cast an observable shadow

The player should not need explicit meters such as `TRUST: 71/100`, but important state changes must become inferable through behaviour.

Trust may appear through:

- a changed greeting;
- unsolicited disclosure;
- access to private space;
- asking the player for help;
- more intimate teasing;
- remembering something the player said much earlier.

Growth may appear when a familiar situation produces a subtly different response.

Damaged relationships may appear through seating, interruptions, eye contact, favours, communication patterns and references to previous incidents.

The player should be able to form ordinary human judgements such as:

> "I think she trusts me now."

without requiring an exposed underlying score.

## Agreed prototype rules

1. Every core character gets one central contradiction, one social signature and one active character question.
2. Important behaviour is expressed through a small shared vocabulary of intents plus character-specific weighted policies.
3. Emotions are temporary; relationships change slowly; personality changes extremely slowly.
4. Character growth modifies habitual responses rather than rewriting the character.
5. Persistent memories are notable events and summaries, never complete dialogue logs.
6. The world owns truth; characters own incomplete knowledge and beliefs about truth.
7. Shared events and group membership handle weak social connections.
8. A meeting does not allocate a permanent relationship.
9. Meaningful relationships are lazily instantiated and strictly bounded.
10. Procedural NPCs can be promoted if the player makes them narratively important.
11. The LLM expresses decisions but cannot create canonical facts, actions, relationships or memories.
12. Every important hidden change must eventually be inferable from observable behaviour.

## Overall design target

The intended result is a system where a character can:

- recognise the player;
- remember meaningful shared experiences;
- misunderstand the player;
- develop opinions about the player;
- revise beliefs;
- carry unresolved issues across scenes;
- grow subtly because of experiences involving the player;
- retain a recognisable voice, personality and behavioural identity throughout that growth;

without requiring hundreds of opaque psychological variables or an unbounded pairwise social graph.

Large social events remain tractable because they produce shared event membership and lightweight recognition rather than creating every possible pairwise relationship. Full relationships only materialise when later narrative evidence demonstrates that a meaningful relationship actually exists.
