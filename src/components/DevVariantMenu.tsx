"use client";

import { useEffect, useState } from "react";
import styles from "./DevVariantMenu.module.css";
import useLanguage from "./useLanguage";

const AUTH_KEY = "orisia-dev-auth";
type AuthRole = "guest" | "user" | "admin";

function readRole(value: string | null): AuthRole {
  if (value === "admin") return "admin";
  if (value === "logged-in" || value === "user") return "user";
  return "guest";
}

function setAuthVariant(role: AuthRole) {
  const storageValue = role === "guest" ? "logged-out" : role;
  window.localStorage.setItem(AUTH_KEY, storageValue);
  window.dispatchEvent(new CustomEvent("orisia-auth-change", {
    detail: {
      role,
      loggedIn: role !== "guest",
      isAdmin: role === "admin",
    },
  }));
}

export default function DevVariantMenu() {
  const [open, setOpen] = useState(true);
  const [role, setRole] = useState<AuthRole>("guest");
  const language = useLanguage();
  const isBg = language === "bg";

  useEffect(() => {
    setRole(readRole(window.localStorage.getItem(AUTH_KEY)));
    if (window.matchMedia("(max-width: 760px)").matches) setOpen(false);
  }, []);

  const changeVariant = (next: AuthRole) => {
    setRole(next);
    setAuthVariant(next);
  };

  const status = role === "admin"
    ? (isBg ? "Администратор" : "Administrator")
    : role === "user"
      ? (isBg ? "Логнат потребител" : "Logged-in user")
      : (isBg ? "Гост / излогнат" : "Guest / logged out");

  return (
    <div className={`${styles.shell} ${open ? styles.open : styles.closed}`}>
      <aside className={styles.panel} aria-hidden={!open}>
        <div className={styles.header}>
          <span>DEV MENU</span>
          <strong>{isBg ? "Вариант на сайта" : "Site variant"}</strong>
        </div>

        <div className={styles.status}>
          <span>{isBg ? "Текущо състояние" : "Current state"}</span>
          <strong>{status}</strong>
        </div>

        <div className={styles.options}>
          <button type="button" className={role === "guest" ? styles.active : ""} onClick={() => changeVariant("guest")}>
            {isBg ? "Не съм логнат" : "Logged out"}
          </button>
          <button type="button" className={role === "user" ? styles.active : ""} onClick={() => changeVariant("user")}>
            {isBg ? "Логнат потребител" : "Logged-in user"}
          </button>
          <button type="button" className={role === "admin" ? styles.active : ""} onClick={() => changeVariant("admin")}>
            {isBg ? "Администратор" : "Administrator"}
          </button>
        </div>

        <p>{isBg ? "Профилът на нормален потребител е отделен от администраторския достъп." : "A regular user profile is separate from administrator access."}</p>
      </aside>

      <button
        type="button"
        className={styles.toggle}
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? (isBg ? "Скрий временното меню" : "Hide temporary menu") : (isBg ? "Покажи временното меню" : "Show temporary menu")}
      >
        {open ? "‹" : "›"}
      </button>
    </div>
  );
}
