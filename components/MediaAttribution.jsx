import { isValidHttpUrl } from "@/lib/editorial";

// Canonical license pages for well-known licenses. Used only when the license
// string matches exactly — never invented for unknown licenses.
const LICENSE_URLS = {
  "cc by-sa 4.0": "https://creativecommons.org/licenses/by-sa/4.0/",
  "cc by 4.0": "https://creativecommons.org/licenses/by/4.0/",
  "cc by-sa 3.0": "https://creativecommons.org/licenses/by-sa/3.0/",
  "cc by 3.0": "https://creativecommons.org/licenses/by/3.0/",
  "cc by-sa 2.0": "https://creativecommons.org/licenses/by-sa/2.0/",
  "cc0 1.0": "https://creativecommons.org/publicdomain/zero/1.0/",
};

const KIND_LABEL = { photo: "Photo", cover: "Photo", emblem: "Emblem", insignia: "Insignia", image: "Media" };

// Split a license string into a display label and a SEPARATE trademark flag.
// Copyright / public-domain status and trademark restrictions are kept distinct:
// a public-domain image is shown as "Public domain", and any trademark
// restriction is surfaced on its own, never merged into the license label.
function parseLicense(license, explicitUrl) {
  if (typeof license !== "string" || !license.trim()) return null;
  const raw = license.trim();
  const lower = raw.toLowerCase();
  const hasTrademark = lower.includes("trademark");
  const isPublicDomain = lower.includes("public domain");
  const label = isPublicDomain ? "Public domain" : raw;
  const url = (explicitUrl && isValidHttpUrl(explicitUrl))
    ? explicitUrl
    : (LICENSE_URLS[label.toLowerCase()] || LICENSE_URLS[lower] || null);
  return { label, url, hasTrademark };
}

// Compact, visible media attribution: "Photo: Domenjod · Wikimedia Commons · CC BY-SA 4.0".
// Renders only when confirmed provenance (a credit or a license) exists — never
// fabricates missing fields, and never renders dangling separators.
export default function MediaAttribution({ media, kind = "photo", className = "" }) {
  if (!media || !media.src) return null;

  const credit = typeof media.credit === "string" ? media.credit.trim() : "";
  const sourceName = typeof media.sourceName === "string" ? media.sourceName.trim() : "";
  const sourceUrl = isValidHttpUrl(media.sourceUrl) ? media.sourceUrl.trim() : null;
  const lic = parseLicense(media.license, media.licenseUrl);

  // Provenance is only meaningful with at least a creator or a license.
  if (!credit && !lic) return null;

  const label = KIND_LABEL[kind] || "Media";
  const segments = [];
  if (credit) segments.push({ key: "credit", text: credit, href: sourceUrl });
  if (sourceName) segments.push({ key: "source", text: sourceName, href: sourceUrl });
  if (lic) segments.push({ key: "license", text: lic.label, href: lic.url });

  return (
    <p className={`media-attr ${className}`.trim()}>
      <span className="media-attr__label">{label}:</span>{" "}
      {segments.map((seg, i) => (
        <span className="media-attr__seg" key={seg.key}>
          {i > 0 ? <span className="media-attr__sep" aria-hidden="true"> · </span> : null}
          {seg.href ? (
            <a href={seg.href} target="_blank" rel="noopener noreferrer">{seg.text}</a>
          ) : (
            <span>{seg.text}</span>
          )}
        </span>
      ))}
      {lic && lic.hasTrademark ? (
        <span className="media-attr__trademark"> (trademark restrictions apply)</span>
      ) : null}
    </p>
  );
}
