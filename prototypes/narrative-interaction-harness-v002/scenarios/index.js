import { panelScenario } from './panel.js';
import { parcelScenario } from './parcel.js';

export const SCENARIOS = Object.freeze({
  [panelScenario.id]: panelScenario,
  [parcelScenario.id]: parcelScenario,
});

export function scenarioFromLocation(location = globalThis.location) {
  const params = new URLSearchParams(location?.search ?? '');
  const requested = params.get('scenario') ?? 'panel-fixture';
  return SCENARIOS[requested] ?? null;
}
