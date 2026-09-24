"use client";

import Link from "next/link";
import useLanguage from "./useLanguage";
import type { FeedPost } from "./homeFeedStore";

function formatDate(date: string, isBg: boolean) {
  const value = new Date(`${date}T12:00:00`);
  if (Number.isNaN(value.getTime())) return date;

  return new Intl.DateTimeFormat(isBg ? "bg-BG" : "en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(value);
}

export default function FeedDetailClient({
  post,
  kind,
}: {
  post: FeedPost;
  kind: "news" | "event";
}) {
  const language = useLanguage();
  const isBg = language === "bg";
  const title = isBg ? post.titleBg : post.titleEn || post.titleBg;
  const body = isBg ? post.bodyBg : post.bodyEn || post.bodyBg;
  const backHref = kind === "event" ? "/events/" : "/news/";
  const backLabel = kind === "event"
    ? isBg ? "Към събитията" : "Back to events"
    : isBg ? "Към новините" : "Back to news";

  return (
    <main className="min-h-[70vh] bg-orisia-cream py-16 text-orisia-brown dark:bg-orisia-dark dark:text-orisia-light">
      <article className="mx-auto w-full max-w-4xl px-6 lg:px-8">
        <Link
          href={backHref}
          className="font-sans text-xs font-black uppercase tracking-wide text-orisia-goldDark dark:text-[#d3a969]"
        >
          ← {backLabel}
        </Link>

        <header className="mt-7 border-b border-orisia-line pb-8 dark:border-[#604a39]">
          <span className="font-sans text-[10px] font-black uppercase tracking-[.18em] text-orisia-goldDark">
            {kind === "event"
              ? isBg ? "ОРИСИЯ · СЪБИТИЕ" : "ORISIA · EVENT"
              : isBg ? "ОРИСИЯ · ПУБЛИКАЦИЯ" : "ORISIA · POST"}
          </span>
          <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-6xl">{title}</h1>
          <time
            className="mt-4 block font-sans text-sm text-[#806a55] dark:text-[#a58d71]"
            dateTime={post.date}
          >
            {formatDate(post.date, isBg)}
          </time>
        </header>

        {post.image && (
          <img
            src={post.image}
            alt={title}
            className="mt-8 max-h-[560px] w-full object-cover"
          />
        )}

        <section className="py-8" aria-label={title}>
          <p className="font-sans text-base leading-8 text-[#725b47] dark:text-[#b19873]">
            {body}
          </p>
        </section>
      </article>
    </main>
  );
}
