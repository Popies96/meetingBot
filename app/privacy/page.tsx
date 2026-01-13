import Link from "next/link";

export const metadata = {
  title: "Privacy Policy",
  description:
    "How NeuroNote collects, uses, and protects personal data across meetings, integrations, and AI features.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPolicyPage() {
  const today = new Date();
  const effective = new Date(today.getFullYear(), 0, 13);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-400 ring-1 ring-blue-500/20">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Legal Document
            </div>

            <h1 id="privacy-policy" className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Privacy Policy
            </h1>

            <p className="text-sm text-slate-400 mb-6">
              <strong className="text-slate-300">Effective Date:</strong>{" "}
              {effective.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>

            <p className="text-lg text-slate-300 leading-relaxed">
              This Privacy Policy explains how <strong className="text-white">NeuroNote</strong> collects, uses, and
              protects personal data when providing AI-powered meeting transcription, summaries, insights, and
              third-party integrations.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-12 gap-8 lg:gap-12">
          {/* Sidebar */}
          <aside className="col-span-12 lg:col-span-3 hidden lg:block">
            <nav className="sticky top-24 space-y-1">
              <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Navigation
              </p>
              <ul className="space-y-0.5">
                {[
                  { href: "#applicability", label: "Applicability" },
                  { href: "#information", label: "Information We Collect" },
                  { href: "#legal-bases", label: "Legal Bases (GDPR)" },
                  { href: "#usage", label: "How We Use Data" },
                  { href: "#retention", label: "Data Retention" },
                  { href: "#sharing", label: "Data Sharing" },
                  { href: "#transfers", label: "International Transfers" },
                  { href: "#security", label: "Security" },
                  { href: "#support-access", label: "Support Access" },
                  { href: "#rights", label: "Your Rights" },
                  { href: "#children", label: "Children’s Privacy" },
                  { href: "#changes", label: "Policy Changes" },
                  { href: "#contact", label: "Contact" },
                ].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Article */}
          <article className="col-span-12 lg:col-span-9" role="article">
            <div className="max-w-3xl space-y-12">

              <Section id="applicability" title="Applicability">
                <p>
                  This Policy applies to the NeuroNote web application, APIs, bots, background workers,
                  and integrations with third-party platforms. Third-party services are governed by
                  their own privacy policies.
                </p>
              </Section>

              <Section id="information" title="Information We Collect">
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Account Data:</strong> Email, profile details, authentication identifiers.</li>
                  <li><strong>Calendar & Scheduling:</strong> Meeting titles, times, attendees.</li>
                  <li><strong>Meeting Content:</strong> Audio, transcripts, summaries, AI insights.</li>
                  <li><strong>Integrations:</strong> Slack, Asana, Jira, Trello content within authorized scopes.</li>
                  <li><strong>AI Processing:</strong> Data sent to AI providers for transcription and summaries.</li>
                  <li><strong>Payments:</strong> Billing handled securely by Stripe.</li>
                  <li><strong>Usage & Logs:</strong> IP address, device data, activity logs.</li>
                </ul>
              </Section>

              <Section id="legal-bases" title="Legal Bases (GDPR)">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Performance of a contract</li>
                  <li>Legitimate interests</li>
                  <li>User consent where required</li>
                  <li>Legal obligations</li>
                </ul>
              </Section>

              <Section id="usage" title="How We Use Information">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide transcription, summaries, and AI features</li>
                  <li>Enable integrations and automation</li>
                  <li>Improve performance, reliability, and security</li>
                  <li>Provide customer support</li>
                </ul>
              </Section>

              <Section id="retention" title="Data Retention">
                <p>
                  We retain personal data only as long as necessary to provide the Service or meet
                  legal obligations. You may request deletion at any time.
                </p>
              </Section>

              <Section id="sharing" title="Data Sharing & Disclosures">
                <p>
                  Data is shared only with trusted service providers and integrations within
                  explicitly authorized scopes.
                </p>
              </Section>

              <Section id="transfers" title="International Data Transfers">
                <p>
                  Data may be processed in multiple countries with appropriate safeguards applied
                  where required by law.
                </p>
              </Section>

              <Section id="security" title="Security">
                <p>
                  We apply industry-standard technical and organizational measures including
                  encryption, access control, monitoring, and logging.
                </p>
              </Section>

              <Section id="support-access" title="Support Access & Permissions">
                <p>
                  Support access is granted only with explicit permission, is time-bound, logged,
                  and revocable at any time.
                </p>
              </Section>

              <Section id="rights" title="Your Rights">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access, correction, deletion, and portability</li>
                  <li>Withdraw consent and revoke integrations</li>
                  <li>Additional rights under GDPR, CCPA, and similar laws</li>
                </ul>
              </Section>

              <Section id="children" title="Children’s Privacy">
                <p>
                  NeuroNote is not intended for children under 13 and does not knowingly collect
                  their personal data.
                </p>
              </Section>

              <Section id="changes" title="Policy Changes">
                <p>
                  We may update this Policy from time to time. Continued use constitutes acceptance.
                </p>
              </Section>

              <Section id="contact" title="Contact">
                <p>
                  For privacy-related questions or requests, please contact our support team.
                </p>
              </Section>

              <div className="pt-8 mt-12 border-t border-slate-800">
                <p className="text-sm text-slate-500 italic">
                  Last updated:{" "}
                  {today.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>

            </div>
          </article>
        </div>
      </div>
    </main>
  );
}

/* Section Component */
interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

function Section({ id, title, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3 group">
        <span className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">#</span>
        {title}
      </h2>
      <div className="prose prose-invert max-w-none">
        <div className="text-slate-300 leading-relaxed space-y-4">
          {children}
        </div>
      </div>
    </section>
  );
}
