# Core Game Loop, Desire Formation and Hook Supply

**Date:** 2026-08-19

**Status:** Accepted design direction

## User

How do pros design core game loops? What elements need to be present? What is the core game loop in managed decline? Does it meet the pro standards?

## Assistant

## Short answer

**Professional game designers do not usually design one loop in isolation. They design nested loops.** The moment-to-moment loop must feel good, the session loop must keep producing motivation, and the long-term loop must make the player's relationship with the game evolve.

Managed Decline already has a **very strong long-form/meta loop** and unusually sophisticated machinery for pacing, consequences and progression. Its weaker area is that the **moment-to-moment gameplay loop has not yet been specified tightly enough**.

So my verdict is:

> **Managed Decline meets professional standards as a core-loop concept, but it does not yet meet professional production standards as a proven core loop.**

The missing work is relatively specific: define the player's recurring verbs, define how consequences are communicated, define the cadence of meaningful decisions, and prove that the resulting 10–30 minute experience is enjoyable in a prototype.

---

# What professionals mean by a core game loop

People sometimes reduce a core loop to:

> Kill enemies → get loot → become stronger → kill harder enemies.

That's one kind of loop. It is not the definition.

A useful generic model is:

```text
MOTIVATION
    ↓
READ THE CURRENT STATE
    ↓
MAKE A DECISION
    ↓
TAKE AN ACTION
    ↓
GET FEEDBACK
    ↓
WORLD / PLAYER STATE CHANGES
    ↓
NEW POSSIBILITIES OR PROBLEMS
    ↓
NEW MOTIVATION
```

There are really **three nested scales**.

| Scale | Typical question | Example |
|---|---|---|
| **Interaction loop** | What am I repeatedly doing? | Aim → shoot → evade → reposition |
| **Session loop** | Why do I keep playing for another 20 minutes? | Explore → encounter → solve → progress |
| **Meta/campaign loop** | Why does hour 20 feel different from hour 2? | Build character → unlock capabilities → tackle larger problems |

A professionally designed loop needs more than repetition. It needs a **return path**: what happens as a result of the action must alter the conditions of the next decision.

That is what makes it a loop rather than a sequence of content.

---

# What elements actually need to be present?

There isn't an official industry checklist, but strong commercial games almost invariably solve these problems.

| Requirement | What it means |
|---|---|
| **Player motivation** | There is something the player currently wants, fears, wonders about or cares about. |
| **Readable state** | The player has enough information to reason about what is happening. |
| **Agency** | There are materially different things the player can do. |
| **Core verbs** | The player repeatedly exercises a relatively small, learnable action vocabulary. |
| **Trade-offs / uncertainty** | Choices aren't merely clicking through the obviously correct answer. |
| **Feedback** | The game clearly reacts to the player's action. |
| **Persistent consequence** | At least some actions affect future circumstances. |
| **Reward/progression** | Playing changes what the player can experience, understand or accomplish. |
| **Renewed motivation** | Outcomes naturally generate the next question or desire. |
| **Mastery** | The player gets better at understanding or manipulating the game's systems. |
| **Variation** | The same basic loop produces materially different situations. |
| **Pacing** | Pressure, anticipation, resolution and recovery are controlled rather than constant. |
| **Recovery from failure** | Bad outcomes usually create new play rather than merely stopping play. |

Not every game needs XP, resources, health, fail states, loot, combat or explicit objectives.

But **action → response → changed future action space** is fundamental.

---

# Managed Decline's original loop

One of the early accepted design conversations effectively identified this:

> **Explore diorama → notice something interesting → approach character/object → VN scene → make choices/interact → world state changes → resume exploration.**

That's already a legitimate game loop.

But I would no longer describe that as the *real* Managed Decline core loop.

It is mostly the **presentation loop**.

The design has evolved substantially since then.

---

# The actual Managed Decline core loop now

Looking across the accepted designs, I think the game's real core loop is:

```text
NOTICE
something happening in your life/world
        ↓
INTERPRET
people, evidence, relationships and circumstances
        ↓
DECIDE WHAT MATTERS
engage, ignore, investigate, commit, withdraw, interfere
        ↓
ACT
through conversation, travel, social action,
projects, commitments and practical intervention
        ↓
EXPERIENCE CONSEQUENCES
people react; situations evolve;
relationships/world/knowledge change
        ↓
LIFE CHANGES
new access, habits, people, places,
information and possibilities emerge
        ↓
NOTICE THE CHANGED WORLD
```

Or compressed to something players could actually internalise:

> **Read the world → decide what matters → do something → live with what happens.**

And then:

> **Your life changes, giving you different things to care about next time.**

That is a very strong loop.

---

# What is the actual "gameplay"?

This is an important distinction.

Managed Decline's core activity isn't really **talking to NPCs**.

Nor is it walking around.

Nor is it reading dialogue.

Those are interfaces.

The actual game is:

> **Reading social situations and deciding how you want to participate in them.**

The hidden situation-network design explicitly supports this. One underlying situation manifests through behaviour, routines, environmental changes, rumours, institutions, media and other systems, and the player has to construct an understanding from incomplete perspectives. The notes explicitly identify **"reading society"** as an intended player skill.

That's important because it means Managed Decline has a genuine skill axis.

Consider:

```text
Sandra isn't at her desk.

Beginner:
    "There must be a Sandra quest."

Experienced player:
    "She cancelled Thursday,
     her manager was weird yesterday,
     that restructuring email appeared,
     and Priya mentioned HR.

     Something is happening."
```

That is **mastery**.

It doesn't require +17 Perception.

---

# And then the player acts on that understanding

The player might:

```text
Ask Priya
Ignore it
Message Sandra
Talk to the manager
Cover for Sandra
Tell somebody else
Investigate the restructure
Offer help
Use the situation for their own purposes
Go home because they have other problems
```

Critically, the world does **not** wait politely for the protagonist.

The accepted time/routine design says routine should compress until attention or agency matters, while commitments, relationships and situations continue through diegetic time. Missing something should generally result in **the world continuing without the player**, creating aftermath rather than a crude `QUEST FAILED`.

That's very good loop design.

Because **"do nothing" is itself an action with consequences**.

---

# Managed Decline also has an unusually good reward loop

This is one of the strongest parts of the current design.

You don't need:

```text
SANDRA QUEST COMPLETE

+500 XP
+£120
+3 Friendship
```

The recent scenario design established **affordance progression**.

A scenario can change access to:

> people, groups, activities, services, transport, communication channels, institutions, routines and actions the player has learned they can attempt.

So the reward loop becomes:

```text
GET INVOLVED IN SOMETHING
        ↓
FORM A RELATIONSHIP / LEARN SOMETHING / GAIN ACCESS
        ↓
YOUR USABLE WORLD EXPANDS
        ↓
YOU CAN NOW DO THINGS THAT PREVIOUSLY
WOULDN'T HAVE MADE SENSE
```

For example:

```text
Meet Maya
↓
Go to her radio thing
↓
Become familiar with the group
↓
Community hall becomes part of your life
↓
Can attend regularly
↓
Can invite somebody there
↓
Can ask musicians for help
↓
Can organise something there
↓
Meet people through it
↓
Become entangled in completely different stories
```

The accepted design explicitly describes progression from initial life through social embedding, community and institutional access, wider social access and eventually **player-created access**, with different players reaching these worlds through different relationships and pursuits.

That is absolutely RPG progression.

It's just not stat progression.

---

# This gives Managed Decline three very coherent loops

### Moment-to-moment

```text
EXPLORE / OBSERVE
        ↓
NOTICE SIGNAL
        ↓
INTERACT
        ↓
MAKE SOCIAL/PRACTICAL DECISION
        ↓
SEE IMMEDIATE REACTION
```

### Life/session loop

```text
WHAT MATTERS TO ME RIGHT NOW?
        ↓
PURSUE / COMMIT / IGNORE
        ↓
SPEND TIME AND SOCIAL CAPITAL
        ↓
SITUATIONS DEVELOP
        ↓
EXPERIENCE CONSEQUENCES
        ↓
RECONSIDER PRIORITIES
```

The accepted narrative-attention system is specifically designed to prevent this from becoming an onslaught. It surfaces opportunities connected to actual world state and inferred player pursuits, holds unrelated material back when attention is crowded, and allows recovery periods after major events.

### Campaign/meta loop

```text
LIVE YOUR LIFE
       ↓
FORM RELATIONSHIPS / ROUTINES / PROJECTS
       ↓
GAIN KNOWLEDGE AND AFFORDANCES
       ↓
BECOME EMBEDDED IN NEW SOCIAL WORLDS
       ↓
AFFECT PEOPLE / PLACES / INSTITUTIONS
       ↓
YOUR CAMPAIGN DEVELOPS ITS OWN HISTORY
       ↓
DIFFERENT OPPORTUNITIES BECOME POSSIBLE
```

That last one is exceptionally well aligned with the fantasy of the game.

---

# Where Managed Decline is already at professional quality

Here is how I would review the current design if it arrived internally at a studio.

| Area | Current assessment |
|---|---|
| **Core fantasy ↔ mechanics alignment** | **Very strong** |
| **Player agency** | **Very strong** |
| **Consequential world state** | **Very strong** |
| **Long-term progression** | **Very strong** |
| **Narrative pacing architecture** | **Very strong** |
| **Intrinsic rewards** | **Strong** |
| **Failure / missed-content handling** | **Very strong** |
| **Replayability architecture** | **Strong** |
| **Player mastery potential** | **Strong** |
| **Core interaction vocabulary** | **Underdefined** |
| **Immediate feedback grammar** | **Underdefined** |
| **Moment-to-moment cadence** | **Underdefined** |
| **Onboarding** | **Not demonstrated yet** |
| **Cognitive readability** | **Potential risk** |
| **Actual fun in play** | **Unproven** |

So there is one major asymmetry.

## We have designed the *consequence side* of the loop extremely well.

But the **action side** still needs tightening.

---

# The biggest remaining problem: what does the player repeatedly *do*?

Right now we can say:

> "The player interacts socially and practically."

That's still too vague for production.

Mario has:

> run, jump.

Zelda has a relatively clear vocabulary of movement, observation, items, combat and interaction.

A detective game may have:

> observe, question, inspect, compare, accuse.

Managed Decline needs its equivalent.

I think the emerging vocabulary is something like:

| Verb family | Examples |
|---|---|
| **Observe** | wander, inspect, read, listen, check phone |
| **Ask** | question, clarify, confront, gossip |
| **Connect** | visit, message, invite, introduce |
| **Commit** | promise, join, agree, organise, undertake |
| **Intervene** | help, persuade, expose, complain, spend, arrange |
| **Withdraw** | decline, ignore, leave, cancel, distance yourself |
| **Create** | plan an event, start a project, establish a routine, bring people together |

That's manageable.

And importantly, those verbs operate across dozens of different contexts.

That's what a good core action vocabulary does.

---

# Feedback needs a similarly explicit design

Suppose I persuade somebody not to leak a document.

A poor game gives:

> **TABITHA APPROVES +5**

Managed Decline correctly doesn't want that.

But **removing meters does not remove the requirement for feedback**.

The player still needs to see:

```text
ACTION
↓
IMMEDIATE RESPONSE
"Fine. I won't send it."

↓
SOCIAL RESPONSE
She behaves differently toward you.

↓
WORLD RESPONSE
The story does not appear online.

↓
SECONDARY RESPONSE
Someone else eventually obtains it.

↓
PERSISTENT MEMORY
Tabitha remembers what you advised.

↓
NEW POSSIBILITY
She later trusts you with something else.
```

If this feedback chain is too obscure, players conclude:

> "My choices don't matter."

If it is too explicit, the simulation becomes mechanical and predictable.

**Finding that middle ground is probably the single most important UX problem left in the core loop.**

---

# Another thing professionals worry about: where does the next motivation come from?

Managed Decline actually has a sophisticated answer.

The narrative layer isn't supposed to manufacture random quests. The world generates real developments; the story sifter identifies potentially meaningful configurations; the attention system surfaces appropriate ones; and the player's prior behaviour influences which opportunities are likely to be relevant.

So:

```text
I spend time with Maya
        ↓
game infers tentative interest
        ↓
I voluntarily help Maya twice
        ↓
this becomes an actual commitment/pursuit
        ↓
world begins producing consequences
and opportunities around that relationship
        ↓
I become more invested
```

That is the desired self-reinforcing loop:

> **Player interest generates relevant opportunity, which produces engagement, which creates consequences, which creates stronger interest.**

That's the social/narrative equivalent of:

> kill monster → get stronger → fight more interesting monster.

---

# The recurring-scenario design also solves the mastery problem

This was a very good recent addition.

Recurring scenario families aren't merely procedural variety. Players should begin recognising **social and institutional patterns**, learn ways of dealing with them, exploit that knowledge, and then encounter variations that violate their expectations.

The accepted scenario note describes essentially:

```text
Encounter pattern
↓
Recognise pattern
↓
Learn strategy
↓
Exploit strategy
↓
Encounter exception
↓
Develop deeper understanding
```

That is textbook game-learning structure.

The note even makes the useful comparison that Managed Decline's equivalent of RPG enemy types can be **social and institutional patterns**.

That is probably one of the strongest conceptual answers we've found for:

> "But where is the actual game?"

**That's the game.**

---

# The biggest risk

Managed Decline could still fail despite all this good architecture.

It could become:

```text
walk around
↓
read loads of dialogue
↓
make vaguely interesting choice
↓
invisible simulation changes
↓
walk around
↓
read loads more dialogue
```

Technically all the systems would be working.

It could still be boring.

This is why the next step should **not** be another giant narrative architecture layer.

It needs a core-loop prototype.

---

# What I would now formally declare as the Managed Decline core loop

I would use this as the design target:

> **The player observes a changing social world, identifies people or situations they care about, chooses how and whether to become involved, and experiences readable short- and long-term consequences. Those consequences alter their relationships, knowledge, commitments and affordances, creating a changed life containing new possibilities to notice and pursue.**

At the player-experience level:

> **Notice → Care → Choose → Act → Consequence → Changed possibilities → Notice again.**

And at the thematic level:

> **Read Britain. Build a life in it. Interfere with it. Live with the results.**

I think that's much more precise than **"JRPG/VN hybrid"**.

---

# What remains before I'd call the loop production-ready

I would make the next design/prototype pass answer these questions explicitly:

| Question | Required result |
|---|---|
| **What can I do?** | Small canonical player verb vocabulary |
| **Why should I do anything?** | Readable hooks, relationships, curiosity and commitments |
| **Why this instead of that?** | Real opportunity cost, uncertainty and competing priorities |
| **What just happened?** | Immediate social/environmental feedback |
| **Did my choice matter?** | Persistent but naturalistic consequence feedback |
| **What did I gain?** | New knowledge, access, relationship, belonging, capability or world change |
| **What do I want now?** | Consequences naturally produce another desire/question |
| **Am I getting better?** | Increasing literacy in people, institutions and recurring scenario families |
| **Can I stop caring about this?** | Threads can be ignored, declined or abandoned without breaking the game |
| **Can I play differently next time?** | Different pursuits produce substantially different affordance graphs and social worlds |

If a small prototype can repeatedly satisfy those questions, **then yes, I would say Managed Decline has a professionally credible core game loop**.

And more importantly, it would have one that isn't simply copied from Persona, Stardew Valley, The Sims or a conventional VN. Its progression loop would be fundamentally about **becoming embedded in a simulated society and accumulating a particular life**.

That is distinctive enough to carry the game.

## User

lets just say before building the core prototype it already sounds boring. like, not completely boring, but its as if something is missing from the core experience.

## Assistant

Yes. I think the previous formulation exposed the problem rather than solving it.

> **“Notice → care → choose → act → consequence” is a good narrative loop, but it is not an exciting game loop.**

It makes the player sound like a thoughtful participant in an interactive television drama. That is probably why it feels slightly dead.

## What's missing: **wanting something and trying to pull it off**

The game needs a stronger **appetitive engine**.

The player should regularly think things like:

- *I want her to go out with me.*
- *I need to get out of this shit flat.*
- *Can I somehow get into that event?*
- *I want to make this project actually happen.*
- *I could make money out of this.*
- *I need to stop these two people meeting.*
- *Can I get this idiot fired without it coming back to me?*
- *I promised three incompatible things. How the hell do I manage this?*
- *I want to become part of that group.*
- *Could I exploit this ridiculous bureaucratic rule?*
- *I have £18,000 now. What can I actually do with it?*
- *Can I save this place?*
- *Can I turn this stupid accident into something useful?*
- *I wonder what happens if I tell her.*

That's much more alive.

The current design has **situations happening around the player**. What it needs at the centre is a player who is **trying to make things happen**.

---

# I think the missing core verb may be: **scheme**

Not necessarily maliciously.

In the broad sense:

> **Want something → work out how the world works → use people, places, money, knowledge and opportunities to try to make it happen.**

That can encompass romance, friendship, career, money, projects, social climbing, mischief, politics, helping people, escaping obligations, organising events and stupid personal ambitions.

Then Managed Decline becomes less:

> Observe British society and make meaningful choices.

And more:

> **Try to build the life you want inside this ridiculous society.**

That is substantially stronger.

---

# A much better candidate core loop

```text
WANT SOMETHING
        ↓
WORK OUT HOW YOU MIGHT GET IT
        ↓
USE YOUR LIFE
people / money / knowledge / places /
reputation / institutions / opportunities
        ↓
MAKE A MOVE
        ↓
SOMETHING GOES RIGHT, WRONG OR SIDEWAYS
        ↓
IMPROVISE
        ↓
GET IT / LOSE IT / CHANGE YOUR MIND /
CREATE AN EVEN BIGGER MESS
        ↓
YOUR LIFE CHANGES
        ↓
WANT SOMETHING ELSE
```

**That sounds like a game.**

And suddenly almost all of the architecture we've already designed has a purpose.

The affordance graph isn't just a passive progression system.

It becomes the player's **toolbox**.

The relationship simulation becomes something the player actively understands and works with.

The hidden situation network becomes a source of **opportunities, hazards and exploitable circumstances**.

Diegetic time creates real constraints.

Money matters because you can actually do things with it.

Social access matters because:

> *Hang on, I know somebody who can help with this.*

Knowledge matters because:

> *I know something these people don't.*

Reputation matters because:

> *They might actually listen to me now.*

That's RPG gameplay.

---

# Consider the difference

### Passive version

You discover that Maya's community venue may close.

You speak to her.

You choose whether to help.

The situation unfolds.

Perfectly respectable.

Also potentially boring.

### Active version

You've been trying to organise a gig because you want your friend's band to succeed and impress someone you're dating.

You need a venue.

Maya can get you the hall cheaply.

You convince her.

You've already promised the band a date.

Then the hall gets caught in some absurd lease dispute.

Now **you have a problem**.

You could:

- find another venue;
- persuade Maya to let you use it anyway;
- exploit some weird booking loophole;
- ask somebody you know at the council;
- move the event into a pub;
- cancel and disappoint everyone;
- turn the lease dispute itself into a fundraiser;
- use your new wealthy acquaintance's ridiculous house;
- lie to the band and hope it gets resolved;
- abandon the entire thing.

And meanwhile different characters have their own interests.

Now the hall story isn't **content delivered to the player**.

It is:

> **Britain getting in the way of something I was trying to do.**

Much better.

---

# This also fixes the satire

There's another problem with the previous loop.

If the player mostly observes absurd Britain, the joke becomes:

> Look how ridiculous this institution/person/situation is.

That's satire as sightseeing.

But if the player has a goal:

> **I just need the council to approve one completely reasonable thing.**

And then they personally encounter the machinery...

the satire becomes **playable**.

Even better, eventually the player can learn how the machinery works and start **using its absurdity themselves**.

For example:

> The form technically says X.

> That committee only has authority over Y.

> Sophie knows the person who actually makes the decision.

> The public consultation closes Friday, but amendments are allowed until Monday for some inexplicable reason.

Now the player thinks:

> *Oh, I can work with this.*

That is much closer to the satisfaction of learning enemy behaviour in an RPG.

---

# And the player needs permission to be a bit of a bastard

I think this is another missing ingredient.

Our design language has gradually become very concerned with:

- meaningful relationships;
- coherent consequences;
- empathy;
- social realism;
- narrative quality.

All good.

But games also need **mischief**.

The player should be able to be:

- selfish;
- ambitious;
- horny;
- petty;
- opportunistic;
- dishonest;
- generous;
- absurdly loyal;
- cowardly;
- status-seeking;
- reckless;
- manipulative;
- genuinely heroic;
- spectacularly stupid.

Not through a:

> GOOD / EVIL

system.

Just because these are plausible ways people pursue things.

If I can only responsibly navigate other people's problems, I am a social worker.

If I can **cause problems**, exploit opportunities, accidentally create scandals, put the wrong people together, lie badly, spend money foolishly, make ambitious plans and then desperately try to rescue them—

now there's entertainment.

---

# The comedy should often come from **my plan colliding with reality**

This may be the actual comedic engine we've been missing.

Something like:

```text
PLAYER INTENTION
"I'll have a nice simple first date."
        ↓
BRITISH REALITY
train cancellation
        ↓
PLAYER ADAPTS
meet locally instead
        ↓
SOCIAL COMPLICATION
ex-partner works there
        ↓
PLAYER ADAPTS
different pub
        ↓
WORLD COMPLICATION
pub has accidentally become
local election campaign HQ
        ↓
CHARACTER REACTION
date is extremely interested
        ↓
PLAYER REALISES
this is somehow going better
```

The systems don't need to constantly sabotage the player.

Sometimes the plan works beautifully.

Sometimes it works **better than intended**.

Sometimes the game produces:

> "I cannot believe that actually worked."

That emotion is enormously valuable.

---

# So there should be three things at the heart of play

## 1. **Desire**

The player wants something.

Not necessarily an official quest.

They demonstrate it through behaviour.

Romance someone. Improve their home. Make money. Join a scene. Help a friend. Become important. Build something. Get revenge. Escape a job. Have a good weekend.

## 2. **Plans**

The player has actual methods available for pursuing it.

This is where the affordance system becomes gameplay.

> Who do I know?  
> Where can I go?  
> What can I afford?  
> What do I know?  
> What am I willing to promise?  
> What can I get away with?

## 3. **Resistance**

The world doesn't simply hand over the result.

Resistance can come from:

- other people's desires;
- money;
- institutions;
- social norms;
- scheduling;
- incomplete information;
- reputation;
- physical access;
- bad luck;
- competing commitments;
- changing circumstances;
- the consequences of previous decisions.

Then the player adapts.

That **adaptation** is where play happens.

---

# This changes my view of scenarios too

A good Managed Decline scenario shouldn't primarily ask:

> **What interesting thing happens to the player?**

It should often ask:

> **What does this situation do to something the player is already trying to accomplish?**

That's a much stronger design principle.

Some scenarios absolutely should arrive uninvited—a redundancy, an election, a family crisis, Tabitha's signature storyline.

But even those become compelling when they collide with existing desires.

Tabitha is far more interesting if:

> you're already dating her;

or:

> you're trying to get into an organisation involved in the controversy;

or:

> somebody whose cooperation you desperately need hates her;

or:

> you've been trying to keep your public reputation clean;

rather than simply:

> **TABITHA STORY HAS STARTED.**

That's consistent with the architecture we've built, but we haven't put it at the **centre of the game loop**.

---

# The strongest possible core fantasy may therefore be

Not:

> **Live through contemporary Britain.**

Too passive.

Not:

> **Read society.**

Interesting skill, weak fantasy.

Not even:

> **Build a life.**

A little bland.

Something closer to:

> **Try to make a life for yourself in contemporary Britain, using whatever opportunities, relationships and ridiculous systems you can get your hands on.**

That contains ambition, comedy, experimentation and danger.

And "a life" is deliberately open.

One player might become rich.

Another might have a strange creative career and twenty friends.

Another might become deeply embedded in local politics.

Another might mostly pursue women and make catastrophic decisions.

Another might start businesses.

Another might become somebody's extraordinarily dependable partner.

Another could achieve very little materially but have an incredible social world.

That is much closer to what I think Managed Decline wants to be.

---

## And I think we have found a genuine design problem

This isn't just "it needs more polish."

We had unconsciously designed a sophisticated **world that can tell stories**.

We hadn't yet found the equally strong answer to:

> **Why is it fun to be the player inside it?**

I think the answer is likely **player-initiated ambition + planning + improvisation**, not merely better dialogue or more scenarios.

So I would **not build the previously described core prototype yet**. I would first redesign the core around:

> **want → plan → attempt → complication/opportunity → improvise → consequence → expanded/changed life**

and then ask a much harder question:

> **What concrete controls and mechanics let the player make plans rather than merely select responses?**

That is probably where the actual game is hiding.

## User

Agreed. But how do we take apart this design problem and find genuinely top tier solutions for it?

## Assistant

Yes. We should treat this as a **core-experience R&D problem**, not as ordinary feature design.

The central problem is now much clearer:

> **How do we make pursuing a life in Managed Decline intrinsically enjoyable as play—giving the player enough agency to formulate plans, exploit knowledge and improvise—without turning human relationships and contemporary Britain into a quest checklist, spreadsheet or abstract strategy game?**

That contradiction is the design problem.

## 1. Decompose "fun" before designing mechanics

I'd separate the core experience into seven questions.

| Design problem | What we need to discover |
|---|---|
| **Desire** | What makes the player spontaneously want something rather than wait for content? |
| **Planning** | How does the player form an actual plan instead of selecting from prewritten branches? |
| **Leverage** | What pieces of the world can the player deliberately use? People, knowledge, money, access, reputation, timing, institutions? |
| **Resistance** | What stops plans being automatic without simply throwing arbitrary obstacles at the player? |
| **Improvisation** | When things change, does the player get to invent a response? |
| **Payoff** | What makes success, partial success and disaster satisfying? |
| **Mastery** | What does an experienced player understand or do better than a beginner? |

We should solve these separately and then recombine them.

This prevents us from saying something vague like:

> "We need more agency."

Agency could mean ten completely different mechanics.

---

# 2. Establish the target emotional experience

Before asking *how*, define what a good 20 minutes should feel like.

For Managed Decline I think the benchmark experience is something like:

```text
I decide I want something.

I have an idea.

I realise I know someone / something that could help.

I try it.

The world reacts in a way that makes sense,
but not exactly as I expected.

Something changes.

I have to think again.

I come up with another idea.

It works, fails hilariously, or produces
something better/worse than I intended.

Later, something remembers what I did.
```

The crucial emotional moments are:

> **"I've got an idea."**

> **"Wait—I can use that."**

> **"Oh shit."**

> **"I can't believe that worked."**

> **"That's because of what I did earlier."**

If our mechanics do not regularly generate those feelings, they're probably not the answer.

That gives us a much sharper target than "interesting social simulation."

---

# 3. Study games by the problem they solve, not by genre

We should not ask:

> "What other British social RPGs exist?"

There probably aren't useful equivalents.

Instead, steal **design knowledge** from games solving individual pieces of our problem.

| Game/system family | What to study |
|---|---|
| **Hitman** | How players formulate plans from visible opportunities and then improvise when they go wrong |
| **Dishonored / immersive sims** | Small vocabulary + systemic affordances = many player-created solutions |
| **Crusader Kings** | Humans, relationships, information and status functioning as strategic resources while still producing stories |
| **The Sims** | How an environment communicates what can be done without requiring quests |
| **Streets of Rogue** | Multiple ridiculous solutions to ordinary objectives |
| **Zelda: BotW/TotK** | The satisfaction of recognising that existing tools can be recombined |
| **Disco Elysium** | Player expression and social interaction without reducing everything to conventional combat |
| **Papers, Please** | Turning institutional rules themselves into gameplay |
| **Persona** | Social commitment and time pressure—while specifically identifying the optimisation behaviours Managed Decline should *avoid* |
| **King of Dragon Pass / similar systemic narrative games** | Decisions generating history rather than isolated branching scenes |

We would perform **mechanical teardowns**, not reviews.

For Hitman, for example:

```text
How does the player discover possibilities?

How much does the game tell them?

What can be combined?

What makes knowledge from an earlier run valuable?

How does failure turn into improvisation?

Why does using a ridiculous solution feel like
the player's idea rather than the designer's?
```

Then translate the underlying mechanism into Managed Decline rather than importing disguises and assassinations.

---

# 4. Generate genuinely competing designs

This is important.

We should **not immediately converge on one system**.

I'd deliberately design several incompatible interpretations of how Managed Decline could work.

### Hypothesis A — Social immersive sim

The world exposes a rich set of contextual affordances.

The player thinks:

```text
Need venue
→ know pub owner
→ know Maya
→ know community hall
→ could ask Sophie
→ could hold it illegally somewhere
```

Gameplay is discovering combinations.

### Hypothesis B — Scheme construction

The player can more consciously assemble intentions:

```text
GOAL
Get into private launch

Possible route:
Tabitha
    ↓
knows Maya
    ↓
Maya works with organiser
    ↓
get introduced
```

The game provides an expressive but diegetic planning interface.

### Hypothesis C — Project-driven life

The strongest gameplay arises when the player undertakes things:

```text
start band
organise event
move house
pursue person
launch business
run campaign
plan trip
help friend
```

Projects naturally create problems requiring people, money, knowledge and coordination.

### Hypothesis D — Opportunistic sandbox

The player rarely declares goals.

Instead they continually notice openings:

> Cheap empty shop.

> Friend desperately needs work.

> Council grant announced.

> Someone has an alcohol licence.

The game is about recognising possibilities and deciding whether to exploit them.

### Hypothesis E — Hybrid intention system

The player establishes a **direction** but not a quest chain:

> "I want to get closer to Tabitha."

Then the world provides no prescribed solution.

The player still has to work out *how*.

My suspicion is that the eventual answer will contain pieces of C, D and E, with immersive-sim principles from A.

But we should earn that conclusion through testing.

---

# 5. Use the same scenarios as benchmark tests

This is how we avoid fooling ourselves.

Every candidate mechanic should be tested against the **same small suite of situations**.

For example:

| Test | What it stresses |
|---|---|
| Get a date with someone difficult | relationships, information, self-expression |
| Get into an event you weren't invited to | access, social leverage, improvisation |
| Organise a gig | coordination, money, places, commitments |
| Help a friend with an institutional problem | knowledge, bureaucracy, favours |
| Avoid work without seriously damaging your job | timing, deception, relationships |
| Make legitimate money from an opportunity | information and risk |
| Bring two social groups together | social-system interaction |
| Recover after a plan goes badly wrong | improvisation and consequence |

If one design only works for romance, it's not our core system.

If it works across all seven, we've probably discovered something powerful.

---

# 6. Strip the prototype brutally

We should **not initially prototype Managed Decline itself**.

No beautiful dioramas.

No LLM dialogue.

No elaborate narrative director.

No hundred NPCs.

Build the equivalent of a board game or ugly text prototype containing perhaps:

```text
6 people
5 places
3 days
some relationships
some knowledge
some obligations
some money
several useful affordances
one changing external situation
```

Then give the player a desire:

> Get your friend's band onto Friday's event.

And see whether actual play produces:

> "Could I ask X?"

> "What if I move it to Y?"

> "Hang on, didn't Chloe say she knows the organiser?"

> "Can I lie about that?"

If players instead repeatedly ask:

> "What am I supposed to click?"

the design is failing.

---

# 7. The most important prototype test

I would make this almost sacred:

> **Can the player formulate a possible solution before the game offers them one?**

That is the distinction between **planning** and **branch selection**.

Bad:

```text
How will you get inside?

A. Ask Sophie
B. Bribe guard
C. Sneak through kitchen
```

The designer had all the ideas.

The player merely selects one.

Much stronger:

```text
I need to get inside.

What resources do I have?
Who do I know?
What can I try?
```

Then the player thinks of Sophie.

The game recognises that this is plausible.

That feeling—

