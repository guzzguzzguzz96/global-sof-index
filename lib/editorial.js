// Central editorial schema: completeness levels, reliability classifications,
// placeholder detection, unknown-state display strings, and normalizers.
// Pure JS (no imports) so it is safe to import from both Next and node scripts.

// -------------------- Completeness --------------------
export const COMPLETENESS = {
  RICH: "rich",
  BASIC: "basic",
  RESEARCH_PENDING: "research-pending",
};
export const COMPLETENESS_LEVELS = [
  COMPLETENESS.RICH,
  COMPLETENESS.BASIC,
  COMPLETENESS.RESEARCH_PENDING,
];
export const COMPLETENESS_LABELS = {
  [COMPLETENESS.RICH]: "Rich dossier",
  [COMPLETENESS.BASIC]: "Basic dossier",
  [COMPLETENESS.RESEARCH_PENDING]: "Research pending",
};

// -------------------- Reliability --------------------
export const RELIABILITY = {
  VERIFIED: "verified",
  PUBLICLY_DOCUMENTED: "publicly-documented",
  COMMONLY_REPORTED: "commonly-reported",
  HISTORICAL: "historical",
  RESEARCH_PENDING: "research-pending",
};
export const RELIABILITY_LEVELS = [
  RELIABILITY.VERIFIED,
  RELIABILITY.PUBLICLY_DOCUMENTED,
  RELIABILITY.COMMONLY_REPORTED,
  RELIABILITY.HISTORICAL,
  RELIABILITY.RESEARCH_PENDING,
];
export const RELIABILITY_LABELS = {
  [RELIABILITY.VERIFIED]: "Verified / official",
  [RELIABILITY.PUBLICLY_DOCUMENTED]: "Publicly documented",
  [RELIABILITY.COMMONLY_REPORTED]: "Commonly reported",
  [RELIABILITY.HISTORICAL]: "Historical / period-specific",
  [RELIABILITY.RESEARCH_PENDING]: "Research pending",
};

export const REVIEWED_BY = "Global SOF Index Editorial";

// -------------------- Sources --------------------
export const SOURCE_TYPES = [
  "official",
  "government",
  "academic",
  "reputable-media",
  "reference",
  "archive",
];
export const SOURCE_TYPE_LABELS = {
  official: "Official",
  government: "Government",
  academic: "Academic",
  "reputable-media": "Reputable media",
  reference: "Reference",
  archive: "Archive",
};
export const SOURCE_SUPPORTS = ["history", "branch", "equipment", "uniform", "media"];

// -------------------- Source purpose: content vs media provenance --------------------
// A source's `supports` array declares what it substantiates. Media-provenance
// categories document an image/emblem (credit, license, source page); they must
// NOT count toward the content-source minimum used for rich completeness.
export const MEDIA_SUPPORTS = ["media", "image", "image-credit", "image-license", "emblem", "emblem-provenance"];
export const CONTENT_SUPPORTS = ["identity", "history", "branch", "role", "timeline", "equipment", "uniform"];

// A source is media-only when it declares supports and every one is a media
// provenance category (e.g. supports: ["media"]). Such a source is provenance,
// not content.
export function isMediaOnlySource(src) {
  const s = Array.isArray(src && src.supports) ? src.supports : [];
  return s.length > 0 && s.every((t) => MEDIA_SUPPORTS.includes(t));
}

// A content source substantiates at least one non-media claim. A source that
// declares no supports at all is treated as content (legacy sources are never
// silently downgraded).
export function isContentSource(src) {
  return !isMediaOnlySource(src);
}

// Whether a source contributes any media-provenance support at all.
export function isMediaProvenanceSource(src) {
  const s = Array.isArray(src && src.supports) ? src.supports : [];
  return s.some((t) => MEDIA_SUPPORTS.includes(t));
}

export function countContentSources(sources) {
  return (Array.isArray(sources) ? sources : []).filter(isContentSource).length;
}
export function countMediaSources(sources) {
  return (Array.isArray(sources) ? sources : []).filter(isMediaProvenanceSource).length;
}

// -------------------- Placeholder policy --------------------
// Generic filler phrases that must be reported and never displayed as fact.
export const PLACEHOLDER_PHRASES = [
  "อยู่ระหว่างตรวจสอบ",
  "หน่วยปฏิบัติการพิเศษระดับชาติ",
  "เหล่าทัพที่เกี่ยวข้อง",
  "ยังไม่มีข้อมูล",
  "ข้อมูลอยู่ระหว่างรวบรวม",
  "Formation research pending",
  "Public data varies",
  "National special operations",
  "Varies",
  "Unknown unit",
  "TBD",
  "TODO",
];

