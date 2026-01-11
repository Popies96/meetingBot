export const runtime = "edge";

export function GET() {
  const body = `Contact: mailto:support@example.com\nPolicy: /privacy\nPreferred-Languages: en\n`; // Update email/domain when available
  return new Response(body, {
    headers: { "Content-Type": "text/plain" },
  });
}
