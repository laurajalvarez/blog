module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/blog/lib/presenceStore.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "presenceStore",
    ()=>presenceStore
]);
const STALE_MS = 30_000;
const DEFAULT_USERNAME = "Invitado";
class PresenceStore {
    sessions = new Map();
    listeners = new Set();
    connect(input) {
        this.cleanupStale();
        const username = sanitizeUsername(input.username) ?? DEFAULT_USERNAME;
        this.sessions.set(input.sessionId, {
            sessionId: input.sessionId,
            userId: input.userId,
            username,
            lastSeenAt: Date.now()
        });
        this.notify();
        return this.snapshot();
    }
    heartbeat(sessionId) {
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
    disconnect(sessionId) {
        this.cleanupStale();
        const removed = this.sessions.delete(sessionId);
        if (removed) {
            this.notify();
        }
        return this.snapshot();
    }
    snapshot() {
        this.cleanupStale();
        return {
            onlineCount: this.sessions.size,
            sessions: Array.from(this.sessions.values()).sort((a, b)=>{
                return b.lastSeenAt - a.lastSeenAt;
            })
        };
    }
    subscribe(listener) {
        this.listeners.add(listener);
        return ()=>{
            this.listeners.delete(listener);
        };
    }
    cleanupStale() {
        const now = Date.now();
        let mutated = false;
        for (const [sessionId, session] of this.sessions){
            if (now - session.lastSeenAt > STALE_MS) {
                this.sessions.delete(sessionId);
                mutated = true;
            }
        }
        if (mutated) {
            this.notify();
        }
    }
    notify() {
        const snapshot = this.snapshot();
        for (const listener of this.listeners){
            listener(snapshot);
        }
    }
}
function sanitizeUsername(username) {
    if (!username) {
        return null;
    }
    const value = username.trim();
    return value.length > 0 ? value.slice(0, 50) : null;
}
const presenceGlobal = globalThis;
const presenceStore = presenceGlobal.__presenceStore ?? (presenceGlobal.__presenceStore = new PresenceStore());
}),
"[project]/blog/app/api/presence/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "GET",
    ()=>GET,
    "PATCH",
    ()=>PATCH,
    "POST",
    ()=>POST,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$lib$2f$presenceStore$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog/lib/presenceStore.ts [app-route] (ecmascript)");
;
const runtime = "nodejs";
async function GET() {
    return Response.json(__TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$lib$2f$presenceStore$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["presenceStore"].snapshot());
}
async function POST(request) {
    const payload = await request.json();
    if (!payload.sessionId || !payload.userId) {
        return Response.json({
            error: "sessionId y userId son requeridos"
        }, {
            status: 400
        });
    }
    const snapshot = __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$lib$2f$presenceStore$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["presenceStore"].connect({
        sessionId: payload.sessionId,
        userId: payload.userId,
        username: payload.username
    });
    return Response.json(snapshot);
}
async function PATCH(request) {
    const payload = await request.json();
    if (!payload.sessionId) {
        return Response.json({
            error: "sessionId es requerido"
        }, {
            status: 400
        });
    }
    return Response.json(__TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$lib$2f$presenceStore$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["presenceStore"].heartbeat(payload.sessionId));
}
async function DELETE(request) {
    const payload = await request.json();
    if (!payload.sessionId) {
        return Response.json({
            error: "sessionId es requerido"
        }, {
            status: 400
        });
    }
    return Response.json(__TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$lib$2f$presenceStore$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["presenceStore"].disconnect(payload.sessionId));
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__00s6oj1._.js.map