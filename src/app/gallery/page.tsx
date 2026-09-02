"use client";

import styles from "./gallery.module.css";
import useLanguage from "../../components/useLanguage";

export default function GalleryPage() {
  const language = useLanguage();
  const isBg = language === "bg";

  const galleryItems = [
    { title: isBg ? "Сценични участия" : "Stage performances", subtitle: isBg ? "ОРИСИЯ на сцена" : "ORISIA on stage", size: "large" },
    { title: isBg ? "Фолклорни вечери" : "Folklore evenings", subtitle: isBg ? "Традиция и атмосфера" : "Tradition and atmosphere", size: "medium" },
    { title: isBg ? "Репетиции" : "Rehearsals", subtitle: isBg ? "Подготовка зад сцената" : "Behind-the-scenes preparation", size: "small" },
    { title: isBg ? "Събори" : "Folklore gatherings", subtitle: isBg ? "Български празници" : "Bulgarian celebrations", size: "small" },
    { title: isBg ? "Зад кулисите" : "Behind the scenes", subtitle: isBg ? "Моменти от подготовката" : "Moments from the preparation", size: "small" },
    { title: isBg ? "Специални събития" : "Special events", subtitle: isBg ? "Гостувания и участия" : "Guest appearances and performances", size: "wide" },
    { title: isBg ? "ОРИСИЯ" : "ORISIA", subtitle: isBg ? "Хората зад танца" : "The people behind the dance", size: "small" },
  ];

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <span className={styles.kicker}>{isBg ? "ОРИСИЯ · ГАЛЕРИЯ" : "ORISIA · GALLERY"}</span>
          <h1>{isBg ? "Галерия" : "Gallery"}</h1>
          <p>{isBg ? "Моменти от участия, репетиции, събори и фолклорни вечери." : "Moments from performances, rehearsals, folklore gatherings and folklore evenings."}</p>
        </div>
      </section>

      <section className={styles.content}>
        <div className="container">
          <div className={styles.intro}>
            <div>
              <span className={styles.label}>{isBg ? "СНИМКИ" : "PHOTOS"}</span>
              <h2>{isBg ? "Моменти от ОРИСИЯ" : "Moments from ORISIA"}</h2>
            </div>
            <p>{isBg ? "Страницата е подготвена за реалните снимки. Когато бъдат добавени изображенията, те ще влязат директно в този grid." : "The page is prepared for the real photos. Once images are added, they will appear directly in this grid."}</p>
          </div>

          <div className={styles.grid}>
            {galleryItems.map((item, index) => (
              <article key={`${item.title}-${index}`} className={`${styles.item} ${styles[item.size]}`}>
                <div className={styles.frame}>
                  <div className={styles.placeholder}>
                    <strong>{isBg ? `Снимка ${index + 1}` : `Photo ${index + 1}`}</strong>
                    <span>{isBg ? "очаква изображение" : "image pending"}</span>
                  </div>
                </div>
                <div className={styles.caption}>
                  <strong>{item.title}</strong>
                  <span>{item.subtitle}</span>
                </div>
              </article>
            ))}
          </div>

          <div className={styles.note}>{isBg ? "Галерията в момента използва placeholder-и, за да не се показват случайни или несвързани изображения." : "The gallery currently uses placeholders so random or unrelated images are not shown."}</div>
        </div>
      </section>
    </main>
  );
}
