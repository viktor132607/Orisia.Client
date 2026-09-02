"use client";

import styles from "./contact.module.css";
import useLanguage from "../../components/useLanguage";

export default function ContactPage() {
  const language = useLanguage();
  const isBg = language === "bg";

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <span className={styles.kicker}>{isBg ? "ОРИСИЯ · КОНТАКТИ" : "ORISIA · CONTACTS"}</span>
          <h1>{isBg ? "Свържете се с нас" : "Contact us"}</h1>
          <p>{isBg ? "За участия, събития, партньорства или друг въпрос изпратете запитване чрез формата." : "For performances, events, partnerships or any other question, send us an inquiry through the form."}</p>
        </div>
      </section>

      <section className={styles.content}>
        <div className={`container ${styles.layout}`}>
          <aside className={styles.intro}>
            <span className={styles.label}>{isBg ? "КОНТАКТ" : "CONTACT"}</span>
            <h2>{isBg ? "Нека поговорим" : "Let's talk"}</h2>
            <p>{isBg ? "Опишете накратко какво ви интересува и оставете удобен начин за обратна връзка." : "Briefly tell us what you are interested in and leave a convenient way for us to get back to you."}</p>
            <div className={styles.introItems}>
              <div className={styles.introItem}>
                <strong>{isBg ? "Адрес" : "Address"}</strong>
                <span>{isBg ? "гр. Русе, ул. Родина 80 (на гърба на боулинг залата), Русе, България, 7000" : "80 Rodina St. (behind the bowling hall), Ruse, Bulgaria, 7000"}</span>
              </div>
              <div className={styles.introItem}>
                <strong>{isBg ? "Участия и събития" : "Performances and events"}</strong>
                <span>{isBg ? "Покани, програма и организация на участия." : "Invitations, schedules and event organization."}</span>
              </div>
              <div className={styles.introItem}>
                <strong>{isBg ? "Партньорства" : "Partnerships"}</strong>
                <span>{isBg ? "Идеи за съвместни инициативи и фолклорни проекти." : "Ideas for joint initiatives and folklore projects."}</span>
              </div>
              <div className={styles.introItem}>
                <strong>{isBg ? "Общи въпроси" : "General questions"}</strong>
                <span>{isBg ? "Информация за ОРИСИЯ, дейността и предстоящите събития." : "Information about ORISIA, our activities and upcoming events."}</span>
              </div>
            </div>
          </aside>

          <div className={styles.formCard}>
            <span className={styles.label}>{isBg ? "ФОРМА ЗА КОНТАКТ" : "CONTACT FORM"}</span>
            <h2>{isBg ? "Изпратете запитване" : "Send an inquiry"}</h2>
            <form onSubmit={(event) => event.preventDefault()}>
              <div className={styles.formGrid}>
                <div className={styles.field}>
                  <label htmlFor="contact-name">{isBg ? "Име *" : "Name *"}</label>
                  <input id="contact-name" name="name" type="text" placeholder={isBg ? "Вашето име" : "Your name"} required />
                </div>
                <div className={styles.field}>
                  <label htmlFor="contact-email">{isBg ? "Имейл *" : "Email *"}</label>
                  <input id="contact-email" name="email" type="email" placeholder={isBg ? "Вашият имейл" : "Your email"} required />
                </div>
                <div className={styles.field}>
                  <label htmlFor="contact-phone">{isBg ? "Телефон *" : "Phone *"}</label>
                  <input id="contact-phone" name="phone" type="tel" placeholder={isBg ? "Вашият телефон" : "Your phone"} required />
                </div>
                <div className={styles.field}>
                  <label htmlFor="contact-subject">{isBg ? "Тема" : "Subject"}</label>
                  <input id="contact-subject" name="subject" type="text" placeholder={isBg ? "Тема на запитването" : "Inquiry subject"} />
                </div>
                <div className={`${styles.field} ${styles.fieldFull}`}>
                  <label htmlFor="contact-message">{isBg ? "Съобщение *" : "Message *"}</label>
                  <textarea id="contact-message" name="message" placeholder={isBg ? "Напишете вашето съобщение" : "Write your message"} required />
                </div>
              </div>
              <button className={styles.submit} type="submit">{isBg ? "Изпрати запитване" : "Send inquiry"}</button>
              <p className={styles.note}>{isBg ? "Формата е добавена като frontend интерфейс и ще бъде свързана с изпращането на съобщения при backend интеграцията." : "The form currently works as a frontend interface and will be connected to message delivery during backend integration."}</p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