> **"That was my idea."**

—is probably central to making Managed Decline top-tier.

---

# 8. Test for emergence, not just successful completion

After every session, the interesting questions aren't:

> Did you complete the objective?

They're more diagnostic:

| Question | Good sign |
|---|---|
| Did you have a plan that the game didn't explicitly suggest? | Yes |
| Did something force you to revise it? | Yes |
| Did you exploit knowledge gained earlier? | Yes |
| Did you use a person/place for a purpose it wasn't introduced for? | Yes |
| Did your mistake create interesting new gameplay? | Yes |
| Did another player solve the same problem differently? | Yes |
| Could you explain why the world reacted as it did? | Mostly |
| Did anything surprise you without seeming random? | Yes |
| Did you feel clever? | Sometimes |
| Did you laugh because of *your own actions*? | Often |

That last one matters enormously.

Authored jokes are good.

But:

> **"I caused something ridiculous and the game understood what I'd done."**

is a much stronger form of interactive comedy.

---

# 9. Perform a "boringness audit"

We should aggressively identify behaviours where the player is not actually playing.

Every interaction can be classified:

```text
DECIDING
DISCOVERING
PLANNING
EXECUTING
OBSERVING CONSEQUENCE
WAITING
NAVIGATING
READING EXPOSITION
REPEATING
```

The first five can be valuable.

The last four need justification.

If a prototype session turns into:

```text
3 minutes deciding
17 minutes reading
8 minutes walking
4 minutes clicking obvious options
```

then the core loop is not carrying itself.

This will be particularly important for Managed Decline because the quality of the characters and writing could **hide bad gameplay for a surprisingly long time**.

---

# 10. Separate the "toy" from the "story machine"

This may be the most useful conceptual separation.

We already have a sophisticated **story machine**:

```text
situations
characters
memory
relationships
narrative attention
scenario contracts
world state
affordance progression
```

Now we need to design the **toy** sitting inside it.

The toy is:

> **What can I manipulate, combine, experiment with and become skilful at?**

Hitman's story could disappear and its toy would still work.

Mario's levels could be grey boxes and jumping would still work.

Managed Decline needs something analogous.

Not necessarily mechanically twitchy.

But it must remain enjoyable with placeholder dialogue.

My current strongest candidate is:

> **A social/life planning toy in which people, knowledge, access, money, time and institutions form a combinatorial set of affordances that the player learns to use to pursue self-directed intentions.**

That is much closer to something we can actually prototype.

---

# 11. There is a particularly important tension to solve

A top-tier solution has to sit exactly between two bad extremes.

### Too authored

```text
PLAYER GOAL
↓
designer supplies three clever solutions
↓
player selects one
```

That's a branching VN.

### Too systemic

```text
100 NPC variables
43 resources
social influence score
weekly optimisation
spreadsheet planning
```

That's a management sim.

Managed Decline needs:

```text
RICH WORLD
+
SMALL HUMAN-READABLE ACTION VOCABULARY
+
LOTS OF CONTEXTUAL COMBINATIONS
+
NATURAL FEEDBACK
```

The phrase I would keep coming back to is:

> **Low mechanical vocabulary, high combinatorial expressiveness.**

That is how many excellent games obtain depth without cognitive overload.

---

# 12. Then we can attack the problem scientifically

I would run the design investigation in roughly this sequence:

```text
DEFINE CORE EXPERIENCE
        ↓
DECOMPOSE INTO SUBPROBLEMS
        ↓
TEARDOWN BEST-IN-CLASS GAMES
FOR EACH SUBPROBLEM
        ↓
CREATE 4–5 COMPETING LOOP MODELS
        ↓
RUN THEM AGAINST THE SAME
SCENARIO BENCHMARKS
        ↓
PAPER/TEXT PROTOTYPES
        ↓
KILL WEAK MODELS
        ↓
HYBRIDISE THE STRONG MECHANISMS
        ↓
BUILD A SMALL INTERACTIVE PROTOTYPE
        ↓
TEST FOR PLAYER-GENERATED PLANS,
IMPROVISATION AND CAUSAL COMEDY
        ↓
ONLY THEN CONNECT IT TO
THE FULL MANAGED DECLINE ARCHITECTURE
```

I would **not make the next conversation "let's design the final core loop."**

The better next task is:

> **Construct the core-play research programme, identify the exact subproblems, choose the best games/systems to tear down for each one, and create 4–5 genuinely different candidate gameplay models for Managed Decline.**

Then we can be ruthless about them.

That gives us a credible path to something exceptional rather than merely settling for the first design that sounds coherent.

## User

do it

## Assistant

# Core-play R&D result

## Executive conclusion

The strongest candidate is **not** a branching VN with more choices, a life-management spreadsheet, or a visible “scheme builder.”

The best hypothesis is:

> **Managed Decline should be a social immersive sim about pursuing self-chosen intentions through people, knowledge, access, money, places, timing and institutions—then living through the event and fallout those efforts create.**

I would provisionally call the player-facing system **Life Schemes** and the reusable underlying rules **Social Chemistry**.

Its defining promise should be:

> **The player repeatedly has an idea the game did not explicitly offer, attempts it through a small and consistent action vocabulary, and receives a coherent—but not completely predictable—result that becomes part of their life.**

The full loop is:

```text
DESIRE
    ↓
ADOPT A PURSUIT
    ↓
REMEMBER OR DISCOVER USEFUL HANDLES
people / facts / access / places / money / timing
    ↓
MAKE A CONCRETE MOVE
    ↓
INCUR A COMMITMENT OR RISK
    ↓
THE WORLD AND OTHER PEOPLE RESPOND
    ↓
IMPROVISE
    ↓
LIVE THROUGH A CONVERGENCE EVENT
    ↓
PERSISTENT FALLOUT AND NEW AFFORDANCES
    ↓
NEW DESIRE
```

The major addition is the **convergence event**: the gig, date, party, hearing, campaign launch, family lunch, wedding, protest, trip, business opening or public disaster that the player has been preparing for and now physically experiences.

Without that phase, the game risks becoming a sequence of abstract social transactions. With it, player planning has anticipation, execution, spectacle and payoff.

This is the strongest design hypothesis. It is not yet proof of fun. The proposed prototype programme below is designed to kill it quickly if it does not produce genuine player-authored plans.

---

# 1. Why the existing design sounded boring

Managed Decline already has several excellent systems:

- a shared hidden situation network that creates coherent world events;
- characters with partial knowledge, goals and relationships;
- a narrative-attention layer that regulates what reaches the foreground;
- elastic time that skips routine and pauses for meaningful intervention;
- scenario contracts with persistent consequences;
- affordance progression through people, places, activities and social access;
- a diegetic phone joining the physical and networked worlds.

Those systems collectively answer:

> **How can the world generate coherent stories around the player?**

They do not yet fully answer:

> **What is intrinsically enjoyable about operating inside that world?**

The previous loop placed the player in a largely receptive role:

```text
notice something
→ decide whether to engage
→ choose a response
→ receive consequences
```

That creates narrative agency, but it does not automatically create **ludic agency**. The player may be deciding what a story means without inventing a method, testing a hypothesis or mastering a reusable system.

Three ingredients were underpowered:

### Player-authored desire

The player needs to want something before the game supplies a problem.

### Player-authored method

The player needs to decide *how* to pursue it, rather than choose among three complete designer-authored routes.

### Anticipated embodied payoff

The result should often culminate in something the player physically attends or sees happen, rather than only changing invisible relationships or triggering messages.

Those three additions turn the existing story machine into a game.

---

# 2. What “top-tier” means for this particular game

A top-tier Managed Decline loop needs to satisfy seven standards.

## 2.1 The idea must feel like the player’s

The player should be able to formulate a possible action before the game displays a complete solution.

The critical feeling is:

> “Wait. Maya knows the person who runs that place. Could I ask her?”

Not:

> “Option B says Ask Maya.”

## 2.2 The world must obey a stable grammar

People, places, information, institutions and possessions need predictable kinds of usefulness.

The player should gradually learn:

- who can introduce or vouch for them;
- what kinds of spaces can host activities;
- which facts persuade, embarrass or expose;
- what an institution recognises as valid;
- which communication channel actually reaches someone;
- what promises and public actions will cost later.

Nintendo described *Tears of the Kingdom* in terms of multiplying a small set of player abilities across a rich and consistently interactive world. Its developers also emphasised enabling actions players reasonably believe should work, while clearly and consistently signalling the exceptions. That is the correct design standard for a social rather than physical system.

## 2.3 Resistance must arise from reality, not from a complication generator

Plans should encounter resistance because:

- another character wants something incompatible;
- access is socially restricted;
- time is limited;
- money is inadequate;
- someone knows less or more than the player assumed;
- the institution requires the wrong evidence;
- an existing world situation changes conditions;
- the player made a promise or told a lie.

The game should not secretly decide that every plan needs two twists.

Sometimes a sensible plan should simply work.

## 2.4 Failure must preserve play

A failed approach should usually produce:

- a reason;
- a counteroffer;
- a changed relationship;
- a new fact;
- a narrower deadline;
- an alternative opening;
- or an interesting mess.

A bare **NO** is rarely sufficient.

## 2.5 Success must be lived, not merely reported

The player should attend the event they arranged, enter the place they gained access to, meet the people they introduced, inhabit the home they acquired, or see the institution respond.

This is where the diorama world stops being scenic connective tissue and becomes an actual **social play space**.

## 2.6 Mastery must be real but non-numerical

An experienced player should become better at:

- remembering social connections;
- reading indirect evidence;
- choosing when to ask;
- recognising what different institutions respond to;
- offering something another person genuinely wants;
- anticipating commitment collisions;
- distinguishing a public claim from practical reality;
- recovering after overpromising.

The player improves, not because a persuasion statistic rises, but because they understand the society.

## 2.7 The system must support autonomy, competence and relatedness together

Research on player motivation consistently associates videogame engagement with autonomy, competence and relatedness. Managed Decline has a particular opportunity to combine all three: the player chooses what matters, becomes skilled at pursuing it, and does so through relationships that retain emotional meaning.

---

# 3. Best-in-class mechanical teardowns

The useful comparisons are not games that look superficially like Managed Decline. They are games solving one component of the problem exceptionally well.

| Reference | Mechanism worth extracting | Translation for Managed Decline | What not to copy |
|---|---|---|---|
| **Hitman** | Opportunity-rich levels let players discover methods, improvise after disruption and develop knowledge across attempts. IO found that such freedom still required optional guidance to teach players how to read the sandbox. | Treat important social events as nonviolent sandbox levels. Provide an optional assisted route early, then let the player operate independently. | Mission markers that reveal every clever method; giant handcrafted levels that cannot be reused. |
| **Tears of the Kingdom** | A small, consistent ability set multiplies across a world designed to support player hypotheses and self-authored solutions. | Use a small social/practical verb set across people, places, facts and institutions. Support actions that seem naturally plausible. | Pretending every object or person supports unlimited interaction. The ontology must remain bounded. |
| **Outer Wilds** | Concrete mysteries and diegetic information motivate exploration without conventional mission lists. | Let curiosity produce some pursuits: finding out why someone vanished, what an institution is hiding or how an inaccessible place works. | Depending on curiosity as the only appetite. Managed Decline also needs romance, ambition, money, mischief, belonging and creation. |
| **Papers, Please** | The tactile act of handling documents was pleasurable before the surrounding moral narrative was complete; interface friction carried thematic meaning. | The basic act of making a move—calling, arranging, offering, producing evidence, navigating a channel—must feel satisfying even with placeholder dialogue. | Tedious friction that only illustrates bureaucracy without giving the player reasoning or leverage. |
| **Comme il Faut / Versu / social-practice research** | Reusable social norms and interaction practices allow many social circumstances without separately scripting every branch. | Model requests, invitations, introductions, disclosures, promises and refusals as reusable practices interpreted through goals, knowledge and relationships. | Exposing raw social scores or asking a generator to improvise all dialogue and facts. |
| **Crusader Kings, Nemesis and Wildermyth** | Persistent procedural relationships and remembered exceptional events make players tell personalised stories. | Let schemes leave memories, access changes, resentment, loyalty, jokes, evidence and altered routines. | Treating characters as disposable strategic modifiers or allowing generated events to violate established identity. |
| **Failbetter’s storylet systems** | Authored material can be conditionally unlocked from qualities and world state, balancing branching narrative with persistent simulation. | Use storylets to realise reactions, confrontations, aftermaths and signature scenes once live state makes them relevant. | Mistaking the storylet deck for the core toy. Choosing among content cards is not sufficient. |
| **The Last Clockwinder** | Its developers found that excessive planning could feel like work and redesigned around enjoyable execution. | Keep the planner lightweight. The player should spend more time acting and experiencing consequences than maintaining a plan graph. | A powerful but laborious scheme interface that becomes the whole game. |

The synthesis is an inference from these systems, not something any one of them proves:

> **Managed Decline should combine immersive-sim consistency, social-practice rules, curiosity, persistent character memory and authored convergence scenes—but should not copy their genres or interfaces.**

---

# 4. The exact subproblems

These should be treated as separate research questions rather than one vague “agency” problem.

| Subproblem | Required design answer | Prototype question |
|---|---|---|
| **Desire ignition** | The player can notice, adopt or create a pursuit without receiving a formal quest. | Does the player start wanting something, or merely respond to requests? |
| **Pursuit representation** | The game remembers what the player appears to be attempting without declaring their motives as fact. | Can the player distinguish a casual interest from a real commitment? |
| **Affordance legibility** | Known people, places and facts communicate their plausible uses without listing complete solutions. | Can the player think of a method before seeing it prescribed? |
| **Plan expression** | The player can make a specific move through a compact interface rather than free text or giant option lists. | Does expressing a plan feel natural rather than like querying a database? |
| **Social naturalism** | Relationships influence actions but are not currencies that can be spent. | Do testers remember characters as people or as “introduction bonuses”? |
| **Resistance** | Obstacles arise from existing goals, rules, schedules and situations. | Can the player explain why something was difficult? |
| **Improvisation** | A changed circumstance leaves room for another meaningful move. | When a plan breaks, does the player immediately form a new idea? |
| **Payoff** | Preparation converges in a lived event or visible world change. | Is there something the player is looking forward to experiencing? |
| **Causal feedback** | Immediate and delayed responses make consequences readable without exposing hidden machinery. | Can the player connect later outcomes to earlier actions? |
| **Mastery** | Players learn social and institutional patterns that remain broadly useful. | Does knowledge transfer between scenarios? |
| **Onboarding** | Early guided examples teach the grammar without becoming permanent quest rails. | Can help be removed without players becoming helpless? |
| **Authoring scalability** | A small ontology supports many contexts, with authored material focused on distinctive scenes and voices. | Does adding a new venue or character multiply play, or only add bespoke content? |
| **Attention control** | Only a small working set of pursuits and commitments demand foreground attention. | Does the player feel purposefully busy rather than administratively overloaded? |
| **Pleasure density** | Reading, navigation and plan maintenance do not dominate actual decision-making. | Does the grey-box remain enjoyable when jokes and artwork are removed? |

Any proposed core system that solves only desire and planning but fails social naturalism is wrong for Managed Decline.

Any system that preserves naturalism but offers no plan expression will remain passive.

---

# 5. Five genuinely competing gameplay models

## Model A — Pure contextual social immersive sim

### Experience

The player directly approaches people, places and interfaces and chooses contextual actions:

```text
Talk to Maya
Call Sophie
Visit hall
Read notice
Ask Raj
Post photograph
```

No explicit goals or planner exist. The player holds their intentions mentally.

### Strengths

- highly diegetic;
- low administrative burden;
- excellent potential for “I wonder whether this works” experimentation;
- actions feel grounded in the world;
- closest equivalent to an immersive sim.

### Fatal risk

The player may not remember enough facts or understand the action space. Longer plans become cognitively expensive. It may feel like walking around hoping the correct option appears.

### Verdict

**Necessary foundation, insufficient by itself.**

---

## Model B — Explicit scheme canvas

### Experience

The player declares an objective and constructs a route:

