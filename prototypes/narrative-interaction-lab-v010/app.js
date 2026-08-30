import { mountRecoveredApp } from '../narrative-interaction-harness-v003/src/create-app.js';
import { v010Scenario } from './scenario.js';

const mounted = mountRecoveredApp({ scenario: v010Scenario });
const situation = document.querySelector('#situation');
const feedback = document.querySelector('#feedback');

function syncSpatialPresentation() {
  situation.textContent = v010Scenario.situationText(mounted.runtime.state);
  feedback.textContent = mounted.runtime.state.memory.currentFeedback
    ?? mounted.runtime.state.visibleChanges.at(-1)?.detail
    ?? v010Scenario.startingFeedback
    ?? '';
  requestAnimationFrame(syncSpatialPresentation);
}

requestAnimationFrame(syncSpatialPresentation);
