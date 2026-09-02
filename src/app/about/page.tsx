"use client";

import styles from "./about.module.css";
import useLanguage from "../../components/useLanguage";

const lecturers = [0, 1, 2];

export default function AboutPage() {
  const language = useLanguage();
  const isBg = language === "bg";

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <span className={styles.kicker}>{isBg ? "ОРИСИЯ · ЗА НАС" : "ORISIA · ABOUT US"}</span>
          <h1>{isBg ? "За ОРИСИЯ" : "About ORISIA"}</h1>
          <p>{isBg ? "Място за български фолклор, танц и хора, които искат да пазят традицията жива и да я споделят заедно." : "A place for Bulgarian folklore, dance and people who want to keep tradition alive and share it together."}</p>
        </div>
      </section>

      <section className={styles.story}>
        <div className={`container ${styles.storyGrid}`}>
          <article className={styles.panel}>
            <span className={styles.sectionLabel}>{isBg ? "КОИ СМЕ НИЕ" : "WHO WE ARE"}</span>
            <h2>{isBg ? "Танц, традиция и общност" : "Dance, tradition and community"}</h2>
            <p>{isBg ? "ОРИСИЯ събира хора около българските народни танци, репетициите, участията и фолклорните събития. Тази страница ще се развива с историята, целите и важните моменти на клуба." : "ORISIA brings people together around Bulgarian folk dances, rehearsals, performances and folklore events. This page will grow with the club's history, goals and important moments."}</p>
          </article>
          <article className={styles.panel}>
            <span className={styles.sectionLabel}>{isBg ? "КЪДЕ СМЕ" : "WHERE WE ARE"}</span>
            <h2>{isBg ? "Русе" : "Ruse"}</h2>
            <p>{isBg ? "гр. Русе, ул. Родина 80, на гърба на боулинг залата. Тук се срещаме, репетираме и подготвяме следващите си участия." : "80 Rodina St., behind the bowling hall, Ruse. This is where we meet, rehearse and prepare for our next performances."}</p>
          </article>
        </div>
      </section>

      <section className={styles.lecturers}>
        <div className="container">
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.sectionLabel}>{isBg ? "ЕКИП" : "TEAM"}</span>
              <h2>{isBg ? "Нашите лектори" : "Our instructors"}</h2>
            </div>
            <p>{isBg ? "Хората, които водят заниманията, показват стъпките и предават характера на българските хора." : "The people who lead the sessions, teach the steps and pass on the character of Bulgarian horo dances."}</p>
          </div>

          <div className={styles.grid}>
            {lecturers.map((index) => (
              <article className={styles.card} key={index}>
                <div className={styles.portrait}>{isBg ? "Снимка на лектор" : "Instructor photo"}</div>
                <div className={styles.cardBody}>
                  <span>{isBg ? "Лектор" : "Instructor"}</span>
                  <h3>{isBg ? "Име на лектор" : "Instructor name"}</h3>
                  <p>{isBg ? "Кратко представяне на лектора, опита му и фолклорните области или хора, с които работи." : "A short introduction to the instructor, their experience and the folklore regions or dances they work with."}</p>
                </div>
              </article>
            ))}
          </div>

          <div className={styles.note}>{isBg ? "Имената, снимките и точните представяния са оставени като placeholder-и, защото в проекта няма записани данни за лекторите." : "Names, photos and exact bios are left as placeholders because the project does not yet contain instructor details."}</div>
        </div>
      </section>
    </main>
  );
}
