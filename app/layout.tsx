import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "sonner";
import {
  ClerkProvider,
 
} from '@clerk/nextjs'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {

  title: "NeuroNote",
  description: "AI Meeting Assistant & Intelligence PlatformNeuroNote transforms your meetings into actionable intelligence. Our AI bot automatically joins Zoom, Google Meet, and Microsoft Teams calls to provide real-time transcriptions with speaker identification, AI-generated summaries, and automated action items. Stay organized with calendar sync, chat with individual meetings or across all meetings using semantic search, and connect to Jira, Asana, Trello, and Slack for one-click task tracking. Personalize your bot with a name and profile image, receive post-meeting notifications, and browse a complete meeting history with clickable navigation. NeuroNote helps teams make smarter decisions, stay aligned, and save hours of follow-up work, making meetings not just recorded, but truly productive.",
  keywords: [
    "AI meetings",
    "meeting summary",
    "meeting notes",
    "productivity",
    "MeetingBot",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
           <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
 {children}
            <Analytics />
            <Toaster position="top-center" />
          </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
