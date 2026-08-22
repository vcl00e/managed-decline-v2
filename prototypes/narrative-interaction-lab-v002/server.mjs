import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gunzipSync } from 'node:zlib';

const root = resolve(fileURLToPath(new URL('.', import.meta.url)));
const payloadRoot = resolve(root, '../../.prototype-upload/narrative-interaction-lab-v002');
const portArgument = process.argv.find((argument) => argument.startsWith('--port='));
const port = Number(portArgument?.split('=')[1] ?? process.env.PORT ?? 4173);
const host = process.env.HOST ?? '127.0.0.1';

if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error(`Invalid port: ${port}`);

const contentTypes = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.md': 'text/markdown; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png',
};

const virtualSources = new Map([
  ['/app.js', ['app.js.gz.b64.00']],
  ['/story.mjs', ['story.mjs.gz.b64.00', 'story.mjs.gz.b64.01', 'story.mjs.gz.b64.02', 'story.mjs.gz.b64.03']],
  ['/styles.css', ['styles.css.gz.b64']],
]);
const virtualCache = new Map();

async function materializedSource(pathname) {
  if (!virtualSources.has(pathname)) return null;
  if (virtualCache.has(pathname)) return virtualCache.get(pathname);
  const encoded = (await Promise.all(virtualSources.get(pathname).map((name) => readFile(resolve(payloadRoot, name), 'utf8')))).join('').replace(/\s+/g, '');
  const source = gunzipSync(Buffer.from(encoded, 'base64'));
  virtualCache.set(pathname, source);
  return source;
}

const server = createServer(async (request, response) => {
  try {
    const requestUrl = new URL(request.url ?? '/', `http://${request.headers.host ?? `${host}:${port}`}`);
    const pathname = decodeURIComponent(requestUrl.pathname);
    const virtual = await materializedSource(pathname);
    if (virtual) {
      sendBuffer(response, 200, virtual, contentTypes[extname(pathname)] ?? 'application/octet-stream', request.method);
      return;
    }

    const relativePath = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
    const target = resolve(root, relativePath);
    if (target !== root && !target.startsWith(`${root}${sep}`)) {
      sendText(response, 403, 'Forbidden\n');
      return;
    }

    let filePath = target;
    const fileStat = await stat(filePath);
    if (fileStat.isDirectory()) filePath = resolve(filePath, 'index.html');
    const body = await readFile(filePath);
    sendBuffer(response, 200, body, contentTypes[extname(filePath).toLowerCase()] ?? 'application/octet-stream', request.method);
  } catch (error) {
    if (error?.code === 'ENOENT') {
      sendText(response, 404, 'Not found\n');
      return;
    }
    console.error(error);
    sendText(response, 500, 'Internal server error\n');
  }
});

server.listen(port, host, () => console.log(`Listening Exercise available at http://${host}:${port}`));

function sendBuffer(response, status, body, contentType, method = 'GET') {
  response.writeHead(status, {
    'Content-Type': contentType,
    'Content-Length': body.length,
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
  });
  if (method === 'HEAD') response.end(); else response.end(body);
}

function sendText(response, status, body) {
  sendBuffer(response, status, Buffer.from(body), 'text/plain; charset=utf-8');
}
