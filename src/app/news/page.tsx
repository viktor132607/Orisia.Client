"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { api, postNumberToType, type PostResponse } from "../../lib/api";
import useLanguage, { useLocalizedPath } from "../../components/useLanguage";

const labels: Record<string, { bg: string; en: string }> = {
  news: { bg: "Новина", en: "News" }, report: { bg: "Отчет", en: "Report" }, photos: { bg: "Снимки", en: "Photos" },
  blog: { bg: "Блог", en: "Blog" }, group: { bg: "Група", en: "Group update" }, schedule: { bg: "График", en: "Schedule" },
};

export default function NewsPage() {
  const language = useLanguage();
  const isBg = language === "bg";
  const href = useLocalizedPath();
  const [posts, setPosts] = useState<PostResponse[]>([]);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    api.posts.list().then((items) => { setPosts(items); setState("ready"); }).catch(() => setState("error"));
  }, []);

  return <main className="min-h-[70vh] bg-orisia-cream py-16 dark:bg-orisia-dark"><div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
    <header className="border-b border-[#ceb28b] pb-8 dark:border-[#5d4129]"><span className="font-sans text-xs font-black uppercase tracking-[.2em] text-orisia-goldDark">{isBg ? "ОРИСИЯ · НОВИНИ" : "ORISIA · NEWS"}</span><h1 className="mt-3 text-4xl font-bold sm:text-5xl">{isBg ? "Новини" : "News"}</h1></header>
    <div className="py-10">
      {state === "loading" && <p className="font-sans text-sm">{isBg ? "Зареждане…" : "Loading…"}</p>}
      {state === "error" && <div className="border border-red-400/50 p-6 font-sans text-sm">{isBg ? "Новините не могат да бъдат заредени." : "News could not be loaded."}</div>}
      {state === "ready" && (posts.length ? <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{posts.map((post) => {
        const type = postNumberToType[post.type] ?? "news";
        const title = isBg ? post.titleBg : post.titleEn || post.titleBg;
        const body = isBg ? post.excerptBg || post.bodyBg : post.excerptEn || post.bodyEn || post.bodyBg;
        return <article key={post.id} className="flex flex-col border border-[#d5c0a1] bg-[#fffaf2] p-6 dark:border-[#5a4029] dark:bg-[#1d110b]">
          <div className="flex justify-between gap-3 font-sans text-[11px] font-black uppercase text-orisia-goldDark"><span>{labels[type]?.[language] ?? type}</span><time>{new Date(post.publishedAt ?? post.createdOn).toLocaleDateString(isBg ? "bg-BG" : "en-GB")}</time></div>
          <h2 className="mt-4 text-2xl font-bold"><Link href={href(`/news/${post.slug}/`)}>{title}</Link></h2>
          <p className="mt-3 line-clamp-5 flex-1 font-sans text-sm leading-7 text-[#6e5540] dark:text-[#bca486]">{body}</p>
          <Link href={href(`/news/${post.slug}/`)} className="mt-5 self-start border-b border-orisia-goldDark font-sans text-xs font-black uppercase text-orisia-goldDark">{isBg ? "Прочети" : "Read more"}</Link>
        </article>;
      })}</div> : <div className="border border-dashed border-[#c9ad88] p-8 font-sans text-sm">{isBg ? "Все още няма публикувани новини." : "There are no published news items yet."}</div>)}
    </div>
  </div></main>;
}
