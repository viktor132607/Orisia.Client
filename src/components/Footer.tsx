import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.main}`}>
        <div className={styles.brandBlock}>
          <Link href="/" className={styles.brand}>ОРИСИЯ</Link>
          <p className={styles.description}>Български фолклор – танц, традиция и събития с характер.</p>
        </div>

        <div>
          <span className={styles.heading}>Навигация</span>
          <nav className={styles.links} aria-label="Навигация във футъра">
            <Link href="/">Начало</Link>
            <Link href="/calendar">Календар</Link>
            <Link href="/about">За ОРИСИЯ</Link>
            <Link href="/contact">Контакти</Link>
          </nav>
        </div>

        <div>
          <span className={styles.heading}>Контакти</span>
          <p className={styles.contactText}>За участия, партньорства и въпроси използвайте контактната форма.</p>
          <Link href="/contact" className={styles.contactLink}>Изпрати запитване</Link>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={`container ${styles.bottomInner}`}>
          <span>© 2026 ОРИСИЯ. Всички права запазени.</span>
          <span className={styles.creator}>Site created by <strong>Viktor Iliev</strong></span>
        </div>
      </div>
    </footer>
  );
}
