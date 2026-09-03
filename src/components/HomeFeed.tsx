"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import useLanguage from "./useLanguage";
import { FEED_EVENT, FeedPost, FeedType, readFeedPosts } from "./homeFeedStore";

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
  const value = new Date(`${date}T12:00:00`);
  if (Number.isNaN(value.getTime())) return date;
  return new Intl.DateTimeFormat(isBg ? "bg-BG" : "en-GB", { day: "2-digit", month: "long", year: "numeric" }).format(value);
}

export default function HomeFeed() {
  const language = useLanguage();
  const isBg = language === "bg";
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const load = () => setPosts(readFeedPosts());
    const handleChange = (event: Event) => {
      const detail = (event as CustomEvent<{ posts?: FeedPost[] }>).detail;
      setPosts(detail?.posts ?? readFeedPosts());
    };
    load();
    window.addEventListener(FEED_EVENT, handleChange);
    window.addEventListener("storage", load);
    return () => {
      window.removeEventListener(FEED_EVENT, handleChange);
      window.removeEventListener("storage", load);
    };
  }, []);

  const orderedPosts = useMemo(() => [...posts].sort((a, b) => b.date.localeCompare(a.date)), [posts]);
  const latestPosts = useMemo(() => orderedPosts.slice(0, 3), [orderedPosts]);
  const featured = useMemo(() => orderedPosts.filter((post) => post.featured), [orderedPosts]);
  const slides = featured.length ? featured : orderedPosts.slice(0, 3);

  useEffect(() => {
    if (slides.length < 2) return;
    const timer = window.setInterval(() => setActiveSlide((current) => (current + 1) % slides.length), 6000);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    if (activeSlide >= slides.length) setActiveSlide(0);
  }, [activeSlide, slides.length]);

  const slide = slides[activeSlide];
  const badgeClass = "inline-flex min-h-6 items-center rounded-full border border-orisia-goldDark px-2.5 font-sans text-[10px] font-black uppercase tracking-wide";

  return (
    <section className="bg-orisia-cream py-12 text-orisia-brown dark:bg-orisia-dark dark:text-orisia-light" id="programa">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="border-b border-orisia-line pb-10 dark:border-[#574333]" aria-labelledby="latest-news-title">
          <div className="mb-7 flex items-end justify-between gap-5">
            <div>
              <span className="font-sans text-[10px] font-black uppercase tracking-[.22em] text-orisia-goldDark dark:text-[#c28a48]">{isBg ? "ОРИСИЯ" : "ORISIA"}</span>
              <h2 id="latest-news-title" className="mt-2 text-4xl font-bold sm:text-5xl">{isBg ? "Последни новини" : "Latest news"}</h2>
            </div>
            <a href="#orisia-feed-all" className="border-b border-orisia-goldDark pb-1 font-sans text-xs font-bold text-orisia-goldDark hover:text-orisia-brown dark:text-[#d3a969] dark:hover:text-white">{isBg ? "Виж всички" : "View all"}</a>
          </div>
          <div className="grid gap-7 md:grid-cols-3">
            {latestPosts.length ? latestPosts.map((post) => (
              <article className="border-t border-orisia-line pt-5 dark:border-[#604a39]" key={`latest-${post.id}`}>
                <div className="flex items-center justify-between gap-3 font-sans text-[10px] font-bold uppercase tracking-wide text-[#8c7357] dark:text-[#9d856b]">
                  <span>{typeLabels[post.type][language]}</span>
                  <time dateTime={post.date}>{formatDate(post.date, isBg)}</time>
                </div>
                <h3 className="mt-4 text-xl font-bold leading-snug sm:text-2xl">{isBg ? post.titleBg : post.titleEn || post.titleBg}</h3>
                <p className="mt-3 line-clamp-3 font-sans text-sm leading-6 text-[#725b47] dark:text-[#b19873]">{isBg ? post.bodyBg : post.bodyEn || post.bodyBg}</p>
              </article>
            )) : <div className="md:col-span-3 border border-dashed border-orisia-line p-6 text-center font-sans text-sm text-[#806a55] dark:border-[#604a39] dark:text-[#a58d71]">{isBg ? "Все още няма публикувани новини." : "There are no published updates yet."}</div>}
          </div>
        </section>

        <div className="mt-14 mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between" id="orisia-feed-all">
          <div>
            <span className="font-sans text-[10px] font-black uppercase tracking-[.22em] text-orisia-goldDark dark:text-[#c28a48]">{isBg ? "ОРИСИЯ · FEED" : "ORISIA · FEED"}</span>
            <h2 className="mt-2 text-4xl font-bold sm:text-5xl">{isBg ? "Какво се случва" : "What is happening"}</h2>
          </div>
          <p className="max-w-xl font-sans text-sm leading-6 text-[#725b47] dark:text-[#a98c69]">{isBg ? "Събития, новини, отчети, снимки, графици, блогове и важни ъпдейти от живота на ОРИСИЯ." : "Events, news, reports, photos, schedules, blog posts and important updates from ORISIA."}</p>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,.55fr)]">
          <div className="grid gap-5">
            {slide && (
              <article className="relative min-h-[360px] overflow-hidden border border-[#6d5039] bg-orisia-ink text-orisia-light shadow-soft">
                {slide.image && <img className="absolute inset-0 h-full w-full object-cover opacity-45" src={slide.image} alt="" />}
                <div className="absolute inset-0 bg-black/55" />
                <div className="relative z-10 flex min-h-[360px] max-w-3xl flex-col justify-end p-7 sm:p-10">
                  <span className={`${badgeClass} self-start border-[#a5743b] bg-black/25 text-[#e7c58f]`}>{typeLabels[slide.type][language]}</span>
                  <h3 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">{isBg ? slide.titleBg : slide.titleEn || slide.titleBg}</h3>
                  <p className="mt-3 max-w-2xl font-sans text-sm leading-6 text-[#d7c2a3] sm:text-base">{isBg ? slide.bodyBg : slide.bodyEn || slide.bodyBg}</p>
                  <span className="mt-5 font-sans text-xs text-[#aa9479]">{formatDate(slide.date, isBg)}</span>
                </div>
                {slides.length > 1 && <div className="absolute bottom-5 right-5 z-20 flex gap-2" aria-label={isBg ? "Слайдове" : "Slides"}>{slides.map((item, index) => <button key={item.id} type="button" className={`h-2.5 w-2.5 rounded-full border border-[#c18c4b] ${index === activeSlide ? "bg-[#d09b57]" : "bg-transparent"}`} onClick={() => setActiveSlide(index)} aria-label={`${isBg ? "Слайд" : "Slide"} ${index + 1}`} />)}</div>}
              </article>
            )}

            <div className="grid gap-4">
              {orderedPosts.length ? orderedPosts.map((post) => (
                <article className="overflow-hidden border border-orisia-line bg-orisia-paper shadow-sm dark:border-[#604a39] dark:bg-orisia-panel" key={post.id}>
                  {post.image && <img className="max-h-[430px] w-full object-cover" src={post.image} alt={isBg ? post.titleBg : post.titleEn || post.titleBg} />}
                  <div className="p-6">
                    <div className="flex items-center justify-between gap-4">
                      <span className={`${badgeClass} border-orisia-goldDark text-orisia-goldDark dark:text-[#e7c58f]`}>{typeLabels[post.type][language]}</span>
                      <time className="font-sans text-[11px] text-[#8c7357] dark:text-[#9b846d]" dateTime={post.date}>{formatDate(post.date, isBg)}</time>
                    </div>
                    <h3 className="mt-4 text-2xl font-bold sm:text-3xl">{isBg ? post.titleBg : post.titleEn || post.titleBg}</h3>
                    <p className="mt-3 font-sans text-sm leading-7 text-[#725b47] dark:text-[#b19873]">{isBg ? post.bodyBg : post.bodyEn || post.bodyBg}</p>
                  </div>
                </article>
              )) : <div className="border border-dashed border-orisia-line p-8 text-center font-sans text-sm text-[#806a55] dark:border-[#604a39] dark:text-[#a58d71]">{isBg ? "Все още няма публикации." : "There are no posts yet."}</div>}
            </div>
          </div>

          <aside className="grid gap-4 lg:sticky lg:top-24">
            <div className="border border-orisia-line bg-orisia-paper p-6 dark:border-[#604a39] dark:bg-orisia-panel">
              <h3 className="text-2xl font-bold">{isBg ? "Предстоящи събития" : "Upcoming events"}</h3>
              <p className="mt-3 font-sans text-sm leading-6 text-[#725b47] dark:text-[#9e8463]">{isBg ? "Виж участията, репетициите и специалните дати на ОРИСИЯ." : "See ORISIA performances, rehearsals and special dates."}</p>
              <Link className="mt-4 inline-block font-sans text-xs font-black uppercase tracking-wide text-orisia-goldDark dark:text-[#d3a969]" href="/calendar">{isBg ? "Към календара" : "Open calendar"}</Link>
            </div>
            <div className="border border-orisia-line bg-orisia-paper p-6 dark:border-[#604a39] dark:bg-orisia-panel">
              <h3 className="text-2xl font-bold">{isBg ? "Хоротека" : "Dance library"}</h3>
              <p className="mt-3 font-sans text-sm leading-6 text-[#725b47] dark:text-[#9e8463]">{isBg ? "Кратки клипове и информация за български хора и ритми." : "Short clips and information about Bulgarian dances and rhythms."}</p>
              <Link className="mt-4 inline-block font-sans text-xs font-black uppercase tracking-wide text-orisia-goldDark dark:text-[#d3a969]" href="/horoteka">{isBg ? "Разгледай" : "Explore"}</Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
