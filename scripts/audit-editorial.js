// Editorial data audit. Separates technical/data-structure ERRORS (exit 1) from
// editorial WARNINGS (exit 0). Network-free.
//
//   npm run editorial:audit
import { units } from "../data/units.js";
import {
  COMPLETENESS,
  COMPLETENESS_LEVELS,
  RELIABILITY_LEVELS,
  isPlaceholder,
  isValidHttpUrl,
  normalizeSources,
} from "../lib/editorial.js";

const errors = [];
const warnings = [];
const err = (m) => errors.push(m);
const warn = (m) => warnings.push(m);

const SLUG_RE = /^[a-z0-9-]+$/;
const seenIds = new Set();
const seenSlugs = new Set();

// Per-metric collectors.
const metric = {
  rich: 0,
  basic: 0,
  researchPending: 0,
  missingFounded: [],
  missingBranch: [],
  missingHistory: [],
  missingRole: [],
  missingSources: [],
  missingReviewed: [],
  duplicateUrls: [],
  invalidUrls: [],
  placeholders: [],
  invalidReliability: [],
  invalidCompleteness: [],
  featuredBelowRich: [],
  basicMissingMinimum: [],
};

for (const unit of units) {
  const label = unit.code || unit.slug || "(unknown)";

  // ----- Structural / technical checks (ERRORS) -----
  if (!unit.id) err(`${label}: missing id`);
  else if (seenIds.has(unit.id)) err(`duplicate id: ${unit.id}`);
  else seenIds.add(unit.id);

  if (!unit.slug) err(`${label}: missing slug`);
  else {
    if (!SLUG_RE.test(unit.slug)) err(`${label}: invalid slug characters "${unit.slug}"`);
    if (seenSlugs.has(unit.slug)) err(`duplicate slug: ${unit.slug}`);
    else seenSlugs.add(unit.slug);
  }

  if (!unit.code || !unit.name) err(`${label}: missing code/name`);
  if (!Array.isArray(unit.tags)) err(`${label}: tags is not an array`);
  if (!Array.isArray(unit.sources)) err(`${label}: sources is not an array`);
  if (!unit.editorial) err(`${label}: missing editorial metadata`);

  const editorial = unit.editorial || {};
  if (editorial.completeness && !COMPLETENESS_LEVELS.includes(editorial.completeness)) {
    err(`${label}: invalid completeness "${editorial.completeness}"`);
    metric.invalidCompleteness.push(label);
  }
  if (editorial.reliability && !RELIABILITY_LEVELS.includes(editorial.reliability)) {
    err(`${label}: invalid reliability "${editorial.reliability}"`);
    metric.invalidReliability.push(label);
  }

  const sources = normalizeSources(unit.sources);
  const urls = [];
  for (const s of sources) {
    if (s.url) {
      if (!isValidHttpUrl(s.url)) {
        err(`${label}: malformed source URL "${s.url}"`);
        metric.invalidUrls.push(label);
      } else {
        urls.push(s.url.trim());
      }
    }
  }
  const dupUrl = urls.filter((u, i) => urls.indexOf(u) !== i);
  if (dupUrl.length) metric.duplicateUrls.push(`${label}: ${[...new Set(dupUrl)].join(", ")}`);

  // ----- Completeness tally -----
  if (editorial.completeness === COMPLETENESS.RICH) metric.rich++;
  else if (editorial.completeness === COMPLETENESS.BASIC) metric.basic++;
  else metric.researchPending++;

  // ----- Editorial gaps (WARNINGS) -----
  if (!unit.founded || isPlaceholder(unit.founded)) metric.missingFounded.push(label);
  if (!unit.branch || isPlaceholder(unit.branch)) metric.missingBranch.push(label);
  if (!unit.history || !unit.history.summary || isPlaceholder(unit.history.summary)) metric.missingHistory.push(label);
  if (!unit.role) metric.missingRole.push(label);
  if (sources.length === 0) metric.missingSources.push(label);
  if (!editorial.lastReviewed) metric.missingReviewed.push(label);

  // Placeholder scan across key editorial fields.
  const scan = {
    founded: unit.founded,
    branch: unit.branch,
    personnel: unit.personnel,
    status: unit.status,
    unitType: unit.unitType,
    history: unit.history && unit.history.summary,
  };
  for (const [field, value] of Object.entries(scan)) {
    if (isPlaceholder(value)) metric.placeholders.push(`${label}.${field}`);
  }
  if (Array.isArray(unit.timeline)) {
    for (const ev of unit.timeline) {
      if (isPlaceholder(ev.title) || isPlaceholder(ev.description)) metric.placeholders.push(`${label}.timeline`);
    }
  }

  // Basic units must meet the minimum required content set. A genuine review
  // date is tracked separately (missing lastReviewed warning) and is NOT part of
  // the content minimum, so it is not required here.
  if (editorial.completeness === COMPLETENESS.BASIC) {
    const missing = [];
    if (!unit.branch || isPlaceholder(unit.branch)) missing.push("branch");
    if (!unit.history || !unit.history.summary) missing.push("history");
    if (!unit.role) missing.push("role");
    if (sources.length < 1) missing.push("source");
    if (missing.length) metric.basicMissingMinimum.push(`${label}: ${missing.join(", ")}`);
  }
}

