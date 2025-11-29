import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ meetingId: string }> | { meetingId: string } }
) {
  const params = await context.params; // works if params is Promise or plain object
  const { meetingId } = params;

  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "not authed" }, { status: 401 });
    }

    const { botScheduled } = await request.json();

    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "user not found" }, { status: 404 });
    }

    const meeting = await prisma.meeting.update({
      where: {
        id: meetingId,
        userId: user.id,
      },
      data: {
        botScheduled: botScheduled,
      },
    });

    return NextResponse.json({
      success: true,
      botScheduled: meeting.botScheduled,
      message: `Bot ${botScheduled ? "enable" : "disabled"} for meeting`,
    });
  } catch (error) {
    console.error("Bot toogle error:", error);
    return NextResponse.json(
      {
        error: "Failed to update bot status",
      },
      { status: 500 }
    );
  }
}
