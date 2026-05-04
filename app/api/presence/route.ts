import { presenceStore } from "@/lib/presenceStore";

export const runtime = "nodejs";

type PresencePayload = {
  sessionId?: string;
  userId?: string;
  username?: string;
};

export async function GET() {
  return Response.json(presenceStore.snapshot());
}

export async function POST(request: Request) {
  const payload = (await request.json()) as PresencePayload;

  if (!payload.sessionId || !payload.userId) {
    return Response.json(
      { error: "sessionId y userId son requeridos" },
      { status: 400 },
    );
  }

  const snapshot = presenceStore.connect({
    sessionId: payload.sessionId,
    userId: payload.userId,
    username: payload.username,
  });

  return Response.json(snapshot);
}

export async function PATCH(request: Request) {
  const payload = (await request.json()) as PresencePayload;

  if (!payload.sessionId) {
    return Response.json({ error: "sessionId es requerido" }, { status: 400 });
  }

  return Response.json(presenceStore.heartbeat(payload.sessionId));
}

export async function DELETE(request: Request) {
  const payload = (await request.json()) as PresencePayload;

  if (!payload.sessionId) {
    return Response.json({ error: "sessionId es requerido" }, { status: 400 });
  }

  return Response.json(presenceStore.disconnect(payload.sessionId));
}
