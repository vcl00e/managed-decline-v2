# LLM-safe emergent NPC conversations

## User

is there a way to make llm safe for npc and characters in an emergent jrpg style game?  one extreme is to pre-generate all possible dialogue but that will be impossible to review and also consume lots of disk space. the other extreme is to have a censored and appropriately licensed model with guardrails but the guardrails are not guaranteed to work I don't want this to have any chance to break the game experience or cause legal issues

## Assistant

Yes. If your requirement is **“the player must never see an unsafe or legally problematic model output”**, the strongest architecture is to **never let the LLM generate player-visible prose at runtime**.

Instead, use the LLM as a *decision-maker* inside a deterministic dialogue system.

### A safer architecture

```text
World state
    ↓
LLM / planner
    ↓
Structured dialogue intent
    ↓
Strict validator
    ↓
Dialogue realization engine
    ↓
Player-visible text
```

For example, the LLM is allowed to produce something like:

```json
{
  "speech_act": "WARN",
  "topic": "FOREST_MONSTERS",
  "attitude": "NERVOUS",
  "intensity": 2,
  "target": "PLAYER",
  "fact": "MONSTERS_ACTIVE_AT_NIGHT"
}
```

It is **not** allowed to produce:

> "Don't go into the forest tonight..."

Your own deterministic dialogue engine turns the validated structure into the actual sentence.

For example:

```text
WARN + FOREST_MONSTERS + NERVOUS
→ "{hesitation} You shouldn't go into {forest} tonight. {monster_warning}"
```

with approved fragments:

```text
hesitation:
  - "Um..."
  - "Listen..."
  - "I don't like saying this, but..."

monster_warning:
  - "The monsters have been restless."
  - "Something dangerous has been moving among the trees."
  - "People who enter after dark haven't been coming back quickly."
```

This gives you **combinatorial dialogue without combinatorial review**.

A few thousand reviewed components can generate millions of combinations.

---

## Think of it as a "Dialogue VM"

I would give the NPC system a deliberately small instruction set.

For a JRPG, you might have:

```text
GREET
FAREWELL
ASK
ANSWER
WARN
THREATEN
REASSURE
THANK
APOLOGIZE
REFUSE
AGREE
DISAGREE
GOSSIP
REVEAL
LIE
BARGAIN
COMPLAIN
CELEBRATE
MOURN
TEASE
```

And then separately:

```text
emotion
relationship
social status
knowledge state
quest state
faction
location
time
urgency
personality
```

The generative model can make sophisticated decisions within that space:

> "Given what Marielle knows, her personality, the fact that the player betrayed the guild, and the current invasion, what should she communicate?"

But its output might only be:

```json
{
  "speech_act": "REFUSE",
  "reason": "GUILD_BETRAYAL",
  "emotion": "ANGRY",
  "relationship_change": -2,
  "reveal": []
}
```

A deterministic system owns the language.

That gives you emergent **behavior** without emergent uncontrolled **content**.

---

## You don't need to pre-generate every sentence

The useful middle ground is **compositional authored language**.

Think of old-school procedural generation:

```text
sentence =
    opening
  + proposition
  + emotional_modifier
  + closing
```

Individual components can themselves contain constrained alternatives.

An NPC's personality could control realization:

```text
Concept:
PLAYER_SHOULD_LEAVE

Knight:
"You should leave this place at once."

Street kid:
"Yeah, I'd get out of here if I were you."

Scholar:
"Remaining here would be extremely unwise."

Robot:
"Recommendation: evacuate."
```

You can review the **grammar and phrase inventory**, rather than every resulting permutation.

This is much closer to how localization systems, dialogue middleware, grammar-based procedural generation and traditional NLG systems work than an unrestricted chatbot.

---

## The crucial rule

If you want a hard guarantee:

> **No arbitrary string produced by the model may cross the trust boundary into the game.**

Not even after a moderation model approves it.

A moderation classifier is probabilistic too.

The pipeline should instead be:

```text
LLM output
     ↓
parse against schema
     ↓
reject unknown enum/value
     ↓
verify referenced facts against world database
     ↓
verify permitted dialogue action
     ↓
deterministically render
```

