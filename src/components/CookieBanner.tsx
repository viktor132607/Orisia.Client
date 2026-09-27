"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import useLanguage, { useLocalizedPath } from "./useLanguage";

const COOKIE_KEY = "orisia-cookie-consent";

type Choice = "necessary" | "all" | "rejected";

const copy = {
  bg: {
    title: "Настройки за бисквитки",
    text: "Изберете дали да разрешите допълнително съхранение за бъдещи статистики и външно съдържание. Задължителното съхранение пази избора ви.",
    necessary: "Само задължителни",
    accept: "Приемам всички",
    reject: "Отказвам всички",
    policy: "Политика за бисквитки",
  },
  en: {
    title: "Cookie preferences",
    text: "Choose whether to allow additional storage for future analytics and external content. Essential storage remembers your choice.",
    necessary: "Essential only",
    accept: "Accept all",
    reject: "Reject all",
    policy: "Cookie policy",
  },
};

export default function CookieBanner() {
  const language = useLanguage();
  const href = useLocalizedPath();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!window.localStorage.getItem(COOKIE_KEY));
  }, []);

  const save = (choice: Choice) => {
    window.localStorage.setItem(COOKIE_KEY, choice);
    setVisible(false);
  };

  if (!visible) return null;
  const text = copy[language];

  return (
    <aside
      className="fixed inset-x-4 bottom-4 z-[10000] mx-auto max-w-3xl rounded-2xl border border-orisia-line/55 bg-white p-5 font-sans text-orisia-ink shadow-[0_14px_45px_rgba(75,46,27,.22)] sm:p-6"
      role="dialog"
      aria-live="polite"
      aria-label={text.title}
    >
      <h2 className="text-xl font-black">{text.title}</h2>
      <p className="mt-2 text-sm leading-6 text-[#6b5847]">
        {text.text}{" "}
        <Link href={href("/cookies/")} className="font-bold text-orisia-goldDark underline">
          {text.policy}
        </Link>.
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <button type="button" onClick={() => save("necessary")} className="rounded-xl border border-orisia-goldDark px-5 py-3 font-bold text-orisia-goldDark">
          {text.necessary}
        </button>
        <button type="button" onClick={() => save("all")} className="rounded-xl bg-orisia-goldDark px-5 py-3 font-bold text-white transition hover:bg-[#754725]">
          {text.accept}
        </button>
        <button type="button" onClick={() => save("rejected")} className="rounded-xl border border-orisia-goldDark px-5 py-3 font-bold text-orisia-goldDark">
          {text.reject}
        </button>
      </div>
    </aside>
  );
}
