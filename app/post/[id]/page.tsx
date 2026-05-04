import Link from "next/link";
import { getPosts } from "../../../lib/getPosts";

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const posts = await getPosts({
        cache: "no-store",
    });

    const post = posts.find((p) => p.id === Number(id));

    if (!post) {
        return <div>Post no encontrado</div>;
    }

    return (
        <main>
            <h1>{post.title}</h1>

            <img src={post.image} width={300} />

            <p>{post.content}</p>

            <p><strong>Timestamp:</strong> {post.timestamp}</p>
            <p><strong>Random:</strong> {post.random}</p>

            <Link href="/">Volver</Link>
        </main>
    );
}