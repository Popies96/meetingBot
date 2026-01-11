import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/home(.*)", "/chat(.*), /settings(.*), /integrations(.*), /meeting(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth();

  if (!userId && isProtectedRoute(req)) {
    // Add custom logic to run before redirecting

    return redirectToSignIn();
  }
}, {
  // Ensure public access for verification/legal pages
  publicRoutes: [
    "/privacy",
    "/terms-of-use",
    "/robots.txt",
    "/sitemap.xml",
    "/.well-known(.*)"
  ]
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
