const events = [
  { day: 5, title: "Фолклорна вечер", type: "Събитие", time: "19:00" },
  { day: 12, title: "Репетиция", type: "Репетиция", time: "18:30" },
  { day: 19, title: "Участие на ОРИСИЯ", type: "Участие", time: "20:00" },
];

const days = Array.from({ length: 30 }, (_, index) => index + 1);

export default function CalendarPage() {
  return (
    <main className="calendar-page">
      <section className="calendar-hero">
        <div className="container">
          <span className="section-kicker">ОРИСИЯ · СЪБИТИЯ</span>
          <h1>Календар</h1>
          <p>Предстоящи участия, репетиции и фолклорни вечери.</p>
        </div>
      </section>

      <section className="calendar-content">
        <div className="container calendar-layout">
          <div className="calendar-board">
            <div className="calendar-board-header">
              <div>
                <span className="calendar-label">МЕСЕЦ</span>
                <h2>Септември 2026</h2>
              </div>
              <span className="calendar-ornament" aria-hidden="true">✦</span>
            </div>

            <div className="calendar-weekdays" aria-hidden="true">
              <span>ПОН</span><span>ВТО</span><span>СРЯ</span><span>ЧЕТ</span><span>ПЕТ</span><span>СЪБ</span><span>НЕД</span>
            </div>

            <div className="calendar-grid">
              <div className="calendar-cell calendar-cell-empty" />
              {days.map((day) => {
                const event = events.find((item) => item.day === day);
                return (
                  <article key={day} className={`calendar-cell ${event ? "calendar-cell-event" : ""}`}>
                    <span className="calendar-day">{day}</span>
                    {event && (
                      <div className="calendar-event-chip">
                        <strong>{event.title}</strong>
                        <span>{event.time}</span>
                      </div>
                    )}
                  </article>
                );
              })}
              <div className="calendar-cell calendar-cell-empty" />
              <div className="calendar-cell calendar-cell-empty" />
              <div className="calendar-cell calendar-cell-empty" />
              <div className="calendar-cell calendar-cell-empty" />
            </div>
          </div>

          <aside className="events-panel">
            <span className="calendar-label">ПРЕДСТОЯЩИ</span>
            <h2>Събития</h2>
            <div className="events-list">
              {events.map((event) => (
                <article className="event-card" key={`${event.day}-${event.title}`}>
                  <div className="event-date-box">
                    <strong>{event.day}</strong>
                    <span>СЕП</span>
                  </div>
                  <div className="event-card-copy">
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
