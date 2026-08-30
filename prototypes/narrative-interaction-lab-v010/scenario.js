import {
  createBaseState,
  near,
} from '../narrative-interaction-harness-v002/src/scenario-contract.js';

export const WORLD = Object.freeze({
  width: 960,
  height: 560,
  spawn: Object.freeze({ x: 130, y: 340 }),
  hall: Object.freeze({ x: 78, y: 330 }),
  fork: Object.freeze({ x: 320, y: 285 }),
  highStreet: Object.freeze({ x: 500, y: 185 }),
  cutThrough: Object.freeze({ x: 500, y: 385 }),
  shop: Object.freeze({ x: 575, y: 92 }),
  park: Object.freeze({ x: 595, y: 474 }),
  stationEntrance: Object.freeze({ x: 888, y: 250 }),
  forecourtEdge: Object.freeze({ x: 876, y: 392 }),
});

const WALK_NETWORK = Object.freeze([
  Object.freeze({ x: 55, y: 250, w: 275, h: 180 }),
  Object.freeze({ x: 255, y: 105, w: 120, h: 360 }),
  Object.freeze({ x: 330, y: 105, w: 500, h: 145 }),
  Object.freeze({ x: 330, y: 320, w: 500, h: 145 }),
  Object.freeze({ x: 795, y: 105, w: 120, h: 360 }),
  Object.freeze({ x: 835, y: 220, w: 90, h: 205 }),
  Object.freeze({ x: 500, y: 48, w: 150, h: 95 }),
  Object.freeze({ x: 520, y: 425, w: 155, h: 90 }),
]);

function pointInRect(point, rect) {
  return point.x >= rect.x && point.x <= rect.x + rect.w
    && point.y >= rect.y && point.y <= rect.y + rect.h;
}

function nearestPointOnRect(point, rect) {
  return {
    x: Math.max(rect.x, Math.min(rect.x + rect.w, point.x)),
    y: Math.max(rect.y, Math.min(rect.y + rect.h, point.y)),
  };
}

function constrainToWalkNetwork(point) {
  if (WALK_NETWORK.some((rect) => pointInRect(point, rect))) return;
  let nearest = null;
  let nearestDistance = Infinity;
  for (const rect of WALK_NETWORK) {
    const candidate = nearestPointOnRect(point, rect);
    const distance = Math.hypot(point.x - candidate.x, point.y - candidate.y);
    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearest = candidate;
    }
  }
  if (nearest) {
    point.x = nearest.x;
    point.y = nearest.y;
  }
}

function recordSpatial(state, event, payload = {}) {
  state.trace.push({
    ...payload,
    index: state.trace.length,
    type: 'spatial_event',
    event,
    fictionalTime: state.fictionalTime,
  });
}

function setSpatialFeedback(state, text) {
  state.memory.currentFeedback = text;
  state.memory.feedbackSerial = (state.memory.feedbackSerial ?? 0) + 1;
}

function routeCallback(state) {
  if (state.facts.route === 'high_street') {
    if (state.facts.stop === 'shop_salt') return 'Tabitha: “Good route. We acquired salt and vinegar.”';
    if (state.facts.stop === 'shop_chocolate') return 'Tabitha: “Good route. We acquired chocolate.”';
    if (state.facts.stop === 'shop_nothing') return 'Tabitha: “We visited a Londis for cultural reasons.”';
    return 'Tabitha: “Efficient. Brutal, but efficient.”';
  }
  if (state.facts.stop?.startsWith('park_')) {
    return 'Tabitha: “That was better than standing in the hall pretending not to leave.”';
  }
  return 'Tabitha: “You walk like you have somewhere to be.”';
}

function updateRouteFromMovement(state) {
  if (state.facts.route || state.player.x < 365) return;
  if (state.player.y < 270) {
    state.facts.route = 'high_street';
    state.stage = 'walking_high_street';
    setSpatialFeedback(state, 'You lead onto the high street. Tabitha stays beside you.');
    recordSpatial(state, 'route_committed', { route: 'high_street' });
  } else if (state.player.y > 295) {
    state.facts.route = 'cut_through';
    state.stage = 'walking_cut_through';
    setSpatialFeedback(state, 'You take the quieter cut-through. Tabitha stays beside you.');
    recordSpatial(state, 'route_committed', { route: 'cut_through' });
  }
}

