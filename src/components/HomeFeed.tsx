"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "./HomeFeed.module.css";
import useLanguage from "./useLanguage";
import { FEED_EVENT, FeedPost, FeedType, readFeedPosts } from "./homeFeedStore";

const typeLabels: Record<FeedType, { bg: string; en: string }> = {
  report: { bg: "Отчет", en: "Report" },
  news: { bg: "Новина", en: "News" },
  photos: { bg: "Снимки", en: "Photos" },
  blog: { bg: "Блог", en: "Blog" },
  group: { bg: "Група", en: "Group update" },
  schedule: { bg: "График", en: "Schedule" },
};

function formatDate(date: string, isBg: boolean) {
  const value = new Date(`${date}T12:00:00`);
  if (Number.isNaN(value.getTime())) return date;
  return new Intl.DateTimeFormat(isBg ? "bg-BG" : "en-GB", { day: "2-digit", month: "long", year: "numeric" }).format(value);
}

export default function HomeFeed() {
  const language = useLanguage();
  const isBg = language === "bg";
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [activeSlide, setActiveSlide] = useState(0);

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

  const orderedPosts = useMemo(() => [...posts].sort((a, b) => b.date.localeCompare(a.date)), [posts]);
  const featured = useMemo(() => orderedPosts.filter((post) => post.featured), [orderedPosts]);
  const slides = featured.length ? featured : orderedPosts.slice(0, 3);

  useEffect(() => {
    if (slides.length < 2) return;
    const timer = window.setInterval(() => setActiveSlide((current) => (current + 1) % slides.length), 6000);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    if (activeSlide >= slides.length) setActiveSlide(0);
  }, [activeSlide, slides.length]);

  const slide = slides[activeSlide];

  return (
    <section className={styles.section} id="programa">
      <div className="container">
        <div className={styles.head}>
          <div>
            <span className={styles.kicker}>{isBg ? "ОРИСИЯ · FEED" : "ORISIA · FEED"}</span>
            <h2>{isBg ? "Какво се случва" : "What is happening"}</h2>
          </div>
          <p>{isBg ? "Новини, отчети, снимки, графици, блогове и важни ъпдейти от живота на ОРИСИЯ." : "News, reports, photos, schedules, blog posts and important updates from ORISIA."}</p>
        </div>

        <div className={styles.layout}>
          <div className={styles.main}>
            {slide && (
              <article className={styles.slideshow}>
                <div className={styles.slideMedia}>{slide.image && <img src={slide.image} alt="" />}</div>
                <div className={styles.slideShade} />
                <div className={styles.slideCopy}>
                  <span className={styles.type}>{typeLabels[slide.type][language]}</span>
                  <h3>{isBg ? slide.titleBg : slide.titleEn || slide.titleBg}</h3>
                  <p>{isBg ? slide.bodyBg : slide.bodyEn || slide.bodyBg}</p>
                  <span className={styles.slideMeta}>{formatDate(slide.date, isBg)}</span>
                </div>
                {slides.length > 1 && (
                  <div className={styles.dots} aria-label={isBg ? "Слайдове" : "Slides"}>
                    {slides.map((item, index) => (
                      <button key={item.id} type="button" className={`${styles.dot} ${index === activeSlide ? styles.dotActive : ""}`} onClick={() => setActiveSlide(index)} aria-label={`${isBg ? "Слайд" : "Slide"} ${index + 1}`} />
                    ))}
                  </div>
                )}
              </article>
            )}

            <div className={styles.feed}>
              {orderedPosts.length ? orderedPosts.map((post) => (
                <article className={styles.post} key={post.id}>
                  {post.image && <img className={styles.postImage} src={post.image} alt={isBg ? post.titleBg : post.titleEn || post.titleBg} />}
                  <div className={styles.postBody}>
                    <div className={styles.postTop}>
                      <span className={styles.type}>{typeLabels[post.type][language]}</span>
                      <time dateTime={post.date}>{formatDate(post.date, isBg)}</time>
                    </div>
                    <h3>{isBg ? post.titleBg : post.titleEn || post.titleBg}</h3>
                    <p>{isBg ? post.bodyBg : post.bodyEn || post.bodyBg}</p>
                  </div>
                </article>
              )) : <div className={styles.empty}>{isBg ? "Все още няма публикации." : "There are no posts yet."}</div>}
            </div>
          </div>

          <aside className={styles.side}>
            <div className={styles.sideCard}>
              <h3>{isBg ? "Предстоящи събития" : "Upcoming events"}</h3>
              <p>{isBg ? "Виж участията, репетициите и специалните дати на ОРИСИЯ." : "See ORISIA performances, rehearsals and special dates."}</p>
              <Link className={styles.sideLink} href="/calendar">{isBg ? "Към календара" : "Open calendar"}</Link>
            </div>
            <div className={styles.sideCard}>
              <h3>{isBg ? "Хоротека" : "Dance library"}</h3>
              <p>{isBg ? "Кратки клипове и информация за български хора и ритми." : "Short clips and information about Bulgarian dances and rhythms."}</p>
              <Link className={styles.sideLink} href="/horoteka">{isBg ? "Разгледай" : "Explore"}</Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
