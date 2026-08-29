import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT ?? 4180);
const types = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
]);

const server = http.createServer((request, response) => {
  const pathname = new URL(request.url, `http://${request.headers.host}`).pathname;
  const requested = pathname === '/' ? '/index.html' : pathname;
  const target = path.normalize(path.join(root, requested));
  if (!target.startsWith(root)) {
    response.writeHead(403).end('Forbidden');
    return;
  }
  fs.readFile(target, (error, data) => {
    if (error) {
      response.writeHead(404).end('Not found');
      return;
    }
    response.writeHead(200, { 'content-type': types.get(path.extname(target)) ?? 'application/octet-stream' });
    response.end(data);
  });
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Harness available at http://127.0.0.1:${port}`);
});
