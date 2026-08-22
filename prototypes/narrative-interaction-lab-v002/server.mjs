import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("./", import.meta.url));
const port = Number(process.env.PORT ?? 4173);
const host = process.env.HOST ?? "127.0.0.1";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".svg": "image/svg+xml; charset=utf-8"
};

function safePath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  const requested = decoded === "/" ? "/index.html" : decoded;
  const relative = normalize(requested).replace(/^([/\\])+/, "");
  const resolved = join(root, relative);
  return resolved.startsWith(root) ? resolved : null;
}

const server = createServer(async (request, response) => {
  try {
    const path = safePath(request.url ?? "/");
    if (!path) {
      response.writeHead(403).end("Forbidden");
      return;
    }

    const info = await stat(path);
    if (!info.isFile()) throw new Error("Not a file");
    const body = await readFile(path);
    response.writeHead(200, {
      "content-type": MIME[extname(path)] ?? "application/octet-stream",
      "cache-control": "no-store"
    });
    response.end(body);
  } catch {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
});

server.listen(port, host, () => {
  console.log(`Narrative Interaction Lab v002: http://${host}:${port}`);
});
