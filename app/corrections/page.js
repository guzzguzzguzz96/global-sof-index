import PolicyPage from "@/components/PolicyPage";
import { pageMetadata } from "@/lib/seo";

const DESCRIPTION =
  "How to request a correction to a Global SOF Index unit profile: what to include, the editorial review process, and where to send it.";

export const metadata = pageMetadata({ title: "Corrections", description: DESCRIPTION, path: "/corrections" });

const LAST_REVIEWED = "2026-07-12";
const CONTACT_EMAIL = "globalsofindex@gmail.com";

const sections = [
  {
    id: "submit",
    title: "How to submit a correction",
    body: (
      <>
        <p>
          Corrections can be sent by email. No account or submission form is required. Please send one
          message per issue so each can be reviewed individually.
        </p>
        <p>
          <a className="policy-mailto" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>
      </>
    ),
  },
  {
    id: "include",
    title: "What to include",
    body: (
      <>
        <p>To help the review move quickly, please include:</p>
        <ul>
          <li><strong>Affected unit and page URL</strong> — the specific unit and the address of the page.</li>
          <li><strong>Disputed statement</strong> — the exact text or value you believe is incorrect.</li>
          <li><strong>Supporting source</strong> — a public, verifiable source that supports the correction.</li>
          <li><strong>Requester contact information</strong> — an email address where we can follow up.</li>
        </ul>
      </>
    ),
  },
  {
    id: "process",
    title: "Editorial review process",
    body: (
      <>
        <ol>
          <li>The request is logged and matched to the affected profile.</li>
          <li>The supporting source is checked against the archive&apos;s source-priority and confidence rules.</li>
          <li>If verified, the profile is updated and its confidence label adjusted.</li>
          <li>If a claim cannot be verified from public sources, it may be marked research pending rather than changed.</li>
        </ol>
        <p>
          Because sources are reviewed individually, response times vary. Providing a stronger public
          source speeds up the review.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    body: (
      <>
        <p>Send correction requests to:</p>
        <p>
          <a className="policy-mailto" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>
        <p>
          Please do not send sensitive, classified, or non-public information. The archive only handles
          public, open-source material.
        </p>
      </>
    ),
  },
];

export default function CorrectionsPage() {
  return (
    <PolicyPage
      kicker="ACCURACY & REVIEW"
      title="Corrections"
      path="/corrections"
      description={DESCRIPTION}
      lastReviewed={LAST_REVIEWED}
      intro={
        <p>
          Help keep the archive accurate. Correction requests are reviewed editorially against public
          sources.
        </p>
      }
      sections={sections}
    />
  );
}
