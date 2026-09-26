/**
 * The hero bouquet, drawn at build time as three SVG layers plus one shared
 * <defs>. Everything here is pure and seeded, so every build emits the same
 * markup byte for byte.
 *
 * Coordinates: the ribbon's tie point is 0,0; every layer uses VIEWBOX.
 * Animated elements carry class "a" plus a choreography class and a --d
 * delay; the keyframes live in BouquetArt.astro. Each one animates around its
 * own 0,0, so things drawn off-centre are placed with translate/rotate (see
 * `at`). The glow behind the bouquet and its ground shadow are CSS.
 */

export const VIEWBOX = "-330 -650 660 800";

/** Prefix for gradient ids, so they can't collide with anything else on the page. */
const ID = "bq-";
const url = (id: string) => `url(#${ID}${id})`;

const f = (n: number) => (Math.round(n * 10) / 10).toString();

/** Deterministic randomness (mulberry32), so the bouquet is always composed the same. */
function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Tint = "coral" | "deep" | "blush" | "peach" | "white";

const COLORS: Record<Tint, { base: string; tip: string; core: string }> = {
  coral: { base: "#C4535A", tip: "#F2A38B", core: "#9E3A45" },
  deep: { base: "#8A3143", tip: "#D46F78", core: "#6A2233" },
  blush: { base: "#DE9E9C", tip: "#FDE9E4", core: "#C98080" },
  peach: { base: "#E0946F", tip: "#FDDCC6", core: "#C27152" },
  white: { base: "#E3D7C6", tip: "#FFFFFF", core: "#D8C27E" },
};
const edge = (c: Tint) =>
  c === "white" ? "rgba(140,120,95,.28)" : "rgba(105,35,48,.17)";

const stops = (...s: [number, string, number?][]) =>
  s
    .map(
      ([o, c, a]) =>
        `<stop offset="${o}" stop-color="${c}"${a === undefined ? "" : ` stop-opacity="${a}"`}/>`,
    )
    .join("");
const tall = (id: string, top: string, bottom: string) =>
  `<linearGradient id="${ID}${id}" gradientUnits="userSpaceOnUse" x1="0" y1="-600" x2="0" y2="0">${stops([0, top], [1, bottom])}</linearGradient>`;

/** Every gradient the three layers reference. Rendered once, in a hidden <svg>. */
export function defs(): string {
  let g = "";
  for (const [k, c] of Object.entries(COLORS) as [
    Tint,
    (typeof COLORS)[Tint],
  ][]) {
    g += `<linearGradient id="${ID}pg-${k}" x1="0" y1="1" x2="0" y2="0">${stops([0, c.base], [1, c.tip])}</linearGradient>`;
    // Inner petals; white only comes as a chrysanthemum, which has none.
    if (k !== "white")
      g += `<linearGradient id="${ID}pi-${k}" x1="0" y1="1" x2="0" y2="0">${stops([0, c.core], [1, c.base])}</linearGradient>`;
  }
  g += tall("creamA", "#FBF5EC", "#E8D8C1");
  g += tall("creamB", "#EEE1CD", "#D6C0A1");
  g += tall("kraftA", "#E2C6A2", "#C29B72");
  g += tall("kraftB", "#D2B28A", "#AE875E");
  g += `<linearGradient id="${ID}satin" x1="0" y1="0" x2="1" y2="0">${stops([0, "#A65A5D"], [0.42, "#D89C98"], [0.58, "#C47A78"], [1, "#96494D"])}</linearGradient>`;
  g += `<linearGradient id="${ID}leaf" x1="0" y1="1" x2="0" y2="0">${stops([0, "#688470"], [1, "#A9BEA6"])}</linearGradient>`;
  g += `<linearGradient id="${ID}euca" x1="0" y1="1" x2="1" y2="0">${stops([0, "#87A08F"], [1, "#C3D1BF"])}</linearGradient>`;
  g += `<radialGradient id="${ID}chrys">${stops([0, "#C9B86E"], [1, "#E8D9A0"])}</radialGradient>`;
  return `<defs>${g}</defs>`;
}

