import Link from "next/link";
import { getPosts } from "../../lib/getPosts";

export const revalidate = 10;

export default async function Page() {
    const posts = await getPosts();

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

                body {
                    margin: 0;
                    font-family: 'Inter', sans-serif;
                    background: #fff6fa;
                }

                .container {
                    max-width: 1000px;
                    margin: auto;
                    padding: 2rem 1.5rem;
                }

                .header {
                    text-align: center;
                    margin-bottom: 2rem;
                }

                .title {
                    font-size: 2.2rem;
                    font-weight: 700;
                    color: #e91e63;
                }

                .subtitle {
                    color: #f48fb1;
                    font-size: 0.95rem;
                }

                .list {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                .card {
                    display: flex;
                    gap: 1.2rem;
                    background: #ffffff;
                    border-radius: 16px;
                    padding: 1rem;
                    box-shadow: 0 8px 24px rgba(233, 30, 99, 0.08);
                    border: 1px solid #ffe4ec;
                    transition: transform 0.15s ease;
                }

                .card:hover {
                    transform: translateY(-3px);
                }

                .img {
                    width: 220px;
                    height: 160px;
                    object-fit: cover;
                    border-radius: 12px;
                    flex-shrink: 0;
                }

                .content {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    width: 100%;
                }

                .post-title {
                    font-size: 1.2rem;
                    font-weight: 600;
                    color: #e91e63;
                    margin-bottom: 0.4rem;
                }

                .text {
                    font-size: 0.9rem;
                    color: #444;
                    line-height: 1.4;
                }

                .meta {
                    font-size: 0.75rem;
                    color: #f48fb1;
                    margin-top: 0.6rem;
                }

                .footer {
                    margin-top: 2rem;
                    text-align: center;
                }

                .btn {
                    background: #e91e63;
                    color: white;
                    padding: 0.6rem 1.4rem;
                    border-radius: 999px;
                    text-decoration: none;
                    font-weight: 600;
                    transition: 0.2s;
                }

                .btn:hover {
                    background: #d81b60;
                }

                /* RESPONSIVE */
                @media (max-width: 768px) {
                    .card {
                        flex-direction: column;
                    }

                    .img {
                        width: 100%;
                        height: 200px;
                    }
                }
            `}</style>

            <div className="container">
                <div className="header">
                    <div className="title">🎀 Blog ISR</div>
                    <div className="subtitle">
                        Se actualiza automáticamente cada 10 segundos
                    </div>
                </div>

                <div className="list">
                    {posts.map((p) => (
                        <div key={p.id} className="card">
                            <img src={p.image} className="img" />

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
                    <Link href="/" className="btn">
                        ← Volver
                    </Link>
                </div>
            </div>
        </>
    );
}