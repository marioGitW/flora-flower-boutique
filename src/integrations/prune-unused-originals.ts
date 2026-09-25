import type { AstroIntegration } from "astro";
import { readdir, readFile, rm } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Content-collection images declared with `image()` always have their original
 * file copied into dist/_astro: resolving the entry walks every key of the image
 * metadata, which Astro counts as "the original is used". <Picture> also emits
 * a full-size base file per format that its <source> never links. None of these
 * are served, so this removes any raster in _astro that no emitted HTML, CSS
 * or JS file mentions.
 */
export default function pruneUnusedOriginals(): AstroIntegration {
  return {
    name: "flora:prune-unused-originals",
    hooks: {
      "astro:build:done": async ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        const assetsDir = join(root, "_astro");

        const textFiles: string[] = [];
        const walk = async (d: string) => {
          for (const entry of await readdir(d, { withFileTypes: true })) {
            const p = join(d, entry.name);
            if (entry.isDirectory()) await walk(p);
            else if (/\.(html|css|js|mjs|xml|json|webmanifest)$/.test(entry.name)) textFiles.push(p);
          }
        };
        await walk(root);
        const corpus = (await Promise.all(textFiles.map((f) => readFile(f, "utf8")))).join("\n");

        const candidates = (await readdir(assetsDir)).filter((f) => /\.(png|jpe?g|webp|avif)$/i.test(f));
        const unused = candidates.filter((f) => !corpus.includes(f));
        await Promise.all(unused.map((f) => rm(join(assetsDir, f))));

        if (unused.length) logger.info(`removed ${unused.length} unreferenced image(s)`);
      },
    },
  };
}