/** Animated group. `at` places it with the CSS translate/rotate properties,
    which apply outside the animated `transform`, the same as a wrapper
    <g transform> would, without costing a node. */
const anim = (cls: string, d: number, body: string, at = "") =>
  `<g class="a ${cls}" style="--d:${d}ms${at}">${body}</g>`;
const at = (x: number | string, y: number | string, rot?: number | string) =>
  `;translate:${x}px ${y}px${rot === undefined ? "" : `;rotate:${rot}deg`}`;

/* ── flowers, drawn around 0,0. `rot` is folded into each petal's angle
      instead of costing a wrapper group per flower. ── */

function rose(
  r: number,
  c: Tint,
  d: number,
  seed: number,
  rot: number,
  layers = 4,
): string {
  const R = rng(seed);
  const L = [
    { n: 5, rx: 0.47, ry: 0.56, cy: 0.44, g: "pg" },
    { n: 5, rx: 0.38, ry: 0.46, cy: 0.32, g: "pg" },
    { n: 4, rx: 0.28, ry: 0.34, cy: 0.2, g: "pi" },
    { n: 3, rx: 0.19, ry: 0.22, cy: 0.09, g: "pi" },
  ].slice(4 - layers);
  let s = "";
  L.forEach((l, k) => {
    const off = R() * 72;
    let p = "";
    for (let i = 0; i < l.n; i++) {
      const a = off + (i * 360) / l.n + (R() - 0.5) * 12;
      p += `<ellipse transform="rotate(${f(a + rot)})" cy="${f(-r * l.cy)}" rx="${f(r * l.rx)}" ry="${f(r * l.ry)}" fill="${url(`${l.g}-${c}`)}" stroke="${edge(c)}" stroke-width=".8"/>`;
    }
    s += anim("unfurl", d + (L.length - 1 - k) * 70, p); // inner layers open first
  });
  const k = r * 0.07;
  s += `<path class="a unfurl" style="--d:${d}ms" d="M${f(-k)} 0a${f(k)} ${f(k)} 0 1 1 ${f(2 * k)} 0a${f(r * 0.11)} ${f(r * 0.11)} 0 1 1 ${f(-r * 0.21)} ${f(r * 0.02)}" fill="none" stroke="${COLORS[c].core}" stroke-width="${f(Math.max(1, r * 0.028))}" stroke-linecap="round" opacity=".75"/>`;
  return s;
}

function peony(
  r: number,
  c: Tint,
  d: number,
  seed: number,
  rot: number,
): string {
  const R = rng(seed);
  const L = [
    { n: 9, rx: 0.4, ry: 0.47, cy: 0.52, g: "pg" },
    { n: 8, rx: 0.34, ry: 0.39, cy: 0.37, g: "pg" },
    { n: 6, rx: 0.27, ry: 0.29, cy: 0.22, g: "pi" },
    { n: 5, rx: 0.16, ry: 0.17, cy: 0.08, g: "pi" },
  ];
  let s = "";
  L.forEach((l, k) => {
    const off = R() * 40;
    let p = "";
    for (let i = 0; i < l.n; i++) {
      const a = off + (i * 360) / l.n + (R() - 0.5) * 18;
      const sc = 0.9 + R() * 0.2;
      p += `<ellipse transform="rotate(${f(a + rot)})" cy="${f(-r * l.cy)}" rx="${f(r * l.rx * sc)}" ry="${f(r * l.ry * sc)}" fill="${url(`${l.g}-${c}`)}" stroke="${edge(c)}" stroke-width=".7"/>`;
    }
    s += anim("unfurl", d + (L.length - 1 - k) * 65, p);
  });
  return s;
}

