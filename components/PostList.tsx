import Link from "next/link";
import { Post } from "../lib/getPosts";

export default function PostList({ posts }: { posts: Post[] }) {
    return (
        <div>
            {posts.map((p) => (
                <div key={p.id} style={{ marginBottom: 20 }}>
                    <h2>
                        <Link href={`/post/${p.id}`}>{p.title}</Link>
                    </h2>

                    <img src={p.image} alt={p.title} width={200} />

                    <p>{p.content}</p>

                    <p><strong>Timestamp:</strong> {p.timestamp}</p>
                    <p><strong>Random:</strong> {p.random}</p>
                </div>
            ))}
        </div>
    );
}