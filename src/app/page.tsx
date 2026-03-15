"use client";

import { FormEvent, useMemo, useState } from "react";

const formEndpoint = "https://formspree.io/f/maqpdvlo";

const services = [
  {
    title: "Lakastakaritas",
    description:
      "Rendszeres vagy alkalmi takaritas nappalira, halora, konyhara es furdore szabva.",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Melytisztitas",
    description:
      "Alaposabb tisztitas konyhai feluletekre, fugakra, ajtokra es nehezebben elerheto reszekre.",
    image:
      "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Irodatakaritas",
    description:
      "Kisebb irodak, rendelok es uzlethelyisegek delutani vagy kora esti rendbetetele.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
  },
];

const benefits = [
  "Attekintheto foglalas csak hetkoznap 15:00-18:00 kozott.",
  "Mobilon is gyorsan kitoltheto egyoldalas felulet.",
  "Otthonokhoz es kisebb irodakhoz is ertelmezett szolgaltatasok.",
];

const testimonials = [
  {
    quote: "Gyors visszajelzes, pontos erkezes, rendezett lakas.",
    name: "Kata, XI. kerulet",
  },
  {
    quote: "A foglalas egyszeru volt, a takaritas utan minden atlathato lett.",
    name: "Andras, kis iroda",
  },
];

const slots = ["15:00", "16:00", "17:00", "18:00"];

function nextWeekdays() {
  const formatter = new Intl.DateTimeFormat("hu-HU", {
    month: "long",
    day: "numeric",
    weekday: "long",
  });
  const today = new Date();
  const dates = [];
  let offset = 0;

  while (dates.length < 5) {
    const current = new Date(today);
    current.setDate(today.getDate() + offset);
    const day = current.getDay();
    if (day >= 1 && day <= 5) {
      dates.push({
        value: current.toISOString().slice(0, 10),
        label: formatter.format(current),
      });
    }
    offset += 1;
  }

  return dates;
}