// Featured = expanded dossiers; flag any below rich completeness.
const featured = units.filter((u) => u.detailLevel === "expanded");
for (const u of featured) {
  if (u.editorial.completeness !== COMPLETENESS.RICH) {
    metric.featuredBelowRich.push(`${u.code} (${u.editorial.completeness}, ${u.editorial.sourceCount} source${u.editorial.sourceCount === 1 ? "" : "s"})`);
  }
}

// ---------------- Report ----------------
const pad = (n) => String(n).padStart(3);
console.log("\n=== GLOBAL SOF INDEX — EDITORIAL AUDIT ===\n");
console.log(`  Total units               ${pad(units.length)}`);
console.log("");
console.log("  Completeness");
console.log(`    rich                    ${pad(metric.rich)}`);
console.log(`    basic                   ${pad(metric.basic)}`);
console.log(`    research-pending        ${pad(metric.researchPending)}`);
console.log("");
console.log("  Editorial gaps (counts)");
console.log(`    missing founded         ${pad(metric.missingFounded.length)}`);
console.log(`    missing branch          ${pad(metric.missingBranch.length)}`);
console.log(`    missing shortHistory    ${pad(metric.missingHistory.length)}`);
console.log(`    missing primaryRole     ${pad(metric.missingRole.length)}`);
console.log(`    missing sources         ${pad(metric.missingSources.length)}`);
console.log(`    missing lastReviewed    ${pad(metric.missingReviewed.length)}`);
console.log(`    duplicate source URLs   ${pad(metric.duplicateUrls.length)}`);
console.log(`    invalid source URLs     ${pad(metric.invalidUrls.length)}`);
console.log(`    placeholder phrases     ${pad(metric.placeholders.length)}`);
console.log(`    invalid completeness    ${pad(metric.invalidCompleteness.length)}`);
console.log(`    invalid reliability     ${pad(metric.invalidReliability.length)}`);
console.log(`    basic missing minimum   ${pad(metric.basicMissingMinimum.length)}`);

console.log("\n  Featured dossiers below rich:");
console.log(metric.featuredBelowRich.length ? "    " + metric.featuredBelowRich.join("\n    ") : "    none");

if (metric.duplicateUrls.length) {
  console.log("\n  Duplicate source URLs:");
  console.log("    " + metric.duplicateUrls.join("\n    "));
}

console.log("");
if (errors.length) {
  console.log("ERRORS (technical / data-structure):");
  errors.forEach((e) => console.log("  ✗ " + e));
}
console.log(`\nEDITORIAL WARNINGS: ${warnings.length + [
  metric.missingFounded, metric.missingBranch, metric.missingHistory, metric.missingRole,
  metric.missingSources, metric.missingReviewed, metric.placeholders, metric.duplicateUrls,
  metric.featuredBelowRich, metric.basicMissingMinimum,
].reduce((n, a) => n + a.length, 0)} item(s) — these do not block the build.`);

if (errors.length) {
  console.log(`\nEDITORIAL AUDIT: FAIL — ${errors.length} technical error(s)\n`);
  process.exit(1);
}
console.log("\nEDITORIAL AUDIT: PASS — 0 technical errors (editorial research still pending)\n");
process.exit(0);
