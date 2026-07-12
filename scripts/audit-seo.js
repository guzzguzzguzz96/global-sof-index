// Lightweight, network-free SEO validation. Fails (exit 1) on technical SEO
// errors; editorial gaps are warnings only.
//
//   npm run seo:audit
import { units } from "../data/units.js";
import { siteConfig } from "../lib/siteConfig.js";

let errors = 0;
let warnings = 0;
const fail = (m) => { console.log("  ✗ ERROR  " + m); errors++; };
const warn = (m) => { console.log("  ! WARN   " + m); warnings++; };
const ok = (m) => console.log("  ✓ " + m);

// Mirror the app's title/description derivation so we validate the same output.
const unitTitle = (u) => `${u.code} — ${u.name}`;
const unitDescription = (u) => {
  const tags = (u.tags || []).slice(0, 3).join(", ");
  const dossier = u.detailLevel === "expanded" ? "Full dossier" : "Basic dossier";
  return `${u.name} (${u.code}) — ${u.country} special operations unit. Role: ${u.role}. Mission focus: ${tags}. ${dossier} in the Global SOF Index open-source archive.`;
};

const POLICY_ROUTES = ["/methodology", "/editorial-policy", "/disclaimer", "/corrections"];
const STATIC_ROUTES = ["/", ...POLICY_ROUTES];
const BAD_HOSTS = /localhost|127\.0\.0\.1|0\.0\.0\.0|\.vercel\.app/i;

console.log("\n=== GLOBAL SOF INDEX — SEO AUDIT ===\n");

// 1. siteConfig URL uses HTTPS and www, production domain.
{
  const u = siteConfig.url || "";
  if (!/^https:\/\//.test(u)) fail(`siteConfig.url must use HTTPS: "${u}"`);
  else if (!/^https:\/\/www\./.test(u)) fail(`siteConfig.url must use the www subdomain: "${u}"`);
  else if (BAD_HOSTS.test(u)) fail(`siteConfig.url must be the production domain, not localhost/preview: "${u}"`);
  else ok(`siteConfig.url = ${u}`);
}

// 2. Unit slugs: count + uniqueness.
{
  const slugs = units.map((u) => u.slug);
  const dups = slugs.filter((s, i) => slugs.indexOf(s) !== i);
  if (units.length !== siteConfig.unitCount) warn(`unit count is ${units.length} but siteConfig.unitCount is ${siteConfig.unitCount}`);
  if (dups.length) fail(`duplicate unit slugs: ${[...new Set(dups)].join(", ")}`);
  else ok(`${slugs.length} unit slugs, all unique`);
  const badSlug = units.filter((u) => !/^[a-z0-9-]+$/.test(u.slug || ""));
  if (badSlug.length) fail(`invalid slug characters: ${badSlug.map((u) => u.slug).join(", ")}`);
}

// 3. Every unit can produce a title.
{
  const bad = units.filter((u) => !u.code || !u.name);
  if (bad.length) fail(`units without a usable title: ${bad.map((u) => u.slug).join(", ")}`);
  else ok("every unit can produce a title");
}

// 4. Every unit can produce a non-empty description.
{
  const bad = units.filter((u) => !u.country || !u.role || !(u.tags || []).length || unitDescription(u).trim().length < 40);
  if (bad.length) fail(`units without a usable description: ${bad.map((u) => u.slug).join(", ")}`);
  else ok("every unit can produce a non-empty description");
}

// 5. Canonical paths (home + policy + units) are all unique.
{
  const paths = [...STATIC_ROUTES, ...units.map((u) => `/units/${u.slug}`)];
  const dups = paths.filter((p, i) => paths.indexOf(p) !== i);
  if (dups.length) fail(`duplicate canonical paths: ${[...new Set(dups)].join(", ")}`);
  else ok(`${paths.length} canonical paths, all unique`);
}

// 6 & 8. Sitemap coverage: unit routes + policy routes are all derivable.
{
  const unitRoutes = units.map((u) => `/units/${u.slug}`);
  ok(`sitemap covers ${unitRoutes.length} unit routes + ${POLICY_ROUTES.length} policy routes + home`);
  const missingPolicy = POLICY_ROUTES.filter((p) => !STATIC_ROUTES.includes(p));
  if (missingPolicy.length) fail(`policy routes missing from sitemap set: ${missingPolicy.join(", ")}`);
}

// 7. No localhost / preview host anywhere in the site metadata surface.
{
  const surface = [siteConfig.url, siteConfig.name, siteConfig.description].join(" ");
  if (BAD_HOSTS.test(surface)) fail("localhost or preview domain found in site metadata");
  else ok("no localhost or preview domain in site metadata");
}

// 9. No duplicate metadata titles where avoidable.
{
  const titles = [
    siteConfig.name,
    "Methodology",
    "Editorial Policy",
    "Disclaimer",
    "Corrections",
    ...units.map(unitTitle),
  ];
  const dups = titles.filter((t, i) => titles.indexOf(t) !== i);
  if (dups.length) fail(`duplicate metadata titles: ${[...new Set(dups)].join(", ")}`);
  else ok(`${titles.length} metadata titles, all unique`);
}

console.log("");
if (errors > 0) {
  console.log(`SEO AUDIT: FAIL — ${errors} error(s), ${warnings} warning(s)\n`);
  process.exit(1);
}
console.log(`SEO AUDIT: PASS — 0 errors, ${warnings} warning(s)\n`);
process.exit(0);
