# Scenario Identity, Replayability and Affordance Progression

**Date:** 2026-08-18

**Status:** Agreed design direction

## User

Some scenarios that only happen once may need more facts fixed so they retain a recognisable iconic identity across replays but still have variables so they are not be boring and repetitive - some player may want to replay these scenarios to try different things. Some scenarios are designed to happen multiple times in one run through in different forms these are designed to be variable so they don't become predicable and repetitive but perhaps they still need some rules to preserve some form of recognisable iconic identity.

## Assistant

Yes. This is an important refinement.

The distinction should not be **fixed scenario vs variable scenario**. Nearly every scenario should have both. What changes is the **ratio and location of invariance to variability**.

The useful concept is a scenario’s **identity envelope**:

> **The identity envelope is the set of elements that must remain stable enough that players recognise the scenario as _that scenario_, while everything outside the envelope may vary subject to authored constraints.**

This gives us a much better taxonomy.

## 1. Signature scenarios

These are major scenarios that normally happen **once per playthrough**, but players may deliberately replay the game partly to experience them again.

Tabitha’s major Community Compass scenario would probably belong here.

The scenario needs relatively high invariance because players should be able to say:

> “Oh, this is the Tabitha safeguarding-game storyline.”

across different runs.

Its identity envelope might include:

- Tabitha;
- the existence of the old educational programme;
- the fact that it simplified her into a political/safeguarding symbol;
- the programme having a legitimate underlying purpose;
- the strange cultural afterlife of her depiction;
- the tension between the person and the public symbol;
- the existence of a contemporary situation that makes the subject morally complicated;
- several iconic scenes, locations, props or motifs;
- particular comic mechanisms;
- certain major questions the scenario eventually forces into view.

But a replay should still differ substantially in:

- how the player first encounters Tabitha;
- their relationship with her when the controversy returns;
- which other characters become involved;
- who has which evidence;
- how information becomes public;
- which institution takes ownership of the problem;
- whether the player behaves privately or publicly;
- whether they try to reconcile people, expose them, exploit them or avoid them;
- who suffers collateral consequences;
- the final institutional state;
- Tabitha’s relationship with the player;
- which later stories inherit the residue.

So the player gets:

> **the same memorable dramatic object, but a different experience of navigating it.**

That is similar to replaying a good RPG set piece: you want to see the iconic situation again, not have the game procedurally replace the dragon with a tax auditor simply for novelty.

### Some scenes can even remain substantially authored

A major scenario does not need to procedurally vary every scene.

You might deliberately have a very recognisable event:

> Tabitha and the programme designer finally end up in the same room.

That event can be a signature scene.

But its internal state varies:

```text
Who arranged the meeting?
Who trusts the player?
Who thinks they are being ambushed?
What information is already public?
Does Tabitha know Patel objected?
Does Patel believe Tabitha leaked something?
Is the player dating Tabitha?
Is a journalist waiting outside?
Is the current safeguarding case known?
```

The **dramatic architecture** is recognisable.

The **meaning of the scene** can be radically different.

That is probably the ideal form of replay variation for important scenarios.

---

# 2. Recurring scenario families

Other scenarios are explicitly intended to happen repeatedly **inside one playthrough**.

Examples:

- bureaucratic communication failures;
- dates;
- group plans going wrong;
- workplace initiatives;
- transport disruption;
- awkward family gatherings;
- online misunderstandings;
- local consultations;
- nights out;
- institutional inspections;
- public-service interactions;
- friend-group scheduling disasters;
- commercial leisure experiences;
- community events.

These need a **smaller but still strong identity envelope**.

Otherwise recurrence becomes:

> random thing happens → random characters react → random joke.

The player should instead start recognising the family.

For example, a recurring **Institutional Contact Failure** family might have this identity:

> **A reasonable need enters an apparently accessible communication system, but the officially offered channel cannot actually resolve the problem. The player has to understand the organisation rather than merely follow the interface.**

