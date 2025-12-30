import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "not authenticated" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "user not found" }, { status: 404 });
    }

    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q")?.toLowerCase() || "";
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const attendeeEmail = searchParams.get("attendee");

    const where: any = {
      userId: user.id,
    };

    if (query) {
      where.title = {
        contains: query,
        mode: "insensitive",
      };
    }

    const toStartOfDay = (dateStr: string) => {
      const d = new Date(dateStr);
      d.setHours(0, 0, 0, 0);
      return d;
    };

    const toEndOfDay = (dateStr: string) => {
      const d = new Date(dateStr);
      d.setHours(23, 59, 59, 999);
      return d;
    };

    const startValid = startDate && new Date(startDate).toString() !== "Invalid Date";
    const endValid = endDate && new Date(endDate).toString() !== "Invalid Date";

    let startBound: Date | undefined;
    let endBound: Date | undefined;

    if (startValid) {
      startBound = toStartOfDay(startDate as string);
    }

    if (endValid) {
      endBound = toEndOfDay(endDate as string);
    }

    // If only one date is provided, constrain to that day
    if (startBound && !endBound) {
      endBound = toEndOfDay(startDate as string);
    }
    if (endBound && !startBound) {
      startBound = toStartOfDay(endDate as string);
    }

    if (startBound || endBound) {
      where.startTime = {} as any;
      if (startBound) where.startTime.gte = startBound;
      if (endBound) where.startTime.lte = endBound;
    }

    const meetings = await prisma.meeting.findMany({
      where,
      orderBy: {
        startTime: "desc",
      },
    });

    // Filter by attendee email if specified (attendees is JSON)
    let filteredMeetings = meetings;
    if (attendeeEmail) {
      filteredMeetings = meetings.filter((meeting) => {
        if (!meeting.attendees) return false;
        
        let attendees: any[] = [];
        try {
          // attendees might be stored as JSON string or already parsed
          if (typeof meeting.attendees === "string") {
            attendees = JSON.parse(meeting.attendees);
          } else if (Array.isArray(meeting.attendees)) {
            attendees = meeting.attendees;
          }
        } catch (e) {
          attendees = [];
        }
        
        return attendees.some((attendee: any) => {
          const email = typeof attendee === "string" ? attendee : attendee?.email || attendee?.name || "";
          return email?.toLowerCase().includes(attendeeEmail.toLowerCase());
        });
      });
    }

    return NextResponse.json({ meetings: filteredMeetings });
  } catch (error) {
    console.error("search error:", error);
    return NextResponse.json(
      { error: "failed to search meetings", meetings: [] },
      { status: 500 }
    );
  }
}
