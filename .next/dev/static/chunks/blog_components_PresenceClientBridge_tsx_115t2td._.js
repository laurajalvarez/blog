(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/blog/components/PresenceClientBridge.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PresenceClientBridge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
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
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "46cb47dd61b158b7b5f4d82cfcf9cd9a33ffacf4caffe00f13e08922d8e23bec") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "46cb47dd61b158b7b5f4d82cfcf9cd9a33ffacf4caffe00f13e08922d8e23bec";
    }
    const sessionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])("");
    const isConnectedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    let t0;
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = ({
            "PresenceClientBridge[useEffect()]": ()=>{
                const sessionId = createId();
                const userId = getOrCreateUserId();
                const username = `Usuario-${userId.slice(0, 6)}`;
                sessionRef.current = sessionId;
                const connectPayload = {
                    sessionId,
                    userId,
                    username
                };
                const connect = {
                    "PresenceClientBridge[useEffect() > connect]": async ()=>{
                        try {
                            await sendPresence("/api/presence", "POST", connectPayload);
                            isConnectedRef.current = true;
                        } catch  {
                            isConnectedRef.current = false;
                        }
                    }
                }["PresenceClientBridge[useEffect() > connect]"];
                connect();
                const stream = new EventSource("/api/presence/stream");
                stream.onerror = _temp;
                const heartbeat = window.setInterval({
                    "PresenceClientBridge[useEffect() > window.setInterval()]": ()=>{
                        if (!isConnectedRef.current) {
                            connect();
                            return;
                        }
                        sendPresence("/api/presence", "PATCH", {
                            sessionId
                        }).catch({
                            "PresenceClientBridge[useEffect() > window.setInterval() > (anonymous)()]": ()=>{
                                isConnectedRef.current = false;
                            }
                        }["PresenceClientBridge[useEffect() > window.setInterval() > (anonymous)()]"]);
                    }
                }["PresenceClientBridge[useEffect() > window.setInterval()]"], HEARTBEAT_MS);
                const onBeforeUnload = {
                    "PresenceClientBridge[useEffect() > onBeforeUnload]": ()=>{
                        navigator.sendBeacon("/api/presence/disconnect", JSON.stringify({
                            sessionId
                        }));
                    }
                }["PresenceClientBridge[useEffect() > onBeforeUnload]"];
                const onPageHide = {
                    "PresenceClientBridge[useEffect() > onPageHide]": ()=>{
                        navigator.sendBeacon("/api/presence/disconnect", JSON.stringify({
                            sessionId
                        }));
                    }
                }["PresenceClientBridge[useEffect() > onPageHide]"];
                window.addEventListener("beforeunload", onBeforeUnload);
                window.addEventListener("pagehide", onPageHide);
                return ()=>{
                    window.removeEventListener("beforeunload", onBeforeUnload);
                    window.removeEventListener("pagehide", onPageHide);
                    window.clearInterval(heartbeat);
                    stream.close();
                    isConnectedRef.current = false;
                };
            }
        })["PresenceClientBridge[useEffect()]"];
        t1 = [];
        $[1] = t0;
        $[2] = t1;
    } else {
        t0 = $[1];
        t1 = $[2];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t0, t1);
    return null;
}
_s(PresenceClientBridge, "KiEAkNrwkbHO7E8dWl4CxWtPROU=");
_c = PresenceClientBridge;
function _temp() {}
var _c;
__turbopack_context__.k.register(_c, "PresenceClientBridge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=blog_components_PresenceClientBridge_tsx_115t2td._.js.map