That can recur as:

- a no-reply email;
- a phone menu loop;
- a web form that requires information the organisation already has;
- an office that says the service is online only;
- an online system telling the player to call;
- two departments referring the player to each other;
- a chatbot confidently solving the wrong problem;
- a surprisingly helpful employee reached through an absurd route.

The **mechanism is iconic**.

The details vary.

That gives players the satisfying recognition:

> “Oh Christ, this is another one of *these*.”

without knowing exactly what will happen.

---

# 3. Iconic identity should exist at several layers

I would define five layers.

## Premise identity

What situation is this fundamentally about?

For Tabitha:

> A person became a political symbol because an institutional educational product flattened her into one.

For recurring bureaucracy:

> The official route exists but does not actually connect the citizen to someone capable of resolving the issue.

This should rarely change.

## Dramatic identity

What kind of pressures make the scenario feel like itself?

Tabitha:

- person vs symbol;
- privacy vs publicity;
- legitimate safeguarding vs caricature;
- institutional accountability vs scapegoating;
- supporters who do not necessarily care who she actually is.

Recurring family dinner:

- competing expectations;
- old relationship knowledge;
- inability to leave gracefully;
- somebody inevitably bringing up the wrong subject.

These are stronger identifiers than superficial plot details.

## Sensory/iconic identity

Major scenarios particularly benefit from memorable repeated anchors:

- a particular location;
- an object;
- music cue;
- visual motif;
- interface;
- phrase family;
- kind of document;
- recurring institutional branding;
- staging pattern.

For Tabitha it might be the old programme interface itself.

For another scenario it could be:

> the laminated notice that keeps acquiring amendments.

This matters more than it initially appears. Players often remember stories through **images, places and motifs**, not through their complete causal graph.

## Mechanical identity

What kind of player reasoning or behaviour does the scenario invite?

Examples:

- triangulate contradictory testimony;
- manage competing social commitments;
- decide whether to make something public;
- work out how to reach a human being;
- navigate a group where everybody interprets the same action differently.

A recurring scenario family should usually preserve this.

## Thematic identity

What question keeps being explored?

For example:

> What happens when an institution must reduce a complicated human judgement into something measurable and defensible?

Different stories can instantiate that repeatedly without repeating the same joke.

---

# 4. The variable layer should also be deliberately structured

Variability should not mean “randomise everything not fixed.”

I would author **variation axes**.

For each scenario:

```yaml
variation_axes:

  entry:
    - private_relationship
    - workplace
    - media
    - accidental_witness
    - player_initiated

  social_configuration:
    - friend_involved
    - partner_involved
    - rival_involved
    - player_is_outsider
    - player_has_institutional_role

  information_shape:
    - player_knows_more_than_tabitha
    - tabitha_knows_more_than_player
    - public_knows_false_version
    - evidence_fragmented
    - important_fact_already_public

  pressure:
    - reputational
    - romantic
    - professional
    - community
    - safeguarding
    - financial

  public_trajectory:
    - quiet
    - local_scandal
    - online_viral
    - institutional_suppression
    - rapidly_forgotten

  settlement:
    - reconciliation
    - scapegoating
    - institutional_reform
    - collapse
    - ambiguous_continuation
```

The scenario designer then specifies compatible combinations.

That produces **authored possibility space**, rather than undirected randomness.

---

# 5. Different scenario classes need different variability budgets

I would formalise something like this.

| Scenario class | Invariant content | Runtime variability | Repetition model |
|---|---|---|---|
| **Signature scenario** | High | Moderate–high around the core | Usually once per run |
| **Major character episode** | High character invariants, moderate situation invariants | High relational/context variation | Several across run |
| **Recurring situation family** | Strong mechanism, light fixed detail | Very high | Many times |
| **Social activity** | Activity identity | Extremely high cast/context/dialogue variation | Frequently recurring |
| **Micro-event** | Tiny comic/mechanical hook | Moderate | Reusable with cooldown |
| **Pure ambience** | Almost none | High | Freely reusable |

