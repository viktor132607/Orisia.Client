"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomeGate() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setOpen(true), 650);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main className="home-page">
      <section className={`gate-stage ${open ? "gates-open" : ""}`} aria-label="Вход към ОРИСИЯ">
        <div className="tavern-glow" aria-hidden="true" />
        <div className="tavern-copy">
          <span className="hero-kicker">ОРИСИЯ · БЪЛГАРСКИ ФОЛКЛОР</span>
          <h1>Добре дошли<br />в механата на танца</h1>
          <p>Отвори вратата към фолклора.</p>
          <div className="hero-actions">
            <Link href="#programa" className="hero-btn hero-btn-primary">Виж програмата</Link>
            <Link href="/about" className="hero-btn hero-btn-secondary">За ОРИСИЯ</Link>
          </div>
        </div>

        <div className="gate-arch" aria-hidden="true" />
        <div className="gate-doors" aria-hidden="true">
          <div className="gate-door gate-door-left">
            <span className="door-brace door-brace-top" />
            <span className="door-brace door-brace-bottom" />
            <span className="door-handle door-handle-left" />
          </div>
          <div className="gate-door gate-door-right">
            <span className="door-brace door-brace-top" />
            <span className="door-brace door-brace-bottom" />
            <span className="door-handle door-handle-right" />
          </div>
        </div>

        {!open && (
          <button className="gate-open-button" type="button" onClick={() => setOpen(true)}>
            Отвори портите
          </button>
        )}
      </section>

      <section className="tavern-section" id="programa">
        <div className="container tavern-section-inner">
          <span className="section-kicker">КОНЦЕПЦИЯ</span>
          <h2>Сайт като вход към българска вечер</h2>
          <p className="section-lead">Традиция, събор, механа и празник — поднесени като една обща атмосфера още от първия екран.</p>
          <div className="tavern-cards">
            <article className="tavern-card"><span>01</span><h3>Традиция</h3><p>Фолклорният характер води визията, типографията и декоративните детайли.</p></article>
            <article className="tavern-card"><span>02</span><h3>Програма</h3><p>Място за предстоящи участия, събития и вечери на ОРИСИЯ.</p></article>
            <article className="tavern-card"><span>03</span><h3>Механа</h3><p>Топла дървена палитра, златни акценти и усещане за вход към стара българска механа.</p></article>
          </div>
        </div>
      </section>
    </main>
  );
}
