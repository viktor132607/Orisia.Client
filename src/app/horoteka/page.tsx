import styles from "./horoteka.module.css";

const dances = [
  { title: "Право хоро", region: "Широко разпространено", rhythm: "2/4", description: "Базово право хоро с равномерна стъпка и лесен ритъм за проследяване." },
  { title: "Дунавско хоро", region: "Северна България", rhythm: "2/4", description: "Енергично българско хоро с характерна последователност и ясно изразен ритъм." },
  { title: "Еленино хоро", region: "Северна България", rhythm: "7/8", description: "Хоро с неравноделен размер и отличима стъпкова структура." },
  { title: "Пайдушко хоро", region: "Различни фолклорни области", rhythm: "5/8", description: "Живо хоро в неравноделен ритъм, разпознаваемо по характерното редуване на стъпките." },
];

export default function HorotekaPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <span className={styles.kicker}>ОРИСИЯ · ХОРОТЕКА</span>
          <h1>Хоротека</h1>
          <p>Кратки клипове и бърза информация за български хора, стъпки и ритми.</p>
        </div>
      </section>

      <section className={styles.content}>
        <div className="container">
          <div className={styles.intro}>
            <div>
              <span className={styles.label}>НАУЧИ ХОРОТО</span>
              <h2>Гледай. Разпознай. Запомни.</h2>
            </div>
            <p>Всеки запис е предвиден за кратко видео, име на хорото, област, ритъм и кратко описание.</p>
          </div>

          <div className={styles.grid}>
            {dances.map((dance, index) => (
              <article className={styles.card} key={dance.title}>
                <div className={styles.videoPlaceholder}>
                  <span className={styles.play}>▶</span>
                  <strong>Кратък клип {index + 1}</strong>
                  <small>видео ще бъде добавено от админ панела</small>
                </div>
                <div className={styles.cardBody}>
                  <span className={styles.meta}>{dance.region} · {dance.rhythm}</span>
                  <h3>{dance.title}</h3>
                  <p>{dance.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
