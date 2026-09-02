"use client";

import { useEffect, useState } from "react";

const THEME_KEY = "orisia-theme";
const LANGUAGE_KEY = "orisia-language";

type Theme = "dark" | "light";
type Language = "bg" | "en";

export default function SitePreferences() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [language, setLanguage] = useState<Language>("bg");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(THEME_KEY) === "light" ? "light" : "dark";
    const savedLanguage = window.localStorage.getItem(LANGUAGE_KEY) === "en" ? "en" : "bg";
    setTheme(savedTheme);
    setLanguage(savedLanguage);
    document.documentElement.dataset.theme = savedTheme;
    document.documentElement.lang = savedLanguage;
  }, []);

  const changeTheme = (nextTheme: Theme) => {
    setTheme(nextTheme);
    window.localStorage.setItem(THEME_KEY, nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.dispatchEvent(new CustomEvent("orisia-theme-change", { detail: { theme: nextTheme } }));
  };

  const changeLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    window.localStorage.setItem(LANGUAGE_KEY, nextLanguage);
    document.documentElement.lang = nextLanguage;
    window.dispatchEvent(new CustomEvent("orisia-language-change", { detail: { language: nextLanguage } }));
  };

  return (
    <div className="site-preferences" aria-label="Настройки на сайта">
      <div className="preference-group" aria-label="Тема">
        <button type="button" className={theme === "dark" ? "preference-btn active" : "preference-btn"} onClick={() => changeTheme("dark")} aria-pressed={theme === "dark"}>Тъмна</button>
        <button type="button" className={theme === "light" ? "preference-btn active" : "preference-btn"} onClick={() => changeTheme("light")} aria-pressed={theme === "light"}>Светла</button>
      </div>
      <div className="preference-group" aria-label="Език">
        <button type="button" className={language === "bg" ? "preference-btn active" : "preference-btn"} onClick={() => changeLanguage("bg")} aria-pressed={language === "bg"}>BG</button>
        <button type="button" className={language === "en" ? "preference-btn active" : "preference-btn"} onClick={() => changeLanguage("en")} aria-pressed={language === "en"}>EN</button>
      </div>
    </div>
  );
}
