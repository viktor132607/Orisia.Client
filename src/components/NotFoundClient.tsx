"use client";

import Link from "next/link";
import useLanguage, { useLocalizedPath } from "./useLanguage";

export default function NotFoundClient() {
  const language = useLanguage();
  const href = useLocalizedPath();
  const isBg = language === "bg";

  return (
    <main className="grid min-h-[70vh] place-items-center bg-orisia-cream px-6 py-16 text-orisia-brown dark:bg-orisia-dark dark:text-orisia-light">
      <section className="w-full max-w-2xl border border-orisia-line bg-orisia-paper p-8 text-center shadow-soft dark:border-[#604a39] dark:bg-orisia-panel sm:p-12">
        <span className="font-sans text-xs font-black uppercase tracking-[.24em] text-orisia-goldDark dark:text-orisia-gold">
          404
        </span>
        <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
          {isBg ? "Страницата не е намерена" : "Page not found"}
        </h1>
        <p className="mx-auto mt-4 max-w-xl font-sans text-sm leading-7 text-[#725b47] dark:text-[#bca486]">
          {isBg
            ? "Адресът може да е променен, изтрит или въведен неправилно."
            : "The address may have changed, been removed, or been entered incorrectly."}
        </p>
        <nav
          className="mt-8 flex flex-wrap justify-center gap-3"
          aria-label={isBg ? "Полезни връзки" : "Useful links"}
        >
          <Link
            href={href("/")}
            className="inline-flex min-h-11 items-center justify-center border border-orisia-goldDark bg-orisia-gold px-5 font-sans text-xs font-black uppercase tracking-wide text-white transition hover:bg-orisia-goldDark"
          >
            {isBg ? "Начало" : "Home"}
          </Link>
          <Link
            href={href("/news/")}
            className="inline-flex min-h-11 items-center justify-center border border-orisia-line px-5 font-sans text-xs font-black uppercase tracking-wide transition hover:border-orisia-goldDark"
          >
            {isBg ? "Новини" : "News"}
          </Link>
          <Link
            href={href("/contact/")}
            className="inline-flex min-h-11 items-center justify-center border border-orisia-line px-5 font-sans text-xs font-black uppercase tracking-wide transition hover:border-orisia-goldDark"
          >
            {isBg ? "Контакти" : "Contact"}
          </Link>
        </nav>
      </section>
    </main>
  );
}
