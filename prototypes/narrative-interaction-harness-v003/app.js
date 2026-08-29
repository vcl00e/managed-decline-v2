import { mountRecoveredApp } from './src/create-app.js';
import { controlScenario } from './scenarios/control-v003.js';

mountRecoveredApp({ scenario: controlScenario });
