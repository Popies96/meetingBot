import { Meteors } from "@/components/ui/meteors";
import Link from "next/link";

export const metadata = {
  title: "Terms of Use",
  description:
    "NeuroNote Terms of Service and Acceptable Use Policy for AI meeting intelligence, integrations, and subscriptions.",
  alternates: { canonical: "/terms-of-use" },
};

export default function PolicyPage() {
  const today = new Date();
  const effective = new Date(today.getFullYear(), 0, 13);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header Section */}
      <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-400 ring-1 ring-blue-500/20">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Legal Document
            </div>
            <h1 id="terms-of-use" itemProp="headline" className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Terms of Use
            </h1>
            <p className="text-sm text-slate-400 mb-6">
              <strong className="text-slate-300">Effective Date:</strong> {effective.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
            <p className="text-lg text-slate-300 leading-relaxed">
              These Terms of Use ("Terms") govern your access to and use of <strong className="text-white">NeuroNote</strong>, a platform that automatically joins video
              calls (Zoom, Google Meet, Microsoft Teams) and provides AI-powered transcription, summaries, and actionable insights. By using the Service,
              you agree to these Terms.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-12 gap-8 lg:gap-12">
          {/* Sticky Navigation Sidebar */}
          <aside className="col-span-12 lg:col-span-3 hidden lg:block">
            <nav className="sticky top-24 space-y-1">
              <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Navigation
              </p>
              <ul className="space-y-0.5">
                {[
                  { href: "#eligibility", label: "Eligibility" },
                  { href: "#account", label: "Account & Security" },
                  { href: "#access", label: "Access & Authorization" },
                  { href: "#acceptable-use", label: "Acceptable Use" },
                  { href: "#content-ownership", label: "Content Ownership" },
                  { href: "#our-ip", label: "Intellectual Property" },
                  { href: "#billing", label: "Subscriptions & Billing" },
                  { href: "#ai-beta", label: "AI Features & Beta" },
                  { href: "#third-parties", label: "Third-Party Services" },
                  { href: "#confidentiality", label: "Confidentiality" },
                  { href: "#privacy", label: "Privacy" },
                  { href: "#support-access", label: "Support Access" },
                  { href: "#termination", label: "Termination" },
                  { href: "#disclaimers", label: "Disclaimers" },
                  { href: "#liability", label: "Limitation of Liability" },
                  { href: "#indemnity", label: "Indemnification" },
                  { href: "#governing-law", label: "Governing Law" },
                  { href: "#changes", label: "Changes to Terms" },
                  { href: "#contact", label: "Contact" },
                ].map((item) => (
                  <li key={item.href}>
                    <Link
                      className="block px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all duration-200"
                      href={item.href}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Main Article Content */}
          <article className="col-span-12 lg:col-span-9" role="article" itemScope itemType="https://schema.org/Article">
            <div className="max-w-3xl space-y-12">

              {/* Section Template */}
              <Section id="eligibility" title="Eligibility">
                <p>
                  You must be legally able to form a contract and use the Service in compliance with applicable laws.
                </p>
              </Section>

              <Section id="account" title="Account Registration & Security">
                <p>
                  You must provide accurate account information and keep credentials secure. Notify us immediately of
                  unauthorized access. You are responsible for all actions under your account.
                </p>
              </Section>

              <Section id="access" title="Access & Authorization">
                <p>
                  By connecting calendars, conferencing platforms, or integrations, you grant NeuroNote permission to access
                  content within the scopes you authorize to schedule, join, and process meetings.
                </p>
              </Section>

              <Section id="support-access" title="Support Access & Permissions">
                <p>
                  We do not access or view your meeting content unless you explicitly grant permission or request support. Any temporary support
                  access is limited in scope, time-bound, and logged, and is used only to diagnose and resolve issues. You may revoke permissions
                  at any time, and we will cease access immediately except where required by law.
                </p>
              </Section>

              <Section id="acceptable-use" title="Acceptable Use">
                <ul className="space-y-2">
                  <li className="flex gap-3">
                    <span className="text-red-400 mt-1">✗</span>
                    <span>No illegal, harmful, infringing, or abusive activities.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-red-400 mt-1">✗</span>
                    <span>No attempts to bypass security, probe infrastructure, or misuse API rate limits.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-red-400 mt-1">✗</span>
                    <span>No collection or processing of data without lawful basis or required consents.</span>
                  </li>
                </ul>
              </Section>

              <Section id="content-ownership" title="Customer Content & Ownership">
                <p>
                  You retain rights to your content. You grant us a limited license to process, store, and transmit content solely
                  to provide the Service and improve features, subject to our Privacy Policy.
                </p>
              </Section>

              <Section id="our-ip" title="Our Intellectual Property">
                <p>
                  NeuroNote, including software, designs, and documentation, is owned by us. You receive a limited, revocable
                  right to use the Service. You may not copy, modify, or create derivative works except as permitted by law.
                </p>
              </Section>

              <Section id="billing" title="Subscriptions & Billing">
                <p>
                  Paid plans are billed via Stripe. Fees are non-refundable unless required by law or stated otherwise.
                  We may change pricing with notice. Taxes may apply.
                </p>
              </Section>

              <Section id="ai-beta" title="AI Features & Beta">
                <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-4">
                  <div className="flex gap-3">
                    <svg className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <div>
                      <p className="font-medium text-amber-300 mb-1">Important Notice</p>
                      <p className="text-sm text-amber-200/90">
                        AI outputs (summaries, action items, insights) may be inaccurate. Beta features are provided "as is" and
                        may change or be discontinued.
                      </p>
                    </div>
                  </div>
                </div>
              </Section>

              <Section id="third-parties" title="Third-Party Services">
                <p className="mb-4">
                  Integrations (OpenAI, Google Generative AI, Pinecone, Slack, Asana, Jira, Trello, Zoom, Google Meet,
                  Microsoft Teams, Stripe, AWS, Clerk) are subject to their own terms and privacy policies.
                </p>
                <div className="rounded-lg bg-slate-800/50 border border-slate-700 p-4 text-sm">
                  <p className="text-slate-300">
                    We respect and rely on those providers' privacy policies for data processed by them. We only share the minimum data necessary to deliver
                    requested features within the scopes you authorize.
                  </p>
                </div>
              </Section>

              <Section id="confidentiality" title="Confidentiality">
                <p>
                  We each agree to protect confidential information received from the other and use it only as permitted.
                </p>
              </Section>

              <Section id="privacy" title="Privacy">
                <p>
                  Your use of the Service is governed by our{" "}
                  <Link href="/privacy" className="text-blue-400 hover:text-blue-300 underline underline-offset-4 transition-colors">
                    Privacy Policy
                  </Link>
                  , which also describes how we interact with third-party providers and limit access to your data.
                </p>
              </Section>

              <Section id="termination" title="Termination">
                <p>
                  You may cancel at any time. We may suspend or terminate access for violations of these Terms or misuse.
                  Upon termination, your right to use the Service ceases.
                </p>
              </Section>

              <Section id="disclaimers" title="Disclaimers">
                <p>
                  The Service is provided "as is" and "as available" without warranties of any kind, to the maximum extent
                  permitted by law.
                </p>
              </Section>

              <Section id="liability" title="Limitation of Liability">
                <p>
                  To the maximum extent permitted by law, our aggregate liability is limited to the amounts you paid to us for the
                  Service during the twelve (12) months preceding the event giving rise to the claim.
                </p>
              </Section>

              <Section id="indemnity" title="Indemnification">
                <p>
                  You agree to indemnify and hold us harmless from claims arising out of your use of the Service or violation of these Terms.
                </p>
              </Section>

              <Section id="governing-law" title="Governing Law">
                <p>
                  These Terms are governed by applicable laws; venue and jurisdiction will be designated as required by our policies.
                </p>
              </Section>

              <Section id="changes" title="Changes to Terms">
                <p>
                  We may update these Terms from time to time. Continued use after changes constitutes acceptance.
                </p>
              </Section>

              <Section id="contact" title="Contact">
                <p>
                  For questions regarding these Terms, please contact our support team.
                </p>
              </Section>

              {/* Footer Note */}
              <div className="pt-8 mt-12 border-t border-slate-800">
                <p className="text-sm text-slate-500 italic">
                  Last updated: {today.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              </div>

            </div>
          </article>
        </div>
      </div>
      
    </main>
  );
}

// Reusable Section Component
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
      <div className="prose prose-invert prose-slate max-w-none">
        <div className="text-slate-300 leading-relaxed space-y-4">
          {children}
        </div>
      </div>
    </section>
  );
}