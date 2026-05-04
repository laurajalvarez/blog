import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Demo de Caché</h1>

      <ul>
        <li><Link href="/ssg">SSG (force-cache)</Link></li>
        <li><Link href="/isr">ISR (revalidate)</Link></li>
        <li><Link href="/ssr">SSR (no-store)</Link></li>
      </ul>
    </main>
  );
}
