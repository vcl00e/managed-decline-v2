import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));
const port = Number(process.env.PORT ?? 4173);
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8"
};

const server = http.createServer(async (req, res) => {
  try {
    const pathname = new URL(req.url, `http://${req.headers.host}`).pathname;
    const requested = pathname === "/" ? "/index.html" : pathname;
    const safe = normalize(requested).replace(/^(\.\.(\/|\\|$))+/, "");
    const filepath = join(root, safe);
    const info = await stat(filepath);
    if (!info.isFile()) throw new Error("not a file");
    const body = await readFile(filepath);
    res.writeHead(200, { "content-type": types[extname(filepath)] ?? "application/octet-stream", "cache-control": "no-store" });
    res.end(body);
  } catch {
    res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    res.end("Not found");
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Managed Decline v003: http://127.0.0.1:${port}`);
});
