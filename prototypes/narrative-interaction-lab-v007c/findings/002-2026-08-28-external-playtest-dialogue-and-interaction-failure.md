# External playtest — dialogue and one-to-one interaction failure

**Date:** 2026-08-28

**Status:** external playtest evidence; v007c one-to-one interaction is not successful

## User feedback

> the dialogue is so boring. the options sound fake and cliche. there's still no interaction and progression with tabitha just her yapping on and on.

## Direct finding

V007c corrected route availability, content starvation and some progression plumbing, but still failed to create satisfying one-to-one interaction.

The Tabitha private scene is structurally a monologue followed by a tone/stance selector:

- Tabitha delivers a long block of exposition;
- the player chooses one of several highly authored responses;
- Tabitha delivers another authored response block;
- state advances to a plan/callback.

This is not sufficient interactive progression. The player is mostly receiving authored character information rather than participating in an unfolding shared activity or back-and-forth exchange.

## Specific failure classes

### Monologue disguised as interaction

Focused VN is being used as content delivery rather than high-bandwidth interaction. The player has too little opportunity to interrupt, redirect, ask, tease, act, notice, misunderstand or otherwise shape the conversation as it develops.

### Fake / design-visible choices

Options such as “I know the public story. I’m more interested in you” and “Tell me one thing about you that has nothing to do with that video” expose the authorial intent too clearly. They read as idealised relationship-game responses rather than natural things a player might actually say in the moment.

### Progression by declaration

The route declares that character discovery, self-expression, a plan and payoff have occurred, but the player does not do enough to produce them. Progress is mainly authored scene advancement rather than interactive conduct.

### Shared activity is still tokenistic

The noticeboard interaction is a prelude/trigger rather than a meaningful joint activity with enough possibility to create conversation, choices and consequences of its own.

## Deeper architectural finding

The active-experience lifecycle is useful as a thin tracking/scheduling layer, but it cannot manufacture gameplay merely by declaring promises such as `character_discovery`, `self_expression`, `specific_plan` and `payoff` fulfilled.

Moment-to-moment interaction still requires a concrete dramatic/activity kernel.

The accepted activity direction remains more fundamental:

> read a shared situation, participate in it, and live through the convergence.

For one-to-one companionship, the missing design problem is therefore not “how many dialogue lines should the route contain?” It is:

> **What are the two people actually doing together, how can both initiate and respond, and how does that shared activity create opportunities for natural conversation and changing interpersonal context?**

## Consequence for next work

Do not patch v007c by simply rewriting the monologue or adding more dialogue options.

The next targeted experiment should isolate **dyadic interaction grammar**:

- a concrete shared activity or curiosity;
- mutual initiative;
- short back-and-forth conversational turns rather than exposition blocks;
- player actions/questions/teasing/silence that arise from immediate context;
- physical participation where it changes the shared experience;
- character-specific information revealed through doing, not biography dumping;
- observable interpersonal development produced by the interaction;
- a natural ability to remain, redirect, stop or move on.

The existing low-burden map/VN grammar remains inherited unless deliberately reopened.
