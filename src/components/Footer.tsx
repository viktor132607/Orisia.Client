"use client";

import Link from "next/link";
import useLanguage, { useLocalizedPath } from "./useLanguage";

export default function Footer() {
  const isBg = useLanguage() === "bg";
  const href = useLocalizedPath();

  const t = isBg ? {
    pages: "Страници", info: "Информация", contact: "Контакти", home: "Начало", news: "Новини",
    events: "Събития", calendar: "Календар", groups: "Групи", gallery: "Галерия", horoteka: "Хоротека",
    about: "За нас", privacy: "Политика за поверителност", terms: "Общи условия", cookies: "Бисквитки",
    rights: "Всички права запазени.", created: "Сайтът е създаден от", message: "Изпрати запитване",
  } : {
    pages: "Pages", info: "Information", contact: "Contact", home: "Home", news: "News",
    events: "Events", calendar: "Calendar", groups: "Groups", gallery: "Gallery", horoteka: "Dance library",
    about: "About us", privacy: "Privacy policy", terms: "Terms and conditions", cookies: "Cookies",
    rights: "All rights reserved.", created: "Site created by", message: "Send an inquiry",
  };

  return (
    <footer className="bg-orisia-ink pb-5 font-sans text-white">
      <div className="h-[5px] bg-[linear-gradient(90deg,#8e5b32_0_33.333%,#c5894d_33.333%_66.666%,#f3e9df_66.666%_100%)]" aria-hidden="true" />
      <div className="mx-auto grid w-[min(1180px,calc(100%_-_40px))] grid-cols-[1.2fr_1fr_1fr] gap-10 pt-9 max-[800px]:gap-6 max-[700px]:grid-cols-2 max-[620px]:w-[min(1180px,calc(100%_-_32px))] max-[620px]:grid-cols-1 max-[620px]:gap-8">
        <div className="max-[700px]:col-span-2 max-[620px]:col-span-1">
          <Link href={href("/")} className="inline-flex items-center gap-3.5" aria-label={isBg ? "ОРИСИЯ — начало" : "ORISIA — home"}>
            <img src="/orisia-logo.jpg" alt="" width={62} height={62} className="h-[62px] w-[62px] shrink-0 rounded-full border-2 border-orisia-line bg-white object-cover max-[620px]:h-[50px] max-[620px]:w-[50px]" />
            <span className="flex flex-col font-serif text-[20px] font-bold uppercase leading-[1.05] tracking-[.06em] text-orisia-light max-[620px]:text-[15px]">
              <span>ОРИСИЯ</span>
              <span className="text-[11px] tracking-[.1em] text-[#d8c1aa]">{isBg ? "Даскало за фолклор" : "Folklore school"}</span>
            </span>
          </Link>
          <a href="https://www.facebook.com/orisiyaruse" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="mt-4 flex h-9 w-9 items-center justify-center rounded-full bg-white text-orisia-ink transition-colors hover:bg-[#e8c79f]">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.51 1.5-3.9 3.77-3.9 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.33v6.99A10 10 0 0 0 22 12Z" /></svg>
          </a>
        </div>

        <nav aria-label={t.pages}>
          <div className="mb-4 text-[11px] font-extrabold uppercase tracking-[.14em] text-[#a99d95]">{t.pages}</div>
          <div className="grid grid-cols-2 gap-x-5 gap-y-2.5 text-sm text-[#efe9e5]">
            <Link className="hover:text-white" href={href("/")}>{t.home}</Link>
            <Link className="hover:text-white" href={href("/news/")}>{t.news}</Link>
            <Link className="hover:text-white" href={href("/events/")}>{t.events}</Link>
            <Link className="hover:text-white" href={href("/calendar/")}>{t.calendar}</Link>
            <Link className="hover:text-white" href={href("/groups/")}>{t.groups}</Link>
            <Link className="hover:text-white" href={href("/gallery/")}>{t.gallery}</Link>
            <Link className="hover:text-white" href={href("/horoteka/")}>{t.horoteka}</Link>
            <Link className="hover:text-white" href={href("/about/")}>{t.about}</Link>
          </div>
        </nav>

        <div>
          <nav aria-label={t.info}>
            <div className="mb-4 text-[11px] font-extrabold uppercase tracking-[.14em] text-[#a99d95]">{t.info}</div>
            <div className="grid gap-2.5 text-sm text-[#efe9e5]">
              <Link className="hover:text-white" href={href("/privacy/")}>{t.privacy}</Link>
              <Link className="hover:text-white" href={href("/terms/")}>{t.terms}</Link>
              <Link className="hover:text-white" href={href("/cookies/")}>{t.cookies}</Link>
            </div>
          </nav>
          <div className="mt-5">
            <Link href={href("/contact/")} className="mb-3 inline-block text-[11px] font-extrabold uppercase tracking-[.14em] text-[#a99d95] hover:text-white">{t.contact}</Link>
            <address className="grid gap-2 text-sm not-italic leading-6 text-[#efe9e5]">
              <span>{isBg ? "гр. Русе, бул. Родина 80" : "80 Rodina Blvd., Ruse"}</span>
              <Link href={href("/contact/")} className="hover:text-white">{t.message}</Link>
            </address>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 flex w-[min(1180px,calc(100%_-_40px))] flex-col gap-2 border-t border-[#463a33] pt-4 text-xs text-[#a99d95] sm:flex-row sm:items-center sm:justify-between max-[620px]:w-[min(1180px,calc(100%_-_32px))]">
        <span>© {new Date().getFullYear()} ОРИСИЯ. {t.rights}</span>
        <span>{t.created} <a href="https://viktor-iliev.site/portfolio/" target="_blank" rel="noreferrer" className="font-bold text-[#efe9e5] hover:text-white hover:underline">Viktor Iliev</a></span>
      </div>
    </footer>
  );
}