/** Two rings (18 + 12) instead of three; each ring opens as one group. */
function chrys(r: number, d: number, seed: number, rot: number): string {
  const R = rng(seed);
  const rings = [
    { n: 18, rx: 0.1, ry: 0.47, cy: 0.5 },
    { n: 12, rx: 0.09, ry: 0.3, cy: 0.3 },
  ];
  let s = "";
  rings.forEach((ring, k) => {
    const off = R() * 20 + k * 7 + rot;
    let p = "";
    for (let i = 0; i < ring.n; i++) {
      p += `<ellipse transform="rotate(${f(off + (i * 360) / ring.n)})" cy="${f(-r * ring.cy)}" rx="${f(r * ring.rx)}" ry="${f(r * ring.ry)}" fill="${url("pg-white")}" stroke="${edge("white")}" stroke-width=".7"/>`;
    }
    s += anim("ring", d + k * 160, p);
  });
  s += `<circle class="a pop" style="--d:${d + 200}ms" r="${f(r * 0.17)}" fill="${url("chrys")}"/>`;
  return s;
}

type Bloom = {
  t: "rose" | "bud" | "peony" | "chrys";
  x: number;
  y: number;
  r: number;
  c?: Tint;
  rot: number;
};

function flower(o: Bloom, d: number, seed: number): string {
  const c = o.c ?? "white";
  if (o.t === "rose") return rose(o.r, c, d + 120, seed, o.rot);
  if (o.t === "bud") return rose(o.r, c, d + 100, seed, o.rot, 2);
  if (o.t === "peony") return peony(o.r, c, d + 120, seed, o.rot);
  return chrys(o.r, d + 80, seed, o.rot);
}

/* ── composition ── */

const BACK: Bloom[] = [
  { t: "rose", x: 22, y: -512, r: 56, c: "coral", rot: 20 },
  { t: "chrys", x: -126, y: -458, r: 54, rot: 10 },
  { t: "peony", x: 152, y: -446, r: 62, c: "blush", rot: -8 },
  { t: "rose", x: -44, y: -424, r: 50, c: "deep", rot: 40 },
  { t: "bud", x: -222, y: -398, r: 32, c: "peach", rot: 0 },
  { t: "chrys", x: 232, y: -352, r: 44, rot: 0 },
  { t: "bud", x: 96, y: -560, r: 28, c: "blush", rot: 12 },
];
const FRONT: Bloom[] = [
  { t: "rose", x: 6, y: -340, r: 82, c: "coral", rot: 0 },
  { t: "peony", x: -150, y: -324, r: 66, c: "blush", rot: 12 },
  { t: "rose", x: 148, y: -302, r: 60, c: "deep", rot: -20 },
  { t: "chrys", x: -66, y: -250, r: 46, rot: 5 },
  { t: "bud", x: 90, y: -236, r: 34, c: "peach", rot: 30 },
  { t: "rose", x: -238, y: -300, r: 40, c: "peach", rot: 15 },
  { t: "bud", x: 238, y: -262, r: 30, c: "coral", rot: -10 },
];
const EUCA = [
  { x0: -140, y0: -400, cx: -245, cy: -425, x1: -290, y1: -528, n: 6 },
  { x0: 150, y0: -400, cx: 250, cy: -402, x1: 300, y1: -476, n: 5 },
  { x0: -14, y0: -482, cx: -22, cy: -566, x1: -86, y1: -622, n: 5 },
  { x0: 62, y0: -470, cx: 72, cy: -560, x1: 150, y1: -606, n: 4 },
];
const LEAVES = [
  { x: -196, y: -262, a: -118, L: 72 },
  { x: 204, y: -246, a: 116, L: 68 },
  { x: -108, y: -478, a: -34, L: 62 },
  { x: 118, y: -490, a: 30, L: 58 },
  { x: -258, y: -352, a: -96, L: 56 },
  { x: 262, y: -316, a: 96, L: 52 },
];
type Cluster = { x: number; y: number; n: number };
const GYP_BACK: Cluster[] = [
  { x: -190, y: -424, n: 7 },
  { x: 96, y: -444, n: 8 },
  { x: -12, y: -566, n: 6 },
  { x: 196, y: -520, n: 5 },
];
const GYP_FRONT: Cluster[] = [
  { x: 76, y: -398, n: 6 },
  { x: -104, y: -366, n: 7 },
  { x: 204, y: -384, n: 6 },
  { x: -12, y: -238, n: 5 },
  { x: -212, y: -236, n: 5 },
];

