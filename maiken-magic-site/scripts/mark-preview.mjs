// Turns a normal build into an unmistakable preview: noindex on every page,
// a disallow-all robots.txt, no CNAME, and a "Preview" badge naming the branch.
// Cloudflare runs this (npm run build:preview) for every branch. The live site
// is built by GitHub Actions without it.

import { readdirSync, readFileSync, writeFileSync, existsSync, statSync, rmSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)), "_site");
const branch = process.env.WORKERS_CI_BRANCH || process.env.CF_PAGES_BRANCH || "local";
const sha = (process.env.WORKERS_CI_COMMIT_SHA || process.env.CF_PAGES_COMMIT_SHA || "").slice(0, 7);
const label = `Preview: ${branch}${sha ? " @ " + sha : ""}`.replace(/[<>&"]/g, "");

function walk(dir) {
  return readdirSync(dir).flatMap((n) => {
    const f = join(dir, n);
    return statSync(f).isDirectory() ? walk(f) : [f];
  });
}

for (const file of walk(root).filter((f) => f.endsWith(".html"))) {
  let html = readFileSync(file, "utf8");
  html = html.replace("</head>", `<meta name="robots" content="noindex, nofollow"></head>`);
  html = html.replace("</body>", `<div class="preview-badge" role="status">${label}</div></body>`);
  writeFileSync(file, html);
}

writeFileSync(join(root, "robots.txt"), "User-agent: *\nDisallow: /\n");
if (existsSync(join(root, "CNAME"))) rmSync(join(root, "CNAME"));
console.log(`Marked build as a preview (${label}).`);