The key insight is that **replayability and recurrence are different problems**.

A once-per-run signature scenario needs:

> **recognition across campaigns.**

A recurring family needs:

> **recognition inside one campaign without predictability.**

Those require different authoring strategies.

---

# 6. Replaying a signature scenario should reward intentional experimentation

If the player remembers the scenario, we should assume they may deliberately test it.

That means a major signature scenario should contain real **counterfactual affordances**.

The player might think:

> Last time I leaked the document. What if I don't?

> Last time I dated Tabitha first. What happens if I meet her professionally?

> Can Patel and Tabitha actually become friends?

> Can I keep this completely out of the press?

> What if I help the current vulnerable person and completely ignore Tabitha's dispute?

Those experiments should sometimes produce genuinely different outcomes.

This means a signature scenario needs more than random cosmetic variation. It requires **meaningful intervention surfaces**.

A good design test:

> **Can an experienced player deliberately formulate several different approaches before replaying the scenario?**

If yes, the scenario has replay depth.

If the only difference comes from hidden random bindings, replayability is mostly passive.

---

# 7. Recurring scenarios need an anti-pattern memory

Repeated scenario families have the opposite problem.

Suppose the bureaucracy family repeatedly does:

```text
Email fails
→ call fails
→ visit office
→ nice receptionist fixes it
```

By the third occurrence, it is dead.

The system therefore needs to remember **recent structural patterns**, not merely scenario IDs.

For example:

```text
recent_resolution_patterns:
- ineffective_digital_channel -> physical_office_success
- booking_problem -> employee_override
- group_plan -> transport_disruption
```

Then the next recurrence should avoid the same structure.

The next bureaucracy episode might instead be:

```text
Physical office says online only
→ online form actually works
→ but generates incorrect downstream state
→ employee later contacts player because the system contradicted their record
```

Still recognisably the same family.

Different comic rhythm.

This is something I would add to the narrative director: a **pattern cooldown**, not just a content cooldown.

---

# 8. Recurring families can have evolving identities

They can become running systems the player learns.

For example, early in the game:

> Institutional online services are merely annoying.

Later:

> The player has learned which organisations require phone calls, which require offices and which bizarrely work perfectly online.

Then a scenario can violate that learned expectation.

The player thinks:

> I know how council housing works. I'll just go there.

And now:

> “We stopped accepting walk-ins last Monday.”

That is much funnier because the player had developed **procedural literacy**.

So recurring scenarios can have a progression:

```text
Encounter pattern
↓
Recognise pattern
↓
Learn strategy
↓
Exploit strategy
↓
Exception challenges strategy
↓
Player now understands system more deeply
```

That is essentially how enemies work in a traditional RPG.

Managed Decline's “enemy types” are social and institutional patterns.

---

# 9. Iconic scenarios should not randomise their best material away

This deserves an explicit rule.

If the writers discover:

- a brilliant location;
- a great confrontation structure;
- an excellent visual gag;
- a distinctive musical cue;
- a particularly strong emotional reversal;
- a brilliant institutional document;
- a memorable set-piece premise;

**do not proceduralise it out of existence just because the architecture permits variation.**

A common procedural-design mistake is treating maximum variation as inherently superior.

It is not.

A carefully authored iconic scene can be one of the reasons people replay the game.

The correct objective is:

> **preserve the landmark; vary its route, state, interpretation and consequence.**

Not:

> “On the second playthrough, replace the landmark with a different random scene.”

---

# 10. Conversely, recurring scenarios should not preserve too much detail

If a recurring activity always contains:

- the same joke;
- same NPC role;
- same turn;
- same outcome structure;
- same scene grammar;

then it is really a one-shot story pretending to be procedural.

Recurring packs should preserve primarily:

- mechanism;
- tone;
- interaction grammar;
- thematic role.

They should vary:

