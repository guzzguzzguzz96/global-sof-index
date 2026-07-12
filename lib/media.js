// Central media resolution — one source of truth for the fallback hierarchy so
// the cards, featured dossiers, and the audit script all agree.

export const MEDIA_LABELS = {
  verified: "VERIFIED MEDIA",
  "official-emblem": "OFFICIAL EMBLEM",
  "parent-branch-insignia": "PARENT BRANCH INSIGNIA",
  editorial: "EDITORIAL VISUAL",
  representative: "REPRESENTATIVE MEDIA",
  pending: "MEDIA RESEARCH PENDING",
};

// An emblem image whose `kind` is "parent-branch-insignia" is not a confirmed
// unit-specific emblem (e.g. a general service/branch insignia shown for
// identification). It is displayed like an emblem but labelled accurately.
export function emblemMode(emblem) {
  return emblem?.kind === "parent-branch-insignia" ? "parent-branch-insignia" : "official-emblem";
}

// Modes that render the emblem patch fallback (image centred on a designed panel).
export function isEmblemMode(mode) {
  return mode === "official-emblem" || mode === "parent-branch-insignia";
}

// Fallback hierarchy: verified photo > emblem/insignia > editorial > representative > pending.
// An emblem (or parent-branch insignia) is preferred over a merely representative
// photo so we never lean on an unrelated stock military image to stand in for a
// specific unit.
export function pickMediaMode({ cover, emblem, coverFailed = false, emblemFailed = false } = {}) {
  const status = cover?.status || "pending";
  const hasCover = Boolean(cover?.src) && !coverFailed;
  const hasEmblem = Boolean(emblem?.src) && !emblemFailed;

  if (hasCover && status === "verified") return "verified";
  if (hasEmblem) return emblemMode(emblem);
  if (hasCover && (status === "editorial" || status === "representative")) return status;
  return "pending";
}

// Failure-free summary for reporting/auditing.
export function summarizeMedia(unit) {
  const cover = unit?.media?.cover || {};
  const emblem = unit?.media?.emblem || null;
  return { mode: pickMediaMode({ cover, emblem }), cover, emblem };
}
