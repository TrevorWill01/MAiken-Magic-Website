// Fails the build if the site has a broken internal link or a basic
// accessibility slip. Run it with: npm run check
//
// Checks, for every built page:
//   - each internal href/src points at a file that exists
//   - internal links include the deploy path prefix (when one is set)
//   - exactly one <h1>
//   - every <img> has an alt attribute
//   - the page has a <title>

import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)), "_site");
if (!existsSync(root)) {
  console.error("No _site folder. Run `npm run build` first.");
  process.exit(1);
}

const prefix = (process.env.PATH_PREFIX || "/").replace(/\/?$/, "/");
const problems = [];

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

function resolves(urlPath) {
  const p = decodeURI(urlPath.split("#")[0].split("?")[0]);
  const target = join(root, p);
  if (p.endsWith("/")) return existsSync(join(target, "index.html"));
  return (existsSync(target) && statSync(target).isFile()) || existsSync(join(target, "index.html"));
}

const pages = walk(root).filter((f) => f.endsWith(".html"));
for (const file of pages) {
  const rel = file.slice(root.length);
  const html = readFileSync(file, "utf8");

  if (!/<title>[^<]+<\/title>/.test(html)) problems.push(`${rel}: missing <title>`);
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) problems.push(`${rel}: expected exactly one <h1>, found ${h1s}`);
  for (const img of html.match(/<img\b[^>]*>/g) || []) {
    if (!/\balt=/.test(img)) problems.push(`${rel}: <img> without alt: ${img.slice(0, 80)}`);
  }

  for (const m of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const url = m[1];
    if (!url.startsWith("/") || url.startsWith("//")) continue;
    let local = url;
    if (prefix !== "/") {
      if (!url.startsWith(prefix)) {
        problems.push(`${rel}: "${url}" is missing the path prefix ${prefix} (use the | url filter)`);
        continue;
      }
      local = "/" + url.slice(prefix.length);
    }
    if (!resolves(local)) problems.push(`${rel}: broken link "${url}"`);
  }
}

if (problems.length) {
  console.error(`\n${problems.length} problem(s):\n`);
  for (const p of problems) console.error("  " + p);
  console.error("");
  process.exit(1);
}
console.log(`Checked ${pages.length} pages. No broken links, one h1 each, all images have alt text.`);