```text
OBJECTIVE: Get into launch
TARGET: Sophie
METHOD: Ask for introduction
LEVERAGE: Covered her shift
TIMING: Before Thursday
COVER STORY: Interested in venue
```

### Strengths

- clearly supports player planning;
- makes dependencies and risks visible;
- easy to debug;
- creates strong ownership over a proposed method;
- can support complicated, multi-stage intentions.

### Fatal risk

It turns living into administration. People become nodes, facts become cards and relationships become currencies. The player may spend more time arranging arrows than inhabiting Britain.

It also risks solving the plan for the player by displaying every valid connection.

### Verdict

**Useful as an experimental extreme and developer tool. Wrong as the primary player experience.**

---

## Model C — Project-driven life

### Experience

The player takes on concrete projects:

- organise a gig;
- move house;
- start a small business;
- arrange a trip;
- pursue a romance;
- run a campaign;
- help someone launch something;
- host a party;
- make a film or recording;
- repair or transform a place.

Each project has open requirements rather than a prescribed quest chain.

### Strengths

- creates immediate desire and anticipation;
- naturally requires people, places, money, information and scheduling;
- produces visible outcomes;
- gives the game coherent medium-term arcs;
- makes the player an initiator.

### Fatal risk

Everything can start resembling crafting:

```text
venue acquired
musician acquired
permit acquired
event complete
```

Spontaneous life and personal relationships may become subordinate to project fulfilment.

### Verdict

**Strong appetitive engine, but it needs a more organic action system and non-project life around it.**

---

## Model D — Opportunity chaining

### Experience

The world continually exposes openings:

- an empty shop;
- a newly announced grant;
- somebody needing work;
- a friend with an unused room;
- an event with a cancelled performer;
- an institution making a procedural mistake;
- a person temporarily in town;
- information another actor does not have.

The player decides whether to combine them.

### Strengths

- high surprise and replayability;
- strong comedic potential;
- encourages opportunism and experimentation;
- makes the changing world mechanically relevant;
- integrates naturally with the hidden situation network.

### Fatal risk

The player may still be reacting to a content buffet rather than pursuing an intention. It can become:

> “Which opportunity card do I consume today?”

### Verdict

**Excellent source of handles and turns; weak as the sole motivational engine.**

---

## Model E — Convergence-event social sandboxes

### Experience

Preparation leads to a spatially and socially simulated event:

- a party;
- date;
- gig;
- hearing;
- wedding;
- demonstration;
- launch;
- dinner;
- election night;
- group holiday;
- workplace function.

Characters attend according to prior events. They have goals, conversations, knowledge, arrival times and reasons to leave. The player moves around, listens, introduces people, interrupts, redirects, reveals information, performs, calls people aside or changes the plan.

### Strengths

- provides a strong moment-to-moment play phase;
- uses the diorama as more than navigation;
- gives preparation an anticipated payoff;
- creates social improvisation and causal comedy;
- allows iconic authored scenes to coexist with systemic variation;
- naturally brings different social worlds into collision.

### Fatal risk

These events are more expensive to author and simulate. If every interesting outcome requires one, production scope becomes unsustainable. Ordinary life between them must remain enjoyable.

### Verdict

**Potentially the missing experiential centre, but it must be supported by cheaper connective play.**

---

## Comparative assessment

| Model | Player-owned desire | Player-owned method | Improvisation | Naturalism | Legibility | Production risk |
|---|---|---|---|---|---|---|
| Contextual immersive sim | Moderate | Strong | Strong | Excellent | Weak–moderate | Moderate |
| Scheme canvas | Strong | Excellent | Moderate | Weak | Excellent | High UI/system risk |
| Project-driven life | Excellent | Moderate–strong | Moderate | Strong if carefully written | Strong | Moderate |
| Opportunity chaining | Weak–moderate | Strong | Excellent | Strong | Moderate | Moderate |
| Convergence events | Strong after setup | Strong | Excellent | Excellent | Strong within event | High content cost |

No single model solves the game.

The recommended hybrid is:

> **Project- and desire-driven pursuits, executed through contextual immersive-sim actions, fed by changing opportunities, culminating periodically in social sandbox events—with only a lightweight factual planning surface.**

---

# 6. Recommended system: Life Schemes and Social Chemistry

## 6.1 The player-facing loop: Life Schemes

A **scheme** is not necessarily deception.

It is any self-directed effort to make something happen:

- become closer to someone;
- secure access to an event;
- organise a night;
- improve a living situation;
- make money;
- protect someone;
- expose someone;
- keep two people apart;
- get out of an obligation;
- start a project;
- enter a social circle;
- repair a relationship;
- exploit an institutional opening.

The game should not explicitly label every one of these a scheme. That is internal design language.

---

## 6.2 Pursuits: what the player appears to want

The system should distinguish:

```text
TENTATIVE INTEREST
The player investigated or tried something once.

ADOPTED PURSUIT
The player has repeatedly acted toward an outcome.

COMMITTED PURSUIT
The player has made promises, spent money,
accepted risk or publicly identified with it.
```

This matters because **interest is not commitment**.

The game should infer tentative interests cautiously. It can then confirm them diegetically:

> “I really am trying to get this gig together.”

Possible responses:

- “Yes. I want this to happen.”
- “I’m only helping Theo a little.”
- “Actually, this is becoming a terrible idea.”

That avoids a conventional goal-selection menu while still letting the player define intent.

The existing narrative-attention design already supports inferred pursuits as tentative evidence rather than objective truth. The new system would give those pursuits a direct gameplay function.

---

## 6.3 Handles: the parts of life a player can use

A **handle** is a known fact or relationship that could support an action.

It is not a collectible resource.

| Handle type | Examples of use |
|---|---|
| **Person** | introduction, vouching, information, companionship, access, practical help |
| **Relationship** | trust, obligation, affection, shared history, fear of disappointing someone |
| **Knowledge** | evidence, warning, procedural rule, secret, preference, schedule |
| **Place** | meeting, hosting, performing, hiding, working, reaching a service |
| **Role/status** | authority, credibility, membership, institutional access |
| **Money/property** | paying, renting, compensating, lending, buying, underwriting |
| **Communication channel** | private message, public post, formal email, physical visit, group chat |
| **Timing** | acting before an announcement, waiting for someone, exploiting a collision |
| **Commitment** | calling in a real favour, offering reciprocity, using a promise as reassurance |

The player must not see:

```text
Maya:
Venue Access +3
Persuasion Support +2
```

They should know:

> Maya volunteers at the hall.  
> Maya wants more people to care about the place.  
> Maya is worried about being blamed for damage.

That is enough to reason with.

Using Maya instrumentally is itself a social act. If the player repeatedly contacts her only when they want access, she can notice.

---

## 6.4 A small universal move vocabulary

The game needs a compact set of verbs that work across many contexts.

| Move family | Uses |
|---|---|
| **Ask** | information, permission, help, introduction, explanation |
| **Offer** | time, money, help, access, reciprocity, secrecy |
| **Promise** | attendance, work, repayment, discretion, future support |
| **Invite** | person to place, group, event or activity |
| **Introduce** | connect two people or groups |
| **Arrange** | booking, meeting, transport, schedule, service |
| **Attend** | be present, accompany, witness, support |
| **Investigate** | inspect, research, ask around, compare accounts |
| **Disclose** | tell privately, announce publicly, show evidence |
| **Conceal** | omit, lie, delete, keep people apart |
| **Endorse** | vouch, recommend, publicly associate |
| **Apply / complain** | engage formal procedure |
| **Spend / lend** | use money or property |
| **Withdraw** | decline, cancel, leave, stop helping |
| **Perform / create** | play, speak, present, photograph, host, produce |

The verbs are not dialogue options by themselves. They combine with live topics and entities.

A move can be represented internally as:

```yaml
move:
  verb: ask
  target: maya
  proposition: use_community_hall_on_friday

  support:
    offer: player_handles_setup_and_cleanup

  disclosure:
    motive: help_theo_band
    honesty: full

  timing:
    now: wednesday_evening
```

The player-facing experience should usually be much simpler:

```text
Maya
→ Ask about the hall
→ Could Theo's band use it Friday?
→ I'll handle setup and cleanup
```

The player supplied the route by deciding to contact Maya. The game supplied the grammatical realisation.

A less common **Talk about something else…** interaction can expose the full composition system when the desired topic is not immediately contextual.

---

## 6.5 Direct action first; planner second

The default should be:

> See or remember something → act directly.

The planning surface should exist mainly to reduce memory burden.

The accepted phone design is ideal for this because it already combines contacts, messages, information, calendar and saved places while remaining part of the fiction.

A lightweight phone page might be called:

> **On my mind**

Example:

```text
FRIDAY GIG

I told Theo I'd find out by Thursday night.

I know:
• Maya volunteers at the community hall.
• Raj said The Crown still has a music licence.
• Sophie knows the festival organiser.
• Theo's drummer works Friday evenings.

I've committed to:
• Give Theo an answer by Thursday.
```

It must not say:

```text
NEXT OBJECTIVE:
Ask Maya to book the hall.
```

It presents memory, not solution.

There should be no permanent network graph showing every person-to-person path. That would convert society into route planning.

---

## 6.6 Social Chemistry: how actions resolve

A social move should resolve in an ordered, inspectable way.

### First: feasibility

Can the target actually do what the player asks?

Maya cannot personally approve a council licence merely because she likes the player.

### Second: knowledge

Does the target understand the situation, and is the player revealing enough?

### Third: goals and pressures

Does the proposition help or threaten something the target cares about?

### Fourth: relationship and history

Trust, resentment, affection, obligation and previous conduct change interpretation.

### Fifth: social norms and audience

A private request, public request and request made in front of a boss are not equivalent.

### Sixth: offered commitment

What is the player promising, risking or contributing?

### Seventh: response

Responses should include more than success and failure:

```text
ACCEPT

ACCEPT WITH A CONDITION
"Only if you handle cleanup."

COUNTEROFFER
"Not Friday. Thursday after the radio show."

DEFER
"I need to ask Patel."

REFUSE WITH A REASON
"I can't risk losing the keys."

MISUNDERSTAND
Maya thinks this is a political fundraiser.

AGREE BUT PROVE UNRELIABLE
Theo says the drummer is sorted. He isn't.

ACCEPT, BUT CREATE ANOTHER SOCIAL CONSEQUENCE
Maya agrees and now assumes the player is committed to saving the hall.
```

The response should emerge from actual state rather than a universal persuasion roll.

There is no reason for every interaction to become a negotiation. Many ordinary requests should be accepted or declined immediately.

---

## 6.7 Commitments are the real cost system

Managed Decline does not need generic action points.

The strongest costs are:

- time promised;
- money spent;
- reputation attached;
- a lie told;
- a person inconvenienced;
- a favour accepted;
- confidentiality promised;
- attendance agreed;
- public identification with a cause;
- another opportunity forgone.

These are **concrete commitments**, not abstract energy.

They create resistance naturally:

> You can get the hall, but only by promising to run the event responsibly.

> You can convince Sophie to introduce you, but she will attend too.

> You can escape work, but Raj has to cover your shift.

> You can publish the evidence, but Tabitha will know where it came from.

The existing commitment-based time design is already compatible with this. Routine compresses; promises, appointments and collisions remain real.

---

## 6.8 World turns: the plan meets something outside the player

After a move, the world may continue normally or create a relevant turn.

Valid turns come from:

- another actor acting on their own goal;
- a hidden situation advancing;
- new public information;
- a scheduling conflict;
- a promise coming due;
- somebody misunderstanding or sharing information;
- an institutional response;
- a consequence of an earlier move.

Invalid turn:

> The game invents a random fire because the plan was progressing too smoothly.

Valid turn:

> The hall's existing inspection situation reaches the stage at which bookings are suspended.

The narrative system should choose **which true and relevant development deserves attention**, not manufacture opposition. That remains consistent with the accepted narrative-attention architecture.

---

## 6.9 Convergence events: the missing execution phase

This is the most important addition.

A substantial pursuit should often culminate in a **convergence event** where several prior choices become simultaneously relevant.

Examples:

- the gig actually happens;
- the player attends the private event;
- the first date occurs;
- both social groups arrive at the same party;
- the council hearing begins;
- the player moves into the new home;
- the business opens;
- the campaign holds its public launch;
- the family gathers for dinner;
- the planned weekend begins.

The event is a compact social immersive-sim level.

Characters have:

- reasons for attending;
- schedules or departure conditions;
- knowledge;
- people they want to approach or avoid;
- private goals;
- emotional state;
- possible reactions to prior preparation.

The player can:

- move between conversations;
- decide whom to greet first;
- listen;
- interrupt;
- introduce people;
- separate people;
- show or conceal information;
- make a call;
- change arrangements;
- publicly speak or perform;
- leave with someone;
- abandon their original purpose.

This makes spatial design relevant:

> Who is in the room?  
> Who can hear?  
> Who is alone?  
> Who has gone outside?  
> Who is about to leave?  
> Who has been unexpectedly invited?

The diorama now functions as a **social board**, not merely a corridor connecting dialogue scenes.

Hitman’s designers have explicitly discussed treating levels as social spaces. Managed Decline can translate that principle into nonviolent events where social position, observation and timing matter.

---

## 6.10 Residue: the real reward

After the convergence event, the game produces **residue**.

Possible residue includes:

- the gig becomes a recurring activity;
- Maya now trusts the player with the hall;
- Raj resents having covered the shift;
- two NPCs now know one another;
- someone believes a false version of what happened;
- a photo exists;
- the player is associated with the venue;
- a group chat has changed;
- a relationship has moved;
- an institution has a record of the player;
- a new social group is available;
- the player has learned how a procedure really works;
- an empty unit has become a persistent place;
- a promise remains unresolved.

This converts the result into future play.

The accepted affordance-progression design already establishes that scenarios should alter access to people, places, activities, services, routines and actions rather than merely dispensing rewards. Life Schemes gives the player an active reason to value that expanding graph.

---

# 7. Worked example: Friday Gig

## Initial desire

Theo complains that his band has been dropped from Friday's local event.

The player is interested because:

- they like Theo;
- they want to impress someone;
- they want something interesting to happen Friday;
- or they see an opening to become involved in the music scene.

The game does not immediately create:

> **Quest: Find Theo a venue.**

The player asks one or two questions and tells Theo:

> “Let me see what I can do.”

That commitment establishes an adopted pursuit.

---

## Known handles

The player's phone recalls established facts:

```text
Maya volunteers at the community hall.

Raj works at The Crown, which sometimes hosts music.

Sophie mentioned knowing Friday's event organiser.

The player's workplace has an unused function room.

Theo's drummer often works evenings.

The player has £140 available without affecting rent.
```

Not all handles will be relevant or usable.

---

## Route invented by Player A

Player A contacts Maya.

```text
Ask Maya
→ use hall Friday
→ offer to handle setup
```

Maya is interested because the hall needs public support, but she will only agree if the player accepts responsibility for cleanup and obtains Patel's approval.

The player now has a choice:

- approach Patel;
- ask Maya to do it;
- arrange a smaller acoustic event that avoids the restriction;
- use the hall unofficially;
- abandon the hall and pursue another place.

No menu needs to display all those routes at once.

---

## Route invented by Player B

Player B calls Sophie and asks for an introduction to the event organiser.

Sophie agrees, but assumes the player wants to attend with her.

The organiser offers the band an early outdoor slot, conditional on supplying its own equipment.

The player now needs transport and equipment, and may have accidentally created romantic expectations with Sophie.

---

## Route invented by Player C

Player C asks Raj whether The Crown can host.

The pub can, but its landlord refuses amplified music after a previous complaint.

The player remembers Theo can perform acoustically and proposes a stripped-down set.

This is less prestigious but requires almost no money.

---

## Route invented by Player D

Player D decides the cancelled performance itself is useful publicity.

They publicly post that the band has been “banned” and turn the hall event into a fundraiser.

This might work.

It might also cause:

- the original organiser to defend the cancellation publicly;
- Maya to feel exploited;
- Tabitha to amplify the story;
- local media to misunderstand;
- the council to inspect the hall;
- the event to become unexpectedly successful.

