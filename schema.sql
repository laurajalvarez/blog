-- Ejecutar esto en tu servidor MySQL
-- sudo mysql < schema.sql

CREATE DATABASE IF NOT EXISTS bloguito CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE bloguito;

CREATE TABLE IF NOT EXISTS posts (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    title       VARCHAR(255)  NOT NULL,
    content     TEXT          NOT NULL,
    image       VARCHAR(255)  NOT NULL DEFAULT '/assets/img1.jpeg',
    author      VARCHAR(100)  NOT NULL DEFAULT 'anonimo',
    timestamp   DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    random      DOUBLE        NOT NULL DEFAULT 0
);

-- Si ya tienes la tabla creada sin la columna author, ejecuta solo esto:
-- ALTER TABLE posts ADD COLUMN author VARCHAR(100) NOT NULL DEFAULT 'anonimo';

-- Posts de ejemplo
INSERT INTO posts (title, content, image, author, random) VALUES
('Primer post', 'Hola desde el blog! 🌸', '/assets/img1.jpeg', 'alberto', RAND()),
('Segundo post', 'Explorando Next.js con estilo ✨', '/assets/img2.jpeg', 'alberto', RAND()),
('Tercer post', 'Cache SSG vs ISR vs SSR 🎀', '/assets/img3.jpeg', 'alberto', RAND());