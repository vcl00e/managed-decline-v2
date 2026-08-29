import { mountScenarioApp } from './src/create-app.js';
import { SCENARIOS, scenarioFromLocation } from './scenarios/index.js';

const forcedId = globalThis.__SCENARIO_ID__;
const scenario = forcedId ? SCENARIOS[forcedId] : scenarioFromLocation();
if (!scenario) throw new Error(`Unknown harness scenario: ${forcedId ?? location.search}`);
mountScenarioApp({ scenario });
