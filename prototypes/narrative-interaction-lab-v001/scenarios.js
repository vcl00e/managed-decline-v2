import generatedVariants from "./scenarios/generated-data.js";

export const VARIANT_ORDER = ["baseline", "support", "system"];

export const VARIANT_LABELS = {
  baseline: { public: "Dialogue baseline", blind: "Version A", short: "A" },
  support: { public: "Narrative support", blind: "Version B", short: "B" },
  system: { public: "System-forward stress test", blind: "Version C", short: "C" }
};

const commonDebrief = [
  "What were you trying to communicate or accomplish?",
  "Which part felt most like your decision?",
  "What changed because of you, and what would have happened anyway?",
  "What physical place, object, gesture or interface detail do you remember?",
  "Where did the game ask for input when you would rather have watched or listened?",
  "What do you now expect to happen next?"
];

export const SCENARIOS = {
  intimacy: {
    id: "intimacy",
    title: "The Borrowed Coat",
    subtitle: "An intimacy slice about presence, silence, a phone call and whether a borrowed object becomes shared history.",
    researchQuestion: "Does small physical and expressive interaction make intimacy feel inhabited without interrupting the scene?",
    colour: "plum",
    debrief: commonDebrief,
    variants: generatedVariants.intimacy
  },
  ensemble: {
    id: "ensemble",
    title: "The Last Broadcast",
    subtitle: "An ensemble slice about attention, public and private conduct, and several people using the same event differently.",
    researchQuestion: "Can a social event feel live and player-shaped without becoming event-management gameplay?",
    colour: "amber",
    debrief: commonDebrief,
    variants: generatedVariants.ensemble
  },
  institution: {
    id: "institution",
    title: "Temporary Adjustment",
    subtitle: "An institutional slice about conflicting evidence, provisional interpretation and choosing what version of reality to circulate.",
    researchQuestion: "Can interpretation become playable without turning the story into a detective puzzle with one correct answer?",
    colour: "blue",
    debrief: commonDebrief,
    variants: generatedVariants.institution
  }
};

export function getScenario(sliceId, variantId) {
  const slice = SCENARIOS[sliceId];
  if (!slice) return null;
  const variant = slice.variants[variantId];
  if (!variant) return null;
  return { slice, variant };
}
