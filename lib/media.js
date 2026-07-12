// Central media resolution — one source of truth for the fallback hierarchy so
// the cards, featured dossiers, and the audit script all agree.

export const MEDIA_LABELS = {
  verified: "VERIFIED MEDIA",
  "official-emblem": "OFFICIAL EMBLEM",
  editorial: "EDITORIAL VISUAL",
  representative: "REPRESENTATIVE MEDIA",
  pending: "MEDIA RESEARCH PENDING",
};

// Fallback hierarchy: verified photo > official emblem > editorial > representative > pending.
// An official emblem is preferred over a merely representative photo so we never
// lean on an unrelated stock military image to stand in for a specific unit.
export function pickMediaMode({ cover, emblem, coverFailed = false, emblemFailed = false } = {}) {
  const status = cover?.status || "pending";
  const hasCover = Boolean(cover?.src) && !coverFailed;
  const hasEmblem = Boolean(emblem?.src) && !emblemFailed;

  if (hasCover && status === "verified") return "verified";
  if (hasEmblem) return "official-emblem";
  if (hasCover && (status === "editorial" || status === "representative")) return status;
  return "pending";
}

// Failure-free summary for reporting/auditing.
export function summarizeMedia(unit) {
  const cover = unit?.media?.cover || {};
  const emblem = unit?.media?.emblem || null;
  return { mode: pickMediaMode({ cover, emblem }), cover, emblem };
}
