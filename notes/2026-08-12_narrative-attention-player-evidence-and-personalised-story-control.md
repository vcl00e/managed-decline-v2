# Narrative Attention, Player Evidence and Personalised Story Control

**Date:** 2026-08-12

## User

Do deep research to establish systems we can use in our game design or implementation to manage the user experience so it becomes like professional well paced well setup and presented stories that move emotions and and create interest and not an onslaught of random challenges. Also do not use numbers to represent qualitative measures.

In our game there is also an additional challenge that we want to put agency, creativity and goal setting into the hands of the user. This means the user decides what they find meaningful and what they want to pursue but at the same time the game needs to produce relevant opportunities and pressures for the player so they can remain engaged while developing the story towards their goals at a comfortable and enjoyable pace.

Also, how can we consistently generate relevant, funny and interesting dialogue choices for the player that support the story without giving away hidden knowledge or spoilers or guaranteeing progress in the right direction and without confusing the player? Should the game build a profile of the player's character too based on the current state and past choices that have been made to support the generated dialogue choices?

The designs outlined in this conversation should combine well with the designs implied collectively by the notes in repo managed-decline-v2

Make sure your suggested designs are practical and fun. For example if we need a story sifter in the design we need to consider how it will actually work in the context of our game. Same goes for a narrative editor or any other magical component. Example of keeping things fun: Do not ask the player to articulate or select their goals unless when it is diegetic and part of the narrative. Instead use clever design to test and get an idea of what interests or motivates the player and what does not.  Consider step by step how the narrative system will work and how the player will experience it form their point of view.

## Assistant

# Recommended direction

*Managed Decline* should not have an omnipotent “narrative AI” that invents plots, assigns story-quality scores, or covertly steers the player toward the correct content.

It should have a **Narrative Attention and Threading Layer** that sits above the existing world simulation.

Its job is narrower:

> **The world decides what is true. Characters decide what they want. The player decides what matters. The narrative layer decides which true, relevant possibilities deserve attention now, and how they should be presented.**

That distinction is the foundation of the design.

