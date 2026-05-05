// lib/db.ts
// Conexión MySQL con pool singleton para no agotar conexiones en dev/prod

import mysql from "mysql2/promise";

declare global {
    // Evita crear múltiples pools en hot-reload de Next.js dev
    // eslint-disable-next-line no-var
    var _mysqlPool: mysql.Pool | undefined;
}

function createPool(): mysql.Pool {
    return mysql.createPool({
        host:     process.env.MYSQL_HOST     ?? "localhost",
        port:     Number(process.env.MYSQL_PORT ?? 3306),
        user:     process.env.MYSQL_USER     ?? "root",
        password: process.env.MYSQL_PASSWORD ?? "",
        database: process.env.MYSQL_DATABASE ?? "bloguito",
        waitForConnections: true,
        connectionLimit:    10,
        queueLimit:         0,
    });
}

// En development reutilizamos el pool entre hot-reloads
const pool: mysql.Pool =
    process.env.NODE_ENV === "development"
        ? (global._mysqlPool ??= createPool())
        : createPool();

export default pool;