// Consistent user-facing unknown states.
export const UNKNOWN_STATE = {
  NOT_CONFIRMED: "Not publicly confirmed",
  RESEARCH_PENDING: "Research pending",
  MISSION_DEPENDENT: "Mission-dependent",
  PERIOD_SPECIFIC: "Period-specific",
};

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export function realDateOrNull(value) {
  return ISO_DATE.test(String(value ?? "").trim()) ? String(value).trim() : null;
}

export function isPlaceholder(value) {
  if (typeof value !== "string") return false;
  const v = value.trim();
  if (!v) return false;
  return PLACEHOLDER_PHRASES.some((phrase) => v.includes(phrase));
}

// Returns the value for display, or a consistent unknown state when the value is
// empty or a known placeholder. Never fabricates a fact.
export function displayFact(value, fallback = UNKNOWN_STATE.NOT_CONFIRMED) {
  if (value == null) return fallback;
  const v = String(value).trim();
  if (!v || isPlaceholder(v)) return fallback;
  return v;
}

export function isValidHttpUrl(url) {
  if (typeof url !== "string" || !url.trim()) return false;
  try {
    const parsed = new URL(url.trim());
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

// -------------------- Source normalizer --------------------
// Accepts legacy `{ title, note, url }` and produces the normalized shape without
// inventing publisher, type, access date, or supported categories.
export function normalizeSource(src = {}) {
  return {
    title: typeof src.title === "string" ? src.title : "",
    publisher: typeof src.publisher === "string" ? src.publisher : "",
    url: typeof src.url === "string" ? src.url : "",
    type: SOURCE_TYPES.includes(src.type) ? src.type : null,
    accessedAt: realDateOrNull(src.accessedAt),
    supports: Array.isArray(src.supports) ? src.supports.filter((s) => SOURCE_SUPPORTS.includes(s)) : [],
    notes: typeof src.notes === "string" ? src.notes : (typeof src.note === "string" ? src.note : ""),
  };
}

export function normalizeSources(sources) {
  return (Array.isArray(sources) ? sources : []).map(normalizeSource);
}

// -------------------- Editorial normalizer --------------------
// Computes completeness/reliability from the unit's own content.
//
// `lastReviewed` represents a genuine, unit-by-unit factual and source review.
// It is taken ONLY from an explicit per-unit review date (`reviewedOn`, or a
// `lastReviewed` field on the unit) — never from a generic migration/build date
// such as the legacy `updatedAt`. Until an editor records a real review, it
// stays null. Completeness is derived from content richness and is intentionally
// independent of whether a review date exists.
export function reviewDate(unit) {
  return realDateOrNull(unit && unit.reviewedOn) || realDateOrNull(unit && unit.lastReviewed);
}

export function computeEditorial(unit) {
  const sources = normalizeSources(unit.sources);
  const sourceCount = sources.length;
  // Completeness is driven by CONTENT sources only — media-provenance-only
  // sources (e.g. a Wikimedia Commons file page supporting only "media") do not
  // count toward the minimum.
  const contentSourceCount = countContentSources(unit.sources);
  const mediaSourceCount = countMediaSources(unit.sources);
  const lastReviewed = reviewDate(unit);

  const hasHistory = Boolean(unit.history && unit.history.summary) && !isPlaceholder(unit.history && unit.history.summary);
  const hasFounded = Boolean(unit.founded) && !isPlaceholder(unit.founded);
  const hasBranch = Boolean(unit.branch) && !isPlaceholder(unit.branch);
  const hasRole = Boolean(unit.role);
  const hasTags = Array.isArray(unit.tags) && unit.tags.length > 0;

  let completeness;
  if (hasFounded && hasBranch && hasHistory && hasRole && hasTags && contentSourceCount >= 2) {
    completeness = COMPLETENESS.RICH;
  } else if (hasBranch && hasHistory && hasRole && contentSourceCount >= 1) {
    completeness = COMPLETENESS.BASIC;
  } else {
    completeness = COMPLETENESS.RESEARCH_PENDING;
  }

  // Conservative reliability: research-pending dossiers are pending; documented
  // dossiers are labelled "publicly documented" (never over-claimed as verified).
  const reliability =
    completeness === COMPLETENESS.RESEARCH_PENDING
      ? RELIABILITY.RESEARCH_PENDING
      : RELIABILITY.PUBLICLY_DOCUMENTED;

  return {
    completeness,
    reliability,
    lastReviewed,
    reviewedBy: REVIEWED_BY,
    notes: "",
    sourceCount,
    contentSourceCount,
    mediaSourceCount,
  };
}