Research on experience management strongly cautions against imagining a drama manager as one clever algorithm. Roberts characterises a fully realised experience manager as a collection of interdependent representational and computational problems that must be solved case by case. More recent work also suggests that structure and agency are not simple opposites: participants in human-led interactive narratives reported a strong relationship between perceiving structure and perceiving agency, with bad experiences often resembling failures of improvisational cooperation rather than “too much story.” ([ojs.aaai.org](https://ojs.aaai.org/index.php/AIIDE/article/view/12472))

The practical lesson is:

> **Do not build one magical narrative editor. Build several small, inspectable governors with sharply limited authority.**

---

# How this fits the existing design

The repository already contains most of the necessary foundations:

- one hidden situation network whose state is expressed through character behaviour, headlines, rumours, institutions and environmental change;
- separation between actual facts, character beliefs, public claims and rumours;
- situations that develop through stages and may branch, stall, reverse or skip;
- player actions feeding back into the same simulation;
- elastic narrative time that compresses routine until attention is valuable;
- commitments, plans and habits rather than chores and action points;
- a small active social working set even though the wider world contains many NPCs;
- characters with bounded goals, beliefs, memories, relationships and behavioural policies;
- actions and projects that make persistent changes to people, places and institutions;
- semantic dialogue intents realised through controlled authored language rather than unchecked generative prose.

Those ideas should remain authoritative. The new layer should orchestrate their presentation rather than replace them.

A useful overall pipeline is:

```text
World and character simulation
        ↓
Typed event ledger
        ↓
Story-signal sifter
        ↓
Player-pursuit and thread state
        ↓
Attention governor
        ↓
Opportunity and pressure composer
        ↓
Presentation director
        ↓
Scene, message, montage, encounter or environmental change
        ↓
Player action
        ↓
World and character simulation
```

No later layer is permitted to bypass the earlier ones.

---

# The canonical event ledger

The world simulation should emit small, typed records whenever something potentially relevant changes.

These are not scenes or dialogue. They are facts about what happened.

```yaml
event:
  kind: workplace_warning_issued
  source_situation: leisure_centre_restructure
  actors:
    - priya
    - department_manager
  location: leisure_centre_office
  occurred_at: monday_afternoon

  truth:
    warning_was_issued: true

  observers:
    direct:
      - priya
      - department_manager
    overheard:
      - jamie

  public_state:
    known_to_staff: false

  consequences:
    priya_behaviour: unusually_quiet
    project_state: employment_at_risk
```

The event ledger is useful because it gives every later narrative decision an audit trail.

A generated message, conversation option or cutaway should always be traceable to:

- a world event;
- a character intention;
- an established routine or relationship;
- an earlier player action;
- or an authored situation transition.

That prevents the experience from becoming a stream of arbitrary “content drops.”

It also supports the repository’s important separation between truth and information. The player might know that Priya is quiet. Jamie may believe she argued with management. The public staff email may claim everything is progressing smoothly. Only Priya and the manager know that a warning was issued.

---

# A practical story sifter

A story sifter is useful, but only if its responsibilities are kept concrete.

Story-sifting research treats the simulator’s event history separately from the way those events are recognised and presented as stories. Winnow, for example, uses human-authored temporal patterns and maintains partial matches as events occur, allowing systems to detect potentially storyful sequences before they finish rather than only narrating them retrospectively. Its implementation starts, advances, forks or invalidates partial matches whenever new events arrive. ([ojs.aaai.org](https://ojs.aaai.org/index.php/AIIDE/article/view/18903))

For *Managed Decline*, the sifter should recognise **specific narrative relationships**, not calculate a universal `Interestingness = 84`.

Useful patterns include:

- an established routine is broken;
- a character acts against their usual coping strategy;
- a favour is remembered when the giver now needs something;
- an official public claim contradicts visible reality;
- two commitments are approaching collision;
- a secret is becoming harder to contain;
- a project blocker has unexpectedly changed;
- someone missed an event and is now encountering its aftermath;
- two unrelated situations have acquired the same person, place or institution;
- a past joke has become unexpectedly relevant;
- the player’s earlier warning was ignored;
- the player’s casual intervention has become more important than they intended;
- two characters hold incompatible beliefs about the same event;
- a familiar place is threatened, transformed or socially redefined;
- an apparent setback creates an unforeseen opportunity.

A pattern can be written approximately like this:

```yaml
pattern: threatened_regular_place

start_when:
  - player_has_established_routine_at: $place
  - player_has_known_person_at: $place

advance_when:
  - active_situation_materially_affects: $place
  - player_observes_or_learns_about_change: true

invalidate_when:
  - situation_is_resolved: true
  - player_no_longer_has_connection_to_place: true

emit_signal:
  motif: belonging_under_pressure
  people:
    - $known_person
  place: $place
  possible_roles:
    - setup
    - invitation
    - complication
    - consequence
```

The output should be a **Story Signal**, not a scene:

```yaml
story_signal:
  motif: belonging_under_pressure
  source_situation: community_hall_lease
  evidence:
    - player_attends_radio_night
    - hall_booking_suspended
    - maya_works_at_hall
  player_knows:
    - hall_booking_suspended
    - maya_is_upset
  player_does_not_know:
    - developer_has_approached_landlord
  available_roles:
    - invitation
    - investigation
    - relationship_scene
    - environmental_setup
```

The sifter may say:

> “This cluster of facts could support a setup, complication or invitation.”

It may not say:

> “Make the player save the hall.”

Incremental sifting can also identify developing possibilities and guide autonomous actors toward choices that are already plausible for them. Shepherd demonstrates that approach by using partial story patterns to guide otherwise autonomous characters toward narratively useful choices. For *Managed Decline*, that guidance must remain subordinate to the character’s own goals, knowledge and behavioural policy. ([ojs.aaai.org](https://ojs.aaai.org/index.php/AIIDE/article/view/31887))

For example, the system may choose between several things Maya already wants to do:

- complain privately;
- ask the player for help;
- organise something herself;
- ask another friend first;
- hide the problem;
- give up for the moment.

It may not make Maya manufacture a crisis or behave irrationally solely because the player needs content.

---

# What the runtime “editor” may actually do

The runtime editor should be a constrained scheduler and presenter.

It may:

- surface a relevant development;
- defer one until the player has attention;
- allow a thread to go quiet;
- insert a natural reminder before a payoff;
- combine compatible developments into one scene;
- choose the least intrusive presentation form;
- select among plausible NPC actions;
- instantiate an authored storylet with the actual people and places involved;
- compress ordinary activity in a montage;
- stop a montage at the first meaningful disruption;
- turn a missed scene into an aftermath scene;
- convert a background world development into environmental storytelling;
- choose a callback or line family appropriate to the context;
- provide recovery after an emotionally intense sequence.

It may not:

- change what really happened;
- invent a hidden fact merely to improve drama;
- reveal something the protagonist does not know;
- teleport or redirect the player;
- cancel the player’s current activity;
- guarantee that a proposed action succeeds;
- make an NPC betray their goals or knowledge;
- prevent an inconvenient but valid player action;
- secretly undo an outcome because it harmed a preferred plot;
- create a challenge unrelated to any active situation;
- force every authored event to appear.

Façade is a useful precedent for separating authored behaviours from their higher-level organisation: it contained thousands of joint dialogue behaviours arranged into story beats and sequenced by a drama manager. Comme il Faut used reusable and recombinable social norms and interactions to avoid separately authoring every social circumstance, while Lume combined structured scenes with broader possibility through parameterised storylet node-trees. These systems suggest that the useful unit is neither a giant branching route nor completely free simulation, but an authored, reusable narrative unit instantiated against live state. ([ojs.aaai.org](https://ojs.aaai.org/index.php/AIIDE/article/view/18722))

---

# Opportunity packets instead of quests

When the system decides that something deserves attention, it should construct an **Opportunity Packet**.

```yaml
opportunity:
  source_situation: community_hall_lease

  visible_hook:
    maya_messages_about_cancelled_radio_night

  player_connection:
    established_regular_activity

  thread_role:
    invitation

  pressure_source:
    booking_window_closing

  ignore_consequence:
    maya_organises_without_player

  action_families:
    - ask
    - investigate
    - offer_limited_help
    - recruit
    - decline
    - ignore

  eligible_presentations:
    - group_chat
    - encounter_at_hall
    - phone_call

  closure_routes:
    - player_declines
    - maya_stops_asking
    - event_relocates
    - hall_reopens
    - project_expands
```

This packet makes several design requirements explicit:

- Why is this relevant to this player?
- Why is it happening now?
- What actual situation caused it?
- What happens if the player does nothing?
- Is it an invitation, consequence, setup, decision or payoff?
- What can the player plausibly do?
- How can the thread close, transform or be abandoned?

A packet that cannot answer those questions should not enter foreground play.

---

# Selecting content without qualitative scores

Do not assign:

```text
Drama = 78
Interest = 64
Emotional Intensity = 91
Narrative Quality = 82
```

Actual quantities such as money, time and distance can remain numeric. Qualitative judgements should use named states, hard rules and ordered categories.

The selector can work like this:

```text
candidate opportunities
    ↓
remove anything causally unsupported
    ↓
remove anything using protagonist-unknown information
    ↓
remove anything impossible for current cast, place or calendar
    ↓
remove repeats and unresolved presentation conflicts
    ↓
take the first non-empty relevance category:
    owed consequence
    promised commitment
    active player project
    close relationship
    established pursuit
    exploratory opportunity
    ambient world texture
    ↓
choose what the current thread needs:
    setup, deepening, complication, decision,
    consequence, reflection, payoff or recovery
    ↓
apply the current attention mode
    ↓
prefer existing people, places and remembered setup
    ↓
use a deterministic seeded tie-break among equally valid choices
```

This is not the same as making commitments dominate absolutely. A family emergency may matter more than a hobby promise. The categories should be authored precedence rules with contextual exceptions, not numerical weights.

Search-based and personalised drama managers have shown that adaptive selection can improve player experience, but those approaches usually depend on explicit story representations, intervention actions and evaluation criteria. That makes them useful evidence that adaptation can work, not evidence that *Managed Decline* should hide everything inside an opaque optimiser. ([ojs.aaai.org](https://ojs.aaai.org/index.php/AIIDE/article/view/18723))

---

# The attention governor

The main defence against an onslaught of random challenges is not better challenge generation. It is an explicit **attention governor**.

The game should maintain a qualitative attention mode.

## Spacious

The player has no immediate major obligation and has recently had room to breathe.

The game may:

- introduce a new person through someone familiar;
- seed a new situation;
- offer an exploratory activity;
- let a background event become noticeable;
- allow gentle social or comic scenes;
- permit player-initiated wandering and planning.

## Focused

The player is actively pursuing something or is inside a developing relationship sequence.

The game should:

- favour developments connected to that pursuit;
- allow supporting subplots that share people or places;
- show consequences and useful context;
- avoid unrelated crises;
- allow ordinary life and comic contrast around the foreground thread.

## Crowded

Several existing relationships, commitments or consequences already require attention.

The game should:

- stop creating new obligations;
- convert optional content into ambient information;
- merge compatible messages or scenes;
- offer clarification, cancellation, delegation and boundary-setting;
- surface consequences the player has already earned;
- allow routines to compress other material.

## Recovering

A major exposure, confrontation, loss, success, public embarrassment or emotionally raw scene has just occurred.

The game should:

- show aftermath;
- let characters react;
- provide quiet, warmth, awkwardness or ordinary routine;
- allow the player to reconsider or talk;
- favour echoes and callbacks over new escalation;
- hold unrelated high-pressure content back.

This adapts the useful principle behind Valve’s pacing work without importing its numerical emotional-intensity meter. Valve described “structured unpredictability” as selecting from designed possibilities under constraints, warned designers not to make everything happen every time, and alternated pressure with natural periods of relative calm because constant action was fatiguing and prolonged inactivity was dull. ([valvearchive.com](https://valvearchive.com/Presentations/GDC%202009/Replayable%20Cooperative%20Game%20Design%20-%20Left%204%20Dead/GDC2009_ReplayableCooperativeGameDesign_Left4Dead.pdf))

For *Managed Decline*, the equivalent is not enemies and combat. It is:

> invitation → anticipation → social event → revelation or complication → consequence → ordinary life → echo.

The system should detect attention mode from observable facts:

- the player is currently in a meaningful scene;
- several direct requests are awaiting answers;
- commitments are colliding;
- a recent scene had a significant emotional turn;
- the player has repeatedly deferred optional plans;
- the player has deliberately chosen to stay home or fast-forward;
- the player is already pursuing a multi-step action;
- the current location or activity makes interruption inappropriate.

The player’s current action continues to win, consistent with the routine and time design already accepted in the repository.

---

# Thread management rather than quest management

Every important ongoing situation should produce one or more **threads**.

A thread can be in a named narrative condition such as:

- seeded;
- invited;
- developing;
- complicated;
- awaiting player response;
- awaiting another actor;
- consequence pending;
- reflecting;
- ready for payoff;
- dormant;
- transformed;
- abandoned;
- closed;
- echoing.

This does not imply a rigid sequence. A thread may stall, reverse or jump between conditions.

The system’s job is to avoid two failures:

- everything demanding attention at once;
- everything remaining open forever.

Loose Ends is relevant here because it was explicitly designed to manage parallel plot threads and bring them toward satisfying conclusions while reducing the directionlessness seen in earlier mixed-initiative narrative systems. ([ojs.aaai.org](https://ojs.aaai.org/index.php/AIIDE/article/view/21955))

For *Managed Decline*, thread management should use these rules:

**Foreground selectively.** A thread may remain real without being foreground content.

**Reincorporate.** When a person, place or subject returns, prefer a relevant older thread before inventing a new one.

**Permit dormancy.** A friendship, hobby or community problem may disappear for weeks and later return naturally.

**Close small things.** Not every thread becomes a life arc. Some end with “we never went again,” “they found another venue,” or “that argument eventually stopped mattering.”

**Transform missed content.** The player missing a birthday does not delete the birthday. It changes the next interaction.

**Distinguish thread from project.** Curiosity about the hall is a thread. Promising to organise an event may create a player project.

**Remember residue.** A completed thread can leave a running joke, changed relationship, repaired place, social expectation or private memory.

This aligns directly with the existing principle that the world continues without the player and missed events generate different content instead of generic quest failure.

---

# Setup, recall and payoff

Professional-feeling stories rarely depend on surprise alone. They create recognition:

> “Oh—that earlier thing mattered.”

The game therefore needs a small **Setup and Payoff Ledger**.

```yaml
setup:
  subject: maya_hates_public_speaking
  observed_by_player: true
  established_through:
    - karaoke_refusal
    - office_presentation_joke

  connected_people:
    - maya
    - player

  connected_places:
    - community_hall

  eligible_payoffs:
    - maya_forced_to_address_public_meeting
    - player_can_offer_to_speak
    - maya_unexpectedly_succeeds

  recall_state: faded
  reminder_options:
    - maya_mentions_previous_disaster
    - another_character_teases_her
    - old_video_appears_in_group_chat
```

Before using a distant setup, the presentation director should decide whether the player is likely to remember it.

A reminder should usually be natural:

- somebody references it;
- an object is visible again;
- a photograph resurfaces;
- the same location is revisited;
- a running joke returns;
- another character asks about it.

Research using the Indexter model found that prior events become more salient when they share protagonist, time, place, causality or intention with the current event. That offers a useful implementation heuristic for selecting reminders and callbacks. ([ojs.aaai.org](https://ojs.aaai.org/index.php/AIIDE/article/view/12933))

The director should not pay off an event the player never witnessed as though it were remembered setup. It can still reveal the event, but it must be presented as new information.

---

# Emotional movement without an emotion score

Scenes should have an **emotional texture**, not an emotional magnitude.

Useful textures include:

- ease;
- curiosity;
- affection;
- awkwardness;
- anticipation;
- tension;
- exposure;
- hurt;
- anger;
- relief;
- triumph;
- emptiness;
- reflection;
- recovery.

These are authoring and scheduling tags, not character emotion meters.

The system can enforce transition rules such as:

- exposure should usually be followed by consequence, reflection or recovery;
- genuine hurt should not immediately be erased by an unrelated joke;
- a long period of ease may admit curiosity or tension;
- tension should not keep escalating without either a turn or release;
- triumph deserves a visible acknowledgement;
- a failed project needs aftermath before replacement;
- comic scenes can carry genuine vulnerability;
- quiet scenes may deepen relationships rather than merely fill time.

A strong scene should have a **turn**: something changes in the player’s understanding, options, relationship or intention.

It should also leave **residue**:

- a changed belief;
- a promise;
- a boundary;
- a new question;
- a relationship interpretation;
- an altered project;
- an object or place changed;
- a joke that can return;
- an action somebody will now take.

Without a turn, it is often flavour. Flavour is useful, but the director should not mistake it for progression.

Without residue, the scene may feel disposable.

---

# Relevant pressure rather than random trouble

Pressure should always have provenance.

Acceptable sources include:

- a promise the player made;
- a person expecting an answer;
- a limited opportunity already introduced;
- a world situation progressing;
- another character pursuing their own goal;
- a consequence of a player action;
- a collision between things the player values;
- information becoming public;
- a resource already committed elsewhere;
- a relationship interpretation;
- an institution imposing a deadline or obstacle;
- ordinary circumstances changing.

Examples:

> You promised Maya you would help on Saturday, but your sister has now asked you to attend something important.

> The café project is progressing, but the affordable lease the player discovered will not remain open indefinitely.

> The player repeatedly relied on Darren’s van, and Darren has finally stopped treating these requests as trivial.

> The player publicly claimed that an event would happen, and people are now acting as though it will.

These are pressures because the player has a relationship to them.

Avoid:

> It has been quiet for a while, so generate an angry landlord, a sick friend and a broken boiler.

Even when those events are individually plausible, stacking them because the pacing engine wants “tension” will feel manipulative.

Every meaningful pressure should have:

- an understandable cause;
- a visible or discoverable warning;
- a legitimate ignore or refuse path;
- an aftermath if ignored;
- outcomes other than simple success and failure;
- consequences proportional to the player’s actual commitment.

Anticipation matters. Valve’s pacing work emphasised that exciting events become more powerful when their arrival is broadcast beforehand. In *Managed Decline*, the equivalent warning may be a message, a rumour, an empty desk, an official notice, a repeated complaint or an NPC becoming increasingly evasive. ([valvearchive.com](https://valvearchive.com/Presentations/GDC%202009/Replayable%20Cooperative%20Game%20Design%20-%20Left%204%20Dead/GDC2009_ReplayableCooperativeGameDesign_Left4Dead.pdf))

---

# Infer pursuits, but do not declare the player’s goals for them

The game should build a profile, but it needs to keep three distinct things separate.

## The protagonist’s established identity

This contains fictional facts about the player character:

- background;
- known tastes;
- habits;
- claimed opinions;
- competencies;
- possessions and access;
- relationships;
- promises;
- public reputation;
- remembered behaviour;
- recent emotional condition;
- things they have said about themselves.

This profile supports character continuity and phrasing.

## Observed play interests

This is not a claim about the human player’s personality.

It records statements such as:

- the player currently engages with music content when it competes with other available content;
- the player often initiates plans with this social group;
- the player reads local institutional stories but ignores celebrity content;
- the player returns to community projects after interruptions;
- the player frequently chooses private relationship scenes over public-status opportunities;
- the player currently fast-forwards ordinary work material.

This is exactly the distinction already established in the repository between fictional character preferences and observed play interests.

## Pursuit hypotheses

These are temporary interpretations of what the current playthrough might be moving towards.

```yaml
pursuit_hypothesis:
  subject: community_radio
  evidence:
    - attended_when_other_plan_available
    - returned_without_direct_invitation
    - helped_maya_carry_equipment
    - initiated_conversation_about_next_event

  state: emerging
  context:
    - social
    - creative
    - community

  counterevidence:
    - declined_committee_role

  interpretation:
    interested_in_participation_but_not_leadership
```

Useful named states are:

- tentative;
- emerging;
- established;
- dormant;
- contradicted;
- transformed.

No `Interest: 72`.

Player modelling systems such as PaSSAGE have demonstrated dynamic selection based on learned player preferences, while goal-recognition research shows that latent goals can be inferred non-invasively from gameplay traces. But these models are imperfect, especially in open worlds where exploration and apparently inefficient actions are normal. The design implication is to use inferred pursuits for **gentle opportunity selection**, not to treat them as facts. ([ojs.aaai.org](https://ojs.aaai.org/index.php/AIIDE/article/view/18705))

---

# Interest is not commitment

This distinction is essential.

A player looking at a guitar does not mean:

> The player has chosen the music route.

Attending an event once does not mean:

> The player wants weekly obligations.

Helping somebody once does not mean:

> The player has accepted responsibility for their whole problem.

A pursuit should develop diegetically:

```text
The world exposes something
        ↓
The player optionally engages
        ↓
The player voluntarily returns or invests
        ↓
The world begins recognising a pattern
        ↓
A character offers a meaningful commitment
        ↓
The player promises, books, buys, joins,
volunteers, announces or otherwise commits
        ↓
Consequences and pressure become legitimate
```

Before commitment, the game should mostly offer opportunities.

After commitment, it may create expectations.

Commitment should arise through actions such as:

- “Yes, put my name down.”
- buying the instrument;
- accepting a recurring shift;
- publicly promising to organise something;
- agreeing to attend every Thursday;
- inviting people to an event;
- taking responsibility for a task;
- beginning a serious relationship;
- investing money;
- joining an organisation;
- putting one’s reputation behind a project.

This gives the player agency over the **kind of pressure** that enters their life.

The game should still permit involuntary circumstances—rent, work, family, illness, political or institutional changes—but elective goals should not become obligations until the player has actually adopted them.

---

# How the game tests interests without asking for a goal menu

The system can perform small, diegetic probes.

Suppose the player has shown tentative interest in local music.

Instead of asking:

> SELECT GOAL: BECOME MUSICIAN

the world may produce:

- a friend mentions an open-mic night;
- a poster appears at a familiar café;
- a character asks whether the player wants to come along;
- a second-hand keyboard appears cheaply;
- an NPC casually asks for help at a community event;
- a group chat discusses a gig;
- the player hears somebody rehearsing in a nearby room.

These probes should be low-pressure and varied.

The system observes whether the player:

- opens the message;
- asks a follow-up question;
- attends when something else was available;
- initiates contact later;
- spends time or money;
- recruits somebody;
- returns without being prompted;
- uses the activity socially;
- deliberately refuses;
- repeatedly postpones;
- loses interest when a particular character is absent.

That last point matters. The player may care about Maya, not radio. They may enjoy performing but dislike committees. They may like the location but not the activity.

The profile should preserve those distinctions.

---

# Preventing a personalised filter bubble

Adaptation can easily become self-reinforcing:

> The player chose music once → the game shows more music → the player chooses from the available music → the model concludes the player only wants music.

To avoid this:

- always preserve some exploratory opportunities;
- occasionally surface a strong contrast from outside established interests;
- distinguish lack of exposure from rejection;
- distinguish “busy” from “uninterested”;
- allow pursuits to cool naturally;
- never remove all alternatives because of the profile;
- do not infer political or moral identity from a small collection of actions;
- provide plausible choices that contradict the character’s established pattern;
- use familiar people to introduce unfamiliar activities;
- let NPCs create unexpected intersections between pursuits.

The player profile should affect **what is made salient**, not define what the player is allowed to do.

---

# Player initiation must remain equally important

The player cannot feel like the author of their life if agency consists only of accepting or rejecting generated invitations.

They should be able to initiate broad, comprehensible intentions through the world and phone:

- make plans;
- call or visit someone;
- ask about a developing problem;
- offer help;
- ask for a favour;
- look for work;
- research a subject;
- organise an event;
- invite people somewhere;
- recruit somebody to a project;
- acquire something;
- practise or train;
- make or perform something;
- complain or apply;
- confront, disclose, apologise or reconcile;
- deliberately withdraw;
- let time pass.

The system then composes the intention with the people, knowledge, competence, means and access already present in the player’s life, consistent with the existing action-and-project design.

When an intention is blocked, the response should be:

## Yes, and

The action is plausible and available. It happens, and consequences follow.

## Yes, but

The intention is reasonable, but something concrete blocks the current version:

> You can ask to use the hall, but Maya says nobody knows who currently controls the booking system.

This exposes another affordance without prescribing a walkthrough.

## No, because

The action is genuinely impossible under current world facts:

> You cannot offer to play because the protagonist has never learned the instrument.

The explanation teaches the world’s common sense. It should never amount to:

> The plot does not permit this.

Narrative-affordance research describes an action as narratively afforded when the player can imagine it as part of completing their current story experience. This supports making possibilities causally legible rather than hiding actions behind arbitrary quest logic. ([ojs.aaai.org](https://ojs.aaai.org/index.php/AIIDE/article/view/12466))

---

# Presentation should use the least intrusive sufficient form

Not every development deserves a full scene.

The presentation director should choose from a shared grammar:

- environmental change;
- ambient behaviour;
- overheard line;
- phone notification;
- social or news post;
- short message exchange;
- micro-vignette;
- physical encounter;
- VN-style conversation;
- cutaway;
- routine montage;
- set piece.

Examples:

**Environmental**

The community hall suddenly has scaffolding and a laminated notice.

**Ambient**

Two regulars are discussing the cancellation when the player passes.

**Phone**

Maya posts, “Apparently ‘temporary booking rationalisation’ means they’ve changed the locks.”

**Micro-vignette**

The camera briefly shows Maya carrying equipment back into her car.

**Full scene**

The player attends the improvised replacement event and must decide what to contribute.

The stronger the player’s connection, commitment or potential agency, the stronger the presentation may become.

The phone is especially valuable because it can expose opportunities, social expectations, misunderstandings and world interpretations without forcing the player into immediate scenes, consistent with its existing role as a second view onto the same world simulation.

---

# A scene contract

Before a substantial scene is allowed to run, it should satisfy a small contract.

## Why now?

What changed or became relevant?

## What does everyone want?

Not just the protagonist. What are the immediate intentions of each significant participant?

## What does the protagonist know?

Which facts, observations and suspicions may appear in player choices?

## What is the live question?

For example:

> Will Maya ask the player to take responsibility?

> Will Priya reveal what happened at work?

> Will this group still go through with the event?

## What leverage does the player have?

Knowledge, relationship, competence, money, access, humour, presence, refusal, public support or the ability to leave.

## What changes during the scene?

A discovery, commitment, interpretation, relationship turn, action or world-state transition.

## Why does the scene end?

Somebody leaves, a decision is made, a new action begins, the subject becomes exhausted or the situation changes.

## What residue remains?

The fact that will matter afterward.

A scene that cannot answer these questions may still be a pleasant ambient interaction, but it should not consume the same attention as a major story scene.

---

# Dialogue choices should be generated from intent, not prose

The dialogue system should first decide **what the protagonist could communicatively do**, and only then choose the wording.

This follows the repository’s existing safe-dialogue direction and resembles successful modular conversation approaches. Versu explicitly tracked conversational turn, salient topics and interruptions; its lines could require beliefs, convey facts and evaluations, and invite public reactions from witnesses. A lightweight dialogue manager developed for Talk of the Town produced more natural conversation flow than random line assembly, while Talk of the Town itself maintained separate character observation, knowledge propagation, forgetting, misremembering and lying. ([emshort.blog](https://emshort.blog/2013/02/26/versu-conversation-implementation/))

A semantic candidate can look like this:

```yaml
dialogue_candidate:
  intent: offer_limited_help
  target: maya
  topic: replacement_radio_event
  stance: supportive_but_cautious

  knowledge_basis:
    - player_knows_booking_cancelled
    - player_knows_leah_performs_music

  commitment:
    kind: tentative
    scope: ask_leah_only

  visibility: private

  voice:
    line_family: understated_practical

  prohibited_implications:
    - player_guarantees_leah_will_accept
    - player_knows_hidden_lease_problem
```

The controlled realiser might produce:

> “I can ask Leah. I’m not promising she’ll say yes.”

The important thing is that the semantic commitment and knowledge basis exist independently from the final words.

---

# Dialogue choice generation pipeline

The runtime process should be:

```text
Determine the live conversational question
        ↓
Collect eligible communicative intents
        ↓
Ground every candidate in protagonist knowledge
        ↓
Select an appropriate choice-set shape
        ↓
Ensure options differ in function or consequence
        ↓
Fit wording to the protagonist’s established voice and history
        ↓
Apply spoiler and hidden-knowledge checks
        ↓
Apply commitment and outcome-promise checks
        ↓
Apply duplicate and confusion checks
        ↓
Realise through authored grammar and line families
        ↓
Use a safe generic fallback if necessary
```

The LLM, where used, should never own the semantic candidate, persistent state or outcome.

It may help:

- classify optional player free text into a permitted intent;
- draft offline variants for writers;
- fill tightly controlled surface slots;
- suggest special-case lines for human review.

It should not independently decide:

- what the protagonist knows;
- whether an NPC agrees;
- whether a secret is true;
- what commitment the player made;
- what consequence occurs;
- which unreviewed joke appears.

---

# Dialogue sets should have different dramatic shapes

Do not always produce:

> Nice response  
> Neutral response  
> Rude response

That turns character expression into a morality palette.

Dunyazad demonstrated that authored constraints can generate recognisably different choice structures, including relaxed choices, obvious choices and dilemmas. Choice-poetics research more broadly analyses how options and outcomes interact with different player goals and modes of engagement. ([ojs.aaai.org](https://ojs.aaai.org/index.php/AIIDE/article/view/12791))

Useful shapes for *Managed Decline* include:

## Relaxed choice

Used for bonding, taste and low-stakes characterisation.

All choices are viable but express different selves.

> Get chips  
> Go somewhere quieter  
> Stay and watch the terrible karaoke  
> Head home while the evening is still salvageable

## Clear practical choice

Used when the game needs legibility rather than drama.

> Call the office  
> Visit in person  
> Ask Maya what she did last time  
> Leave it until tomorrow

## Earned dilemma

Used only after enough setup makes competing values meaningful.

> Keep your promise to help Maya  
> Attend your sister’s dinner  
> Try to split the evening and risk disappointing both  
> Admit you have overcommitted and cancel something

## Probe under uncertainty

Used when the player lacks information.

> Ask what happened  
> Mention the notice and see how she reacts  
> Pretend you already know  
> Leave it alone

## Comic-risk choice

The joke itself has a social target and possible consequence.

> “So ‘temporary closure’ means the roof has achieved freedom from the building.”  
> Ask the sensible question  
> Let Maya finish  
> Change the subject

## Boundary choice

Agency includes refusing narrative responsibility.

> “I can listen, but I can’t take this on.”  
> “Not tonight.”  
> Offer a smaller form of help  
> Say nothing

A scene should choose the shape appropriate to what it is doing. Not every conversation requires danger, moral conflict or progression.

Research on meaningful choice found that players reported greater agency when they could foresee options leading to meaningfully different situational content rather than choices differing only superficially. ([ojs.aaai.org](https://ojs.aaai.org/index.php/AIIDE/article/view/12716))

---

# The spoiler and hidden-knowledge firewall

Every player-visible choice must carry a `knowledge_basis`.

A candidate may use:

- facts the protagonist directly observed;
- information somebody told them;
- public information;
- remembered experiences;
- visible behaviour;
- an explicitly established suspicion;
- a deliberate bluff framed as a bluff.

It may not use:

- dramatic irony known only to the human player;
- narrator-only information;
- another character’s private belief;
- the actual hidden situation state;
- future consequences;
- undiscovered relationships;
- secret motives.

Bad:

> “Confront Maya about the developer who bribed the landlord.”

The protagonist does not know that.

Good:

> “Ask why she keeps avoiding questions about the landlord.”

But only if the avoidance was observable.

Good:

> “Bluff that you know who approached the landlord.”

The option makes clear that this is a bluff.

The dialogue compiler should automatically reject any line whose asserted propositions exceed its knowledge basis.

Recent narrative-planning work has independently explored restricting actions to people, places and things the protagonist has discovered, both reducing search and bringing planning closer to the protagonist’s experienced perspective. ([ojs.aaai.org](https://ojs.aaai.org/index.php/AIIDE/article/view/36816))

---

# Choices should express intent, never guarantee outcome

Choice labels should not say:

> Convince her  
> Calm him down  
> Get permission  
> Win the argument  
> Make everyone laugh  
> Save the venue

They should say:

> Try to reassure her  
> Ask him to slow down  
> Request permission  
> Challenge his argument  
> Make a joke about the notice  
> Offer to help with the venue

The NPC then interprets and responds according to:

- what they heard;
- what they believe;
- their goals;
- their current emotional condition;
- the relationship;
- who else is present;
- what the protagonist previously did;
- whether the request is plausible;
- what it would cost them.

Versu’s conversation system treated responses as ordinary character actions rather than automatic branches; characters could interpret the same remark in different ways, and those public interpretations could themselves provoke further responses. ([emshort.blog](https://emshort.blog/2013/02/26/versu-conversation-implementation/))

This is precisely what prevents a dialogue choice from functioning as a hidden progress button.

A failed attempt can still:

- reveal information;
- clarify a boundary;
- improve honesty;
- worsen trust;
- expose an incompatibility;
- prompt somebody else to intervene;
- create a new approach;
- become funny;
- end the conversation productively.

---

# How the protagonist profile should affect dialogue

Yes, the game should use the protagonist’s history to improve choices.

It should affect:

- remembered callbacks;
- likely phrasing;
- established vocabulary;
- degree of directness;
- known running jokes;
- people the protagonist can offer to contact;
- promises they can reasonably make;
- beliefs they have publicly claimed;
- skills and experiences they can mention;
- subjects they habitually avoid;
- contradictory behaviour characters may notice.

Suppose the protagonist repeatedly uses dry bureaucratic literalism.

The compiler may surface:

> “Has the roof collapsed, or has it entered an open-plan consultation phase?”

But the profile should not remove:

> “Are you all right?”

A player must be able to grow, contradict themselves, become more sincere or behave unexpectedly.

A good set usually contains:

- choices continuous with established character;
- a plausible stretch choice;
- a refusal or exit where appropriate;
- an action or silence when speech is not the only meaningful response.

The profile helps the character feel remembered. It must not turn into an invisible personality prison.

---

# Generating comedy consistently

Funny dialogue should come from a **comedy affordance**, not a request to “generate a joke.”

Useful authored comedy frames include:

- official euphemism versus visible reality;
- status mismatch;
- extreme seriousness about something petty;
- extreme understatement about something disastrous;
- literal interpretation of institutional language;
- public statement versus private motive;
- callback to a shared failure;
- character self-own;
- misplaced confidence;
- social misunderstanding;
- hypocrisy revealed by circumstance;
- escalating procedural absurdity;
- an inappropriate but recognisable analogy;
- a character trying to preserve dignity after it has plainly gone.

A joke candidate should contain:

```yaml
joke_candidate:
  frame: bureaucratic_literalisation
  setup:
    - official_notice_says_service_adjustment
    - player_can_see_building_is_flooded

  target:
    primary: institution
    secondary: situation

  audience:
    - maya

  relationship_permission:
    shared_dry_humour: true

  blocked_when:
    - maya_currently_disclosing_bereavement
    - joke_would_target_vulnerable_person

  possible_line:
    "So the library hasn't flooded. It's become a water-access hub."
```

The joke system should check:

- Is the setup visible?
- Who is being targeted?
- Who can hear it?
- Does this protagonist plausibly phrase it this way?
- Is the relationship safe enough?
- Is somebody currently emotionally raw?
- Has this comic device just been used?
- Does the joke reveal hidden information?
- Is the option socially distinct from the serious choices?

The benign-violation account of humour is useful as a broad guard: comedy often requires something to register as a breach while simultaneously feeling sufficiently safe or acceptable in context. It is not a full joke generator, but it supports checking target, relationship and emotional distance. ([journals.sagepub.com](https://journals.sagepub.com/doi/abs/10.1177/0956797610376073))

Most importantly, selecting the joke should not guarantee laughter.

Possible responses include:

- genuine laughter;
- reluctant laughter;
- offence;
- somebody else laughing when the target does not;
- the joke falling flat;
- a delayed callback;
- the NPC remembering the protagonist as funny;
- the NPC remembering them as incapable of being serious;
- the joke breaking tension;
- the joke making honesty harder.

That uncertainty makes humour part of social play rather than a “comedy success” button.

---

# An end-to-end player experience

Consider a community-radio thread.

## The initial exposure

The player is invited to a radio night because Maya is already part of their social orbit.

The game does not ask whether radio is a goal.

The player attends. The scene is mostly social and funny. Maya refuses to speak live after confidently claiming that she would. The player helps carry equipment afterward.

The ledger records:

- attendance;
- interaction with Maya;
- awareness of the hall;
- the public-speaking incident;
- help given;
- no ongoing promise.

The pursuit model records tentative evidence for:

- Maya;
- radio;
- community activity;
- creative social events.

It does not decide which of these mattered.

## A second opportunity

Later, when the player has a spacious evening, a group message mentions another broadcast.

The player could go elsewhere.

They attend again and ask when the next one is.

The pursuit becomes **emerging**, but there is still no obligation.

Routine recognition may begin to treat this as something the character sometimes does. Ordinary sessions can later be compressed.

## Setup from the wider situation network

A council-adjacent funding situation progresses.

The player sees:

> **Temporary Adjustment to Community Facility Booking Provision**

Nothing immediately demands action.

On the next visit, the hall is locked.

The sifter detects:

- regular place;
- known person;
- interrupted routine;
- official claim contradicting experience;
- potential effect on an emerging player pursuit.

It emits a signal.

## Opportunity composition

The attention governor is Focused rather than Crowded.

The director chooses a message rather than a forced scene:

> **Maya:** apparently “temporary adjustment” means all our stuff is inside and nobody knows who has the new key

The dialogue compiler offers:

> **What actually happened?**  
> Probe for information.

> **I can ask Leah whether she knows another venue.**  
> Offer limited help grounded in an existing relationship.

> **So the hall has moved to a keyless community model.**  
> Joke grounded in visible institutional absurdity.

> **I can’t take this on tonight.**  
> Establish a boundary.

None reveals the hidden lease issue.

None guarantees progress.

## The distinction between help and commitment

The player asks Leah.

Leah might know somewhere, refuse, be busy or introduce another person.

Asking once does not activate a project.

Later Maya says:

> “Are you actually helping me organise this, or were you just asking around?”

Now the player can make a diegetic commitment:

> “Yes. I’ll help get the replacement night running.”

Only here does the game create a player-owned project.

## Earned pressure

The project now competes with:

- the player’s job;
- an existing family plan;
- the venue’s booking window;
- Maya’s impatience;
- another character’s availability.

Those pressures are legitimate because the player adopted the responsibility.

They can still:

- reduce their role;
- delegate;
- cancel;
- disappoint Maya;
- let the event proceed without them;
- transform it into something smaller;
- discover that the hall problem is larger than one event.

## The event

The event becomes a staged social set piece using real characters and current relationships.

It may contain:

- Maya unexpectedly having to speak;
- Leah performing or refusing;
- somebody arriving who misunderstood the event;
- a public claim about the hall;
- a romance beat;
- an institutional interruption;
- a callback to Maya’s earlier public-speaking disaster;
- a genuine warm period where things go well.

## Aftermath

The game does not immediately generate another crisis.

It shows:

- messages afterward;
- somebody posting a terrible photograph;
- Maya’s interpretation of the player’s contribution;
- the venue’s changed state;
- a quiet journey home;
- a montage of ordinary life;
- a later echo when someone recognises the event.

The thread may close, continue into a wider hall project, or remain a meaningful memory.

That sequence feels authored because it contains setup, reincorporation, escalation, a public turn, consequence and recovery.

It remains systemic because every stage arose from actual world state, player engagement, character goals and commitments.

---

# The authoring-time Narrative Workbench

A runtime system of this complexity is unsafe without excellent inspection tools.

Recent experience-management research has begun explicitly exploring state-space visualisation tools for authors. Earlier systems such as Versu also relied on content organisation, visualisation and authoring support rather than expecting writers to reason unaided about every possible interaction. ([ojs.aaai.org](https://ojs.aaai.org/index.php/AIIDE/article/view/36845))

The Workbench should replay any deterministic seed and show:

## Current world truth

- situation stages;
- character goals and intended actions;
- relationship and belief state;
- commitments, plans and habits;
- calendar and location constraints.

## Player perspective

- what the protagonist knows;
- what the human player has seen through dramatic irony;
- what is suspected;
- what has faded and may need reminding.

## Active narrative threads

- current condition;
- supporting evidence;
- player connection;
- pending consequences;
- available closure routes;
- current foreground status.

## Pursuit evidence

- what actions contributed;
- what counterevidence exists;
- whether the system is treating curiosity as commitment;
- which opportunities were influenced by the hypothesis.

## Selection explanation

For every surfaced opportunity:

```text
Selected because:
- consequence of a player promise
- involves an active project
- uses familiar cast
- advances an established setup
- compatible with Focused attention mode

Other candidates deferred because:
- unrelated new obligation
- requires unintroduced character
- protagonist lacks necessary knowledge
- repeats a recent emotional texture
```

## Dialogue explanation

For every option:

```text
Intent: probe
Knowledge basis: visible notice + Maya's message
Commitment: none
Likely situational distinction: may reveal information
Line family: direct understated
Spoiler validation: passed
Outcome-guarantee validation: passed
```

## Warnings

The tool should flag:

- unsupported world facts;
- protagonist-unknown claims;
- dramatic-irony leakage;
- payoffs whose setup was never observed;
- semantically duplicate options;
- outcome-guaranteeing labels;
- unexplained named characters;
- major interruptions with no causal provenance;
- new obligations while attention is Crowded or Recovering;
- repeated high-pressure scenes without aftermath;
- threads with no closure or abandonment route;
- scenes with no turn or residue;
- jokes with unsafe targets or no visible setup;
- NPC actions inconsistent with goals or knowledge;
- project states from which no plausible action remains.

This tool is not secondary polish. It is part of the narrative architecture.

---

# Data objects worth implementing

The first implementation does not require a complicated machine-learning stack. A rule-driven version with good traces is preferable.

The core objects are:

```text
WorldEvent
    Typed record of what actually happened.

StorySignal
    A human-authored pattern matched against events.

ThreadState
    A persistent developing narrative relationship.

PursuitHypothesis
    A cautious interpretation of observed player investment.

Commitment
    A diegetically established expectation or responsibility.

OpportunityPacket
    A causally supported chance for attention or action.

PresentationPlan
    How and when an opportunity will be shown.

SceneContract
    The dramatic and social purpose of a substantial scene.

DialogueCandidate
    Semantic communicative action before wording.

SetupRecord
    Something observed that may later be reincorporated.

NarrativeTrace
    Explanation of every runtime editorial decision.
```

These should reference stable world entities rather than duplicate state.

---

# Prototype scope

The first prototype should be deliberately compact:

- one small neighbourhood;
- one workplace;
- one social venue;
- one home;
- one group chat;
- a small recurring cast;
- one ordinary routine;
- one social routine;
- one emerging player-chosen pursuit;
- several interlocking hidden situations;
- one project that can grow from casual interest;
- one emotionally significant relationship thread;
- one public/institutional contradiction capable of producing satire.

Implement only a small initial pattern library:

- broken routine;
- commitment collision;
- public claim versus visible reality;
- remembered favour;
- project blocker changed;
- relationship callback;
- missed event aftermath;
- character acting against pattern;
- familiar place threatened;
- partial success creating a new problem.

The prototype should prove:

> **Can the same small world produce a coherent, differently focused experience when the player invests in different people and activities?**

Do not begin with ML goal recognition. Store explicit evidence and inspect it. ML may later help classify complex play traces, but it will not solve vague content semantics or poor authoring.

---

# Playtesting without qualitative numbers

Use trace review, observation and categorical evaluation.

After a session, classify opportunities as:

- earned;
- plausible but weakly connected;
- arbitrary.

Classify setup and payoff as:

- remembered;
- naturally reminded;
- confusing;
- never established.

Classify choices as:

- clearly distinct;
- partly overlapping;
- misleading;
- spoiler-bearing;
- falsely promising.

Classify pressure as:

- consequence of commitment;
- consequence of world state;
- understandable external circumstance;
- surprise obligation;
- manipulative escalation.

Classify comedy as:

- character-specific;
- situation-specific;
- effective callback;
- interchangeable one-liner;
- tonally harmful.

Classify the player model as:

- helpful;
- invisible;
- repetitive;
- overconfident;
- restrictive.

The most valuable playtest question is not:

> “Was the narrative good?”

It is:

> “Why did you think this happened, why did you care, what did you think each option would do, and what were you trying to make happen?”

Compare the player’s explanation with the runtime trace.

---

# Automated narrative assertions

The build should fail or warn when:

```text
A player-visible line asserts an unknown fact.

An unavoidable interruption has no causal source.

A strong payoff has no observed setup or reminder.

Two dialogue choices have the same semantic action.

A label claims an outcome controlled by an NPC.

A new obligation is introduced during Crowded or Recovering attention.

A new named character appears without a relational introduction.

A missed event produces neither aftermath nor world continuation.

A player project lacks refusal, delegation, abandonment or closure.

A generated joke has no target, setup or relationship permission.

An NPC uses information they never learned.

A scene ends without changing any state or interpretation.

A pursuit hypothesis is treated as a commitment without a diegetic act.
```

These assertions will provide more practical quality control than a global “story quality” score.

---

# What not to build

Avoid:

- a single optimiser that rates all possible stories;
- a queue of randomly selected challenges;
- visible interest, emotion or narrative-quality meters;
- an abstract goal-selection screen;
- an AI that silently decides what kind of person the player is;
- procedural crises introduced solely to increase tension;
- a requirement that every authored storylet appear;
- a dialogue generator that sees hidden state;
- choice labels that reveal success;
- identical nice/neutral/rude palettes;
- a unique dialogue tree for every possible social state;
- full simulation of every background NPC;
- character development that exists only as hidden values;
- permanent failure for declining or missing ordinary content;
- a director that fixes inconvenient player choices retroactively.

---

# Final design decision

The strongest architecture for *Managed Decline* is:

> **A persistent world simulation observed by an editorial narrative layer that recognises developing story patterns, cautiously infers what the player is investing in, regulates attention, maintains setup and payoff, presents causally relevant opportunities, and compiles grounded dialogue choices—without controlling truth, player intent or outcomes.**

The player profile should exist, but as separate ledgers:

- **who the fictional protagonist has become;**
- **what kinds of play the human currently engages with;**
- **what pursuits the current evidence tentatively suggests.**

The dialogue system should generate semantic intentions first and wording second. Every option should be grounded in protagonist knowledge, express intent rather than promised outcome, differ meaningfully from its neighbours and use authored comedy frames tied to the actual situation.

The practical prototype should be almost entirely deterministic, rule-driven and traceable. The first success criterion is not producing unlimited stories. It is producing a modest set of playthroughs that consistently feel:

- caused rather than random;
- focused rather than crowded;
- personal rather than prescriptive;
- emotionally varied rather than relentlessly escalating;
- funny because of accumulated context;
- and authored even though the player decided what became important.

## User

Agreed with the direction this is going.

It seems reasoning about the players goals and intentions is not realistically achievable since the player will almost always have too much hidden state in their head. However, the game will have data about the players choices and actions and in many cases this is sufficient to put together a personalised, relevant and interesting narrative experience. At least in theory.

## Assistant

Yes. I think that is the right correction, and it makes the system **simpler and more credible**.

Trying to infer the player's actual goal is fundamentally the wrong problem. The player's internal state might be:

> “I like Maya, but I don't care about the radio project. I'm only here because I want to see whether Darren embarrasses himself, and after this I might abandon the whole storyline.”

No telemetry system can reliably recover that.

But it usually **doesn't need to**.

The game has something much more concrete: **evidence of what the player has actually chosen to spend their fictional life doing.**

## Replace “player goal inference” with behavioural evidence

The narrative system should know facts such as:

```text
Player attended Maya's event when other plans were available.
Player asked Maya about the next event.
Player later returned without being invited.
Player declined responsibility for organising it.
Player spent money helping with equipment.
Player repeatedly talks to Maya after events.
Player ignored two unrelated community-project opportunities.
```

Those facts are reliable.

From them, the game can make a modest operational conclusion:

> **Content involving Maya and this social environment is currently a promising place to offer further opportunities.**

It does **not** need to conclude:

> “The player's goal is to save community radio.”

That second statement is both unknowable and unnecessarily restrictive.

---

## There are some things the game *can* know much more strongly

I would separate four levels of evidence.

| What the game knows | Example | How confidently it can act |
|---|---|---|
| **Observed behaviour** | Player keeps attending music events | Offer related opportunities |
| **Established pattern** | Thursday climbing has become part of ordinary life | Use it as routine/context |
| **Explicit commitment** | “I'll organise the fundraiser” | Create real expectations and consequences |
| **Declared intention** | Player tells Maya “I'm trying to find somewhere else for the event” | Characters may reasonably act on that statement |

Only the latter two justify substantial pressure.

This gives us an important narrative rule:

> **Behaviour earns relevance. Commitment earns consequence.**

That is much safer than “the AI thinks you care about this, therefore here is your new storyline.”

---

# Personalisation can work without understanding the player

Suppose two players encounter the same world situation.

One has spent a lot of time with:

- workplace friends;
- career opportunities;
- an office romance;
- professional competence.

Another has spent time with:

- musicians;
- a community venue;
- local organisers;
- creative activities.

A council funding situation can intersect both lives.

For the first player, it might manifest through:

> restructuring at work → colleague worries → strange management communication → career opportunity.

For the second:

> venue loses booking → friend needs another location → event gets disrupted → community responds.

Same underlying world.

No system needed to decide:

> Player A values career.  
> Player B values community.

It only needed to notice:

> **These are the people, places and activities through which each player currently has meaningful connections to this event.**

That is much easier.

And probably more convincing.

---

# This suggests a very useful concept: **narrative proximity**

Instead of asking:

> “How interested is the player in this storyline?”

ask:

> **“How many meaningful connections currently exist between this development and the player's lived history?”**

Not as a numerical score shown or necessarily even calculated numerically.

A situation can be:

**Directly connected**

It affects someone the player is close to, something they promised to do, their workplace, home, project or established routine.

**Adjacent**

It involves a place they know, an acquaintance, an activity they've occasionally pursued or something they previously investigated.

**Exploratory**

They have little connection to it, but it is a plausible new opportunity.

**Remote**

It exists in the world but currently has no reason to demand their attention.

The narrative system mostly foregrounds the first two, occasionally exposes the third, and lets the fourth remain world texture.

That alone should massively reduce random-content syndrome.

---

# Negative evidence needs careful handling

This is important.

Suppose the player ignores three photography opportunities.

That does **not necessarily mean**:

> Player dislikes photography.

They might have been:

- busy;
- broke;
- pursuing a romance;
- dealing with another crisis;
- uninterested in the particular NPC;
- saving that content for later;
- simply not in the mood.

So the system should be much better at recognising **positive investment** than interpreting non-selection.

Repeated voluntary engagement is meaningful evidence.

A single refusal usually isn't.

Repeated explicit refusal probably is.

And:

> “Please stop asking me to come to photography club.”

is very strong evidence.

Again, the fictional interaction itself gives us better information than behavioural mind-reading.

---

# Opportunity generation should therefore be asymmetric

The system should be quite willing to say:

> “You've repeatedly interacted with this — here's more of it.”

It should be reluctant to say:

> “You've ignored this — therefore we're removing it.”

Instead, ignored opportunities can simply become quieter.

Maybe somebody else pursues them.

Maybe they resurface much later through a different person.

Maybe they disappear completely.

This prevents personalisation from turning the world into an algorithmic content bubble.

---

# The player's actions can also reveal *how* they like engaging

This may prove even more useful than subject preference.

Two people might both engage heavily with a community venue, but very differently.

One repeatedly:

> organises, recruits, spends money, makes plans.

The other:

> attends events, jokes with people, performs occasionally, leaves before committee meetings.

We don't need psychological labels such as:

> Player A = Leader  
> Player B = Socialiser

Instead the system can remember:

```text
Player frequently accepts responsibility.
Player often delegates practical work.
Player repeatedly avoids formal organisational roles.
Player tends to respond to personal requests.
Player frequently initiates group plans.
Player engages with investigations when information is incomplete.
```

Then future opportunities can be better shaped.

Player one might naturally be asked:

> “Can you actually run this?”

Player two might hear:

> “We're doing another one Saturday. Come down if you want.”

That is personalised storytelling without pretending to psychoanalyse anyone.

---

# There should always remain deliberate uncertainty

I would make this an architectural principle:

> **The narrative system may predict what could be relevant. It never decides what the player ultimately cares about.**

So every inferred pursuit stays defeasible.

The player can suddenly:

- quit their job;
- stop seeing someone;
- lose interest in music;
- become obsessed with something previously ignored;
- unexpectedly care about a minor NPC;
- abandon a major project;
- start spending all their time somewhere completely different.

The system simply updates from new evidence.

No need to explain the change.

Humans change their minds.

---

# This makes emergent NPC promotion especially powerful

One consequence I particularly like:

A procedural character the narrative system currently considers irrelevant may become important because **the player keeps making them important**.

For example:

> player repeatedly talks to the weird bloke at the climbing centre  
> → asks him for help elsewhere  
> → invites him somewhere  
> → he becomes connected to other characters  
> → a shared incident occurs  
> → he acquires persistent relationship memory  
> → eventually he is functionally a supporting character.

We don't need an AI to understand *why* the player likes him.

The player's repeated allocation of attention is enough.

That is a very clean form of player-authored narrative.

---

# The same logic applies to places, activities and projects

The system doesn't need:

> **Favourite Place = Railway Café**

It knows:

> Player repeatedly goes there voluntarily.  
> Player knows several people there.  
> Player has established a routine there.  
> Several memories happened there.

Therefore:

> Changes affecting the café have high narrative proximity.

Likewise, it doesn't need:

> **Life Goal = Become Musician**

It knows:

> Player owns a keyboard.  
> Practising has become part of ordinary life.  
> They've performed twice.  
> They know musicians.  
> They're in a group chat about gigs.

Therefore music-related developments have lots of existing material to attach themselves to.

---

# So I would revise our earlier “pursuit hypothesis” idea

Keep the concept, but strip away the implication that we're inferring a hidden goal.

Call it something more literal, perhaps **Engagement Thread** or **Player Investment Trace**.

For example:

```yaml
player_investment:
  subject: community_radio

  positive_evidence:
    - attended_voluntarily
    - returned_later
    - asked_about_next_event
    - helped_with_equipment

  commitments:
    - none

  established_connections:
    people:
      - maya
      - leah
    places:
      - community_hall
    activities:
      - live_music

  recent_state:
    active

  editorial_use:
    related_opportunities_may_be_salient
    do_not_create_obligations
```

That contains almost no psychological inference.

And yet it gives the narrative system nearly everything it needs.

---

## The deeper consequence

I think this makes the whole narrative architecture significantly more practical.

We don't need to solve:

> **“What does the player want?”**

We mostly need to solve:

> **“Given what this player has actually done, what currently happening things have meaningful connections to their lived history?”**

Then present some of those opportunities well.

The human player supplies the meaning.

The simulation supplies consequences.

The narrative layer supplies **continuity, timing, setup, reincorporation and presentation**.

That division of labour is much more realistic, and I think it gets us surprisingly close to the desired feeling of a professionally directed story without requiring the game to understand the unknowable contents of the player's head.

## User

I don't agree with "Behaviour earns relevance. Commitment earns consequence. " in the literal sense. Behaviours - either one off or repeated should earn consequences or reactions too in the right context. Likewise a commitment or declared intention is a strong signal for justifying relevant material.

Agree with "Personalisation can work without understanding the player"

Agree with "narrative proximity"

Agree with "Negative evidence needs careful handling". Reasons for refusal can vary. Repeated refusals increase the chance of disinterest. declared dislike or disinterest is stronger. For entry points to persistent and significant parts of the game, opportunities to re-engage must remain open as circumstances can change over time. For transient opportunities it can be a considered a narrative choice made by the player.

Agree with "Opportunity generation should therefore be asymmetric"

Agree with "The player's actions can also reveal *how* they like engaging"

Agree with "There should always remain deliberate uncertainty"

Agree with "This makes emergent NPC promotion especially powerful"

Agree with "The same logic applies to places, activities and projects"

Agree with "So I would revise our earlier “pursuit hypothesis” idea"

Agree with "The deeper consequence"

## Assistant

Agreed. The correction is important.

The earlier formulation—

> **Behaviour earns relevance. Commitment earns consequence.**

—is too rigid. It incorrectly implies that ordinary behaviour is merely evidence for personalisation, while consequences only become legitimate after commitment. In *Managed Decline*, **almost any sufficiently meaningful action can have consequences**, including a one-off impulsive act.

A better principle is:

> **Anything the player actually does can produce appropriate reactions and consequences. What varies is how strongly that evidence justifies future narrative attention, expectations and pressure.**

That preserves causality without turning every incidental action into a new storyline.

## Revised evidence model

I think we should stop trying to put player behaviour into a simple hierarchy and instead record **what kind of evidence an action provides**.

### Actions and behaviour

These are facts.

> Player insulted Darren.  
> Player helped Maya carry equipment.  
> Player attended climbing once.  
> Player repeatedly visits the same café.  
> Player gave someone a large amount of money.

Each can create consequences immediately if the context warrants it.

Insulting Darren once might damage the relationship right now.

Helping Maya once might make her grateful, create a memory or cause somebody else to notice.

Going climbing once might simply create an acquaintance.

Giving someone substantial money once could radically alter several relationships.

Repetition is therefore **not required for consequence**. It mainly provides stronger evidence that something has become part of the player's life.

---

### Repeated behaviour

Repeated voluntary behaviour is useful evidence for narrative personalisation.

> Keeps attending climbing.  
> Regularly spends evenings with Maya.  
> Consistently joins workplace gossip.  
> Frequently helps with community projects.

This allows the narrative system to say:

> Developments involving these people, places and activities have increasing narrative proximity.

It may also allow social expectations to emerge organically:

> “You're coming Thursday, aren't you?”

But the expectations come from the fictional circumstances, not merely because an internal repetition counter fired.

---

### Commitments

Commitments are particularly strong because they establish **expectations inside the fiction**.

> “I'll come Saturday.”  
> “I'll handle the booking.”  
> “Yes, I'll join.”  
> “I'll pay for it.”  
> “I'll speak to her.”

This makes certain future material especially justified:

- reminders;
- somebody relying on the player;
- preparations;
- opportunities to fulfil the commitment;
- consequences of breaking it;
- complications caused by it.

But commitment is **one strong causal source among several**, not the exclusive source of consequence.

---

### Declared intentions

These are also strong evidence, but subtly different.

> “I'm thinking of quitting.”  
> “I want to learn piano.”  
> “I'm going to find out what happened.”  
> “I want nothing more to do with him.”

Characters who heard that can respond to it.

The narrative layer can also reasonably keep related opportunities nearby.

But intention is not accomplishment.

If the player says:

> “I'm going to get fit.”

and spends the next six months doing absolutely nothing about it, that discrepancy should itself become characterisation.

Someone may eventually say:

> “How's the fitness thing going?”

That is better than silently assuming the declared goal remains authoritative forever.

---

# So the game should track evidence, not assign a single meaning

For something like music:

```yaml
player_investment:
  subject: music

  observed:
    - attended_open_mic_once
    - bought_keyboard
    - declined_band_rehearsal
    - practised_repeatedly
    - performed_at_party

  declared:
    - "always wanted to learn"

  commitments:
    - weekly_lesson

  social_connections:
    - maya_plays_guitar
    - knows_local_band

  reactions_and_consequences:
    - maya_now_asks_player_about_music
    - keyboard_exists_at_home
    - lesson_consumes_regular_time

  editorial_status:
    persistent_relevance_supported
```

The engine does not need to reduce that to:

> `Player wants music = TRUE`

The collection of facts is more useful.

---

# Narrative proximity becomes even more central

I think your correction actually strengthens the **narrative proximity** model.

A development becomes especially worth surfacing when it intersects with several things already connected to the player's life:

- something they did;
- something done to them;
- somebody they know;
- a promise;
- a declared intention;
- a place they use;
- an activity they pursue;
- a project;
- a possession;
- information they discovered;
- a past consequence;
- an established routine;
- an unresolved relationship issue.

This gives us relevance without mind-reading.

And a one-off action can create enormous proximity.

Imagine the player drunkenly vandalises a council display one night.

They have never shown any interest in local politics.

Nevertheless, the next day's council response, CCTV investigation, friends' reactions and social-media footage are extremely relevant.

Not because the game concluded:

> “Player likes political content.”

Because:

> **The player caused this.**

Causal proximity can therefore be much stronger than inferred interest.

---

# Re-engagement also needs to be treated differently depending on the content

I agree strongly with your distinction.

## Persistent parts of the game

These include things like:

- significant characters;
- major locations;
- substantial activity families;
- important social groups;
- major career possibilities;
- long-running institutions;
- major systems of the world.

If the player refuses an entry point, the game should not conclude:

> permanently rejected.

Instead the opportunity cools down.

Later re-entry can occur through changed circumstances:

- a different character;
- a different social context;
- a crisis;
- a relationship;
- a new capability;
- a new location;
- a later stage of life;
- a changed opinion;
- sheer coincidence.

Crucially, it should not keep nagging with the **same pitch**.

If the player repeatedly refuses climbing invitations from Josh, later re-entry might be:

> a romantic interest climbs;  
> work organises a climbing evening;  
> the player needs access to someone who happens to climb;  
> somebody asks for support at a competition.

Same system. Different reason to care.

---

## Transient opportunities

These can genuinely pass.

Examples:

> Gig tonight.  
> Maya is sitting alone at the canal right now.  
> A protest is happening this afternoon.  
> Someone has a spare ticket.  
> There's an unusual conversation happening in the next room.

If the player chooses something else, that is part of their story.

The world should continue.

Perhaps the player later hears what happened.

But there is no obligation to recreate the opportunity.

This distinction is particularly useful because it lets the game be generous with its **world** while still allowing individual **moments** to matter.

---

# Negative evidence should therefore decay differently

Something like:

> declined photography once

barely matters.

Repeated refusal:

> declining photography becomes stronger evidence that this particular presentation is unattractive.

Explicit statement:

> “I don't like photography.”

is stronger still.

But none of these necessarily means:

> permanently disable photography content.

Instead they can affect how aggressively the director surfaces it.

Something approximately like:

```text
No evidence
→ normal exploratory exposure

Repeated refusal
→ reduce unsolicited invitations

Explicit dislike
→ avoid casual promotion

Changed circumstances / strong causal relevance
→ may surface again naturally
```

And if the player later voluntarily engages, the newer behaviour supersedes the old assumption.

The system therefore has **memory without stubbornness**.

---

# We should distinguish four reasons content may be relevant

This may be the cleanest refinement so far.

### Causal relevance

> This is happening because of something the player did or something that happened to them.

Usually extremely strong.

### Relational relevance

> It significantly affects somebody, somewhere or something already embedded in the player's life.

Often strong.

### Commitment relevance

> The player or another character has created an expectation involving the player.

Strong justification for attention and pressure.

### Engagement relevance

> Past behaviour suggests this is the kind of material the player has repeatedly chosen to engage with.

Useful for personalisation, but deliberately uncertain.

There is also:

### Exploratory relevance

> The player has little connection to this, but it is a plausible opportunity to discover something new.

This prevents the personalised experience from collapsing inward.

Again, these don't need numerical weighting. They are reasons the director can explain in a trace.

For example:

```text
Why was this surfaced?

Causal:
- player's complaint triggered the inspection

Relational:
- inspection affects player's colleague Priya

Commitment:
- player promised Priya they would attend

Engagement:
- player has repeatedly investigated workplace stories

Result:
Strongly justified foreground scene
```

Versus:

```text
Why was this surfaced?

Exploratory:
- player has never encountered community gardening
- close friend invited them once

Result:
Light invitation only
```

That feels much more robust.

---

# The resulting design principle

I would now summarise the system like this:

> **The narrative layer does not infer what the player ultimately wants. It observes what the player has done, what they have said, what they have committed to, what has happened to them, and what parts of the world those facts connect them to. It uses those connections to decide what may be especially relevant to present next, while preserving uncertainty and continuing to expose the player to new possibilities.**

And separately:

> **Actions have consequences because they occurred, not because the narrative system has classified them as important. Narrative personalisation determines which consequences and opportunities deserve foreground attention—not whether causality exists.**

That distinction is important enough that I would treat it as a core rule of the narrative architecture.

## User

Agree with your points. Record this as a note in repo managed-decline-v2
