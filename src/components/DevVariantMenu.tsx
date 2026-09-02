"use client";

import { useEffect, useState } from "react";
import styles from "./DevVariantMenu.module.css";

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

  useEffect(() => {
    setRole(readRole(window.localStorage.getItem(AUTH_KEY)));
  }, []);

  const changeVariant = (next: AuthRole) => {
    setRole(next);
    setAuthVariant(next);
  };

  const status = role === "admin" ? "Администратор" : role === "user" ? "Логнат потребител" : "Гост / излогнат";

  return (
    <div className={`${styles.shell} ${open ? styles.open : styles.closed}`}>
      <button
        type="button"
        className={styles.toggle}
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? "Скрий временното меню" : "Покажи временното меню"}
      >
        {open ? "‹" : "›"}
      </button>

      <aside className={styles.panel} aria-hidden={!open}>
        <div className={styles.header}>
          <span>DEV MENU</span>
          <strong>Вариант на сайта</strong>
        </div>

        <div className={styles.status}>
          <span>Текущо състояние</span>
          <strong>{status}</strong>
        </div>

        <div className={styles.options}>
          <button
            type="button"
            className={role === "guest" ? styles.active : ""}
            onClick={() => changeVariant("guest")}
          >
            Не съм логнат
          </button>
          <button
            type="button"
            className={role === "user" ? styles.active : ""}
            onClick={() => changeVariant("user")}
          >
            Логнат потребител
          </button>
          <button
            type="button"
            className={role === "admin" ? styles.active : ""}
            onClick={() => changeVariant("admin")}
          >
            Администратор
          </button>
        </div>

        <p>Профилът на нормален потребител е отделен от администраторския достъп.</p>
      </aside>
    </div>
  );
}
