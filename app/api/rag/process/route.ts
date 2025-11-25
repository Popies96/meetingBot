import { prisma } from "@/lib/prisma";
import { processTranscript } from "@/lib/rag";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const { meetingId, transcript, meetingTitle } = await request.json();

  if (!meetingId || !transcript) {
    return NextResponse.json(
      { error: "Missing meetingId or transcrpt" },
      { status: 400 }
    );
  }

  try {
    const meeting = await prisma.meeting.findUnique({
      where: {
        id: meetingId,
      },
      select: {
        ragProcessed: true,
        userId: true,
      },
    });

    if (!meeting) {
      return NextResponse.json({ error: "Meeting not found" }, { status: 404 });
    }

    if (meeting.userId !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    if (meeting.ragProcessed) {
      return NextResponse.json({
        success: true,
        message: "aldready processed",
      });
    }

    await processTranscript(meetingId, userId, transcript, meetingTitle);

    await prisma.meeting.update({
      where: {
        id: meetingId,
      },
      data: {
        ragProcessed: true,
        ragProcessedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("error processing transcript:", error);
    
    // Check if it's a quota error
    if (error?.status === 429 || error?.isQuotaError || error?.message?.includes('quota')) {
      return NextResponse.json(
        {
          error: "quota_exceeded",
          message:
            "Unable to process transcript because the embedding quota has been exceeded. " +
            "The free tier has very limited embedding requests. Please upgrade your Google AI plan " +
            "or check your billing details at https://ai.google.dev/gemini-api/docs/rate-limits",
        },
        { status: 429 }
      );
    }
    
    return NextResponse.json(
      { error: "failed to process transcript" },
      { status: 500 }
    );
  }
}
