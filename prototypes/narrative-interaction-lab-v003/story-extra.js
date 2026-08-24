const line = (speaker, text, extra = {}) => ({ speaker, text, ...extra });

export const EXTRA_NODES = {
  roleplay: {
    id: "roleplay",
    phase: "delight",
    title: "Practise the conversation",
    time: "18:10",
    tone: "comic-intimate",
    cast: ["tabitha", "gareth"],
    prose: [
      "Gareth asks everyone to pair up. One person will play a worried friend; the other will play somebody showing two or three of the changes from the slide. The sheet says to use curiosity, avoid labels and focus on things you have actually noticed.",
      "Tabitha slowly turns her chair toward you. She puts both hands on her knees with the solemn expression of somebody attending her own parole hearing."
    ],
    lines: [
      line("tabitha", "Go on, then. Save me."),
      line("gareth", "Try to open naturally. The goal isn't to win. It's to preserve enough trust for a real conversation."),
      line("tabitha", "He seems nice. This is complicating things.", { aside: true })
    ],
    actions: [
      {
        id: "roleplay_attractive",
        label: "‘Tabitha, I've noticed your opinions are making you dangerously attractive to the wrong demographic.’",
        intent: "Use the exercise as flirtation and shared mockery",
        next: "roleplay_response",
        effects: { setFlags: { flirted: true }, setRelation: "openly_flirty", addMemories: ["flirted_during_roleplay"] }
      },
      {
        id: "roleplay_changes",
        label: "‘I've noticed some changes. You keep inviting me to council training sessions.’",
        intent: "Make their actual relationship the observable change",
        next: "roleplay_response",
        effects: { setRelation: "comfortable", addMemories: ["used_real_invitation_in_roleplay"] }
      },
      {
        id: "roleplay_adult",
        label: "‘I think we should skip straight to a trusted adult. I'm exhausted.’",
        intent: "Play the absurd procedure straight",
        next: "roleplay_response",
        effects: { setRelation: "laughing_together", addMemories: ["requested_trusted_adult_for_tabitha"] }
      }
    ]
  },

  roleplay_response: {
    id: "roleplay_response",
    phase: "delight",
    title: "Observable changes",
    time: "18:11",
    tone: "comic",
    cast: ["tabitha", "gareth"],
    prose: [
      "Tabitha answers in an exaggerated version of the voice from the old programme: defensive, suspicious, permanently one sentence away from somebody writing a note about her. Two chairs over, a retired man is explaining that his recent interest in military history is mostly because the library keeps buying very good books about tanks.",
      "Gareth circulates between pairs. He arrives beside you at exactly the wrong moment."
    ],
    lines: [
      line("tabitha", "You don't understand. The pedestrianisation scheme is only the beginning."),
      line("gareth", "Good energy. Maybe avoid inventing a position your partner hasn't actually expressed."),
      line("tabitha", "That's fair."),
      line("gareth", "And remember: humour can maintain connection, provided it isn't being used to avoid what the other person is actually saying."),
      line("tabitha", "I no longer care for him.", { aside: true })
    ],
    actions: [
      {
        id: "roleplay_continue",
        label: "Let Gareth move on before either of you makes this worse.",
        intent: "End the comic beat before it becomes explanation",
        next: "old_ending",
        effects: { addMemories: ["survived_pair_roleplay"] }
      }
    ]
  },

  what_she_said: {
    id: "what_she_said",
    phase: "sting",
    title: "What she actually said",
    time: "18:15",
    tone: "intimate-dry",
    cast: ["tabitha", "gareth"],
    prose: [
      "Gareth moves to the next slide while the room copies down a discussion prompt. For thirty seconds nobody is looking at the back row. Tabitha speaks quietly enough that the workshop becomes background noise.",
      "She was nineteen when the original project interviewed her. The question was why young people might become angry with public institutions. She had just watched the council close the youth club and announce a funded programme about youth disengagement in the same month."
    ],
    lines: [
      line("tabitha", "I said closing the youth club and then commissioning research into why teenagers were pissed off was a bit like conducting fire-safety research with a flamethrower."),
      line("tabitha", "Then I called the deputy leader a laminated coward."),
      line("tabitha", "They kept the second bit."),
      line("tabitha", "Which, in fairness, was the more televisual sentence.")
    ],
    actions: [
      {
        id: "said_still",
        label: "Ask whether she still thinks it.",
        intent: "Treat her view as a real position rather than mythology",
        next: "what_she_said_response",
        effects: { setRelation: "taken_seriously", addMemories: ["asked_if_tabitha_still_believes_it"] }
      },
      {
        id: "said_cut",
        label: "‘So they kept the insult and cut the argument.’",
        intent: "Understand how the public symbol was constructed",
        next: "what_she_said_response",
        effects: { setFlags: { understoodSting: true }, setRelation: "understood", addMemories: ["noticed_argument_was_cut"] }
      },
      {
        id: "said_laminated",
        label: "Tell her ‘laminated coward’ is difficult to defend as de-escalation.",
        intent: "Allow Tabitha to have been ridiculous too",
        next: "what_she_said_response",
        effects: { setRelation: "honest", addMemories: ["challenged_laminated_coward_line"] }
      }
    ]
  },

  what_she_said_response: {
    id: "what_she_said_response",
    phase: "sting",
    title: "Older, not cured",
    time: "18:16",
    tone: "warm-dry",
    cast: ["tabitha", "gareth"],
    prose: [
      "A corner of her mouth lifts again. The joke is back, but differently now. You have seen what was underneath it for long enough that the old cartoon on the projector looks flatter than it did five minutes ago."
    ],
    lines: [
      line("tabitha", "I still think the youth club thing was obscene."),
      line("tabitha", "I no longer think public officials should be assessed primarily by laminate content."),
      line("tabitha", "Personal growth.")
    ],
    actions: [
      {
        id: "said_response_continue",
        label: "Look back to the projector with her.",
        intent: "Return to the public scene after a private humanising beat",
        next: "remote_guest",
        effects: { addMemories: ["shared_real_origin_story"] }
      }
    ]
  }
};

export function installExtraNodes(nodes) {
  Object.assign(nodes, EXTRA_NODES);
  for (const action of nodes.warning_signs.actions) action.next = "roleplay";
  for (const action of nodes.sting.actions) action.next = "what_she_said";
  return nodes;
}
