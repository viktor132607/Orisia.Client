"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { absoluteMediaUrl } from "../lib/api";

export type PublicStoryData = {
  id: string;
  kind: "news" | "event";
  title: string;
  body: string;
  date: string;
  href?: string;
  label: string;
  location?: string | null;
  mediaType?: number;
  mediaUrl?: string | null;
  slideshowUrls?: string[];
};

function mediaSrc(value?: string | null) {
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) return value;
  if (value.startsWith("/uploads/")) return absoluteMediaUrl(value) || value;
  return value;
}

function videoSource(value: string): { src: string; embedded: boolean } | null {
  try {
    const url = new URL(value, typeof window === "undefined" ? "https://example.com" : window.location.origin);
    const host = url.hostname.toLowerCase();
    const youtubeId =
      host === "youtu.be"
        ? url.pathname.slice(1)
        : host === "youtube.com" || host === "www.youtube.com"
          ? url.pathname.startsWith("/shorts/")
            ? url.pathname.split("/")[2]
            : url.searchParams.get("v")
          : null;

    if (youtubeId && /^[a-zA-Z0-9_-]{11}$/.test(youtubeId)) {
      return { src: `https://www.youtube-nocookie.com/embed/${youtubeId}`, embedded: true };
    }

    if (host === "vimeo.com" || host === "www.vimeo.com") {
      const id = url.pathname.split("/").filter(Boolean)[0];
      if (id && /^\d+$/.test(id)) return { src: `https://player.vimeo.com/video/${id}`, embedded: true };
    }

    if (/\.mp4(?:$|\?)/i.test(url.pathname + url.search)) return { src: value, embedded: false };
  } catch {
    return null;
  }

  return null;
}

function formatDate(value: string, isBg: boolean) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat(isBg ? "bg-BG" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Sofia",
  }).format(date);
}

export default function PublicStory({
  item,
  isBg,
  linked = false,
  reverse = false,
  detail = false,
}: {
  item: PublicStoryData;
  isBg: boolean;
  linked?: boolean;
  reverse?: boolean;
  detail?: boolean;
}) {
  const photos = useMemo(() => {
    if (item.mediaType === 3) return (item.slideshowUrls || []).filter(Boolean).map(mediaSrc);
    if (item.mediaType === 1 && item.mediaUrl) return [mediaSrc(item.mediaUrl)];
    return [];
  }, [item.mediaType, item.mediaUrl, item.slideshowUrls]);

  const video = item.mediaType === 2 && item.mediaUrl ? videoSource(item.mediaUrl) : null;
  const hasMedia = photos.length > 0 || Boolean(video);
  const count = photos.length + (video ? 1 : 0);
  const [active, setActive] = useState(0);
  const [playVideo, setPlayVideo] = useState(false);
  const excerpt = linked && item.body.length > 300
    ? item.body.slice(0, 300).trimEnd().replace(/\s+\S*$/, "") + "…"
    : item.body;

  useEffect(() => {
    if (count < 2 || (active === photos.length && video) || typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % count), 6500);
    return () => window.clearInterval(timer);
  }, [active, count, photos.length, video]);

  return (
    <article className={`grid items-center gap-8 border-b border-orisia-line/50 py-12 font-sans md:gap-12 md:py-16 ${hasMedia ? "lg:grid-cols-2" : ""}`}>
      <div className={`max-w-2xl ${reverse && hasMedia ? "lg:order-2" : ""}`}>
        <div className="flex flex-wrap items-center gap-4 text-[11px] font-black uppercase tracking-[.14em] text-orisia-goldDark">
          <span>{item.label}</span>
          <time dateTime={item.date}>{formatDate(item.date, isBg)}</time>
        </div>
        {detail ? (
          <h1 className="mt-4 text-[clamp(34px,5vw,60px)] font-black leading-[1.03] tracking-[-.025em] text-orisia-ink">{item.title}</h1>
        ) : (
          <h2 className="mt-4 text-[clamp(28px,3.4vw,46px)] font-black leading-[1.05] tracking-[-.02em] text-orisia-ink">
            {linked && item.href ? <Link href={item.href} className="transition-colors hover:text-orisia-goldDark">{item.title}</Link> : item.title}
          </h2>
        )}
        {item.location && <p className="mt-4 text-sm font-bold text-orisia-goldDark">⌖ {item.location}</p>}
        <p className="mt-5 whitespace-pre-line text-[17px] leading-8 text-[#6b5847]">{excerpt}</p>
        {linked && item.href && (
          <Link href={item.href} className="mt-6 inline-block border-b-2 border-orisia-goldDark pb-1 text-sm font-bold text-orisia-goldDark">
            {isBg ? "Продължете да четете" : "Continue reading"} →
          </Link>
        )}
      </div>

      {hasMedia && (
        <div className={`relative overflow-hidden rounded-2xl border border-orisia-line/45 bg-[#eee5da] shadow-[0_8px_26px_rgba(75,46,27,.06)] ${reverse ? "lg:order-1" : ""}`}>
          <div className="relative aspect-[5/4]">
            {active < photos.length ? (
              <img src={photos[active]} alt={`${item.title} — ${active + 1}`} className="h-full w-full object-cover" />
            ) : video ? (
              playVideo ? (
                video.embedded ? (
                  <iframe
                    title={item.title}
                    src={video.src}
                    className="h-full w-full border-0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video controls playsInline src={video.src} className="h-full w-full object-contain bg-orisia-ink" />
                )
              ) : (
                <button type="button" onClick={() => setPlayVideo(true)} className="flex h-full w-full flex-col items-center justify-center gap-3 bg-orisia-ink p-8 text-center font-bold text-white">
                  <span className="text-5xl">▶</span>
                  {isBg ? "Пусни видеото" : "Play video"}
                </button>
              )
            ) : null}
          </div>
          {count > 1 && (
            <div className="flex items-center justify-center gap-2 bg-orisia-paper p-3">
              {Array.from({ length: count }, (_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => { setActive(index); setPlayVideo(false); }}
                  aria-label={`${isBg ? "Медия" : "Media"} ${index + 1}`}
                  aria-current={active === index ? "true" : undefined}
                  className={`h-3 w-3 rounded-full border border-orisia-goldDark ${active === index ? "bg-orisia-goldDark" : "bg-white"}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </article>
  );
}
