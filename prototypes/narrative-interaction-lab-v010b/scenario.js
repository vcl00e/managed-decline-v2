import { near } from '../narrative-interaction-harness-v002/src/scenario-contract.js';
import { v010Scenario } from '../narrative-interaction-lab-v010/scenario.js';

const WORLD = v010Scenario.world;
const BUS_DISPLAY = Object.freeze({ x: 438, y: 177 });
const FOX = Object.freeze({ x: 748, y: 386 });

function recordSpatial(state, event, payload = {}) {
  state.trace.push({
    ...payload,
    index: state.trace.length,
    type: 'spatial_event',
    event,
    fictionalTime: state.fictionalTime,
  });
}

function liveFeedback(state, text) {
  state.memory.currentFeedback = text;
  state.memory.feedbackSerial = (state.memory.feedbackSerial ?? 0) + 1;
}

function normalized(vector, fallback = { x: 1, y: 0 }) {
  const length = Math.hypot(vector.x, vector.y);
  if (length < 0.001) return { ...fallback };
  return { x: vector.x / length, y: vector.y / length };
}

function isNarrowSection(state) {
  const { x } = state.player;
  if (state.facts.route === 'high_street') return x >= 365 && x <= 420;
  if (state.facts.route === 'cut_through') return x >= 365 && x <= 425;
  return x >= 805 && x <= 845;
}

function updateHeading(state) {
  const previous = state.memory.lastPlayer ?? state.player;
  const delta = { x: state.player.x - previous.x, y: state.player.y - previous.y };
  const distance = Math.hypot(delta.x, delta.y);
  if (distance > 0.35) {
    const next = normalized(delta, state.memory.travelHeading);
    const current = state.memory.travelHeading ?? next;
    const dot = current.x * next.x + current.y * next.y;
    const blend = dot < -0.35 ? 0.08 : 0.28;
    state.memory.travelHeading = normalized({
      x: current.x * (1 - blend) + next.x * blend,
      y: current.y * (1 - blend) + next.y * blend,
    }, next);
  }
  state.memory.lastPlayer = { ...state.player };
}

function formationHeading(state) {
  const { x, y } = state.player;
  if (
    state.facts.route === 'high_street'
    && x >= 330 && x < 795
    && y >= 130 && y <= 255
  ) {
    return { x: 1, y: 0 };
  }
  if (
    state.facts.route === 'cut_through'
    && x >= 330 && x < 795
    && y >= 315 && y <= 470
  ) {
    return { x: 1, y: 0 };
  }
  return normalized(state.memory.travelHeading);
}

function setFormation(state, mode) {
  if (state.memory.formationMode === mode) return;
  const prior = state.memory.formationMode;
  state.memory.formationMode = mode;
  recordSpatial(state, 'formation_changed', { from: prior, to: mode, route: state.facts.route });

  if (mode === 'single_file' && !state.memory.formationNarrated?.[state.facts.route]) {
    state.memory.formationNarrated[state.facts.route] = true;
    liveFeedback(state, state.facts.route === 'high_street'
      ? 'The pavement pinches around the bus shelter. You fall into single file for a few steps.'
      : 'The gap between the railings narrows. You fall into single file for a few steps.');
  } else if (mode === 'side_by_side' && prior === 'single_file') {
    liveFeedback(state, 'The path opens again and Tabitha comes back alongside you.');
  }
}

function updateFormation(state) {
  if (!state.facts.accompanying || state.stage === 'separating') return;
  updateHeading(state);

  const heading = formationHeading(state);
  const mode = isNarrowSection(state) ? 'single_file' : 'side_by_side';
  setFormation(state, mode);

  const tabitha = state.actors.tabitha;
  if (mode === 'single_file') {
    tabitha.target = {
      x: state.player.x - heading.x * 42,
      y: state.player.y - heading.y * 42,
    };
    return;
  }

  const side = state.memory.companionSide ?? 1;
  const perpendicular = { x: -heading.y * side, y: heading.x * side };
  tabitha.target = {
    x: state.player.x + perpendicular.x * 38 - heading.x * 3,
    y: state.player.y + perpendicular.y * 38 - heading.y * 3,
  };
}

function markJourneyBeat(state, id, text) {
  if (state.memory.journeyBeats[id]) return false;
  state.memory.journeyBeats[id] = true;
  state.facts.journeyBeatCount += 1;
  liveFeedback(state, text);
  recordSpatial(state, 'journey_beat', { id, route: state.facts.route });
  return true;
}

