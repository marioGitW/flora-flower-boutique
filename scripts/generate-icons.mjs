// Generates favicons, touch icons and the Open Graph image from the brand logo.
// Run: npm run icons
// Uses sharp and fontkitten, both already installed as dependencies of Astro.

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { create } from "fontkitten";

const root = fileURLToPath(new URL("..", import.meta.url));
const out = (p) => `${root}public/${p}`;

const LOGO = `${root}brand-images/logo-flora.png`;
const CREAM = "#FBF7F2";
const INK = "#3A3330";
const ROSE_INK = "#9E5656";
const GOLD = "#C9A961";

const fonts = `${root}node_modules/@fontsource-variable`;
const playfair = create(
  await readFile(`${fonts}/playfair-display/files/playfair-display-cyrillic-wght-normal.woff2`),
);
// Upright only: glyphs are drawn without GSUB, so italic would get Russian forms
// of т/п/г/д/б instead of the Macedonian `locl` ones.
const inter = create(await readFile(`${fonts}/inter/files/inter-cyrillic-wght-normal.woff2`));

/** Lays out a single line as SVG paths at the font's default instance. No kerning — fine for short display strings. */
function textPaths(font, text, { size, x, y, fill, tracking = 0, anchor = "start" }) {
  const scale = size / font.unitsPerEm;
  const glyphs = font.glyphsForString(text);
  const advances = glyphs.map((g) => g.advanceWidth * scale + tracking);
  const width = advances.reduce((a, b) => a + b, 0) - tracking;
  let cursor = anchor === "middle" ? x - width / 2 : x;
  const paths = glyphs.map((g, i) => {
    const d = g.path.toSVG();
    const el = `<path transform="translate(${cursor.toFixed(2)} ${y}) scale(${scale} ${-scale})" d="${d}"/>`;
    cursor += advances[i];
    return el;
  });
  return { svg: `<g fill="${fill}">${paths.join("")}</g>`, width };
}

const trimmedLogo = await sharp(LOGO).trim({ threshold: 1 }).toBuffer();

/** Logo centred on an opaque cream square — iOS and Android both expect no transparency. */
async function squareIcon(size, padding, file, source = trimmedLogo) {
  const inner = Math.round(size * (1 - padding * 2));
  const logo = await sharp(source)
    .resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();
  await sharp({ create: { width: size, height: size, channels: 3, background: CREAM } })
    .composite([{ input: logo, gravity: "centre" }])
    .removeAlpha()
    .png({ compressionLevel: 9, palette: true, quality: 90 })
    .toFile(out(file));
}

// At 32px the full wreath and lettering turn to mush; the rose alone stays recognisable.
const roseCrop = await sharp(LOGO)
  .extract({ left: 110, top: 480, width: 320, height: 320 })
  .toBuffer();

await squareIcon(32, 0.02, "favicon-32.png", roseCrop);
await squareIcon(180, 0.06, "apple-touch-icon.png");
await squareIcon(192, 0.06, "icon-192.png");
await squareIcon(512, 0.06, "icon-512.png");

// ── Open Graph 1200×630 ────────────────────────────────────
const W = 1200;
const H = 630;
const logoSize = 500;
const ogLogo = await sharp(trimmedLogo).resize(logoSize, logoSize, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();

const textX = 620 + (W - 620 - 40) / 2;
const name = textPaths(playfair, "Флора", { size: 128, x: textX, y: 280, fill: INK, anchor: "middle" });
const kind = textPaths(playfair, "Бутик за цвеќе", { size: 44, x: textX, y: 352, fill: ROSE_INK, anchor: "middle" });
const city = textPaths(inter, "КУМАНОВО", { size: 26, x: textX, y: 452, fill: INK, tracking: 7, anchor: "middle" });

const overlay = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  ${name.svg}
  ${kind.svg}
  <line x1="${textX - 90}" y1="398" x2="${textX + 90}" y2="398" stroke="${GOLD}" stroke-width="2"/>
  <circle cx="${textX}" cy="398" r="4" fill="${GOLD}"/>
  ${city.svg}
</svg>`;

await sharp({ create: { width: W, height: H, channels: 3, background: CREAM } })
  .composite([
    { input: ogLogo, left: 80, top: Math.round((H - logoSize) / 2) },
    { input: Buffer.from(overlay), left: 0, top: 0 },
  ])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(out("og-image.jpg"));

await writeFile(
  out("site.webmanifest"),
  JSON.stringify(
    {
      name: "Флора — Бутик за цвеќе",
      short_name: "Флора",
      icons: [
        { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
        { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
      theme_color: CREAM,
      background_color: CREAM,
      display: "browser",
    },
    null,
    2,
  ) + "\n",
);

console.log("icons written to public/");
