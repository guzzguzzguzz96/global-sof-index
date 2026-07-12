import Link from "next/link";
import PolicyPage from "@/components/PolicyPage";

export const metadata = {
  title: "Methodology",
  description:
    "How Global SOF Index selects units, models tiers and capability scores, classifies evidence, and verifies media — an editorial analytical model, not an official ranking.",
};

const LAST_REVIEWED = "2026-07-12";

const sections = [
  {
    id: "purpose",
    title: "Purpose and scope",
    body: (
      <>
        <p>
          Global SOF Index is an educational, open-source intelligence archive that organizes
          publicly available information about special operations and special-mission units
          worldwide. It exists to make open-source reference material easier to browse, compare,
          and cite.
        </p>
        <p>
          The archive does not publish classified, operational, or otherwise non-public
          information. Every profile is built from public sources and labeled by confidence level.
        </p>
      </>
    ),
  },
  {
    id: "inclusion",
    title: "Unit inclusion criteria",
    body: (
      <>
        <p>A unit is considered for inclusion when it meets the following criteria:</p>
        <ul>
          <li>It is a recognized special operations, special-mission, or elite tactical unit with a public identity.</li>
          <li>Basic, non-sensitive information about its role or history is available from public sources.</li>
          <li>It can be attributed to a specific country and a parent branch or agency.</li>
        </ul>
        <p>
          Inclusion does not imply endorsement, and the absence of a unit does not imply judgment.
          Coverage expands as public material is reviewed.
        </p>
      </>
    ),
  },
  {
    id: "tiers",
    title: "Tier definitions",
    body: (
      <>
        <p className="policy-callout">
          The tier list is an editorial analytical model for grouping units by publicly discussed
          prominence and breadth of capability. It is <strong>not an official military ranking</strong>{" "}
          and does not measure real-world performance.
        </p>
        <dl className="policy-dl">
          <div>
            <dt>S — World Class</dt>
            <dd>Broad, well-documented capability across multiple mission sets with a significant public operational record.</dd>
          </div>
          <div>
            <dt>A — Regional Elite</dt>
            <dd>Highly capable units with strong regional roles and a substantial, if narrower, public profile.</dd>
          </div>
          <div>
            <dt>B — Specialized</dt>
            <dd>Capable units with a more focused mission set or more limited public documentation.</dd>
          </div>
        </dl>
        <p>Tiers reflect editorial assessment of publicly available information only.</p>
      </>
    ),
  },
  {
    id: "scoring",
    title: "Capability scoring model",
    body: (
      <>
        <p>
          Each profile includes comparative capability indicators — such as selection, versatility,
          and environmental range — plus a capability radar. These values are{" "}
          <strong>editorial comparative estimates</strong>, derived from public reputation and
          documented role.
        </p>
        <p className="policy-callout">
          Scores are comparative estimates, not measured operational statistics. Public information
          about special operations units is incomplete, so every value carries uncertainty and should
          be read as relative rather than precise.
        </p>
      </>
    ),
  },
  {
    id: "evidence",
    title: "Evidence classification",
    body: (
      <>
        <p>Facts within a profile are labeled by confidence so readers can weigh them:</p>
        <dl className="policy-dl">
          <div><dt>Verified</dt><dd>Supported by official or authoritative public sources.</dd></div>
          <div><dt>Publicly documented</dt><dd>Documented in reputable public references.</dd></div>
          <div><dt>Commonly reported</dt><dd>Repeated across credible public sources but not officially confirmed.</dd></div>
          <div><dt>Historical / period-specific</dt><dd>Accurate to a specific era, not necessarily current.</dd></div>
          <div><dt>Research pending</dt><dd>Not yet verified; shown as pending rather than assumed.</dd></div>
        </dl>
        <p>
          Where public information is missing, the archive marks it as unknown or research pending
          rather than filling the gap with assumptions. See the{" "}
          <Link href="/editorial-policy">editorial policy</Link> for full definitions.
        </p>
      </>
    ),
  },
  {
    id: "comparison",
    title: "Military and police-unit comparison",
    body: (
      <>
        <p>
          The archive includes both military special operations units and police or gendarmerie
          tactical units. These operate under different mandates, legal frameworks, and mission
          profiles.
        </p>
        <p className="policy-callout">
          Different units have different missions and should not be treated as directly
          interchangeable. A high tier or score in one context does not imply superiority in a
          different mission set.
        </p>
        <p>
          Comparisons are provided for reference and browsing, not to rank organizations against one
          another operationally.
        </p>
      </>
    ),
  },
  {
    id: "media",
    title: "Media verification model",
    body: (
      <>
        <p>Imagery is classified by how confidently it can be tied to the specific unit:</p>
        <ul>
          <li><strong>Verified media</strong> — publicly attributable to the unit.</li>
          <li><strong>Official emblem</strong> — the unit&apos;s insignia or patch.</li>
          <li><strong>Representative media</strong> — illustrative imagery of the broader community, not confirmed unit media.</li>
          <li><strong>Media research pending</strong> — no confirmed public imagery has been curated yet; a designed placeholder is shown.</li>
        </ul>
        <p>
          Representative imagery is never presented as confirmed unit media, and unrelated photos are
          not reused to stand in for a different unit. Licensing follows each source; see the{" "}
          <Link href="/disclaimer">disclaimer</Link>.
        </p>
      </>
    ),
  },
  {
    id: "updates",
    title: "Update policy",
    body: (
      <>
        <p>
          Profiles are revised as new public sources are reviewed or as errors are reported. Each
          policy page shows a &quot;last reviewed&quot; date, and substantive changes to a unit
          profile update its editorial status.
        </p>
        <p>
          Readers can request changes through the{" "}
          <Link href="/corrections">corrections process</Link>.
        </p>
      </>
    ),
  },
  {
    id: "limitations",
    title: "Known limitations",
    body: (
      <ul>
        <li>Public information about special operations units is incomplete, and some details are classified or disputed.</li>
        <li>Tiers and scores are editorial models, not official or measured rankings.</li>
        <li>Equipment and uniform details change by era, sub-unit, and mission and are not authoritative loadouts.</li>
        <li>Media may be representative rather than confirmed.</li>
        <li>Coverage is uneven; some units have richer public records than others.</li>
      </ul>
    ),
  },
];

export default function MethodologyPage() {
  return (
    <PolicyPage
      kicker="EDITORIAL FRAMEWORK"
      title="Methodology"
      lastReviewed={LAST_REVIEWED}
      intro={
        <p>
          This page explains how units are selected, how tiers and capability scores are modeled, and
          how evidence and media are classified. The tier list is an analytical editorial model — not
          an official military ranking.
        </p>
      }
      sections={sections}
    />
  );
}
