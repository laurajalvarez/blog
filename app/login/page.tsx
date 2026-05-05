"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setError("");

        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        if (!res.ok) {
            const data = await res.json();
            setError(data.error || "Error");
            return;
        }

        router.push("/admin");
    }

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');

                * { box-sizing: border-box; margin: 0; padding: 0; }

                body {
                    font-family: 'Nunito', sans-serif;
                }

                .hk-page {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background:
                        radial-gradient(circle at 10% 20%, #ffd6e7 0%, transparent 40%),
                        radial-gradient(circle at 90% 80%, #ffc2d4 0%, transparent 40%),
                        #fff5f8;
                }

                .hk-card {
                    width: 340px;
                    background: #fff;
                    border-radius: 20px;
                    padding: 2rem;
                    border: 2px solid #ffd6e7;
                    box-shadow:
                        0 4px 0 #ffb3cc,
                        0 8px 24px rgba(255,107,157,0.12);
                }

                .hk-logo {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    margin-bottom: 1rem;
                }

                .hk-logo-icon {
                    font-size: 2rem;
                }

                .hk-logo-text {
                    font-weight: 900;
                    color: #ff4d8d;
                    font-size: 1.3rem;
                }

                .hk-card-title {
                    text-align: center;
                    font-size: 0.9rem;
                    font-weight: 900;
                    color: #ff6b9d;
                    margin-bottom: 1.2rem;
                }

                .hk-alert-error {
                    background: #fff0f0;
                    border: 2px solid #ffb3b3;
                    color: #e03e3e;
                    border-radius: 12px;
                    padding: 0.6rem;
                    font-size: 0.8rem;
                    font-weight: 700;
                    margin-bottom: 1rem;
                    text-align: center;
                }

                .hk-form {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .hk-field {
                    display: flex;
                    flex-direction: column;
                    gap: 0.3rem;
                }

                .hk-label {
                    font-size: 0.75rem;
                    font-weight: 800;
                    color: #ff6b9d;
                    text-transform: uppercase;
                }

                .hk-input {
                    border: 2px solid #ffd6e7;
                    border-radius: 12px;
                    padding: 0.6rem;
                    background: #fff5f8;
                    font-weight: 600;
                    outline: none;
                    color: #333; /
                }

                .hk-input:focus {
                    border-color: #ff6b9d;
                    box-shadow: 0 0 0 3px rgba(255,107,157,0.15);
                }

                .hk-submit {
                    background: linear-gradient(135deg, #ff6b9d, #ff4d8d);
                    color: #fff;
                    border: none;
                    border-radius: 12px;
                    padding: 0.7rem;
                    font-weight: 900;
                    cursor: pointer;
                    box-shadow: 0 4px 0 #d6336c;
                }

                .hk-submit:hover {
                    transform: translateY(-2px);
                }
            `}</style>

            <div className="hk-page">
                <div className="hk-card">
                    
                    {/* Logo */}
                    <div className="hk-logo">
                        <span className="hk-logo-icon">🎀</span>
                        <span className="hk-logo-text">Bloguito DB</span>
                    </div>

                    <div className="hk-card-title">Admin Login</div>

                    {error && <div className="hk-alert-error">{error}</div>}

                    <form className="hk-form" onSubmit={handleLogin}>
                        <div className="hk-field">
                            <label className="hk-label">Usuario</label>
                            <input
                                className="hk-input"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div className="hk-field">
                            <label className="hk-label">Contraseña</label>
                            <input
                                type="password"
                                className="hk-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button className="hk-submit">
                            Entrar
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}