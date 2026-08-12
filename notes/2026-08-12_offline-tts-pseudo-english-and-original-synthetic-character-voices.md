# Offline TTS, Pseudo-English and Original Synthetic Character Voices

## Status

**Agreed direction.**

Managed Decline should not depend on conventional full-dialogue TTS at this stage. Instead, develop a stylised character-voice system based on **pre-generated pseudo-English performances**, supplemented by **occasional real English words and phrases**. Use conventional TTS freely where artificiality is diegetically appropriate or part of the joke.

Character voices should be **original synthetic designs created from abstract voice specifications**, not clones or imitations of identifiable real people.

---

## Why this direction is promising

The game does not necessarily need every spoken sound to communicate lexical meaning. The text box can communicate **what the character said**, while the audio communicates:

- who is speaking;
- mood;
- emotional intensity;
- sentence shape;
- hesitation;
- confidence;
- irritation;
- comic timing;
- warmth;
- social register;
- regional identity;
- conversational rhythm.

Research using pseudowords and pseudo-sentences supports the basic perceptual assumption: listeners can infer substantial emotional information from prosody even when lexical meaning has been removed. Non-verbal vocalisations such as laughter, sighing, gasps and groans can be especially informative.

There is also a strong game precedent in Simlish and similar systems: nonsense or semi-nonsense vocalisation can establish character identity and emotional delivery while written/UI information carries literal meaning.

The main unresolved question is not whether players can identify emotion. It is whether this remains pleasant and expressive across long, dialogue-heavy Managed Decline sessions. That should be tested directly with a prototype.

---

# 1. Use TTS immediately where artificiality is appropriate

Current offline TTS is already suitable for material where slightly synthetic delivery is either harmless or beneficial.

Examples:

- council telephone menus;
- railway announcements;
- automated government/corporate systems;
- self-checkouts;
- voicemail;
- satnav;
- spam calls;
- automated customer service;
- cheap adverts;
- strange internet videos;
- corporate training videos;
- AI-generated social media rubbish;
- radio/PA/background material where a synthetic character is intentional.

These are good places to gain production experience with offline speech generation without making central character acting dependent on it.

---

# 2. Main character dialogue: pseudo-English rather than complete synthetic English

The proposed default voice convention is a **fictional English-like spoken language**.

The dialogue text remains ordinary written English. The voice track is a stylised representation of the character speaking rather than a literal reading of every displayed word.

A long written sentence therefore does **not** need a sound sample with the same number of words or syllables.

Instead, audio should represent the **prosodic shape** of the line, for example:

- short irritated statement;
- incredulous question;
- hesitant answer;
- excited interruption;
- medium annoyed explanation;
- long escalating rant;
- awkward confession;
- sincere low-energy response;
- trying-not-to-laugh delivery;
- exhausted muttering.

This avoids the combinatorial explosion that would occur if every emotion, line length, speech act and intensity needed a unique exact sample.

---

# 3. Do not build a literal giant round-robin library

Use a **performance reservoir** with metadata and cooldowns.

A sample might carry metadata such as:

```text
character = tabitha
length = medium
emotion = indignant
intensity = high
speech_act = statement
pace = fast
confidence = performative
ending = falling
special = slight_disbelief
```

A dialogue line requests a suitable performance profile, and the system chooses among several nearby candidates while strongly suppressing recently used samples.

Do not simply cycle:

```text
1 -> 2 -> 3 -> 4 -> 1
```

because players will rapidly hear the repetition.

The matching system should favour **nearest suitable performance + repetition avoidance**, not exact Cartesian combinations.

---

# 4. Audio does not need to cover the whole written line

A useful refinement is to avoid continuous babble over every sentence.

The research suggests people can extract meaningful emotional information from very short stretches of prosodic speech. Therefore many dialogue lines may only require a **0.5–2.5 second vocalisation**, even if the written text is substantially longer.

For example, a long incredulous line might begin with a 1.2-second pseudo-English burst establishing:

- speaker identity;
- disbelief;
- annoyance;
- sentence onset;

while the player reads the remainder.

Longer lines may receive another mutter, breath, sigh or reaction at an appropriate clause boundary rather than nonstop nonsense speech.

This should reduce listening fatigue and avoid making players process continuous pseudo-language while also reading dense dialogue.

---

# 5. Three-layer character audio system

## A. Prosodic pseudo-English utterances

These communicate the main performance information:

- personality;
- mood;
- intensity;
- cadence;
- sentence shape.

Most can be short.

## B. Non-linguistic vocal performance

Build a substantial reservoir of:

- breaths;
- sighs;
- little laughs;
- full laughs;
- snorts;
- groans;
- gasps;
- hesitation noises;
- throat clearing;
- confused sounds;
- surprised sounds;
- muttered frustration;
- sharp intakes of breath;
- sarcastic exhalations;
- interruption noises.