If parsing or validation fails:

```text
NPC → safe deterministic fallback
```

such as an idle reaction, generic acknowledgement, or previously authored response.

The failure should look like normal game behavior rather than:

> "I'm sorry, but I cannot assist with that request."

which is obviously disastrous for immersion.

---

## You can still get surprisingly deep emergence

The generative part can control things that are much more interesting than prose:

- what an NPC notices;
- what they remember;
- whom they trust;
- what they infer;
- whether they lie;
- what goal they pursue;
- which information they reveal;
- whom they tell about an event;
- what they ask the player to do;
- how relationships evolve;
- what topics they avoid;
- what emotion they express.

For example:

```text
NPC witnesses:
PLAYER steals medicine

NPC reasoning:
medicine was for NPC's daughter
player previously saved village
guards are corrupt
NPC fears retaliation

Result:
speech_act = CONFRONT
severity = LOW
public_accusation = false
request = RETURN_MEDICINE
emotion = CONFLICTED
```

That is genuine emergence.

You don't need the model to invent the sentence for the situation to feel dynamic.

---

## A useful compromise for richer prose

You can have several safety tiers.

| Layer | Generation | Guarantee |
|---|---|---|
| **A** | Fully authored sentence | Very high |
| **B** | Authored grammar + approved fragments | Very high |
| **C** | Model selects words from finite vocabulary | High |
| **D** | Model generates prose + filters | Probabilistic |
| **E** | Raw chatbot output | Probabilistic and difficult to control |

For a commercial game where an unexpected sentence is unacceptable, I would keep **all player-visible NPC dialogue in A–C**.

You could still use D internally during development—for example, letting an LLM generate candidate dialogue variants that writers approve and add to the phrase bank.

That shifts generation from:

```text
runtime → player
```

to:

```text
development → review → game data → player
```

which is much easier to control.

---

## It also helps with legal risk

This architecture lets you prevent entire categories of output structurally.

For example, runtime schemas can simply have **no representation** for:

```text
real-world person
real company
real political organization
URL
phone number
arbitrary quotation
sexual content
racial terminology
copyrighted character
external product
```

Your game's ontology might contain only:

```text
character_id
faction_id
place_id
item_id
monster_id
quest_id
event_id
```

So the model can say:

```json
{"target":"CHARACTER_047"}
```

but cannot decide to start talking about a real celebrity.

That is considerably stronger than asking a prompt to "please stay in character."

It won't eliminate every legal consideration—licensing of the model/runtime itself, privacy, localization, ratings requirements, and your own authored material still need normal review—but it dramatically reduces the model-specific surface area.

---

## One further improvement: separate facts from dialogue

Don't ask the model:

> "What should the bartender tell the player?"

Ask two questions internally:

```text
1. What does the bartender currently believe?
2. Given those beliefs and goals, which permitted communication action should they take?
```

Then enforce:

```text
asserted_fact ∈ NPC.beliefs
```

unless:

```text
speech_act = LIE
```

and even a lie has to reference an existing proposition.

This prevents the classic LLM problem where an NPC spontaneously invents:

- nonexistent quests,
- nonexistent locations,
- new relatives,
- world history,
- game mechanics,
- promises that the game cannot fulfill.

For an emergent RPG, **world consistency is arguably an even bigger problem than offensive content**.

---

## The design I would use

Something approximately like this:

```text
┌───────────────────────────────┐
│ Simulation                    │
│ relationships, quests, world │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│ NPC cognition / LLM           │
│ goals, beliefs, planning      │
└───────────────┬───────────────┘
                │ JSON only
                ▼
┌───────────────────────────────┐
│ Capability validator          │
│ schema + ontology + rules     │
└───────────────┬───────────────┘
                │ valid intent
                ▼
┌───────────────────────────────┐
│ Dialogue planner              │
│ speech act + beats            │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│ Authored realization grammar  │
│ persona + emotion + locale    │
└───────────────┬───────────────┘
                │
                ▼
             PLAYER
```

And **nothing the LLM writes is ever displayed**.

