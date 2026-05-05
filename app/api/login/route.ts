import { NextRequest, NextResponse } from "next/server";

// Usuario hardcodeado (puedes cambiarlo)
const USER = {
    username: "admin",
    password: "1234",
};

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { username, password } = body;

        if (!username || !password) {
            return NextResponse.json(
                { error: "Faltan credenciales" },
                { status: 400 }
            );
        }

        if (username === USER.username && password === USER.password) {
            // Guardamos sesión simple en cookie
            const res = NextResponse.json({ success: true });

            res.cookies.set("session", "admin", {
                httpOnly: true,
                path: "/",
            });

            return res;
        }

        return NextResponse.json(
            { error: "Credenciales incorrectas" },
            { status: 401 }
        );
    } catch {
        return NextResponse.json(
            { error: "Error en login" },
            { status: 500 }
        );
    }
}