function updateJourneyBeats(state) {
  if (!state.facts.route || state.stage === 'separating' || state.ended) return;
  const { x } = state.player;

  if (state.facts.route === 'high_street') {
    if (x > 430) {
      markJourneyBeat(
        state,
        'high_display_seen',
        'The bus display flickers: 12 MIN → DUE → 12 MIN. Tabitha looks at it, then at you.',
      );
    }
    if (x > 735 && (!state.facts.suggestionPassed || state.facts.stop)) {
      const text = state.facts.stop
        ? 'A bus pulls away and the pavement briefly empties. Tabitha: “There. We survived commerce.”'
        : 'A bus pulls away and the pavement briefly empties. Tabitha stays alongside you.';
      markJourneyBeat(state, 'high_late_stretch', text);
    }
  } else {
    if (x > 435) {
      markJourneyBeat(
        state,
        'quiet_window',
        'An upstairs window reveals somebody doing an elaborate workout in a tiny room. Tabitha: “Strong commitment to being visible.”',
      );
    }
    if (x > 710) {
      state.facts.foxPresent = true;
      if (!state.facts.suggestionPassed || state.facts.stop) {
        markJourneyBeat(
          state,
          'quiet_fox',
          'An urban fox pauses ahead near the path. You and Tabitha both slow a little.',
        );
      }
    }
  }
}

function updateSuggestionPresentation(state) {
  if (!state.facts.suggestionIssued || state.facts.stop || state.facts.suggestionPassed) return;

  if (state.facts.route === 'high_street') {
    if (state.player.x < 480) {
      if (!state.memory.highSuggestionDeferred) {
        state.memory.highSuggestionDeferred = true;
        liveFeedback(state, 'The path opens again and Tabitha comes back alongside you. The bus display keeps changing its mind.');
      }
      return;
    }
    if (!state.memory.highSuggestionPresented) {
      state.memory.highSuggestionPresented = true;
      liveFeedback(state, 'Tabitha glances at the late corner shop. “I could eat something. Your call.”');
    }
    return;
  }

  if (state.facts.route === 'cut_through') {
    if (state.player.x < 500) {
      if (!state.memory.quietSuggestionDeferred) {
        state.memory.quietSuggestionDeferred = true;
        liveFeedback(state, 'The path opens again and Tabitha comes back alongside you. The lit upstairs window is still behind you.');
      }
      return;
    }
    if (!state.memory.quietSuggestionPresented) {
      state.memory.quietSuggestionPresented = true;
      liveFeedback(state, 'Tabitha nods toward the little pocket park. “Five minutes? Or not.”');
    }
  }
}

function updateIgnoredAcknowledgement(state) {
  if (!state.facts.suggestionPassed || state.facts.ignoredSuggestionAcknowledged) return;
  state.facts.ignoredSuggestionAcknowledged = true;
  state.facts.journeyBeatCount += 1;
  const line = state.facts.route === 'high_street'
    ? 'The shop drops behind you. Tabitha glances back once. “No crisps. Severe administration.”'
    : 'The park drops behind you. Tabitha glances back once. “No five minutes. Relentless forward motion.”';
  liveFeedback(state, line);
  recordSpatial(state, 'ignored_suggestion_acknowledged', { route: state.facts.route });
}

function microAction(id, label, point, available, output) {
  return {
    id,
    label,
    repeatable: false,
    durationMinutes: 0,
    priority: 12,
    available(state) {
      return available(state) && near(state.player, point, 76);
    },
    apply(state) {
      const detail = output(state);
      state.facts.journeyBeatCount += 1;
      liveFeedback(state, detail);
      recordSpatial(state, 'micro_action', { id, route: state.facts.route });
      return { kind: 'companionship', output: detail };
    },
  };
}

const actions = {
  ...v010Scenario.actions,
  read_bus_display: microAction(
    'read_bus_display',
    'Look at the bus display with Tabitha',
    BUS_DISPLAY,
    (state) => state.facts.route === 'high_street' && state.memory.journeyBeats.high_display_seen,
    (state) => {
      state.facts.busDisplayChecked = true;
      return 'You both look up. 12 MIN becomes DUE, then 12 MIN again. Tabitha: “Good. Time is circular.”';
    },
  ),
  stop_for_fox: microAction(
    'stop_for_fox',
    'Stop for the fox',
    FOX,
    (state) => state.facts.route === 'cut_through' && state.facts.foxPresent,
    (state) => {
      state.facts.foxStopped = true;
      return 'You both stop. The fox looks back once before slipping away. Tabitha: “We interrupted a meeting.”';
    },
  ),
};

