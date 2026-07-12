import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CardMedia from "./CardMedia";
import CountryBadge from "./CountryBadge";
import { MEDIA_LABELS, summarizeMedia } from "@/lib/media";

export default function FeaturedDossiers({ units }) {
  return (
    <section className="featured-section">
      <div className="section-heading">
        <div>
          <span className="section-kicker">PRIORITY FILES</span>
          <h2>FEATURED DOSSIERS</h2>
          <p>ตัวอย่างหน้ารายละเอียดที่มีข้อมูลอาวุธ เครื่องแบบ แกลเลอรี Timeline และ Capability Radar</p>
        </div>
      </div>

      <div className="featured-grid">
        {units.slice(0, 6).map((unit) => {
          const { mode } = summarizeMedia(unit);
          const isPhoto = mode === "verified" || mode === "editorial" || mode === "representative";
          return (
            <Link
              href={`/units/${unit.slug}`}
              className={`featured-card featured-card--${isPhoto ? "photo" : "dossier"} tier-${unit.tier.toLowerCase()}`}
              key={unit.id}
            >
              <div className="featured-media">
                <CardMedia
                  cover={unit.media?.cover}
                  emblem={unit.media?.emblem}
                  code={unit.code}
                  statusBadge={false}
                  sizes="(max-width: 620px) 100vw, (max-width: 1120px) 50vw, 33vw"
                />
              </div>
              <div className="featured-overlay" aria-hidden="true" />

              <div className="featured-top">
                <CountryBadge country={unit.countryInfo} size="sm" />
                <b className={`featured-tier tier-square--${unit.tier.toLowerCase()}`} aria-hidden="true">{unit.tier}</b>
              </div>

              <div className="featured-bottom">
                <h3>{unit.code}</h3>
                <p>{unit.name}</p>
                <div className="featured-meta">
                  <span>{unit.continent}</span>
                  <i aria-hidden="true" />
                  <span>{unit.tags[0]}</span>
                  <i aria-hidden="true" />
                  <span className={`featured-meta__media media-dot--${mode}`}>{MEDIA_LABELS[mode]}</span>
                </div>
                <span className="featured-cta">OPEN INTELLIGENCE DOSSIER <ArrowRight size={13} strokeWidth={2.2} aria-hidden="true" /></span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
