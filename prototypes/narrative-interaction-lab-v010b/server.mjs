import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scenarioRoot = path.dirname(fileURLToPath(import.meta.url));
const prototypesRoot = path.dirname(scenarioRoot);
const runtimeRoot = path.join(prototypesRoot, 'narrative-interaction-harness-v002');
const shellRoot = path.join(prototypesRoot, 'narrative-interaction-harness-v003');
const v010Root = path.join(prototypesRoot, 'narrative-interaction-lab-v010');
const port = Number(process.env.PORT ?? 4211);
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
  const mappings = [
    ['/narrative-interaction-harness-v002/', runtimeRoot],
    ['/narrative-interaction-harness-v003/', shellRoot],
    ['/narrative-interaction-lab-v010/', v010Root],
  ];
  for (const [prefix, root] of mappings) {
    if (decoded.startsWith(prefix)) return path.resolve(root, decoded.slice(prefix.length));
  }
  return path.resolve(scenarioRoot, decoded.slice(1));
}

http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url ?? '/', `http://${request.headers.host ?? 'localhost'}`);
    const target = targetFor(url.pathname);
    const roots = [scenarioRoot, runtimeRoot, shellRoot, v010Root];
    const allowed = target === path.join(scenarioRoot, 'index.html')
      || roots.some((root) => target.startsWith(root + path.sep));
    if (!allowed) return response.writeHead(403).end('Forbidden');
    const body = await fs.readFile(target);
    response.writeHead(200, { 'content-type': types.get(path.extname(target)) ?? 'application/octet-stream' });
    response.end(body);
  } catch {
    response.writeHead(404).end('Not found');
  }
}).listen(port, '127.0.0.1', () => {
  console.log(`Managed Decline v010b: http://127.0.0.1:${port}`);
});
