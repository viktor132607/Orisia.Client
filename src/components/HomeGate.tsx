"use client";

import Link from "next/link";
import birthdayStyles from "./HomeGateBirthday.module.css";
import useLanguage from "./useLanguage";
import HomeFeed from "./HomeFeed";

export default function HomeGate() {
  const language = useLanguage();
  const isBg = language === "bg";

  return (
    <main className="home-page">
      <section className="gate-stage gates-open" aria-label={isBg ? "Начална страница на ОРИСИЯ" : "ORISIA homepage"}>
        <div className="tavern-glow" aria-hidden="true" />
        <div className="tavern-copy">
          <span className="hero-kicker">{isBg ? "ОРИСИЯ · БЪЛГАРСКИ ФОЛКЛОР" : "ORISIA · BULGARIAN FOLKLORE"}</span>
          <h1>{isBg ? <>Добре дошли<br />в механата на танца</> : <>Welcome<br />to the tavern of dance</>}</h1>
          <p>{isBg ? "Отвори вратата към фолклора." : "Open the door to folklore."}</p>
          <div className="hero-actions">
            <Link href="#programa" className="hero-btn hero-btn-primary">{isBg ? "Виж новините" : "See updates"}</Link>
            <Link href="/about" className="hero-btn hero-btn-secondary">{isBg ? "За ОРИСИЯ" : "About ORISIA"}</Link>
          </div>
        </div>
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

      <HomeFeed />
    </main>
  );
}
