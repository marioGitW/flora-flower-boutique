/**
 * Damped-spring easing as a CSS linear() curve, sampled at build time.
 * `zeta` is the damping ratio: lower overshoots more.
 */
function spring(zeta: number, samples: number): string {
  const w = 6.4 / zeta;
  const wd = w * Math.sqrt(1 - zeta * zeta);
  const pts: string[] = [];
  for (let i = 0; i <= samples; i++) {
    const t = i / samples;
    pts.push(
      (
        1 -
        Math.exp(-zeta * w * t) *
          (Math.cos(wd * t) + ((zeta * w) / wd) * Math.sin(wd * t))
      ).toFixed(4),
    );
  }
  pts[pts.length - 1] = "1";
  return `linear(${pts.join(", ")})`;
}

/**
 * Inline custom properties for an element whose descendants animate with
 * var(--spring) / var(--spring-soft). The cubic-bezier fallbacks and the
 * @supports switch live in the stylesheet (see Hero.astro).
 */
export const springVars = `--spring-linear:${spring(0.56, 56)};--spring-soft-linear:${spring(0.8, 40)}`;
