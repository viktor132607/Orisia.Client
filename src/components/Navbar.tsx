"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const AUTH_KEY = "orisia-dev-auth";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const readVariant = () => {
      setLoggedIn(window.localStorage.getItem(AUTH_KEY) === "logged-in");
    };

    const handleVariantChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ loggedIn?: boolean }>;
      setLoggedIn(Boolean(customEvent.detail?.loggedIn));
    };

    const handleStorage = (event: StorageEvent) => {
      if (event.key === AUTH_KEY) readVariant();
    };

    readVariant();
    window.addEventListener("orisia-auth-change", handleVariantChange);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("orisia-auth-change", handleVariantChange);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const logout = () => {
    window.localStorage.setItem(AUTH_KEY, "logged-out");
    setLoggedIn(false);
    window.dispatchEvent(new CustomEvent("orisia-auth-change", { detail: { loggedIn: false } }));
  };

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link href="/" className="brand">ОРИСИЯ</Link>
        <nav className="nav-links" aria-label="Основна навигация">
          <Link href="/">Начало</Link>
          <Link href="/calendar">Календар</Link>
          <Link href="/gallery">Галерия</Link>
          <Link href="/about">За ОРИСИЯ</Link>
          <Link href="/contact">Контакти</Link>
          <Link href="/admin" className="login-link">Админ</Link>
          {loggedIn ? (
            <>
              <Link href="/account">Профил</Link>
              <Link href="/" className="login-link" onClick={logout}>Изход</Link>
            </>
          ) : (
            <Link href="/login" className="login-link">Вход</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
