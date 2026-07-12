import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "Record Not Found",
};

export default function NotFound() {
  return (
    <main className="site-shell">
      <SiteHeader />

      <section className="not-found-page">
        <span>404 / RECORD NOT FOUND</span>
        <h1>INTELLIGENCE RECORD UNAVAILABLE</h1>
        <p>
          The page or unit you are looking for is not in the archive, or its route has changed.
          Some units are still in the research queue.
        </p>
        <p className="not-found-th">
          ไม่พบหน้าหรือหน่วยที่คุณกำลังค้นหา — บางหน่วยอาจยังอยู่ระหว่างการรวบรวมข้อมูล
        </p>
        <div className="not-found-actions">
          <Link href="/#database" className="nf-btn nf-btn--primary">RETURN TO DATABASE</Link>
          <Link href="/methodology" className="nf-btn nf-btn--ghost">READ METHODOLOGY</Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
