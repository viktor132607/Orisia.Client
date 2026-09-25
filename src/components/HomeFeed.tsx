"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { api, type FeedItemResponse, type FeedType } from "../lib/api";
import useLanguage, { useLocalizedPath } from "./useLanguage";

const typeLabels: Record<FeedType, { bg: string; en: string }> = {
  report: { bg: "Отчет", en: "Report" },
  news: { bg: "Новина", en: "News" },
  photos: { bg: "Снимки", en: "Photos" },
  blog: { bg: "Блог", en: "Blog" },
  group: { bg: "Група", en: "Group update" },
  schedule: { bg: "График", en: "Schedule" },
  event: { bg: "Събитие", en: "Event" },
};

function formatDate(date: string, isBg: boolean) {
  const value = new Date(date);
  return Number.isNaN(value.getTime())
    ? date
    : new Intl.DateTimeFormat(isBg ? "bg-BG" : "en-GB", { day: "2-digit", month: "long", year: "numeric" }).format(value);
}

export default function HomeFeed() {
  const language = useLanguage();
  const isBg = language === "bg";
  const href = useLocalizedPath();
  const [items, setItems] = useState<FeedItemResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    api.feed.get("take=30")
      .then((result) => setItems(result.items))
      .catch((reason: Error) => setError(reason.message))
      .finally(() => setLoading(false));
  }, []);

  const ordered = useMemo(() => [...items].sort((a, b) => b.date.localeCompare(a.date)), [items]);
  const latest = ordered.slice(0, 3);
  const featured = ordered.filter((item) => item.featured);
  const slides = featured.length ? featured : ordered.slice(0, 3);
  const slide = slides[activeSlide];

  useEffect(() => {
    if (slides.length < 2 || typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActiveSlide((current) => (current + 1) % slides.length), 6000);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    if (activeSlide >= slides.length) setActiveSlide(0);
  }, [activeSlide, slides.length]);

  const detailPath = (item: FeedItemResponse) => href(item.type === "event" ? `/events/${item.slug}/` : `/news/${item.slug}/`);
  const badgeClass = "inline-flex min-h-6 items-center rounded-full border border-orisia-goldDark px-2.5 font-sans text-[10px] font-black uppercase tracking-wide";

  return (
    <section className="bg-orisia-cream py-12 text-orisia-brown dark:bg-orisia-dark dark:text-orisia-light" id="programa">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-12 border-b border-orisia-line pb-10 dark:border-[#574333]">
          <span className="font-sans text-[10px] font-black uppercase tracking-[.22em] text-orisia-goldDark dark:text-[#c28a48]">{isBg ? "БЪЛГАРСКИ ФОЛКЛОР · РУСЕ" : "BULGARIAN FOLKLORE · RUSE"}</span>
          <h1 className="mt-3 max-w-5xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">{isBg ? "ОРИСИЯ — народни танци и български фолклор в Русе" : "ORISIA — Bulgarian folk dances and folklore in Ruse"}</h1>
          <p className="mt-5 max-w-3xl font-sans text-base leading-7 text-[#725b47] dark:text-[#b19873]">{isBg ? "ОРИСИЯ събира хора с интерес към българските народни танци, хората и фолклорните традиции в Русе." : "ORISIA brings together people interested in Bulgarian folk dances and folklore traditions in Ruse."}</p>
          <nav className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
            {[["/about/", isBg ? "За ОРИСИЯ" : "About ORISIA"], ["/horoteka/", isBg ? "Хоротека" : "Dance library"], ["/events/", isBg ? "Събития" : "Events"], ["/contact/", isBg ? "Контакти" : "Contacts"]].map(([path, label]) => (
              <Link key={path} className="border-b border-orisia-goldDark pb-1 font-sans text-xs font-black uppercase tracking-wide text-orisia-goldDark" href={href(path)}>{label}</Link>
            ))}
          </nav>
        </header>

        {loading && <div className="border border-dashed border-orisia-line p-8 text-center font-sans text-sm">{isBg ? "Зареждане…" : "Loading…"}</div>}
        {error && <div className="border border-red-400/50 bg-red-50 p-5 font-sans text-sm text-red-800 dark:bg-red-950/30 dark:text-red-200">{isBg ? "Съдържанието не може да бъде заредено." : "Content could not be loaded."} {error}</div>}

        {!loading && !error && (
          <>
            <section className="border-b border-orisia-line pb-10 dark:border-[#574333]">
              <div className="mb-7 flex items-end justify-between gap-5">
                <h2 className="text-4xl font-bold sm:text-5xl">{isBg ? "Последни новини" : "Latest news"}</h2>
                <Link href={href("/news/")} className="border-b border-orisia-goldDark pb-1 font-sans text-xs font-bold text-orisia-goldDark">{isBg ? "Виж всички" : "View all"}</Link>
              </div>
              <div className="grid gap-7 md:grid-cols-3">
                {latest.length ? latest.map((item) => (
                  <article className="border-t border-orisia-line pt-5 dark:border-[#604a39]" key={item.id}>
                    <div className="flex justify-between gap-3 font-sans text-[10px] font-bold uppercase text-[#8c7357]"><span>{typeLabels[item.type]?.[language] ?? item.type}</span><time>{formatDate(item.date, isBg)}</time></div>
                    <h3 className="mt-4 text-xl font-bold sm:text-2xl"><Link href={detailPath(item)}>{isBg ? item.titleBg : item.titleEn || item.titleBg}</Link></h3>
                    <p className="mt-3 line-clamp-3 font-sans text-sm leading-6 text-[#725b47] dark:text-[#b19873]">{isBg ? item.bodyBg : item.bodyEn || item.bodyBg}</p>
                  </article>
                )) : <div className="md:col-span-3 border border-dashed border-orisia-line p-6 text-center font-sans text-sm">{isBg ? "Все още няма публикувано съдържание." : "There is no published content yet."}</div>}
              </div>
            </section>

            <section className="mt-14">
              <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,.55fr)]">
                <div className="grid gap-5">
                  {slide && <article className="relative min-h-[330px] overflow-hidden border border-[#6d5039] bg-orisia-ink text-orisia-light shadow-soft">
                    <div className="relative z-10 flex min-h-[330px] max-w-3xl flex-col justify-end p-7 sm:p-10">
                      <span className={`${badgeClass} self-start border-[#a5743b] text-[#e7c58f]`}>{typeLabels[slide.type]?.[language] ?? slide.type}</span>
                      <h3 className="mt-4 text-4xl font-bold sm:text-5xl"><Link href={detailPath(slide)}>{isBg ? slide.titleBg : slide.titleEn || slide.titleBg}</Link></h3>
                      <p className="mt-3 font-sans text-sm leading-6 text-[#d7c2a3]">{isBg ? slide.bodyBg : slide.bodyEn || slide.bodyBg}</p>
                      <span className="mt-5 font-sans text-xs text-[#aa9479]">{formatDate(slide.date, isBg)}</span>
                    </div>
                    {slides.length > 1 && <div className="absolute bottom-5 right-5 z-20 flex gap-2">{slides.map((item, index) => <button key={item.id} type="button" className={`h-2.5 w-2.5 rounded-full border border-[#c18c4b] ${index === activeSlide ? "bg-[#d09b57]" : "bg-transparent"}`} onClick={() => setActiveSlide(index)} aria-label={`Slide ${index + 1}`} />)}</div>}
                  </article>}

                  <div className="grid gap-4">
                    {ordered.map((item) => <article className="border border-orisia-line bg-orisia-paper p-6 dark:border-[#604a39] dark:bg-orisia-panel" key={item.id}>
                      <div className="flex items-center justify-between gap-4"><span className={`${badgeClass} text-orisia-goldDark`}>{typeLabels[item.type]?.[language] ?? item.type}</span><time className="font-sans text-[11px] text-[#8c7357]">{formatDate(item.date, isBg)}</time></div>
                      <h3 className="mt-4 text-2xl font-bold sm:text-3xl"><Link href={detailPath(item)}>{isBg ? item.titleBg : item.titleEn || item.titleBg}</Link></h3>
                      <p className="mt-3 font-sans text-sm leading-7 text-[#725b47] dark:text-[#b19873]">{isBg ? item.bodyBg : item.bodyEn || item.bodyBg}</p>
                    </article>)}
                  </div>
                </div>
                <aside className="grid gap-4 lg:sticky lg:top-24">
                  <div className="border border-orisia-line bg-orisia-paper p-6 dark:border-[#604a39] dark:bg-orisia-panel"><h3 className="text-2xl font-bold">{isBg ? "Предстоящи събития" : "Upcoming events"}</h3><Link className="mt-4 inline-block font-sans text-xs font-black uppercase text-orisia-goldDark" href={href("/calendar/")}>{isBg ? "Към календара" : "Open calendar"}</Link></div>
                  <div className="border border-orisia-line bg-orisia-paper p-6 dark:border-[#604a39] dark:bg-orisia-panel"><h3 className="text-2xl font-bold">{isBg ? "Хоротека" : "Dance library"}</h3><Link className="mt-4 inline-block font-sans text-xs font-black uppercase text-orisia-goldDark" href={href("/horoteka/")}>{isBg ? "Разгледай" : "Explore"}</Link></div>
                </aside>
              </div>
            </section>
          </>
        )}
      </div>
    </section>
  );
}
