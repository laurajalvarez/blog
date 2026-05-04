import { presenceStore } from "@/lib/presenceStore";

export const runtime = "nodejs";

type DisconnectPayload = {
  sessionId?: string;
};

export async function POST(request: Request) {
  const payload = (await request.json()) as DisconnectPayload;

  if (!payload.sessionId) {
    return Response.json({ error: "sessionId es requerido" }, { status: 400 });
  }

  return Response.json(presenceStore.disconnect(payload.sessionId));
}
