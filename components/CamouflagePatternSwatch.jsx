import { confidenceLabel } from "@/lib/uniformColors";

// Camouflage pattern tile. When a verified, locally-hosted licensed image is
// available it is shown; otherwise we render a clearly-labelled ILLUSTRATIVE
// editorial preview — a neutral texture that deliberately does NOT imitate any
// official pattern. We never load unlicensed remote pattern images.
export default function CamouflagePatternSwatch({ item }) {
  if (!item || !item.name) return null;
  const { name, confidence, image, license, isIllustrative } = item;
  const conf = confidenceLabel(confidence);
  const hasImage = Boolean(image && license);

  return (
    <figure className="camo-tile">
      {hasImage ? (
        <span className="camo-tile__preview camo-tile__preview--image" role="img" aria-label={`${name} pattern reference`}>
          {/* Local, licensed asset only. */}
          <img src={image} alt="" loading="lazy" />
        </span>
      ) : (
        <span
          className="camo-tile__preview camo-tile__preview--editorial"
          role="img"
          aria-label={`${name} — illustrative editorial pattern preview, not the official pattern`}
        >
          <span className="camo-tile__tag">ILLUSTRATIVE PATTERN</span>
        </span>
      )}
      <figcaption className="camo-tile__body">
        <span className="camo-tile__name">{name}</span>
        {conf ? (
          <span className="camo-tile__status">{conf}</span>
        ) : isIllustrative ? (
          <span className="camo-tile__status">Editorial preview</span>
        ) : null}
      </figcaption>
    </figure>
  );
}
