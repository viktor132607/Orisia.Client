import Link from "next/link";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link href="/" className="brand">ОРИСИЯ</Link>
        <nav className="nav-links" aria-label="Основна навигация">
          <Link href="/">Начало</Link>
          <Link href="/calendar">Календар</Link>
          <Link href="/shop">Магазин</Link>
          <Link href="/about">За ОРИСИЯ</Link>
          <Link href="/contact">Контакти</Link>
          <Link href="/login" className="login-link">Вход</Link>
        </nav>
      </div>
    </header>
  );
}
