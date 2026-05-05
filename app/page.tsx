import Link from "next/link";

export default function Home() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

        body {
          margin: 0;
          font-family: 'Inter', sans-serif;
          background: linear-gradient(180deg, #fff7fb 0%, #ffffff 100%);
        }

        .wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .panel {
          width: 100%;
          max-width: 1100px;
        }

        .header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .title {
          font-size: 2.6rem;
          font-weight: 700;
          color: #e91e63;
        }

        .subtitle {
          color: #c2185b;
          opacity: 0.7;
          margin-top: 0.5rem;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .card {
          position: relative;
          padding: 2rem 1.5rem;
          border-radius: 18px;
          background: white;
          border: 1px solid #ffe4ec;
          box-shadow: 0 10px 25px rgba(233, 30, 99, 0.08);
          text-decoration: none;
          color: inherit;
          transition: all 0.2s ease;
        }

        .card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 40px rgba(233, 30, 99, 0.15);
        }

        /* Barra superior sutil */
        .card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 5px;
          border-radius: 18px 18px 0 0;
        }

        /* Variaciones suaves */
        .ssg::before { background: #f8bbd0; }
        .isr::before { background: #f06292; }
        .ssr::before { background: #ec407a; }

        .icon {
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        .card-title {
          font-size: 1.3rem;
          font-weight: 600;
          color: #e91e63;
          margin-bottom: 0.5rem;
        }

        .desc {
          font-size: 0.95rem;
          color: #555;
          line-height: 1.4;
        }

        .badge {
          display: inline-block;
          margin-top: 1rem;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.3rem 0.7rem;
          border-radius: 999px;
          background: #ffe4ec;
          color: #e91e63;
        }

        /* Responsive */
        @media (max-width: 900px) {
          .grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <main className="wrapper">
        <div className="panel">
          <div className="header">
            <div className="title">🎀 Cache Strategies</div>
            <div className="subtitle">
              Comparación de modelos de renderizado en Next.js
            </div>
          </div>

          <div className="grid">
            <Link href="/ssg" className="card ssg">
              <div className="icon">˙ . ꒷ 🍰 . 𖦹˙—</div>
              <div className="card-title">Static Generation</div>
              <div className="desc">
                Generado en build. Máxima velocidad sin cambios dinámicos.
              </div>
              <div className="badge">force-cache</div>
            </Link>

            <Link href="/isr" className="card isr">
              <div className="icon">‧₊ ᵎᵎ 🍒 ⋅ ˚✮</div>
              <div className="card-title">Incremental Static</div>
              <div className="desc">
                Se actualiza automáticamente después de cierto tiempo.
              </div>
              <div className="badge">revalidate</div>
            </Link>

            <Link href="/ssr" className="card ssr">
              <div className="icon">⋆｡‧˚ʚ🍓ɞ˚‧｡⋆</div>
              <div className="card-title">Server Rendering</div>
              <div className="desc">
                Se ejecuta en cada request con datos siempre actualizados.
              </div>
              <div className="badge">no-store</div>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}