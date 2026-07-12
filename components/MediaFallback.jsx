import { isEmblemMode } from "@/lib/media";

// Designed media fallbacks. Emblem modes:
//   official-emblem         — confirmed unit emblem patch + faint abbreviation watermark
//   parent-branch-insignia  — same patch treatment for a parent-branch insignia
//                             that is NOT a confirmed unit-specific emblem
//   pending                 — clean monogram with one subtle ring/grid
// The textual status is rendered once by CardMedia, not here.
export default function MediaFallback({ mode = "pending", code = "", emblem = null, onEmblemError }) {
  const mono = (code || "??").slice(0, 4);

  if (isEmblemMode(mode) && emblem?.src) {
    const wide = emblem.variant === "wide";
    const fallbackAlt = mode === "parent-branch-insignia" ? `${code} parent-branch insignia` : `${code} official emblem`;
    return (
      <div className="media-fallback media-fallback--emblem" role="img" aria-label={emblem.alt || fallbackAlt}>
        <span className="media-fallback__grid" aria-hidden="true" />
        <span className="media-fallback__watermark" aria-hidden="true">{mono}</span>
        <span className={`emblem-patch${wide ? " emblem-patch--wide" : ""}`}>
          <img src={emblem.src} alt="" loading="lazy" onError={onEmblemError} />
        </span>
      </div>
    );
  }

  return (
    <div className="media-fallback media-fallback--pending" role="img" aria-label={`${code || "Unit"} — media research pending`}>
      <span className="media-fallback__grid" aria-hidden="true" />
      <span className="media-fallback__ring" aria-hidden="true" />
      <span className="media-fallback__mono" aria-hidden="true">{mono}</span>
    </div>
  );
}
