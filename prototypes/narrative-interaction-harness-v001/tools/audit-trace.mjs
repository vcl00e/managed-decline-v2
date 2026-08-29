import fs from 'node:fs';
import process from 'node:process';
import { auditTracePayload } from '../src/trace-audit.js';

const args = process.argv.slice(2);
const expectFailure = args.includes('--expect-failure');
const path = args.find((arg) => !arg.startsWith('--'));

if (!path) {
  console.error('Usage: node tools/audit-trace.mjs <trace.json> [--expect-failure]');
  process.exit(2);
}

const payload = JSON.parse(fs.readFileSync(path, 'utf8'));
const report = auditTracePayload(payload);
console.log(JSON.stringify(report, null, 2));

if (expectFailure) process.exit(report.passed ? 1 : 0);
process.exit(report.passed ? 0 : 1);
