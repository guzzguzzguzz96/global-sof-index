import { siteConfig } from "@/lib/siteConfig";
import { units } from "@/data/units";

const BASE = siteConfig.url;

export default function sitemap() {
  const staticEntries = [
    { url: `${BASE}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/methodology`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/editorial-policy`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/disclaimer`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${BASE}/corrections`, changeFrequency: "yearly", priority: 0.4 },
  ];

  // lastModified is intentionally omitted. The only per-unit date, `updatedAt`,
  // is a shared schema/migration stamp — an identical hardcoded value applied to
  // every expanded unit — not a genuine per-unit content-modification date, so it
  // must not populate sitemap lastModified. No explicit content-update field
  // (e.g. contentUpdatedAt) exists yet, and dates must never be invented; units
  // therefore carry no lastModified until a real content-update date is recorded.
  const unitEntries = units.map((unit) => ({
    url: `${BASE}/units/${unit.slug}`,
    changeFrequency: "monthly",
    priority: unit.detailLevel === "expanded" ? 0.8 : 0.6,
  }));

  return [...staticEntries, ...unitEntries];
}
