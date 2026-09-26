import type { ImageMetadata } from "astro";

// Fixed site imagery, kept apart from the gallery so gallery photos can be
// swapped (e.g. for background-removed versions) without touching these.
import heroShop from "../assets/images/site/hero-shop.png";
import aboutInterior from "../assets/images/site/about-interior.png";
import momentCar from "../assets/images/site/moment-car.jpg";
import momentBride from "../assets/images/site/moment-bride.jpg";
import logoFull from "../assets/images/site/logo-flora.png";
import logoWordmark from "../assets/images/site/logo-wordmark.png";
import logoMark from "../assets/images/site/logo-mark.png";
import flower from "../assets/images/site/flower-rotate-square.png";

export const images = {
  hero: heroShop,
  /** Shop interior, in the contact section's visit card. */
  interior: aboutInterior,
  // За нас collage. Both are 4:5 portraits, and small originals (~770px wide),
  // so they are only ever shown at collage size, never full width.
  moments: { car: momentCar, bride: momentBride },
  // Square, with the bloom on its centre: the band spins it around the
  // element's centre. A replacement must keep that framing or it will orbit.
  /** Cut-out rose in front of the marquee band. */
  flower,

  // The only place the site points at logo artwork. <Logo>, the favicons and
  // touch icons ([icon].png.ts) and the Open Graph image (og-image.jpg.ts) are
  // all built from these, so new artwork = replace the files or change a path here.
  logo: {
    /** Full circular wreath. Only used large: hero and Open Graph image. */
    full: logoFull,
    // TODO: stopgap until the redesigned artwork arrives. "Flora" lettering
    // masked out of logo-flora.png (inside the gold ring, rose removed) because
    // the full wreath is illegible at header size.
    /** Horizontal wordmark for the header. */
    wordmark: logoWordmark,
    // TODO: stopgap as well: the rose cut out of logo-flora.png. It is only
    // 296px, so the 512px icon is upscaled; the new mark should be ≥ 512px.
    /** Square mark for favicons and home-screen icons. */
    mark: logoMark,
  },
};

/** File on disk behind an imported image, for build-time endpoints that process it with sharp. */
export function sourceFile(img: ImageMetadata): string {
  // Astro sets fsPath on every image import; it is not part of the public type.
  const path = (img as ImageMetadata & { fsPath?: string }).fsPath;
  if (!path) throw new Error(`No source file for ${img.src}`);
  return path;
}
