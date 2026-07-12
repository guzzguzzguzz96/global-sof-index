// Development-only media audit. Reports coverage/provenance gaps in a readable
// form. Never fails the build — pending media is expected during research.
//
//   npm run media:audit
import { units } from "../data/units.js";
import { summarizeMedia } from "../lib/media.js";

const MIN_ALT = 12; // an alt shorter than this is treated as not meaningful

const rows = units.map((unit) => {
  const { mode, cover, emblem } = summarizeMedia(unit);
  const isPhoto = mode === "verified" || mode === "editorial" || mode === "representative";
  const hasAnyMedia = Boolean(cover?.src) || Boolean(emblem?.src);

  const missingSourceUrl = hasAnyMedia && !((cover?.src && cover?.sourceUrl) || (emblem?.src && emblem?.sourceUrl));
  const missingLicense = hasAnyMedia && !((cover?.src && cover?.license) || (emblem?.src && emblem?.license));

  let missingAlt = false;
  if (isPhoto) missingAlt = !cover?.alt || cover.alt.trim().length < MIN_ALT;
  else if (mode === "official-emblem" || mode === "parent-branch-insignia") missingAlt = !emblem?.alt || emblem.alt.trim().length < MIN_ALT;

  return { unit, mode, missingSourceUrl, missingLicense, missingAlt };
});

const count = (fn) => rows.filter(fn).length;

const stats = {
  totalUnits: units.length,
  verifiedCover: count((r) => r.mode === "verified"),
  emblemOnly: count((r) => r.mode === "official-emblem"),
  parentBranchInsignia: count((r) => r.mode === "parent-branch-insignia"),
  editorial: count((r) => r.mode === "editorial"),
  representative: count((r) => r.mode === "representative"),
  pending: count((r) => r.mode === "pending"),
  missingSourceUrl: count((r) => r.missingSourceUrl),
  missingLicense: count((r) => r.missingLicense),
  missingAlt: count((r) => r.missingAlt),
};

const pct = (n) => `${((n / units.length) * 100).toFixed(0)}%`;
const line = (label, n) => `  ${label.padEnd(26)} ${String(n).padStart(3)}  ${pct(n).padStart(4)}`;

console.log("\n=== GLOBAL SOF INDEX — MEDIA AUDIT ===\n");
console.log(`  Total units               ${String(stats.totalUnits).padStart(3)}`);
console.log("");
console.log("  Media resolution");
console.log(line("verified cover photo", stats.verifiedCover));
console.log(line("official emblem", stats.emblemOnly));
console.log(line("parent-branch insignia", stats.parentBranchInsignia));
console.log(line("editorial visual", stats.editorial));
console.log(line("representative media", stats.representative));
console.log(line("media research pending", stats.pending));
console.log("");
console.log("  Provenance / accessibility gaps");
console.log(line("missing sourceUrl", stats.missingSourceUrl));
console.log(line("missing license", stats.missingLicense));
console.log(line("missing meaningful alt", stats.missingAlt));

const pendingList = rows.filter((r) => r.mode === "pending").map((r) => r.unit.code);
if (pendingList.length) {
  console.log("\n  Pending units:");
  console.log("    " + pendingList.join(", "));
}

console.log("\n  Note: sourceUrl/license are intentionally uncurated (null) — not invented.");
console.log("  This report is advisory only and does not affect the production build.\n");

// Always succeed — advisory only.
process.exit(0);