export const v010bScenario = {
  ...v010Scenario,
  id: 'narrative-interaction-lab-v010b',
  title: 'The Way Back — Walking Together',
  subtitle: 'Formation-based accompaniment and an inhabited journey with Tabitha Mercer.',
  browserTitle: 'Managed Decline v010b — Walking Together',
  actions,

  createState(runId) {
    const state = v010Scenario.createState(runId);
    state.scenarioId = 'narrative-interaction-lab-v010b';
    state.facts.ignoredSuggestionAcknowledged = false;
    state.facts.journeyBeatCount = 0;
    state.facts.busDisplayChecked = false;
    state.facts.foxPresent = false;
    state.facts.foxStopped = false;
    state.memory.lastPlayer = { ...state.player };
    state.memory.travelHeading = { x: 1, y: 0 };
    state.memory.companionSide = 1;
    state.memory.formationMode = 'side_by_side';
    state.memory.formationNarrated = {};
    state.memory.journeyBeats = {};
    state.memory.highSuggestionDeferred = false;
    state.memory.highSuggestionPresented = false;
    state.memory.quietSuggestionDeferred = false;
    state.memory.quietSuggestionPresented = false;
    return state;
  },

  meaningfulState(state) {
    return {
      ...v010Scenario.meaningfulState(state),
      formationMode: state.memory.formationMode,
      travelHeading: state.memory.travelHeading,
      journeyBeats: state.memory.journeyBeats,
      journeyBeatCount: state.facts.journeyBeatCount,
      ignoredSuggestionAcknowledged: state.facts.ignoredSuggestionAcknowledged,
      busDisplayChecked: state.facts.busDisplayChecked,
      foxStopped: state.facts.foxStopped,
    };
  },

  tick(state, dtSeconds) {
    v010Scenario.tick(state, dtSeconds);
    updateJourneyBeats(state);
    updateSuggestionPresentation(state);
    updateIgnoredAcknowledgement(state);
    updateFormation(state);
  },

  feedbackText(state) {
    return state.memory.currentFeedback ?? v010Scenario.startingFeedback ?? '';
  },

  render(context, state, h) {
    v010Scenario.render(context, state, h);

    h.rect(396, 111, 72, 118, '#6f756f', '#555a55', 2);
    h.text('BUS', 432, 137, { align: 'center', font: 'bold 9px system-ui', color: '#f0eee8' });
    h.rect(414, 151, 48, 28, '#1f2520', '#949b92', 1);
    h.text('12 MIN', 438, 169, { align: 'center', font: 'bold 8px system-ui', color: '#aee3a4' });

    h.rect(383, 321, 14, 142, '#6d7268');
    h.rect(418, 321, 14, 142, '#6d7268');
    h.text('narrow railings', 408, 438, { align: 'center', font: '9px system-ui', color: '#55594f' });

    h.rect(448, 330, 65, 50, '#71675c', '#5a5148', 2);
    h.rect(458, 338, 45, 28, '#d5b77a');
    h.text('upstairs light', 480, 397, { align: 'center', font: '9px system-ui', color: '#55594f' });

    if (state.facts.foxPresent && !state.facts.foxStopped) {
      h.circle(FOX.x, FOX.y, 9, '#a85c35', '#f3e2cc', 2);
      h.text('fox', FOX.x, FOX.y - 15, { align: 'center', font: '9px system-ui', color: '#5d4d43' });
    }
  },

  endingSummary(state) {
    const base = v010Scenario.endingSummary(state);
    const extras = [];
    if (state.facts.ignoredSuggestionAcknowledged) extras.push('Tabitha visibly acknowledged the stop you declined.');
    if (state.facts.busDisplayChecked) extras.push('You shared the bus-display moment.');
    if (state.facts.foxStopped) extras.push('You stopped together for the fox.');
    return `${base} Journey beats experienced: ${state.facts.journeyBeatCount}.${extras.length ? ` ${extras.join(' ')}` : ''}`;
  },
};
