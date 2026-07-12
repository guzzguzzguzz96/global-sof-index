// Designed media fallbacks. Two modes:
//   official-emblem — centered square emblem patch + faint abbreviation watermark
//   pending        — clean monogram with one subtle ring/grid
// The textual status is rendered once by CardMedia, not here.
export default function MediaFallback({ mode = "pending", code = "", emblem = null, onEmblemError }) {
  const mono = (code || "??").slice(0, 4);

  if (mode === "official-emblem" && emblem?.src) {
    const wide = emblem.variant === "wide";
    return (
      <div className="media-fallback media-fallback--emblem" role="img" aria-label={emblem.alt || `${code} official emblem`}>
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
