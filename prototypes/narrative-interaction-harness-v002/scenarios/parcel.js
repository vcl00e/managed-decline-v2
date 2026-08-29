import { createBaseState, near } from '../src/scenario-contract.js';

const WORLD = Object.freeze({
  width: 780,
  height: 450,
  spawn: Object.freeze({ x: 76, y: 348 }),
  parcel: Object.freeze({ x: 244, y: 326 }),
  lift: Object.freeze({ x: 650, y: 188 }),
});

export const parcelScenario = {
  id: 'parcel-fixture',
  title: 'Harness fixture B — Misdelivered parcel',
  subtitle: 'A second scenario proving that the shell is not coupled to Ari, panels, or doors.',
  browserTitle: 'Narrative Interaction Harness v002 — Parcel fixture',
  startTime: '12:17',
  initialStage: 'approach_parcel',
  world: WORLD,
  player: { label: 'YOU', color: '#272b31', radius: 15, speed: 195 },
  actors: {
    nia: {
      id: 'nia',
      name: 'Nia',
      label: 'NIA',
      color: '#a0697b',
      radius: 18,
      speed: 160,
      start: { x: 205, y: 312 },
    },
  },
  palette: { backgroundFrom: '#b8c5cb', backgroundTo: '#d8c8b5' },
  startingNotice: 'Move toward Nia and the parcel.',

  createState(runId) {
    return createBaseState(parcelScenario, runId, {
      facts: {
        parcelLifted: false,
        addressRead: false,
        carriedUpstairs: false,
        leftAtDesk: false,
      },
    });
  },

  meaningfulState(state) {
    return {
      stage: state.stage,
      facts: state.facts,
      niaTarget: state.actors.nia.target,
      ending: state.ending,
    };
  },

  actions: {
    lift_parcel: {
      id: 'lift_parcel',
      label: 'Help Nia lift the parcel',
      repeatable: false,
      durationMinutes: 2,
      available(state) {
        return state.stage === 'approach_parcel' && near(state.player, WORLD.parcel, 115);
      },
      apply(state) {
        state.facts.parcelLifted = true;
        state.stage = 'read_address';
        state.actors.nia.target = { x: 268, y: 306 };
        return {
          kind: 'physical',
          output: 'You take one side. The crushed address label turns upward.',
        };
      },
    },

    read_address: {
      id: 'read_address',
      label: 'Read the crushed address label',
      repeatable: false,
      durationMinutes: 1,
      available(state) {
        return state.stage === 'read_address' && near(state.player, WORLD.parcel, 125);
      },
      apply(state) {
        state.facts.addressRead = true;
        state.stage = 'parcel_exchange';
        state.mode = 'vn';
        state.currentVN = 'parcel_question';
        return {
          kind: 'discovery',
          output: 'The surviving line reads FLAT 2B. The lobby desk is marked UNATTENDED.',
        };
      },
    },

    resume_parcel_exchange: {
      id: 'resume_parcel_exchange',
      label: 'Continue talking about the parcel',
      repeatable: true,
      durationMinutes: 0,
      available(state) {
        return state.stage === 'parcel_paused' && near(state.player, WORLD.parcel, 135);
      },
      apply(state) {
        state.stage = 'parcel_exchange';
        state.mode = 'vn';
        state.currentVN = state.memory.pausedVN ?? 'parcel_question';
        state.memory.pausedVN = null;
        return {
          kind: 'situation',
          output: 'You return to the half-lifted parcel and finish the thought.',
        };
      },
    },

    reach_lift: {
      id: 'reach_lift',
      label: 'Carry the parcel to the lift with Nia',
      repeatable: false,
      durationMinutes: 3,
      available(state) {
        return state.stage === 'follow_nia' && near(state.player, WORLD.lift, 130);
      },
      apply(state) {
        state.facts.carriedUpstairs = true;
        state.stage = 'complete';
        state.ended = true;
        state.ending = 'lift_reached';
        return {
          kind: 'ending',
          output: 'The lift doors open. The parcel and both of you fit, just.',
        };
      },
    },
  },

  vnGraph: {
    parcel_question: {
      id: 'parcel_question',
      title: 'Flat 2B',
      turns: [
        { speaker: 'Nia', text: 'Two-B. That is upstairs.' },
        { speaker: 'Nia', text: 'The desk has been unattended since Tuesday.' },
      ],
      prompt: 'Where should it go?',
      choices: [
        {
          id: 'take_upstairs',
          label: 'Take it up.',
          apply(state) {
            state.stage = 'follow_nia';
            state.actors.nia.target = { ...WORLD.lift };
            return {
              kind: 'situation',
              output: 'Nia nods toward the lift and keeps hold of her side.',
              response: [
                { speaker: 'You', text: 'Upstairs.' },
                { speaker: 'Nia', text: 'Good. Do not let go on the corner.' },
              ],
            };
          },
        },
        {
          id: 'leave_at_desk',
          label: 'Leave it by the desk.',
          apply(state) {
            state.facts.leftAtDesk = true;
            state.stage = 'complete';
            state.ended = true;
            state.ending = 'desk';
            return {
              kind: 'ending',
              output: 'You set it beneath the UNATTENDED sign. The harness run is complete.',
              response: [
                { speaker: 'You', text: 'The desk can have it.' },
                { speaker: 'Nia', text: 'Brave of you to trust the desk.' },
              ],
            };
          },
        },
      ],
    },
  },

  onCancelVN(state) {
    state.stage = 'parcel_paused';
    return {
      kind: 'situation',
      output: 'The decision pauses. Nia keeps one hand on the parcel.',
    };
  },

  render(_context, state, h) {
    h.rect(142, 68, 560, 304, '#e6e3dc', '#778087', 3);
    h.rect(560, 112, 122, 160, '#66747d');
    h.rect(572, 124, 98, 136, '#b7c0c4');
    h.text('LIFT', WORLD.lift.x, 104, { align: 'center', font: 'bold 12px system-ui' });
    h.rect(180, 248, 126, 58, '#74716c');
    h.text('UNATTENDED', 243, 278, { align: 'center', color: '#f4eee3', font: '10px system-ui' });
    h.rect(WORLD.parcel.x - 34, WORLD.parcel.y - 28, 68, 52,
      state.facts.parcelLifted ? '#c7a777' : '#ad875c', '#6f5239', 2);
    h.text(state.facts.addressRead ? 'FLAT 2B' : 'CRUSHED LABEL', WORLD.parcel.x, WORLD.parcel.y + 3, {
      align: 'center', font: '10px system-ui',
    });
    h.text('fixture B: different world, actor, object, clock, and ending', 158, 94, {
      color: '#474f54', font: '12px system-ui',
    });
  },

  endingSummary(state) {
    return state.ending === 'lift_reached'
      ? 'Nia and the player carried the parcel to the lift.'
      : 'The parcel was left beneath the unattended sign.';
  },
};
