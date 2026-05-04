export type Post = {
    id: number;
    title: string;
    content: string;
    image: string;
    timestamp: string;
    random: number;
};

// ":D": "sonrisa.jpg"
const images = [
    "/assets/img1.jpeg",
    "/assets/img2.jpeg",
    "/assets/img3.jpeg",
];

export async function getPosts(options?: RequestInit): Promise<Post[]> {
    // Fetch que simula el cache de Next
    await fetch("https://google.com", options);

    return Array.from({ length: 5 }).map((_, i) => ({
        id: i + 1,
        title: `Post ${i + 1}`,
        content: "Contenido de ejemplo",
        image: images[Math.floor(Math.random() * images.length)],
        timestamp: new Date().toISOString(),
        random: Math.random(),
    }));

}