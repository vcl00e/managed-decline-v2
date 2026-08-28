# v007b external playtest — one-to-one route failed

**Date:** 2026-08-28

**Status:** failed external playtest; accepted correction

## Player feedback

The player tested the quiet / Tabitha one-to-one route and found it extremely weak.

Key feedback:

- staying outside felt dry from the initial forced choice onward;
- there was effectively no lived process of spending time together;
- the route contained no focused meaningful dialogue;
- it ended suddenly enough that the reaction was essentially: **“was that it?”**;
- this felt especially unacceptable given earlier testing and accepted design work about making narrative interaction enjoyable, substantial and character-focused.

The player questioned whether the process was still broken or whether a stronger AI model was needed.

## Diagnosis

This is primarily a **process/specification failure**, not evidence that the interaction concept itself is wrong.

V007b successfully protected route availability and freedom from forced group interaction, but failed to protect the **positive experiential value** of that route.

The quiet route was technically reachable and regression-safe, but substantively empty:

- a very short focused scene;
- a choice/reaction;
- a map affordance equivalent to “stay here together a while”;
- time advancement without authored interpersonal content;
- another short private beat;
- early ending eligibility.

This violated the earlier accepted principle from v006b that non-intervention / staying with somebody must **not collapse into lack of experience**. Ordinary companionship can itself be rewarding, but only when it contains actual companionship: humour, conversation, private context, shared observation/activity, intimacy, character discovery or some other worthwhile interpersonal content.

## Accepted correction

### 1. Route availability is not enough

A major player route under test must be both:

- reachable without unwanted content; and
- substantial enough to be a credible player choice.

> **Choosing lower social bandwidth must not mean choosing drastically lower narrative/content bandwidth.**

### 2. Add positive experience invariants

Regression gates currently focus heavily on preventing known failures. Future prototypes must also specify what worthwhile experience each major route is supposed to provide.

For a one-to-one companionship route, the target may include some combination of:

- meaningful focused conversation;
- humour;
- intimacy;
- character discovery;
- self-expression;
- shared observation or small activity;
- changing conversational texture;
- a consequential or revealing choice;
- a memorable payoff;
- visible relationship interpretation or residue.

The exact mix depends on the scene. The point is that the route must contain an **experience**, not merely absence of other content.

### 3. Add route-value preflight

Preflight must no longer ask only whether a route can be completed.

For each major route being tested, it must ask:

- What did this player want?
- What worthwhile experience did the route actually provide?
- What did the player learn, feel, do or share with the character/group?
- Did the route contain enough high-value narrative material for the interest it invited?
- Was there at least one moment that justified focused/high-bandwidth presentation where appropriate?
- Did choosing the route produce something rather than merely suppress other content?
- Would this route still look worth choosing if the player knew what it contained?

A route that is reachable but answers these poorly is **not playtest-ready**.

### 4. Add content / bandwidth review

Before external testing, inspect how much and what kind of content each promoted player path actually contains.

A prototype must not advertise several meaningful social modes while only one of them receives substantial authored/reactive content.

### 5. Distinguish interaction noise from narrative substance

The correction to exhausting v007 group interaction should have been:

> **fewer low-value interaction prompts, while retaining high-value narrative interaction.**

It should not have become “less dialogue / less content.”

Focused VN conversation remains appropriate when the player deliberately chooses a character and the moment has enough semantic or emotional bandwidth to justify it.

### 6. Spatial intention should reduce repeated confirmation

If the player deliberately remains with someone, the map should be able to carry part of that intention.

Avoid sequences such as:

```text
choose to stay with person
→ confirm staying again
→ confirm lingering again
→ little happens
```

Prefer:

```text
remain with person
→ light lived interaction / shared observation
→ meaningful conversational opening develops
→ focused interaction when warranted
→ return to lived space
→ player remains free to stay, wander, join others or leave
```

### 7. New anti-pattern: Empty freedom

**Empty freedom**

> The game technically permits a player preference or route, but provides little worthwhile experience for choosing it.

This is now a known regression class and must be checked explicitly.

## Model-quality conclusion

A stronger model may help with synthesis and design quality, but this failure should not be delegated to model capability.

The written process allowed a route to pass because it measured freedom/topology and absence of old failures more strongly than positive entertainment/narrative value. That specification hole must be fixed regardless of model.

## Status

**V007b fails as the one-to-one/social-bandwidth test.**

Do not continue external testing of this build as evidence for the target experience.

The next revision should retain the successful corrections to UI and free social topology, but rebuild one-to-one interaction around a substantive character experience before asking the user to play again.
