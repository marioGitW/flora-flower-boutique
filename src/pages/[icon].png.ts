import type { APIRoute, GetStaticPaths } from "astro";
import sharp from "sharp";
import { images, sourceFile } from "../data/images";

// Favicon and home-screen icons, rendered at build time from images.logo.mark
// so they can never drift from the artwork the page uses.
const icons = {
  "favicon-32": 32,
  "apple-touch-icon": 180,
  "icon-192": 192,
  "icon-512": 512,
} as const;

export const getStaticPaths = (() =>
  Object.entries(icons).map(([icon, size]) => ({ params: { icon }, props: { size } }))) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const size = props.size as number;
  let icon = sharp(sourceFile(images.logo.mark))
    .trim({ threshold: 1 })
    // Contain on a transparent square: never stretched, and no visible padding colour.
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 }, kernel: "lanczos3" });
  // A light sharpen keeps petal edges from blurring together at tab size.
  if (size <= 32) icon = icon.sharpen({ sigma: 0.5 });
  const png = await icon.png({ compressionLevel: 9 }).toBuffer();
  return new Response(new Uint8Array(png), { headers: { "Content-Type": "image/png" } });
};
