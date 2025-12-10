const { PrismaClient } = require("@prisma/client");
const { app } = require('@azure/functions');
const prisma = new PrismaClient();

app.timer("calendarBot", {
  schedule: "*/15 * * * * *", // every 5 sec for local test
  handler: async (myTimer, context) => {
    context.log("Timer fired – starting sync");
    try {
      await syncAllUserCalendars(context);
      await scheduleBotsForUpcomingMeetings(context);
      context.log("Finished successfully");
    } catch (err) {
      context.log.error("Top-level error", err);
    } finally {
      await prisma.$disconnect();
    }
  },
});

  // Inline all your helper functions here
/* =========================================================
   HELPER – CALENDAR SYNC (with full Google API logging)
   ========================================================= */
async function syncAllUserCalendars(context) {
  const users = await prisma.user.findMany({
    where: {
      calendarConnected: true,
      googleAccessToken: { not: null },
    },
  });
  context.log(`[syncAllUserCalendars] ${users.length} user(s) with connected calendar`);

  for (const u of users) {
    context.log(`[syncUserCalendar] ---- userId=${u.id} email=${u.email} ----`);
    try {
      await syncUserCalendar(u, context);
    } catch (err) {
      context.log.error(`[syncUserCalendar] FAILED for ${u.id}: ${err.message}`);
    }
  }
}

/* --------------------------------------------------------- */
async function syncUserCalendar(user, context) {
  let accessToken = user.googleAccessToken;
  const now = new Date();
  const tokenExpiry = new Date(user.googleTokenExpiry);
  const tenMin = new Date(now.getTime() + 10 * 60 * 1000);

  if (tokenExpiry <= tenMin) {
    context.log(`[GoogleToken] Token for ${user.id} expires soon; refreshing…`);
    accessToken = await refreshGoogleToken(user, context);
    if (!accessToken) return;
  }

  const timeMin = now.toISOString();
  const timeMax = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString();

  const url =
    `https://www.googleapis.com/calendar/v3/calendars/primary/events` +
    `?timeMin=${encodeURIComponent(timeMin)}` +
    `&timeMax=${encodeURIComponent(timeMax)}` +
    `&singleEvents=true&orderBy=startTime&showDeleted=true`;

  context.log(`[GoogleCalendar] GET ${url}`);
  context.log(`[GoogleCalendar] Authorization: Bearer ${accessToken.slice(0, 20)}…`);

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
  });

  context.log(`[GoogleCalendar] HTTP ${res.status} ${res.statusText}`);

  if (!res.ok) {
    const txt = await res.text();
    context.log.error(`[GoogleCalendar] body: ${txt}`);
    if (res.status === 401) {
      await prisma.user.update({ where: { id: user.id }, data: { calendarConnected: false } });
      context.log.warn(`[GoogleCalendar] Marked user ${user.id} calendarDisconnected`);
      return;
    }
    throw new Error(`Google Calendar API error ${res.status}`);
  }

  const data = await res.json();
  const events = data.items || [];
  context.log(`[GoogleCalendar] received ${events.length} event(s)`);

  const existing = await prisma.meeting.findMany({
    where: { userId: user.id, isFromCalendar: true, startTime: { gte: now } },
  });

  const googleIds = new Set();
  for (const ev of events) {
    if (ev.status === 'cancelled') {
      context.log(`[GoogleCalendar] Event ${ev.id} cancelled – deleting locally`);
      await handleDeletedEvent(ev, context);
      continue;
    }
    googleIds.add(ev.id);
    await processEvent(user, ev, context);
  }

  const toDelete = existing.filter(dbEv => !googleIds.has(dbEv.calendarEventId));
  context.log(`[GoogleCalendar] ${toDelete.length} local event(s) no longer exist – deleting`);
  for (const d of toDelete) await handleDeletedEventFromDB(d, context);
}

/* --------------------------------------------------------- */
async function refreshGoogleToken(user, context) {
  if (!user.googleRefreshToken) {
    context.log.error(`[RefreshToken] No refresh token for ${user.id}`);
    await prisma.user.update({
      where: { id: user.id },
      data: { calendarConnected: false, googleAccessToken: null },
    });
    return null;
  }

  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    refresh_token: user.googleRefreshToken,
    grant_type: 'refresh_token',
  });

  context.log(`[RefreshToken] POST https://oauth2.googleapis.com/token`);
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params,
  });

  const json = await res.json();
  context.log(`[RefreshToken] HTTP ${res.status}`, json);

  if (!res.ok || !json.access_token) {
    await prisma.user.update({
      where: { id: user.id },
      data: { calendarConnected: false },
    });
    return null;
  }

  const newExpiry = new Date(Date.now() + json.expires_in * 1000);
  await prisma.user.update({
    where: { id: user.id },
    data: {
      googleAccessToken: json.access_token,
      googleTokenExpiry: newExpiry,
    },
  });
  context.log(`[RefreshToken] New token stored, expires at ${newExpiry}`);
  return json.access_token;
}

/* --------------------------------------------------------- */
async function handleDeletedEvent(event, context) {
  const existing = await prisma.meeting.findUnique({
    where: { calendarEventId: event.id },
  });
  if (existing) {
    await prisma.meeting.delete({ where: { calendarEventId: event.id } });
    context.log(`[DeleteEvent] Deleted meeting ${event.id} from DB`);
  }
}

