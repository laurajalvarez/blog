import Link from "next/link";
import PostList from "../../components/PostList";
import { getPosts } from "../../lib/getPosts";

export default async function Page() {
    const posts = await getPosts({
        cache: "force-cache",
    });

    return (
        <main>
            <h1>SSG - force-cache</h1>
            <PostList posts={posts} />
            <Link href="/">Volver</Link>
        </main>
    );
}