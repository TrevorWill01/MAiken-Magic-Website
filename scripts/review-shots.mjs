// Screenshots pages at desktop and phone width into one self-contained HTML
// file, so a reviewer can check a change without running anything.
//
//   npm run review                          every page
//   npm run review -- review.html --pages=/faqs/,/about/
//
// Needs Playwright and a Chromium build (npm install, then
// npx playwright install chromium). Claude Code environments have both.

import { createServer } from "node:http";
import { readFileSync, writeFileSync, existsSync, statSync } from "node:fs";
import { join, extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)), "_site");
const args = process.argv.slice(2);
const out = args.find((a) => !a.startsWith("--")) || "review.html";
const pagesArg = args.find((a) => a.startsWith("--pages="));
const ALL = ["/", "/about/", "/mentors/", "/programs/", "/robots/", "/events/", "/sponsors/", "/join/", "/faqs/", "/contact/"];
const pages = pagesArg ? pagesArg.slice(8).split(",").filter(Boolean) : ALL;

const types = {
  ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript",
  ".svg": "image/svg+xml", ".woff2": "font/woff2", ".jpg": "image/jpeg", ".png": "image/png",
  ".webp": "image/webp", ".xml": "application/xml", ".txt": "text/plain",
};

const server = createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  let file = join(root, p);
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
  if (!existsSync(file)) { res.writeHead(404); res.end("not found"); return; }
  res.writeHead(200, { "content-type": types[extname(file)] || "application/octet-stream" });
  res.end(readFileSync(file));
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}`;

let chromium;
try {
  ({ chromium } = await import("playwright"));
} catch {
  console.error("Playwright is not installed. Run: npm install && npx playwright install chromium");
  process.exit(1);
}
const launch = { headless: true };
if (process.env.CHROMIUM_PATH) launch.executablePath = process.env.CHROMIUM_PATH;
const browser = await chromium.launch(launch);

const sizes = [
  { name: "Desktop", width: 1280, height: 800 },
  { name: "Phone", width: 390, height: 844 },
];
let html = `<!doctype html><meta charset="utf-8"><title>Review</title>
<style>body{font:16px/1.5 system-ui,sans-serif;margin:2rem;background:#f3f3f3;color:#111}
h1{margin:0 0 1.5rem}h2{margin:2.5rem 0 .75rem;border-top:2px solid #111;padding-top:1rem}
.row{display:flex;gap:2rem;align-items:flex-start;flex-wrap:wrap}figure{margin:0}
figcaption{font-weight:600;margin-bottom:.4rem}img{display:block;max-width:100%;height:auto;border:1px solid #bbb;background:#fff}
.d img{width:760px}.p img{width:260px}</style><h1>Review pages</h1>`;

for (const path of pages) {
  html += `<h2>${path}</h2><div class="row">`;
  for (const s of sizes) {
    const page = await browser.newPage({ viewport: { width: s.width, height: s.height } });
    await page.goto(base + path, { waitUntil: "networkidle" });
    await page.addStyleTag({ content: "*{animation:none!important;transition:none!important}" });
    const png = await page.screenshot({ fullPage: true, type: "jpeg", quality: 70 });
    await page.close();
    html += `<figure class="${s.name === "Desktop" ? "d" : "p"}"><figcaption>${s.name}</figcaption><img alt="${path} at ${s.name} width" src="data:image/jpeg;base64,${png.toString("base64")}"></figure>`;
  }
  html += `</div>`;
}
await browser.close();
server.close();
writeFileSync(out, html);
console.log(`Wrote ${out} (${(html.length / 1048576).toFixed(1)} MB, ${pages.length} pages)`);
