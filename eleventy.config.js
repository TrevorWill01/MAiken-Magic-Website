import { sigil, mark } from "./lib/sigil.mjs";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

const parse = (iso) => {
  const [y, m, d] = String(iso).split("-").map(Number);
  return { y, m: m - 1, d, t: Date.UTC(y, m - 1, d) };
};

const todayUTC = () => {
  const n = new Date();
  return Date.UTC(n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate());
};

export default function (eleventyConfig) {
  // Static files copied as-is.
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/favicon.png": "favicon.png", "src/apple-touch-icon.png": "apple-touch-icon.png", "src/CNAME": "CNAME" });

  // The sigil and the small mark are generated in lib/sigil.mjs.
  eleventyConfig.addShortcode("sigil", (label) => sigil({ label }));
  eleventyConfig.addShortcode("mark", () => mark());

  // "Sept 18–20, 2026", "Oct 10, 2026", "Dec 30, 2026 – Jan 2, 2027"
  eleventyConfig.addFilter("dateRange", (start, end) => {
    const a = parse(start);
    const b = end ? parse(end) : a;
    if (a.t === b.t) return `${MONTHS[a.m]} ${a.d}, ${a.y}`;
    if (a.y === b.y && a.m === b.m) return `${MONTHS[a.m]} ${a.d}–${b.d}, ${a.y}`;
    if (a.y === b.y) return `${MONTHS[a.m]} ${a.d} – ${MONTHS[b.m]} ${b.d}, ${a.y}`;
    return `${MONTHS[a.m]} ${a.d}, ${a.y} – ${MONTHS[b.m]} ${b.d}, ${b.y}`;
  });

  // Events are "upcoming" until the day after they end. The site rebuilds
  // every day (see .github/workflows/deploy.yml) so this rolls over by itself.
  eleventyConfig.addFilter("upcomingEvents", (events = []) =>
    events
      .filter((e) => parse(e.end || e.start).t >= todayUTC())
      .sort((x, y) => parse(x.start).t - parse(y.start).t)
  );
  eleventyConfig.addFilter("pastEvents", (events = []) =>
    events
      .filter((e) => parse(e.end || e.start).t < todayUTC())
      .sort((x, y) => parse(y.start).t - parse(x.start).t)
  );

  eleventyConfig.addFilter("initials", (name = "") =>
    name.split(/\s+/).filter(Boolean).map((w) => w[0]).slice(0, 2).join("").toUpperCase()
  );
  eleventyConfig.addFilter("money", (n) => "$" + Number(n).toLocaleString("en-US"));
  eleventyConfig.addFilter("hasSponsors", (tiers = []) => tiers.some((t) => (t.sponsors || []).length));
  eleventyConfig.addFilter("byYearDesc", (items = []) => [...items].sort((a, b) => b.year - a.year));
  eleventyConfig.addFilter("byMinDesc", (tiers = []) => [...tiers].sort((a, b) => b.min - a.min));

  eleventyConfig.addGlobalData("buildYear", new Date().getUTCFullYear());

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    // GitHub Pages serves project sites from /<repo>/. The deploy workflow sets
    // PATH_PREFIX; locally and on a custom domain it stays "/".
    pathPrefix: process.env.PATH_PREFIX || "/",
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
