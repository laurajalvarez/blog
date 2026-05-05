import Link from "next/link";
import { getPosts } from "../../lib/getPosts";

// SSR: sin export revalidate y con no-store = siempre fresco
export const dynamic = "force-dynamic";

export default async function Page() {
    const posts = await getPosts({
        cache: "no-store",
    });

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

                *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

                body {
                    font-family: 'Inter', sans-serif;
                    background-image: url('/fondo.jpeg');
                    background-size: cover;
                    background-position: center;
                    background-attachment: fixed;
                    background-repeat: no-repeat;
                }
                body::before {
                    content: '';
                    position: fixed;
                    inset: 0;
                    background: rgba(255, 246, 250, 0.80);
                    z-index: -1;
                }
                .container { max-width: 1000px; margin: auto; padding: 2rem 1.5rem; }
                .header { text-align: center; margin-bottom: 2rem; }
                .title { font-size: 2.2rem; font-weight: 700; color: #e91e63; }
                .subtitle { color: #f48fb1; font-size: 0.95rem; margin-top: 0.3rem; }
                .list { display: flex; flex-direction: column; gap: 1.5rem; }
                .card {
                    display: flex; gap: 1.2rem;
                    background: rgba(255,255,255,0.85);
                    backdrop-filter: blur(6px);
                    border-radius: 16px; padding: 1rem;
                    box-shadow: 0 8px 24px rgba(233,30,99,0.08);
                    border: 1px solid #ffe4ec;
                    transition: transform 0.15s ease;
                }
                .card:hover { transform: translateY(-3px); }
                .img { width: 220px; height: 160px; object-fit: cover; border-radius: 12px; flex-shrink: 0; }
                .content { display: flex; flex-direction: column; justify-content: space-between; width: 100%; }
                .post-title { font-size: 1.2rem; font-weight: 600; color: #e91e63; margin-bottom: 0.4rem; }
                .text { font-size: 0.9rem; color: #444; line-height: 1.5; }
                .meta { font-size: 0.8rem; color: #f48fb1; margin-top: 0.6rem; line-height: 1.6; }
                .footer { margin-top: 2.5rem; text-align: center; }
                .btn {
                    background: #e91e63; color: white;
                    padding: 0.6rem 1.4rem; border-radius: 999px;
                    text-decoration: none; font-weight: 600;
                    transition: background 0.2s; display: inline-block;
                }
                .btn:hover { background: #d81b60; }
                @media (max-width: 768px) {
                    .card { flex-direction: column; }
                    .img { width: 100%; height: 200px; }
                }
            `}</style>

            <div className="container">
                <div className="header">
                    <div className="title">🎀 Blog SSR</div>
                    <div className="subtitle">
                        Se genera en cada petición — siempre muestra los posts más recientes
                    </div>
                </div>

                <div className="list">
                    {posts.map((p) => (
                        <div key={p.id} className="card">
                            <img src={p.image} className="img" alt={p.title} />
                            <div className="content">
                                <div>
                                    <div className="post-title">{p.title}</div>
                                    <div className="text">{p.content}</div>
                                </div>
                                <div className="meta">
                                    🌸 {p.author} • {new Date(p.timestamp).toLocaleString()}
                                    <br />
                                    🎲 Random: {p.random}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="footer">
                    <Link href="/" className="btn">← Volver</Link>
                </div>
            </div>
        </>
    );
}