type Pt = { x: number; y: number };
const qp = (a: Pt, c: Pt, b: Pt, t: number): Pt => {
  const m = 1 - t;
  return {
    x: m * m * a.x + 2 * m * t * c.x + t * t * b.x,
    y: m * m * a.y + 2 * m * t * c.y + t * t * b.y,
  };
};
const qd = (a: Pt, c: Pt, b: Pt, t: number): Pt => ({
  x: 2 * (1 - t) * (c.x - a.x) + 2 * t * (b.x - c.x),
  y: 2 * (1 - t) * (c.y - a.y) + 2 * t * (b.y - c.y),
});
const lerp = (a: Pt, b: Pt, t: number): Pt => ({
  x: a.x + (b.x - a.x) * t,
  y: a.y + (b.y - a.y) * t,
});

/** A wrapping sheet folded down its middle: two tones, a crease, a bright top edge. */
function panel(
  cls: string,
  d: number,
  apex: Pt,
  a: Pt,
  b: Pt,
  t1: string,
  t2: string,
  lip = false,
): string {
  const aL = { x: apex.x - 7, y: apex.y };
  const aR = { x: apex.x + 7, y: apex.y };
  const m = { x: f((a.x + b.x) / 2), y: f((a.y + b.y) / 2) };
  let s = `<path d="M${aL.x} ${aL.y}L${a.x} ${a.y}L${m.x} ${m.y}L${apex.x} ${apex.y}Z" fill="${url(t1)}"/>`;
  s += `<path d="M${apex.x} ${apex.y}L${m.x} ${m.y}L${b.x} ${b.y}L${aR.x} ${aR.y}Z" fill="${url(t2)}"/>`;
  s += `<path d="M${apex.x} ${apex.y}L${m.x} ${m.y}" stroke="rgba(110,80,50,.2)" stroke-width="1"/>`;
  if (lip) {
    const a2 = lerp(a, apex, 0.075);
    const b2 = lerp(b, apex, 0.075);
    s += `<path d="M${a.x} ${a.y}L${b.x} ${b.y}L${f(b2.x)} ${f(b2.y)}L${f(a2.x)} ${f(a2.y)}Z" fill="${url("kraftA")}"/>`;
  }
  s += `<path d="M${a.x} ${a.y}L${b.x} ${b.y}" stroke="rgba(255,255,255,.6)" stroke-width="1.3"/>`;
  return anim(cls, d, s);
}

/** Circle as two arcs, so many dots can share one <path>. */
const dot = (x: number, y: number, rx: number, ry = rx) =>
  `M${f(x - rx)} ${f(y)}a${f(rx)} ${f(ry)} 0 1 0 ${f(2 * rx)} 0a${f(rx)} ${f(ry)} 0 1 0 ${f(-2 * rx)} 0`;

/** Gypsophila: one path of stalks, one path of flowers, which pop as a group. */
function gyp(o: Cluster, d: number, seed: number): string {
  const R = rng(seed);
  let lines = "";
  let dots = "";
  for (let i = 0; i < o.n; i++) {
    const ang = R() * Math.PI * 2;
    const rad = 8 + R() * 26;
    const x = Math.cos(ang) * rad;
    const y = Math.sin(ang) * rad - 6;
    const r = 2.4 + R() * 1.6;
    R(); // was a per-dot delay; still drawn so the layout matches the original seed
    lines += `M0 30Q${f(x * 0.3)} ${f(y * 0.3 + 10)} ${f(x)} ${f(y)}`;
    dots += dot(x, y, r);
  }
  return (
    `<path transform="translate(${o.x} ${o.y})" d="${lines}" stroke="#8FA592" stroke-width=".9" fill="none" opacity=".7"/>` +
    `<path class="a pop" style="--d:${d}ms${at(o.x, o.y)}" d="${dots}" fill="#FFFFFF" stroke="#E2D6C6" stroke-width=".7"/>`
  );
}

