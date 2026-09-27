"use client";

import { useEffect, useState } from "react";
import PublicPageHeader from "../../components/PublicPageHeader";
import PublicStory, { type PublicStoryData } from "../../components/PublicStory";
import { api, postNumberToType, type PostResponse } from "../../lib/api";
import useLanguage, { useLocalizedPath } from "../../components/useLanguage";

const labels: Record<string, { bg: string; en: string }> = {
  news: { bg: "Новина", en: "News" },
  report: { bg: "Отчет", en: "Report" },
  photos: { bg: "Снимки", en: "Photos" },
  blog: { bg: "Блог", en: "Blog" },
  group: { bg: "Група", en: "Group update" },
  schedule: { bg: "График", en: "Schedule" },
};

export default function NewsPage() {
  const language = useLanguage();
  const isBg = language === "bg";
  const href = useLocalizedPath();
  const [posts, setPosts] = useState<PostResponse[]>([]);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    api.posts.list()
      .then((items) => { setPosts(items); setState("ready"); })
      .catch(() => setState("error"));
  }, []);

  const stories: PublicStoryData[] = posts.map((post) => {
    const type = postNumberToType[post.type] ?? "news";
    return {
      id: post.id,
      kind: "news",
      title: isBg ? post.titleBg : post.titleEn || post.titleBg,
      body: isBg ? post.bodyBg : post.bodyEn || post.bodyBg,
      date: post.publishedAt ?? post.createdOn,
      href: href(`/news/${post.slug}/`),
      label: labels[type]?.[language] ?? type,
      mediaType: post.mediaUrl ? 1 : 0,
      mediaUrl: post.mediaUrl,
    };
  });

  return (
    <main className="min-h-[70vh] bg-[#faf8f5] font-sans text-orisia-ink">
      <PublicPageHeader
        eyebrow={isBg ? "ОРИСИЯ · РУСЕ" : "ORISIA · RUSE"}
        title={isBg ? "Новини" : "News"}
        description={isBg ? "Последни новини, участия и важни моменти от Даскало за фолклор „ОРИСИЯ“." : "Latest news, appearances and important moments from ORISIA Folklore School."}
      />
      <div className="mx-auto w-[min(1460px,calc(100%_-_40px))] max-[620px]:w-[min(100%_-_28px,1460px)]">
        {state === "loading" && <p className="py-12 text-[#6b5847]">{isBg ? "Зареждане…" : "Loading…"}</p>}
        {state === "error" && <p className="py-12 text-red-700">{isBg ? "Новините не могат да бъдат заредени." : "News could not be loaded."}</p>}
        {state === "ready" && (stories.length
          ? stories.map((item, index) => <PublicStory key={item.id} item={item} isBg={isBg} linked reverse={index % 2 === 1} />)
          : <p className="py-12 text-[#6b5847]">{isBg ? "Все още няма публикувани новини." : "There are no published news items yet."}</p>)}
      </div>
    </main>
  );
}
