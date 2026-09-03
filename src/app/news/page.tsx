"use client";

import { useEffect, useMemo, useState } from "react";
import useLanguage from "../../components/useLanguage";
import { FEED_EVENT, FeedPost, FeedType, readFeedPosts } from "../../components/homeFeedStore";

const newsTypes: FeedType[] = ["news", "report", "photos", "blog", "group", "schedule"];

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
  return new Intl.DateTimeFormat(isBg ? "bg-BG" : "en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(value);
}

export default function NewsPage() {
  const language = useLanguage();
  const isBg = language === "bg";
  const [posts, setPosts] = useState<FeedPost[]>([]);

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

  const news = useMemo(
    () => posts.filter((post) => newsTypes.includes(post.type)).sort((a, b) => b.date.localeCompare(a.date)),
    [posts]
  );

  return (
    <main className="min-h-[70vh] bg-orisia-cream py-16 dark:bg-orisia-dark">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <header className="border-b border-[#ceb28b] pb-8 dark:border-[#5d4129]">
          <span className="font-sans text-xs font-black uppercase tracking-[.2em] text-orisia-goldDark dark:text-orisia-gold">
            {isBg ? "ОРИСИЯ · НОВИНИ" : "ORISIA · NEWS"}
          </span>
          <h1 className="mt-3 text-4xl font-bold text-[#4b2e1b] sm:text-5xl dark:text-orisia-light">{isBg ? "Новини" : "News"}</h1>
          <p className="mt-3 max-w-2xl font-sans text-sm leading-7 text-[#705841] dark:text-[#bca486]">
            {isBg ? "Новини, отчети, снимки, блог публикации, групови ъпдейти и промени в графика." : "News, reports, photos, blog posts, group updates and schedule changes."}
          </p>
        </header>

        <section className="py-10">
          {news.length ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {news.map((post) => (
                <article key={post.id} className="flex min-h-full flex-col overflow-hidden rounded border border-[#d5c0a1] bg-[#fffaf2] dark:border-[#5a4029] dark:bg-[#1d110b]">
                  {post.image && (
                    <img
                      src={post.image}
                      alt={isBg ? post.titleBg : post.titleEn || post.titleBg}
                      className="h-48 w-full object-cover"
                    />
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center justify-between gap-3 font-sans text-[11px] font-black uppercase tracking-[.1em] text-orisia-goldDark dark:text-orisia-gold">
                      <span>{typeLabels[post.type][language]}</span>
                      <time className="text-right" dateTime={post.date}>{formatDate(post.date, isBg)}</time>
                    </div>
                    <h2 className="mt-4 text-2xl font-bold text-[#4b2e1b] dark:text-orisia-light">
                      {isBg ? post.titleBg : post.titleEn || post.titleBg}
                    </h2>
                    <p className="mt-3 line-clamp-5 font-sans text-sm leading-7 text-[#6e5540] dark:text-[#bca486]">
                      {isBg ? post.bodyBg : post.bodyEn || post.bodyBg}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded border border-dashed border-[#c9ad88] p-8 font-sans text-sm text-[#705841] dark:border-[#5d4129] dark:text-[#bca486]">
              {isBg ? "Все още няма публикувани новини." : "There are no published news items yet."}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
