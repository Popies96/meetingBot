import Link from "next/link";

export const metadata = {
  title: "Privacy Policy",
  description:
    "How MeetingBot collects, uses, and protects personal data across meetings, integrations, and AI features.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  const today = new Date();
  const effective = new Date(today.getFullYear(), 0, 1);

  return (
    <main className="mx-auto max-w-7xl px-6 py-12" itemScope itemType="https://schema.org/Article">
      <header className="mb-8">
        <h1 id="privacy-policy" itemProp="headline" className="text-3xl md:text-4xl font-bold">Privacy Policy</h1>
        <p className="text-sm text-gray-400"><strong>Effective:</strong> {effective.toLocaleDateString()}</p>
        <p className="mt-4 max-w-3xl text-gray-300">
          This Privacy Policy explains how <strong>NeuroNote</strong> ("we", "us", "our") collects, uses, and protects
          information when you use our platform to automatically join meetings on Zoom, Google Meet, and Microsoft Teams and
          provide AI-powered transcription, summaries, and insights. This page is publicly accessible for search engines and
          third-party verification.
        </p>
      </header>

      <div className="grid grid-cols-12 gap-8">
        <aside className="col-span-12 md:col-span-3 md:block hidden">
          <nav className="sticky top-24 space-y-2 text-sm">
            <p className="uppercase tracking-wide text-gray-400">Sections</p>
            <ul className="space-y-2">
              <li><Link className="text-gray-200 hover:text-white" href="#applicability">Applicability</Link></li>
              <li><Link className="text-gray-200 hover:text-white" href="#information-we-collect">Information We Collect</Link></li>
              <li><Link className="text-gray-200 hover:text-white" href="#legal-bases">Legal Bases (GDPR)</Link></li>
              <li><Link className="text-gray-200 hover:text-white" href="#how-we-use">How We Use Information</Link></li>
              <li><Link className="text-gray-200 hover:text-white" href="#retention">Data Retention</Link></li>
              <li><Link className="text-gray-200 hover:text-white" href="#sharing">Data Sharing & Disclosures</Link></li>
              <li><Link className="text-gray-200 hover:text-white" href="#transfers">International Transfers</Link></li>
              <li><Link className="text-gray-200 hover:text-white" href="#third-party-privacy">Third‑Party Privacy Policies</Link></li>
              <li><Link className="text-gray-200 hover:text-white" href="#security">Security</Link></li>
              <li><Link className="text-gray-200 hover:text-white" href="#support-access">Support Access & Permissions</Link></li>
              <li><Link className="text-gray-200 hover:text-white" href="#your-rights">Your Rights</Link></li>
              <li><Link className="text-gray-200 hover:text-white" href="#children">Children’s Privacy</Link></li>
              <li><Link className="text-gray-200 hover:text-white" href="#changes">Policy Changes</Link></li>
              <li><Link className="text-gray-200 hover:text-white" href="#contact">Contact</Link></li>
            </ul>
          </nav>
        </aside>

        <article className="col-span-12 md:col-span-9 mx-auto max-w-3xl prose" role="article">

      <h2 id="applicability">Applicability</h2>
      <p>
        This Policy applies to the NeuroNote web application, associated APIs, the Slack bot,
        AWS Lambda workers, and related services that process meeting data and integrations with
        third-party platforms (e.g., Asana, Jira, Trello, Slack). If a third party provides its own
        privacy terms, those terms govern their processing.
      </p>

      <h2 id="information-we-collect">Information We Collect and Receive</h2>
      <ul>
        <li><strong>Account & Auth Data:</strong> Email, profile details, and identifiers provided via Clerk authentication.</li>
        <li><strong>Calendar & Scheduling:</strong> Meeting titles, times, attendees, and status to automatically schedule bots.</li>
        <li><strong>Meeting Media:</strong> Audio/voice data, transcripts, summaries, and derived insights from your meetings.</li>
        <li><strong>Integrations Data:</strong> Workspace identifiers and content from tools you connect (Slack, Asana, Jira, Trello) within authorized scopes.</li>
        <li><strong>AI Processing Data:</strong> Content sent to AI providers (e.g., OpenAI, Google Generative AI) for transcription, summarization, and chat; embeddings stored in Pinecone.</li>
        <li><strong>Payments:</strong> Subscription and billing information handled by Stripe.</li>
        <li><strong>Storage & Logs:</strong> Files and artifacts stored in AWS S3; operational logs and security events.</li>
        <li><strong>Device & Usage:</strong> IP address, device information, pages viewed, and actions taken to improve and secure the service.</li>
        <li><strong>Cookies & Similar Tech:</strong> Session cookies and analytics that help deliver core functionality.</li>
      </ul>
      <p>
        We only access integrations and meeting content that you explicitly authorize. If you revoke access,
        certain features may stop working.
      </p>

      <h2 id="legal-bases">Legal Bases (GDPR)</h2>
      <ul>
        <li><strong>Performance of a contract:</strong> To deliver meeting transcription, summaries, chat, and integrations.</li>
        <li><strong>Legitimate interests:</strong> To secure, maintain, and improve the platform.</li>
        <li><strong>Consent:</strong> Where required (e.g., certain analytics, marketing, or recordings as applicable).</li>
        <li><strong>Legal obligations:</strong> To comply with applicable law, requests, and regulations.</li>
      </ul>

      <h2 id="how-we-use">How We Use Information</h2>
      <ul>
        <li>Operate core features: transcription, summaries, action items, meeting search, and chat.</li>
        <li>Sync with project management tools and Slack to post updates you opt into.</li>
        <li>Personalize bot behavior and improve AI models and prompts.</li>
        <li>Provide support, detect fraud, ensure security, and monitor reliability.</li>
        <li>Comply with legal requirements and enforce our Terms of Use.</li>
      </ul>

      <h2 id="retention">Data Retention</h2>
      <p>
        We retain personal data only as long as needed for the purposes described, for as long as your account is active,
        or as required by law. You may request deletion; some data may be retained for security, compliance, or auditing.
      </p>

      <h2 id="sharing">Data Sharing and Disclosures</h2>
      <p>We may share information with:</p>
      <ul>
        <li><strong>Service Providers:</strong> OpenAI, Google Generative AI, Pinecone, Stripe, AWS, Clerk, Slack, Zoom, Google Meet, Microsoft Teams.</li>
        <li><strong>Integrations:</strong> Asana, Jira, Trello, and others you connect.</li>
        <li><strong>Security & Compliance:</strong> When required by law, to protect rights, or investigate misuse.</li>
        <li><strong>Business transfers:</strong> In connection with mergers, acquisitions, or asset sales in compliance with applicable law.</li>
      </ul>

      <h2 id="transfers">International Data Transfers</h2>
      <p>
        We may process and store data in the United States and other countries. Where required, we use appropriate safeguards
        for cross-border transfers.
      </p>

      <h2 id="third-party-privacy">Third‑Party Privacy Policies</h2>
      <p>
        NeuroNote integrates with third‑party services (e.g., OpenAI, Google Generative AI, Pinecone, Slack, Asana, Jira, Trello,
        Zoom, Google Meet, Microsoft Teams, Stripe, AWS, Clerk). We respect and rely on the privacy policies of these providers.
        When data is sent to or processed by a third party, its handling is governed by that provider’s own privacy policy and terms.
        We limit sharing to the minimum required to deliver features, restricted to scopes you authorize, and you can revoke access at any time.
      </p>

      <h2 id="security">Security</h2>
      <p>
        We implement technical and organizational measures (access controls, encryption in transit/at rest where applicable,
        monitoring, backups) to protect data. No method is 100% secure, but we work to maintain industry-standard protections.
      </p>

      <h2 id="support-access">Support Access & Permissions</h2>
      <p>
        We do not access or view your meeting content unless you explicitly grant permission or request assistance. Any support‑related
        access is limited, time‑bound, and logged, and is used solely to troubleshoot or resolve issues. You can revoke permissions at
        any time, and we will cease access immediately except where required by law.
      </p>

      <h2 id="your-rights">Your Rights</h2>
      <ul>
        <li>Access, correction, deletion, and portability of your data.</li>
        <li>Opt-out of certain processing and revoke integrations.</li>
        <li>Residents of specific jurisdictions (e.g., EU/EEA, UK, California) may have additional rights.</li>
      </ul>

      <h2 id="children">Children’s Privacy</h2>
      <p>
        NeuroNote is not directed to children under 13 (or other age as defined by local law). We do not knowingly
        collect personal data from children.
      </p>

      <h2 id="changes">Changes to This Policy</h2>
      <p>
        We may update this Policy from time to time. The "Effective" date will indicate the latest revision.
      </p>

      <h2 id="contact">Contact</h2>
      <p>
        For privacy questions or requests, contact our support team.
      </p>
      <p><em>Last updated:</em> {today.toLocaleDateString()}</p>
        </article>
      </div>
    </main>
  );
}
