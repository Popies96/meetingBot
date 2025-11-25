import { prisma } from "@/lib/prisma";
import { chatWithAllMeetings } from "@/lib/rag";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { question, userId: slackUserId } = await request.json();

    if (!question) {
      return NextResponse.json({ error: "missing question" }, { status: 400 });
    }

    let targetUserId = slackUserId;

    if (!slackUserId) {
      const { userId: clerkUserId } = await auth();
      if (!clerkUserId) {
        return NextResponse.json({ error: "not logged in" }, { status: 401 });
      }

      targetUserId = clerkUserId;
    } else {
      const user = await prisma.user.findUnique({
        where: {
          id: slackUserId,
        },
        select: {
          clerkId: true,
        },
      });

      if (!user) {
        return NextResponse.json({ error: "user not found" }, { status: 404 });
      }

      targetUserId = user.clerkId;
    }

    const response = await chatWithAllMeetings(targetUserId, question);

    return NextResponse.json(response);
  } catch (error: any) {
    console.error("error in chat:", error);
    
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
      {
        error: "failed to process question",
        answer:
          "I encountered an error while searching your meetings. please try again.",
      },
      { status: 500 }
    );
  }
}