These are high-value assets because they communicate emotion strongly and can often be reused without sounding like repeated sentences.

## C. Occasional genuine English

This is an important part of the style rather than an exception to hide.

Some recognisable English can deliberately break through the pseudo-language:

- names;
- "mate";
- "right";
- "cheers";
- "sorry";
- "what?";
- "no";
- "yes";
- "alright";
- "literally";
- "bollocks";
- "fuck's sake";
- "Jesus Christ";
- place names;
- institutions;
- culturally salient terms.

Example:

```text
"Ah vennit sho mala mate, na ferrin?"
```

or:

```text
"Velah nesh—WHAT?"
```

The desired effect is not that everyone literally speaks an alien language. The audio should feel like a **stylised abstraction of ordinary English speech**, in which the player's ear occasionally resolves recognisable words.

This can become one of the game's signature audio conventions.

---

# 6. Invent a deliberately English-like pseudo-language

Do not use random fantasy gibberish.

The pseudo-language should be designed to resemble English phonologically and rhythmically while avoiding actual comprehensible sentences.

Prefer forms such as:

```text
vella
shennit
marra
denner
nallin
ferrick
worra
belven
sharra
ennit
```

rather than exotic fantasy orthography.

Design goals:

- familiar English consonant clusters;
- English-like stress patterns;
- schwas and reduced vowels;
- plausible contractions;
- hesitation forms;
- conversational fillers;
- sentence-final rises and falls;
- productive pseudo-morphology;
- forms that current English-trained speech models pronounce reliably.

The language can have internally consistent pseudo-morphology such as:

```text
sherr
sherring
sherr'd
```

The spelling is partly a **speech-generation control surface**: if a model pronounces a form inconsistently, respell its synthesis representation while retaining a canonical internal form.

Maintain a pronunciation dictionary for recurring vocabulary, ideally with canonical phonemic representations, even if the production TTS backend cannot consume IPA directly.

---

# 7. Regional British identity should survive the abstraction

The pseudo-language should have a common core vocabulary rather than separate invented languages for every region.

Character identity comes through:

- vowels;
- stress;
- rhythm;
- pitch;
- articulation;
- reduction;
- pace;
- sociolect;
- conversational habits.

The same pseudo-phrase can therefore sound very different from:

- a Newcastle character;
- a south London character;
- a Cardiff character;
- a Midlands character;
- an RP/upper-middle-class character;
- a tired call-centre worker;
- etc.

Avoid cartoonish accent caricatures. The goal is recognisable British social and regional texture, not phonetic parody.

---

# 8. Current offline technology: good enough for curated production, not perfect autonomous direction

Current offline speech models can already follow broad expressive instructions such as:

- angry;
- hesitant;
- fast;
- quiet;
- sarcastic;
- tired;
- whispered;
- incredulous;
- excited;
- emotionally restrained.

Some contemporary systems also expose finer prosodic or inline controls.

However, current technology should **not** be assumed to provide perfectly deterministic actor-director-level control such as:

- exact micro-pause placement;
- guaranteed stress on one particular syllable;
- exact pitch curve;
- a voice crack at precisely the intended moment;
- perfect emotional continuity on every generation.

Therefore the production system should exploit **pre-generation and curation**.

For a desired performance:

```text
Generate 8-20 candidates -> audition -> keep the best 1-3 -> ship fixed audio
```

The model does not need a 100% hit rate. Even a modest hit rate is acceptable if generation happens during development and only approved assets reach the player.

Do not initially generate these final character performances live at runtime.

---

# 9. Separate performance from character voice identity

A useful conceptual separation is:

```text
PERFORMANCE
    +
CHARACTER VOICE IDENTITY
    =
FINAL CHARACTER AUDIO
```

Pure text-to-speech may not always obey exact acting direction. Voice conversion can potentially help by taking an already satisfactory performance and transferring it into the character's canonical synthetic voice while preserving timing and prosody.

This creates a possible production route:

```text
pseudo-text
    -> candidate performance
    -> selected/directed performance
    -> character voice conversion
    -> curation
    -> final asset
```

For Managed Decline, this is more attractive than requiring one model to solve meaning, pronunciation, acting, character identity and timing simultaneously.

No paid voice actors are planned. Human guide performances are therefore not a required dependency. If developer guide recordings are ever used solely for timing/prosody, their speaker identity should not become the canonical character identity.

---

# 10. Character voices should be original synthetic designs

**Core policy:** do not clone identifiable people.

Each important character receives a **voice bible**, analogous to a visual character design sheet.

Example categories:

## Physical/acoustic qualities

