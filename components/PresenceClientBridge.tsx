"use client";

import { useEffect, useRef } from "react";

const STORAGE_KEY = "bloguito:user-id";
const HEARTBEAT_MS = 10_000;

function getOrCreateUserId() {
  const existing = window.localStorage.getItem(STORAGE_KEY);
  if (existing) {
    return existing;
  }

  const created = crypto.randomUUID();
  window.localStorage.setItem(STORAGE_KEY, created);
  return created;
}

async function sendPresence(url: string, method: "POST" | "PATCH" | "DELETE", payload: object) {
  await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });
}

export default function PresenceClientBridge() {
  const sessionRef = useRef<string>("");

  useEffect(() => {
    const sessionId = crypto.randomUUID();
    const userId = getOrCreateUserId();
    const username = `Usuario-${userId.slice(0, 6)}`;
    sessionRef.current = sessionId;

    const connectPayload = { sessionId, userId, username };

    void sendPresence("/api/presence", "POST", connectPayload);

    const stream = new EventSource("/api/presence/stream");
    stream.onerror = () => {
      // EventSource reconnects automatically.
    };

    const heartbeat = window.setInterval(() => {
      void sendPresence("/api/presence", "PATCH", { sessionId });
    }, HEARTBEAT_MS);

    const onBeforeUnload = () => {
      navigator.sendBeacon("/api/presence/disconnect", JSON.stringify({ sessionId }));
    };

    window.addEventListener("beforeunload", onBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
      window.clearInterval(heartbeat);
      stream.close();
      void sendPresence("/api/presence", "DELETE", { sessionId });
    };
  }, []);

  return null;
}
