import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { WebClient } from "@slack/web-api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findFirst({
      where: {
        clerkId: userId,
      },
    });

    if (!user?.slackTeamId) {
      return NextResponse.json(
        { error: "slack not connected" },
        { status: 400 }
      );
    }

    const installation = await prisma.slackInstallation.findUnique({
      where: {
        teamId: user.slackTeamId,
      },
    });

    if (!installation) {
      return NextResponse.json(
        { error: "installation not found" },
        { status: 400 }
      );
    }

    const slack = new WebClient(installation.botToken);

    const channels = await slack.conversations.list({
      types: "public_channel",
      limit: 50,
    });

    return NextResponse.json({
      channels:
        channels.channels?.map((ch) => ({
          id: ch.id,
          name: ch.name,
        })) || [],
    });
  } catch (error) {
    console.error("slack setup error:", error);
    return NextResponse.json(
      { error: "failed to fetch channels" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      channelId,
      channelName,
      createNew = false,
      isPrivate = false,
    } = body;

    if (!channelId && !createNew) {
      return NextResponse.json(
        { error: "no channel or createNew flag provided" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findFirst({ where: { clerkId: userId } });
    if (!user?.slackTeamId) {
      return NextResponse.json(
        { error: "slack not connected" },
        { status: 400 }
      );
    }

    const installation = await prisma.slackInstallation.findUnique({
      where: { teamId: user.slackTeamId },
    });
    if (!installation) {
      return NextResponse.json(
        { error: "installation not found" },
        { status: 400 }
      );
    }

    const slack = new WebClient(installation.botToken);

    // Create channel if requested
    let finalChannelId = channelId;
    let finalChannelName = channelName;

    if (createNew) {
      if (!channelName) {
        return NextResponse.json(
          { error: "channelName required to create channel" },
          { status: 400 }
        );
      }

      const sanitized = channelName
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9\-_]/g, "")
        .slice(0, 80);

      const created = await slack.conversations.create({
        name: sanitized,
        is_private: !!isPrivate,
        
      });
      console.log("conversations.create result:", created);

      if (!created.ok || !created.channel?.id) {
        console.error("Slack channel create error:", created);
        return NextResponse.json(
          { error: "failed to create channel" },
          { status: 500 }
        );
      }

      finalChannelId = created.channel.id;
      finalChannelName = created.channel.name;

      // Bot invite/join removed intentionally
      console.log("Created Slack channel (invite/join removed):", finalChannelId);
    }

    // Save preferred channel for the user
    await prisma.user.updateMany({
      where: { clerkId: userId },
      data: {
        preferredChannelId: finalChannelId,
        preferredChannelName: finalChannelName,
      },
    });

    return NextResponse.json(
      {
        success: true,
        channelId: finalChannelId,
        channelName: finalChannelName,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Slack setup save error:", error);
    return NextResponse.json(
      { error: "failed to save or create channel" },
      { status: 500 }
    );
  }
}
