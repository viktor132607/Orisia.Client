"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import useLanguage from "../../components/useLanguage";
import { FEED_EVENT, FeedPost, readFeedPosts } from "../../components/homeFeedStore";

function formatDate(date: string, isBg: boolean) {
  const value = new Date(`${date}T12:00:00`);
  if (Number.isNaN(value.getTime())) return date;
  return new Intl.DateTimeFormat(isBg ? "bg-BG" : "en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(value);
}

export default function EventsPage() {
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

  const today = new Date().toISOString().slice(0, 10);
  const events = useMemo(() => posts.filter((post) => post.type === "event"), [posts]);
  const upcoming = useMemo(() => events.filter((post) => post.date >= today).sort((a, b) => a.date.localeCompare(b.date)), [events, today]);
  const past = useMemo(() => events.filter((post) => post.date < today).sort((a, b) => b.date.localeCompare(a.date)), [events, today]);

  const renderEvent = (post: FeedPost) => (
    <article key={post.id} className="overflow-hidden rounded border border-[#d5c0a1] bg-[#fffaf2] dark:border-[#5a4029] dark:bg-[#1d110b]">
      {post.image && (
        <img
          src={post.image}
          alt={isBg ? post.titleBg : post.titleEn || post.titleBg}
          className="h-56 w-full object-cover"
        />
      )}
      <div className="p-6">
        <time className="font-sans text-xs font-black uppercase tracking-[.12em] text-orisia-goldDark dark:text-orisia-gold" dateTime={post.date}>
          {formatDate(post.date, isBg)}
        </time>
        <h2 className="mt-2 text-2xl font-bold text-[#4b2e1b] dark:text-orisia-light">
          {isBg ? post.titleBg : post.titleEn || post.titleBg}
        </h2>
        <p className="mt-3 font-sans text-sm leading-7 text-[#6e5540] dark:text-[#bca486]">
          {isBg ? post.bodyBg : post.bodyEn || post.bodyBg}
        </p>
      </div>
    </article>
  );

  return (
    <main className="min-h-[70vh] bg-orisia-cream py-16 dark:bg-orisia-dark">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <header className="border-b border-[#ceb28b] pb-8 dark:border-[#5d4129]">
          <span className="font-sans text-xs font-black uppercase tracking-[.2em] text-orisia-goldDark dark:text-orisia-gold">
            {isBg ? "ОРИСИЯ · СЪБИТИЯ" : "ORISIA · EVENTS"}
          </span>
          <div className="mt-3 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-[#4b2e1b] sm:text-5xl dark:text-orisia-light">{isBg ? "Събития" : "Events"}</h1>
              <p className="mt-3 max-w-2xl font-sans text-sm leading-7 text-[#705841] dark:text-[#bca486]">
                {isBg ? "Предстоящи участия, празници и специални събития на ОРИСИЯ." : "Upcoming performances, celebrations and special ORISIA events."}
              </p>
            </div>
            <Link href="/calendar" className="inline-flex min-h-10 items-center justify-center rounded border border-[#9b693d] px-4 font-sans text-xs font-black uppercase tracking-[.08em] text-[#70431f] transition hover:bg-[#ead7ba] dark:text-orisia-light dark:hover:bg-[#352116]">
              {isBg ? "Към календара" : "Open calendar"}
            </Link>
          </div>
        </header>

        <section className="py-10">
          <h2 className="mb-6 text-2xl font-bold text-[#4b2e1b] dark:text-orisia-light">{isBg ? "Предстоящи" : "Upcoming"}</h2>
          {upcoming.length ? (
            <div className="grid gap-6 md:grid-cols-2">{upcoming.map(renderEvent)}</div>
          ) : (
            <div className="rounded border border-dashed border-[#c9ad88] p-8 font-sans text-sm text-[#705841] dark:border-[#5d4129] dark:text-[#bca486]">
              {isBg ? "В момента няма публикувани предстоящи събития." : "There are no published upcoming events at the moment."}
            </div>
          )}
        </section>

        {past.length > 0 && (
          <section className="border-t border-[#ceb28b] py-10 dark:border-[#5d4129]">
            <h2 className="mb-6 text-2xl font-bold text-[#4b2e1b] dark:text-orisia-light">{isBg ? "Минали събития" : "Past events"}</h2>
            <div className="grid gap-6 md:grid-cols-2">{past.map(renderEvent)}</div>
          </section>
        )}
      </div>
    </main>
  );
}
