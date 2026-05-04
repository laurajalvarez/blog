export type PresenceSession = {
  sessionId: string;
  userId: string;
  username: string;
  lastSeenAt: number;
};

export type PresenceSnapshot = {
  onlineCount: number;
  sessions: PresenceSession[];
};

type PresenceListener = (snapshot: PresenceSnapshot) => void;

const STALE_MS = 30_000;
const DEFAULT_USERNAME = "Invitado";

class PresenceStore {
  private sessions = new Map<string, PresenceSession>();
  private listeners = new Set<PresenceListener>();

  connect(input: { sessionId: string; userId: string; username?: string }) {
    this.cleanupStale();

    const username = sanitizeUsername(input.username) ?? DEFAULT_USERNAME;

    this.sessions.set(input.sessionId, {
      sessionId: input.sessionId,
      userId: input.userId,
      username,
      lastSeenAt: Date.now(),
    });

    this.notify();
    return this.snapshot();
  }

  heartbeat(sessionId: string) {
    this.cleanupStale();

    const session = this.sessions.get(sessionId);
    if (!session) {
      return this.snapshot();
    }

    session.lastSeenAt = Date.now();
    this.sessions.set(sessionId, session);
    this.notify();

    return this.snapshot();
  }

  disconnect(sessionId: string) {
    this.cleanupStale();

    const removed = this.sessions.delete(sessionId);
    if (removed) {
      this.notify();
    }

    return this.snapshot();
  }

  snapshot(): PresenceSnapshot {
    this.cleanupStale();

    return {
      onlineCount: this.sessions.size,
      sessions: Array.from(this.sessions.values()).sort((a, b) => {
        return b.lastSeenAt - a.lastSeenAt;
      }),
    };
  }

  subscribe(listener: PresenceListener) {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  }

  private cleanupStale() {
    const now = Date.now();
    let mutated = false;

    for (const [sessionId, session] of this.sessions) {
      if (now - session.lastSeenAt > STALE_MS) {
        this.sessions.delete(sessionId);
        mutated = true;
      }
    }

    if (mutated) {
      this.notify();
    }
  }

  private notify() {
    const snapshot = this.snapshot();
    for (const listener of this.listeners) {
      listener(snapshot);
    }
  }
}

function sanitizeUsername(username?: string) {
  if (!username) {
    return null;
  }

  const value = username.trim();
  return value.length > 0 ? value.slice(0, 50) : null;
}

type PresenceGlobal = typeof globalThis & {
  __presenceStore?: PresenceStore;
};

const presenceGlobal = globalThis as PresenceGlobal;

export const presenceStore =
  presenceGlobal.__presenceStore ?? (presenceGlobal.__presenceStore = new PresenceStore());
