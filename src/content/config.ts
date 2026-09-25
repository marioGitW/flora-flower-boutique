import { defineCollection, z } from "astro:content";
import { file } from "astro/loaders";

const services = defineCollection({
  loader: file("src/content/services.json"),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    description: z.string(),
    order: z.number(),
  }),
});

// `src` is resolved relative to gallery.json and becomes ImageMetadata,
// so width/height come from the file itself.
const gallery = defineCollection({
  loader: file("src/content/gallery.json"),
  schema: ({ image }) =>
    z.object({
      src: image(),
      alt: z.string(),
      category: z.string(),
    }),
});

export const collections = { services, gallery };
