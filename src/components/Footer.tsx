import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span>© 2026 ОРИСИЯ</span>
        <div className="footer-links">
          <Link href="/about">За ОРИСИЯ</Link>
          <Link href="/contact">Контакти</Link>
        </div>
      </div>
    </footer>
  );
}
