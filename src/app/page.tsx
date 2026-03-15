"use client";

import { FormEvent, useMemo, useState } from "react";

const formEndpoint = "https://formspree.io/f/maqpdvlo";

const services = [
  {
    title: "Lakástakarítás",
    description:
      "Rendszeres vagy alkalmi takarítás nappalira, hálóra, konyhára és fürdőre szabva.",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Mélytisztítás",
    description:
      "Alaposabb tisztítás konyhai felületekre, fugákra, ajtókra és nehezebben elérhető részekre.",
    image:
      "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Irodatakarítás",
    description:
      "Kisebb irodák, rendelők és üzlethelyiségek délutáni vagy kora esti rendbetétele.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
  },
];

const benefits = [
  "Átlátható foglalási folyamat, néhány lépésben kitölthető űrlappal.",
  "Pontosan egyeztetett érkezés és kiszámítható délutáni idősávok.",
  "Otthonokhoz, irodákhoz és alkalmi mélytisztításhoz is jó választás.",
];

const testimonials = [
  {
    quote: "Gyors visszajelzés, pontos érkezés, rendezett lakás.",
    name: "Kata, XI. kerület",
  },
  {
    quote: "A foglalás egyszerű volt, a takarítás után minden átlátható lett.",
    name: "András, kis iroda",
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
      setError("Foglalni csak hétköznap lehet.");
      return;
    }

    if (!slots.includes(selectedSlot)) {
      setError("Csak 15:00 és 18:00 közötti idősáv foglalható.");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData(form);
      formData.set("selectedDateLabel", weekdays.find((item) => item.value === selectedDate)?.label ?? selectedDate);
      formData.set("_subject", `Új foglalási igény - ${selectedService} - ${selectedSlot}`);

      const response = await fetch(formEndpoint, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("A küldés nem sikerült.");
      }

      setSubmitted(true);
      form.reset();
      setSelectedService(services[0].title);
      setSelectedSlot(slots[0]);
      setSelectedDate(weekdays[0]?.value ?? "");
    } catch {
      setError("A foglalást most nem tudtam elküldeni. Próbáld újra pár perc múlva.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="page-shell">
      <section className="hero">
        <img
          className="hero-image"
          src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1800&q=80"
          alt="Világos, rendezett nappali friss textilekkel"
        />
        <div className="hero-overlay">
          <div className="hero-copy">
            <p className="eyebrow">Manca takarító szolgáltatás</p>
            <h1>Ragyogó terek, pontos érkezéssel.</h1>
            <p className="lead">
              Lakástakarítás, mélytisztítás és kisebb irodák rendbetétele egy
              letisztult, bizalmat építő felületen. Foglalj hétköznap délután,
              amikor neked a legkényelmesebb.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#foglalas">
                Foglalás
              </a>
              <a className="button button-secondary" href="#szolgaltatasok">
                Szolgáltatások
              </a>
            </div>
          </div>

          <div className="hero-stat-grid">
            <article className="hero-stat-card">
              <p className="card-kicker">Foglalható sávok</p>
              <strong>Hétköznap 15:00-18:00</strong>
            </article>
            <article className="hero-stat-card">
              <p className="card-kicker">Szolgáltatások</p>
              <strong>Otthon, iroda, mélytisztítás</strong>
            </article>
            <article className="hero-stat-card hero-stat-quote">
              <p className="quote">
                Tiszta felületek, rendezett részletek és egy olyan érkezés, ami
                belefér a napirendedbe.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="service-nav" aria-label="Szolgáltatás kategória">
        {services.map((service) => (
          <a key={service.title} className="service-pill" href="#szolgaltatasok">
            {service.title}
          </a>
        ))}
      </section>

      <section className="services-section" id="szolgaltatasok">
        <div className="section-heading">
          <p className="eyebrow">Szolgáltatások</p>
          <h2>Valós szolgáltatások, világos csomagolásban.</h2>
        </div>

        <div className="service-grid">
          {services.map((service) => (
            <article key={service.title} className="service-card">
              <img src={service.image} alt={service.title} />
              <div className="service-card-body">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <a className="service-link" href="#foglalas">
                  Erre foglalnék
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="why-section">
        <div className="section-heading">
          <p className="eyebrow">Miért Mancát válaszd</p>
          <h2>Egyszerű foglalás, átlátható kommunikáció, gondos munka.</h2>
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
            <p className="eyebrow">Foglalási információk</p>
            <div className="bullet-points">
              <p>Csak hétköznap választható dátum.</p>
              <p>Csak 15:00, 16:00, 17:00 és 18:00 idősáv választható.</p>
              <p>A beküldött igényekre visszajelzés érkezik a megadott elérhetőségre.</p>
            </div>
          </article>

          <article className="info-card">
            <p className="eyebrow">Vélemények</p>
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
            <p className="eyebrow">Foglalási űrlap</p>
            <h2>Kérj időpontot hétköznap 15:00-18:00 között.</h2>
          </div>

          <form className="booking-form" onSubmit={handleSubmit}>
            <label>
              Név
              <input type="text" name="name" placeholder="Teljes neved" required />
            </label>

            <label>
              Telefonszám
              <input type="tel" name="phone" placeholder="+36 30 123 4567" required />
            </label>

            <label>
              E-mail
              <input type="email" name="email" placeholder="nev@email.hu" required />
            </label>

            <label>
              Szolgáltatás
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
                Hétköznap
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
                Idősáv
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
              Megjegyzés
              <textarea
                name="notes"
                rows={4}
                placeholder="Pl. lakás mérete, külön kérés, cím..."
              />
            </label>

            <button className="button button-primary submit-button" type="submit">
              {isSubmitting ? "Küldés..." : "Foglalási igény küldése"}
            </button>

            <p className="helper-text">
              Jelenleg csak hétköznapi, 15:00-18:00 közötti délutáni sávok foglalhatók.
            </p>

            {error ? <p className="error-message">{error}</p> : null}
            {submitted ? (
              <p className="success-message">
                Foglalási igény elküldve: {selectedService}, {selectedSlot}, {weekdays.find((item) => item.value === selectedDate)?.label}.
              </p>
            ) : null}
          </form>
        </section>
      </section>
    </main>
  );
}