/** Eucalyptus sprig: the stem grows from its base, then round leaves pop along it. */
function euca(s: (typeof EUCA)[number], d: number): string {
  const p0 = { x: s.x0, y: s.y0 };
  const c = { x: s.cx, y: s.cy };
  const p1 = { x: s.x1, y: s.y1 };
  let out = `<path class="a grow" style="--d:${d}ms${at(s.x0, s.y0)}" d="M0 0Q${s.cx - s.x0} ${s.cy - s.y0} ${s.x1 - s.x0} ${s.y1 - s.y0}" fill="none" stroke="#7F9885" stroke-width="2.3" stroke-linecap="round"/>`;
  for (let i = 0; i < s.n; i++) {
    const t = 0.2 + i * (0.78 / (s.n - 1));
    const p = qp(p0, c, p1, t);
    const dv = qd(p0, c, p1, t);
    const ang = (Math.atan2(dv.y, dv.x) * 180) / Math.PI;
    const side = i % 2 ? 1 : -1;
    const k = 1 - t * 0.35;
    out += `<ellipse class="a pop" style="--d:${d + Math.round(t * 560)}ms${at(f(p.x), f(p.y), f(ang))}" cy="${f(side * 10 * k)}" rx="${f(14.5 * k)}" ry="${f(10.5 * k)}" fill="${url("euca")}" stroke="rgba(70,95,78,.3)" stroke-width=".8"/>`;
  }
  return out;
}

function leaf(o: (typeof LEAVES)[number], d: number): string {
  const w = o.L * 0.3;
  return anim(
    "pop",
    d,
    `<path d="M0 0Q${f(w)} ${f(-o.L * 0.45)} 0 ${-o.L}Q${f(-w)} ${f(-o.L * 0.45)} 0 0Z" fill="${url("leaf")}"/>` +
      `<path d="M0 0L0 ${f(-o.L * 0.88)}" stroke="#5E7A66" stroke-width="1.1" opacity=".55"/>`,
    at(o.x, o.y, o.a),
  );
}

function ribbon(d: number): string {
  const satin = url("satin");
  return (
    `<g transform="translate(0 -4)">` +
    anim(
      "tail-l",
      d + 120,
      `<path d="M-4 4C-18 38-28 78-42 122L-29 113L-19 127C-12 88-4 46 7 8Z" fill="${satin}"/>`,
    ) +
    anim(
      "tail-r",
      d + 170,
      `<path d="M4 4C16 34 30 70 34 112L22 105L14 120C12 82 4 44-7 8Z" fill="${satin}"/>`,
    ) +
    anim(
      "loop-l",
      d,
      `<path d="M0 0C-24-36-90-46-96-8C-99 22-52 26 0 0Z" fill="${satin}"/><path d="M-8-3C-26-26-72-32-78-9C-80 8-48 10-8-3Z" fill="#8F4448" opacity=".28"/>`,
    ) +
    anim(
      "loop-r",
      d + 40,
      `<path d="M0 0C24-36 90-46 96-8C99 22 52 26 0 0Z" fill="${satin}"/><path d="M8-3C26-26 72-32 78-9C80 8 48 10 8-3Z" fill="#8F4448" opacity=".28"/>`,
    ) +
    anim(
      "knot",
      d + 60,
      `<rect x="-15" y="-13" width="30" height="26" rx="9" fill="#A55B5E"/><rect x="-9" y="-10" width="7" height="20" rx="3.5" fill="#D59894" opacity=".55"/>`,
    ) +
    `</g>`
  );
}

