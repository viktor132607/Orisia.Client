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
          <Link href="/" className={styles.logoLink} aria-label={isBg ? "ОРИСИЯ - Начало" : "ORISIA - Home"}>
            <img src="/orisia-logo-placeholder.svg" alt={isBg ? "ОРИСИЯ" : "ORISIA"} className={styles.logo} />
          </Link>
          <p className={styles.description}>
            {isBg
              ? "Български фолклор, танц, традиция и общност с характер."
              : "Bulgarian folklore, dance, tradition and community with character."}
          </p>
          <div className={styles.socials}>
            <a href="#" className={styles.facebook} aria-label="Facebook" title="Facebook">
              <span aria-hidden="true">f</span>
            </a>
          </div>
        </div>

        <div className={styles.column}>
          <strong className={styles.heading}>{isBg ? "Страници" : "Pages"}</strong>
          <nav className={styles.links} aria-label={isBg ? "Страници във футъра" : "Footer pages"}>
            <Link href="/">{isBg ? "Начало" : "Home"}</Link>
            <Link href="/about">{isBg ? "За нас" : "About us"}</Link>
            <Link href="/gallery">{isBg ? "Галерия" : "Gallery"}</Link>
            <Link href="/horoteka">{isBg ? "Хоротека" : "Dance Library"}</Link>
            <Link href="/contact">{isBg ? "Контакти" : "Contacts"}</Link>
          </nav>
        </div>

        <div className={styles.column}>
          <strong className={styles.heading}>{isBg ? "Информация" : "Information"}</strong>
          <div className={styles.links}>
            <span>{isBg ? "Политика за поверителност" : "Privacy policy"}</span>
            <span>{isBg ? "Общи условия" : "Terms and conditions"}</span>
            <span>{isBg ? "Бисквитки" : "Cookies"}</span>
          </div>
        </div>

        <div className={`${styles.column} ${styles.contactColumn}`}>
          <strong className={styles.heading}>{isBg ? "Контакти" : "Contacts"}</strong>
          <div className={styles.contactItem}>
            <span className={styles.contactIcon} aria-hidden="true">⌖</span>
            <span>{isBg ? "гр. Русе, ул. Родина 80, 7000" : "80 Rodina St., Ruse, Bulgaria, 7000"}</span>
          </div>
          <Link href="/contact" className={styles.contactItem}>
            <span className={styles.contactIcon} aria-hidden="true">✉</span>
            <span>{isBg ? "Изпрати запитване" : "Send an inquiry"}</span>
          </Link>
        </div>
      </div>

      <div className={`container ${styles.divider}`} />

      <div className={`container ${styles.bottomInner}`}>
        <span>{isBg ? "© 2026 ОРИСИЯ. Всички права запазени." : "© 2026 ORISIA. All rights reserved."}</span>
        <span className={styles.creator}>
          Site created by{" "}
          <a href="https://viktor-iliev.site/portfolio/" target="_blank" rel="noreferrer">
            <strong>Viktor Iliev</strong>
          </a>
        </span>
      </div>
    </footer>
  );
}
