"use client";

import Link from "next/link";
import useLanguage, { useLocalizedPath } from "./useLanguage";

export default function NotFoundClient() {
  const language = useLanguage();
  const href = useLocalizedPath();
  const isBg = language === "bg";

  return (
    <main className="grid min-h-[70vh] place-items-center bg-[#faf8f5] px-6 py-16 font-sans text-orisia-ink">
      <section className="w-full max-w-3xl rounded-[24px] border border-orisia-line/45 bg-white p-8 text-center shadow-[0_12px_36px_rgba(75,46,27,.08)] sm:p-12">
        <img src="/orisia-logo.jpg" alt="" className="mx-auto h-24 w-24 rounded-full border border-orisia-line object-cover opacity-80" />
        <span className="mt-6 block text-xs font-black uppercase tracking-[.24em] text-orisia-goldDark">404</span>
        <h1 className="mt-4 text-4xl font-black uppercase sm:text-5xl">{isBg ? "Страницата не е намерена" : "Page not found"}</h1>
        <p className="mx-auto mt-4 max-w-xl text-[16px] leading-8 text-[#6b5847]">{isBg ? "Адресът може да е променен, изтрит или въведен неправилно." : "The address may have changed, been removed, or been entered incorrectly."}</p>
        <nav className="mt-8 flex flex-wrap justify-center gap-3" aria-label={isBg ? "Полезни връзки" : "Useful links"}>
          <Link href={href("/")} className="rounded-xl bg-orisia-goldDark px-5 py-3 text-sm font-bold text-white transition hover:bg-[#754725]">{isBg ? "Начало" : "Home"}</Link>
          <Link href={href("/news/")} className="rounded-xl border border-orisia-line px-5 py-3 text-sm font-bold transition hover:border-orisia-goldDark hover:text-orisia-goldDark">{isBg ? "Новини" : "News"}</Link>
          <Link href={href("/contact/")} className="rounded-xl border border-orisia-line px-5 py-3 text-sm font-bold transition hover:border-orisia-goldDark hover:text-orisia-goldDark">{isBg ? "Контакти" : "Contact"}</Link>
        </nav>
      </section>
    </main>
  );
}