/** Bouquet layers, back to front. Each is the inner markup of one <svg>. */
export function bouquet(): { far: string; mid: string; near: string } {
  const center = { x: 0, y: -390 };
  const dist = (o: Pt) => Math.hypot(o.x - center.x, o.y - center.y);

  // far: the back wrapping sheets
  let far = panel(
    "paper-c",
    40,
    { x: 0, y: -22 },
    { x: -104, y: -618 },
    { x: 108, y: -626 },
    "creamA",
    "creamB",
  );
  far += panel(
    "paper-l",
    0,
    { x: -8, y: -20 },
    { x: -300, y: -372 },
    { x: -156, y: -560 },
    "kraftA",
    "kraftB",
  );
  far += panel(
    "paper-r",
    60,
    { x: 8, y: -20 },
    { x: 156, y: -560 },
    { x: 300, y: -372 },
    "kraftB",
    "kraftA",
  );

  // mid: stems, eucalyptus, back blooms and gypsophila, front paper, ribbon
  let stems = "";
  let shine = "";
  let cuts = "";
  [-24, -13, -3, 8, 18, 27].forEach((x, i) => {
    const x2 = x * 1.9 + (i % 2 ? 4 : -3);
    const y2 = 116 - (i % 3) * 7;
    stems += `M${x} -30L${f(x2)} ${y2}`;
    shine += `M${x + 1.4} -30L${f(x2 + 1.4)} ${y2}`;
    cuts += dot(x2, y2, 3.4, 1.8);
  });
  let mid = anim(
    "stems",
    120,
    `<path d="${stems}" stroke="#6F8A73" stroke-width="6.5"/><path d="${shine}" stroke="#9DB49F" stroke-width="1.6" opacity=".7"/><path d="${cuts}" fill="#B8CBB5"/>`,
  );

  EUCA.forEach((s, i) => (mid += euca(s, 1080 + i * 110)));

  [...BACK]
    .sort((a, b) => dist(a) - dist(b))
    .forEach((o, i) => {
      const d = 380 + Math.round(dist(o) * 0.9) + i * 40;
      mid += anim("rise", d, flower(o, d, 100 + i), at(o.x, o.y));
    });
  GYP_BACK.forEach((g, i) => (mid += gyp(g, 1580 + i * 90, 300 + i)));

  // Static stand-in for a drop-shadow filter: the outline of both front
  // sheets, nudged down and out, fading in once the paper has opened.
  mid += `<path class="shade" d="M-17 6L-266-294L26-230L270-286L17 6Z" fill="#3A3330" opacity=".09"/>`;
  mid += panel(
    "paper-fl",
    180,
    { x: -6, y: 0 },
    { x: -262, y: -300 },
    { x: 44, y: -232 },
    "creamA",
    "creamB",
    true,
  );
  mid += panel(
    "paper-fr",
    240,
    { x: 6, y: 0 },
    { x: -34, y: -222 },
    { x: 266, y: -292 },
    "creamB",
    "creamA",
    true,
  );
  mid += ribbon(1900);

  // near: rim leaves, front blooms, front gypsophila
  let near = "";
  LEAVES.forEach((l, i) => (near += leaf(l, 1150 + i * 70)));
  [...FRONT]
    .sort((a, b) => dist(a) - dist(b))
    .forEach((o, i) => {
      const d = 800 + i * 95;
      near += anim("place", d, flower(o, d, 200 + i), at(o.x, o.y));
    });
  GYP_FRONT.forEach((g, i) => (near += gyp(g, 1640 + i * 80, 400 + i)));

  return { far, mid, near };
}

/** Falling petals over the hero: HTML, not SVG. Colours are [tip, base]. */
export const fallingPetals = [
  ["#F2A38B", "#C4535A"],
  ["#FDE9E4", "#DE9E9C"],
  ["#FDDCC6", "#E0946F"],
  ["#F2A38B", "#C4535A"],
  ["#FDE9E4", "#DE9E9C"],
].map(([tip, base], i) => ({
  tip,
  base,
  x: [58, 72, 44, 84, 64][i],
  dx: [-60, 40, -90, 30, -40][i],
  dur: +(11 + i * 1.7).toFixed(2),
  delay: +(2.8 + i * 2.1).toFixed(2),
  size: 14 + (i % 3) * 4,
  flutter: +(2.2 + i * 0.35).toFixed(2),
}));