This route uses the same social and information systems. It is not a bespoke “chaos option.”

---

## World turn

The existing hall-inspection situation advances on Thursday. Bookings are formally suspended.

This is not the game arbitrarily blocking the best route. It was already true in the world.

Player A now improvises:

- challenge the suspension;
- move outdoors;
- use The Crown;
- turn the inspection into part of the fundraiser;
- ask Sophie for the original festival slot;
- cancel;
- hold a tiny illegal gathering;
- negotiate for Thursday instead.

---

## Convergence event

On Friday, whichever event exists becomes a playable social space.

Potential attending characters are determined by:

- who the player invited;
- what they publicly posted;
- promises made;
- relationship state;
- the current hall controversy;
- who believes what the event is for.

During the event:

- Theo is angry about the acoustic arrangement;
- Maya wants the player to mention the hall campaign;
- Sophie arrives believing this is partly a date;
- the inspector appears;
- Raj wants help because the bar is overwhelmed;
- someone uploads a misleading clip.

The player cannot satisfy everyone.

But they can move, speak, rearrange, perform, reveal and improvise.

---

## Fallout

The event may be artistically awful but socially successful.

Or technically successful but personally disastrous.

Or cancelled, with the attempted rescue becoming more important than the gig.

The resulting campaign might now contain:

- a recurring music group;
- a damaged romance;
- a strengthened friendship;
- access to the hall;
- a local reputation;
- an angry organiser;
- a viral video;
- a reason for the council situation to escalate.

The player has not merely consumed a gig scenario.

They have **made this particular gig exist**.

---

# 8. How authored scenarios fit this model

This model does not discard authored landmark content. It gives it a better role.

## Connective content

Connective content supplies:

- information;
- openings;
- requests;
- commitments;
- rumours;
- people;
- institutional changes;
- small reactions;
- new handles.

It is relatively systemic.

## Landmark content

Landmarks become:

- convergence events;
- major confrontations;
- iconic locations;
- public consequences;
- signature character episodes;
- large social collisions.

They retain their authored identity while their cast, information state, player role and consequences vary.

That directly supports the accepted distinction between landmark and connective content and the scenario identity-envelope design.

For example, Tabitha's signature scenario may always contain:

- the old programme;
- its complicated legitimate purpose;
- Tabitha's transformation into a public symbol;
- a recognisable confrontation;
- recurring visual and institutional motifs.

But the player may enter that confrontation as:

- her partner;
- an opportunistic organiser;
- an institutional contact;
- an outsider with evidence;
- a rival;
- somebody trying to suppress the entire affair because it threatens another pursuit.

That makes the landmark personal without proceduralising its best material away.

---

# 9. Onboarding without destroying discovery

Hitman’s development provides a useful warning: an open possibility space can be enjoyable but initially incomprehensible. Optional guided opportunities taught players how to read the sandbox without removing the underlying freedom.

Managed Decline should use **assisted schemes** early.

An early character might say:

> “Maya volunteers there. You could ask her.”

This teaches:

```text
known relationship
→ relevant person
→ request
→ condition
→ commitment
```

The player may still ignore that advice and try another route.

As the game progresses:

- explicit suggestions become less common;
- advice becomes less complete;
- characters sometimes give bad advice;
- the phone preserves facts but stops drawing conclusions;
- recurring institutional and social patterns become recognisable.

The tutorial should teach the **grammar**, not the answer to every scenario.

---

# 10. Prototype programme

## Principle

Do **not** begin with:

- diorama art;
- LLM dialogue;
- full character generation;
- the complete situation network;
- dozens of scenarios;
- the final narrative director;
- elaborate phone presentation.

First prove that the toy works.

---

## Shared micro-world

Every candidate prototype should use the same content:

### Cast

Approximately six to eight meaningful characters:

- a band member;
- a hall volunteer;
- a pub employee;
- someone with status access;
- a workplace colleague or manager;
- a romance interest;
- an institutional decision-maker;
- the player.

### Places

- home;
- workplace;
- pub;
- community hall;
- café;
- Friday venue or town square.

### Time

Wednesday through Friday, with a few real commitments and schedules.

### Systems

- relationships;
- character goals;
- knowledge;
- communication;
- money;
- place access;
- promises;
- one developing institutional situation.

### Primary test pursuit

> Get Theo's band some form of Friday performance.

### Secondary pressures

- the player is expected at work;
- one potential helper expects something socially;
- a hall inspection is developing;
- the player may also want to impress or avoid someone.

---

## Prototype 1 — Contextual-action extreme

No pursuit screen.

The player navigates people and places and uses contextual verbs.

### Purpose

Test whether direct social affordances are discoverable enough without planning support.

### Likely result

This may produce strong improvisation but poor memory and intention management.

---

## Prototype 2 — Scheme-canvas extreme

Expose the full plan builder:

```text
goal
target
method
support
timing
risk
```

### Purpose

Test whether explicit composition genuinely creates ownership or merely feels like administration.

### Likely result

It may be very clear and initially intellectually satisfying, but socially sterile.

This prototype is worth building precisely because it may disprove the temptation to use it.

---

## Prototype 3 — Pursuit plus factual memory

Use direct contextual actions, but add:

- **On my mind**;
- known facts;
- commitments;
- calendar;
- contacts;
- no solution arrows.

### Purpose

Test whether a lightweight memory surface provides enough support for multi-step plans.

This is the likely foundation of the final system.

---

## Prototype 4 — Convergence event only

Give testers a preconfigured history and place them at Friday's event.

Let them:

- move;
- converse;
- introduce;
- listen;
- reveal;
- call aside;
- alter arrangements;
- leave.

### Purpose

Test whether the social event itself provides enough moment-to-moment play.

This is critical. A good preparation system cannot rescue a dead execution phase.

---

## Prototype 5 — Hybrid Life Schemes

Combine:

- inferred/confirmed pursuit;
- factual phone memory;
- contextual moves;
- promises and conditions;
- one changing world situation;
- a playable convergence event;
- persistent fallout.

### Purpose

Test the complete loop.

This prototype should only be built after the earlier extremes expose what is actually needed.

---

# 11. Benchmark suite after the gig test

A core system cannot be accepted because it supports one event.

The same grammar should then be tested against:

| Benchmark | What it tests |
|---|---|
| **Get a difficult date** | attraction, uncertainty, self-expression, social access |
| **Enter an event without an invitation** | introductions, status, deception, timing |
| **Help a friend with bureaucracy** | information, procedure, evidence, institutional channels |
| **Avoid work without serious damage** | deception, obligations, favours, scheduling |
| **Make legitimate money from an opening** | opportunity recognition, risk, resources |
| **Bring two groups together** | introductions, hosting, social incompatibility |
| **Prevent two people meeting** | information control, scheduling, concealment |
| **Protect or expose a secret** | trust, evidence, public/private consequences |
| **Recover from a failed plan** | improvisation, failure continuity |
| **Create a persistent place or activity** | long-term affordance progression |

If the system works only for arranging events, it is a project minigame.

If it works only through dialogue, it is still primarily a VN.

If the same verbs and handles operate across these tests, there is a real core.

---

# 12. Playtest protocol

Do not ask testers whether they liked “the concept.” Observe behaviour.

## Before play

Explain only:

- the small action vocabulary;
- how time and commitments work;
- that the world will continue without them.

Do not explain valid routes.

## During play

Use think-aloud testing.

Record:

- the first plan the player articulates;
- whether that plan preceded any displayed route;
- whom and what they considered useful;
- when they revised their approach;
- whether they requested hints;
- whether they understood refusals and conditions;
- how much time was spent reading, navigating, planning and acting;
- whether they used an entity for a purpose other than its introductory role.

## After play

Ask:

1. What were you trying to achieve?
2. What other approaches did you believe were possible?
3. Why did Maya, Sophie or Raj respond as they did?
4. Which part felt like your idea?
5. What would you try next?
6. Who do you now trust, dislike or feel responsible toward?
7. What do you think will happen after Friday?

The player does not need perfect knowledge. They do need a coherent causal model.

---

# 13. Continue and kill conditions

These are behavioural gates, not an opaque “fun score.”

## Evidence to continue

The model advances when repeated tests produce statements and behaviour like:

> “Wait, I know someone who could help.”

> “Could I use the pub instead?”

> “I shouldn't have promised both of them that.”

> “That happened because I posted the photograph.”

> “I made this much worse, but now I want to see what happens.”

Other positive evidence:

- different players form materially different routes;
- players act before being shown a complete solution;
- a refusal produces a new plan rather than paralysis;
- players reuse people, places and knowledge in unexpected but plausible ways;
- the event phase changes outcomes;
- players remember consequences in social terms;
- failed attempts remain entertaining;
- players tell the resulting story in the first person.

## Evidence to kill or redesign

The model should be stopped when:

- players repeatedly ask what the intended option is;
- the interface feels like filling in a form;
- every viable route appears as a complete menu option;
- contacts are treated primarily as bonuses or keys;
- players optimise visible favour values;
- every plan requires repeated menu composition;
- surprises feel arbitrary;
- players cannot explain why a move failed;
- the convergence event is mostly passive dialogue;
- success is delivered through a notification rather than experienced;
- reading and admin dominate the session;
- one route is obviously dominant;
- players avoid forming intentions because initiating one creates too much work;
- the game must continuously invent crises to remain interesting.

The scheme canvas should be abandoned as a player-facing system if players enjoy constructing the graph more than entering the world. In that case it may still be valuable as an internal authoring/debugging tool.

---

# 14. Production rules for the eventual system

These rules should constrain future design.

## Reuse rule

> **Every core verb or handle type should operate across several pursuit families.**

A special mechanic used only for one storyline is content, not core gameplay.

## Plausibility contract

> **When a reasonable player believes an action should work, either support it or make the limitation legible.**

Avoid invisible arbitrary restrictions.

## People-are-people rule

> **A relationship may support an action, but it is never consumed like a key or currency.**

The request itself affects the relationship.

## No mandatory planner rule

> **Every ordinary move should be possible directly from the world or phone.**

Planning support exists for memory and reflection.

## Relevant resistance rule

> **Complications must originate in character goals, existing situations, commitments or world rules.**

No generic twist generator.

## Lived payoff rule

> **Substantial pursuits should produce an event, transformation or experience—not merely state changes.**

## Residue rule

> **Important actions leave at least one persistent social, informational, spatial or institutional trace.**

## Abandonment rule

> **The player may stop caring.**

Abandoning a pursuit creates consequences where appropriate but must not break the game.

## Calm rule

> **Not every move creates a problem.**

A world that always resists the player feels authored against them rather than autonomous.

---

# 15. Implications for existing Managed Decline systems

## Narrative attention

Its job becomes:

- recognise active pursuits;
- surface relevant changes and handles;
- regulate competing pressure;
- preserve anticipation;
- schedule consequences and recovery.

It must not choose the player's route.

## Situation network

It provides:

- real changing circumstances;
- opportunities;
- resistance;
- information disparities;
- coherent complications.

It must not exist merely to generate ambient satire.

## Affordance progression

It becomes the player's expanding toolbox:

- more people to approach;
- more places to use;
- more procedures understood;
- more credible roles;
- more activities;
- more ways to create future events.

## Phone

It becomes:

- the memory surface;
- direct communication tool;
- calendar;
- information ecosystem;
- place/contact store;
- lightweight reflection interface.

It should not become a separate strategy game.

## Diorama

It becomes:

- readable social geography;
- observation space;
- event sandbox;
- visible consequence surface;
- payoff and memory generator.

## VN presentation

It handles:

- character expression;
- important negotiation;
- emotional reversals;
- authored comic timing;
- decisive confrontations.

It should not carry every routine action.

## Scenario contracts

They should now specify:

```yaml
pursuit_intersections:
  - what_player_wants_this_can_help
  - what_player_wants_this_can_threaten

usable_handles:
  - people
  - facts
  - places
  - procedures
  - timing

possible_turns:
  - character_driven
  - institutional
  - public
  - relational

convergence_roles:
  - setup
  - host
  - confrontation
  - interruption
  - payoff

residue:
  - relationships
  - access
  - knowledge
  - reputation
  - place_change
  - recurring_activity
```

That integrates authored scenarios with player-owned intentions.

---

# Final recommendation

The immediate design direction should be:

## **Life Schemes**

A player-owned pursuit system with:

- direct contextual social and practical actions;
- a small reusable verb vocabulary;
- people, facts, places, access, money and timing as contextual handles;
- concrete promises and risks rather than action points;
- grounded refusals and counteroffers;
- a lightweight phone-based memory surface;
- world changes that force occasional improvisation;
- social sandbox convergence events;
- persistent residue that expands or alters the player's life.

The first prototype should be the **Friday Gig micro-world**, implemented three ways before the full hybrid:

1. direct contextual action only;
2. explicit scheme canvas;
3. direct action plus factual pursuit memory.

Then separately prove the convergence-event play before combining them.

The core question is no longer:

> “Can the simulation generate interesting consequences?”

It is:

> **“Can a player form a plan the interface did not spell out, try it through reusable rules, revise it when reality changes, and experience a consequence worth telling someone about?”**

If the grey-box repeatedly produces that experience, Managed Decline has the foundation of a distinctive top-tier core loop.

If it does not, the test will fail before the project spends years decorating a sophisticated but passive story machine.

## User

I like the direction of this and I think the missing bit has become smaller but I still think there is something missing. Assuming the music is nice, the diorama is nice, the character designs are interesting, the movement and dialogues feel good and the player wants to stay in this game, we still need a reliable, non repetitive and well defined mechanism for the player to be able to consistently find compelling desires for them to have anything to do. We also need to manage this process so they don't stack too many or too few desires, and perhaps control the rhythm by varying the intensity and density of the desires. The space in between the social events or projects can also help control the rhythm.

## Assistant

# Yes. The remaining missing layer is **desire formation**

**Life Schemes begins after the player already wants something.** That is too late to serve as the complete core loop.

Managed Decline needs a reliable bridge between:

```text
I am pleasantly inhabiting this world
```

and:

```text
I have decided that I want this particular thing to happen.
```

The solution should not be a quest generator. It should be a **Desire Ecology**:

> **The game continually reveals attractive, adjacent possible futures; lets the player sample them cheaply; observes which ones produce genuine interest; and only then allows them to become pursuits, commitments and convergence events.**

That would sit before Life Schemes:

```text
ATTRACTIVE POSSIBILITY
        ↓
GLIMPSE
        ↓
SAMPLE
        ↓
PLAYER FEELS A PULL
        ↓
PLAYER ADOPTS A PURSUIT
        ↓
LIFE SCHEME
        ↓
CONVERGENCE EVENT
        ↓
AFTERGLOW / FALLOUT
        ↓
CHANGED LIFE REVEALS NEW POSSIBILITIES
```

This is probably the final major missing link in the core loop.

---

# 1. A desire is not an opportunity, problem or quest

These need to remain distinct.

| Term | Meaning |
|---|---|
| **Opportunity** | Something is possible in the world. |
| **Pressure** | Something demands or threatens the player. |
| **Hook** | The game brings a possibility to the player's attention. |
| **Desire** | The player personally wants a particular future state. |
| **Pursuit** | The player begins acting toward it. |
| **Commitment** | Other people, time, money, reputation or consequences are now attached. |
| **Scheme** | The player's chosen method of pursuit. |

A message saying:

> “The community hall is closing. Can you help?”

is not necessarily a desire.

It is a request.

The player might comply because the interface clearly expects them to. That creates activity, but not necessarily appetite.

A genuine desire would be closer to:

> The player has spent several enjoyable evenings at the hall.  
> They met people there.  
> They were considering holding their own event.  
> The place has become part of their imagined future.  
> Now its continued existence matters.

The player does not merely understand that saving it is morally good.

They think:

> **“No. I actually want this place.”**

That difference is fundamental.

---

# 2. The governing rule should be: **promise before pressure**

Much of game narrative begins by giving the player a problem:

