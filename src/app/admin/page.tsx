import Link from "next/link";
import styles from "./admin.module.css";

const cards = [
  { title: "Събития", value: "3", text: "Управление на календара и предстоящите участия.", href: "/calendar" },
  { title: "Потребители", value: "—", text: "Потребителски профили и достъп до сайта.", href: "/account" },
  { title: "Контактни запитвания", value: "—", text: "Преглед и управление на съобщенията от контактната форма.", href: "/contact" },
];

export default function AdminPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <span className={styles.kicker}>ОРИСИЯ · УПРАВЛЕНИЕ</span>
          <div className={styles.heroRow}>
            <div>
              <h1>Админ панел</h1>
              <p>Временна начална структура за управление на съдържанието.</p>
            </div>
            <Link href="/" className={styles.backButton}>Към сайта</Link>
          </div>
        </div>
      </section>

      <section className={styles.content}>
        <div className="container">
          <div className={styles.notice}>DEV версия · контролите все още не са свързани с backend.</div>
          <div className={styles.grid}>
            {cards.map((card) => (
              <article className={styles.card} key={card.title}>
                <div className={styles.cardTop}>
                  <span>{card.title}</span>
                  <strong>{card.value}</strong>
                </div>
                <p>{card.text}</p>
                <Link href={card.href}>Отвори</Link>
              </article>
            ))}
          </div>

          <div className={styles.workspace}>
            <div>
              <span className={styles.label}>БЪРЗИ ДЕЙСТВИЯ</span>
              <h2>Управление на съдържанието</h2>
              <p>Тук може да влязат редактор за събития, настройки на началната страница, галерия, контактни запитвания и потребителски роли.</p>
            </div>
            <div className={styles.actions}>
              <button type="button">Добави събитие</button>
              <button type="button">Редактирай начална страница</button>
              <button type="button">Управление на потребители</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
