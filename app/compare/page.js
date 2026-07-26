import Link from "next/link";
import { ArrowLeft, GitCompareArrows } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CompareTable from "@/components/compare/CompareTable";
import CompareSync from "@/components/compare/CompareSync";
import { units, getUnitBySlug } from "@/data/units";
import { pageMetadata } from "@/lib/seo";
import { MAX_COMPARE, MIN_COMPARE, parseUnitsParam } from "@/lib/compare";

const DESCRIPTION =
  "Compare up to four public special operations unit profiles side by side — identity, parent institution, editorial completeness and mission focus, drawn from the Global SOF Index open-source archive.";

const VALID_SLUGS = new Set(units.map((unit) => unit.slug));

export const metadata = {
  ...pageMetadata({ title: "Compare Units", description: DESCRIPTION, path: "/compare" }),
  // Comparison URLs are visitor-driven parameter permutations of content that is
  // already indexed on each unit page. They are kept out of the index so the
  // archive does not accumulate low-value duplicate entries, while links from
  // the page remain followable. The route is likewise absent from sitemap.js.
  robots: { index: false, follow: true },
};

export default async function ComparePage({ searchParams }) {
  // `searchParams` is a promise in the App Router. Awaiting an absent value is
  // safe, and the `|| {}` guard covers a malformed or empty resolution.
  const params = (await searchParams) || {};
  const slugs = parseUnitsParam(params.units, VALID_SLUGS);
  const selected = slugs.map((slug) => getUnitBySlug(slug)).filter(Boolean);
  const ready = selected.length >= MIN_COMPARE;

  return (
    <main className="site-shell">
      <SiteHeader />
      <CompareSync slugs={slugs} />

      <section className="compare-page">
        <header className="compare-page__header">
          <span className="section-kicker">CROSS-REFERENCE</span>
          <h1>UNIT COMPARISON MATRIX</h1>
          <p>
            เปรียบเทียบข้อมูลสาธารณะของหน่วยแบบเคียงข้างกัน สูงสุด {MAX_COMPARE} หน่วย
            ค่าทุกช่องมาจากเรกคอร์ดเดิมของแต่ละหน่วย ไม่มีการเติมข้อมูลที่ยังไม่ได้ตรวจสอบ
          </p>

          <div className="compare-page__meta">
            <span className="compare-page__count">
              {selected.length} / {MAX_COMPARE} UNITS SELECTED
            </span>
            <Link href="/#database" className="compare-page__link">
              <ArrowLeft size={13} strokeWidth={2.2} aria-hidden="true" /> Back to Unit Explorer
            </Link>
          </div>
        </header>

        {ready ? (
          <CompareTable units={selected} />
        ) : (
          <div className="compare-empty">
            <GitCompareArrows size={26} strokeWidth={1.7} aria-hidden="true" />
            <strong>Select at least {MIN_COMPARE} units to begin a comparison.</strong>
            <p>
              {selected.length === 1
                ? "หนึ่งหน่วยถูกเลือกไว้แล้ว เลือกเพิ่มอีกอย่างน้อยหนึ่งหน่วยจาก Unit Explorer เพื่อเริ่มเปรียบเทียบ"
                : "เลือกหน่วยจากปุ่ม Compare บนการ์ดหน่วยใน Unit Explorer หรือจากหน้ารายละเอียดของแต่ละหน่วย"}
            </p>
            <Link href="/#database" className="compare-empty__cta">
              Open Unit Explorer
            </Link>
          </div>
        )}

        {ready ? (
          <p className="compare-page__footnote">
            ตารางนี้แสดงเฉพาะข้อมูลที่มีอยู่ในเรกคอร์ดของแต่ละหน่วย ช่องที่ยังไม่มีข้อมูลสาธารณะที่ตรวจสอบแล้ว
            จะแสดงสถานะไม่ยืนยัน ไม่ใช่ค่าศูนย์ หน่วยตำรวจและหน่วยบังคับบัญชาระดับปฏิบัติการยังคงถูกจำแนกตามประเภทจริงของตนเอง
            และดัชนีเชิงเปรียบเทียบเป็นแบบจำลองเชิงบรรณาธิการ ไม่ใช่การจัดอันดับทางการ
          </p>
        ) : null}
      </section>

      <SiteFooter />
    </main>
  );
}
