"use client";

import styles from "./horoteka.module.css";
import useLanguage from "../../components/useLanguage";

export default function HorotekaPage() {
  const language = useLanguage();
  const isBg = language === "bg";

  const dances = [
    { title: isBg ? "Право хоро" : "Pravo Horo", region: isBg ? "Широко разпространено" : "Widely spread", rhythm: "2/4", description: isBg ? "Базово право хоро с равномерна стъпка и лесен ритъм за проследяване." : "A basic pravo horo with an even step and an easy rhythm to follow." },
    { title: isBg ? "Дунавско хоро" : "Danube Horo", region: isBg ? "Северна България" : "Northern Bulgaria", rhythm: "2/4", description: isBg ? "Енергично българско хоро с характерна последователност и ясно изразен ритъм." : "An energetic Bulgarian horo with a characteristic sequence and a clearly defined rhythm." },
    { title: isBg ? "Еленино хоро" : "Elenino Horo", region: isBg ? "Северна България" : "Northern Bulgaria", rhythm: "7/8", description: isBg ? "Хоро с неравноделен размер и отличима стъпкова структура." : "A horo in an asymmetric meter with a distinctive step structure." },
    { title: isBg ? "Пайдушко хоро" : "Paidushko Horo", region: isBg ? "Различни фолклорни области" : "Various folklore regions", rhythm: "5/8", description: isBg ? "Живо хоро в неравноделен ритъм, разпознаваемо по характерното редуване на стъпките." : "A lively horo in an asymmetric rhythm, recognizable by its characteristic alternating steps." },
  ];

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <span className={styles.kicker}>{isBg ? "ОРИСИЯ · ХОРОТЕКА" : "ORISIA · DANCE LIBRARY"}</span>
          <h1>{isBg ? "Хоротека" : "Dance Library"}</h1>
          <p>{isBg ? "Кратки клипове и бърза информация за български хора, стъпки и ритми." : "Short clips and quick information about Bulgarian horo dances, steps and rhythms."}</p>
        </div>
      </section>

      <section className={styles.content}>
        <div className="container">
          <div className={styles.intro}>
            <div>
              <span className={styles.label}>{isBg ? "НАУЧИ ХОРОТО" : "LEARN THE DANCE"}</span>
              <h2>{isBg ? "Гледай. Разпознай. Запомни." : "Watch. Recognize. Remember."}</h2>
            </div>
            <p>{isBg ? "Всеки запис е предвиден за кратко видео, име на хорото, област, ритъм и кратко описание." : "Each entry is designed to include a short video, dance name, folklore region, rhythm and a short description."}</p>
          </div>

          <div className={styles.grid}>
            {dances.map((dance, index) => (
              <article className={styles.card} key={dance.title}>
                <div className={styles.videoPlaceholder}>
                  <span className={styles.play}>▶</span>
                  <strong>{isBg ? `Кратък клип ${index + 1}` : `Short clip ${index + 1}`}</strong>
                  <small>{isBg ? "видео ще бъде добавено от админ панела" : "video will be added from the admin panel"}</small>
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
