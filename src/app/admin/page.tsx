"use client";

import Link from "next/link";
import styles from "./admin.module.css";
import useLanguage from "../../components/useLanguage";

export default function AdminPage() {
  const language = useLanguage();
  const isBg = language === "bg";

  const cards = [
    { title: isBg ? "Събития" : "Events", value: "3", text: isBg ? "Управление на календара и предстоящите участия." : "Manage the calendar and upcoming performances.", href: "/admin/events" },
    { title: isBg ? "Хоротека" : "Dance Library", value: "—", text: isBg ? "Кратки клипове и информация за български хора." : "Short clips and information about Bulgarian horo dances.", href: "/admin/horoteka" },
    { title: isBg ? "Потребители" : "Users", value: "—", text: isBg ? "Потребителски профили и достъп до сайта." : "User profiles and access to the site.", href: "/admin/users" },
    { title: isBg ? "Контактни запитвания" : "Contact inquiries", value: "—", text: isBg ? "Преглед и управление на съобщенията от контактната форма." : "Review and manage messages from the contact form.", href: "/admin/messages" },
  ];

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <span className={styles.kicker}>{isBg ? "ОРИСИЯ · УПРАВЛЕНИЕ" : "ORISIA · MANAGEMENT"}</span>
          <div className={styles.heroRow}>
            <div>
              <h1>{isBg ? "Админ панел" : "Admin panel"}</h1>
              <p>{isBg ? "Временна начална структура за управление на съдържанието." : "Temporary starting structure for content management."}</p>
            </div>
            <Link href="/" className={styles.backButton}>{isBg ? "Към сайта" : "Back to site"}</Link>
          </div>
        </div>
      </section>

      <section className={styles.content}>
        <div className="container">
          <div className={styles.notice}>{isBg ? "DEV версия · контролите все още не са свързани с backend." : "DEV version · controls are not yet connected to the backend."}</div>
          <div className={styles.grid}>
            {cards.map((card) => (
              <article className={styles.card} key={card.title}>
                <div className={styles.cardTop}>
                  <span>{card.title}</span>
                  <strong>{card.value}</strong>
                </div>
                <p>{card.text}</p>
                <Link href={card.href}>{isBg ? "Отвори" : "Open"}</Link>
              </article>
            ))}
          </div>

          <div className={styles.workspace}>
            <div>
              <span className={styles.label}>{isBg ? "БЪРЗИ ДЕЙСТВИЯ" : "QUICK ACTIONS"}</span>
              <h2>{isBg ? "Управление на съдържанието" : "Content management"}</h2>
              <p>{isBg ? "Тук може да влязат редактор за събития, хоротека, настройки на началната страница, галерия, контактни запитвания и потребителски роли." : "This area can include an event editor, dance library, homepage settings, gallery, contact inquiries and user roles."}</p>
            </div>
            <div className={styles.actions}>
              <Link href="/admin/events">{isBg ? "Добави събитие" : "Add event"}</Link>
              <Link href="/admin/horoteka">{isBg ? "Добави хоро" : "Add dance"}</Link>
              <Link href="/admin/home">{isBg ? "Редактирай начална страница" : "Edit homepage"}</Link>
              <Link href="/admin/users">{isBg ? "Управление на потребители" : "Manage users"}</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
