import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import CardMedia from "./CardMedia";
import CountryBadge from "./CountryBadge";
import MissionTag from "./MissionTag";
import CompareToggle from "./compare/CompareToggle";

const DOSSIER = {
  expanded: { label: "FULL DOSSIER", slug: "full" },
  basic: { label: "BASIC DOSSIER", slug: "basic" },
  pending: { label: "RESEARCH PENDING", slug: "pending" },
};

const MAX_TAGS = 3;

export default function UnitCard({ unit }) {
  const dossier = DOSSIER[unit.detailLevel] || DOSSIER.pending;
  const record = `FILE ${String(unit.recordNo).padStart(3, "0")}`;
  const shownTags = unit.tags.slice(0, MAX_TAGS);
  const extraTags = unit.tags.length - shownTags.length;

  // The card is an <article> wrapper rather than a bare <Link> so the compare
  // control can sit beside the navigation link instead of inside it. Nesting a
  // button within an anchor would be invalid interactive markup.
  return (
    <article className={`unit-card tier-${unit.tier.toLowerCase()}`}>
      <Link href={`/units/${unit.slug}`} className="unit-card__link">
        <div className="unit-card-media">
          <CardMedia cover={unit.media?.cover} emblem={unit.media?.emblem} code={unit.code} />
          <span className="unit-record" aria-hidden="true">{record}</span>
          <span className={`tier-square tier-square--${unit.tier.toLowerCase()}`} aria-hidden="true">{unit.tier}</span>
        </div>

        <div className="unit-card-body">
          <div className="country-line">
            <CountryBadge country={unit.countryInfo} size="sm" showContinent />
          </div>

          <div className="unit-title-row">
            <h3>{unit.code}</h3>
            <p title={unit.name}>{unit.name}</p>
          </div>

          <p className="unit-summary" title={unit.role}>{unit.role}</p>

          <div className="tag-row">
            {shownTags.map((tag) => <MissionTag key={tag} tag={tag} />)}
            {extraTags > 0 ? (
              <span className="mtag mtag--more" title={unit.tags.slice(MAX_TAGS).join(", ")}>+{extraTags}</span>
            ) : null}
          </div>

          <div className="score-row">
            <Score label="Selection" value={unit.scores.selection} />
            <Score label="Versatility" value={unit.scores.versatility} />
            <Score label="Environment" value={unit.scores.environment} />
          </div>

          <div className="card-cta">
            <span className={`dossier-flag dossier-flag--${dossier.slug}`}>{dossier.label}</span>
            <strong>OPEN FILE <ArrowUpRight size={12} strokeWidth={2.2} aria-hidden="true" /></strong>
          </div>
        </div>
      </Link>

      {/* Overlaid on the free bottom-right corner of the media frame, so the
          control adds no height to the card. */}
      <div className="unit-card__compare">
        <CompareToggle slug={unit.slug} code={unit.code} name={unit.name} />
      </div>
    </article>
  );
}

function Score({ label, value }) {
  return (
    <span>
      <small>{label}</small>
      <strong>{value}</strong>
    </span>
  );
}
