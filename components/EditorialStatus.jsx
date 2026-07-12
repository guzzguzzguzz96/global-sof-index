import { COMPLETENESS, COMPLETENESS_LABELS, RELIABILITY_LABELS } from "@/lib/editorial";

// Completeness expressed as a filled-segment meter (shape, not color alone).
const STEPS = {
  [COMPLETENESS.RICH]: 3,
  [COMPLETENESS.BASIC]: 2,
  [COMPLETENESS.RESEARCH_PENDING]: 1,
};

export default function EditorialStatus({ editorial }) {
  if (!editorial) return null;
  const { completeness, reliability, lastReviewed, sourceCount } = editorial;
  const steps = STEPS[completeness] || 1;

  return (
    <dl className={`editorial-status estat--${completeness}`}>
      <div className="estat__row">
        <dt>Completeness</dt>
        <dd>
          <span className="estat__meter" aria-hidden="true">
            {[1, 2, 3].map((n) => <i key={n} className={n <= steps ? "on" : ""} />)}
          </span>
          <span className="estat__value">{COMPLETENESS_LABELS[completeness] || completeness}</span>
        </dd>
      </div>

      <div className="estat__row">
        <dt>Reliability</dt>
        <dd><span className="estat__value">{RELIABILITY_LABELS[reliability] || reliability}</span></dd>
      </div>

      <div className="estat__row">
        <dt>Last reviewed</dt>
        <dd>
          {lastReviewed ? (
            <time className="estat__value" dateTime={lastReviewed}>{lastReviewed}</time>
          ) : (
            <span className="estat__pending">Editorial review pending</span>
          )}
        </dd>
      </div>

      <div className="estat__row">
        <dt>Sources</dt>
        <dd>
          <span className="estat__value">
            {sourceCount > 0 ? `${sourceCount} source${sourceCount === 1 ? "" : "s"}` : "No sources yet"}
          </span>
        </dd>
      </div>
    </dl>
  );
}
