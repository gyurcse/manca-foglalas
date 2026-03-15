"use client";

import { FormEvent, useState } from "react";

const bookingDates = [
  { day: "15", label: "Marcius 15.", note: "vasarnap" },
  { day: "16", label: "Marcius 16.", note: "hetfo" },
  { day: "17", label: "Marcius 17.", note: "kedd" },
  { day: "18", label: "Marcius 18.", note: "szerda" },
];

const services = [
  "Lakastakaritas",
  "Melytisztitas",
  "Irodatakaritas",
  "Kikoltozes utani takaritas",
];

const slots = ["08:00", "10:30", "13:00", "15:30", "17:30"];

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(bookingDates[0].label);
  const [selectedService, setSelectedService] = useState(services[0]);
  const [selectedSlot, setSelectedSlot] = useState(slots[1]);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Manca takarito szolgaltatasai</p>
          <h1>Tiszta otthon, lefoglalt idoponttal.</h1>
          <p className="lead">
            Egyszeru foglalas modern feluleten. Valassz szolgaltatast,
            idopontot es kuldd el az igenyedet nehany masodperc alatt.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#foglalas">
              Idopontot kerek
            </a>
            <a className="button button-secondary" href="#szolgaltatasok">
              Szolgaltatasok
            </a>
          </div>
        </div>

        <div className="hero-panel">
          <p className="card-kicker">Elerheto foglalas</p>
          <strong>2026. marcius 15-18.</strong>
          <p className="quote">
            Csak a megadott negy napon lehet idopontot kerni, gyors
            visszaigazolassal.
          </p>
          <div className="mini-stats">
            <div>
              <span>Valaszido</span>
              <strong>1 oran belul</strong>
            </div>
            <div>
              <span>Szabad savok</span>
              <strong>5 / nap</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="date-strip" aria-label="Foglalhato datumok">
        {bookingDates.map((item) => (
          <button
            key={item.day}
            type="button"
            className={selectedDate === item.label ? "date-card active" : "date-card"}
            onClick={() => setSelectedDate(item.label)}
          >
            <span>{item.day}</span>
            <strong>{item.label}</strong>
            <small>{item.note}</small>
          </button>
        ))}
      </section>

      <section className="content-grid">
        <div className="info-stack" id="szolgaltatasok">
          <article className="info-card">
            <p className="eyebrow">Szolgaltatasok</p>
            <h2>Rugalmas takaritas otthonra es kisebb irodaba.</h2>
            <ul className="service-list">
              {services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </article>

          <article className="info-card accent-card">
            <p className="eyebrow">Mit kapsz</p>
            <div className="bullet-points">
              <p>Attekintheto idopontvalasztas 15-18 kozotti datumokra.</p>
              <p>Egyszeru kapcsolatfelvetel telefon es e-mail megadasaval.</p>
              <p>Modern, mobilon is jol hasznalhato egyoldalas felulet.</p>
            </div>
          </article>
        </div>

        <section className="booking-card" id="foglalas">
          <div className="booking-header">
            <p className="eyebrow">Foglalasi urlap</p>
            <h2>Kerj idopontot ket perc alatt.</h2>
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
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </label>

            <div className="split-fields">
              <label>
                Datum
                <select
                  name="date"
                  value={selectedDate}
                  onChange={(event) => setSelectedDate(event.target.value)}
                >
                  {bookingDates.map((item) => (
                    <option key={item.label} value={item.label}>
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
                placeholder="Pl. lakas merete, cim, kulon keres..."
              />
            </label>

            <button className="button button-primary submit-button" type="submit">
              Foglalasi igeny kuldese
            </button>

            <p className="helper-text">
              Foglalas csak 2026. marcius 15. es 2026. marcius 18. kozotti
              datumokra erheto el.
            </p>

            {submitted ? (
              <p className="success-message">
                Koszonjuk! A foglalasi igeny rogzitve: {selectedDate}, {selectedSlot}.
              </p>
            ) : null}
          </form>
        </section>
      </section>
    </main>
  );
}
