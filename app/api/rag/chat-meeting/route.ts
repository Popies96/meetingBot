import { chatWithMeeting } from "@/lib/rag";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const { meetingId, question } = await request.json();

  if (!meetingId || !question) {
    return NextResponse.json(
      { error: "Missing meetingId or question" },
      { status: 400 }
    );
  }

  try {
    const response = await chatWithMeeting(userId, meetingId, question);

    return NextResponse.json(response);
  } catch (error: any) {
    console.error("Error in chat:", error);
    
    // Check if it's a quota error
    if (error?.status === 429 || error?.isQuotaError || error?.message?.includes('quota')) {
      return NextResponse.json(
        {
          error: "quota_exceeded",
          answer:
            "I'm unable to process your request because the embedding quota has been exceeded. " +
            "The free tier has very limited embedding requests. Please upgrade your Google AI plan " +
            "or check your billing details at https://ai.google.dev/gemini-api/docs/rate-limits",
        },
        { status: 429 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to process question" },
      { status: 500 }
    );
  }
}
