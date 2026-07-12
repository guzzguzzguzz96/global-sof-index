import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/JsonLd";
import CapabilityRadar from "@/components/CapabilityRadar";
import MediaGallery from "@/components/MediaGallery";
import UnitCard from "@/components/UnitCard";
import EditorialStatus from "@/components/EditorialStatus";
import SourceList from "@/components/SourceList";
import { getUnitBySlug, getRelatedUnits, units } from "@/data/units";
import { siteConfig } from "@/lib/siteConfig";
import { DEFAULT_OG_IMAGE, DEFAULT_TWITTER_IMAGE } from "@/lib/seo";
import { displayFact, UNKNOWN_STATE } from "@/lib/editorial";

export function generateStaticParams() {
  return units.map((unit) => ({ slug: unit.slug }));
}

// Titles and descriptions are derived only from existing unit data.
function unitTitle(unit) {
  return `${unit.code} — ${unit.name}`;
}
function unitDescription(unit) {
  const tags = unit.tags.slice(0, 3).join(", ");
  const dossier = unit.detailLevel === "expanded" ? "Full dossier" : "Basic dossier";
  return `${unit.name} (${unit.code}) — ${unit.country} special operations unit. Role: ${unit.role}. Mission focus: ${tags}. ${dossier} in the Global SOF Index open-source archive.`;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const unit = getUnitBySlug(slug);
  if (!unit) return { title: "Unit not found" };

  const title = unitTitle(unit);
  const description = unitDescription(unit);
  const canonicalPath = `/units/${unit.slug}`;
  const canonicalUrl = `${siteConfig.url}${canonicalPath}`;

  // Use the unit cover only when it is confirmed (verified) media; otherwise fall
  // back to the default brand Open Graph / Twitter image.
  const cover = unit.media?.cover;
  const useCover = cover?.status === "verified" && cover?.src;
  const ogImages = useCover ? [{ url: cover.src, alt: cover.alt || title }] : [DEFAULT_OG_IMAGE];
  const twImages = useCover ? [{ url: cover.src, alt: cover.alt || title }] : [DEFAULT_TWITTER_IMAGE];

  return {
    title,
    description,
    alternates: { canonical: canonicalPath },
    openGraph: {
      type: "article",
      siteName: siteConfig.name,
      title,
      description,
      url: canonicalUrl,
      locale: siteConfig.locale,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: twImages,
    },
  };
}

