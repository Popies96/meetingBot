export const runtime = "edge";

export function GET() {
  const base = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const body = `User-agent: *\nAllow: /\nSitemap: ${base.replace(/\/$/, "")}/sitemap.xml`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain" },
  });
}