export default function Home() {
  const weekdays = useMemo(() => nextWeekdays(), []);
  const [selectedDate, setSelectedDate] = useState(weekdays[0]?.value ?? "");
  const [selectedService, setSelectedService] = useState(services[0].title);
  const [selectedSlot, setSelectedSlot] = useState(slots[0]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(false);
    setError("");

    const selected = new Date(selectedDate);
    const day = selected.getDay();
    const form = event.currentTarget;

    if (!(day >= 1 && day <= 5)) {
      setError("Foglalni csak hetkoznap lehet.");
      return;
    }

    if (!slots.includes(selectedSlot)) {
      setError("Csak 15:00 es 18:00 kozotti idosav foglalhato.");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData(form);
      formData.set("selectedDateLabel", weekdays.find((item) => item.value === selectedDate)?.label ?? selectedDate);
      formData.set("_subject", `Uj foglalasi igeny - ${selectedService} - ${selectedSlot}`);

      const response = await fetch(formEndpoint, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("A kuldes nem sikerult.");
      }

      setSubmitted(true);
      form.reset();
      setSelectedService(services[0].title);
      setSelectedSlot(slots[0]);
      setSelectedDate(weekdays[0]?.value ?? "");
    } catch {
      setError("A foglalast most nem tudtam elkuldeni. Probald ujra par perc mulva.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Manca takarito szolgaltatas</p>
          <h1>Foglalj takaritast hetkoznap delutanra.</h1>
          <p className="lead">
            A felulet most a gyors foglalasra van kielezve: vilagos szolgaltatasblokkok,
            kepek, egyszeru kapcsolatfelvetel es csak hetkoznap 15:00-18:00 kozotti
            idopontok.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#foglalas">
              Foglalas
            </a>
            <a className="button button-secondary" href="#szolgaltatasok">
              Szolgaltatasok
            </a>
          </div>
        </div>

        <div className="hero-panel">
          <p className="card-kicker">Gyors attekintes</p>
          <strong>Hetfőtol pentekig, 15:00-18:00</strong>
          <p className="quote">
            A foglalasi urlap most mar el tudja kuldeni az igenyt Formspree-ra,
            mikozben a datum- es idoszabalyok tovabbra is be vannak tartva.
          </p>
          <div className="mini-stats">
            <div>
              <span>Idosavok</span>
              <strong>4 / nap</strong>
            </div>
            <div>
              <span>Valaszido</span>
              <strong>gyors</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="service-nav" aria-label="Szolgaltatas kategoria">
        {services.map((service) => (
          <a key={service.title} className="service-pill" href="#szolgaltatasok">
            {service.title}
          </a>
        ))}
      </section>

      <section className="services-section" id="szolgaltatasok">
        <div className="section-heading">
          <p className="eyebrow">Szolgaltatasok</p>
          <h2>Kepekkel tamogatott, egyszeruen atfuthato blokkok.</h2>
        </div>

        <div className="service-grid">
          {services.map((service) => (
            <article key={service.title} className="service-card">
              <img src={service.image} alt={service.title} />
              <div className="service-card-body">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <a className="service-link" href="#foglalas">
                  Erre foglalnek
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="why-section">
        <div className="section-heading">
          <p className="eyebrow">Miert jo ez a felulet</p>
          <h2>Ugyanarra a gyors, szolgaltatasfokuszu logikara epul, mint a mintaoldal.</h2>
        </div>
        <div className="benefit-grid">
          {benefits.map((benefit) => (
            <article key={benefit} className="benefit-card">
              <p>{benefit}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-grid">
        <div className="info-stack">
          <article className="info-card accent-card">
            <p className="eyebrow">Jelenlegi foglalasi szabaly</p>
            <div className="bullet-points">
              <p>Csak hetkoznap valaszthato datum.</p>
              <p>Csak 15:00, 16:00, 17:00 es 18:00 idosav valaszthato.</p>
              <p>A submit a megadott Formspree vegpontra kuldi az igenyt.</p>
            </div>
          </article>

          <article className="info-card">
            <p className="eyebrow">Velemenyek</p>
            <div className="testimonial-list">
              {testimonials.map((item) => (
                <blockquote key={item.name} className="testimonial-card">
                  <p>{item.quote}</p>
                  <footer>{item.name}</footer>
                </blockquote>
              ))}
            </div>
          </article>
        </div>

        <section className="booking-card" id="foglalas">
          <div className="booking-header">
            <p className="eyebrow">Foglalasi urlap</p>
            <h2>Kerj idopontot hetkoznap 15:00-18:00 kozott.</h2>
          </div>

          <form className="booking-form" onSubmit={handleSubmit}>
            <label>
              Nev
              <input type="text" name="name" placeholder="Teljes neved" required />
            </label>

            <label>
              Telefonszam
              <input type="tel" name="phone" placeholder="+36 30 123 4567" required />
            </label>

            <label>
              E-mail
              <input type="email" name="email" placeholder="nev@email.hu" required />
            </label>

            <label>
              Szolgaltatas
              <select
                name="service"
                value={selectedService}
                onChange={(event) => setSelectedService(event.target.value)}
              >
                {services.map((service) => (
                  <option key={service.title} value={service.title}>
                    {service.title}
                  </option>
                ))}
              </select>
            </label>

            <div className="split-fields">
              <label>
                Hetkoznap
                <select
                  name="date"
                  value={selectedDate}
                  onChange={(event) => setSelectedDate(event.target.value)}
                >
                  {weekdays.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Idosav
                <select
                  name="slot"
                  value={selectedSlot}
                  onChange={(event) => setSelectedSlot(event.target.value)}
                >
                  {slots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label>
              Megjegyzes
              <textarea
                name="notes"
                rows={4}
                placeholder="Pl. lakas merete, kulon kereses, cim..."
              />
            </label>

            <button className="button button-primary submit-button" type="submit">
              {isSubmitting ? "Kuldes..." : "Foglalasi igeny kuldese"}
            </button>

            <p className="helper-text">
              Jelenleg csak hetkoznapi, 15:00-18:00 kozotti delutani savok foglalhatok.
            </p>

            {error ? <p className="error-message">{error}</p> : null}
            {submitted ? (
              <p className="success-message">
                Foglalasi igeny elkuldve: {selectedService}, {selectedSlot}, {weekdays.find((item) => item.value === selectedDate)?.label}.
              </p>
            ) : null}
          </form>
        </section>
      </section>
    </main>
  );
}
