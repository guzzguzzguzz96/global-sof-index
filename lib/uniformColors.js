// Central editorial reference for uniform base-color swatches and camouflage
// pattern previews.
//
// IMPORTANT — these hex values are APPROXIMATE visual references for editorial
// orientation only. They are NOT official issue colors and must never be
// presented as an authoritative colour standard. Real-world appearance varies
// with lighting, camera processing, fabric age, weather, and manufacturer.
// Use `visualHex` (approximate) — never `officialHex`.
//
// Pure JS (no imports) so it is safe to use from both Next and node scripts.

// Approximate UI colours keyed by lower-cased colour name.
export const APPROX_COLOR_HEX = {
  "ranger green": "#4b5543",
  "coyote brown": "#81613c",
  "coyote": "#8a6a41",
  "olive drab": "#5a5a3c",
  "olive": "#5a5a2f",
  "black": "#181a1c",
  "neutral gray": "#6e7072",
  "neutral grey": "#6e7072",
  "gray": "#6e7072",
  "grey": "#6e7072",
  "navy blue": "#1f2a44",
  "dark navy": "#1f2a44",
  "navy": "#1f2a44",
  "tan": "#c2a878",
  "khaki": "#c2a878",
  "tan / khaki": "#c2a878",
  "brown": "#6b4f32",
};

// Descriptor phrases that mean "no supportable, concrete claim" — the caller
// renders a Research-pending state instead of a swatch/tile. We never fabricate
// a colour or pattern for these.
const PENDING_TOKENS = [
  "research pending",
  "research-pending",
  "mission dependent",
  "mission-dependent",
  "อยู่ระหว่างตรวจสอบ",
];

export function isPendingLabel(name) {
  return PENDING_TOKENS.includes(String(name || "").trim().toLowerCase());
}

// Resolve an approximate hex for a colour name. Returns null when the name is
// not a concrete colour we can approximate (e.g. "Mission-specific neutral
// colors") — in that case the UI shows the text label with no swatch.
export function approxHexFor(name) {
  if (typeof name !== "string") return null;
  const key = name.trim().toLowerCase();
  if (!key) return null;
  if (APPROX_COLOR_HEX[key]) return APPROX_COLOR_HEX[key];
  // Loose contains-match for compound names such as "Coyote / tan" or
  // "Maritime black / dark neutral".
  for (const [k, hex] of Object.entries(APPROX_COLOR_HEX)) {
    if (key.includes(k)) return hex;
  }
  return null;
}

// Normalise a colour entry. Accepts a legacy string OR a structured object:
//   { name, visualHex, confidence, isApproximate, sourceRefs }
// For legacy strings we NEVER infer confidence or source refs — they stay
// null/empty and the swatch is flagged approximate.
export function normalizeColorItem(item) {
  if (item == null) return null;
  if (typeof item === "string") {
    const name = item.trim();
    if (!name) return null;
    return { name, visualHex: approxHexFor(name), confidence: null, isApproximate: true, sourceRefs: [] };
  }
  if (typeof item === "object") {
    const name = typeof item.name === "string" ? item.name.trim() : "";
    if (!name) return null;
    const explicit = typeof item.visualHex === "string" && item.visualHex.trim() ? item.visualHex.trim() : null;
    return {
      name,
      visualHex: explicit || approxHexFor(name),
      confidence: typeof item.confidence === "string" ? item.confidence : null,
      isApproximate: item.isApproximate !== false,
      sourceRefs: Array.isArray(item.sourceRefs) ? item.sourceRefs : [],
    };
  }
  return null;
}

export function normalizeColorList(values) {
  return (Array.isArray(values) ? values : [])
    .map(normalizeColorItem)
    .filter(Boolean)
    .filter((it) => !isPendingLabel(it.name));
}

// Normalise a camouflage pattern entry. Accepts a legacy string OR an object:
//   { name, confidence, image, license }
// A pattern is only treated as a real image reference when BOTH a local image
// path and a license string are present; otherwise it renders as a clearly
// labelled illustrative editorial preview (never an unlicensed remote image).
export function normalizePatternItem(item) {
  if (item == null) return null;
  if (typeof item === "string") {
    const name = item.trim();
    if (!name) return null;
    return { name, confidence: null, image: null, license: null, isIllustrative: true };
  }
  if (typeof item === "object") {
    const name = typeof item.name === "string" ? item.name.trim() : "";
    if (!name) return null;
    const hasVerifiedImage =
      typeof item.image === "string" && item.image.trim() &&
      typeof item.license === "string" && item.license.trim();
    return {
      name,
      confidence: typeof item.confidence === "string" ? item.confidence : null,
      image: hasVerifiedImage ? item.image.trim() : null,
      license: hasVerifiedImage ? item.license.trim() : null,
      isIllustrative: !hasVerifiedImage,
    };
  }
  return null;
}

export function normalizePatternList(values) {
  return (Array.isArray(values) ? values : [])
    .map(normalizePatternItem)
    .filter(Boolean)
    .filter((it) => !isPendingLabel(it.name));
}

// Shared, human-readable confidence labels for swatches and tiles.
export const UNIFORM_CONFIDENCE_LABELS = {
  verified: "Verified",
  "publicly-documented": "Publicly documented",
  documented: "Publicly documented",
  "commonly-reported": "Commonly reported",
  reported: "Commonly reported",
  historical: "Historical",
  "mission-dependent": "Mission-dependent",
};

export function confidenceLabel(confidence) {
  if (!confidence) return null;
  return UNIFORM_CONFIDENCE_LABELS[confidence] || confidence;
}