async function handleDeletedEventFromDB(dbEv, context) {
  await prisma.meeting.delete({ where: { id: dbEv.id } });
  context.log(`[DeleteEvent] Deleted stale meeting ${dbEv.title} (${dbEv.id})`);
}

/* --------------------------------------------------------- */
async function processEvent(user, event, context) {
  const meetUrl = event.hangoutLink || event.conferenceData?.entryPoints?.[0]?.uri;
  if (!meetUrl || !event.start?.dateTime) {
    context.log(
      `[ProcessEvent] Raw conferenceData: ${JSON.stringify(event.conferenceData)}`
    );
    context.log(`[ProcessEvent] hangoutLink: ${event.hangoutLink}`);
    context.log(`[ProcessEvent] start: ${JSON.stringify(event.start)}`);
    context.log(`[ProcessEvent] SKIP ${event.id} – no meet URL or start time`);
    return;
  }

  const evt = {
    calendarEventId: event.id,
    userId: user.id,
    title: event.summary || 'Untitled Meeting',
    description: event.description || null,
    meetingUrl: meetUrl,
    startTime: new Date(event.start.dateTime),
    endTime: new Date(event.end.dateTime),
    attendees: event.attendees ? JSON.stringify(event.attendees.map(a => a.email)) : null,
    isFromCalendar: true,
    botScheduled: true,
  };

  const existing = await prisma.meeting.findUnique({
    where: { calendarEventId: event.id },
  });

  if (existing) {
    const changes = [];
    if (existing.title !== evt.title) changes.push('title');
    if (existing.startTime.getTime() !== evt.startTime.getTime()) changes.push('time');
    if (existing.meetingUrl !== evt.meetingUrl) changes.push('meetUrl');
    if (existing.attendees !== evt.attendees) changes.push('attendees');
    context.log(`[ProcessEvent] UPDATE ${event.id} changes=${changes.join('|') || 'none'}`);

    const upd = {
      title: evt.title,
      description: evt.description,
      meetingUrl: evt.meetingUrl,
      startTime: evt.startTime,
      endTime: evt.endTime,
      attendees: evt.attendees,
    };
    if (!existing.botSent) upd.botScheduled = evt.botScheduled;

    await prisma.meeting.update({ where: { calendarEventId: event.id }, data: upd });
  } else {
    context.log(`[ProcessEvent] CREATE ${event.id} "${evt.title}" ${meetUrl}`);
    await prisma.meeting.create({ data: evt });
  }
}

/* =========================================================
   HELPER – BOT SCHEDULER (also logged)
   ========================================================= */
async function scheduleBotsForUpcomingMeetings(context) {
  const now = new Date();
  const fiveMin = new Date(now.getTime() + 5 * 60 * 1000);

  const meetings = await prisma.meeting.findMany({
    where: {
      startTime: { gte: now, lte: fiveMin },
      botScheduled: true,
      botSent: false,
      meetingUrl: { not: null },
    },
    include: { user: true },
  });
  /* ----  DEBUG : list every future bot-scheduled row  ---- */
  const diagnostic = await prisma.meeting.findMany({
    where: { botScheduled: true, botSent: false },
    select: {
      id: true,
      title: true,
      startTime: true,
      endTime: true,
      meetingUrl: true,
      userId: true,
    },
  });
  context.log(`[ScheduleBots-DIAG] ALL bot-scheduled, unsent meetings in DB:`);
  diagnostic.forEach((m) =>
    context.log(
      `  "${m.title}" | startTime=${m.startTime.toISOString()} | url=${m.meetingUrl} | id=${m.id}`
    )
  );
  /* -------------------------------------------------------- */
  context.log(`[ScheduleBots] ${meetings.length} meeting(s) to bot`);
  for (const m of meetings) {
    context.log(
      `[ScheduleBots]  --> "${m.title}" (${m.startTime.toISOString()})`
    );
    try {
      const body = {
        meeting_url: m.meetingUrl,
        bot_name: m.user.botName || "AI Noteetaker",
        reserved: false,
        recording_mode: "speaker_view",
        speech_to_text: { provider: "Default" },
        webhook_url: process.env.WEBHOOK_URL,
        extra: { meeting_id: m.id, user_id: m.userId },
      };
      if (m.user.botImageUrl) body.bot_image = m.user.botImageUrl;

      context.log(`[ScheduleBots] POST https://api.meetingbaas.com/bots`);
      const res = await fetch("https://api.meetingbaas.com/bots", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-meeting-baas-api-key": process.env.MEETING_BAAS_API_KEY,
        },
        body: JSON.stringify(body),
      });

      context.log(`[ScheduleBots] HTTP ${res.status}`);
      if (!res.ok) {
        const txt = await res.text();
        context.log.error(`[ScheduleBots] body: ${txt}`);
        throw new Error(`MeetingBaas ${res.status}`);
      }

      const data = await res.json();
      context.log(`[ScheduleBots] botId=${data.bot_id}`);

      await prisma.meeting.update({
        where: { id: m.id },
        data: { botSent: true, botId: data.bot_id, botJoinedAt: new Date() },
      });
    } catch (err) {
      context.log.error(
        `[ScheduleBots] FAILED for "${m.title}": ${err.message}`
      );
    }
  }
}

