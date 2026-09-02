"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import birthdayStyles from "./HomeGateBirthday.module.css";
import useLanguage from "./useLanguage";

export default function HomeGate() {
  const [open, setOpen] = useState(false);
  const language = useLanguage();
  const isBg = language === "bg";

  useEffect(() => {
    const timer = window.setTimeout(() => setOpen(true), 650);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.gates = open ? "open" : "closed";
    window.dispatchEvent(new CustomEvent("orisia-gates-change", { detail: { open } }));
  }, [open]);

  return (
    <main className="home-page">
      <section className={`gate-stage ${open ? "gates-open" : ""}`} aria-label={isBg ? "Вход към ОРИСИЯ" : "Entrance to ORISIA"}>
        <div className="tavern-glow" aria-hidden="true" />
        <div className="tavern-copy">
          <span className="hero-kicker">{isBg ? "ОРИСИЯ · БЪЛГАРСКИ ФОЛКЛОР" : "ORISIA · BULGARIAN FOLKLORE"}</span>
          <h1>{isBg ? <>Добре дошли<br />в механата на танца</> : <>Welcome<br />to the tavern of dance</>}</h1>
          <p>{isBg ? "Отвори вратата към фолклора." : "Open the door to folklore."}</p>
          <div className="hero-actions">
            <Link href="#programa" className="hero-btn hero-btn-primary">{isBg ? "Виж програмата" : "See the program"}</Link>
            <Link href="/about" className="hero-btn hero-btn-secondary">{isBg ? "За ОРИСИЯ" : "About ORISIA"}</Link>
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
            {isBg ? "Отвори портите" : "Open the gates"}
          </button>
        )}
      </section>

      <section className={birthdayStyles.section} aria-label={isBg ? "Трети рожден ден на ОРИСИЯ" : "ORISIA third birthday"}>
        <div className={`container ${birthdayStyles.inner}`}>
          <div className={birthdayStyles.date}>
            <span>18.09</span>
            <strong>2026</strong>
          </div>
          <div className={birthdayStyles.copy}>
            <span>{isBg ? "СПЕЦИАЛЕН ПОВОД" : "SPECIAL OCCASION"}</span>
            <h2>{isBg ? "3 години ОРИСИЯ" : "3 years of ORISIA"}</h2>
            <p>{isBg ? "Три години танц, хора, приятелства и споделени български вечери. На 18 септември празнуваме рождения ден на ОРИСИЯ." : "Three years of dance, horo, friendships and shared Bulgarian evenings. On September 18, we celebrate ORISIA's birthday."}</p>
          </div>
          <div className={birthdayStyles.badge}>
            <strong>3</strong>
            <span>{isBg ? "ГОДИНИ" : "YEARS"}</span>
          </div>
        </div>
      </section>

      <section className="tavern-section" id="programa">
        <div className="container tavern-section-inner">
          <span className="section-kicker">{isBg ? "КОНЦЕПЦИЯ" : "CONCEPT"}</span>
          <h2>{isBg ? "Сайт като вход към българска вечер" : "A website as an entrance to a Bulgarian evening"}</h2>
          <p className="section-lead">{isBg ? "Традиция, събор, механа и празник — поднесени като една обща атмосфера още от първия екран." : "Tradition, folklore gatherings, tavern atmosphere and celebration — brought together from the very first screen."}</p>
          <div className="tavern-cards">
            <article className="tavern-card"><span>01</span><h3>{isBg ? "Традиция" : "Tradition"}</h3><p>{isBg ? "Фолклорният характер води визията, типографията и декоративните детайли." : "The folklore character guides the visual style, typography and decorative details."}</p></article>
            <article className="tavern-card"><span>02</span><h3>{isBg ? "Програма" : "Program"}</h3><p>{isBg ? "Място за предстоящи участия, събития и вечери на ОРИСИЯ." : "A place for upcoming performances, events and ORISIA evenings."}</p></article>
            <article className="tavern-card"><span>03</span><h3>{isBg ? "Механа" : "Tavern"}</h3><p>{isBg ? "Топла дървена палитра, златни акценти и усещане за вход към стара българска механа." : "A warm wooden palette, golden accents and the feeling of entering an old Bulgarian tavern."}</p></article>
          </div>
        </div>
      </section>
    </main>
  );
}
