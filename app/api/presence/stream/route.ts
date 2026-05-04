import { presenceStore, type PresenceSnapshot } from "@/lib/presenceStore";

export const runtime = "nodejs";

const encoder = new TextEncoder();

function sseEvent(snapshot: PresenceSnapshot) {
  return encoder.encode(`data: ${JSON.stringify(snapshot)}\n\n`);
}

export async function GET() {
  let unsubscribe: (() => void) | null = null;
  let keepAlive: ReturnType<typeof setInterval> | null = null;

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(sseEvent(presenceStore.snapshot()));

      unsubscribe = presenceStore.subscribe((snapshot) => {
        controller.enqueue(sseEvent(snapshot));
      });

      keepAlive = setInterval(() => {
        controller.enqueue(encoder.encode(": ping\\n\\n"));
      }, 15_000);
    },
    cancel() {
      if (keepAlive) {
        clearInterval(keepAlive);
      }

      if (unsubscribe) {
        unsubscribe();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
