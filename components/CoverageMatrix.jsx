import { Globe2 } from "lucide-react";

// Six continent markers positioned around the radar scope (percent coordinates).
const NODES = [
  { key: "NA", continent: "North America", label: "N.AM", x: 24, y: 28 },
  { key: "EU", continent: "Europe", label: "EU", x: 52, y: 15 },
  { key: "AS", continent: "Asia", label: "AS", x: 78, y: 30 },
  { key: "SA", continent: "South America", label: "S.AM", x: 28, y: 75 },
  { key: "AF", continent: "Africa", label: "AF", x: 55, y: 72 },
  { key: "OC", continent: "Oceania", label: "OC", x: 79, y: 69 },
];

export default function CoverageMatrix({ total = 60, counts = {} }) {
  return (
    <div
      className="coverage"
      aria-label={`Global coverage matrix: ${total} active records across six continents`}
    >
      <div className="coverage__head">
        <span className="coverage__title">
          <Globe2 size={13} strokeWidth={2} aria-hidden="true" /> GLOBAL COVERAGE MATRIX
        </span>
        <span className="coverage__coord" aria-hidden="true">37.2°N / 115.8°W</span>
      </div>

      <div className="coverage__scope" aria-hidden="true">
        {/* Rings, cross-hairs and the sweep are clipped inside the circular plot. */}
        <div className="coverage__plot">
          <span className="coverage__ring coverage__ring--1" />
          <span className="coverage__ring coverage__ring--2" />
          <span className="coverage__ring coverage__ring--3" />
          <span className="coverage__cross coverage__cross--h" />
          <span className="coverage__cross coverage__cross--v" />
          <span className="coverage__sweep" />
          <span className="coverage__core" />
        </div>
        {/* Nodes/labels sit above the plot and are never clipped. */}
        {NODES.map((n) => (
          <span key={n.key} className="coverage__node" style={{ left: `${n.x}%`, top: `${n.y}%` }}>
            <i className="coverage__dot" />
            <span className="coverage__node-label">
              {n.label} <b>{counts[n.continent] ?? 10}</b>
            </span>
          </span>
        ))}
      </div>

      <div className="coverage__foot">
        <span className="coverage__total">
          <b>{total}</b> ACTIVE RECORDS
        </span>
        <span className="coverage__coord" aria-hidden="true">GRID // SOF-NET</span>
      </div>
    </div>
  );
}
