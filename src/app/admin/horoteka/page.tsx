"use client";

import Link from "next/link";
import styles from "./horoteka-admin.module.css";
import useLanguage from "../../../components/useLanguage";

export default function HorotekaAdminPage() {
  const language = useLanguage();
  const isBg = language === "bg";

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <span className={styles.kicker}>{isBg ? "ОРИСИЯ · АДМИН · ХОРОТЕКА" : "ORISIA · ADMIN · DANCE LIBRARY"}</span>
          <div className={styles.heroRow}>
            <div>
              <h1>{isBg ? "Хоротека" : "Dance Library"}</h1>
              <p>{isBg ? "Добавяне и управление на кратки видеа и информация за хора." : "Add and manage short videos and information about Bulgarian horo dances."}</p>
            </div>
            <Link href="/admin" className={styles.back}>{isBg ? "Назад към админ" : "Back to admin"}</Link>
          </div>
        </div>
      </section>

      <section className={styles.content}>
        <div className={`container ${styles.layout}`}>
          <div className={styles.formCard}>
            <span className={styles.label}>{isBg ? "НОВО ХОРО" : "NEW DANCE"}</span>
            <h2>{isBg ? "Качи клип и информация" : "Upload clip and information"}</h2>
            <form onSubmit={(event) => event.preventDefault()}>
              <div className={styles.field}>
                <label htmlFor="dance-video">{isBg ? "Кратък клип" : "Short clip"}</label>
                <input id="dance-video" name="video" type="file" accept="video/*" />
              </div>
              <div className={styles.field}>
                <label htmlFor="dance-title">{isBg ? "Име на хорото *" : "Dance name *"}</label>
                <input id="dance-title" name="title" type="text" placeholder={isBg ? "Напр. Право хоро" : "E.g. Pravo Horo"} required />
              </div>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="dance-region">{isBg ? "Фолклорна област" : "Folklore region"}</label>
                  <input id="dance-region" name="region" type="text" placeholder={isBg ? "Напр. Северняшка" : "E.g. Northern Bulgaria"} />
                </div>
                <div className={styles.field}>
                  <label htmlFor="dance-rhythm">{isBg ? "Размер / ритъм" : "Meter / rhythm"}</label>
                  <input id="dance-rhythm" name="rhythm" type="text" placeholder={isBg ? "Напр. 7/8" : "E.g. 7/8"} />
                </div>
              </div>
              <div className={styles.field}>
                <label htmlFor="dance-description">{isBg ? "Кратка информация *" : "Short description *"}</label>
                <textarea id="dance-description" name="description" placeholder={isBg ? "Кратко описание на хорото, стъпките или характера му" : "Short description of the dance, its steps or character"} required />
              </div>
              <button type="submit" className={styles.submit}>{isBg ? "Добави в хоротеката" : "Add to Dance Library"}</button>
            </form>
          </div>

          <aside className={styles.side}>
            <span className={styles.label}>{isBg ? "УПРАВЛЕНИЕ" : "MANAGEMENT"}</span>
            <h2>{isBg ? "Публикувани хора" : "Published dances"}</h2>
            <p>{isBg ? "Тук ще се показват записите от хоротеката с опции за редакция, подмяна на клипа и изтриване." : "Dance Library entries will appear here with options to edit, replace the clip and delete them."}</p>
            <div className={styles.placeholderList}>
              <div><strong>{isBg ? "Право хоро" : "Pravo Horo"}</strong><span>{isBg ? "Редакция · Изтриване" : "Edit · Delete"}</span></div>
              <div><strong>{isBg ? "Дунавско хоро" : "Danube Horo"}</strong><span>{isBg ? "Редакция · Изтриване" : "Edit · Delete"}</span></div>
            </div>
            <div className={styles.notice}>{isBg ? "Frontend версия · качването и записът в база данни ще се активират при backend интеграцията." : "Frontend version · uploading and database storage will be activated during backend integration."}</div>
          </aside>
        </div>
      </section>
    </main>
  );
}
