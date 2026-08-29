import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scenarioRoot = path.dirname(fileURLToPath(import.meta.url));
const prototypesRoot = path.dirname(scenarioRoot);
const harnessRoot = path.join(prototypesRoot, 'narrative-interaction-harness-v002');
const port = Number(process.env.PORT ?? 4188);
const types = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.mjs', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
]);

function targetFor(pathname) {
  if (pathname === '/') return path.join(scenarioRoot, 'index.html');
  const decoded = decodeURIComponent(pathname);
  const harnessPrefix = '/narrative-interaction-harness-v002/';
  if (decoded.startsWith(harnessPrefix)) {
    return path.resolve(harnessRoot, decoded.slice(harnessPrefix.length));
  }
  return path.resolve(scenarioRoot, decoded.slice(1));
}

http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url ?? '/', `http://${request.headers.host ?? 'localhost'}`);
    const target = targetFor(url.pathname);
    const allowed = target === path.join(scenarioRoot, 'index.html')
      || target.startsWith(scenarioRoot + path.sep)
      || target.startsWith(harnessRoot + path.sep);
    if (!allowed) {
      response.writeHead(403).end('Forbidden');
      return;
    }
    const body = await fs.readFile(target);
    response.writeHead(200, { 'content-type': types.get(path.extname(target)) ?? 'application/octet-stream' });
    response.end(body);
  } catch {
    response.writeHead(404).end('Not found');
  }
}).listen(port, '127.0.0.1', () => {
  console.log(`Managed Decline v008: http://127.0.0.1:${port}`);
});
