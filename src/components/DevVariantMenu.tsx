"use client";

import { useEffect, useState } from "react";
import styles from "./DevVariantMenu.module.css";

const AUTH_KEY = "orisia-dev-auth";

function setAuthVariant(loggedIn: boolean) {
  window.localStorage.setItem(AUTH_KEY, loggedIn ? "logged-in" : "logged-out");
  window.dispatchEvent(new CustomEvent("orisia-auth-change", { detail: { loggedIn } }));
}

export default function DevVariantMenu() {
  const [open, setOpen] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(window.localStorage.getItem(AUTH_KEY) === "logged-in");
  }, []);

  const changeVariant = (next: boolean) => {
    setLoggedIn(next);
    setAuthVariant(next);
  };

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
          <strong>{loggedIn ? "Логнат потребител" : "Гост / излогнат"}</strong>
        </div>

        <div className={styles.options}>
          <button
            type="button"
            className={!loggedIn ? styles.active : ""}
            onClick={() => changeVariant(false)}
          >
            Не съм логнат
          </button>
          <button
            type="button"
            className={loggedIn ? styles.active : ""}
            onClick={() => changeVariant(true)}
          >
            Логнат съм
          </button>
        </div>

        <p>Временно меню само за визуално тестване на двата варианта.</p>
      </aside>
    </div>
  );
}
