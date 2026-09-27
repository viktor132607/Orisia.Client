"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import useLanguage, { useLocalizedPath } from "./useLanguage";
import type { FeedPost } from "./homeFeedStore";

function formatDate(value: string, isBg: boolean, allDay?: boolean) {
  const date = new Date(value);
  if (allDay) {
    return date.toLocaleDateString(isBg ? "bg-BG" : "en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    });
  }

  return date.toLocaleString(isBg ? "bg-BG" : "en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Sofia",
  });
}

function videoEmbedUrl(url: string) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtube.com")) {
      const id = parsed.searchParams.get("v") || parsed.pathname.split("/").filter(Boolean).pop();
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (parsed.hostname === "youtu.be") {
      const id = parsed.pathname.split("/").filter(Boolean)[0];
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (parsed.hostname.includes("vimeo.com")) {
      const id = parsed.pathname.split("/").filter(Boolean).pop();
      return id ? `https://player.vimeo.com/video/${id}` : null;
    }
  } catch {
    return null;
  }

  return null;
}

function EventMedia({ post, title }: { post: FeedPost; title: string }) {
  const [slide, setSlide] = useState(0);
  const slides = useMemo(() => (post.slideshowUrls || []).filter(Boolean), [post.slideshowUrls]);

  useEffect(() => {
    if (post.mediaType !== 3 || slides.length < 2) return;
    const timer = window.setInterval(() => setSlide((current) => (current + 1) % slides.length), 5000);
    return () => window.clearInterval(timer);
  }, [post.mediaType, slides.length]);

  useEffect(() => {
    if (slide >= slides.length) setSlide(0);
  }, [slide, slides.length]);

  if (post.mediaType === 1 && post.mediaUrl) {
    return (
      <figure className="overflow-hidden bg-[#f3eee7]">
        <img src={post.mediaUrl} alt={title} className="max-h-[720px] w-full object-contain" />
      </figure>
    );
  }

  if (post.mediaType === 2 && post.mediaUrl) {
    const embed = videoEmbedUrl(post.mediaUrl);
    return embed ? (
      <div className="aspect-video overflow-hidden bg-black">
        <iframe
          className="h-full w-full"
          src={embed}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    ) : (
      <video className="max-h-[720px] w-full bg-black" src={post.mediaUrl} controls playsInline />
    );
  }

  if (post.mediaType === 3 && slides.length) {
    return (
      <div className="relative overflow-hidden bg-[#f3eee7]">
        <img src={slides[slide]} alt={`${title} – ${slide + 1}`} className="max-h-[720px] w-full object-contain" />
        {slides.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => setSlide((slide - 1 + slides.length) % slides.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/65 px-3 py-2 font-sans text-lg text-white"
              aria-label="Previous slide"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => setSlide((slide + 1) % slides.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/65 px-3 py-2 font-sans text-lg text-white"
              aria-label="Next slide"
            >
              →
            </button>
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSlide(index)}
                  aria-label={`Slide ${index + 1}`}
                  className={`h-2.5 w-2.5 rounded-full border border-white ${index === slide ? "bg-white" : "bg-black/35"}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    );
  }

  return null;
}

export default function FeedDetailClient({ post, kind }: { post: FeedPost; kind: "news" | "event" }) {
  const language = useLanguage();
  const isBg = language === "bg";
  const href = useLocalizedPath();
  const title = isBg ? post.titleBg : post.titleEn || post.titleBg;
  const body = isBg ? post.bodyBg : post.bodyEn || post.bodyBg;
  const hasMedia = kind === "event" && Boolean(
    (post.mediaType === 1 && post.mediaUrl)
    || (post.mediaType === 2 && post.mediaUrl)
    || (post.mediaType === 3 && post.slideshowUrls?.length),
  );

  return (
    <main className="min-h-[70vh] bg-orisia-cream py-12 sm:py-16">
      <article className="mx-auto w-full max-w-7xl px-5 sm:px-7 lg:px-8">
        <div className="border-y border-orisia-line py-10 sm:py-14">
          <div className={hasMedia ? "grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,.92fr)] lg:items-start" : "max-w-3xl"}>
            <div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-sans text-[11px] font-black uppercase tracking-[.14em] text-orisia-goldDark">
                <span>{kind === "event" ? (isBg ? "Събитие" : "Event") : (isBg ? "Новина" : "News")}</span>
                <time>{formatDate(post.date, isBg, post.allDay)}</time>
              </div>

              <h1 className="mt-7 max-w-3xl text-4xl font-bold leading-[1.06] text-orisia-ink sm:text-5xl lg:text-6xl">
                {title}
              </h1>

              {post.location && (
                <p className="mt-6 font-sans text-sm font-semibold text-orisia-goldDark">{post.location}</p>
              )}

              <section className="mt-7 max-w-2xl">
                <p className="whitespace-pre-line text-[17px] leading-8 text-[#5f4a38] sm:text-lg sm:leading-9">
                  {body}
                </p>
              </section>

              <Link
                href={href(kind === "event" ? "/events/" : "/news/")}
                className="mt-9 inline-block border-b border-orisia-goldDark pb-1 font-sans text-xs font-black uppercase tracking-wide text-orisia-goldDark"
              >
                ← {isBg ? "Назад" : "Back"}
              </Link>
            </div>

            {hasMedia && (
              <aside className="lg:sticky lg:top-24">
                <EventMedia post={post} title={title} />
              </aside>
            )}
          </div>
        </div>
      </article>
    </main>
  );
}
