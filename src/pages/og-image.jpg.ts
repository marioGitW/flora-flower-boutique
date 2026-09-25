import type { APIRoute } from "astro";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import sharp from "sharp";
import { create, type Font } from "fontkitten";
import { images, sourceFile } from "../data/images";
import { site } from "../data/site";
import { copy } from "../data/copy";

// Open Graph image (1200×630), rendered at build time from images.logo.full.

const CREAM = "#FBF7F2";
const INK = "#3A3330";
const ROSE_INK = "#9E5656";
const GOLD = "#C9A961";

const require = createRequire(import.meta.url);
const font = async (file: string): Promise<Font> => {
  const f = create(await readFile(require.resolve(file)));
  if (f.isCollection) throw new Error(`${file} is a font collection, expected a single font`);
  return f;
};

/** Lays out a single line as SVG paths at the font's default instance. No kerning — fine for short display strings. */
function textPaths(
  font: Font,
  text: string,
  { size, x, y, fill, tracking = 0 }: { size: number; x: number; y: number; fill: string; tracking?: number },
) {
  const scale = size / font.unitsPerEm;
  const glyphs = font.glyphsForString(text);
  const advances = glyphs.map((g) => g.advanceWidth * scale + tracking);
  const width = advances.reduce((a, b) => a + b, 0) - tracking;
  let cursor = x - width / 2;
  const paths = glyphs.map((g, i) => {
    const el = `<path transform="translate(${cursor.toFixed(2)} ${y}) scale(${scale} ${-scale})" d="${g.path.toSVG()}"/>`;
    cursor += advances[i];
    return el;
  });
  return `<g fill="${fill}">${paths.join("")}</g>`;
}

export const GET: APIRoute = async () => {
  // Upright only: glyphs are drawn without GSUB, so italic would get Russian forms
  // of т/п/г/д/б instead of the Macedonian `locl` ones.
  const playfair = await font("@fontsource-variable/playfair-display/files/playfair-display-cyrillic-wght-normal.woff2");
  const inter = await font("@fontsource-variable/inter/files/inter-cyrillic-wght-normal.woff2");

  const W = 1200;
  const H = 630;
  const logoSize = 500;
  const logo = await sharp(sourceFile(images.logo.full))
    .trim({ threshold: 1 })
    .resize(logoSize, logoSize, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  const textX = 620 + (W - 620 - 40) / 2;
  const overlay = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    ${textPaths(playfair, site.name, { size: 128, x: textX, y: 280, fill: INK })}
    ${textPaths(playfair, copy.hero.kind, { size: 44, x: textX, y: 352, fill: ROSE_INK })}
    <line x1="${textX - 90}" y1="398" x2="${textX + 90}" y2="398" stroke="${GOLD}" stroke-width="2"/>
    <circle cx="${textX}" cy="398" r="4" fill="${GOLD}"/>
    ${textPaths(inter, site.address.city.toUpperCase(), { size: 26, x: textX, y: 452, fill: INK, tracking: 7 })}
  </svg>`;

  const jpg = await sharp({ create: { width: W, height: H, channels: 3, background: CREAM } })
    .composite([
      { input: logo, left: 80, top: Math.round((H - logoSize) / 2) },
      { input: Buffer.from(overlay), left: 0, top: 0 },
    ])
    .jpeg({ quality: 86, mozjpeg: true })
    .toBuffer();
  return new Response(new Uint8Array(jpg), { headers: { "Content-Type": "image/jpeg" } });
};