That is the architectural distinction I'd make:

> Don't try to build a perfectly safe chatbot.  
> Build a safe game system that happens to use an LLM for some of its reasoning.

If the model is only choosing among capabilities that your game engine already understands and permits, a hallucination becomes an invalid command rather than a line of dialogue that can damage the experience.

## User

will this approach allow players to enter free text to the npc and feel like they are having a conversation ?  will forcing player to type sentences make the game input tedius and difficult?

## Assistant

Yes, with an important distinction:

> **The player can type arbitrary free text even if the NPC cannot generate arbitrary free text.**

The player's input can be treated as untrusted natural-language input that gets converted into your game's constrained semantic representation.

For example, the player types:

> "Look, I know you don't trust me after what happened at the temple, but the mayor is lying. Did you actually see him leave town last night?"

Internally, the system might derive:

```json
{
  "speech_act": "ASK",
  "topic": "MAYOR_WHEREABOUTS",
  "claim": "MAYOR_IS_LYING",
  "reference_event": "TEMPLE_INCIDENT",
  "tone": "PERSUASIVE",
  "request": "WITNESS_TESTIMONY"
}
```

The NPC simulation then evaluates that against its memories, beliefs, personality, relationship with the player, current goals, and so on.

So the conversation loop becomes:

```text
Player free text
      ↓
LLM semantic parser
      ↓
validated game concepts
      ↓
NPC reasoning
      ↓
validated response intent
      ↓
authored dialogue realization
      ↓
NPC response
```

That can absolutely **feel like a conversation**.

The key is that you permit very flexible *understanding* while constraining *expression*.

## The harder problem is actually the player's input

You shouldn't let the semantic interpreter invent arbitrary game facts either.

Suppose the player writes:

> "Your brother Stefan told me you're secretly working for the king."

But this NPC has no brother, there is no Stefan, and perhaps there isn't even a king.

You want the parser to produce something like:

```json
{
  "speech_act": "CLAIM",
  "referenced_entity": null,
  "unresolved_terms": [
    "Stefan",
    "your brother",
    "the king"
  ]
}
```

Then the NPC can respond through approved behavior:

> "I don't have a brother."

or:

> "Who is Stefan?"

That can actually make the world feel **more** responsive than a conventional dialogue tree.

The important principle is:

> Player language may contain arbitrary strings.  
> Game meaning may not.

---

# Will typing everything become tedious?

**Very likely, yes.**

Free-text input sounds attractive because it maximizes agency, but mandatory typing has substantial UX costs.

Players have to:

- stop using their normal controls;
- formulate what they want to say;
- type it;
- deal with spelling and phrasing;
- wonder what the system will understand;
- repeat themselves when interpretation fails.

This is particularly problematic in a JRPG, where conversations can happen dozens or hundreds of times.

You can easily turn:

```text
talk → select "Where is the inn?"
```

into:

```text
talk → keyboard → type "where is the inn" → enter → keyboard away
```

which is objectively more interaction for a routine action.

And on a controller, handheld, or console, it becomes substantially worse.

So I would **not make free text the primary dialogue mechanic**.

---

# A hybrid interface is much stronger

You can combine conventional JRPG interaction with optional natural language.

For example:

```text
┌─────────────────────────────────────┐
│ Innkeeper                           │
│                                     │
│ "You're back. Any luck at the mine?"│
│                                     │
│ [Tell him about the monster]        │
│ [Ask about the missing miners]      │
│ [Ask about the mayor]               │
│ [Say goodbye]                       │
│                                     │
│ > Say something else...             │
└─────────────────────────────────────┘
```

The buttons aren't necessarily traditional fixed dialogue branches.

They can be **dynamically generated conversation suggestions** based on the current situation.

So after discovering a bloody pendant, you might get:

```text
[Ask about the pendant]
```

After hearing a rumor:

```text
[Ask about the northern road]
```

After angering the NPC:

```text
[Apologize]
[Try to explain]
```

And the player always has:

```text
[Say something else...]
```

That gives you the convenience of a JRPG dialogue interface and the expressiveness of an LLM.

---

