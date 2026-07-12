import Link from "next/link";

const POLICY_LINKS = [
  { href: "/methodology", label: "Methodology" },
  { href: "/editorial-policy", label: "Editorial Policy" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/corrections", label: "Corrections" },
];

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__brand">
        <strong>GLOBAL SOF INDEX</strong>
        <span>Open-source Special Operations Intelligence Archive</span>
        <p>
          Educational and open-source reference. Not affiliated with any military, police,
          intelligence, government, or security organization.
        </p>
      </div>

      <nav className="site-footer__nav" aria-label="Reference and policy">
        {POLICY_LINKS.map((link) => (
          <Link key={link.href} href={link.href}>{link.label}</Link>
        ))}
      </nav>

      <div className="site-footer__meta">
        <span>© 2026 Global SOF Index</span>
      </div>
    </footer>
  );
}
