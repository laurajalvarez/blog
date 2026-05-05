module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/blog/components/PresenceClientBridge.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PresenceClientBridge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
const STORAGE_KEY = "bloguito:user-id";
const HEARTBEAT_MS = 10_000;
function createId() {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
        return crypto.randomUUID();
    }
    // Fallback for browsers without crypto.randomUUID support.
    return `${Date.now()}-${Math.random().toString(16).slice(2)}-${Math.random().toString(16).slice(2)}`;
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
async function sendPresence(url, method, payload) {
    await fetch(url, {
        method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
        cache: "no-store"
    });
}
function PresenceClientBridge() {
    const sessionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])("");
    const isConnectedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const sessionId = createId();
        const userId = getOrCreateUserId();
        const username = `Usuario-${userId.slice(0, 6)}`;
        sessionRef.current = sessionId;
        const connectPayload = {
            sessionId,
            userId,
            username
        };
        const connect = async ()=>{
            try {
                await sendPresence("/api/presence", "POST", connectPayload);
                isConnectedRef.current = true;
            } catch  {
                isConnectedRef.current = false;
            }
        };
        void connect();
        const stream = new EventSource("/api/presence/stream");
        stream.onerror = ()=>{
        // EventSource reconnects automatically.
        };
        const heartbeat = window.setInterval(()=>{
            if (!isConnectedRef.current) {
                void connect();
                return;
            }
            void sendPresence("/api/presence", "PATCH", {
                sessionId
            }).catch(()=>{
                isConnectedRef.current = false;
            });
        }, HEARTBEAT_MS);
        const onBeforeUnload = ()=>{
            navigator.sendBeacon("/api/presence/disconnect", JSON.stringify({
                sessionId
            }));
        };
        const onPageHide = ()=>{
            navigator.sendBeacon("/api/presence/disconnect", JSON.stringify({
                sessionId
            }));
        };
        window.addEventListener("beforeunload", onBeforeUnload);
        window.addEventListener("pagehide", onPageHide);
        return ()=>{
            window.removeEventListener("beforeunload", onBeforeUnload);
            window.removeEventListener("pagehide", onPageHide);
            window.clearInterval(heartbeat);
            stream.close();
            isConnectedRef.current = false;
        };
    }, []);
    return null;
}
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/dynamic-access-async-storage.external.js [external] (next/dist/server/app-render/dynamic-access-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/dynamic-access-async-storage.external.js", () => require("next/dist/server/app-render/dynamic-access-async-storage.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0m-tfg-._.js.map