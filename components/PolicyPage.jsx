import Link from "next/link";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

// Shared layout for the four policy / reference pages. Each page supplies a
// `sections` array of { id, title, body } so the heading hierarchy, table of
// contents, and accessible anchors stay consistent across all of them.
export default function PolicyPage({ kicker, title, intro, lastReviewed, sections = [] }) {
  const showToc = sections.length >= 3;

  return (
    <main className="site-shell policy-shell">
      <SiteHeader />

      <nav className="policy-breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/#database">Database</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{title}</span>
      </nav>

      <header className="policy-header">
        {kicker ? <span className="section-kicker">{kicker}</span> : null}
        <h1>{title}</h1>
        {intro ? <div className="policy-intro">{intro}</div> : null}
        {lastReviewed ? (
          <p className="policy-reviewed">
            Last reviewed: <time dateTime={lastReviewed}>{lastReviewed}</time>
          </p>
        ) : null}
      </header>

      <div className={`policy-layout${showToc ? "" : " policy-layout--single"}`}>
        {showToc ? (
          <aside className="policy-toc" aria-label="Table of contents">
            <span className="policy-toc__title">On this page</span>
            <ol>
              {sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.title}</a>
                </li>
              ))}
            </ol>
          </aside>
        ) : null}

        <article className="policy-body">
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="policy-section">
              <h2>{section.title}</h2>
              {section.body}
            </section>
          ))}
        </article>
      </div>

      <SiteFooter />
    </main>
  );
}
