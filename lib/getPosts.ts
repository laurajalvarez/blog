// lib/getPosts.ts

import pool from "./db";
import type { RowDataPacket } from "mysql2";

export type Post = {
    id:        number;
    title:     string;
    content:   string;
    image:     string;
    author:    string;
    timestamp: string;
    random:    number;
};

// Firma compatible con las páginas SSG/ISR/SSR existentes
export async function getPosts(_options?: RequestInit): Promise<Post[]> {
    const [rows] = await pool.query<RowDataPacket[]>(
        `SELECT id, title, content, image, author, timestamp, random
         FROM posts
         ORDER BY timestamp DESC
         LIMIT 5`
    );

    return rows.map((row) => ({
        id:        row.id as number,
        title:     row.title as string,
        content:   row.content as string,
        image:     row.image as string,
        author:    row.author as string,
        timestamp: (row.timestamp as Date).toISOString(),
        random:    row.random as number,
    }));
}

export async function getPostById(id: number): Promise<Post | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
        `SELECT id, title, content, image, author, timestamp, random
         FROM posts WHERE id = ? LIMIT 1`,
        [id]
    );
    if (rows.length === 0) return null;
    const row = rows[0];
    return {
        id:        row.id as number,
        title:     row.title as string,
        content:   row.content as string,
        image:     row.image as string,
        author:    row.author as string,
        timestamp: (row.timestamp as Date).toISOString(),
        random:    row.random as number,
    };
}

export async function createPost(
    data: Pick<Post, "title" | "content" | "image" | "author">
): Promise<{ insertId: number }> {
    const [result] = await pool.query(
        `INSERT INTO posts (title, content, image, author, random)
         VALUES (?, ?, ?, ?, ?)`,
        [data.title, data.content, data.image, data.author, Math.random()]
    );
    return result as { insertId: number };
}

export async function deletePost(id: number): Promise<boolean> {
    const [result] = await pool.query(
        "DELETE FROM posts WHERE id = ?",
        [id]
    );
    const res = result as { affectedRows: number };
    return res.affectedRows > 0;
}