- approximate perceived age range;
- register;
- pitch range;
- resonance;
- brightness/darkness;
- nasality;
- breathiness;
- vocal texture;
- articulation.

## Speech habits

- default pace;
- pause behaviour;
- consonant precision;
- pitch range;
- sentence endings;
- hesitation style;
- laughter style;
- irritation behaviour;
- sincerity behaviour;
- confidence behaviour.

## Pseudo-English behaviour

- characteristic reductions;
- preferred filler noises;
- vowel tendencies;
- recurring pseudo-forms;
- characteristic sentence shapes.

## Real-English leakage

Some characters may have a small set of especially characteristic real words or expressions.

The goal is that a player could eventually recognise a character from a very short pseudo-English utterance without seeing their portrait.

---

# 11. Generate canonical voices from scratch

Use a local/offline **voice-design model** capable of producing voices from abstract natural-language descriptions.

The intended workflow is:

```text
CHARACTER VOICE BIBLE
        ↓
offline voice-design model
        ↓
many synthetic candidates
        ↓
human selection + resemblance rejection
        ↓
CANONICAL SYNTHETIC CHARACTER REFERENCE
        ↓
        ├── pseudo-English generation
        ├── English catchphrases
        ├── emotional variants
        └── voice conversion / cloning from our synthetic reference
        ↓
human curation
        ↓
shipped assets
```

Generate many candidates for each major character rather than taking the first acceptable output.

Once selected, freeze a canonical reference such as:

```text
tabitha_voice_master_v1.wav
```

Later systems may then clone/condition on **our synthetic reference**, rather than any real human voice.

Current offline models such as Qwen3-TTS demonstrate voice-design and subsequent voice-cloning workflows, so this architecture is technically plausible now. The exact model should remain replaceable rather than being hard-wired into game architecture.

---

# 12. Avoid copyright / likeness problems by design

The safest policy is to create voices from abstract characteristics rather than celebrity imitation.

Do **not** prompt:

```text
"Make this character sound like [named actor / streamer / politician / celebrity]."
```

Do use descriptions such as:

```text
"young British woman, mid-low pitch, slightly nasal resonance,
fast conversational rhythm, restrained default expression,
stronger pitch movement when incredulous"
```

## Proposed Managed Decline synthetic voice policy

1. **No real-person names in voice-generation prompts.**
2. **No celebrity, actor, streamer, politician or other identifiable-person recordings as character references.**
3. Describe voices only through acoustic, linguistic, demographic-range and performance attributes.
4. Generate multiple original candidates from scratch.
5. Reject any candidate that strongly reminds the team of a recognisable person.
6. Freeze selected synthetic references as canonical project assets.
7. Preserve provenance for every canonical voice:
   - model name;
   - exact model/version/hash where practical;
   - licence copy/version;
   - generation prompt;
   - date generated;
   - canonical WAV/reference assets;
   - later transformation history where practical.
8. Re-check model licensing and applicable UK law before commercial release.

UK legal treatment of synthetic voices/digital replicas is evolving. Do not rely on the simplistic assumption that "a voice cannot be copyrighted". Potential issues can include rights in source recordings/performances, passing off/false endorsement, contractual restrictions, model licensing and future digital-replica legislation.

An open-source model licence also does **not** automatically indemnify the project against infringement claims. Model provenance and licensing should be treated like any other important commercial software dependency.

---

# 13. Stylisation is an advantage, not merely a compromise

Do not optimise exclusively for "indistinguishable from a human recording".

Managed Decline can deliberately occupy a slightly stylised acoustic space, just as its visual character designs need not be photorealistic.

Useful controlled stylisation could include:

- characteristic resonance;
- exaggerated but plausible prosody;
- recognisable vocal rhythm;
- restricted or distinctive pitch behaviour;
- unusual but consistent pseudo-English vowels;
- highly character-specific filler noises and reactions.

The goal is not robot voices. The goal is **designed fictional voices**.

This also reduces pressure to imitate familiar performers and may make the game's sound identity more distinctive.

---

# 14. Proposed production tiers

| Material | Preferred method |
|---|---|
| Diegetically artificial systems | Offline conventional TTS |
| Background/routine pseudo-dialogue | Batch-generated pseudo-English + curation |
| Important reusable character expressions | Strongly directed generation + curation |
| Difficult signature performances | Performance-first generation and/or synthetic-reference voice conversion |
| Real-English catchphrases | Carefully generated and curated separately |
| Critical dramatic/comic moments | Bespoke generation with as much manual curation as required |

There is no requirement that every voice asset use the same production method.

---

# 15. Sample-count expectations

Do not assume thousands of samples are required per character.

A useful early hypothesis for a major character is roughly:

- 10-12 broad delivery families;
- several short/medium/long or otherwise distinct performance shapes per family;
- several variants where repetition would be noticeable;
- 30-60 non-verbal reactions.