- cast;
- location;
- scale;
- cause;
- social stakes;
- knowledge distribution;
- interruption;
- outcome;
- relationship consequences;
- presentation.

---

# 11. I would add two explicit fields to every Scenario Contract

## `identity_envelope`

```yaml
identity_envelope:

  premise_invariants:
    - educational_programme_simplified_tabitha
    - programme_goal_was_legitimate
    - tabitha_became_public_symbol

  dramatic_invariants:
    - person_vs_symbol
    - competing_public_narratives
    - no_side_has_complete_truth

  iconic_elements:
    - archived_training_interface
    - tabitha_character
    - institutional_safeguarding_language

  mechanical_identity:
    - triangulate_information
    - choose_private_vs_public_intervention
    - relationship_changes_information_access

  thematic_question:
    - can_a_person_remain_a_person_after_becoming_a_symbol
```

## `variation_contract`

```yaml
variation_contract:

  must_vary_when_possible:
    - entry_route
    - supporting_cast
    - initial_information_distribution
    - active_relationship_pressure
    - public_response
    - outcome_residue

  may_vary:
    - location_of_secondary_meetings
    - discovery_routes
    - media_channel
    - minor_roles

  should_not_vary:
    - tabitha_identity
    - central_programme_history
    - core_thematic_contradiction

  repeat_avoidance:
    - previous_resolution_pattern
    - previous_cast_configuration
    - previous_primary_pressure
```

This makes the intended authorial identity explicit and testable.

---

# 12. One further distinction: landmarks versus connective tissue

I think this may become a useful vocabulary for the whole game.

### **Landmark content**

Players are meant to remember it.

- Tabitha's major scenario;
- a disastrous wedding;
- an election-night sequence;
- an important romance confrontation;
- the player's accidental windfall;
- a major council hearing;
- a public event involving many established characters.

These should have **strong authored identity**.

### **Connective content**

Its purpose is to make each life feel different and make the landmarks arrive naturally.

- calls;
- small dates;
- workplace incidents;
- minor bureaucracy;
- trips;
- online conversations;
- plans;
- rumours;
- transport problems;
- ordinary relationship developments.

These should have **strong systemic variability**.

A good Managed Decline playthrough probably needs both.

If everything is a landmark, the game feels over-written and exhausting.

If everything is connective tissue, nothing becomes iconic.

The narrative system's job is partly to make sure enough ordinary variable life surrounds the authored landmarks that those landmarks feel like things that **happened to this particular player**, rather than chapters everybody consumed in the same order.

The design principle I would add is:

> **Preserve recognisable scenario identity at the level players are meant to remember; introduce variability at the levels where player history, agency and circumstance should matter.**

That applies equally to one-shot signature scenarios and recurring systemic families—the only difference is **where we draw the identity envelope.**

## User

Agreed. What about scenarios unlocking explorable/goable places/venues or doable things?

## Assistant

Yes. **Scenarios should be one of the main ways Managed Decline expands what the player can physically go to and socially do.** This fits the existing principle that access can replace conventional RPG level/key gating: the world opens because the player acquires relationships, knowledge, memberships, invitations, routines and reasons to belong somewhere.

The important refinement is that a scenario should not merely unlock a location as a reward:

> `Scenario complete → NEW AREA UNLOCKED`

It should alter the player's **affordance graph**.

A situation can create, reveal, legitimise, temporarily provide, transform or remove access to:

- places;
- people;
- groups;
- activities;
- services;
- transport routes;
- communication channels;
- social events;
- institutions;
- recurring routines;
- actions the player now knows how to attempt.

That can become a major form of progression.

# 1. Places should have different kinds of access

I would distinguish at least these states internally:

```text
UNKNOWN
↓
KNOWN
↓
REACHABLE
↓
ENTERABLE
↓
SOCIALLY ACCESSIBLE
↓
FAMILIAR
↓
BELONGING / REGULAR
```

These aren't necessarily shown to the player.

