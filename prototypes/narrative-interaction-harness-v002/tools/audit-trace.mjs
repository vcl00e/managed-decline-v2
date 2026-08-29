import fs from 'node:fs';
import { auditTracePayload } from '../src/trace-audit.js';

const [file, flag] = process.argv.slice(2);
if (!file) {
  console.error('Usage: node tools/audit-trace.mjs <trace.json> [--expect-failure]');
  process.exit(2);
}
const payload = JSON.parse(fs.readFileSync(file, 'utf8'));
const result = auditTracePayload(payload);
console.log(JSON.stringify(result, null, 2));
const expectFailure = flag === '--expect-failure';
if (expectFailure ? result.passed : !result.passed) process.exit(1);