export default async function UnitDetailPage({ params }) {
  const { slug } = await params;
  const unit = getUnitBySlug(slug);
  if (!unit) notFound();
  const related = getRelatedUnits(unit, 3);

  const canonicalUrl = `${siteConfig.url}/units/${unit.slug}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: unitTitle(unit),
      description: unitDescription(unit),
      url: canonicalUrl,
      isPartOf: {
        "@type": "WebSite",
        name: siteConfig.name,
        url: `${siteConfig.url}/`,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Database", item: `${siteConfig.url}/#database` },
        { "@type": "ListItem", position: 2, name: unitTitle(unit), item: canonicalUrl },
      ],
    },
  ];

  return (
    <main className="site-shell detail-site">
      <JsonLd data={jsonLd} />
      <SiteHeader />

      <section className="detail-hero">
        {unit.coverImage && <img className="detail-cover" src={unit.coverImage} alt="" />}
        <div className="detail-cover-overlay" />
        <div className="detail-hero-content">
          <Link href="/#database" className="back-link">← BACK TO DATABASE</Link>
          <div className="detail-identity">
            <div className="detail-emblem">
              {unit.logoUrl ? <img src={unit.logoUrl} alt={`ตราสัญลักษณ์ ${unit.code}`} /> : <span>{unit.code.slice(0, 4)}</span>}
            </div>
            <div>
              <div className="detail-country"><span>{unit.flag}</span>{unit.country} · {unit.continent}</div>
              <h1>{unit.code}</h1>
              <p>{unit.name}</p>
              <div className="detail-tags">
                <span className={`detail-tier tier-${unit.tier.toLowerCase()}`}>TIER {unit.tier}</span>
                {unit.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </div>
          </div>
          <div className="detail-status-panel">
            <StatusRow label="DOSSIER LEVEL" value={unit.editorial.completeness.toUpperCase()} />
            <StatusRow label="MEDIA" value={unit.mediaStatus.toUpperCase()} />
            <StatusRow label="EQUIPMENT DATA" value={unit.equipment.dataStatus.toUpperCase()} />
            <StatusRow
              label="LAST REVIEWED"
              value={unit.editorial.lastReviewed
                ? <time dateTime={unit.editorial.lastReviewed}>{unit.editorial.lastReviewed}</time>
                : "Editorial review pending"}
              active={Boolean(unit.editorial.lastReviewed)}
            />
          </div>
        </div>
      </section>

      <nav className="dossier-nav">
        <a href="#overview">OVERVIEW</a>
        <a href="#capability">CAPABILITY</a>
        <a href="#equipment">EQUIPMENT</a>
        <a href="#uniform">UNIFORM</a>
        <a href="#media">MEDIA</a>
        <a href="#sources">SOURCES</a>
      </nav>

      <div className="detail-layout">
        <div className="detail-main">
          <section className="intel-panel" id="overview">
            <PanelHeading eyebrow="FILE 01" title="ประวัติและบทบาทโดยย่อ" meta="OPEN-SOURCE SUMMARY" />
            <p className="lead-copy">{unit.history.summary}</p>
            <div className="fact-grid">
              <Fact label="Founded" value={displayFact(unit.founded, UNKNOWN_STATE.RESEARCH_PENDING)} />
              <Fact label="Branch" value={displayFact(unit.branch, UNKNOWN_STATE.NOT_CONFIRMED)} />
              <Fact label="Unit type" value={displayFact(unit.unitType)} />
              <Fact label="Status" value={displayFact(unit.status)} />
              <Fact label="Personnel" value={displayFact(unit.personnel)} />
              <Fact label="Primary environment" value={displayFact(unit.environment.join(" / "))} />
            </div>
          </section>

          <section className="intel-panel" id="capability">
            <PanelHeading eyebrow="FILE 02" title="Capability Profile" meta="EDITORIAL VISUAL MODEL" />
            <div className="capability-layout">
              <CapabilityRadar scores={unit.capability} />
              <div className="capability-bars">
                {Object.entries({
                  Selection: unit.scores.selection,
                  Versatility: unit.scores.versatility,
                  Environment: unit.scores.environment,
                  "Mental resilience": unit.capability.mental,
                  "Joint operations": unit.capability.joint,
                }).map(([label, value]) => <Progress key={label} label={label} value={value} />)}
              </div>
            </div>
            <div className="mission-grid">
              {unit.capabilities.map((item) => <article key={item.title}><span>{item.code}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}
            </div>
          </section>

          <section className="intel-panel" id="equipment">
            <PanelHeading eyebrow="FILE 03" title="อาวุธและอุปกรณ์ที่มีข้อมูลสาธารณะ" meta={unit.equipment.dataStatus.toUpperCase()} />
            <div className="editorial-warning">
              <strong>MISSION-DEPENDENT LOADOUT</strong>
              <p>รายการนี้ไม่ใช่บัญชีประจำการอย่างเป็นทางการ อุปกรณ์จริงอาจเปลี่ยนตามยุค ภารกิจ ทีมย่อย และประเทศที่ปฏิบัติการ</p>
            </div>
            <EquipmentGroup title="อาวุธหลัก" items={unit.equipment.primary} empty="ยังไม่มีรุ่นที่ผ่านการตรวจสอบ" />
            <EquipmentGroup title="อาวุธรอง" items={unit.equipment.sidearms} empty="ยังไม่มีรุ่นที่ผ่านการตรวจสอบ" />
            <EquipmentGroup title="มีดพกและเครื่องมือ" items={unit.equipment.blades} empty="โดยทั่วไปเป็นอุปกรณ์ส่วนบุคคลหรือเลือกตามภารกิจ" />
            <EquipmentGroup title="อุปกรณ์เสริม" items={unit.equipment.support} empty="ยังไม่มีข้อมูล" />
          </section>

          <section className="intel-panel" id="uniform">
            <PanelHeading eyebrow="FILE 04" title="เครื่องแบบ สี และลายพราง" meta="MISSION & PERIOD DEPENDENT" />
            <div className="uniform-grid">
              <UniformCard label="Base colors" values={unit.uniform.colors} />
              <UniformCard label="Camouflage patterns" values={unit.uniform.patterns} />
              <UniformCard label="Headgear" values={unit.uniform.headgear} />
              <UniformCard label="Armor & load carriage" values={unit.uniform.armor} />
            </div>
            <p className="uniform-note">{unit.uniform.note}</p>
          </section>

          <section className="intel-panel" id="media">
            <PanelHeading eyebrow="FILE 05" title="Visual Archive" meta={`${unit.gallery.length} MEDIA FILES`} />
            <MediaGallery images={unit.gallery} unitCode={unit.code} />
          </section>

          <section className="intel-panel" id="sources">
            <PanelHeading eyebrow="FILE 06" title="แหล่งข้อมูลและสถานะความเชื่อมั่น" meta="EDITORIAL TRACEABILITY" />
            <SourceList sources={unit.sources} />
          </section>
        </div>

        <aside className="detail-sidebar">
          <section className="intel-panel">
            <PanelHeading eyebrow="IDENTITY" title="Unit Snapshot" meta={unit.country.toUpperCase()} />
            <div className="snapshot-list">
              <Snapshot label="Official / common name" value={unit.name} />
              <Snapshot label="Abbreviation" value={unit.code} />
              <Snapshot label="Country" value={`${unit.flag} ${unit.country}`} />
              <Snapshot label="Continent" value={unit.continent} />
              <Snapshot label="Branch" value={displayFact(unit.branch, UNKNOWN_STATE.NOT_CONFIRMED)} />
              <Snapshot label="Primary role" value={unit.role} />
            </div>
          </section>

          <section className="intel-panel">
            <PanelHeading eyebrow="TIMELINE" title="Short History" meta={`${unit.timeline.length} EVENTS`} />
            <div className="timeline-list">
              {unit.timeline.map((event) => <article key={`${event.year}-${event.title}`}><i /><time>{event.year}</time><div><h3>{event.title}</h3><p>{event.description}</p></div></article>)}
            </div>
          </section>

          <section className="intel-panel">
            <PanelHeading eyebrow="ORIGIN" title="Country / Location" meta={unit.continent.toUpperCase()} />
            <div className="map-visual"><span>{unit.flag}</span><strong>{unit.country}</strong><small>ORIGIN / OPERATING BASE</small></div>
          </section>

          <section className="intel-panel">
            <PanelHeading eyebrow="EDITORIAL" title="Editorial Status" meta={unit.editorial.completeness.toUpperCase()} />
            <EditorialStatus editorial={unit.editorial} />
          </section>

          <section className="intel-panel confidence-panel">
            <strong>DATA RELIABILITY</strong>
            <p>{unit.contentNote}</p>
          </section>
        </aside>
      </div>

      <section className="related-section">
        <div className="section-heading"><div><span className="section-kicker">RELATED FILES</span><h2>หน่วยที่มีภารกิจหรือภูมิภาคใกล้เคียง</h2></div></div>
        <div className="unit-grid related-grid">{related.map((item) => <UnitCard key={item.slug} unit={item} />)}</div>
      </section>

      <SiteFooter />
    </main>
  );
}

function StatusRow({ label, value, active }) {
  return <div><span>{label}</span><strong className={active ? "active" : ""}>{value}</strong></div>;
}
function PanelHeading({ eyebrow, title, meta }) {
  return <header className="panel-heading"><div><span>{eyebrow}</span><h2>{title}</h2></div><small>{meta}</small></header>;
}
function Fact({ label, value }) {
  return <div className="fact-card"><span>{label}</span><strong>{value}</strong></div>;
}
function Progress({ label, value }) {
  return <div className="progress-row"><div><span>{label}</span><strong>{value}%</strong></div><i><b style={{ width: `${value}%` }} /></i></div>;
}
function EquipmentGroup({ title, items, empty }) {
  return (
    <div className="equipment-group">
      <h3>{title}</h3>
      <div className="equipment-grid">
        {items.length ? items.map((item) => (
          <article key={`${title}-${item.model}`}>
            <span className={`confidence confidence-${item.confidence}`}>{item.confidenceLabel}</span>
            <h4>{item.model}</h4><small>{item.type}</small><p>{item.note}</p>
          </article>
        )) : <div className="equipment-empty">{empty}</div>}
      </div>
    </div>
  );
}
function UniformCard({ label, values }) {
  return <article><span>{label}</span><div>{values.map((value) => <strong key={value}>{value}</strong>)}</div></article>;
}
function Snapshot({ label, value }) {
  return <div><span>{label}</span><strong>{value}</strong></div>;
}
