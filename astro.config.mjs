import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import pruneUnusedOriginals from "./src/integrations/prune-unused-originals.ts";
import { iconInclude } from "./src/data/icons.ts";

export default defineConfig({
  // TODO: domain not confirmed by the owner — verify before launch (drives canonical, OG and sitemap URLs).
  site: "https://floraboutique.mk",
  output: "static",
  // ~10 KB of CSS: inlining removes the render-blocking request and lets fonts be discovered from the HTML.
  build: {
    inlineStylesheets: "always",
  },
  integrations: [
    sitemap({ filter: (page) => !page.includes("/type-check") }),
    // Inlined as SVG at build time; only the icons listed in src/data/icons.ts are loaded.
    // No local SVG icons by design. astro-icon always scans a local folder and
    // warns if it's missing, so point it at one that holds no SVGs.
    icon({ include: iconInclude, iconDir: "src/data" }),
    pruneUnusedOriginals(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: {
    defaultLocale: "mk",
    locales: ["mk"],
  },
});
