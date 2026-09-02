"use client";

import birthdayStyles from "./HomeGateBirthday.module.css";
import useLanguage from "./useLanguage";
import HomeFeed from "./HomeFeed";

export default function HomeGate() {
  const language = useLanguage();
  const isBg = language === "bg";

  return (
    <main className="home-page">
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