- somebody needs help;
- something is threatened;
- a crime happened;
- an institution failed;
- an antagonist appeared.

That reliably generates objectives, but it risks making Managed Decline feel like an endless social-services caseload.

The game should usually establish an **attractive promise** first:

- an appealing person;
- a beautiful place;
- a desirable social world;
- an enjoyable activity;
- a funny opportunity;
- a more comfortable home;
- an exciting event;
- a creative possibility;
- a mystery the player nearly understands;
- a life the player can imagine having.

Only once the player shows interest should complications and pressure begin attaching to it.

```text
SEE THE LOVELY HALL
        ↓
ATTEND AN ENJOYABLE NIGHT THERE
        ↓
MEET PEOPLE
        ↓
IMAGINE DOING SOMETHING THERE
        ↓
BECOME INVOLVED
        ↓
NOW THE LEASE PROBLEM MATTERS
```

Not:

```text
COMMUNITY HALL CLOSING
        ↓
WOULD YOU LIKE TO ACCEPT QUEST?
```

Threats are powerful once something has value. They are exhausting when they are the game's principal method of telling the player what to care about.

---

# 3. The game should expose **adjacent possible lives**

The best object of desire is usually neither something the player already has nor an abstract distant fantasy.

It is one step beyond their current life.

Examples:

- not “become socially successful,” but **be invited to Friday's private event**;
- not “achieve romance,” but **get another evening alone with Tabitha**;
- not “become a musician,” but **perform one song at the community night**;
- not “become wealthy,” but **find a way to afford the flat they have just visited**;
- not “gain political influence,” but **get into the room where the real decision is being made**;
- not “solve the housing crisis,” but **stop their friend losing this specific tenancy**;
- not “join the arts scene,” but **become enough of a regular that people notice when they are absent**.

A desire becomes compelling when the player can already imagine the payoff.

It should produce a mental image:

> “I want to be at that party.”

> “I want that person to trust me.”

> “I want to live there.”

> “I want to see whether this ridiculous plan works.”

> “I want to be part of that group.”

> “I want everyone to see what happens when I show them this.”

This is also why the visual and musical quality matters. The diorama, characters and soundtrack are not separate decoration around the desire system. They make possible futures emotionally legible.

---

# 4. Build the world from **Desire Attractors**

The game should not rely on arbitrary events spontaneously producing motivation.

Its most important characters, places, groups, activities and lifestyles should be deliberately authored as persistent **Desire Attractors**.

An attractor offers a recognisable kind of future.

| Attractor | Initial promise | Possible evolving desires |
|---|---|---|
| **Character** | Interest, chemistry, admiration, tension | meet again → gain trust → intimacy → shared plans → protect, repair or redefine relationship |
| **Group** | Belonging, identity, companionship | attend → be recognised → become regular → contribute → host or influence |
| **Place** | Beauty, comfort, activity, social access | discover → enter → return → belong → use → transform |
| **Craft** | Expression, play, competence | sample → make → share → perform → collaborate |
| **Project** | Creation and visible achievement | imagine → begin → recruit → build → experience result |
| **Lifestyle** | A different way of living | glimpse → temporarily access → understand codes → participate → inhabit |
| **Mystery** | A specific gap in understanding | notice contradiction → form theory → gather evidence → decide what to do with truth |
| **Institution** | Power, frustration, opportunity | encounter → understand procedure → navigate → exploit, influence or challenge |
| **Event** | Anticipation and social convergence | hear about → attend → participate → organise → become associated with |

The accepted affordance-progression design already contains a natural ladder for places:

```text
unknown
→ known
→ reachable
→ enterable
→ socially accessible
→ familiar
→ belonging
```

The desire system should make the **next adjacent state perceptible**. It should not expose the whole ladder as progression UI.

For example, the player can see that the private club exists long before they can meaningfully participate. Later, they briefly attend as someone's guest. That small taste can create a stronger desire than a menu announcing:

> `PRIVATE CLUB ACCESS AVAILABLE`

The headline characters should also occupy distinct motivational territory.

- The Tabitha-type character can attract through intimacy, notoriety, private/public contradiction and emotional risk.
- The Binface-type character can attract through participation, public spectacle, civic mischief and absurd ambition.
- The Gary-type character can attract through money, economic understanding, class mobility, status and the fantasy of seeing through the system.

They should not merely own storylines. They should make different kinds of lives and conduct look tempting.

---

# 5. Every desire seed needs a **Compelling Desire Contract**

A desire seed should not enter foreground presentation merely because content is available.

It should answer these questions.

## The object

What exactly could the player want?

> Attend the rooftop launch.

Not:

> Improve social status.

## The promise

What experience is imagined?

> Beautiful place, interesting people, Tabitha attending, possibility of becoming part of that circle.

## The personal tether

Why might this particular player care?

> They know Sophie, have shown interest in Tabitha and have recently been seeking more interesting nights out.

## The preview

Has the player seen enough to form a mental image?

> A photograph, brief visit, conversation, overheard description or earlier scene.

## The distance

Is it neither automatic nor implausibly remote?

> The player cannot simply walk in, but they know someone adjacent to the organiser.

## The first handle

Is there at least one thing the player could plausibly try immediately?

> Ask Sophie, contact someone involved, investigate the venue or find out how invitations work.

This should not reveal every valid route.

## The uncertainty

Is there something to discover or negotiate?

> Sophie may introduce them, but perhaps only if she attends too.

## The payoff

Will success be experienced?

> The player actually attends and navigates the launch.

## The residue

Could this change their life afterward?

> New contacts, altered romance, reputation, photographs, invitations or resentment.

A compact authoring structure could look like:

```yaml
desire_seed:
  object: attend_rooftop_launch

  promise:
    - unusual_beautiful_evening
    - social_access
    - tabitha_will_attend

  personal_anchors:
    - player_knows_sophie
    - player_has_interest_in_tabitha
    - player_recently_sought_nightlife

  preview:
    - photograph_from_previous_event
    - conversation_with_sophie

  sample:
    - visit_public_part_of_venue
    - ask_about_guest_list

  first_handles:
    - sophie
    - event_organiser_account
    - venue_staff_contact

  payoff_form:
    - playable_social_event

  possible_residue:
    - new_social_group
    - tabitha_relationship_change
    - reputation_change
    - future_invitation

  repeat_signature:
    - belonging
    - restricted_event
    - introduction_route
```

If a candidate has no vivid promise or no plausible first handle, it is probably not ready to be shown.

---

# 6. Desire needs a lifecycle, not an on/off state

The game should not interpret one click as:

> **PLAYER GOAL CONFIRMED**

Goal recognition in open worlds is difficult precisely because players explore, experiment and take indirect or apparently inefficient actions. A modern goal-recognition study found that varied action sequences and open-world freedom make intent inference materially challenging. That is a strong reason to treat inferred interest as provisional and seek contrary evidence rather than immediately committing the narrative around it.

Use a lifecycle like this:

## Glimmer

The player becomes aware of something attractive.

No reminder. No obligation.

> A poster. A person seen across a room. A friend's new flat. An unusual event. A beautiful venue.

## Sample

The player can experience a small, low-cost part of it.

> Attend once. Visit. Flirt. Listen. Tour the flat. Help for an evening. Meet one person.

Sampling matters because players often cannot know whether they want a life until they briefly inhabit it.

## Pull

The player demonstrates repeated interest:

- asks follow-up questions;
- revisits;
- checks the relevant message;
- speaks about it to someone else;
- spends time on it;
- makes a small preparatory move.

The game may now offer more detail or another handle.

## Pursuit

The player takes a deliberate action toward the future state.

> “Could you introduce me?”

> “I'll see whether I can find a venue.”

> “Can I come next time?”

## Commitment

Something real becomes attached:

- promise;
- booking;
- money;
- deadline;
- another person's expectation;
- public statement;
- reputational exposure.

## Anticipation

The future payoff becomes concrete and approaches.

The game should now build expectation rather than add unrelated objectives.

## Convergence

The date, party, gig, viewing, meeting, hearing or trip occurs.

## Afterglow

The player sees reactions and residue without immediately being pushed into another scheme.

## Transformation

The original desire may be:

- fulfilled;
- abandoned;
- disappointed;
- replaced;
- deepened;
- redirected;
- or revealed as something the player did not actually want.

For example:

```text
I want to attend that party
        ↓
I attend
        ↓
I realise I want to become part of this group
```

Or:

```text
I want to impress Tabitha
        ↓
I learn what is happening to her
        ↓
I no longer care about impressing her;
I want to protect her privacy
```

That is more human than a chain of completed objectives.

---

# 7. Manage different **horizons of desire**

The player can care about several things without having several simultaneous projects.

The system should distinguish three useful scales.

## Appetites

Immediate, low-cost, usually untracked:

- go to the pub;
- walk through the park;
- call someone;
- wear something ridiculous;
- order food;
- take a photograph;
- listen to music;
- stay home;
- see who is around.

These fill the space between larger events and preserve moment-to-moment autonomy.

They should rarely create obligations.

## Pursuits

Medium-term, actionable intentions:

- arrange the gig;
- get a date;
- secure access;
- help with a complaint;
- make some money;
- organise a trip;
- conceal a mistake.

These use Life Schemes.

Normally only one should dominate foreground attention.

## Aspirations

Slow, identity-shaping possibilities:

- move somewhere better;
- become close to a particular person;
- enter another social world;
- leave a job;
- become creatively established;
- become wealthy;
- build a community;
- change how people see the protagonist.

Aspirations can remain present for weeks without repeatedly demanding action.

This produces a healthy hidden portfolio:

```text
IMMEDIATE APPETITE
What do I feel like doing tonight?

FOREGROUND PURSUIT
What am I currently trying to make happen?

NEAR-FUTURE ANTICIPATION
What event or result am I looking forward to?

BACKGROUND ASPIRATION
What larger kind of life is beginning to appeal to me?

AMBIENT GLIMMERS
What possibilities have I noticed but not adopted?
```

The player may mentally care about more than this. The important rule is that the game should not actively **foreground** all of them.

---

# 8. Add a **Desire Portfolio Governor**

The existing Narrative Attention Layer already distinguishes modes such as spacious, focused, crowded and recovering. That controls how much narrative material demands attention. The new system should extend it with a narrower responsibility:

> **Control the exposure, deepening, cooling and convergence of possible desires.**

It should not decide what the player wants.

Its permitted operations are:

- **seed** — reveal a low-pressure possibility;
- **deepen** — provide a richer preview or sample;
- **echo** — naturally remind the player;
- **bundle** — connect a secondary desire to the active pursuit;
- **hold** — leave a possibility dormant;
- **cool** — stop surfacing something after weak interest;
- **reawaken** — restore it only when circumstances materially change;
- **converge** — bring preparation into a lived event;
- **release** — provide aftermath and empty space.

It may not:

- declare an inferred desire as fact;
- turn every noticed item into a tracked goal;
- create artificial deadlines to force engagement;
- punish the player for ignoring an unaccepted hook;
- delete a committed pursuit because the pacing system prefers something else;
- continuously remind the player of dormant possibilities;
- manufacture a crisis merely because intensity is low.

The existing attention system asks:

> “Which true, relevant development deserves presentation now?”

The Desire Portfolio Governor asks:

> “Which possible future should be visible enough to become wantable now?”

Those are related but distinct functions.

---

# 9. Control **density** and **intensity** independently

These are not the same thing.

## Density

How many wants, possibilities or pressures are currently salient?

## Intensity

How emotionally important, urgent or consequential is the foremost one?

The game can create very different rhythms by varying them separately.

| Rhythm state | Density | Intensity | Player experience |
|---|---|---|---|
| **Afterglow** | Low | Low | Reactions, warmth, embarrassment, consequences, ordinary life |
| **Open life** | Several glimmers | Low | Wandering, sampling, seeing possibilities, no obligation |
| **Gathering interest** | Modest | Rising | One possibility begins standing out |
| **Focused pursuit** | Low | Medium | The player makes moves and builds toward something |
| **Anticipation** | Low | Medium–high | The payoff approaches; reminders and preparation matter |
| **Convergence** | Locally high | High | Many people and signals inside one bounded event |
| **Crowded** | Existing only | Mixed | No new desires; resolve, defer, decline or combine |
| **Recovery** | Low | Falling | Emotional processing and reorientation |

High density and high intensity should be rare.

When it occurs, it should normally be a deliberate social convergence:

> a wedding, party, hearing, election night or major public incident where several existing relationships collide in one place.

That feels dramatically rich because the material is bundled.

It should not mean:

> five unrelated people messaging the player with emergencies on Tuesday morning.

---

# 10. Bundle desires instead of stacking projects

This is an especially important technique.

Suppose the player currently:

- wants the gig to succeed;
- is interested in Tabitha;
- has begun thinking about moving house;
- is curious about a council problem.

The game should not launch four active chains.

Instead:

- Tabitha may attend the gig;
- the possible new flat may be mentioned in a conversation there;
- the hall's council problem may affect the event;
- one social evening advances several parts of the player's life.

The player still has one primary pursuit:

> Make Friday work.

Other desires become **stakes, texture and possible turns** inside it.

This produces richness without administrative overload.

The Narrative Attention Layer already allows compatible developments to be combined into one presentation. Desire bundling should use the same principle.

---

# 11. The space between projects should be **Open Life**, not filler

Yes, the interstitial space is essential to rhythm.

It should perform several jobs.

## Decompression

Let the player enjoy the music, home, town, favourite people and ordinary humour after something intense.

## Residue observation

Show what changed:

- who messages;
- who is avoiding whom;
- what appeared online;
- whether the venue now feels different;
- whether two people now know one another;
- what new routine has begun.

## Relationship maintenance

Not every interaction should advance a plot.

A friend can simply:

- come around;
- send something stupid;
- share a meal;
- watch something;
- go for a walk;
- complain about work.

These scenes make later desires matter because the relationship exists beyond its usefulness.

## Low-cost sampling

Open periods are where the player can try:

- a new venue;
- one creative activity;
- a social group;
- a different routine;
- a new part of town.

## Desire discovery

The player sees contrasts:

- their home versus somebody else's;
- ordinary pub versus private event;
- current job versus another workplace;
- acquaintance versus somebody's close friendship;
- their quiet weekend versus a group they might join.

## Self-expression

Clothing, photography, music, home, food and posting can occupy this space without becoming major schemes.

## Genuine silence

Sometimes nothing should be urgently wrong.

The player should be allowed to think:

> “What do I feel like doing?”

That is not lack of design. It is autonomy and rhythm.

The elastic-time design already provides the necessary escape valve: if the player does not want to inhabit a quiet period, ordinary life can compress until something changes.

---

# 12. Desire seeds should usually offer an immediate first step

Curiosity is useful, but fragile.

Research on curiosity supports the importance of making a specific information gap salient rather than merely presenting general mystery. Other research found that willingness to seek purely curiosity-satisfying information drops materially when access to the answer is delayed. For Managed Decline, the practical implication is that a curiosity seed should offer an immediate small action—ask, inspect, visit, compare or message—even when the full answer is distant.

Bad:

> “Something strange is happening at the council. Perhaps you will understand in six in-game weeks.”

Better:

> The official email says no bookings were affected.  
> Maya says the hall's booking was cancelled.  
> The booking site still shows Friday as available.

The player can immediately:

- check the site;
- ask Maya;
- visit the hall;
- contact the council;
- compare the dates.

Likewise, an aspirational desire should have a cheap adjacent action:

> Visit the flat.

> Attend once.

> Message the person.

> Ask how invitations work.

> Try the instrument.

> Go to the public part of the event.

The player should not need to make a major commitment merely to discover whether they care.

---

# 13. Prevent repetition through **motivational pattern memory**

Content cooldowns are insufficient.

Two scenarios can use different characters and locations while feeling structurally identical:

```text
friend asks for help
→ deadline
→ bureaucracy blocks progress
→ player calls contact
→ problem resolved
```

The system should remember recent desire shapes.

A useful internal signature might include:

```text
motivational family
+ object type
+ presentation form
+ first move
+ pressure pattern
+ payoff form
```

For example:

