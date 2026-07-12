"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function SiteHeader() {
  const [logoOk, setLogoOk] = useState(true);

  return (
    <header className="site-header">
      <Link href="/" className="site-brand" aria-label="Global SOF Index home">
        <span className="site-brand__mark">
          {logoOk ? (
            <Image
              src="/brand/global-sof-mark.png"
              alt="Global SOF Index"
              width={48}
              height={48}
              priority
              onError={() => setLogoOk(false)}
            />
          ) : (
            <span className="site-brand__fallback" aria-hidden="true">GI</span>
          )}
        </span>

        <span className="site-brand__copy">
          <span className="site-brand__title">GLOBAL SOF INDEX</span>
          <span className="site-brand__subtitle">Open-source intelligence archive</span>
        </span>
      </Link>

      <nav className="header-nav" aria-label="Primary navigation">
        <Link href="/#database">DATABASE</Link>
        <Link href="/#methodology">METHODOLOGY</Link>
        <span className="system-status"><i /> SYSTEM ONLINE</span>
      </nav>
    </header>
  );
}
