"use client";

import { useEffect, useState } from "react";

const THEME_KEY = "orisia-theme";
const LANGUAGE_KEY = "orisia-language";

type Theme = "dark" | "light";
type Language = "bg" | "en";

function applyLanguage(language: Language) {
  document.documentElement.lang = language;
  document.title = language === "bg" ? "ОРИСИЯ" : "ORISIA";
  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.setAttribute(
      "content",
      language === "bg"
        ? "ОРИСИЯ — български фолклор, танц и традиция"
        : "ORISIA — Bulgarian folklore, dance and tradition"
    );
  }
}

export default function SitePreferences() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [language, setLanguage] = useState<Language>("bg");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(THEME_KEY) === "light" ? "light" : "dark";
    const savedLanguage = window.localStorage.getItem(LANGUAGE_KEY) === "en" ? "en" : "bg";
    setTheme(savedTheme);
    setLanguage(savedLanguage);
    document.documentElement.dataset.theme = savedTheme;
    applyLanguage(savedLanguage);
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    window.localStorage.setItem(THEME_KEY, nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.dispatchEvent(new CustomEvent("orisia-theme-change", { detail: { theme: nextTheme } }));
  };

  const toggleLanguage = () => {
    const nextLanguage: Language = language === "bg" ? "en" : "bg";
    setLanguage(nextLanguage);
    window.localStorage.setItem(LANGUAGE_KEY, nextLanguage);
    applyLanguage(nextLanguage);
    window.dispatchEvent(new CustomEvent("orisia-language-change", { detail: { language: nextLanguage } }));
  };

  const isBg = language === "bg";
  const isLight = theme === "light";
  const isEnglish = language === "en";

  return (
    <div className="site-preferences" aria-label={isBg ? "Настройки на сайта" : "Site settings"}>
      <button
        type="button"
        className={`preference-switch ${isLight ? "is-right" : ""}`}
        onClick={toggleTheme}
        aria-label={isBg ? "Смени тъмна и светла тема" : "Toggle dark and light theme"}
        aria-pressed={isLight}
      >
        <span className="preference-switch-label">{isBg ? "Тъмна" : "Dark"}</span>
        <span className="preference-switch-label">{isBg ? "Светла" : "Light"}</span>
        <span className="preference-switch-thumb" aria-hidden="true" />
      </button>

      <button
        type="button"
        className={`preference-switch preference-switch-language ${isEnglish ? "is-right" : ""}`}
        onClick={toggleLanguage}
        aria-label={isBg ? "Смени езика между български и английски" : "Toggle Bulgarian and English"}
        aria-pressed={isEnglish}
      >
        <span className="preference-switch-label">BG</span>
        <span className="preference-switch-label">EN</span>
        <span className="preference-switch-thumb" aria-hidden="true" />
      </button>
    </div>
  );
}
