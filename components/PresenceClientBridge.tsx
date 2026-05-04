"use client";

import { useEffect, useRef } from "react";

const STORAGE_KEY = "bloguito:user-id";
const HEARTBEAT_MS = 10_000;

function createId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  // Fallback for browsers without crypto.randomUUID support.
  return `${Date.now()}-${Math.random().toString(16).slice(2)}-${Math.random()
    .toString(16)
    .slice(2)}`;
}

function getOrCreateUserId() {
  const existing = window.localStorage.getItem(STORAGE_KEY);
  if (existing) {
    return existing;
  }

  const created = createId();
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
  const isConnectedRef = useRef<boolean>(false);

  useEffect(() => {
    const sessionId = createId();
    const userId = getOrCreateUserId();
    const username = `Usuario-${userId.slice(0, 6)}`;
    sessionRef.current = sessionId;

    const connectPayload = { sessionId, userId, username };

    const connect = async () => {
      try {
        await sendPresence("/api/presence", "POST", connectPayload);
        isConnectedRef.current = true;
      } catch {
        isConnectedRef.current = false;
      }
    };

    void connect();

    const stream = new EventSource("/api/presence/stream");
    stream.onerror = () => {
      // EventSource reconnects automatically.
    };

    const heartbeat = window.setInterval(() => {
      if (!isConnectedRef.current) {
        void connect();
        return;
      }

      void sendPresence("/api/presence", "PATCH", { sessionId }).catch(() => {
        isConnectedRef.current = false;
      });
    }, HEARTBEAT_MS);

    const onBeforeUnload = () => {
      navigator.sendBeacon("/api/presence/disconnect", JSON.stringify({ sessionId }));
    };

    const onPageHide = () => {
      navigator.sendBeacon("/api/presence/disconnect", JSON.stringify({ sessionId }));
    };

    window.addEventListener("beforeunload", onBeforeUnload);
    window.addEventListener("pagehide", onPageHide);

    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
      window.removeEventListener("pagehide", onPageHide);
      window.clearInterval(heartbeat);
      stream.close();
      isConnectedRef.current = false;
    };
  }, []);

  return null;
}
