"use client";

import Link from "next/link";
import useLanguage, { useLocalizedPath } from "./useLanguage";
import type { FeedPost } from "./homeFeedStore";

export default function FeedDetailClient({ post, kind }: { post: FeedPost; kind: "news" | "event" }) {
  const language = useLanguage(); const isBg = language === "bg"; const href = useLocalizedPath();
  const title = isBg ? post.titleBg : post.titleEn || post.titleBg; const body = isBg ? post.bodyBg : post.bodyEn || post.bodyBg;
  return <main className="min-h-[70vh] bg-orisia-cream py-16 dark:bg-orisia-dark"><article className="mx-auto max-w-4xl px-6"><Link href={href(kind === "event" ? "/events/" : "/news/")} className="font-sans text-xs font-black uppercase text-orisia-goldDark">← {isBg ? "Назад" : "Back"}</Link><header className="mt-7 border-b border-orisia-line pb-8"><h1 className="text-4xl font-bold sm:text-6xl">{title}</h1><time className="mt-4 block font-sans text-sm text-[#806a55]">{new Date(post.date).toLocaleString(isBg ? "bg-BG" : "en-GB")}</time>{post.location && <p className="mt-2 font-sans text-sm text-orisia-goldDark">{post.location}</p>}</header><section className="py-8"><p className="whitespace-pre-line font-sans text-base leading-8 text-[#725b47] dark:text-[#b19873]">{body}</p></section></article></main>;
}