## I would go even further

Don't think of the buttons as dialogue choices.

Think of them as **conversation autocomplete**.

The game is predicting things the player might reasonably want to say.

For example:

```text
NPC:
"I haven't seen my daughter since yesterday."

Suggested:

[Where did you last see her?]
[What does she look like?]
[I'll help find her.]
[Why would she leave?]

> Say something else...
```

The suggestions make conversations fast.

Free text gives players an escape hatch whenever the system hasn't anticipated what they want.

This is probably the best interaction model for your concept.

---

# You can also accept extremely abbreviated input

Players shouldn't have to roleplay complete sentences unless they enjoy doing so.

All of these could mean approximately the same thing:

```text
mayor?
where mayor
did you see mayor
mayor last night?
what do you know about the mayor
where was the mayor yesterday
```

Your semantic layer normalizes them to something like:

```json
{
  "speech_act": "ASK",
  "topic": "MAYOR",
  "property": "LOCATION",
  "time": "LAST_NIGHT"
}
```

Then players naturally learn that they can communicate efficiently.

Some players will type:

> "Madam, I must insist that you tell me where the mayor was last night."

Others will type:

> `mayor location yesterday`

Both work.

That's desirable.

---

# There is another interesting possibility

You can let the player use ordinary game controls to establish much of the conversational context.

For example, instead of typing:

> "What can you tell me about this strange medallion I found in the catacombs?"

the player can:

```text
Inventory → Ancient Medallion → Show to NPC
```

Now the conversation context contains:

```json
{
  "action": "SHOW_ITEM",
  "item": "ANCIENT_MEDALLION"
}
```

and the NPC reacts.

Similarly:

```text
Character → Mayor → Ask about
Quest → Missing Caravan → Ask about
Location → Old Mine → Ask about
```

Free text is then primarily useful for **intent and nuance**, rather than having to type nouns the game already knows about.

That reduces friction enormously.

---

# What makes it actually feel conversational?

Not eloquent generated prose.

I would prioritize these five things:

1. **NPC memory**  
   NPCs remember relevant things the player previously said or did.

2. **Reference resolution**  
   "What about his daughter?" correctly refers to the person you were just discussing.

3. **Contextual reactions**  
   NPCs behave differently depending on relationships, events, evidence, and timing.

4. **Conversational continuity**  
   A question causes an answer, which creates sensible follow-up possibilities.

5. **World grounding**  
   NPCs know what they should know and don't magically know everything.

If those work, relatively simple authored dialogue can feel surprisingly intelligent.

If those don't work, even an extremely capable prose-generating model will feel like ChatGPT wearing an NPC costume.

---

## Example

Imagine this conversation.

The player previously caught a merchant lying about a stolen sword.

```text
Merchant:
"Back again? I've already told you everything I know."

Suggested:
[Ask about the sword]
[Accuse him of lying]
[Ask where he was yesterday]
[Leave]

> Say something else...
```

Player types:

> `your assistant saw you`

Interpreter:

```json
{
  "speech_act": "ACCUSE",
  "claim": "ASSISTANT_WITNESSED_MERCHANT",
  "confidence": "UNSPECIFIED"
}
```

NPC state:

```text
merchant knows assistant saw crime
merchant believes player may be bluffing
merchant fear = 7
merchant trust(player) = -4
```

Planner chooses:

```json
{
  "speech_act": "CHALLENGE",
  "goal": "TEST_PLAYER_KNOWLEDGE",
  "emotion": "NERVOUS",
  "topic": "ASSISTANT_TESTIMONY"
}
```

Authored realization:

> "Oh? And what exactly did Lysa claim to have seen?"

Player:

> `you meeting the smuggler`

Now the merchant's internal behavior changes because the player demonstrated knowledge.

That interaction can be genuinely emergent even though **not a single NPC sentence was freely generated**.

---

## The architecture I would investigate

I think your strongest design space is:

**LLM-powered conversational understanding + NPC cognition + deterministic language generation + dynamic suggested responses + optional free text.**

Not:

**LLM chatbot NPCs.**

