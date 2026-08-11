# Managing NPC Overload and Social Memory

## User

Managed decline is scoped to have many npcs, characters, stories and jokes. there is a risk of the player getting confused by the sheer number of names and people and experiences. (or at least they might have a headache each time they have to figure out who is who) How should these risks be contained?

## Assistant

Yes. This is a real risk, and it is more dangerous for *Managed Decline* than simply having “too much content.” The game depends on the player understanding social context: **who someone is, how they know them, why they matter, and what happened last time**. If the player has to mentally reconstruct that before every interaction, jokes stop landing and emotional stories lose momentum.

The solution is not necessarily fewer NPCs. It is to make the world **large while keeping the player's active social working set small**.

## 1. Treat the cast as tiers, not one enormous list

I would explicitly design four levels:

| Tier | Approx. scale | Player expectation |
|---|---:|---|
| **Core cast** | ~10–15 | “I know these people.” |
| **Recurring locals** | ~25–40 | “Oh yeah, I remember them.” |
| **Story/support characters** | Potentially 100+ | “I recognise why this person matters right now.” |
| **Ambient population** | Unlimited | “Just somebody who lives/works here.” |

The critical distinction is that **not everybody deserves a proper character introduction**.

The bloke working reception at the leisure centre doesn't necessarily need to be *Gareth Pembroke*. He can simply be **Leisure Centre Receptionist** until something happens that makes Gareth personally relevant.

Likewise:

> **Maya**  
> Your downstairs neighbour

is cognitively much easier than merely:

> **Maya Rahman**

Names become useful after the player's brain has something to attach them to.

---

# 2. Every character appearance should answer “who is this?” automatically

Do not make the player remember.

When someone hasn't appeared recently, their first dialogue box could show:

**SOPHIE**  
*Your colleague — currently trying to get you to join the union*

Or:

**DANIEL**  
*Council housing officer — you argued with him about the damp*

Then the label disappears after a few lines.

This is substantially better than sending players into a codex.

The information should be **just enough to recover the memory**, rather than a biography.

For example:

> **Martin**  
> *Chloe's dad. You accidentally told him Chloe was planning to move out.*

Immediately the entire situation comes back.

That is exactly what you want.

---

# 3. The phone should become the player's external social memory

This fits extremely well with the diegetic phone you've already been considering.

Contacts shouldn't just say:

> Alice Morton  
> 07700...

They might gradually become:

> **Alice Morton**  
> Work — Planning Department  
>   
> Last spoke: Tuesday  
> *She thinks you're helping organise the leaving drinks.*  
>   
> **Your impression:** Surprisingly normal  
>   
> Recent:
> - sent you the document Gary wasn't supposed to see
> - invited you to drinks
> - owes you £8.40

That means the phone performs the function that human phones actually perform: **offloading memory**.

And because it's diegetic, it doesn't feel like an RPG encyclopaedia.

The player can search:

> `Gary`

and see the Gary they know.

Or:

> `council`

and find everyone relevant to the council.

Or:

> `Leah`

and discover:

> **Leah — Jess's sister**  
> *You met her once at Jess's birthday.*

That alone solves a surprising amount of the problem.

---

# 4. Give characters strong relational identities

Humans remember:

> “Tom's horrible landlord”

much more easily than:

> “Christopher Barnes”

So characters should generally enter the player's cognition through **relationships and roles**.

A useful internal design test is:

> Can I describe this character in five words that distinguish them from everybody else?

Good:

- Priya — your aggressively competent manager
- Tony — neighbour obsessed with parking
- Erin — chaotic friend from secondary school
- Colin — councillor who keeps appearing everywhere
- Fatima — nurse dating your flatmate

Bad:

- Rachel — friendly woman
- Daniel — office worker
- Sarah — neighbour
- James — acquaintance

If two NPCs occupy approximately the same mental slot, either differentiate them strongly or merge them.

---

# 5. Visually, characters need extremely high recognition

This matters even more with a large cast.

You don't need every NPC to have an elaborate design. You need **recognition at a glance**.

Important characters should have stable combinations of:

- silhouette
- hairstyle
- clothing archetype
- posture
- accessory
- manner of speaking
- typical location/context

For instance, the player may initially remember:

> “the woman with the enormous orange scarf”

before remembering her name.

That's fine.

Eventually:

> orange scarf → Nadia → housing campaign → argument with council

becomes one associative bundle.

Avoid having forty realistically dressed twenty-something characters with similar hairstyles and proportions. Realism is actually counterproductive here.

---

# 6. Limit the **active cast**, not the total cast

This is probably the most important structural rule.

A playthrough might eventually contain 120 meaningful named people.

But in a particular week, the player might have only:

- 4 important personal relationships
- 3 workplace people
- 3 people involved in the current local dispute
- 2 miscellaneous recurring characters

That is manageable.

As one storyline cools down, those characters move into the background and others become active.

Think of it like television. A sitcom might technically have hundreds of credited characters over its life, but any given episode asks you to track perhaps eight.

I'd make the story system aware of this.

### A useful rule

Try to keep the number of **simultaneously active socially significant NPCs around 8–15**.

Not a hard technical restriction, but a narrative scheduling target.

If the simulation sees that the player is currently juggling:

> landlord dispute + workplace scandal + romantic problem + friend's crisis + neighbourhood campaign

it shouldn't casually activate another six-character subplot.

Let existing events breathe.

---

# 7. Introduce people through existing people

Avoid:

