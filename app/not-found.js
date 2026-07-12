import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <span>404 / FILE NOT FOUND</span>
      <h1>INTELLIGENCE RECORD UNAVAILABLE</h1>
      <p>ไม่พบหน้าหรือหน่วยที่คุณกำลังค้นหา</p>
      <Link href="/">RETURN TO DATABASE</Link>
    </main>
  );
}
