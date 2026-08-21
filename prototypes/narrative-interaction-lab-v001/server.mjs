import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));
const port = Number.parseInt(process.env.PORT ?? "4173", 10);
const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".svg": "image/svg+xml"
};

function safePath(urlPath) {
  const withoutQuery = decodeURIComponent(urlPath.split("?")[0]);
  const requested = withoutQuery === "/" ? "/index.html" : withoutQuery;
  const normalised = normalize(requested).replace(/^([.][.][/\\])+/, "");
  const resolved = join(root, normalised);
  if (!resolved.startsWith(root)) {
    throw new Error("Path escapes prototype root");
  }
  return resolved;
}

const server = createServer(async (request, response) => {
  try {
    let path = safePath(request.url ?? "/");
    const info = await stat(path);
    if (info.isDirectory()) path = join(path, "index.html");
    const body = await readFile(path);
    response.writeHead(200, {
      "Content-Type": mime[extname(path)] ?? "application/octet-stream",
      "Cache-Control": "no-store"
    });
    response.end(body);
  } catch (error) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end(`Not found\n${error instanceof Error ? error.message : String(error)}`);
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Narrative Interaction Lab running at http://127.0.0.1:${port}`);
});