```yaml
repeat_signature:
  motive: belonging
  object: restricted_social_event
  introduction: friend_invitation
  primary_method: personal_introduction
  pressure: guest_list_deadline
  payoff: attended_event
```

The next foreground desire should preferably differ across several of those dimensions.

Variation should occur through:

- **motive** — intimacy, creation, discovery, security, mischief, escape;
- **object** — person, place, group, truth, project, possession;
- **direction** — gain, protect, repair, avoid, transform;
- **horizon** — tonight, weekend, month, long-term;
- **presentation** — physical glimpse, conversation, social post, consequence, invitation;
- **first move** — ask, visit, create, investigate, offer, conceal;
- **resistance** — person, timing, institution, money, knowledge;
- **payoff** — event, relationship, place, truth, routine, visible transformation.

Persistent attractors should also evolve rather than reset.

A romance should not repeatedly generate:

> arrange another date.

Its desire grammar should change:

```text
access
→ private understanding
→ trust
→ vulnerability
→ shared commitment
→ conflict between lives
→ future definition
```

A venue should evolve:

```text
discover
→ attend
→ belong
→ use
→ host
→ protect or transform
```

A creative activity should evolve:

```text
sample
→ make
→ share
→ perform
→ collaborate
→ establish something persistent
```

The player remains attached to the same thing, but the desired future changes.

---

# 14. Empty and crowded states need explicit recovery rules

## When the portfolio is empty

The game should not immediately send three urgent requests.

Instead:

1. enter Open Life;
2. expose contrasting low-cost attractors;
3. prefer appetitive possibilities over problems;
4. offer a sample;
5. see what the player approaches.

The candidates should represent different fantasies.

For example:

- a socially appealing person;
- a beautiful place or event;
- an economic opportunity;
- a creative possibility;
- a specific curiosity.

Not five versions of helping somebody.

## When the portfolio is crowded

The game should:

- stop introducing demanding hooks;
- let unopened possibilities remain ambient;
- merge compatible interests into existing events;
- allow commitments to be declined, renegotiated or delegated;
- turn optional developments into background consequences;
- naturally delay non-urgent opportunities;
- provide clear endings to stale pursuits.

The player should also be able to signal:

> “I am not interested.”

This might be expressed through:

- declining;
- muting;
- not following up;
- telling someone they are no longer doing it;
- cancelling;
- consciously letting the matter go.

An unaccepted glimmer should not produce guilt.

A broken commitment may.

That distinction protects autonomy. Research on game motivation has repeatedly associated autonomy, competence and relatedness with enjoyment and sustained engagement; a system that constantly converts exposure into obligation would undermine the autonomy it is supposed to create.

---

# 15. A sample rhythm

Consider this sequence after the Friday gig.

## Friday night — convergence

The gig occurs.

It is busy, funny and socially complicated.

No new unrelated desire is introduced.

## Saturday morning — afterglow

The player wakes to:

- messages;
- photographs;
- one embarrassed apology;
- somebody thanking them;
- a visible change in one relationship.

The town and music are allowed to breathe.

## Saturday afternoon — open life

The player is free.

They might:

- visit the hall;
- stay home;
- meet someone;
- walk around;
- take photographs;
- browse messages;
- fast-forward.

Three glimmers exist but make no demands:

- Sophie mentions a party next weekend;
- a friend has moved into a surprisingly lovely flat;
- the hall's caretaker suggests the player could run something monthly.

## Player samples one

The player visits the friend's flat and spends time there.

They ask what the rent is.

That creates a **housing pull**.

The party and recurring hall activity remain ambient.

## Sunday — deepening

A housing listing appears because it is causally plausible and relevant.

Not:

> `NEW QUEST: MOVE HOUSE`

The player can inspect it.

They may ignore it.

## Monday — pursuit adoption

The player books a viewing.

Housing is now the foreground pursuit.

The game does not simultaneously escalate the party, hall project and a major romance crisis.

Sophie may casually mention the party, but it remains a warm possibility.

## Midweek — focus

The flat creates concrete questions:

- deposit;
- commute;
- guarantor;
- housemate;
- whether the player actually wants to leave their current area.

Other content is mostly ordinary life and minor social texture.

## Weekend — convergence

The viewing, negotiation or decision becomes a lived event.

Perhaps Sophie happens to know the landlord.

Perhaps involving her would help but complicate the relationship.

The party may now be bundled into the housing story:

> someone at the party knows a better place;

or it may remain unused.

## Aftermath

Whether the player moves, fails, changes their mind or discovers something better, the result alters their life and exposes the next adjacent future.

This produces rhythm without feeling like:

```text
GIG QUEST
→ HOUSING QUEST
→ PARTY QUEST
```

---

# 16. The complete architecture

```text
WORLD SIMULATION
characters / situations / calendar / places / affordances
        ↓
DESIRE ATTRACTORS
authored promises and evolving adjacent possibilities
        ↓
ELIGIBLE DESIRE SEEDS
specific, causally available possible futures
        ↓
DESIRE PORTFOLIO GOVERNOR
player interest evidence / current pursuits / rhythm / freshness
        ↓
PRESENTATION
glimpse / sample / invitation / contrast / anomaly / conversation
        ↓
PLAYER RESPONSE
ignore / sample / investigate / adopt / reject
        ↓
LIFE SCHEMES
plan / act / commit / improvise
        ↓
CONVERGENCE
event / meeting / date / transformation / discovery
        ↓
RESIDUE
relationships / access / knowledge / routines / places / reputation
        ↓
NEW ADJACENT POSSIBILITIES
```

The division of authority should be explicit:

> **The world determines what is possible.**

> **Attractor contracts determine what kinds of futures can be made appealing.**

> **The portfolio governor controls salience and rhythm.**

> **The player determines what becomes a desire.**

> **Life Schemes determines how they try to achieve it.**

> **The simulation and authored character systems determine what happens.**

That avoids an omnipotent system covertly assigning the player a preferred story.

---

# 17. This needs its own prototype before the full core prototype

The next prototype should not begin by telling the tester:

> “Get Theo's band a venue.”

That tests planning, not desire formation.

It should begin during an **Open Life interval**.

The micro-world should contain several potential attractors:

- Theo's band;
- an appealing social event;
- an interesting person;
- a desirable flat or place;
- a strange institutional contradiction;
- a small money-making opportunity.

The tester receives no formal objective.

The experiment asks:

1. Does the player spontaneously say, “I want to…”?
2. Which possibility produces that statement?
3. Did they get enough of a preview to imagine the payoff?
4. Could they take a cheap first step?
5. Did they feel free to ignore the other possibilities?
6. Did one desire become foreground without the rest becoming a backlog?
7. Did the game know when to stop seeding?
8. Did interest survive long enough to become a pursuit?
9. Did the eventual event feel anticipated?
10. Afterward, did the player enjoy the empty space or merely feel directionless?

The strongest success criterion is:

> **The player describes an intended future in their own words before the game turns it into a tracked pursuit.**

For example:

> “I want to find out whether I can get into that party.”

> “I think I want to move.”

> “I want to see her again.”

> “I want to organise something at that hall.”

> “I want to know why those two accounts contradict each other.”

And the strongest failure signals are:

- “What am I supposed to do?”
- “Which one is the main quest?”
- “Everyone wants something from me.”
- “I clicked it because it was there.”
- “I didn't know what success would actually look like.”
- “I was interested, but the game waited too long before letting me act.”
- “Everything became a commitment.”
- “The quiet section felt like no content rather than freedom.”

---

# Final design position

The complete core loop is no longer merely:

```text
want
→ plan
→ act
→ improvise
→ consequence
```

It is:

```text
INHABIT A PLEASANT, CHANGING LIFE
        ↓
GLIMPSE AN ADJACENT POSSIBLE FUTURE
        ↓
SAMPLE IT WITHOUT COMMITMENT
        ↓
FORM A GENUINE DESIRE
        ↓
ADOPT A PURSUIT
        ↓
SCHEME, ACT AND IMPROVISE
        ↓
ANTICIPATE AND EXPERIENCE A CONVERGENCE
        ↓
LIVE IN THE AFTERGLOW
        ↓
THE CHANGED LIFE REVEALS ANOTHER POSSIBILITY
```

The critical principles are:

> **Generate attraction before obligation.**

> **Show adjacent possible lives rather than abstract objectives.**

> **Let the player sample before committing.**

> **Keep one foreground pursuit while other wants remain warm or dormant.**

> **Bundle compatible desires into the same events.**

> **Use quiet Open Life intervals for recovery, discovery and desire formation.**

> **Vary motivational shape, not merely characters and locations.**

> **Let success and failure change what the player can imagine wanting next.**

That would give Managed Decline a reliable motivational engine without turning it into a quest log, a calendar optimiser or a machine that tells players what their own character supposedly cares about.

## User

good in theory but can we plausibly produce high quality desire hooks for the player on demand as and  when needed throughout hours of gameplay? what would the mechanism/process look like? how is quality ensured? will it ever run out?

## Assistant

# Verdict

**Yes, for a bounded campaign. No, not by inventing brilliant desires from scratch at runtime, and not indefinitely.**

A plausible system can reliably provide high-quality hooks across a 20–30-hour game if it works like this:

> **Authors create a finite repertoire of strong, partially parameterised desire material. The simulation continuously identifies when that material has become personally relevant. The pacing system prepares several possibilities before they are needed, exposes them gradually, and promotes only those the player actually responds to.**

The runtime system should generate:

- **which existing hook fits now;**
- **which live people, places and circumstances instantiate it;**
- **how it should first become visible;**
- **when to deepen, defer or retire it.**

It should **not** generate:

- the fundamental emotional promise;
- a major character's next compelling relationship stage;
- a signature comic premise;
- an entire new project or romance arc;
- the eventual payoff;
- or a judgment that something is “high quality.”

Those parts need authored design and playtesting.

The honest statement is:

> **The machine can produce relevance, contextual variation and timing. It cannot manufacture taste.**

---

# 1. Do not generate hooks “when needed”

That is already slightly the wrong architecture.

Suppose the player's active pursuit concludes on Friday night. If the system only then asks:

> “What new desire can I generate?”

it is too late.

A desire usually needs:

1. prior exposure;
2. a mental image of the possible payoff;
3. some personal connection;
4. a low-cost opportunity to sample it;
5. time for interest to form.

The game therefore needs a **hook reservoir** containing several possibilities at different stages of readiness.

```text
LATENT
Causally possible, but not yet shown
        ↓
PREVIEWED
Player has seen or heard enough to imagine it
        ↓
SAMPLE-READY
Player can try a small part without commitment
        ↓
WARM
Player has demonstrated some interest
        ↓
FOREGROUND-READY
Can become a pursuit when attention permits
        ↓
ADOPTED / COOLED / RETIRED
```

At any point, the player might have:

- one foreground pursuit;
- one approaching payoff;
- one or two warm possibilities;
- several barely visible glimmers;
- many latent candidates the player knows nothing about.

When a slot opens, the game usually promotes something that has already been made wantable. It does not suddenly drop a stranger's crisis into the player's inbox.

This extends the existing Narrative Attention Layer rather than replacing it. The current design already separates world truth, story signals, opportunity composition and attention control; the new layer would maintain the motivational material *before* it becomes an opportunity packet.

---

# 2. The authored unit should be a **Desire Kernel**

A Desire Kernel is much smaller than a quest but more substantial than a prompt.

It defines a kind of attractive future and the content needed to make that future credible.

```yaml
desire_kernel:
  id: enter_restricted_social_world

  motivational_family:
    - belonging
    - status
    - intimacy
    - curiosity

  promise:
    - experience_an_unusual_beautiful_event
    - meet_people_from_an_adjacent_social_world
    - spend_time_with_a_desired_character

  compatible_objects:
    - private_launch
    - backstage_event
    - members_club_dinner
    - exclusive_party

  required_player_tethers:
    any:
      - knows_gateway_character
      - interested_in_attending_character
      - demonstrated_interest_in_social_world
      - pursuing_related_project

  preview_forms:
    - glimpse_location
    - see_photograph
    - hear_characters_discuss_event
    - briefly_visit_public_area

  samples:
    - ask_about_event
    - visit_venue
    - meet_one_attendee
    - attend_smaller_public_activity

  first_move_families:
    - request_introduction
    - offer_help
    - obtain_professional_reason
    - accompany_existing_guest
    - investigate_access_rules

  likely_resistance:
    - social_access
    - conflicting_expectations
    - limited_capacity
    - timing
    - reputation

  supported_payoff:
    - playable_social_event

  possible_residue:
    - new_contacts
    - changed_romance
    - future_invitations
    - embarrassment
    - new_social_routine

  repeat_signature:
    motive: belonging
    object: restricted_event
    payoff: social_convergence
```

The kernel describes the **grammar**.

An authored attractor provides the specific identity:

```text
Sophie
+
rooftop architecture launch
+
Tabitha attending
+
organiser with a particular personality
+
specific visual and comic material
```

The runtime binds them only when the current campaign makes the combination legitimate.

---

# 3. Use three quality levels of hook material

Not every desire seed should be equally procedural.

## Signature hooks

These belong to major characters, major places and important campaign transitions.

Examples:

- becoming privately close to Tabitha;
- participating in the Binface-type character's public spectacle;
- seeing a possible route into Gary's economic/social world;
- discovering the wealth transition;
- creating a major persistent venue.

These should be mostly authored:

```text
strong fixed premise
+ authored preview
+ authored emotional promise
+ authored landmark payoff
+ variable player position, route, cast and consequences
```

The runtime contextualises them. It should not invent them.

## Attractor-progression hooks

These advance a recurring relationship with a person, group, place, activity or lifestyle:

```text
discover group
→ attend once
→ become recognised
→ contribute
→ become a regular
→ host or influence
```

The ladder is authored. The particular event, timing, supporting characters and active world pressure may vary.

## Situation-collision hooks

These arise when the simulation creates a meaningful relationship between established things:

> A place the player regularly uses is threatened.

> A person the player wants to impress needs something related to the player's project.

> A public claim contradicts something the player personally witnessed.

> Two commitments are about to collide.

These can be more systemic because the player already supplies much of the emotional value.

Incremental story-sifting research shows that authored patterns can be recognised prospectively while a simulation is still unfolding, rather than only after a complete sequence exists. Reusable social representations can also reduce the need to separately author every possible character configuration. That supports detecting and instantiating these collisions—but not allowing the detector to decide whether an underlying premise is artistically strong.

---

# 4. The complete runtime pipeline

## Stage 1 — Candidate emitters

Several systems continuously identify possible desire material.

### Attractor ladders

Characters, groups, places and activities emit their next adjacent possibilities.

```text
Player has attended Maya's radio night twice
→ possible desire: become a recognised regular

Player is already a regular
→ possible desire: contribute something

Player has contributed
→ possible desire: organise or host
```

### Situation sifter

The event ledger detects patterns such as:

- valued place under pressure;
- unexpected access opening;
- person behaving unusually;
- opportunity created by another situation;
- old promise becoming newly relevant;
- two social worlds acquiring a connection;
- obvious contrast between current life and a possible one.

### Affordance changes

New knowledge, access, money, contacts or roles make previously impossible futures adjacent.

### Player-created residue

Earlier actions generate possibilities:

- two introduced characters now want to collaborate;
- an event succeeded and could become recurring;
- the player acquired a space;
- somebody now trusts the player;
- a public post created unexpected attention.

### Authored campaign windows

Some material becomes possible during particular seasons, phases or world states.

---

## Stage 2 — Live binding

The Candidate Builder attempts to bind an approved kernel to real entities.

```text
kernel:
  enter_restricted_social_world

bind:
  event: rooftop_launch
  gateway: sophie
  desired_attendee: tabitha
  venue: converted_civic_rooftop
  world_context: regeneration_campaign
  timing: next_saturday
```

This is not arbitrary slot filling.

Each kernel specifies compatible binding classes and exclusions:

```yaml
binding_rules:
  gateway_must:
    - actually_have_access
    - plausibly_consider_helping_player
    - know_event_exists

  desired_attendee_must:
    - be_expected_to_attend
    - be_known_to_player

  event_must:
    - have_playable_payoff_content
    - still_be_changeable_by_player_action
```

