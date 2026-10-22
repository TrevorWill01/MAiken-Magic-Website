// The M'Aiken Magic sigil: a gear and a magic circle drawn as one object.
// Generated, not hand-drawn, so students can change the tooth count, the rune
// seed, or the ring radii and rebuild. Output is plain inline SVG.

const TAU = Math.PI * 2;
const round = (n) => Math.round(n * 100) / 100;
const polar = (r, a, cx = 300, cy = 300) => [cx + r * Math.cos(a), cy + r * Math.sin(a)];

function gearPath(teeth, rRoot, rTip) {
  const step = TAU / teeth;
  let d = "";
  for (let i = 0; i < teeth; i++) {
    const a0 = i * step - Math.PI / 2;
    const pts = [
      [rRoot, a0 + step * 0.04],
      [rTip, a0 + step * 0.18],
      [rTip, a0 + step * 0.46],
      [rRoot, a0 + step * 0.6],
    ];
    pts.forEach(([r, a], j) => {
      const [x, y] = polar(r, a);
      d += `${i === 0 && j === 0 ? "M" : "L"}${round(x)} ${round(y)} `;
    });
  }
  return d + "Z";
}

function seeded(seed) {
  let s = seed;
  return () => (s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296;
}

// One invented rune: a stem with one to three short strokes. These are not a
// real alphabet, on purpose.
function rune(rand) {
  const parts = ["M0 -8 L0 8"];
  const strokes = 1 + Math.floor(rand() * 3);
  for (let i = 0; i < strokes; i++) {
    const y = -6 + rand() * 12;
    const dir = rand() < 0.5 ? -1 : 1;
    const kind = Math.floor(rand() * 3);
    if (kind === 0) parts.push(`M0 ${round(y)} L${dir * 5} ${round(y - 4)}`);
    else if (kind === 1) parts.push(`M0 ${round(y)} L${dir * 5} ${round(y + 4)}`);
    else parts.push(`M${-dir * 4} ${round(y)} L${dir * 4} ${round(y)}`);
  }
  return parts.join(" ");
}

function polygon(r, sides, rotation) {
  let d = "";
  for (let i = 0; i < sides; i++) {
    const [x, y] = polar(r, rotation + (i * TAU) / sides);
    d += `${i ? "L" : "M"}${round(x)} ${round(y)} `;
  }
  return d + "Z";
}

export function sigil({ label = "" } = {}) {
  const rand = seeded(1102);
  const runes = 36;
  let glyphs = "";
  for (let i = 0; i < runes; i++) {
    const a = (i / runes) * TAU - Math.PI / 2;
    const [x, y] = polar(216, a);
    glyphs += `<path d="${rune(rand)}" transform="translate(${round(x)} ${round(y)}) rotate(${round(
      (a * 180) / Math.PI + 90
    )})"/>`;
  }
  const up = -Math.PI / 2;
  const aria = label ? `role="img" aria-label="${label}"` : `aria-hidden="true"`;
  return `<svg class="sigil" viewBox="0 0 600 600" ${aria} focusable="false" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
<g class="sigil__guides"><path d="M300 6V26M300 574V594M6 300H26M574 300H594" /></g>
<g class="sigil__gear">
<path class="draw d1" pathLength="1" d="${gearPath(24, 252, 272)}"/>
<circle class="draw d2" pathLength="1" cx="300" cy="300" r="236"/>
<circle class="draw d3" pathLength="1" cx="300" cy="300" r="198"/>
<g class="sigil__runes">${glyphs}</g>
</g>
<g class="sigil__core">
<circle class="draw d4" pathLength="1" cx="300" cy="300" r="172"/>
<path class="draw d6" pathLength="1" d="${polygon(86.6, 6, up)}"/>
<circle class="draw d6" pathLength="1" cx="300" cy="300" r="58"/>
<circle class="draw d6" pathLength="1" cx="300" cy="300" r="12"/>
</g>
<g class="sigil__spark" stroke="none"><circle class="halo" cx="300" cy="64" r="15"/><circle class="dot" cx="300" cy="64" r="5"/></g>
</svg>`;
}

// The load-in screen's summoning circle: a gear (the robotics half of the name) around a
// plain ring. Keep it to plain geometry: no runes, letters, or symbols of any kind.
export function summoningCircle() {
  return `<svg class="summon" viewBox="0 0 600 600" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
<path class="summon__ring" pathLength="1" d="${gearPath(30, 236, 258)}"/>
<circle class="summon__ring summon__ring--2" pathLength="1" cx="300" cy="300" r="200"/>
</svg>`;
}

// A small, simplified version for the header and favicon.
export function mark({ stroke = "currentColor", width = 26 } = {}) {
  return `<svg class="mark" viewBox="0 0 600 600" aria-hidden="true" focusable="false" fill="none" stroke="${stroke}" stroke-width="${width}" stroke-linejoin="round" stroke-linecap="round"><path d="${gearPath(
    12,
    248,
    282
  )}"/><circle cx="300" cy="300" r="176"/><path d="${polygon(104, 6, -Math.PI / 2)}"/><circle cx="300" cy="300" r="26"/></svg>`;
}

export function faviconSvg() {
  const inner = mark({ stroke: "#eef1ea", width: 30 })
    .replace(/^<svg[^>]*>/, "")
    .replace(/<\/svg>$/, "");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><rect width="600" height="600" rx="120" fill="#254118"/><g transform="translate(60 60) scale(.8)" fill="none" stroke="#eef1ea" stroke-width="30" stroke-linejoin="round" stroke-linecap="round">${inner}</g></svg>
`;
}
