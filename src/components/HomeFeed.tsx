"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  api,
  type EventResponse,
  type FeedItemResponse,
  type PostResponse,
} from "../lib/api";
import PublicStory, { type PublicStoryData } from "./PublicStory";
import useLanguage, { useLocalizedPath } from "./useLanguage";

function labelFor(item: FeedItemResponse, isBg: boolean) {
  if (item.type === "event") return isBg ? "Събитие" : "Event";
  return isBg ? "Новина" : "News";
}

export default function HomeFeed() {
  const language = useLanguage();
  const isBg = language === "bg";
  const href = useLocalizedPath();
  const [feed, setFeed] = useState<FeedItemResponse[]>([]);
  const [posts, setPosts] = useState<PostResponse[]>([]);
  const [events, setEvents] = useState<EventResponse[]>([]);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [activeSlide, setActiveSlide] = useState(0);
  const [previousSlide, setPreviousSlide] = useState<PublicStoryData | null>(null);
  const [direction, setDirection] = useState<"next" | "previous">("next");

  useEffect(() => {
    Promise.all([api.feed.get("take=30"), api.posts.list(), api.events.list()])
      .then(([feedResponse, postItems, eventItems]) => {
        setFeed(feedResponse.items);
        setPosts(postItems);
        setEvents(eventItems);
        setState("ready");
      })
      .catch(() => setState("error"));
  }, []);

  const postBySlug = useMemo(() => new Map(posts.map((item) => [item.slug, item])), [posts]);
  const eventBySlug = useMemo(() => new Map(events.map((item) => [item.slug, item])), [events]);

  const stories = useMemo<PublicStoryData[]>(() => {
    return [...feed]
      .sort((a, b) => b.date.localeCompare(a.date))
      .filter((item) => item.type === "news" || item.type === "event")
      .map((item) => {
        const post = item.type === "event" ? undefined : postBySlug.get(item.slug);
        const event = item.type === "event" ? eventBySlug.get(item.slug) : undefined;
        return {
          id: item.id,
          kind: item.type === "event" ? "event" : "news",
          title: isBg ? item.titleBg : item.titleEn || item.titleBg,
          body: isBg ? item.bodyBg : item.bodyEn || item.bodyBg,
          date: item.date,
          href: href(item.type === "event" ? `/events/${item.slug}/` : `/news/${item.slug}/`),
          label: labelFor(item, isBg),
          location: item.location,
          mediaType: event?.mediaType ?? (post?.mediaUrl ? 1 : 0),
          mediaUrl: event?.mediaUrl ?? post?.mediaUrl ?? null,
          slideshowUrls: event?.slideshowUrls ?? [],
        };
      });
  }, [feed, postBySlug, eventBySlug, isBg, href]);

  const featuredIds = useMemo(() => new Set(feed.filter((item) => item.featured).map((item) => item.id)), [feed]);
  const featured = useMemo(() => {
    const items = stories.filter((item) => featuredIds.has(item.id));
    return items.length ? items : stories.slice(0, 3);
  }, [stories, featuredIds]);

  const slide = featured[activeSlide % Math.max(featured.length, 1)];

  useEffect(() => {
    if (featured.length < 2 || !slide || typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setPreviousSlide(slide);
      setDirection("next");
      setActiveSlide((current) => (current + 1) % featured.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [featured.length, slide]);

  function showSlide(index: number, step: "next" | "previous") {
    if (!slide || index === activeSlide % featured.length) return;
    setPreviousSlide(window.matchMedia("(prefers-reduced-motion: reduce)").matches ? null : slide);
    setDirection(step);
    setActiveSlide(index);
  }

  function heroImage(item?: PublicStoryData | null) {
    if (!item) return null;
    if (item.mediaType === 1 && item.mediaUrl) return item.mediaUrl;
    if (item.mediaType === 3 && item.slideshowUrls?.length) return item.slideshowUrls[0];
    return null;
  }

  const currentImage = heroImage(slide);
  const previousImage = heroImage(previousSlide);

  return (
    <main className="bg-[#faf8f5] font-sans text-orisia-ink">
      <section className="mx-auto grid w-[min(1460px,calc(100%_-_40px))] gap-0 py-8 lg:grid-cols-2 lg:py-12 max-[620px]:w-[min(100%_-_28px,1460px)]">
        <div className="flex min-h-[370px] min-w-0 flex-col justify-center bg-white p-8 md:p-12 lg:min-h-[524px] lg:rounded-l-[24px] lg:p-14">
          <span className="text-xs font-black uppercase tracking-[.2em] text-orisia-goldDark">{isBg ? "ДАСКАЛО ЗА ФОЛКЛОР · РУСЕ" : "FOLKLORE SCHOOL · RUSE"}</span>

          {slide ? (
            <div key={`${slide.id}-${language}`} className="hero-copy-fade">
              <h1 className="mt-5 text-[clamp(34px,4vw,58px)] font-black uppercase leading-[1.03] tracking-[-.025em]">{slide.title}</h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#6b5847]">{slide.body.length > 330 ? slide.body.slice(0, 330).trimEnd().replace(/\s+\S*$/, "") + "…" : slide.body}</p>
            </div>
          ) : (
            <>
              <h1 className="mt-5 text-[clamp(34px,4vw,58px)] font-black uppercase leading-[1.03]">{isBg ? "Даскало за фолклор „ОРИСИЯ“" : "ORISIA Folklore School"}</h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#6b5847]">{isBg ? "Български народни танци, групи, събития и общност в Русе." : "Bulgarian folk dances, groups, events and community in Ruse."}</p>
            </>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={href("/about/")} className="rounded-xl bg-orisia-goldDark px-6 py-3 font-bold text-white transition hover:bg-[#754725]">{isBg ? "За нас" : "About us"}</Link>
            <Link href={href("/calendar/")} className="rounded-xl border border-[#a99582] px-6 py-3 font-bold transition hover:border-orisia-goldDark hover:text-orisia-goldDark">{isBg ? "Календар" : "Calendar"}</Link>
          </div>

          {featured.length > 1 && (
            <div className="mt-8 flex items-center gap-3">
              <button type="button" onClick={() => showSlide((activeSlide - 1 + featured.length) % featured.length, "previous")} className="grid h-10 w-10 place-items-center rounded-full border border-orisia-line bg-white text-lg hover:border-orisia-goldDark">←</button>
              <div className="flex gap-2">
                {featured.map((item, index) => <button key={item.id} type="button" onClick={() => showSlide(index, index > activeSlide ? "next" : "previous")} className={`h-2.5 w-2.5 rounded-full border border-orisia-goldDark ${index === activeSlide % featured.length ? "bg-orisia-goldDark" : "bg-white"}`} aria-label={`Slide ${index + 1}`} />)}
              </div>
              <button type="button" onClick={() => showSlide((activeSlide + 1) % featured.length, "next")} className="grid h-10 w-10 place-items-center rounded-full border border-orisia-line bg-white text-lg hover:border-orisia-goldDark">→</button>
            </div>
          )}
        </div>

        <div className="group relative h-[330px] overflow-hidden bg-[#e8dfd4] md:h-[440px] lg:h-auto lg:self-stretch lg:rounded-r-[24px]">
          {previousImage ? <img src={previousImage} alt="" className="absolute inset-0 h-full w-full object-cover" aria-hidden="true" /> : <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,#fffaf3,transparent_45%),linear-gradient(135deg,#efe7dc,#d8c6b4)]" />}
          {currentImage ? (
            <img key={`${currentImage}-${activeSlide}`} src={currentImage} alt={slide?.title || "ОРИСИЯ"} className={`absolute inset-0 h-full w-full object-cover ${previousSlide ? direction === "next" ? "hero-photo-next" : "hero-photo-previous" : ""}`} />
          ) : (
            <div key={activeSlide} className={`absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_70%_25%,#fffaf3,transparent_45%),linear-gradient(135deg,#efe7dc,#d8c6b4)] ${previousSlide ? direction === "next" ? "hero-photo-next" : "hero-photo-previous" : ""}`}>
              <img src="/orisia-logo.jpg" alt="ОРИСИЯ" className="h-48 w-48 rounded-full border-4 border-orisia-line bg-white object-cover shadow-[0_15px_45px_rgba(75,46,27,.18)] md:h-64 md:w-64" />
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-orisia-line/45 bg-white">
        <div className="mx-auto w-[min(1460px,calc(100%_-_40px))] py-12 max-[620px]:w-[min(100%_-_28px,1460px)] md:py-18">
          <header className="flex flex-wrap items-end justify-between gap-5 border-b border-orisia-line/55 pb-7">
            <div>
              <span className="text-[11px] font-black uppercase tracking-[.18em] text-orisia-goldDark">{isBg ? "АКТУАЛНО" : "LATEST"}</span>
              <h2 className="mt-2 text-[clamp(32px,5vw,52px)] font-black uppercase leading-none">{isBg ? "Новини и събития" : "News and events"}</h2>
            </div>
            <Link href={href("/news/")} className="border-b-2 border-orisia-goldDark pb-1 text-sm font-bold text-orisia-goldDark">{isBg ? "Всички новини" : "All news"}</Link>
          </header>

          {state === "loading" && <p className="py-12 text-[#6b5847]">{isBg ? "Зареждане…" : "Loading…"}</p>}
          {state === "error" && <p className="py-12 text-red-700">{isBg ? "Съдържанието не може да бъде заредено." : "Content could not be loaded."}</p>}
          {state === "ready" && (stories.length ? stories.slice(0, 6).map((item, index) => <PublicStory key={item.id} item={item} isBg={isBg} linked reverse={index % 2 === 1} />) : <p className="py-12 text-[#6b5847]">{isBg ? "Все още няма публикувано съдържание." : "There is no published content yet."}</p>)}
        </div>
      </section>
    </main>
  );
}
