// app/api/posts/route.ts
// GET    /api/posts        → últimas 5 entradas
// POST   /api/posts        → crea entrada (requiere author)
// DELETE /api/posts?id=N   → elimina entrada

import { NextRequest, NextResponse } from "next/server";
import { getPosts, createPost, deletePost } from "../../../lib/getPosts";

export async function GET() {
    try {
        const posts = await getPosts();
        return NextResponse.json(posts);
    } catch (err) {
        console.error("[GET /api/posts]", err);
        return NextResponse.json({ error: "Error al obtener posts" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { title, content, image, author } = body as {
            title?:   string;
            content?: string;
            image?:   string;
            author?:  string;
        };

        if (!title?.trim() || !content?.trim()) {
            return NextResponse.json(
                { error: "title y content son requeridos" },
                { status: 400 }
            );
        }

        if (!author?.trim()) {
            return NextResponse.json(
                { error: "author es requerido" },
                { status: 400 }
            );
        }

        const VALID_IMAGES = [
            "/assets/img1.jpeg",
            "/assets/img2.jpeg",
            "/assets/img3.jpeg",
        ];
        const safeImage = VALID_IMAGES.includes(image ?? "")
            ? (image as string)
            : VALID_IMAGES[0];

        const result = await createPost({
            title:   title.trim(),
            content: content.trim(),
            image:   safeImage,
            author:  author.trim(),
        });

        return NextResponse.json({ insertId: result.insertId }, { status: 201 });
    } catch (err) {
        console.error("[POST /api/posts]", err);
        return NextResponse.json({ error: "Error al crear post" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = Number(searchParams.get("id"));

        if (!id || isNaN(id)) {
            return NextResponse.json({ error: "id inválido" }, { status: 400 });
        }

        const deleted = await deletePost(id);
        if (!deleted) {
            return NextResponse.json({ error: "Post no encontrado" }, { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("[DELETE /api/posts]", err);
        return NextResponse.json({ error: "Error al eliminar post" }, { status: 500 });
    }
}