For example, the player may know there is a private members' club in town from day one.

It is physically reachable.

But they cannot simply walk through the door and participate meaningfully.

Later:

> Wealth scenario → introduced by Sophie → invited to dinner there.

Now it becomes socially accessible.

Later still:

> player repeatedly attends → knows staff → can suggest meeting someone there.

Now it has become part of their own usable world.

This is much richer than binary locked/unlocked state.

---

# 2. Scenarios can unlock places in several distinct ways

## Discovery unlock

The player learns somewhere exists.

Example:

> Someone mentions an obscure rehearsal room above a shop.

The map can now contain it.

Nothing necessarily changed physically. The **player's knowledge changed**.

## Invitation unlock

The place was known but not socially available.

Example:

> Tabitha invites you to the private back room of the record shop where her friends meet.

You can now go there under certain circumstances.

## Membership unlock

The player joins something.

Examples:

- climbing centre membership;
- amateur dramatic society;
- political branch;
- community workshop;
- gym;
- choir;
- social club;
- coworking space.

Membership may create recurring activities as well as physical access.

## Relationship unlock

A person gives access.

Examples:

- someone's flat;
- family home;
- workplace after hours;
- backstage;
- staff room;
- private garden;
- boat;
- studio;
- country house.

The place becomes part of the relationship.

This makes relationship damage mechanically meaningful too: access can become awkward, conditional or disappear.

## Functional unlock

The player gains a reason or capability to use an existing place.

Example:

The civic centre has existed all along.

Initially it's basically scenery.

After a council dispute:

> you now know the planning office is there and understand what you can actually do inside it.

The important unlock is **action**, not geometry.

## Temporal unlock

Some places are accessible only during particular states:

- night market;
- Christmas fair;
- polling station;
- festival;
- after-hours office;
- student event;
- temporary exhibition;
- pop-up venue;
- protest camp.

This makes the world feel temporally alive.

## Transformational unlock

A scenario changes a place into something new.

Example:

```text
abandoned shop
→ temporary arts venue
→ successful community space
→ eventually café / club / business
```

The player has not merely unlocked content. Their campaign has **created a place that didn't function that way before**.

This is particularly powerful.

---

# 3. Scenarios should also unlock things the player can do

This may be even more important than map expansion.

A scenario can add a new **social or practical affordance** to the player's life.

For example:

### Before

You can visit Maya.

### After getting involved in her music circle

You can now:

- invite people to gigs;
- ask musicians to perform;
- book certain rooms;
- rehearse;
- join open-mic nights;
- organise a small event;
- ask that social group for music-related help.

The scenario hasn't given the player:

> `MUSIC ACTION SET +1`

It has changed their life enough that those actions now make sense.

That is the correct form of progression for Managed Decline.

---

# 4. Think in terms of **affordance bundles**

A place should rarely unlock as just a map cell.

For example:

## Community radio venue

Unlock might provide:

```yaml
place:
  community_hall

people:
  maya
  regular_radio_group
  caretaker

activities:
  attend_broadcast
  volunteer
  perform
  help_setup

social_actions:
  invite_someone
  introduce_people
  ask_for_venue_access

information:
  local_events
  community_gossip

possible_routine:
  thursday_radio_night

scenario_ports:
  venue_threatened
  community_event
  public_meeting
```

Now one unlock has meaningful systemic leverage.

The existing routine design already supports this: repeated participation can make a place or activity part of ordinary life, after which routine compresses repetition and resumes direct play when something changes.

---

# 5. This gives Managed Decline an excellent progression curve

Traditional RPG:

```text
Village
→ Forest
→ Castle
→ Mountain
→ Final Dungeon
```

Managed Decline could instead progress like:

