"use client";

import Link from "next/link";
import PublicStory, { type PublicStoryData } from "./PublicStory";
import useLanguage, { useLocalizedPath } from "./useLanguage";
import type { FeedPost } from "./homeFeedStore";

export default function FeedDetailClient({ post, kind }: { post: FeedPost; kind: "news" | "event" }) {
  const language = useLanguage();
  const isBg = language === "bg";
  const href = useLocalizedPath();
  const title = isBg ? post.titleBg : post.titleEn || post.titleBg;
  const body = isBg ? post.bodyBg : post.bodyEn || post.bodyBg;

  const item: PublicStoryData = {
    id: post.id,
    kind,
    title,
    body,
    date: post.date,
    label: kind === "event" ? (isBg ? "Събитие" : "Event") : (isBg ? "Новина" : "News"),
    location: post.location,
    mediaType: post.mediaType,
    mediaUrl: post.mediaUrl,
    slideshowUrls: post.slideshowUrls,
  };

  return (
    <main className="min-h-[70vh] bg-[#faf8f5] font-sans text-orisia-ink">
      <div className="mx-auto w-[min(1460px,calc(100%_-_40px))] py-12 max-[620px]:w-[min(100%_-_28px,1460px)] md:py-20">
        <Link href={href(kind === "event" ? "/events/" : "/news/")} className="inline-block border-b-2 border-orisia-goldDark pb-1 text-sm font-bold text-orisia-goldDark">
          ← {isBg ? (kind === "event" ? "Всички събития" : "Всички новини") : (kind === "event" ? "All events" : "All news")}
        </Link>
        <PublicStory item={item} isBg={isBg} detail />
      </div>
    </main>
  );
}
