"use client";

import Link from "next/link";
import styles from "./horoteka-admin.module.css";

export default function HorotekaAdminPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <span className={styles.kicker}>ОРИСИЯ · АДМИН · ХОРОТЕКА</span>
          <div className={styles.heroRow}>
            <div>
              <h1>Хоротека</h1>
              <p>Добавяне и управление на кратки видеа и информация за хора.</p>
            </div>
            <Link href="/admin" className={styles.back}>Назад към админ</Link>
          </div>
        </div>
      </section>

      <section className={styles.content}>
        <div className={`container ${styles.layout}`}>
          <div className={styles.formCard}>
            <span className={styles.label}>НОВО ХОРО</span>
            <h2>Качи клип и информация</h2>
            <form onSubmit={(event) => event.preventDefault()}>
              <div className={styles.field}>
                <label htmlFor="dance-video">Кратък клип</label>
                <input id="dance-video" name="video" type="file" accept="video/*" />
              </div>
              <div className={styles.field}>
                <label htmlFor="dance-title">Име на хорото *</label>
                <input id="dance-title" name="title" type="text" placeholder="Напр. Право хоро" required />
              </div>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="dance-region">Фолклорна област</label>
                  <input id="dance-region" name="region" type="text" placeholder="Напр. Северняшка" />
                </div>
                <div className={styles.field}>
                  <label htmlFor="dance-rhythm">Размер / ритъм</label>
                  <input id="dance-rhythm" name="rhythm" type="text" placeholder="Напр. 7/8" />
                </div>
              </div>
              <div className={styles.field}>
                <label htmlFor="dance-description">Кратка информация *</label>
                <textarea id="dance-description" name="description" placeholder="Кратко описание на хорото, стъпките или характера му" required />
              </div>
              <button type="submit" className={styles.submit}>Добави в хоротеката</button>
            </form>
          </div>

          <aside className={styles.side}>
            <span className={styles.label}>УПРАВЛЕНИЕ</span>
            <h2>Публикувани хора</h2>
            <p>Тук ще се показват записите от хоротеката с опции за редакция, подмяна на клипа и изтриване.</p>
            <div className={styles.placeholderList}>
              <div><strong>Право хоро</strong><span>Редакция · Изтриване</span></div>
              <div><strong>Дунавско хоро</strong><span>Редакция · Изтриване</span></div>
            </div>
            <div className={styles.notice}>Frontend версия · качването и записът в база данни ще се активират при backend интеграцията.</div>
          </aside>
        </div>
      </section>
    </main>
  );
}
