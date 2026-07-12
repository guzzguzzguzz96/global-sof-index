import Link from "next/link";
import PolicyPage from "@/components/PolicyPage";
import { pageMetadata } from "@/lib/seo";

const DESCRIPTION =
  "How Global SOF Index prioritizes sources, labels evidence confidence, handles corrections, and refuses to invent sources, licenses, equipment, or operational claims.";

export const metadata = pageMetadata({ title: "Editorial Policy", description: DESCRIPTION, path: "/editorial-policy" });

const LAST_REVIEWED = "2026-07-12";

const sections = [
  {
    id: "sources",
    title: "Source priority",
    body: (
      <>
        <p>Information is prioritized by source reliability, in roughly this order:</p>
        <ol>
          <li>Official government, military, or agency publications.</li>
          <li>Reputable published references, official museums, and archival records.</li>
          <li>Established news reporting and specialist open-source publications.</li>
          <li>Widely repeated public reporting — treated with caution and labeled accordingly.</li>
        </ol>
        <p>Lower-confidence sources are labeled, not hidden, so readers can judge them for themselves.</p>
      </>
    ),
  },
  {
    id: "labels",
    title: "Evidence-confidence labels",
    body: (
      <>
        <p>Every substantive claim carries a confidence label:</p>
        <dl className="policy-dl">
          <div><dt>Verified</dt><dd>Supported by official or authoritative public sources.</dd></div>
          <div><dt>Publicly documented</dt><dd>Documented in reputable public references.</dd></div>
          <div><dt>Commonly reported</dt><dd>Repeated across credible public sources but not officially confirmed.</dd></div>
          <div><dt>Historical / period-specific</dt><dd>Accurate to a specific era, not necessarily current.</dd></div>
          <div><dt>Research pending</dt><dd>Not yet verified; shown as pending rather than assumed.</dd></div>
        </dl>
      </>
    ),
  },
  {
    id: "corrections",
    title: "Corrections and update process",
    body: (
      <p>
        Errors are corrected as they are identified or reported. Policy pages carry a &quot;last
        reviewed&quot; date, and unit profiles are revised as public sources are reviewed. To report an
        issue, use the <Link href="/corrections">corrections process</Link>.
      </p>
    ),
  },
  {
    id: "prohibitions",
    title: "Editorial prohibitions",
    body: (
      <>
        <p className="policy-callout">
          The archive does <strong>not</strong> invent sources, licenses, credits, equipment,
          uniforms, personnel, or operational claims. Where public information is missing, it is marked
          unknown or research pending rather than fabricated.
        </p>
        <p>
          Representative media is never presented as confirmed unit media, and unrelated imagery is not
          reused to represent a different unit.
        </p>
      </>
    ),
  },
];

export default function EditorialPolicyPage() {
  return (
    <PolicyPage
      kicker="EDITORIAL STANDARD"
      title="Editorial Policy"
      path="/editorial-policy"
      description={DESCRIPTION}
      lastReviewed={LAST_REVIEWED}
      intro={<p>How Global SOF Index sources, labels, and corrects the information it publishes.</p>}
      sections={sections}
    />
  );
}
