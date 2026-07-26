// Compare-mode helpers. Pure data utilities with no React or browser-only
// imports, so this module is safe to use from server components, client
// components, and node scripts alike. Browser APIs are touched only inside the
// storage helpers, which guard for `window` themselves.

export const COMPARE_STORAGE_KEY = "global-sof-index-compare";
export const MIN_COMPARE = 2;
export const MAX_COMPARE = 4;

// The provider, dock and toggles only ever need identity-level fields. Dossier
// prose (history, equipment, uniform, sources) is deliberately excluded so the
// compare feature never pushes editorial content into the client bundle.
export function toCompareRef(unit) {
  return {
    slug: unit.slug,
    code: unit.code,
    name: unit.name,
    country: unit.country,
    iso2: unit.iso2 || "",
    continent: unit.continent,
    tier: unit.tier,
  };
}

// Normalizes an untrusted slug list from any origin (localStorage, query
// string, component props): coerces to trimmed lowercase strings, drops slugs
// that no longer map to a unit, removes duplicates, and caps the result at
// MAX_COMPARE. Never throws, and always returns a new array.
export function sanitizeSlugs(input, validSlugs) {
  const list = Array.isArray(input) ? input : [];
  const valid = validSlugs instanceof Set ? validSlugs : new Set(validSlugs || []);
  const out = [];
  for (const raw of list) {
    if (typeof raw !== "string") continue;
    const slug = raw.trim().toLowerCase();
    if (!slug || !valid.has(slug) || out.includes(slug)) continue;
    out.push(slug);
    if (out.length >= MAX_COMPARE) break;
  }
  return out;
}

// Parses the `units` query parameter. Next.js hands back either a string or an
// array (when the parameter is repeated); both are accepted, and any other
// shape — including a missing parameter — yields an empty selection.
export function parseUnitsParam(value, validSlugs) {
  const raw = Array.isArray(value) ? value.join(",") : value;
  if (typeof raw !== "string") return [];
  return sanitizeSlugs(raw.split(","), validSlugs);
}

export function buildCompareHref(slugs) {
  const list = (Array.isArray(slugs) ? slugs : []).filter(Boolean);
  if (!list.length) return "/compare";
  return `/compare?units=${list.map(encodeURIComponent).join(",")}`;
}

// Reads the persisted selection. Malformed JSON, a non-array payload, a slug
// for a unit that has since left the dataset, or storage being unavailable
// (private mode, blocked cookies) all resolve to a safe empty selection.
export function readStoredSlugs(validSlugs) {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(COMPARE_STORAGE_KEY);
    if (!raw) return [];
    return sanitizeSlugs(JSON.parse(raw), validSlugs);
  } catch {
    return [];
  }
}

export function writeStoredSlugs(slugs) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(COMPARE_STORAGE_KEY, JSON.stringify(slugs));
  } catch {
    // Storage full, disabled, or unavailable — the selection simply stays
    // in memory for this session rather than breaking the interaction.
  }
}
