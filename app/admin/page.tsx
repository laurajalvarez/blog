"use client";
// app/admin/page.tsx
// Panel de administración de BD 

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

type Post = {
    id: number;
    title: string;
    content: string;
    image: string;
    author: string;
    timestamp: string;
    random: number;
};

const IMAGES = ["/assets/img1.jpeg", "/assets/img2.jpeg", "/assets/img3.jpeg"];
const EMOJIS = ["🌸", "🎀", "⭐", "🍓"];

export default function AdminPage() {
    const [posts, setPosts]       = useState<Post[]>([]);
    const [loading, setLoading]   = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [deleting, setDeleting] = useState<number | null>(null);
    const [error, setError]       = useState("");
    const [success, setSuccess]   = useState("");

    const [title, setTitle]     = useState("");
    const [content, setContent] = useState("");
    const [image, setImage]     = useState(IMAGES[0]);
    const [author, setAuthor]   = useState("");

    const fetchPosts = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/posts");
            const data = await res.json();
            setPosts(data);
        } catch {
            setError("No se pudieron cargar los posts.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchPosts(); }, [fetchPosts]);

    function insertEmoji(emoji: string) {
        setContent((prev) => prev + emoji);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(""); setSuccess("");
        setSubmitting(true);
        try {
            const res = await fetch("/api/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, content, image, author }),
            });
            if (!res.ok) {
                const d = await res.json();
                throw new Error(d.error ?? "Error al crear");
            }
            setSuccess("¡Entrada publicada! 🎀");
            setTitle(""); setContent(""); setImage(IMAGES[0]); setAuthor("");
            await fetchPosts();
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Error desconocido");
        } finally {
            setSubmitting(false);
        }
    }

    async function handleDelete(id: number) {
        if (!confirm(`¿Eliminar entrada #${id}? 🌸`)) return;
        setDeleting(id);
        try {
            const res = await fetch(`/api/posts?id=${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Error al eliminar");
            await fetchPosts();
        } catch {
            setError("No se pudo eliminar la entrada.");
        } finally {
            setDeleting(null);
        }
    }

    return (
        <>
            <style>{`
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
            `}</style>

            <div className="hk-page">
                {/* Header */}
                <header className="hk-header">
                    <div className="hk-header-inner">
                        <div className="hk-logo">
                            <span className="hk-logo-icon">🎀</span>
                            <div>
                                <span className="hk-logo-text">Bloguito DB</span>
                                <span className="hk-logo-sub">PANEL DE ENTRADAS</span>
                            </div>
                        </div>
                        <Link href="/" className="hk-back">← Inicio 🌸</Link>
                    </div>
                </header>

                <div className="hk-body">
                    {/* Formulario */}
                    <section className="hk-card">
                        <h2 className="hk-card-title">🌸 Nueva Entrada</h2>

                        {error   && <div className="hk-alert-error">{error}</div>}
                        {success && <div className="hk-alert-success">{success}</div>}

                        <form className="hk-form" onSubmit={handleSubmit}>
                            <div className="hk-field">
                                <label className="hk-label">Autor *</label>
                                <input
                                    className="hk-input"
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                    placeholder="Tu nombre de usuario"
                                    required
                                />
                            </div>

                            <div className="hk-field">
                                <label className="hk-label">Título *</label>
                                <input
                                    className="hk-input"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Título de la entrada"
                                    required
                                />
                            </div>

                            <div className="hk-field">
                                <label className="hk-label">Contenido *</label>
                                <div className="hk-emoji-row">
                                    {EMOJIS.map((em) => (
                                        <button
                                            key={em}
                                            type="button"
                                            className="hk-emoji-btn"
                                            onClick={() => insertEmoji(em)}
                                            title={`Insertar ${em}`}
                                        >
                                            {em}
                                        </button>
                                    ))}
                                </div>
                                <textarea
                                    className={`hk-input hk-textarea`}
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="Escribe tu entrada aquí... 🌸"
                                    required
                                />
                            </div>

                            <div className="hk-field">
                                <label className="hk-label">Imagen</label>
                                <div className="hk-image-grid">
                                    {IMAGES.map((img) => (
                                        <button
                                            key={img}
                                            type="button"
                                            onClick={() => setImage(img)}
                                            className={`hk-img-option${image === img ? " hk-img-selected" : ""}`}
                                        >
                                            <img src={img} alt="" className="hk-img-thumb" />
                                            {image === img && (
                                                <div className="hk-img-check">✓</div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="hk-submit"
                            >
                                {submitting ? "Publicando... 🎀" : "Publicar Entrada 🌸"}
                            </button>
                        </form>
                    </section>

                    {/* Tabla */}
                    <section className="hk-card">
                        <h2 className="hk-card-title">
                            ⭐ Últimas 5 Entradas
                            <span className="hk-badge">{posts.length}</span>
                        </h2>

                        {loading ? (
                            <div className="hk-loading">
                                <div className="hk-spinner" />
                                <p style={{ color: "#ffb3cc", fontWeight: 700 }}>Cargando... 🌸</p>
                            </div>
                        ) : posts.length === 0 ? (
                            <p className="hk-empty">No hay entradas todavía 🎀<br />¡Sé la primera en publicar!</p>
                        ) : (
                            <div className="hk-table-wrap">
                                <table className="hk-table">
                                    <thead>
                                        <tr>
                                            <th className="hk-th">ID</th>
                                            <th className="hk-th">Entrada</th>
                                            <th className="hk-th">Autor</th>
                                            <th className="hk-th">Img</th>
                                            <th className="hk-th">Fecha</th>
                                            <th className="hk-th">Acción</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {posts.map((post) => (
                                            <tr key={post.id} className="hk-tr">
                                                <td><span className="hk-id">#{post.id}</span></td>
                                                <td>
                                                    <span className="hk-title-strong">{post.title}</span>
                                                    <p className="hk-preview">
                                                        {post.content.slice(0, 45)}
                                                        {post.content.length > 45 ? "…" : ""}
                                                    </p>
                                                </td>
                                                <td>
                                                    <span className="hk-author-chip">🌸 {post.author}</span>
                                                </td>
                                                <td>
                                                    <img src={post.image} className="hk-row-thumb" alt="" />
                                                </td>
                                                <td>
                                                    <span className="hk-timestamp">
                                                        {new Date(post.timestamp).toLocaleDateString("es-MX", {
                                                            day: "2-digit", month: "short", year: "numeric",
                                                        })}
                                                    </span>
                                                </td>
                                                <td>
                                                    <button
                                                        className="hk-delete"
                                                        onClick={() => handleDelete(post.id)}
                                                        disabled={deleting === post.id}
                                                    >
                                                        {deleting === post.id ? "..." : "🗑️ Borrar"}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </>
    );
}