```text
INITIAL LIFE
home / job / ordinary friends / high street
        ↓
SOCIAL EMBEDDING
friends' homes / regular café / clubs / nights out
        ↓
COMMUNITY ACCESS
community hall / local organisations / backstage / workplaces
        ↓
INSTITUTIONAL ACCESS
council offices / meetings / professional networks / formal events
        ↓
WIDER SOCIAL ACCESS
new neighbourhoods / cultural spaces / wealthy circles / online communities
        ↓
PLAYER-CREATED ACCESS
projects / businesses / events / organisations / homes / recurring gatherings
```

But **the order should vary by playthrough**.

One player expands through:

> arts → musicians → venues → community politics.

Another:

> job → professional contacts → council → wealthy social circle.

Another:

> online friend → gaming group → visit → new city network.

Another:

> romance → partner's family → completely different part of Britain.

So the world physically and socially expands according to the life the player builds.

That is excellent RPG progression.

---

# 6. Don't make every unlocked place permanently important

This is where scope can explode.

A scenario might make a place available at several levels.

### One-scene place

Used for one memorable event.

Example:

> hotel conference suite where an absurd public consultation occurs.

Afterwards it may remain known but not normally visitable.

### Occasional place

Accessible whenever there is a reason.

Example:

> council offices.

You don't wander around them recreationally, but several situations may bring you back.

### Persistent social place

Becomes part of ordinary life.

Example:

> climbing wall, friend's flat, favourite café.

These need more implementation investment.

### Major hub

High reuse.

Example:

> town centre, workplace, home, station.

So scenarios should declare **place persistence class**.

Otherwise every writer invents another fully explorable venue and production scope explodes.

---

# 7. Some places should be retroactively instantiated only when needed

This connects directly to the principle you raised about leaving unobserved reality undefined.

Suppose the town supposedly contains:

- hundreds of offices;
- dozens of restaurants;
- several clubs;
- various industrial estates;
- churches;
- sports halls;
- private houses;
- hotels.

We do **not** need to build all of them.

A scenario needs:

> modest independent restaurant appropriate for a first date.

The system can bind an undeclared commercial unit on an existing diorama:

> **Marzano's** now exists there.

Once revealed:

```text
identity fixed
location fixed
staff initially fixed as needed
history now persistent
```

Before that, the shopfront might have been generic or not enterable.

This is essentially **lazy world authoring**.

The important constraint is the same as with facts:

> Once the player or another simulated actor has had a consequential interaction with the place, its relevant properties become canonical.

This gives you a much larger-feeling town without authoring every interior in advance.

---

# 8. Some scenario outcomes should create new permanent venues

This could be one of the most satisfying forms of long-term consequence.

Examples:

### Save/rebuild route

```text
empty unit
↓
player + friends organise temporary use
↓
events happen there
↓
it becomes a permanent community venue
```

### Business route

```text
friend starts side project
↓
player helps
↓
temporary stall
↓
small premises
↓
successful shop/café/studio
```

### Wealth route

```text
player acquires property
↓
chooses use
↓
home / studio / business / event venue
```

### Institutional failure

```text
community centre closes
↓
activity relocates to pub function room
↓
that group gradually makes the room culturally significant
```

This gives every playthrough physical history.

The town itself becomes a record of the campaign, consistent with the existing goal that long-running situations leave persistent traces rather than resetting into quest-complete neutrality.

---

# 9. Access can also be lost

Important.

Progression should not be a monotonically increasing collection of keys.

A player might lose:

- permission to visit someone's home;
- a workplace after quitting;
- access to a private group;
- invitations to events;
- a regular venue because it closes;
- a club membership;
- professional access because reputation changed.

But loss should not usually mean deleting the map asset.

It creates interesting new states:

> You can physically go there, but you would not currently be welcome.

Or:

> The club has closed, but the building remains.

Or:

> You can still visit the café, but the friend group no longer meets there.

The same place accumulates social history.

---

# 10. Scenarios should unlock **verbs through knowledge**

This is another form worth exploiting.

Initially the player might not know they can:

