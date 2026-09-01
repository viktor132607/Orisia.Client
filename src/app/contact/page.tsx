"use client";

import styles from "./contact.module.css";

export default function ContactPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <span className={styles.kicker}>ОРИСИЯ · КОНТАКТИ</span>
          <h1>Свържете се с нас</h1>
          <p>За участия, събития, партньорства или друг въпрос изпратете запитване чрез формата.</p>
        </div>
      </section>

      <section className={styles.content}>
        <div className={`container ${styles.layout}`}>
          <aside className={styles.intro}>
            <span className={styles.label}>КОНТАКТ</span>
            <h2>Нека поговорим</h2>
            <p>Опишете накратко какво ви интересува и оставете удобен начин за обратна връзка.</p>
            <div className={styles.introItems}>
              <div className={styles.introItem}>
                <strong>Участия и събития</strong>
                <span>Покани, програма и организация на участия.</span>
              </div>
              <div className={styles.introItem}>
                <strong>Партньорства</strong>
                <span>Идеи за съвместни инициативи и фолклорни проекти.</span>
              </div>
              <div className={styles.introItem}>
                <strong>Общи въпроси</strong>
                <span>Информация за ОРИСИЯ, дейността и предстоящите събития.</span>
              </div>
            </div>
          </aside>

          <div className={styles.formCard}>
            <span className={styles.label}>ФОРМА ЗА КОНТАКТ</span>
            <h2>Изпратете запитване</h2>
            <form onSubmit={(event) => event.preventDefault()}>
              <div className={styles.formGrid}>
                <div className={styles.field}>
                  <label htmlFor="contact-name">Име *</label>
                  <input id="contact-name" name="name" type="text" placeholder="Вашето име" required />
                </div>
                <div className={styles.field}>
                  <label htmlFor="contact-email">Имейл *</label>
                  <input id="contact-email" name="email" type="email" placeholder="Вашият имейл" required />
                </div>
                <div className={styles.field}>
                  <label htmlFor="contact-phone">Телефон *</label>
                  <input id="contact-phone" name="phone" type="tel" placeholder="Вашият телефон" required />
                </div>
                <div className={styles.field}>
                  <label htmlFor="contact-subject">Тема</label>
                  <input id="contact-subject" name="subject" type="text" placeholder="Тема на запитването" />
                </div>
                <div className={`${styles.field} ${styles.fieldFull}`}>
                  <label htmlFor="contact-message">Съобщение *</label>
                  <textarea id="contact-message" name="message" placeholder="Напишете вашето съобщение" required />
                </div>
              </div>
              <button className={styles.submit} type="submit">Изпрати запитване</button>
              <p className={styles.note}>Формата е добавена като frontend интерфейс и ще бъде свързана с изпращането на съобщения при backend интеграцията.</p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