function updateSuggestion(state) {
  if (!state.facts.route || state.facts.suggestionIssued || state.player.x < 455) return;
  state.facts.suggestionIssued = true;
  if (state.facts.route === 'high_street') {
    setSpatialFeedback(state, 'Tabitha glances at the late corner shop. “I could eat something. Your call.”');
    recordSpatial(state, 'suggestion', { suggestion: 'shop' });
  } else {
    setSpatialFeedback(state, 'Tabitha nods toward the little pocket park. “Five minutes? Or not.”');
    recordSpatial(state, 'suggestion', { suggestion: 'park' });
  }
}

function updatePassedSuggestion(state) {
  if (!state.facts.suggestionIssued || state.facts.stop || state.facts.suggestionPassed || state.player.x < 700) return;
  state.facts.suggestionPassed = true;
  if (state.facts.route === 'high_street') {
    setSpatialFeedback(state, 'The shop falls behind. Tabitha: “Fine. Starvation route.”');
  } else {
    setSpatialFeedback(state, 'The park falls behind. Tabitha: “Continuous walking it is.”');
  }
  recordSpatial(state, 'suggestion_declined_by_movement', { route: state.facts.route });
}

function updateAccompaniment(state) {
  const tabitha = state.actors.tabitha;
  if (!state.facts.accompanying || state.stage === 'separating') return;
  const distance = Math.hypot(tabitha.x - state.player.x, tabitha.y - state.player.y);
  if (distance > 54) {
    tabitha.target = { x: state.player.x, y: state.player.y };
  } else if (distance < 34) {
    tabitha.target = { x: tabitha.x, y: tabitha.y };
  }
}

function stopChoice(state, id, feedback, response) {
  state.facts.stop = id;
  state.facts.stopCompleted = true;
  state.stage = state.facts.route === 'high_street' ? 'walking_high_street' : 'walking_cut_through';
  setSpatialFeedback(state, feedback);
  return { kind: 'companionship', output: feedback, response };
}