- submit a planning objection;
- request records;
- contact a councillor;
- appeal a decision;
- nominate someone for something;
- book a council room;
- register a society;
- apply for a licence;
- organise a street event;
- complain to an ombudsman;
- join a union;
- request flexible working;
- seek a guarantor;
- make a formal offer;
- call in a favour from a particular organisation.

After seeing someone else do it, being told about it, or going through a scenario, that becomes a **known affordance**.

Not necessarily a permanent menu button.

Rather:

> future contexts may now offer that action because the protagonist knows it is something people can do.

That ties progression directly to the game's broader theme of **learning how society actually works**.

---

# 11. Avoid checklist progression

I would strongly resist UI like:

```text
VENUES
[✓] Railway Café
[✓] Climbing Centre
[ ] Private Members Club
[ ] Council Chamber
[ ] Rich Person Manor
```

That would turn organic social access into collectible completionism.

The player should instead notice their life expanding naturally.

Early game phone:

```text
Contacts: 11
Places you actually go: a handful
Calendar: work, home, two friends
```

Later:

```text
different group chats
more saved locations
people asking them to things
calendar containing recurring activities
friends' homes
clubs
workplaces
projects
```

The phone becomes indirect evidence of progression.

---

# 12. This also helps the scenario library interact

Locations and activities are excellent **scenario ports**.

A Situation Pack can output:

```text
UNLOCK_PLACE
UNLOCK_CONTEXTUAL_ACCESS
UNLOCK_ACTIVITY
CREATE_RECURRING_PLAN
CREATE_GROUP
CREATE_SERVICE_ACCESS
CREATE_PROJECT_AFFORDANCE
TRANSFORM_PLACE
REMOVE_ACCESS
```

Other scenarios can then consume those.

Example:

```text
Tabitha scenario
→ player gains access to independent music/alt social circle
→ learns of small venue
→ starts attending gigs
→ venue becomes regular place
→ rent-pressure situation affects venue
→ relationship with another musician becomes relevant
→ player can organise benefit event
→ event creates local political attention
```

None of that needs to be scripted as:

> Tabitha Quest Part 7.

The earlier scenario simply altered the player's affordance graph, and later situations found those new connections.

That is exactly the kind of organic narrative accumulation the architecture is aiming for.

---

# 13. I would add another section to the Scenario Contract

Every substantial scenario gets:

```yaml
affordance_effects:

  reveal_places:
    - possible: community_radio_hall

  access_changes:
    - role: backstage_area
      condition: invited_by_member
      persistence: conditional

  activities_unlocked:
    - attend_radio_night
    - offer_music_help

  actions_learned:
    - request_community_room_booking

  recurring_patterns:
    - thursday_radio
      eligible_if: repeated_voluntary_attendance

  possible_world_transformations:
    - community_hall_becomes_regular_place
    - replacement_venue_created

  access_loss:
    - hall_closes
    - relationship_with_host_breaks_down

  reuse_class:
    community_hall: persistent_social_place
```

And crucially:

> **Every new permanent affordance must justify its production and cognitive cost.**

If a new venue could instead use an existing place, reuse the existing place.

That follows the same accepted principle already established for NPCs: before adding a new named person, ask why an existing person cannot fill the role. We should apply the same discipline to **places and activities**.

---

# 14. The larger principle

This substantially improves the scenario architecture because scenario outcomes now affect more than story flags.

They alter:

> **what kind of life the player is capable of living.**

A friendship creates somewhere to go.

A job creates a workplace and colleagues.

A romance gives access to another person's private world.

A hobby creates regular activities and a group.

A political dispute teaches civic actions.

A successful project creates a venue.

A financial transition reveals another social Britain.

A falling-out removes access.

A closed venue forces routines somewhere else.

That means the player's progression becomes visible in the world itself:

> **More of Britain becomes meaningful, usable and personally connected—not because the protagonist levelled up, but because they gradually acquired a life.**

I think that should become a major design pillar for Managed Decline.

## User

Accepted. Add this to the repo notes
