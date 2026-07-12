import Link from "next/link";
import PolicyPage from "@/components/PolicyPage";
import { pageMetadata } from "@/lib/seo";

const DESCRIPTION =
  "Global SOF Index is an independent, educational, open-source reference archive with no affiliation to any military, police, government, or security organization.";

export const metadata = pageMetadata({ title: "Disclaimer", description: DESCRIPTION, path: "/disclaimer" });

const LAST_REVIEWED = "2026-07-12";

const sections = [
  {
    id: "affiliation",
    title: "No affiliation",
    body: (
      <p>
        Global SOF Index is an independent, open-source reference project. It is{" "}
        <strong>not affiliated with, endorsed by, or connected to</strong> any military, police,
        intelligence, government, or security organization.
      </p>
    ),
  },
  {
    id: "purpose",
    title: "Educational and open-source reference purpose",
    body: (
      <p>
        The archive is provided for educational and open-source reference purposes only. It aggregates
        publicly available information to help readers browse and study special operations units.
      </p>
    ),
  },
  {
    id: "advice",
    title: "No operational or tactical advice",
    body: (
      <p>
        Nothing in this archive constitutes operational, tactical, security, or professional advice.
        It must not be used for operational planning of any kind.
      </p>
    ),
  },
  {
    id: "accuracy",
    title: "Information may be incomplete or disputed",
    body: (
      <p>
        Information may be incomplete, outdated, disputed, or in error. Public reporting on special
        operations units is limited and evolves over time. Readers should verify important details
        against primary sources.
      </p>
    ),
  },
  {
    id: "trademarks",
    title: "Names, insignia, and trademarks",
    body: (
      <p>
        Unit names, insignia, emblems, and trademarks are the property of their respective owners.
        They are referenced here for identification and educational purposes only, and their inclusion
        does not imply any affiliation or endorsement.
      </p>
    ),
  },
  {
    id: "media",
    title: "Media and image licensing",
    body: (
      <p>
        Image usage depends on the license of each individual media source. Media is attributed to its
        source where available, and licensing terms belong to the original rights holders. See the{" "}
        <Link href="/editorial-policy">editorial policy</Link> for how media is classified.
      </p>
    ),
  },
  {
    id: "scores",
    title: "Capability scores are editorial assessments",
    body: (
      <p>
        Tier placements and capability scores are <strong>editorial assessments</strong> and
        comparative estimates, not measured operational statistics or official rankings. See the{" "}
        <Link href="/methodology">methodology</Link> for details.
      </p>
    ),
  },
];

export default function DisclaimerPage() {
  return (
    <PolicyPage
      kicker="LEGAL & REFERENCE"
      title="Disclaimer"
      path="/disclaimer"
      description={DESCRIPTION}
      lastReviewed={LAST_REVIEWED}
      intro={<p>This disclaimer applies to the entire Global SOF Index archive.</p>}
      sections={sections}
    />
  );
}
