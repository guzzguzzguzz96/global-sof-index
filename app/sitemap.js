import { siteConfig } from "@/lib/siteConfig";
import { units } from "@/data/units";

const BASE = siteConfig.url;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export default function sitemap() {
  const staticEntries = [
    { url: `${BASE}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/methodology`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/editorial-policy`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/disclaimer`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${BASE}/corrections`, changeFrequency: "yearly", priority: 0.4 },
  ];

  const unitEntries = units.map((unit) => {
    const entry = {
      url: `${BASE}/units/${unit.slug}`,
      changeFrequency: "monthly",
      priority: unit.detailLevel === "expanded" ? 0.8 : 0.6,
    };
    // Only attach a real editorial date; never invent one.
    if (ISO_DATE.test(unit.updatedAt || "")) {
      entry.lastModified = new Date(unit.updatedAt);
    }
    return entry;
  });

  return [...staticEntries, ...unitEntries];
}
