import Link from "next/link";
import PostList from "../../components/PostList";
import { getPosts } from "../../lib/getPosts";

export default async function Page() {
    const posts = await getPosts({
        next: { revalidate: 10 },
    });

    return (
        <main>
            <h1>ISR - revalidate 10s</h1>
            <PostList posts={posts} />
            <Link href="/">Volver</Link>
        </main>
    );
}