import Link from "next/link";
import CountryBadge from "@/components/CountryBadge";
import MissionTag from "@/components/MissionTag";
import {
  COMPLETENESS_LABELS,
  RELIABILITY_LABELS,
  displayFact,
  UNKNOWN_STATE,
} from "@/lib/editorial";

// Server component: the matrix is pure presentation over already-resolved unit
// records, so none of the dossier fields below reach the client bundle as
// component state.
//
// Every value passes through the project's existing `displayFact` helper, which
// substitutes a consistent unknown state for empty values and for the known
// placeholder phrases. Nothing is defaulted to 0 and nothing is invented.

function Text({ value, fallback = UNKNOWN_STATE.NOT_CONFIRMED }) {
  const shown = displayFact(value, fallback);
  const unknown = shown === fallback;
  return <span className={unknown ? "cmp-unknown" : undefined}>{shown}</span>;
}

export default function CompareTable({ units }) {
  const columns = units.length;

  return (
    <div className="compare-matrix__scroll">
      <table className="compare-matrix">
        <caption className="sr-only">
          Side-by-side comparison of {columns} units across identity, editorial confidence and operational profile.
        </caption>

        <thead>
          <tr>
            <th scope="col" className="compare-matrix__corner">Field</th>
            {units.map((unit) => (
              <th scope="col" key={unit.slug} className="compare-matrix__unit">
                <span className={`cmp-head__tier tier-square--${unit.tier.toLowerCase()}`} aria-hidden="true">
                  {unit.tier}
                </span>
                <Link href={`/units/${unit.slug}`} className="cmp-head__code">{unit.code}</Link>
                <span className="cmp-head__name">{unit.name}</span>
                <span className="cmp-head__country">
                  <CountryBadge country={unit.countryInfo} size="sm" />
                </span>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          <GroupRow title="Identity" span={columns + 1} />
          <Row label="Public unit name" units={units} render={(u) => <Text value={u.name} />} />
          <Row label="Country" units={units} render={(u) => <CountryBadge country={u.countryInfo} size="sm" showContinent />} />
          <Row label="Continent" units={units} render={(u) => <Text value={u.continent} />} />
          <Row
            label="Branch / parent institution"
            units={units}
            render={(u) => <Text value={u.branch} />}
          />
          <Row
            label="Unit type / taxonomy"
            units={units}
            render={(u) => <Text value={u.unitType} />}
          />
          <Row
            label="Founded / lineage"
            units={units}
            render={(u) => <Text value={u.founded} fallback={UNKNOWN_STATE.RESEARCH_PENDING} />}
          />
          <Row label="Current status" units={units} render={(u) => <Text value={u.status} />} />

          <GroupRow
            title="Editorial confidence"
            span={columns + 1}
            note="How well documented each record is — not a judgement of the unit."
          />
          <Row
            label="Dossier completeness"
            units={units}
            render={(u) => (
              <span className={`cmp-badge cmp-badge--${u.editorial.completeness}`}>
                {COMPLETENESS_LABELS[u.editorial.completeness] || u.editorial.completeness}
              </span>
            )}
          />
          <Row
            label="Reliability"
            units={units}
            render={(u) => <Text value={RELIABILITY_LABELS[u.editorial.reliability] || u.editorial.reliability} />}
          />
          <Row
            label="Last reviewed"
            units={units}
            render={(u) => (u.editorial.lastReviewed
              ? <time dateTime={u.editorial.lastReviewed}>{u.editorial.lastReviewed}</time>
              : <span className="cmp-unknown">Editorial review pending</span>)}
          />
          <Row
            label="Content sources"
            units={units}
            render={(u) => (u.editorial.contentSourceCount > 0
              ? <span>{u.editorial.contentSourceCount} source{u.editorial.contentSourceCount === 1 ? "" : "s"}</span>
              : <span className="cmp-unknown">No sources yet</span>)}
          />

          <GroupRow
            title="Operational profile"
            span={columns + 1}
            note="Public role and mission focus as described by the record's own sources."
          />
          <Row label="Primary role" units={units} render={(u) => <Text value={u.role} />} />
          <Row
            label="Mission tags"
            units={units}
            render={(u) => (u.tags.length
              ? <span className="cmp-tags">{u.tags.map((tag) => <MissionTag key={tag} tag={tag} />)}</span>
              : <span className="cmp-unknown">{UNKNOWN_STATE.NOT_CONFIRMED}</span>)}
          />
          <Row
            label="Primary environment"
            units={units}
            render={(u) => <Text value={(u.environment || []).join(" / ")} fallback={UNKNOWN_STATE.MISSION_DEPENDENT} />}
          />

          <GroupRow
            title="Editorial comparative indicators"
            span={columns + 1}
            note="An in-house editorial model for browsing this archive. These are not official rankings, scores or capability assessments, and they do not rank one unit above another."
          />
          <Row
            label="Editorial tier"
            units={units}
            render={(u) => <span className={`cmp-tier tier-square--${u.tier.toLowerCase()}`}>Tier {u.tier}</span>}
          />
          <Indicator label="Selection indicator" units={units} pick={(u) => u.scores.selection} />
          <Indicator label="Versatility indicator" units={units} pick={(u) => u.scores.versatility} />
          <Indicator label="Environment indicator" units={units} pick={(u) => u.scores.environment} />
        </tbody>
      </table>
    </div>
  );
}

function GroupRow({ title, span, note }) {
  return (
    <tr className="cmp-group">
      <th scope="colgroup" colSpan={span}>
        <span className="cmp-group__title">{title}</span>
        {note ? <span className="cmp-group__note">{note}</span> : null}
      </th>
    </tr>
  );
}

function Row({ label, units, render }) {
  return (
    <tr>
      <th scope="row" className="cmp-label">{label}</th>
      {units.map((unit) => <td key={unit.slug}>{render(unit)}</td>)}
    </tr>
  );
}

// Numeric editorial indicators. A value is only rendered when it is a real
// finite number — a missing indicator shows the unknown state rather than 0.
function Indicator({ label, units, pick }) {
  return (
    <tr>
      <th scope="row" className="cmp-label">{label}</th>
      {units.map((unit) => {
        const value = pick(unit);
        const has = typeof value === "number" && Number.isFinite(value);
        return (
          <td key={unit.slug}>
            {has ? (
              <span className="cmp-indicator">
                <span className="cmp-indicator__value">{value}</span>
                <span className="cmp-indicator__bar" aria-hidden="true">
                  <i style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
                </span>
              </span>
            ) : (
              <span className="cmp-unknown">{UNKNOWN_STATE.NOT_CONFIRMED}</span>
            )}
          </td>
        );
      })}
    </tr>
  );
}