export const v010Scenario = {
  id: 'narrative-interaction-lab-v010',
  title: 'The Way Back',
  subtitle: 'Player-led accompaniment and meaningful movement with Tabitha Mercer.',
  browserTitle: 'Managed Decline v010 — The Way Back',
  startTime: '21:16',
  initialStage: 'leaving_together',
  world: WORLD,
  player: { label: 'YOU', color: '#222622', radius: 15, speed: 185 },
  actors: {
    tabitha: {
      id: 'tabitha',
      name: 'Tabitha Mercer',
      label: 'TAB',
      color: '#bf668b',
      radius: 18,
      speed: 245,
      start: { x: 172, y: 350 },
      initialMood: 'walking with you',
    },
  },
  palette: { backgroundFrom: '#9aa59a', backgroundTo: '#c7bca8' },
  startingFeedback: 'Tabitha looks at the fork. “Which way? I’m not emotionally attached to either pavement.”',
  auditOptions: { maxActions: 14 },

  createState(runId) {
    return createBaseState(v010Scenario, runId, {
      facts: {
        accompanying: true,
        route: null,
        suggestionIssued: false,
        suggestionPassed: false,
        stop: null,
        stopCompleted: false,
        arrived: false,
        separationChosen: false,
      },
      memory: {
        currentFeedback: 'Tabitha looks at the fork. “Which way? I’m not emotionally attached to either pavement.”',
        feedbackSerial: 1,
      },
    });
  },

  meaningfulState(state) {
    return {
      stage: state.stage,
      facts: state.facts,
      route: state.facts.route,
      stop: state.facts.stop,
      accompanying: state.facts.accompanying,
      tabithaTarget: state.actors.tabitha.target,
      ending: state.ending,
    };
  },

  actions: {
    shop_stop: {
      id: 'shop_stop',
      label: 'Go into the corner shop together',
      repeatable: false,
      durationMinutes: 2,
      priority: 20,
      available(state) {
        return state.facts.route === 'high_street'
          && state.facts.suggestionIssued
          && !state.facts.stop
          && !state.facts.suggestionPassed
          && near(state.player, WORLD.shop, 92);
      },
      apply(state) {
        state.stage = 'shop_stop';
        state.mode = 'vn';
        state.currentVN = 'shop';
        setSpatialFeedback(state, 'You turn into the corner shop together.');
        return { kind: 'companionship', output: 'You turn into the corner shop together.' };
      },
    },

    park_stop: {
      id: 'park_stop',
      label: 'Sit for a minute together',
      repeatable: false,
      durationMinutes: 2,
      priority: 20,
      available(state) {
        return state.facts.route === 'cut_through'
          && state.facts.suggestionIssued
          && !state.facts.stop
          && !state.facts.suggestionPassed
          && near(state.player, WORLD.park, 95);
      },
      apply(state) {
        state.stage = 'park_stop';
        state.mode = 'vn';
        state.currentVN = 'park';
        setSpatialFeedback(state, 'You turn into the pocket park together and sit under the tree.');
        return { kind: 'companionship', output: 'You turn into the pocket park together and sit under the tree.' };
      },
    },

    enter_station: {
      id: 'enter_station',
      label: 'Go in with Tabitha to the barriers',
      repeatable: false,
      durationMinutes: 2,
      priority: 30,
      available(state) {
        return Boolean(state.facts.route)
          && state.stage !== 'separating'
          && near(state.player, WORLD.stationEntrance, 82);
      },
      apply(state) {
        state.facts.arrived = true;
        state.stage = 'complete';
        state.ended = true;
        state.ending = 'arrived_together';
        const callback = routeCallback(state);
        setSpatialFeedback(state, `${callback} You go through the station entrance together.`);
        return { kind: 'ending', output: `${callback} You go through the station entrance together.` };
      },
    },

    peel_off: {
      id: 'peel_off',
      label: 'Peel off here',
      repeatable: false,
      durationMinutes: 1,
      priority: 30,
      available(state) {
        return Boolean(state.facts.route)
          && state.stage !== 'separating'
          && near(state.player, WORLD.forecourtEdge, 82);
      },
      apply(state) {
        state.facts.separationChosen = true;
        state.facts.accompanying = false;
        state.stage = 'separating';
        state.actors.tabitha.target = { ...WORLD.stationEntrance };
        const callback = routeCallback(state);
        setSpatialFeedback(state, `${callback} You stop at the forecourt edge. Tabitha: “Right. See you.” She turns toward the station.`);
        return {
          kind: 'position',
          output: `${callback} You stop at the forecourt edge. Tabitha: “Right. See you.” She turns toward the station.`,
        };
      },
    },

    leave_forecourt: {
      id: 'leave_forecourt',
      label: 'Head your own way',
      repeatable: false,
      durationMinutes: 1,
      priority: 40,
      available(state) {
        if (state.stage !== 'separating') return false;
        const tabitha = state.actors.tabitha;
        return Math.hypot(tabitha.x - state.player.x, tabitha.y - state.player.y) > 115;
      },
      apply(state) {
        state.stage = 'complete';
        state.ended = true;
        state.ending = 'separated_forecourt';
        setSpatialFeedback(state, 'Tabitha continues toward the station while you head the other way.');
        return { kind: 'ending', output: 'Tabitha continues toward the station while you head the other way.' };
      },
    },
  },

  vnGraph: {
    shop: {
      id: 'shop',
      title: 'Late corner shop',
      turns: [
        { speaker: 'Tabitha', text: 'Pick something. I’ll judge it.' },
      ],
      prompt: 'What do you pick?',
      choices: [
        {
          id: 'salt',
          label: 'Salt and vinegar.',
          apply(state) {
            return stopChoice(
              state,
              'shop_salt',
              'You come back out with salt-and-vinegar crisps. Tabitha stays beside you.',
              [{ speaker: 'Tabitha', text: 'Correct. Aggressive but correct.' }],
            );
          },
        },
        {
          id: 'chocolate',
          label: 'Chocolate.',
          apply(state) {
            return stopChoice(
              state,
              'shop_chocolate',
              'You come back out with chocolate. Tabitha stays beside you.',
              [{ speaker: 'Tabitha', text: 'Predictable. Fine.' }],
            );
          },
        },
        {
          id: 'nothing',
          label: 'Nothing. Just looking.',
          apply(state) {
            return stopChoice(
              state,
              'shop_nothing',
              'You come back out empty-handed. Tabitha stays beside you.',
              [{ speaker: 'Tabitha', text: 'Window-shopping a Londis. Aspirational.' }],
            );
          },
        },
      ],
    },

    park: {
      id: 'park',
      title: 'Pocket park',
      turns: [
        { speaker: 'Tabitha', text: 'It looks better from over here.' },
      ],
      prompt: 'What do you do?',
      choices: [
        {
          id: 'most_things',
          label: '“Most things do.”',
          apply(state) {
            return stopChoice(
              state,
              'park_joke',
              'You sit for another moment, then stand together and return to the cut-through.',
              [{ speaker: 'Tabitha', text: 'Strong local-planning policy.' }],
            );
          },
        },
        {
          id: 'break',
          label: '“You wanted a break.”',
          apply(state) {
            return stopChoice(
              state,
              'park_break',
              'You sit for another moment, then stand together and return to the cut-through.',
              [{ speaker: 'Tabitha', text: 'Yes. I contain fatigue.' }],
            );
          },
        },
        {
          id: 'quiet',
          label: '[Sit quietly for a moment.]',
          apply(state) {
            return stopChoice(
              state,
              'park_quiet',
              'You sit quietly, then stand together and return to the cut-through.',
              [{ speaker: 'Tabitha', text: 'This is fine.' }],
            );
          },
        },
      ],
    },
  },

  onCancelVN(state, nodeId) {
    state.stage = state.facts.route === 'high_street' ? 'walking_high_street' : 'walking_cut_through';
    setSpatialFeedback(state, nodeId === 'shop'
      ? 'You step back outside with Tabitha. The shop is still there if you want it.'
      : 'You stand again with Tabitha. The park is still there if you want it.');
    return {
      kind: 'companionship',
      output: state.memory.currentFeedback,
    };
  },

  tick(state) {
    constrainToWalkNetwork(state.player);
    constrainToWalkNetwork(state.actors.tabitha);
    updateRouteFromMovement(state);
    updateSuggestion(state);
    updatePassedSuggestion(state);
    updateAccompaniment(state);
  },

  situationText(state) {
    if (state.stage === 'separating') {
      return 'You have stopped at the forecourt edge. Tabitha is walking the last few metres to the station without you.';
    }
    if (!state.facts.route) {
      return 'You and Tabitha are walking to the station. The lit high street is above; the quieter cut-through is below.';
    }
    if (state.player.x > 805) {
      return 'You reach the station forecourt together. Entrance above; the point where you can peel off is below.';
    }
    if (state.facts.route === 'high_street') {
      if (state.facts.stop) return 'Back on the high street together. The station is ahead.';
      if (state.facts.suggestionPassed) return 'The corner shop is behind you. You and Tabitha keep walking toward the station.';
      if (state.facts.suggestionIssued) return 'The late corner shop is open. Turn into it together or simply keep walking.';
      return 'You lead along the brighter, busier high street. Tabitha keeps pace beside you.';
    }
    if (state.facts.stop) return 'Back on the quiet cut-through together. The station is ahead.';
    if (state.facts.suggestionPassed) return 'The pocket park is behind you. You and Tabitha keep walking toward the station.';
    if (state.facts.suggestionIssued) return 'The little pocket park is beside you. Turn into it together or simply keep walking.';
    return 'You lead through the quieter cut-through. There is more room to hear each other.';
  },

  render(_context, state, h) {
    h.rect(25, 28, 910, 504, '#d7d0c2', '#756f65', 2);

    // Hall / starting pavement.
    h.rect(36, 255, 205, 174, '#b9aa91', '#756b59', 2);
    h.text('COMMUNITY HALL', 135, 291, { align: 'center', font: 'bold 12px system-ui', color: '#51493f' });
    h.text('wet pavement', 145, 406, { align: 'center', font: '11px system-ui', color: '#686158' });

    // High street.
    h.rect(250, 106, 590, 142, '#b9b7ad', '#6f6d66', 2);
    h.rect(250, 153, 590, 45, '#747671');
    h.text('HIGH STREET', 442, 133, { font: 'bold 11px system-ui', color: '#4b4d49' });
    h.text('busier · brighter · public', 442, 226, { font: '11px system-ui', color: '#64635e' });
    h.rect(500, 47, 150, 96, '#8a735b', '#5e4b3c', 2);
    h.rect(520, 66, 110, 48, '#e9cf77');
    h.text('LATE SHOP', 575, 96, { align: 'center', font: 'bold 10px system-ui', color: '#493f2f' });
    h.text('OPEN', 575, 124, { align: 'center', font: '9px system-ui', color: '#5a4c38' });

    // Quiet cut-through.
    h.rect(250, 319, 590, 147, '#b7baa9', '#737767', 2);
    h.rect(250, 364, 590, 46, '#8f9383');
    h.text('CUT-THROUGH', 438, 346, { font: 'bold 11px system-ui', color: '#505447' });
    h.text('quieter · less exposed', 438, 449, { font: '11px system-ui', color: '#64685b' });
    h.rect(520, 424, 155, 92, '#93a184', '#5d6a55', 2);
    h.text('POCKET PARK', 598, 450, { align: 'center', font: 'bold 10px system-ui', color: '#f4f0df' });
    h.rect(557, 477, 76, 11, '#6e5b45');
    h.text('bench', 596, 505, { align: 'center', font: '9px system-ui', color: '#f4f0df' });

    // Junctions and station.
    h.rect(250, 196, 121, 172, '#aaa99f');
    h.text('FORK', 310, 286, { align: 'center', font: 'bold 10px system-ui', color: '#55544f' });
    h.rect(796, 196, 120, 172, '#aaa99f');
    h.rect(838, 216, 92, 212, '#929b99', '#59615f', 2);
    h.text('STATION', 884, 244, { align: 'center', font: 'bold 12px system-ui', color: '#f1eee7' });
    h.rect(856, 264, 56, 52, '#d5d9d5');
    h.text('ENTRANCE', 884, 296, { align: 'center', font: '9px system-ui', color: '#3e4442' });
    h.text('FORECOURT', 880, 399, { align: 'center', font: '9px system-ui', color: '#555b58' });

    if (state.facts.route === 'high_street') {
      h.text('your route', 755, 126, { font: 'bold 10px system-ui', color: '#4f4a3e' });
    }
    if (state.facts.route === 'cut_through') {
      h.text('your route', 755, 343, { font: 'bold 10px system-ui', color: '#4f4a3e' });
    }
  },

  stageLabel(state) {
    return {
      leaving_together: 'leaving together',
      walking_high_street: 'high street',
      walking_cut_through: 'cut-through',
      shop_stop: 'corner shop',
      park_stop: 'pocket park',
      separating: 'parting at station',
      complete: 'complete',
    }[state.stage] ?? state.stage.replaceAll('_', ' ');
  },

  endingSummary(state) {
    const route = state.facts.route === 'high_street' ? 'high street' : 'quiet cut-through';
    const stop = state.facts.stop
      ? ` You also made the optional ${state.facts.route === 'high_street' ? 'shop' : 'park'} stop.`
      : ' You kept the walk moving without the optional stop.';
    return state.ending === 'arrived_together'
      ? `You led the walk via the ${route} and went into the station together.${stop}`
      : `You led the walk via the ${route}, then peeled off at the station forecourt.${stop}`;
  },
};
