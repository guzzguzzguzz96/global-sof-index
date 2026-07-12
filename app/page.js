import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/JsonLd";
import UnitExplorer from "@/components/UnitExplorer";
import FeaturedDossiers from "@/components/FeaturedDossiers";
import CoverageMatrix from "@/components/CoverageMatrix";
import { units, getFeaturedUnits } from "@/data/units";
import { siteConfig } from "@/lib/siteConfig";

const HOME_DESCRIPTION =
  "Browse 60 special operations units across six continents. Filter by tier and mission and open public-source dossiers with editorial capability assessments — an open-source intelligence archive.";

export const metadata = {
  description: HOME_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: HOME_DESCRIPTION,
    url: `${siteConfig.url}/`,
    locale: siteConfig.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: HOME_DESCRIPTION,
  },
};

export default function HomePage() {
  const featured = getFeaturedUnits();
  const coverage = units.reduce((acc, unit) => {
    acc[unit.continent] = (acc[unit.continent] || 0) + 1;
    return acc;
  }, {});

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteConfig.name,
      url: `${siteConfig.url}/`,
      description: siteConfig.description,
    },
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `${siteConfig.name} — Unit Database`,
      url: `${siteConfig.url}/`,
      description: HOME_DESCRIPTION,
      numberOfItems: siteConfig.unitCount,
    },
  ];

  return (
    <main className="site-shell">
      <JsonLd data={jsonLd} />
      <SiteHeader />

      <section className="home-hero">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <span className="eyebrow"><i /> WORLDWIDE SPECIAL OPERATIONS INDEX</span>
          <h1>SPECIAL FORCES<br /><em>INTELLIGENCE DATABASE</em></h1>
          <p>
            ฐานข้อมูลเชิงภาพสำหรับสำรวจหน่วยปฏิบัติการพิเศษทั่วโลก แยกตามทวีป Tier ภารกิจ
            ประวัติ อาวุธ เครื่องแบบ และข้อมูลสาธารณะที่ตรวจสอบสถานะได้
          </p>
          <div className="hero-pills">
            <span><strong>{units.length}</strong> UNITS</span>
            <span><strong>6</strong> CONTINENTS</span>
            <span><strong>3</strong> TIERS</span>
            <span><strong>OSINT</strong> CONTENT MODEL</span>
          </div>
        </div>

        <div className="hero-aside">
          <CoverageMatrix total={units.length} counts={coverage} />

          <div className="hero-terminal">
            <div className="terminal-head"><span>ARCHIVE STATUS</span><i /></div>
            <TerminalRow label="UNIT RECORDS" value={`${units.length} ONLINE`} />
            <TerminalRow label="RICH DOSSIERS" value={`${featured.length} SEEDED`} />
            <TerminalRow label="CONTENT FLAGS" value="VERIFIED / REPORTED / UNKNOWN" />
            <TerminalRow label="DYNAMIC ROUTES" value="ACTIVE" active />
          </div>
        </div>
      </section>

      <FeaturedDossiers units={featured} />

      <UnitExplorer units={units} />

      <section className="methodology-section" id="methodology">
        <div>
          <span className="section-kicker">EDITORIAL STANDARD</span>
          <h2>ข้อมูลที่ชัดเจนกว่าความรู้สึกว่า “หน่วยนี้ใช้ของอะไร”</h2>
          <Link href="/methodology" className="methodology-link">อ่าน Methodology ฉบับเต็ม →</Link>
        </div>
        <div className="methodology-grid">
          <Method number="01" title="VERIFIED" text="ข้อมูลจากหน่วยงานรัฐ เอกสารทางการ หรือภาพที่ระบุหน่วยและบริบทได้" />
          <Method number="02" title="PUBLICLY REPORTED" text="ข้อมูลที่พบซ้ำจากแหล่งสาธารณะที่น่าเชื่อถือ แต่ไม่ใช่บัญชีอุปกรณ์ทางการ" />
          <Method number="03" title="MISSION DEPENDENT" text="อาวุธ เครื่องแบบ และชุดป้องกันเปลี่ยนตามภารกิจ ช่วงเวลา และหน่วยย่อย" />
          <Method number="04" title="UNKNOWN" text="สิ่งที่ไม่มีข้อมูลสาธารณะจะแสดงว่าไม่เปิดเผย แทนการเติมข้อมูลให้ดูครบ" />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function TerminalRow({ label, value, active }) {
  return <div className="terminal-row"><span>{label}</span><strong className={active ? "active" : ""}>{value}</strong></div>;
}

function Method({ number, title, text }) {
  return <article><span>{number}</span><h3>{title}</h3><p>{text}</p></article>;
}
