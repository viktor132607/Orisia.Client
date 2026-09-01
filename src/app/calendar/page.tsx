import styles from "./calendar.module.css";

const events = [
  { day: 5, title: "Фолклорна вечер", type: "Събитие", time: "19:00" },
  { day: 12, title: "Репетиция", type: "Репетиция", time: "18:30" },
  { day: 19, title: "Участие на ОРИСИЯ", type: "Участие", time: "20:00" },
];

const days = Array.from({ length: 30 }, (_, index) => index + 1);

export default function CalendarPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <span className={styles.kicker}>ОРИСИЯ · СЪБИТИЯ</span>
          <h1>Календар</h1>
          <p>Предстоящи участия, репетиции и фолклорни вечери.</p>
        </div>
      </section>

      <section className={styles.content}>
        <div className={`container ${styles.layout}`}>
          <div className={styles.board}>
            <div className={styles.boardHeader}>
              <div>
                <span className={styles.label}>МЕСЕЦ</span>
                <h2>Септември 2026</h2>
              </div>
              <span className={styles.ornament} aria-hidden="true">✦</span>
            </div>

            <div className={styles.weekdays} aria-hidden="true">
              <span>ПОН</span><span>ВТО</span><span>СРЯ</span><span>ЧЕТ</span><span>ПЕТ</span><span>СЪБ</span><span>НЕД</span>
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
            <span className={styles.label}>ПРЕДСТОЯЩИ</span>
            <h2>Събития</h2>
            <div className={styles.list}>
              {events.map((event) => (
                <article className={styles.card} key={`${event.day}-${event.title}`}>
                  <div className={styles.dateBox}>
                    <strong>{event.day}</strong>
                    <span>СЕП</span>
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