A first full implementation might end up around **100-250 approved assets for an important character**, but this is not yet a requirement and should be validated experimentally.

Minor/background characters can use substantially smaller reservoirs and more shared performance infrastructure.

Storage is unlikely to be the difficult constraint. Direction, selection, tagging, consistency and avoiding repetition are the real production costs.

---

# 16. Important risks

## Listening fatigue

The largest design risk is not technical feasibility but whether continuous pseudo-language becomes irritating over a long narrative game.

Mitigations:

- vocalise only part of many lines;
- use silence deliberately;
- make non-verbal reactions common;
- vary performance length;
- allow sincere scenes to become much quieter and less comic;
- avoid nonstop babbling while players read;
- use real English sparingly for emphasis.

## Repetition

Players will learn repeated samples quickly.

Use:

- multiple variants;
- similarity matching;
- strong cooldowns;
- special samples reserved for rare contexts;
- procedural choice based on performance metadata.

Some repetition can intentionally become a character catchphrase, but that should be deliberate.

## Emotional mismatch

A generic "angry" performance is not enough. Context matters: embarrassed anger, righteous anger, panicked anger and exhausted anger are different.

The metadata system should eventually describe **attitude and conversational function**, not only basic emotion labels.

## Pseudoword pronunciation drift

Speech models may pronounce invented vocabulary inconsistently.

Maintain a canonical pronunciation dictionary and test recurring words across the selected generation backend. Respelling for synthesis is acceptable if necessary.

## Important scenes becoming silly

Pseudo-language must support sincerity, vulnerability and quietness. It cannot sound like comedy babble in every context.

A successful convention should allow the nonsense itself to stop being funny when the scene stops being funny.

---

# 17. Prototype before committing to full production

Do not generate thousands of assets immediately.

Build a focused prototype with approximately **four contrasting characters** and perhaps **80-120 pseudo-speech clips each**, plus non-verbal reactions and a small number of real-English leak-through phrases.

Test them in a 15-20 minute representative sequence containing:

1. mundane everyday chatter;
2. comedy;
3. interruption/fast group dialogue;
4. an argument;
5. awkwardness;
6. one sincere/emotional scene.

Questions to answer:

- Can players identify who is speaking without constantly checking portraits?
- Can they infer emotional tone before finishing the written line?
- Does pseudo-speech improve comic timing?
- Does it interfere with reading?
- Does it become annoying after 20 minutes?
- How quickly do repeated assets become obvious?
- Do occasional English phrases feel funny/natural or gimmicky?
- Can regional and social voice identity survive the invented vocabulary?
- Can quiet emotional scenes remain affecting?
- How many variants are actually needed per performance family?

The decision to scale the system should be based on this test rather than a theoretical sample-count estimate.

---

# 18. Long-term relationship with improving TTS

This architecture should remain **TTS-ready without becoming TTS-dependent**.

Full English offline character acting may improve substantially during development. If it eventually becomes good enough, Managed Decline can selectively expand its use.

However, pseudo-English may remain preferable even after conventional synthetic voice acting becomes technically viable because it offers:

- a distinctive audiovisual identity;
- smaller dialogue-audio requirements;
- compatibility with emergent dialogue;
- easier localisation;
- lower pronunciation risk;
- greater tolerance of generative imperfections;
- cheap/offline production;
- strong characterisation through prosody;
- a natural place for absurdity and satire;
- deliberate abstraction consistent with the game's visual style.

The pseudo-language therefore should not be treated merely as temporary inferior voice acting. It may be a **core aesthetic feature of Managed Decline**.

---

## Decision summary

Adopt the following direction for further prototyping:

- **Use conventional TTS now where artificiality is part of the joke or diegetic world.**
- **Prototype pseudo-English as the main stylised vocal system for character dialogue.**
- **Let written English carry semantic content and audio carry performance.**
- **Use short prosodic utterances rather than trying to vocalise every displayed syllable.**
- **Mix pseudo-English, non-verbal performance and occasional real English.**
- **Design a coherent English-like pseudo-language rather than random gibberish.**
- **Preserve British regional/social identity through accent, rhythm and sociolect.**
- **Pre-generate and curate final assets; do not rely on perfect runtime TTS direction.**
- **Create each major character's canonical voice synthetically from an abstract voice bible.**
- **Never deliberately clone or imitate identifiable real people.**
- **Keep complete provenance and licence records for all voice-generation technology.**
- **Treat synthetic voice design as part of character design, not merely a production shortcut.**
- **Prototype the listening experience before committing to a large sample library.**

The intended end state is that a player can hear a short invented utterance—perhaps with one recognisable English word breaking through—and identify not only the emotion, but **which Managed Decline character is speaking and how they feel**.