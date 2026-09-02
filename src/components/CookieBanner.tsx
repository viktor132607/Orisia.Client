"use client";

import { useEffect, useState } from "react";

const COOKIE_KEY = "orisia-cookie-consent";
const LANGUAGE_KEY = "orisia-language";

type Language = "bg" | "en";

const copy = {
  bg: {
    title: "Бисквитки",
    text: "Използваме задължителни бисквитки за основната работа на сайта и, при съгласие, допълнителни бисквитки за бъдещи статистики и подобрения.",
    necessary: "Само задължителни",
    accept: "Приемам всички",
  },
  en: {
    title: "Cookies",
    text: "We use necessary cookies for the core operation of the site and, with your consent, additional cookies for future analytics and improvements.",
    necessary: "Necessary only",
    accept: "Accept all",
  },
};

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [language, setLanguage] = useState<Language>("bg");

  useEffect(() => {
    setVisible(!window.localStorage.getItem(COOKIE_KEY));
    setLanguage(window.localStorage.getItem(LANGUAGE_KEY) === "en" ? "en" : "bg");

    const handleLanguage = (event: Event) => {
      const detail = (event as CustomEvent<{ language?: Language }>).detail;
      if (detail?.language) setLanguage(detail.language);
    };

    window.addEventListener("orisia-language-change", handleLanguage);
    return () => window.removeEventListener("orisia-language-change", handleLanguage);
  }, []);

  const saveConsent = (value: "necessary" | "all") => {
    window.localStorage.setItem(COOKIE_KEY, value);
    setVisible(false);
  };

  if (!visible) return null;

  const text = copy[language];

  return (
    <aside className="cookie-banner" role="dialog" aria-live="polite" aria-label={text.title}>
      <div className="cookie-copy">
        <strong>{text.title}</strong>
        <p>{text.text}</p>
      </div>
      <div className="cookie-actions">
        <button type="button" className="cookie-secondary" onClick={() => saveConsent("necessary")}>{text.necessary}</button>
        <button type="button" className="cookie-primary" onClick={() => saveConsent("all")}>{text.accept}</button>
      </div>
    </aside>
  );
}