> You arrive at a party.  
> Here are Abigail, Yusuf, Connor, Rebecca, Michelle, Dave and Lucy.

Instead:

You know **Jess**.

Jess introduces:

> “This is my sister Leah.”

Later Leah says:

> “Have you met Connor?”

Connor happens to work with someone you've already encountered.

The network expands outward from known nodes.

This creates a **social graph the player can understand relationally**.

Eventually the player has:

> Player → Jess → Leah → Connor → local campaign

instead of twenty disconnected names.

And when two previously separate networks unexpectedly intersect—

> “Wait. *That's* your brother?”

—you get comedy and drama essentially for free.

---

# 8. Reuse characters aggressively

This is one of the best ways to make a large world feel richer **while actually reducing cognitive load**.

Suppose you need:

- somebody staffing a pharmacy
- somebody involved in a local planning objection
- somebody's cousin
- someone appearing at pub quiz

Don't automatically create four NPCs.

Maybe they're all **the same person**.

Now the player thinks:

> “Oh Christ, it's *him* again.”

And the world starts feeling interconnected.

This is especially appropriate for a British town/borough setting. People repeatedly running into acquaintances is believable and funny.

It also gives minor characters accidental character arcs.

The initially irrelevant pharmacist eventually becomes:

> the pharmacist  
> → Jess's cousin  
> → planning campaign obsessive  
> → somehow standing for council

The player's memory strengthens every time the game reuses him.

---

# 9. Let the game acknowledge forgetting

There's no reason to pretend the player has perfect memory.

Dialogue can sometimes include unobtrusive options like:

> **Remind me how you know Chloe?**

But I would avoid making this a humiliating “you forgot!” choice.

It could simply be a contextual UI action:

**[Who is Chloe?]**

Clicking it gives:

> Chloe: Your former flatmate. She now works with Sophie. You haven't spoken since the boiler incident.

Then dialogue continues unchanged.

No penalty.

No NPC saying:

> “Seriously? You don't remember my sister?!”

unless forgetting is deliberately part of the scene.

The game should distinguish **player memory failure** from **character memory failure**.

---

# 10. Put tiny contextual reminders directly into choices

Suppose the player gets:

> Tell Olivia what Martin said.

That's bad if the player doesn't remember Martin.

Instead:

> Tell Olivia what Martin said **about her application**

or hover/hold:

> **Martin** — Olivia's manager. Told you yesterday that her application had already been rejected.

You should almost never require the player to make a consequential decision based purely on remembering an arbitrary proper noun.

---

# 11. Storylines should have recognisable identities too

The same overload problem applies to stories.

Rather than a quest log containing:

> A Matter of Principle  
> Good Neighbours  
> Unforeseen Circumstances  
> Difficult Conversations

use concrete descriptions:

> **Your rent increase**
>
> **Gary's disciplinary meeting**
>
> **The bus route closure**
>
> **Jess and Leah aren't speaking**
>
> **What happened at the Christmas party**

Players can immediately reconstruct them.

The game can have witty titles, but **the functional label should remain obvious**.

---

# 12. Don't make the journal a homework assignment

A huge character encyclopaedia containing:

> DOB  
> occupation  
> biography  
> relationships  
> likes  
> dislikes  
> seven paragraphs of lore

does not solve cognitive overload.

It merely documents it.

The useful information is:

> **Why do I know this person?**
>
> **What do they currently want?**
>
> **What happened between us recently?**

Everything else can exist underneath for interested players.

The default UI should be brutally concise.

---

# 13. There is actually comedy in the memory system

Managed Decline can even exploit this mechanically.

Your phone might contain contacts such as:

> **Dave (Boiler)**

> **Dave (NOT Boiler)**

> **Sarah Council**

> **Sarah Council New**

> **Tom Plumber maybe**

> **Man from EDF**

And later:

> **UNKNOWN NUMBER**  
> *You have apparently spoken for 47 minutes.*

That's recognizable modern-life humour **while also functioning as information architecture**.

Likewise, the game can occasionally deliberately create ambiguity:

> “Gary said you've got it.”

and offer:

> Which Gary?

because there genuinely are three Garys.

That's funny precisely because the rest of the game normally protects the player from accidental ambiguity.

---

# 14. I'd impose one important content rule

For every new named character, the writer/system should effectively have to answer:

> **Why can this role not be filled by an existing NPC?**

Not because the cast must be tiny.

Because recurring characters are disproportionately valuable.

One NPC appearing in six contexts usually creates more interesting storytelling than six NPCs appearing once each.

It produces histories:

> the person you disliked  
> becomes useful  
> becomes your friend's partner  
> witnesses something embarrassing  
> later has power over you

That is where emergent narrative gets interesting.

---

## What I think the final structure should be

Managed Decline can safely have **hundreds of people in the world**, but most should never simultaneously demand name recognition.

The player's experience should look more like:

**World population: huge**  
↓  
**People I've encountered: dozens**  
↓  
**People I actually know: ~30–50**  
↓  
**People who currently matter: ~8–15**  
↓  
**People involved in this scene: 2–5**

And the interface should continually reconstruct the context needed to move back upward when necessary.

The target isn't:

> *“The player has memorised our enormous cast.”*

It's:

> **“The player almost never has to wonder who the hell the game is talking about.”**

That distinction lets Managed Decline have the enormous, messy social world that suits the concept **without requiring the player to maintain a spreadsheet of British people named Dan.**

## User

agreed. great points. record this as a note in repo managed-decline-v2