That distinction solves several problems simultaneously: safety, lore consistency, hallucinated quests, UX friction, localization, character voice, age ratings, and much of the legal uncertainty around uncontrolled output.

It also means your core innovation can be the **simulation of what characters think and how they react**, rather than trying to make a language model impersonate every character.

## User

what about emotional conversations for romance, friendship, community and belonging but conversations are strictly in character and can't leave the predefined templates and vocabulary. will it work well? 

## Assistant

Yes. **It can work very well**, including for romance, friendship, grief, reconciliation, community, and belonging. But the templates need to constrain the **surface language**, not flatten the **emotional state machine** underneath it.

The wrong design is essentially Mad Libs:

```text
"I feel [EMOTION] because you [ACTION]."
"You are very [RELATIONSHIP_ADJECTIVE] to me."
```

Players will detect the machinery almost immediately.

The stronger design is:

```text
emergent relationship simulation
        ↓
emotional interpretation
        ↓
conversation / scene planning
        ↓
authored emotional beats
        ↓
authored realization grammar
        ↓
animation + expression + timing
```

The model chooses **what the character means**, while your writers control every way that meaning can be expressed.

## Emotional depth does not require unlimited vocabulary

Consider an NPC who has gradually become attached to the protagonist.

Internally you might track:

```text
affection = 73
trust = 91
admiration = 54
dependency = 18
resentment = 12

shared_history:
    PLAYER_DEFENDED_NPC
    NPC_REVEALED_FAMILY_SECRET
    PLAYER_RETURNED_HEIRLOOM
    PLAYER_BROKE_PROMISE

current_state:
    affection + hurt
```

The player says:

> "I didn't come back because I was afraid you'd hate me."

The input interpreter reduces this to something constrained:

```json
{
  "act": "CONFESS",
  "subject": "ABSENCE",
  "reason": "FEAR_OF_REJECTION",
  "target": "NPC",
  "sincerity": "UNKNOWN"
}
```

The NPC's emotional system can conclude:

```text
primary emotion: relief
secondary emotion: lingering hurt
goal: reconcile
boundary: wants acknowledgment of broken promise
relationship direction: closer
```

Then your dialogue system chooses an authored **reconciliation beat** appropriate to those conditions.

Maybe:

> "Hate you? No. I was angry. I still am, a little. But that wasn't what I wanted."

Nothing in that sentence has to come from an LLM.

What makes it emotionally effective is that **this NPC says it because of what actually happened between the characters**.

---

# Specificity matters more than linguistic freedom

Generic lines kill emotional conversations:

> "You've always been there for me."

That's fine once.

What players remember is:

> "You came back for me at the bridge when everyone else ran."

That sentence can still be completely template-driven:

```text
YOU_HELPED_ME(event)
```

with an authored realization:

```text
"You {ACTION_REFERENCE} when {EVENT_CONTEXT}."
```

But the substitutions should themselves be **authored semantic descriptions**, not arbitrary model-generated strings.

For example:

```yaml
BRIDGE_RESCUE:
    action_reference: "came back for me"
    event_context: "everyone else was running from the bridge"

WINTER_MEDICINE:
    action_reference: "gave me the last of your medicine"
    event_context: "you were barely standing yourself"
```

Now conversations can continuously call back to actual shared experiences.

That creates intimacy.

---

## Emotional conversations are largely about callbacks

A strong relationship system accumulates **relationship memories**.

For instance:

```text
RELATIONSHIP_MEMORY
---------------------------------
event
participant
interpretation
emotional_weight
privacy
unresolved?
callback_allowed?
```

A character might remember:

```text
PLAYER stayed during father's funeral
meaning = LOYALTY
emotion = GRATITUDE
importance = VERY_HIGH
```

Months later, when the NPC discusses abandonment, the conversation planner may select that memory.

The writer doesn't need to author the entire conversation.

They author a family of callbacks:

```text
GRATEFUL_CALLBACK
AFFECTIONATE_CALLBACK
RESENTFUL_CALLBACK
VULNERABLE_CALLBACK
TEASING_CALLBACK
```

The game determines when they're appropriate.

This creates something extremely useful:

**authored language + emergent context.**

---

# Romance particularly benefits from constraints

Unlimited LLM romance actually creates difficult design problems.

Characters can:

- become emotionally intimate far too quickly;
- contradict their established personality;
- forget previous boundaries;
- make bizarre sexual advances;
- become manipulative unintentionally;
- promise impossible future actions;
- change relationship status through conversation alone;
- drift into language inappropriate for your target rating.

A constrained system gives you explicit relationship mechanics.

For example:

```text
STRANGER
   ↓
ACQUAINTANCE
   ↓
FRIEND
   ↓
CLOSE_FRIEND
   ↓
ROMANTIC_TENSION
   ↓
MUTUAL_INTEREST
   ↓
PARTNER
```

But those transitions shouldn't merely be:

```text
affection > 80 → romance
```

They can require narrative conditions:

```text
trust >= 70
affection >= 70
romantic_interest == true
major_shared_event >= 1
personal_disclosure >= 2
relationship_conflict_resolved >= 1
NPC_currently_available == true
```

Then certain conversational beats become available.

That gives your writers extremely strong control over characterization.

---

# Give characters emotional boundaries

This is important for making them feel like characters rather than vending machines for affection.

For example:

```yaml
Marielle:
  enjoys:
    - intellectual teasing
    - sincere praise
    - acts of loyalty

  dislikes:
    - public affection
    - excessive flattery

  boundaries:
    - will not discuss mother before TRUST_2
    - will not accept romance while guild conflict unresolved
    - leaves conversation after repeated insults
    - refuses PLAYER_FLIRT while grieving
```

Now two players can interact with the same character very differently.

One discovers that joking works.

Another discovers that she dislikes it.

Another damages the friendship and has to repair it.

That variation comes from simulation rather than prose generation.

---

# Templates should work at the level of emotional "beats"

Instead of writing thousands of entire conversations, write reusable **dramatic units**.

For romance:

```text
FLIRT
FLIRT_DEFLECT
FLIRT_RECIPROCATE
FLIRT_UNCOMFORTABLE

PERSONAL_DISCLOSURE
PERSONAL_DISCLOSURE_RECIPROCATE

SEEK_REASSURANCE
GIVE_REASSURANCE
AVOID_REASSURANCE

EXPRESS_JEALOUSY
HIDE_JEALOUSY

CONFESS_AFFECTION
RECIPROCATE_CONFESSION
GENTLY_REJECT_CONFESSION

APOLOGIZE
ACCEPT_APOLOGY
PARTIALLY_ACCEPT_APOLOGY

ASK_FOR_SPACE
RECONCILE
```

For friendship:

```text
TEASE
SHARE_INTEREST
OFFER_HELP
ASK_FOR_HELP
DEFEND
EXPRESS_GRATITUDE
EXPRESS_DISAPPOINTMENT
CONFIDE
REMINISCE
```

For community:

```text
WELCOME
INCLUDE
THANK
RECOGNIZE_CONTRIBUTION
ASK_PARTICIPATION
CELEBRATE_TOGETHER
MOURN_TOGETHER
DEFEND_COMMUNITY_MEMBER
REPAIR_CONFLICT
```

These are much more reusable than complete dialogue trees.

---

# The real trick: sequences

One line isn't usually what makes an emotional scene work.

It's the progression.

For example:

```text
PLAYER APOLOGIZES

NPC:
1. DEFLECT
2. REFERENCE_HURT
3. PLAYER_RESPONDS
4. TEST_SINCERITY
5. PLAYER_RESPONDS
6. PARTIAL_RECONCILIATION
7. CALLBACK_SHARED_MEMORY
8. RELATIONSHIP_CHANGE
```

Your dialogue planner can construct that sequence dynamically.

Each beat has dozens of carefully authored realizations.

Consequently, you get huge combinatorial variation while retaining editorial control.

---

## Character voice can also remain completely controlled

Suppose the semantic intent is:

```text
REQUEST_PLAYER_NOT_LEAVE
```

Different characters realize it differently.

**Reserved knight**

> "If you have no urgent business elsewhere... stay a while."

