"use client";

import Link from "next/link";
import styles from "./Footer.module.css";
import useLanguage from "./useLanguage";

export default function Footer() {
  const language = useLanguage();
  const isBg = language === "bg";

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.main}`}>
        <div className={styles.brandBlock}>
          <Link href="/" className={styles.brand}>ОРИСИЯ</Link>
          <p className={styles.description}>{isBg ? "Български фолклор – танц, традиция и събития с характер." : "Bulgarian folklore – dance, tradition and events with character."}</p>
        </div>

        <div>
          <span className={styles.heading}>{isBg ? "Навигация" : "Navigation"}</span>
          <nav className={styles.links} aria-label={isBg ? "Навигация във футъра" : "Footer navigation"}>
            <Link href="/">{isBg ? "Начало" : "Home"}</Link>
            <Link href="/calendar">{isBg ? "Календар" : "Calendar"}</Link>
            <Link href="/gallery">{isBg ? "Галерия" : "Gallery"}</Link>
            <Link href="/about">{isBg ? "За ОРИСИЯ" : "About ORISIA"}</Link>
            <Link href="/contact">{isBg ? "Контакти" : "Contacts"}</Link>
          </nav>
        </div>

        <div>
          <span className={styles.heading}>{isBg ? "Контакти" : "Contacts"}</span>
          <p className={styles.contactText}>{isBg ? "гр. Русе, ул. Родина 80 (на гърба на боулинг залата), Русе, България, 7000" : "80 Rodina St. (behind the bowling hall), Ruse, Bulgaria, 7000"}</p>
          <Link href="/contact" className={styles.contactLink}>{isBg ? "Изпрати запитване" : "Send an inquiry"}</Link>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={`container ${styles.bottomInner}`}>
          <span>{isBg ? "© 2026 ОРИСИЯ. Всички права запазени." : "© 2026 ORISIA. All rights reserved."}</span>
          <span className={styles.creator}>
            Site created by <a href="https://viktor-iliev.site/portfolio/" target="_blank" rel="noreferrer"><strong>Viktor Iliev</strong></a>
          </span>
        </div>
      </div>
    </footer>
  );
}
