import styles from "./gallery.module.css";

const galleryItems = [
  { title: "Сценични участия", subtitle: "ОРИСИЯ на сцена", size: "large" },
  { title: "Фолклорни вечери", subtitle: "Традиция и атмосфера", size: "medium" },
  { title: "Репетиции", subtitle: "Подготовка зад сцената", size: "small" },
  { title: "Събори", subtitle: "Български празници", size: "small" },
  { title: "Зад кулисите", subtitle: "Моменти от подготовката", size: "small" },
  { title: "Специални събития", subtitle: "Гостувания и участия", size: "wide" },
  { title: "ОРИСИЯ", subtitle: "Хората зад танца", size: "small" },
];

export default function GalleryPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <span className={styles.kicker}>ОРИСИЯ · ГАЛЕРИЯ</span>
          <h1>Галерия</h1>
          <p>Моменти от участия, репетиции, събори и фолклорни вечери.</p>
        </div>
      </section>

      <section className={styles.content}>
        <div className="container">
          <div className={styles.intro}>
            <div>
              <span className={styles.label}>СНИМКИ</span>
              <h2>Моменти от ОРИСИЯ</h2>
            </div>
            <p>Страницата е подготвена за реалните снимки. Когато бъдат добавени изображенията, те ще влязат директно в този grid.</p>
          </div>

          <div className={styles.grid}>
            {galleryItems.map((item, index) => (
              <article key={`${item.title}-${index}`} className={`${styles.item} ${styles[item.size]}`}>
                <div className={styles.frame}>
                  <div className={styles.placeholder}>
                    <strong>Снимка {index + 1}</strong>
                    <span>очаква изображение</span>
                  </div>
                </div>
                <div className={styles.caption}>
                  <strong>{item.title}</strong>
                  <span>{item.subtitle}</span>
                </div>
              </article>
            ))}
          </div>

          <div className={styles.note}>Галерията в момента използва placeholder-и, за да не се показват случайни или несвързани изображения.</div>
        </div>
      </section>
    </main>
  );
}
