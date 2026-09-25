// Every icon the site uses. UI glyphs are Material Symbols (Rounded), brand
// marks are Simple Icons — nothing else. astro.config.mjs builds the icon
// include list from this map, so adding an icon means adding it here only.
export const icons = {
  phone: "material-symbols:call-rounded",
  place: "material-symbols:location-on-outline-rounded",
  schedule: "material-symbols:schedule-outline-rounded",
  map: "material-symbols:map-outline-rounded",
  external: "material-symbols:open-in-new-rounded",
  arrow: "material-symbols:arrow-forward-rounded",
  close: "material-symbols:close-rounded",
  menu: "material-symbols:menu-rounded",
  "chevron-left": "material-symbols:chevron-left-rounded",
  "chevron-right": "material-symbols:chevron-right-rounded",
  viber: "simple-icons:viber",
  whatsapp: "simple-icons:whatsapp",
  instagram: "simple-icons:instagram",
} as const;

export type IconName = keyof typeof icons;

/** Icon names grouped by set, in the shape astro-icon's `include` option expects. */
export const iconInclude = Object.values(icons).reduce<Record<string, string[]>>((acc, id) => {
  const [set, name] = id.split(":");
  (acc[set] ??= []).push(name);
  return acc;
}, {});
