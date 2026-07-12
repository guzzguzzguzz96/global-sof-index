import { confidenceLabel } from "@/lib/uniformColors";

// Editorial base-colour swatch. The hex is an APPROXIMATE visual reference only,
// never an official issue colour. Colour is never the sole indicator: the name
// (and an "approximate" note) always accompany the swatch, and every swatch
// carries an aria-label.
export default function UniformColorSwatch({ item }) {
  if (!item || !item.name) return null;
  const { name, visualHex, confidence, isApproximate } = item;
  const conf = confidenceLabel(confidence);

  // No approximable colour (e.g. a descriptor like "Mission-specific neutral
  // colors") — show the text label as a plain chip, no swatch.
  if (!visualHex) {
    return (
      <span className="uswatch uswatch--nohex">
        <span className="uswatch__label">{name}</span>
        {conf ? <span className="uswatch__conf">{conf}</span> : null}
      </span>
    );
  }

  const aria = `${name} — approximate visual reference${conf ? ` (${conf})` : ""}`;
  return (
    <span className="uswatch">
      <span className="uswatch__chip" style={{ backgroundColor: visualHex }} role="img" aria-label={aria} />
      <span className="uswatch__text">
        <span className="uswatch__label">{name}</span>
        <span className="uswatch__meta">
          {conf ? <span className="uswatch__conf">{conf}</span> : null}
          {isApproximate ? <span className="uswatch__approx">Approximate visual reference</span> : null}
        </span>
      </span>
    </span>
  );
}
