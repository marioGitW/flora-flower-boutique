const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Keeps Tab / Shift+Tab cycling inside `container`. Native modal dialogs make
 * the page inert but still let Tab escape to the browser UI; this closes that gap.
 * Call from a keydown handler while the container is open.
 */
export function trapTab(container: HTMLElement, e: KeyboardEvent) {
  if (e.key !== "Tab") return;
  const items = [...container.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
    (el) => !el.closest("[inert]") && el.getClientRects().length > 0,
  );
  if (items.length === 0) return;
  const i = items.indexOf(document.activeElement as HTMLElement);
  const last = items.length - 1;
  if (e.shiftKey && i <= 0) {
    e.preventDefault();
    items[last].focus();
  } else if (!e.shiftKey && (i === last || i === -1)) {
    e.preventDefault();
    items[0].focus();
  }
}
