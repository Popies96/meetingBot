import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { meetingUrl, platform } = await request.json();

    if (!meetingUrl || !platform) {
      return NextResponse.json(
        { error: "Meeting URL and platform are required" },
        { status: 400 }
      );
    }

    // Validate meeting URL format
    const isValidUrl = meetingUrl.includes('meet.google.com') || 
                       meetingUrl.includes('zoom.us') ||
                       meetingUrl.includes('teams.microsoft.com');
    
    if (!isValidUrl) {
      return NextResponse.json(
        { error: "Invalid meeting URL format" },
        { status: 400 }
      );
    }

    // Create a meeting record with all necessary fields
    const now = new Date();
    const meeting = await prisma.meeting.create({
      data: {
        userId: user.id,
        title: `Instant ${platform === 'google-meet' ? 'Google Meet' : 'Zoom'} Meeting`,
        description: `Instant meeting joined at ${now.toLocaleString()}`,
        meetingUrl: meetingUrl,
        startTime: now,
        endTime: new Date(now.getTime() + 60 * 60 * 1000), // 1 hour default
        botScheduled: true,
        botSent: false,
        isFromCalendar: false,
        attendees: user.email,
      },
    });

    // Send bot join request to MeetingBaas
    const meetingBaasApiKey = process.env.MEETING_BAAS_API_KEY;

    if (!meetingBaasApiKey) {
      console.error("MEETING_BAAS_API_KEY not configured in environment variables");
      return NextResponse.json(
        { error: "Bot service not configured. Please contact support." },
        { status: 500 }
      );
    }

    // Prepare request body following the lambda function pattern
    const requestBody: any = {
      meeting_url: meetingUrl,
      bot_name: user.botName || "AI Notetaker",
      bot_image: user.botImageUrl || undefined,
      recording_mode: "speaker_view",
      entry_message: "Hi, I'm here to take notes and capture action items.",
      reserved: false,
      speech_to_text: { provider: "Default" },
      automatic_leave: {
        waiting_room_timeout: 600,
      },
      webhook_url:
        process.env.WEBHOOK_URL
      extra: {
        meeting_id: meeting.id,
        user_id: user.id,
      },
    };

    // Add bot image if available
    const botResponse = await fetch("https://api.meetingbaas.com/bots", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-meeting-baas-api-key": meetingBaasApiKey,
      },
      body: JSON.stringify(requestBody),
    });

    if (!botResponse.ok) {
      const errorText = await botResponse.text();
      console.error("MeetingBaas API error:", errorText);
      
      // Update meeting to reflect error
      await prisma.meeting.update({
        where: { id: meeting.id },
        data: { botScheduled: false },
      });
      
      return NextResponse.json(
        { 
          error: "Failed to schedule bot",
          details: errorText,
          meetingId: meeting.id 
        },
        { status: 500 }
      );
    }

    const botData = await botResponse.json();

    // Update meeting with bot information
    await prisma.meeting.update({
      where: { id: meeting.id },
      data: {
        botId: botData.bot_id,
        botSent: true,
        botJoinedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      meetingId: meeting.id,
      botId: botData.bot_id,
      message: "Bot is joining your meeting!",
    });
  } catch (error) {
    console.error("Error joining instant meeting:", error);
    return NextResponse.json(
      { 
        error: "Failed to join meeting",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
