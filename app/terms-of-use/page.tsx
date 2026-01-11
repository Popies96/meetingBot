import Link from "next/link";

export const metadata = {
  title: "Terms of Use",
  description:
    "NeuroNote Terms of Service and Acceptable Use Policy for AI meeting intelligence, integrations, and subscriptions.",
  alternates: { canonical: "/terms-of-use" },
};

export default function PolicyPage() {
  const today = new Date();
  const effective = new Date(today.getFullYear(), 0, 1);

  return (
    <main className="mx-auto max-w-7xl px-6 py-12" itemScope itemType="https://schema.org/Article">
      <header className="mb-8">
        <h1 id="terms-of-use" itemProp="headline" className="text-3xl md:text-4xl font-bold">Terms of Use</h1>
        <p className="text-sm text-gray-400"><strong>Effective:</strong> {effective.toLocaleDateString()}</p>
        <p className="mt-4 max-w-3xl text-gray-300">
          These Terms of Use ("Terms") govern your access to and use of <strong>NeuroNote</strong>, a platform that automatically joins video
          calls (Zoom, Google Meet, Microsoft Teams) and provides AI-powered transcription, summaries, and actionable insights. By using the Service,
          you agree to these Terms. This page is public for search engines and third-party verification.
        </p>
      </header>

      <div className="grid grid-cols-12 gap-8">
        <aside className="col-span-12 md:col-span-3 md:block hidden">
          <nav className="sticky top-24 space-y-2 text-sm">
            <p className="uppercase tracking-wide text-gray-400">Sections</p>
            <ul className="space-y-2">
              <li><Link className="text-gray-200 hover:text-white" href="#eligibility">Eligibility</Link></li>
              <li><Link className="text-gray-200 hover:text-white" href="#account">Account Registration & Security</Link></li>
              <li><Link className="text-gray-200 hover:text-white" href="#access">Access & Authorization</Link></li>
              <li><Link className="text-gray-200 hover:text-white" href="#acceptable-use">Acceptable Use</Link></li>
              <li><Link className="text-gray-200 hover:text-white" href="#content-ownership">Customer Content & Ownership</Link></li>
              <li><Link className="text-gray-200 hover:text-white" href="#our-ip">Our Intellectual Property</Link></li>
              <li><Link className="text-gray-200 hover:text-white" href="#billing">Subscriptions & Billing</Link></li>
              <li><Link className="text-gray-200 hover:text-white" href="#ai-beta">AI Features & Beta</Link></li>
              <li><Link className="text-gray-200 hover:text-white" href="#third-parties">Third‑Party Services</Link></li>
              <li><Link className="text-gray-200 hover:text-white" href="#confidentiality">Confidentiality</Link></li>
              <li><Link className="text-gray-200 hover:text-white" href="#privacy">Privacy</Link></li>
              <li><Link className="text-gray-200 hover:text-white" href="#support-access">Support Access & Permissions</Link></li>
              <li><Link className="text-gray-200 hover:text-white" href="#termination">Termination</Link></li>
              <li><Link className="text-gray-200 hover:text-white" href="#disclaimers">Disclaimers</Link></li>
              <li><Link className="text-gray-200 hover:text-white" href="#liability">Limitation of Liability</Link></li>
              <li><Link className="text-gray-200 hover:text-white" href="#indemnity">Indemnification</Link></li>
              <li><Link className="text-gray-200 hover:text-white" href="#governing-law">Governing Law</Link></li>
              <li><Link className="text-gray-200 hover:text-white" href="#changes">Changes to Terms</Link></li>
              <li><Link className="text-gray-200 hover:text-white" href="#contact">Contact</Link></li>
            </ul>
          </nav>
        </aside>

        <article className="col-span-12 md:col-span-9 mx-auto max-w-3xl prose" role="article">

      <h2 id="eligibility">Eligibility</h2>
      <p>You must be legally able to form a contract and use the Service in compliance with applicable laws.</p>

      <h2 id="account">Account Registration & Security</h2>
      <p>
        You must provide accurate account information and keep credentials secure. Notify us immediately of
        unauthorized access. You are responsible for all actions under your account.
      </p>

      <h2 id="access">Access & Authorization</h2>
      <p>
        By connecting calendars, conferencing platforms, or integrations, you grant NeuroNote permission to access
        content within the scopes you authorize to schedule, join, and process meetings.
      </p>

      <h2 id="support-access">Support Access & Permissions</h2>
      <p>
        We do not access or view your meeting content unless you explicitly grant permission or request support. Any temporary support
        access is limited in scope, time‑bound, and logged, and is used only to diagnose and resolve issues. You may revoke permissions
        at any time, and we will cease access immediately except where required by law.
      </p>

      <h2 id="acceptable-use">Acceptable Use</h2>
      <ul>
        <li>No illegal, harmful, infringing, or abusive activities.</li>
        <li>No attempts to bypass security, probe infrastructure, or misuse API rate limits.</li>
        <li>No collection or processing of data without lawful basis or required consents.</li>
      </ul>

      <h2 id="content-ownership">Customer Content & Ownership</h2>
      <p>
        You retain rights to your content. You grant us a limited license to process, store, and transmit content solely
        to provide the Service and improve features, subject to our Privacy Policy.
      </p>

      <h2 id="our-ip">Our Intellectual Property</h2>
      <p>
        NeuroNote, including software, designs, and documentation, is owned by us. You receive a limited, revocable
        right to use the Service. You may not copy, modify, or create derivative works except as permitted by law.
      </p>

      <h2 id="billing">Subscriptions & Billing</h2>
      <p>
        Paid plans are billed via Stripe. Fees are non‑refundable unless required by law or stated otherwise.
        We may change pricing with notice. Taxes may apply.
      </p>

      <h2 id="ai-beta">AI Features & Beta</h2>
      <p>
        AI outputs (summaries, action items, insights) may be inaccurate. Beta features are provided "as is" and
        may change or be discontinued.
      </p>

      <h2 id="third-parties">Third‑Party Services</h2>
      <p>
        Integrations (OpenAI, Google Generative AI, Pinecone, Slack, Asana, Jira, Trello, Zoom, Google Meet,
        Microsoft Teams, Stripe, AWS, Clerk) are subject to their own terms and privacy policies. We respect and rely on
        those providers’ privacy policies for data processed by them. We only share the minimum data necessary to deliver
        requested features within the scopes you authorize.
      </p>

      <h2 id="confidentiality">Confidentiality</h2>
      <p>We each agree to protect confidential information received from the other and use it only as permitted.</p>

      <h2 id="privacy">Privacy</h2>
      <p>Your use of the Service is governed by our <Link href="/privacy">Privacy Policy</Link>, which also describes how we interact with third‑party providers and limit access to your data.</p>

      <h2 id="termination">Termination</h2>
      <p>
        You may cancel at any time. We may suspend or terminate access for violations of these Terms or misuse.
        Upon termination, your right to use the Service ceases.
      </p>

      <h2 id="disclaimers">Disclaimers</h2>
      <p>
        The Service is provided "as is" and "as available" without warranties of any kind, to the maximum extent
        permitted by law.
      </p>

      <h2 id="liability">Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law, our aggregate liability is limited to the amounts you paid to us for the
        Service during the twelve (12) months preceding the event giving rise to the claim.
      </p>

      <h2 id="indemnity">Indemnification</h2>
      <p>You agree to indemnify and hold us harmless from claims arising out of your use of the Service or violation of these Terms.</p>

      <h2 id="governing-law">Governing Law</h2>
      <p>These Terms are governed by applicable laws; venue and jurisdiction will be designated as required by our policies.</p>

      <h2 id="changes">Changes to Terms</h2>
      <p>We may update these Terms from time to time. Continued use after changes constitutes acceptance.</p>

      <h2 id="contact">Contact</h2>
      <p>For questions regarding these Terms, please contact our support team.</p>

      <p><em>Last updated:</em> {today.toLocaleDateString()}</p>
        </article>
      </div>
    </main>
  );
}
