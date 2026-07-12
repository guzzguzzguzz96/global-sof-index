export default function CapabilityRadar({ scores }) {
  const values = [
    scores.cqb,
    scores.recon,
    scores.mobility,
    scores.environment,
    scores.versatility,
    scores.counterTerror,
  ];
  const labels = ["CQB", "RECON", "MOBILITY", "ENV.", "VERS.", "CT"];
  const center = 120;
  const radius = 82;

  const point = (value, index, scale = 1) => {
    const angle = -Math.PI / 2 + (Math.PI * 2 * index) / values.length;
    const length = radius * (value / 100) * scale;
    return [center + Math.cos(angle) * length, center + Math.sin(angle) * length];
  };

  const polygon = (scale) => values.map((_, index) => point(100, index, scale).join(",")).join(" ");
  const scorePolygon = values.map((value, index) => point(value, index).join(",")).join(" ");

  return (
    <svg className="radar-chart" viewBox="0 0 240 240" role="img" aria-label="Capability radar chart">
      {[0.25, 0.5, 0.75, 1].map((scale) => <polygon key={scale} className="radar-grid" points={polygon(scale)} />)}
      {values.map((_, index) => {
        const [x, y] = point(100, index);
        return <line key={labels[index]} className="radar-axis" x1={center} y1={center} x2={x} y2={y} />;
      })}
      <polygon className="radar-shape" points={scorePolygon} />
      {values.map((value, index) => {
        const [x, y] = point(value, index);
        return <circle key={labels[index]} className="radar-dot" cx={x} cy={y} r="3.5" />;
      })}
      {labels.map((label, index) => {
        const [x, y] = point(120, index);
        return <text key={label} x={x} y={y} textAnchor="middle" dominantBaseline="middle">{label}</text>;
      })}
    </svg>
  );
}
