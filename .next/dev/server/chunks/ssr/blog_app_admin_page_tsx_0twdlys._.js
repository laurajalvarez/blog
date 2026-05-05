module.exports = [
"[project]/blog/app/admin/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
// app/admin/page.tsx
// Panel de administración de BD 
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
"use client";
;
;
;
const IMAGES = [
    "/assets/img1.jpeg",
    "/assets/img2.jpeg",
    "/assets/img3.jpeg"
];
const EMOJIS = [
    "🌸",
    "🎀",
    "⭐",
    "🍓"
];
function AdminPage() {
    const [posts, setPosts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [submitting, setSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [deleting, setDeleting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [success, setSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [title, setTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [content, setContent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [image, setImage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(IMAGES[0]);
    const [author, setAuthor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const fetchPosts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        setLoading(true);
        try {
            const res = await fetch("/api/posts");
            const data = await res.json();
            setPosts(data);
        } catch  {
            setError("No se pudieron cargar los posts.");
        } finally{
            setLoading(false);
        }
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetchPosts();
    }, [
        fetchPosts
    ]);
    function insertEmoji(emoji) {
        setContent((prev)=>prev + emoji);
    }
    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setSuccess("");
        setSubmitting(true);
        try {
            const res = await fetch("/api/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title,
                    content,
                    image,
                    author
                })
            });
            if (!res.ok) {
                const d = await res.json();
                throw new Error(d.error ?? "Error al crear");
            }
            setSuccess("¡Entrada publicada! 🎀");
            setTitle("");
            setContent("");
            setImage(IMAGES[0]);
            setAuthor("");
            await fetchPosts();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error desconocido");
        } finally{
            setSubmitting(false);
        }
    }
    async function handleDelete(id) {
        if (!confirm(`¿Eliminar entrada #${id}? 🌸`)) return;
        setDeleting(id);
        try {
            const res = await fetch(`/api/posts?id=${id}`, {
                method: "DELETE"
            });
            if (!res.ok) throw new Error("Error al eliminar");
            await fetchPosts();
        } catch  {
            setError("No se pudo eliminar la entrada.");
        } finally{
            setDeleting(null);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
                @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');

                * { box-sizing: border-box; margin: 0; padding: 0; }

                body {
                    background: #fff0f5;
                    font-family: 'Nunito', sans-serif;
                }

                .hk-page {
                    min-height: 100vh;
                    background:
                        radial-gradient(circle at 10% 20%, #ffd6e7 0%, transparent 40%),
                        radial-gradient(circle at 90% 80%, #ffc2d4 0%, transparent 40%),
                        #fff5f8;
                }

                /* Puntitos de fondo */
                .hk-page::before {
                    content: '';
                    position: fixed;
                    inset: 0;
                    background-image:
                        radial-gradient(circle, #ffb3cc 1px, transparent 1px);
                    background-size: 28px 28px;
                    opacity: 0.25;
                    pointer-events: none;
                    z-index: 0;
                }

                .hk-header {
                    position: relative;
                    z-index: 1;
                    background: linear-gradient(135deg, #ff6b9d 0%, #ff8fab 50%, #ffb3cc 100%);
                    padding: 1.5rem 2rem;
                    box-shadow: 0 4px 20px rgba(255,107,157,0.35);
                    border-bottom: 3px solid #ff4d8d;
                }

                .hk-header-inner {
                    max-width: 1100px;
                    margin: 0 auto;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .hk-logo {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }

                .hk-logo-icon {
                    font-size: 2.5rem;
                    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15));
                    animation: bounce 2s ease-in-out infinite;
                }

                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50%       { transform: translateY(-6px); }
                }

                .hk-logo-text {
                    color: #fff;
                    font-size: 1.6rem;
                    font-weight: 900;
                    text-shadow: 2px 2px 0 rgba(0,0,0,0.1);
                    letter-spacing: -0.5px;
                }

                .hk-logo-sub {
                    color: #ffe0ec;
                    font-size: 0.75rem;
                    font-weight: 600;
                    letter-spacing: 0.1em;
                    display: block;
                }

                .hk-back {
                    color: #fff;
                    text-decoration: none;
                    font-weight: 700;
                    font-size: 0.9rem;
                    background: rgba(255,255,255,0.25);
                    padding: 0.5rem 1.2rem;
                    border-radius: 999px;
                    border: 2px solid rgba(255,255,255,0.5);
                    transition: background 0.2s;
                }
                .hk-back:hover { background: rgba(255,255,255,0.4); }

                .hk-body {
                    position: relative;
                    z-index: 1;
                    max-width: 1100px;
                    margin: 2rem auto;
                    padding: 0 1.5rem 3rem;
                    display: grid;
                    grid-template-columns: 380px 1fr;
                    gap: 1.5rem;
                    align-items: start;
                }

                .hk-card {
                    background: #fff;
                    border-radius: 20px;
                    padding: 1.75rem;
                    border: 2px solid #ffd6e7;
                    box-shadow:
                        0 4px 0 #ffb3cc,
                        0 8px 24px rgba(255,107,157,0.12);
                }

                .hk-card-title {
                    font-size: 1rem;
                    font-weight: 900;
                    color: #ff4d8d;
                    margin-bottom: 1.25rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    letter-spacing: 0.02em;
                }

                .hk-badge {
                    margin-left: auto;
                    background: #ffd6e7;
                    color: #ff4d8d;
                    font-size: 0.75rem;
                    padding: 0.15rem 0.6rem;
                    border-radius: 999px;
                    font-weight: 800;
                }

                .hk-alert-error {
                    background: #fff0f0;
                    border: 2px solid #ffb3b3;
                    color: #e03e3e;
                    border-radius: 12px;
                    padding: 0.7rem 1rem;
                    font-size: 0.85rem;
                    font-weight: 700;
                    margin-bottom: 1rem;
                }

                .hk-alert-success {
                    background: #fff0f8;
                    border: 2px solid #ffb3cc;
                    color: #ff4d8d;
                    border-radius: 12px;
                    padding: 0.7rem 1rem;
                    font-size: 0.85rem;
                    font-weight: 700;
                    margin-bottom: 1rem;
                }

                .hk-form {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .hk-field { display: flex; flex-direction: column; gap: 0.35rem; }

                .hk-label {
                    font-size: 0.78rem;
                    font-weight: 800;
                    color: #ff6b9d;
                    letter-spacing: 0.06em;
                    text-transform: uppercase;
                }

                .hk-input {
                    border: 2px solid #ffd6e7;
                    border-radius: 12px;
                    padding: 0.6rem 0.9rem;
                    font-size: 0.9rem;
                    color: #333;
                    font-family: 'Nunito', sans-serif;
                    font-weight: 600;
                    outline: none;
                    transition: border-color 0.2s, box-shadow 0.2s;
                    background: #fff5f8;
                }
                .hk-input:focus {
                    border-color: #ff6b9d;
                    box-shadow: 0 0 0 3px rgba(255,107,157,0.15);
                }

                .hk-textarea {
                    min-height: 100px;
                    resize: vertical;
                }

                .hk-emoji-row {
                    display: flex;
                    gap: 0.5rem;
                }

                .hk-emoji-btn {
                    font-size: 1.4rem;
                    background: #fff0f5;
                    border: 2px solid #ffd6e7;
                    border-radius: 10px;
                    width: 44px;
                    height: 44px;
                    cursor: pointer;
                    transition: transform 0.15s, border-color 0.15s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .hk-emoji-btn:hover {
                    transform: scale(1.2);
                    border-color: #ff6b9d;
                }

                .hk-image-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 0.5rem;
                }

                .hk-img-option {
                    position: relative;
                    border: 3px solid #ffd6e7;
                    border-radius: 12px;
                    overflow: hidden;
                    cursor: pointer;
                    padding: 0;
                    background: none;
                    aspect-ratio: 1;
                    transition: border-color 0.2s, transform 0.2s;
                }
                .hk-img-option:hover { transform: scale(1.04); }
                .hk-img-selected {
                    border-color: #ff4d8d;
                    box-shadow: 0 0 0 3px rgba(255,77,141,0.25);
                }

                .hk-img-thumb {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    display: block;
                }

                .hk-img-check {
                    position: absolute;
                    top: 4px; right: 4px;
                    background: #ff4d8d;
                    color: #fff;
                    border-radius: 50%;
                    width: 20px; height: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.7rem;
                    font-weight: 900;
                }

                .hk-submit {
                    background: linear-gradient(135deg, #ff6b9d, #ff4d8d);
                    color: #fff;
                    border: none;
                    border-radius: 12px;
                    padding: 0.8rem 1.5rem;
                    font-size: 0.95rem;
                    font-weight: 900;
                    font-family: 'Nunito', sans-serif;
                    cursor: pointer;
                    letter-spacing: 0.03em;
                    box-shadow: 0 4px 0 #d6336c;
                    transition: transform 0.15s, box-shadow 0.15s;
                }
                .hk-submit:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 0 #d6336c;
                }
                .hk-submit:active {
                    transform: translateY(2px);
                    box-shadow: 0 2px 0 #d6336c;
                }
                .hk-submit:disabled {
                    background: #ffc2d4;
                    box-shadow: 0 4px 0 #ffb3cc;
                    cursor: not-allowed;
                    transform: none;
                }

                /* Tabla */
                .hk-table-wrap { overflow-x: auto; }

                .hk-table {
                    width: 100%;
                    border-collapse: separate;
                    border-spacing: 0 6px;
                    font-size: 0.85rem;
                }

                .hk-th {
                    text-align: left;
                    padding: 0.5rem 0.75rem;
                    color: #ff6b9d;
                    font-weight: 900;
                    font-size: 0.72rem;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                }

                .hk-tr td {
                    background: #fff5f8;
                    padding: 0.75rem;
                    vertical-align: middle;
                    color: #444;
                }
                .hk-tr td:first-child { border-radius: 12px 0 0 12px; }
                .hk-tr td:last-child  { border-radius: 0 12px 12px 0; }

                .hk-id {
                    background: #ffd6e7;
                    color: #ff4d8d;
                    padding: 0.2rem 0.55rem;
                    border-radius: 8px;
                    font-size: 0.78rem;
                    font-weight: 900;
                }

                .hk-author-chip {
                    background: #ffe0ec;
                    color: #ff4d8d;
                    padding: 0.2rem 0.6rem;
                    border-radius: 999px;
                    font-size: 0.75rem;
                    font-weight: 800;
                }

                .hk-row-thumb {
                    width: 42px; height: 42px;
                    object-fit: cover;
                    border-radius: 10px;
                    border: 2px solid #ffd6e7;
                    display: block;
                }

                .hk-timestamp {
                    font-size: 0.75rem;
                    color: #ffb3cc;
                    font-weight: 700;
                }

                .hk-delete {
                    background: #fff0f5;
                    border: 2px solid #ffc2d4;
                    color: #ff4d8d;
                    border-radius: 8px;
                    padding: 0.3rem 0.7rem;
                    font-size: 0.78rem;
                    font-weight: 800;
                    font-family: 'Nunito', sans-serif;
                    cursor: pointer;
                    transition: background 0.15s, transform 0.15s;
                }
                .hk-delete:hover {
                    background: #ffd6e7;
                    transform: scale(1.05);
                }
                .hk-delete:disabled { opacity: 0.5; cursor: not-allowed; }

                .hk-empty {
                    text-align: center;
                    color: #ffb3cc;
                    font-weight: 700;
                    padding: 2rem;
                    font-size: 0.95rem;
                }

                .hk-loading {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1rem;
                    padding: 2rem;
                }

                .hk-spinner {
                    width: 32px; height: 32px;
                    border: 4px solid #ffd6e7;
                    border-top-color: #ff4d8d;
                    border-radius: 50%;
                    animation: spin 0.7s linear infinite;
                }
                @keyframes spin { to { transform: rotate(360deg); } }

                .hk-preview {
                    font-size: 0.78rem;
                    color: #ffb3cc;
                    margin-top: 0.2rem;
                    font-weight: 600;
                }

                .hk-title-strong {
                    color: #333;
                    font-weight: 800;
                    font-size: 0.88rem;
                }

                @media (max-width: 768px) {
                    .hk-body { grid-template-columns: 1fr; }
                }
            `
            }, void 0, false, {
                fileName: "[project]/blog/app/admin/page.tsx",
                lineNumber: 93,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "hk-page",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "hk-header",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "hk-header-inner",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "hk-logo",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "hk-logo-icon",
                                            children: "🎀"
                                        }, void 0, false, {
                                            fileName: "[project]/blog/app/admin/page.tsx",
                                            lineNumber: 513,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "hk-logo-text",
                                                    children: "Bloguito DB"
                                                }, void 0, false, {
                                                    fileName: "[project]/blog/app/admin/page.tsx",
                                                    lineNumber: 515,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "hk-logo-sub",
                                                    children: "PANEL DE ENTRADAS"
                                                }, void 0, false, {
                                                    fileName: "[project]/blog/app/admin/page.tsx",
                                                    lineNumber: 516,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/blog/app/admin/page.tsx",
                                            lineNumber: 514,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/blog/app/admin/page.tsx",
                                    lineNumber: 512,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/",
                                    className: "hk-back",
                                    children: "← Inicio 🌸"
                                }, void 0, false, {
                                    fileName: "[project]/blog/app/admin/page.tsx",
                                    lineNumber: 519,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/blog/app/admin/page.tsx",
                            lineNumber: 511,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/blog/app/admin/page.tsx",
                        lineNumber: 510,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hk-body",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "hk-card",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "hk-card-title",
                                        children: "🌸 Nueva Entrada"
                                    }, void 0, false, {
                                        fileName: "[project]/blog/app/admin/page.tsx",
                                        lineNumber: 526,
                                        columnNumber: 25
                                    }, this),
                                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hk-alert-error",
                                        children: error
                                    }, void 0, false, {
                                        fileName: "[project]/blog/app/admin/page.tsx",
                                        lineNumber: 528,
                                        columnNumber: 37
                                    }, this),
                                    success && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hk-alert-success",
                                        children: success
                                    }, void 0, false, {
                                        fileName: "[project]/blog/app/admin/page.tsx",
                                        lineNumber: 529,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                        className: "hk-form",
                                        onSubmit: handleSubmit,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "hk-field",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "hk-label",
                                                        children: "Autor *"
                                                    }, void 0, false, {
                                                        fileName: "[project]/blog/app/admin/page.tsx",
                                                        lineNumber: 533,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        className: "hk-input",
                                                        value: author,
                                                        onChange: (e)=>setAuthor(e.target.value),
                                                        placeholder: "Tu nombre de usuario",
                                                        required: true
                                                    }, void 0, false, {
                                                        fileName: "[project]/blog/app/admin/page.tsx",
                                                        lineNumber: 534,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/blog/app/admin/page.tsx",
                                                lineNumber: 532,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "hk-field",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "hk-label",
                                                        children: "Título *"
                                                    }, void 0, false, {
                                                        fileName: "[project]/blog/app/admin/page.tsx",
                                                        lineNumber: 544,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        className: "hk-input",
                                                        value: title,
                                                        onChange: (e)=>setTitle(e.target.value),
                                                        placeholder: "Título de la entrada",
                                                        required: true
                                                    }, void 0, false, {
                                                        fileName: "[project]/blog/app/admin/page.tsx",
                                                        lineNumber: 545,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/blog/app/admin/page.tsx",
                                                lineNumber: 543,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "hk-field",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "hk-label",
                                                        children: "Contenido *"
                                                    }, void 0, false, {
                                                        fileName: "[project]/blog/app/admin/page.tsx",
                                                        lineNumber: 555,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "hk-emoji-row",
                                                        children: EMOJIS.map((em)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                className: "hk-emoji-btn",
                                                                onClick: ()=>insertEmoji(em),
                                                                title: `Insertar ${em}`,
                                                                children: em
                                                            }, em, false, {
                                                                fileName: "[project]/blog/app/admin/page.tsx",
                                                                lineNumber: 558,
                                                                columnNumber: 41
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/blog/app/admin/page.tsx",
                                                        lineNumber: 556,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                        className: `hk-input hk-textarea`,
                                                        value: content,
                                                        onChange: (e)=>setContent(e.target.value),
                                                        placeholder: "Escribe tu entrada aquí... 🌸",
                                                        required: true
                                                    }, void 0, false, {
                                                        fileName: "[project]/blog/app/admin/page.tsx",
                                                        lineNumber: 569,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/blog/app/admin/page.tsx",
                                                lineNumber: 554,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "hk-field",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "hk-label",
                                                        children: "Imagen"
                                                    }, void 0, false, {
                                                        fileName: "[project]/blog/app/admin/page.tsx",
                                                        lineNumber: 579,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "hk-image-grid",
                                                        children: IMAGES.map((img)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: ()=>setImage(img),
                                                                className: `hk-img-option${image === img ? " hk-img-selected" : ""}`,
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                        src: img,
                                                                        alt: "",
                                                                        className: "hk-img-thumb"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/blog/app/admin/page.tsx",
                                                                        lineNumber: 588,
                                                                        columnNumber: 45
                                                                    }, this),
                                                                    image === img && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "hk-img-check",
                                                                        children: "✓"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/blog/app/admin/page.tsx",
                                                                        lineNumber: 590,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                ]
                                                            }, img, true, {
                                                                fileName: "[project]/blog/app/admin/page.tsx",
                                                                lineNumber: 582,
                                                                columnNumber: 41
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/blog/app/admin/page.tsx",
                                                        lineNumber: 580,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/blog/app/admin/page.tsx",
                                                lineNumber: 578,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "submit",
                                                disabled: submitting,
                                                className: "hk-submit",
                                                children: submitting ? "Publicando... 🎀" : "Publicar Entrada 🌸"
                                            }, void 0, false, {
                                                fileName: "[project]/blog/app/admin/page.tsx",
                                                lineNumber: 597,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/blog/app/admin/page.tsx",
                                        lineNumber: 531,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/blog/app/admin/page.tsx",
                                lineNumber: 525,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "hk-card",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "hk-card-title",
                                        children: [
                                            "⭐ Últimas 5 Entradas",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "hk-badge",
                                                children: posts.length
                                            }, void 0, false, {
                                                fileName: "[project]/blog/app/admin/page.tsx",
                                                lineNumber: 611,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/blog/app/admin/page.tsx",
                                        lineNumber: 609,
                                        columnNumber: 25
                                    }, this),
                                    loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hk-loading",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "hk-spinner"
                                            }, void 0, false, {
                                                fileName: "[project]/blog/app/admin/page.tsx",
                                                lineNumber: 616,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    color: "#ffb3cc",
                                                    fontWeight: 700
                                                },
                                                children: "Cargando... 🌸"
                                            }, void 0, false, {
                                                fileName: "[project]/blog/app/admin/page.tsx",
                                                lineNumber: 617,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/blog/app/admin/page.tsx",
                                        lineNumber: 615,
                                        columnNumber: 29
                                    }, this) : posts.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "hk-empty",
                                        children: [
                                            "No hay entradas todavía 🎀",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                fileName: "[project]/blog/app/admin/page.tsx",
                                                lineNumber: 620,
                                                columnNumber: 79
                                            }, this),
                                            "¡Sé la primera en publicar!"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/blog/app/admin/page.tsx",
                                        lineNumber: 620,
                                        columnNumber: 29
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hk-table-wrap",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                            className: "hk-table",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "hk-th",
                                                                children: "ID"
                                                            }, void 0, false, {
                                                                fileName: "[project]/blog/app/admin/page.tsx",
                                                                lineNumber: 626,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "hk-th",
                                                                children: "Entrada"
                                                            }, void 0, false, {
                                                                fileName: "[project]/blog/app/admin/page.tsx",
                                                                lineNumber: 627,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "hk-th",
                                                                children: "Autor"
                                                            }, void 0, false, {
                                                                fileName: "[project]/blog/app/admin/page.tsx",
                                                                lineNumber: 628,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "hk-th",
                                                                children: "Img"
                                                            }, void 0, false, {
                                                                fileName: "[project]/blog/app/admin/page.tsx",
                                                                lineNumber: 629,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "hk-th",
                                                                children: "Fecha"
                                                            }, void 0, false, {
                                                                fileName: "[project]/blog/app/admin/page.tsx",
                                                                lineNumber: 630,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "hk-th",
                                                                children: "Acción"
                                                            }, void 0, false, {
                                                                fileName: "[project]/blog/app/admin/page.tsx",
                                                                lineNumber: 631,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/blog/app/admin/page.tsx",
                                                        lineNumber: 625,
                                                        columnNumber: 41
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/blog/app/admin/page.tsx",
                                                    lineNumber: 624,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                    children: posts.map((post)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                            className: "hk-tr",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "hk-id",
                                                                        children: [
                                                                            "#",
                                                                            post.id
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/blog/app/admin/page.tsx",
                                                                        lineNumber: 637,
                                                                        columnNumber: 53
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/blog/app/admin/page.tsx",
                                                                    lineNumber: 637,
                                                                    columnNumber: 49
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "hk-title-strong",
                                                                            children: post.title
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/blog/app/admin/page.tsx",
                                                                            lineNumber: 639,
                                                                            columnNumber: 53
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "hk-preview",
                                                                            children: [
                                                                                post.content.slice(0, 45),
                                                                                post.content.length > 45 ? "…" : ""
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/blog/app/admin/page.tsx",
                                                                            lineNumber: 640,
                                                                            columnNumber: 53
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/blog/app/admin/page.tsx",
                                                                    lineNumber: 638,
                                                                    columnNumber: 49
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "hk-author-chip",
                                                                        children: [
                                                                            "🌸 ",
                                                                            post.author
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/blog/app/admin/page.tsx",
                                                                        lineNumber: 646,
                                                                        columnNumber: 53
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/blog/app/admin/page.tsx",
                                                                    lineNumber: 645,
                                                                    columnNumber: 49
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                        src: post.image,
                                                                        className: "hk-row-thumb",
                                                                        alt: ""
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/blog/app/admin/page.tsx",
                                                                        lineNumber: 649,
                                                                        columnNumber: 53
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/blog/app/admin/page.tsx",
                                                                    lineNumber: 648,
                                                                    columnNumber: 49
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "hk-timestamp",
                                                                        children: new Date(post.timestamp).toLocaleDateString("es-MX", {
                                                                            day: "2-digit",
                                                                            month: "short",
                                                                            year: "numeric"
                                                                        })
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/blog/app/admin/page.tsx",
                                                                        lineNumber: 652,
                                                                        columnNumber: 53
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/blog/app/admin/page.tsx",
                                                                    lineNumber: 651,
                                                                    columnNumber: 49
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        className: "hk-delete",
                                                                        onClick: ()=>handleDelete(post.id),
                                                                        disabled: deleting === post.id,
                                                                        children: deleting === post.id ? "..." : "🗑️ Borrar"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/blog/app/admin/page.tsx",
                                                                        lineNumber: 659,
                                                                        columnNumber: 53
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/blog/app/admin/page.tsx",
                                                                    lineNumber: 658,
                                                                    columnNumber: 49
                                                                }, this)
                                                            ]
                                                        }, post.id, true, {
                                                            fileName: "[project]/blog/app/admin/page.tsx",
                                                            lineNumber: 636,
                                                            columnNumber: 45
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/blog/app/admin/page.tsx",
                                                    lineNumber: 634,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/blog/app/admin/page.tsx",
                                            lineNumber: 623,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/blog/app/admin/page.tsx",
                                        lineNumber: 622,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/blog/app/admin/page.tsx",
                                lineNumber: 608,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/blog/app/admin/page.tsx",
                        lineNumber: 523,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/blog/app/admin/page.tsx",
                lineNumber: 508,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true);
}
}),
];

//# sourceMappingURL=blog_app_admin_page_tsx_0twdlys._.js.map