"use client";

import styles from "./calendar.module.css";
import useLanguage from "../../components/useLanguage";

const days = Array.from({ length: 30 }, (_, index) => index + 1);

export default function CalendarPage() {
  const language = useLanguage();
  const isBg = language === "bg";

  const events = [
    { day: 5, title: isBg ? "Фолклорна вечер" : "Folklore evening", type: isBg ? "Събитие" : "Event", time: "19:00" },
    { day: 12, title: isBg ? "Репетиция" : "Rehearsal", type: isBg ? "Репетиция" : "Rehearsal", time: "18:30" },
    { day: 19, title: isBg ? "Участие на ОРИСИЯ" : "ORISIA performance", type: isBg ? "Участие" : "Performance", time: "20:00" },
  ];

  const weekdays = isBg ? ["ПОН", "ВТО", "СРЯ", "ЧЕТ", "ПЕТ", "СЪБ", "НЕД"] : ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <span className={styles.kicker}>{isBg ? "ОРИСИЯ · СЪБИТИЯ" : "ORISIA · EVENTS"}</span>
          <h1>{isBg ? "Календар" : "Calendar"}</h1>
          <p>{isBg ? "Предстоящи участия, репетиции и фолклорни вечери." : "Upcoming performances, rehearsals and folklore evenings."}</p>
        </div>
      </section>

      <section className={styles.content}>
        <div className={`container ${styles.layout}`}>
          <div className={styles.board}>
            <div className={styles.boardHeader}>
              <div>
                <span className={styles.label}>{isBg ? "МЕСЕЦ" : "MONTH"}</span>
                <h2>{isBg ? "Септември 2026" : "September 2026"}</h2>
              </div>
              <span className={styles.ornament} aria-hidden="true">✦</span>
            </div>

            <div className={styles.weekdays} aria-hidden="true">
              {weekdays.map((day) => <span key={day}>{day}</span>)}
            </div>

            <div className={styles.grid}>
              <div className={`${styles.cell} ${styles.empty}`} />
              {days.map((day) => {
                const event = events.find((item) => item.day === day);
                return (
                  <article key={day} className={`${styles.cell} ${event ? styles.eventCell : ""}`}>
                    <span className={styles.day}>{day}</span>
                    {event && (
                      <div className={styles.eventChip}>
                        <strong>{event.title}</strong>
                        <span>{event.time}</span>
                      </div>
                    )}
                  </article>
                );
              })}
              <div className={`${styles.cell} ${styles.empty}`} />
              <div className={`${styles.cell} ${styles.empty}`} />
              <div className={`${styles.cell} ${styles.empty}`} />
              <div className={`${styles.cell} ${styles.empty}`} />
            </div>
          </div>

          <aside className={styles.panel}>
            <span className={styles.label}>{isBg ? "ПРЕДСТОЯЩИ" : "UPCOMING"}</span>
            <h2>{isBg ? "Събития" : "Events"}</h2>
            <div className={styles.list}>
              {events.map((event) => (
                <article className={styles.card} key={`${event.day}-${event.title}`}>
                  <div className={styles.dateBox}>
                    <strong>{event.day}</strong>
                    <span>{isBg ? "СЕП" : "SEP"}</span>
                  </div>
                  <div className={styles.cardCopy}>
                    <span>{event.type} · {event.time}</span>
                    <h3>{event.title}</h3>
                  </div>
                </article>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
