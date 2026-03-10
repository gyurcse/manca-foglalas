const highlights = [
  { label: "Datum", value: "2026. junius 20." },
  { label: "Helyszin", value: "Levendula Kert, Szentendre" },
  { label: "Kezdes", value: "15:30" },
];

const schedule = [
  { time: "15:30", title: "Vendegvaras", text: "Erkezes limonadeval, kerti zenevel es kozos fotozassal." },
  { time: "16:00", title: "Ceremonia", text: "Szabadtari fogadalom a diofak alatt, szuk csaladi koszontovel." },
  { time: "18:00", title: "Vacsora", text: "Szezonalis menu, hazai borokkal es kulon desszertasztallal." },
  { time: "20:30", title: "Nyitotanc", text: "Tanc, fenyfuzerek, koktelbar es ejszakai meglepetesek." },
];

export default function Home() {
  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Anna es David eskuvoje</p>
          <h1>Egy nyari delutan, ami velunk egyutt marad.</h1>
          <p className="lead">
            Szeretettel meghivunk benneteket, hogy velunk unnepeljetek eletunk
            egyik legfontosabb napjat egy meghitt, kerti eskuvon.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#program">
              Program
            </a>
            <a className="button button-secondary" href="#reszletek">
              Reszletek
            </a>
          </div>
        </div>

        <div className="hero-card">
          <p className="card-kicker">Az alkalom</p>
          <div className="ring" aria-hidden="true" />
          <p className="quote">
            &ldquo;A legszebb dolgok csendben erkeznek meg, aztan egy eletre velunk
            maradnak.&rdquo;
          </p>
        </div>
      </section>

      <section className="highlight-grid" aria-label="Fobb informaciok">
        {highlights.map((item) => (
          <article key={item.label} className="highlight-card">
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </article>
        ))}
      </section>

      <section className="details" id="reszletek">
        <div className="section-heading">
          <p className="eyebrow">Hasznos tudnivalok</p>
          <h2>Dress code, helyszin, hangulat.</h2>
        </div>
        <div className="details-grid">
          <article>
            <h3>Oltozet</h3>
            <p>
              Kerti elegancia: konnyed, vilagos szinek, kenyelmes cipo a fuves
              reszek miatt.
            </p>
          </article>
          <article>
            <h3>Megkozelites</h3>
            <p>
              A helyszinen korlatozott parkolas lesz, ezert javasolt a kozos
              erkezes vagy taxi.
            </p>
          </article>
          <article>
            <h3>Ajandek</h3>
            <p>
              A legfontosabb, hogy ott legyetek velunk. Ha megis hoznatok
              valamit, egy kozos utazasunkat tamogatnatok vele.
            </p>
          </article>
        </div>
      </section>

      <section className="schedule" id="program">
        <div className="section-heading">
          <p className="eyebrow">Napirend</p>
          <h2>Finom ritmus, sok talalkozas, hosszu este.</h2>
        </div>
        <div className="timeline">
          {schedule.map((item) => (
            <article key={item.time} className="timeline-item">
              <span className="timeline-time">{item.time}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="footer-card">
        <div>
          <p className="eyebrow">Visszajelzes</p>
          <h2>Kerunk, aprilis 30-ig jelezzetek, ha velunk unnepeltek.</h2>
        </div>
        <a className="button button-primary" href="mailto:hello@eskuvo.hu">
          hello@eskuvo.hu
        </a>
      </section>
    </main>
  );
}
