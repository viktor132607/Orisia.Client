import styles from "./about.module.css";

const lecturers = [
  { role: "Лектор", name: "Име на лектор", text: "Кратко представяне на лектора, опита му и фолклорните области или хора, с които работи." },
  { role: "Лектор", name: "Име на лектор", text: "Кратко представяне на лектора, опита му и фолклорните области или хора, с които работи." },
  { role: "Лектор", name: "Име на лектор", text: "Кратко представяне на лектора, опита му и фолклорните области или хора, с които работи." },
];

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <span className={styles.kicker}>ОРИСИЯ · ЗА НАС</span>
          <h1>За ОРИСИЯ</h1>
          <p>Място за български фолклор, танц и хора, които искат да пазят традицията жива и да я споделят заедно.</p>
        </div>
      </section>

      <section className={styles.story}>
        <div className={`container ${styles.storyGrid}`}>
          <article className={styles.panel}>
            <span className={styles.sectionLabel}>КОИ СМЕ НИЕ</span>
            <h2>Танц, традиция и общност</h2>
            <p>ОРИСИЯ събира хора около българските народни танци, репетициите, участията и фолклорните събития. Тази страница ще се развива с историята, целите и важните моменти на клуба.</p>
          </article>
          <article className={styles.panel}>
            <span className={styles.sectionLabel}>КЪДЕ СМЕ</span>
            <h2>Русе</h2>
            <p>гр. Русе, ул. Родина 80, на гърба на боулинг залата. Тук се срещаме, репетираме и подготвяме следващите си участия.</p>
          </article>
        </div>
      </section>

      <section className={styles.lecturers}>
        <div className="container">
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.sectionLabel}>ЕКИП</span>
              <h2>Нашите лектори</h2>
            </div>
            <p>Хората, които водят заниманията, показват стъпките и предават характера на българските хора.</p>
          </div>

          <div className={styles.grid}>
            {lecturers.map((lecturer, index) => (
              <article className={styles.card} key={index}>
                <div className={styles.portrait}>Снимка на лектор</div>
                <div className={styles.cardBody}>
                  <span>{lecturer.role}</span>
                  <h3>{lecturer.name}</h3>
                  <p>{lecturer.text}</p>
                </div>
              </article>
            ))}
          </div>

          <div className={styles.note}>Имената, снимките и точните представяния са оставени като placeholder-и, защото в проекта няма записани данни за лекторите.</div>
        </div>
      </section>
    </main>
  );
}