A generic friendship NPC cannot be assigned access they do not have merely because the pacing system needs a gateway.

---

## Stage 3 — Support proof

Before the hook can be promoted, the system proves that the game can actually support it.

It checks:

- the promised future genuinely exists;
- the cast can plausibly act;
- the player's known information is sufficient;
- at least one immediate first step exists;
- preferably several materially different approach families exist;
- refusal or failure leaves recoverable play;
- the convergence or payoff has implemented content;
- the resulting residue can be persisted;
- no mandatory dependency has already become impossible;
- the hook does not require the player to know a hidden fact.

This should function more like a compiler than a critic.

It can determine:

> “This hook is impossible because Sophie no longer has access.”

It cannot determine:

> “This hook is emotionally brilliant.”

---

## Stage 4 — Hard quality gate

A foreground candidate must pass every relevant test.

| Test | Required condition |
|---|---|
| **Wantable** | The player can imagine a desirable, intriguing or cathartic future. |
| **Personal** | It connects to someone, somewhere or something already meaningful to this campaign. |
| **Previewed** | The promise has been shown rather than merely described abstractly. |
| **Actionable** | A small first move is available now or soon. |
| **Open** | The player has room to formulate a method rather than follow one prescribed route. |
| **Causal** | The opportunity arises from real world state. |
| **Supported** | Payoff, failure and residue can actually be represented. |
| **Fresh** | It does not repeat the recent motivational and structural pattern. |
| **Timely** | It fits the current attention and emotional rhythm. |
| **Proportionate** | Its apparent importance matches the amount and quality of content behind it. |

A failure does not necessarily delete the candidate.

It may be:

- held until more setup exists;
- shown only as ambience;
- rebound to another entity;
- cooled;
- or retired permanently.

---

## Stage 5 — Reservoir and prewarming

Approved candidates enter a small internal reservoir.

The governor should prefer diversity across:

- motive;
- social sphere;
- time horizon;
- intensity;
- first action;
- payoff form.

Example reservoir:

```text
WARM
Get closer to Tabitha through private time

SAMPLE-READY
See whether the player enjoys Maya's radio group

PREVIEWED
A much nicer flat has appeared nearby

LATENT
Possible council loophole related to player's project

LATENT
Unexpected money-making opportunity through workplace
```

The system then stages small preview moments during Open Life:

- a photograph;
- a visit;
- a conversation;
- environmental observation;
- an invitation to sample;
- a change in routine.

This creates a **motivational runway**.

---

## Stage 6 — Portfolio governor

The governor decides whether to:

- seed;
- deepen;
- hold;
- bundle;
- cool;
- converge;
- or release.

It should not promote candidates merely because the portfolio is empty.

A candidate is promoted only when:

```text
foreground space exists
+
the hook is ready
+
the player has shown some pull
+
the motivational pattern is currently fresh
```

When no hook satisfies those conditions, the correct result may be:

> **Open Life continues.**

That is preferable to filler.

---

## Stage 7 — Presentation

The same kernel should have multiple approved presentation forms.

A restricted-event desire might first appear through:

- physically glimpsing the venue;
- seeing photographs afterward;
- a group-chat conversation;
- overhearing two people discuss invitations;
- helping with a public event at the same place;
- a character casually mentioning that Tabitha will attend.

Presentation variation matters because identical invitations will feel repetitive even when the underlying desire objects differ.

---

## Stage 8 — Player evidence

The game interprets behaviour conservatively.

### Weak evidence

- looked at photograph;
- opened event details;
- asked one question;
- walked past venue.

### Stronger evidence

- revisited;
- asked follow-up questions;
- contacted a relevant person;
- rearranged time;
- spent money;
- made a promise;
- told somebody they wanted to attend.

Weak interest causes gentle deepening at most.

Repeated disinterest causes cooling.

The system should never conclude:

> “The player looked at one expensive house, therefore their central goal is wealth.”

---

## Stage 9 — Pursuit, convergence and residue

Once adopted, the hook becomes a Life Scheme.

It should then produce:

- player-authored method;
- real commitments;
- resistance;
- improvisation;
- lived payoff;
- persistent residue.

That residue updates the attractor ladders and produces the next adjacent possibilities.

This closes the production loop.

---

# 5. What quality assurance really looks like

There is no reliable universal runtime function called:

```text
is_this_hook_brilliant()
```

Research on automatic story-quality evaluation explicitly describes evaluation as an open problem: automated features may correlate with human judgments, but human feedback remains important and expensive. There is also evidence that making generated stories structurally more unified does not necessarily produce a corresponding improvement in players' reported story quality or agency.

So quality has to be protected at several layers.

## Layer A — Authorial constraints

Weak material should not enter the repertoire.

Every Desire Kernel needs:

- a clear fantasy or emotional promise;
- at least one memorable preview;
- an identifiable player fantasy;
- a supported first move;
- meaningful uncertainty;
- payoff content;
- residue;
- a reason this belongs specifically in Managed Decline.

“NPC needs help with something” is not enough.

---

## Layer B — The Desire Workbench

The authoring tool should validate and visualise each kernel.

It needs to show:

### Binding coverage

Which characters, places, groups and situations can instantiate it?

### Route coverage

What first moves and recovery routes are supported?

### Knowledge audit

What does each actor and the player know at every presentation stage?

### Content dependencies

Are the relevant scene families, locations, phone messages and consequences implemented?

### Repetition signature

How similar is it to recent or adjacent kernels?

### Portfolio compatibility

Can it bundle with existing pursuit families, or will it necessarily create another independent obligation?

### Payoff proof

Can the player actually experience what the hook promises?

### Campaign simulation

Across many automated seeded runs:

- how often does the kernel become eligible;
- how often does it become impossible before use;
- which bindings dominate;
- which motivational families disappear for long stretches;
- where does the candidate reservoir become empty;
- where do too many high-pressure hooks accumulate?

These simulations test availability and structure. They do not replace human assessment.

---

## Layer C — Editorial binding review

Not every technically valid binding should be approved.

For example:

```text
restricted social world
+ private club
+ Sophie
```

may be strong.

```text
restricted social world
+ recycling-centre staff room
+ random cashier
```

may be technically valid but dramatically weak—unless specifically authored as a funny and desirable subculture.

Bindings should be approved by class:

```text
VERIFIED
Can enter foreground play.

AMBIENT ONLY
Can support flavour or sampling, not a major pursuit.

EXPERIMENTAL
Available in development builds for testing.

PROHIBITED
Technically possible but tonally or dramatically wrong.
```

---

## Layer D — Human playtests

A hook succeeds only when players demonstrate appetite.

Useful observations include:

- Did the player formulate a desired future in their own words?
- Did they act before the game prescribed a complete route?
- Could they describe why they cared?
- Did they sample without feeling trapped?
- Did anticipation survive until payoff?
- Did they understand why the opportunity existed?
- Did different players want different things?
- Did ignored hooks disappear gracefully?
- Did the result create another organic desire?

Development telemetry can use numerical data, but the decisive evidence remains behavioural and qualitative. Runtime should not expose or depend on an `Interest = 74` model.

---

## Layer E — Release-content maturity

Hooks should progress through production states:

```text
CONCEPT
        ↓
STRUCTURALLY VALID
        ↓
EDITOR-APPROVED
        ↓
PLAYTESTED
        ↓
CAMPAIGN-VERIFIED
```

Only the later states should be allowed to carry the foreground experience.

An LLM may help authors draft alternate message wording or surface realisations, but it should not independently create the hook's premise, invent campaign facts or decide whether a candidate is compelling.

---

# 6. How do we prevent repetition?

Raw combinatorial counts are misleading.

A system might have:

```text
20 people × 10 places × 8 motives
```

and claim 1,600 hooks.

Players may experience all of them as:

> Someone asks me for help again.

Failbetter's narrative-engineering guidance warns directly against combinatorial explosion and advocates getting broad reuse from a small set of qualities rather than writing bespoke content for every possible configuration. It also recommends a “river rather than a tree”: much of the strongest material should remain broadly reachable, with player-specific context connecting the authored landmarks.

Managed Decline therefore needs **motivational pattern memory**, not merely content-ID cooldowns.

A recent-hook signature should record:

```yaml
motive: belonging
object: social_event
direction: gain_access
presentation: invitation
first_move: ask_friend
resistance: social_gatekeeper
payoff: party
```

The next foreground hook should preferably differ in several dimensions:

```yaml
motive: creation
object: place
direction: transform
presentation: environmental_glimpse
first_move: investigate
resistance: money
payoff: visible_world_change
```

The variation dimensions are:

- motive;
- object;
- direction;
- presentation;
- first move;
- resistance;
- emotional tone;
- time horizon;
- payoff;
- social configuration.

More importantly, persistent attractors must **develop**.

Tabitha should not generate five versions of:

> Arrange another date.

Her ladder should change the nature of wanting:

```text
meet her
→ get private access to the real person
→ earn trust
→ share something consequential
→ negotiate the public/private conflict
→ decide what kind of future is possible
```

The object remains Tabitha. The motivational problem evolves.

The same applies to places, groups, crafts and lifestyles.

---

# 7. Will it run out?

## In an indefinitely playable game: yes

Every finite authored system eventually repeats or exhausts its strongest possibilities.

Procedural recombination can delay exhaustion. It cannot produce infinite authored-quality novelty.

That is not a failure. Managed Decline does not need to simulate a complete human lifetime forever.

## In a designed campaign: it need not run out before the ending

The game needs a production budget and a finite motivational arc.

An illustrative 30-hour campaign might contain:

- roughly **18–24 adopted foreground pursuits**;
- perhaps **two or three glimmers or samples** for every pursuit ultimately adopted;
- therefore approximately **55–75 hook exposures** in one run;
- plus unused material for player variation and replay.

That suggests a working repertoire on the order of **90–130 validated seed moments**, depending on how much replay variation is required.

Those are **not 130 bespoke quests**.

They might be distributed as:

| Content source | Approximate form |
|---|---|
| Major character ladders | Several evolving desire states per headline and supporting character |
| Places, groups and activities | Discover → sample → belong → use → transform |
| Lifestyle and aspiration ladders | Housing, work, wealth, creativity, community, status |
| Situation-collision kernels | Threat, opening, contradiction, commitment collision, changed access |
| Micro-glimmers | Low-cost invitations, curiosities, comparisons and appetites |
| Convergence packs | Reusable event architectures instantiated with live cast and state |

These numbers are provisional design assumptions, not a commitment. The prototype needs to establish the real adoption rhythm and production cost.

The system is plausible if a Desire Kernel is a compact authored contract plus small preview material.

It becomes implausible if every seed requires:

- a unique environment;
- a unique cast;
- a fully bespoke quest chain;
- several cinematics;
- unique mechanics;
- and wholly separate outcomes.

---

# 8. Campaign structure should deliberately approach exhaustion

The game should not maintain the same hook cadence forever.

## Early game — discovery

Many glimmers, low commitment.

The player is discovering:

- people;
- places;
- groups;
- activities;
- possible identities.

## Middle game — expansion

More pursuits and more combinatorial collisions.

The player now has:

- a useful social network;
- established tastes;
- several worlds they can enter;
- projects;
- stronger relationships;
- meaningful commitments.

## Late game — consolidation and collision

The game introduces **fewer entirely new desires**.

Instead it asks:

- What happens when old and new social worlds collide?
- Which commitments become incompatible?
- Which place or relationship becomes central?
- Which aspiration is the player actually willing to reorganise their life around?
- What does wealth, intimacy, status, creation or belonging now mean?

Late-game content should derive intensity from accumulated history, not from continuously introducing strangers and activities.

## Ending — culmination before depletion

The campaign should end while the player still imagines other possible lives.

Unused attractors, alternate relationship states, different social routes and unseen signature material support replay.

That is much better than continuing until every character and place has exhausted its final content tier.

---

# 9. What happens when the reservoir is temporarily empty?

Do not surface a weak hook.

The system should:

1. enter Open Life;
2. show aftermath and ordinary relationships;
3. allow self-directed activities;
4. compress uninteresting time;
5. let existing situations evolve;
6. prewarm the next valid possibility;
7. stop fast-forwarding when a genuinely meaningful opening appears.

The accepted elastic-time design already supports this: ordinary life can compress while commitments and simulation continue, and direct play resumes when attention becomes valuable.

A quiet evening is better than:

> “Another acquaintance needs help with a web form.”

The system should distinguish:

```text
INTENTIONAL BREATHING SPACE
```

from:

```text
CONTENT DEPLETION
```

The Desire Workbench's campaign simulations should identify the latter during development.

---

# 10. What makes the supply renewable?

Not infinite—**renewable**.

Several mechanisms let a finite repertoire keep producing fresh meaning.

## Evolving attractors

The same character or place offers a different desired future after each significant change.

## Player-created residue

What the player did earlier creates new possible wants.

> The event succeeded; perhaps it should become monthly.

> Two characters met; perhaps the player wants to encourage or prevent their relationship.

> A place became available; perhaps the player wants to use or transform it.

## World-state collisions

Political, economic and institutional situations change the significance of established things.

> The café was merely pleasant. Now the player's friend works there and its landlord is selling.

## Recontextualisation

The same activity has different meaning with different people, relationships and pressures.

A dinner with Tabitha before public controversy is not the same desire object as dinner during it.

## Player-authored projects

Once the player has enough affordances, they can originate:

- a party;
- a trip;
- a performance;
- a business;
- a campaign;
- a creative project;
- a move;
- a social introduction.

The system still needs supported action and payoff grammar, but it does not need to supply the initial desire.

## Unused campaign material

The governor should not try to expose everything in one playthrough.

Rules-based mixed-initiative systems have shown promise in managing parallel threads while reducing directionlessness, but even those systems remain dependent on authored representations and careful interaction design.

---

# 11. The non-negotiable production rule

> **Never promote a hook because the game needs content. Promote it because the world supports it, the player has reason to care, and the authored payoff is ready.**

If no candidate satisfies those conditions, the game should breathe.

The complete mechanism is:

```text
AUTHORED DESIRE REPERTOIRE
attractor ladders + desire kernels + convergence packs
        ↓
WORLD AND PLAYER STATE
relationships + access + situations + history
        ↓
CANDIDATE EMISSION
attractor steps + situation patterns + affordance changes
        ↓
LIVE BINDING
real people + places + timing + pressures
        ↓
SUPPORT PROOF
can this actually be attempted and paid off?
        ↓
HARD QUALITY GATE
wantable / personal / previewed / actionable /
open / causal / supported / fresh / timely
        ↓
HOOK RESERVOIR
latent / previewed / sample-ready / warm
        ↓
PORTFOLIO GOVERNOR
seed / deepen / hold / bundle / cool / converge
        ↓
PLAYER RESPONSE
ignore / sample / adopt / reject
        ↓
LIFE SCHEME
plan / act / commit / improvise
        ↓
CONVERGENCE AND RESIDUE
        ↓
NEW ADJACENT POSSIBILITIES
```

## Final assessment

This is **plausible**, but it is not cheap and it is not automatic.

A credible production strategy is:

- author approximately a hundred compact, validated seed moments for a substantial campaign;
- organise them into evolving character, place, group and lifestyle ladders;
- reserve bespoke writing and staging for the strongest previews and payoffs;
- use runtime systems to detect relevance, bind context, regulate rhythm and avoid repetition;
- use simulation and static checks to prevent invalid material;
- use human editorial review and playtesting to determine whether it is actually compelling;
- design the campaign to culminate before the strongest repertoire is exhausted.

The decisive prototype should not test whether the system can output many candidates. It should test whether a small repertoire of perhaps **twelve carefully authored kernels** can be rebound across one micro-world while still making testers voluntarily articulate different desires, ignore others without punishment, and experience each adopted hook as specific to their own campaign.

If twelve strong kernels already feel generic or repetitive, scaling to one hundred will not rescue the design.

## User

Accepted. record this as a note in repo managed-decline-v2