**Childhood friend**

> "You're not disappearing again already, are you?"

**Proud aristocrat**

> "I suppose your company would be tolerable for another hour."

**Direct character**

> "Stay."

Those are all writer-approved.

The simulation determines which intent occurs.

The **character writer determines what that character is capable of saying**.

That's arguably better for strong characterization than unrestricted generation.

---

# Your vocabulary can even encode personality

You can maintain per-character lexical inventories.

For example:

```yaml
Marielle:
    intensifiers:
        - "rather"
        - "quite"

    affection_addresses:
        FRIEND:
            - player_name

        PARTNER:
            - player_name
            - "you impossible fool"

    hesitation:
        - "Well..."
        - "I suppose..."

    prohibited:
        - "awesome"
        - "dude"
        - "gonna"
```

And grammar constraints:

```text
Marielle:
    contraction_frequency = LOW
    sentence_length = MEDIUM
    profanity = NEVER
    direct_emotion_statements = RARE
```

Another character could have an entirely different grammar.

You therefore prevent **voice drift**, one of the major weaknesses of dynamically generated NPCs.

---

# One thing templates cannot solve alone

Repetition.

If the player spends 30 hours with their favourite character, they will eventually recognize repeated structures.

So I'd combine several mechanisms:

- dozens of realizations for common emotional beats;
- conversational cooldowns;
- semantic equivalence tracking;
- references to different shared memories;
- different emotional intensities;
- short responses as well as long ones;
- interruptions and silence;
- animation and facial expressions;
- contextual actions instead of speech.

That last one matters.

An emotional response doesn't always need words.

Instead of:

> "I'm happy to see you."

you might have:

```text
She starts to say something, then smiles.

"You made it."
```

Or after an argument:

```text
He quietly moves his chair over, leaving room beside him.
```

Those can also be entirely authored.

A constrained system actually encourages this kind of **game-specific emotional storytelling** instead of turning every interaction into chatbot paragraphs.

---

# Silence should be part of your dialogue vocabulary

I'd explicitly support actions such as:

```text
LOOK_AWAY
SMILE
LAUGH
HESITATE
SIGH
MOVE_CLOSER
STEP_BACK
OFFER_ITEM
TOUCH_SHOULDER
REFUSE_EYE_CONTACT
CHANGE_SUBJECT
SAY_NOTHING
LEAVE
```

subject to whatever relationship and content-rating rules you choose.

The planner can compose:

```text
HESITATE
↓
LOOK_AWAY
↓
VULNERABLE_ADMISSION
↓
SILENCE
```

That can produce considerably more emotional weight than generating another 150 words of prose.

---

# Where I think this approach could become genuinely strong

You can distinguish three things:

```text
WHAT happened
WHAT the NPC thinks it means
HOW the NPC expresses that interpretation
```

Example:

```text
World fact:
Player missed NPC's festival performance.

NPC interpretation A:
"They don't care about me."

NPC interpretation B:
"Something important must have happened."

NPC interpretation C:
"They are deliberately avoiding me."
```

Different personalities choose different interpretations.

That creates the emotional conflict.

Then the dialogue system merely expresses it.

So an anxious character might become insecure.

A trusting character worries about the player.

A resentful character assumes intentional rejection.

**The same player action therefore produces different emotional stories without generating unrestricted text.**

That is exactly the sort of emergence I'd want in this genre.

---

## The main design constraint

I'd use something like:

> **Infinite-ish emotional states, finite communicative actions, finite authored language.**

You don't need infinite dialogue to create an effectively enormous conversational space.

You need enough authored language to express a rich set of **relationships between dynamic states, memories and events**.

If the underlying relationship simulation is shallow, templates will feel mechanical.

If the underlying simulation is deep, templates can feel remarkably personal because the character is repeatedly saying **the right authored thing at the right moment about something that actually happened between you**.

For a JRPG specifically, I think this may even be preferable to free-generation: you retain the deliberate character writing expected from the genre while gaining emergent relationships that conventional branching dialogue has enormous difficulty providing.

## User

record this as a note in repo managed-decline-v2
