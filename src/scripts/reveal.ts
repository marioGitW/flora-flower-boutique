/**
 * Scroll reveal for every [data-reveal] element on the page. When an element's
 * top edge scrolls past 88% of the viewport it gets `.is-revealed`, once, and
 * global.css plays the entrance: a 28px rise and fade, for
 * data-reveal="image" a fade while settling from 1.04 to 1, or for
 * data-reveal="wipe" a clip-path wipe from the bottom up.
 *
 * The hidden starting state only exists under `.js` and
 * prefers-reduced-motion: no-preference, so without JS or with reduced motion
 * everything is visible from the first paint.
 *
 * Stagger: [data-reveal] children of a [data-reveal-stagger] element that come
 * into view together are delayed 70ms apart (or the attribute's value, in ms),
 * in document order. Anything nested inside a revealed element inherits its
 * delay through --reveal-delay.
 */

const STAGGER_MS = 70;

const reveal = (el: HTMLElement) => {
  // Images fade in once they have something to show; before the lazy loader
  // (DeferredPicture) sets src, `complete` is already true, so check src too.
  if (el instanceof HTMLImageElement && (!el.complete || !el.getAttribute("src"))) {
    const done = () => el.classList.add("is-revealed");
    el.addEventListener("load", done, { once: true });
    el.addEventListener("error", done, { once: true });
    return;
  }
  el.classList.add("is-revealed");
};

const inDocumentOrder = (a: Element, b: Element) =>
  a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;

if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver(
    (entries) => {
      const arriving = entries
        .filter((e) => e.isIntersecting)
        .map((e) => e.target as HTMLElement)
        .sort(inDocumentOrder);

      const position = new Map<HTMLElement, number>();
      for (const el of arriving) {
        observer.unobserve(el);

        const group = el.parentElement?.closest<HTMLElement>("[data-reveal-stagger]");
        const outer = el.parentElement?.closest("[data-reveal]");
        // Only the group's own items count, not reveals nested inside them.
        if (group && (!outer || outer.contains(group))) {
          const i = position.get(group) ?? 0;
          position.set(group, i + 1);
          const step = Number(group.dataset.revealStagger) || STAGGER_MS;
          el.style.setProperty("--reveal-delay", `${i * step}ms`);
        }
        reveal(el);
      }
    },
    { rootMargin: "0px 0px -12% 0px" },
  );

  for (const el of document.querySelectorAll("[data-reveal]")) observer.observe(el);
}
