"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styles from "./AdminHomeFeed.module.css";
import useLanguage from "./useLanguage";
import { FeedPost, FeedType, readFeedPosts, writeFeedPosts } from "./homeFeedStore";

const typeOptions: Array<{ value: FeedType; bg: string; en: string }> = [
  { value: "report", bg: "Отчет", en: "Report" },
  { value: "news", bg: "Новина", en: "News" },
  { value: "photos", bg: "Снимки", en: "Photos" },
  { value: "blog", bg: "Блог", en: "Blog" },
  { value: "group", bg: "Ъпдейт за група", en: "Group update" },
  { value: "schedule", bg: "График", en: "Schedule" },
];

const today = () => new Date().toISOString().slice(0, 10);

export default function AdminHomeFeed() {
  const language = useLanguage();
  const isBg = language === "bg";
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [type, setType] = useState<FeedType>("news");
  const [titleBg, setTitleBg] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [bodyBg, setBodyBg] = useState("");
  const [bodyEn, setBodyEn] = useState("");
  const [date, setDate] = useState(today());
  const [image, setImage] = useState<string | undefined>();
  const [featured, setFeatured] = useState(false);

  useEffect(() => setPosts(readFeedPosts()), []);

  const reset = () => {
    setType("news");
    setTitleBg("");
    setTitleEn("");
    setBodyBg("");
    setBodyEn("");
    setDate(today());
    setImage(undefined);
    setFeatured(false);
  };

  const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setImage(undefined);
      return;
    }

    if (file.size > 1_500_000) {
      window.alert(isBg ? "За DEV версията използвай снимка до 1.5 MB." : "For the DEV version, use an image up to 1.5 MB.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setImage(typeof reader.result === "string" ? reader.result : undefined);
    reader.readAsDataURL(file);
  };

  const publish = (event: FormEvent) => {
    event.preventDefault();
    if (!titleBg.trim() || !bodyBg.trim()) return;

    const post: FeedPost = {
      id: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}`,
      type,
      titleBg: titleBg.trim(),
      titleEn: titleEn.trim(),
      bodyBg: bodyBg.trim(),
      bodyEn: bodyEn.trim(),
      date,
      image,
      featured,
    };

    const next = [post, ...posts];
    setPosts(next);
    writeFeedPosts(next);
    reset();
  };

  const removePost = (id: string) => {
    const next = posts.filter((post) => post.id !== id);
    setPosts(next);
    writeFeedPosts(next);
  };

  const toggleFeatured = (id: string) => {
    const next = posts.map((post) => post.id === id ? { ...post, featured: !post.featured } : post);
    setPosts(next);
    writeFeedPosts(next);
  };

  return (
    <main className={styles.page}>
      <div className="container">
        <div className={styles.head}>
          <div>
            <span className={styles.kicker}>{isBg ? "ОРИСИЯ · НАЧАЛНА СТРАНИЦА" : "ORISIA · HOMEPAGE"}</span>
            <h1>{isBg ? "Feed и публикации" : "Feed and posts"}</h1>
          </div>
          <p>{isBg ? "Публикувай отчети, новини, снимки, блогове, групови ъпдейти и графици. Маркираните като важни влизат в slideshow-а." : "Publish reports, news, photos, blog posts, group updates and schedules. Featured posts appear in the slideshow."}</p>
        </div>

        <div className={styles.layout}>
          <section className={styles.panel}>
            <h2>{isBg ? "Нова публикация" : "New post"}</h2>
            <form onSubmit={publish}>
              <div className={styles.grid}>
                <div className={styles.field}>
                  <label htmlFor="feed-type">{isBg ? "Тип" : "Type"}</label>
                  <select id="feed-type" value={type} onChange={(event) => setType(event.target.value as FeedType)}>
                    {typeOptions.map((option) => <option key={option.value} value={option.value}>{isBg ? option.bg : option.en}</option>)}
                  </select>
                </div>
                <div className={styles.field}>
                  <label htmlFor="feed-date">{isBg ? "Дата" : "Date"}</label>
                  <input id="feed-date" type="date" value={date} onChange={(event) => setDate(event.target.value)} required />
                </div>

                <div className={styles.field}>
                  <label htmlFor="title-bg">Заглавие BG *</label>
                  <input id="title-bg" value={titleBg} onChange={(event) => setTitleBg(event.target.value)} required />
                </div>
                <div className={styles.field}>
                  <label htmlFor="title-en">Title EN</label>
                  <input id="title-en" value={titleEn} onChange={(event) => setTitleEn(event.target.value)} placeholder="Optional" />
                </div>

                <div className={`${styles.field} ${styles.full}`}>
                  <label htmlFor="body-bg">Текст BG *</label>
                  <textarea id="body-bg" value={bodyBg} onChange={(event) => setBodyBg(event.target.value)} required />
                </div>
                <div className={`${styles.field} ${styles.full}`}>
                  <label htmlFor="body-en">Text EN</label>
                  <textarea id="body-en" value={bodyEn} onChange={(event) => setBodyEn(event.target.value)} placeholder="Optional — if empty, BG text is shown." />
                </div>

                <div className={`${styles.field} ${styles.full}`}>
                  <label htmlFor="feed-image">{isBg ? "Снимка" : "Image"}</label>
                  <input id="feed-image" type="file" accept="image/*" onChange={handleImage} />
                </div>

                <label className={`${styles.check} ${styles.full}`}>
                  <input type="checkbox" checked={featured} onChange={(event) => setFeatured(event.target.checked)} />
                  {isBg ? "Важно — покажи в централния slideshow" : "Featured — show in the central slideshow"}
                </label>
              </div>

              <div className={styles.actions}>
                <button className={styles.publish} type="submit">{isBg ? "Публикувай" : "Publish"}</button>
                <button className={styles.reset} type="button" onClick={reset}>{isBg ? "Изчисти" : "Reset"}</button>
              </div>
              <p className={styles.help}>{isBg ? "DEV режим: публикациите и снимките се пазят в localStorage на този браузър. При backend интеграцията ще минат в база данни и файлово хранилище." : "DEV mode: posts and images are stored in this browser's localStorage. Backend integration will move them to the database and file storage."}</p>
            </form>
          </section>

          <section className={styles.panel}>
            <h2>{isBg ? "Публикувано" : "Published"}</h2>
            <div className={styles.list}>
              {posts.length ? posts.map((post) => {
                const label = typeOptions.find((option) => option.value === post.type);
                return (
                  <article className={styles.item} key={post.id}>
                    <div className={styles.itemTop}>
                      <span className={styles.badge}>{isBg ? label?.bg : label?.en}</span>
                      <button className={styles.delete} type="button" onClick={() => toggleFeatured(post.id)}>{post.featured ? (isBg ? "Махни от slideshow" : "Unfeature") : (isBg ? "В slideshow" : "Feature")}</button>
                    </div>
                    <h3>{isBg ? post.titleBg : post.titleEn || post.titleBg}</h3>
                    <p>{isBg ? post.bodyBg : post.bodyEn || post.bodyBg}</p>
                    <div className={styles.itemFooter}>
                      <span className={styles.date}>{post.date}{post.featured ? ` · ${isBg ? "ВАЖНО" : "FEATURED"}` : ""}</span>
                      <button className={styles.delete} type="button" onClick={() => removePost(post.id)}>{isBg ? "Изтрий" : "Delete"}</button>
                    </div>
                  </article>
                );
              }) : <div className={styles.empty}>{isBg ? "Няма публикации." : "No posts."}</div>}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
