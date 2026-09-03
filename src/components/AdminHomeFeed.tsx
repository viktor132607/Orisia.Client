"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import useLanguage from "./useLanguage";
import { FeedPost, FeedType, readFeedPosts, writeFeedPosts } from "./homeFeedStore";

const typeOptions: Array<{ value: FeedType; bg: string; en: string }> = [
  { value: "event", bg: "Събитие", en: "Event" }, { value: "report", bg: "Отчет", en: "Report" }, { value: "news", bg: "Новина", en: "News" }, { value: "photos", bg: "Снимки", en: "Photos" }, { value: "blog", bg: "Блог", en: "Blog" }, { value: "group", bg: "Ъпдейт за група", en: "Group update" }, { value: "schedule", bg: "График", en: "Schedule" },
];
const today = () => new Date().toISOString().slice(0, 10);

export default function AdminHomeFeed() {
  const language = useLanguage();
  const isBg = language === "bg";
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [type, setType] = useState<FeedType>("news");
  const [titleBg, setTitleBg] = useState(""); const [titleEn, setTitleEn] = useState("");
  const [bodyBg, setBodyBg] = useState(""); const [bodyEn, setBodyEn] = useState("");
  const [date, setDate] = useState(today()); const [image, setImage] = useState<string | undefined>(); const [featured, setFeatured] = useState(false);

  useEffect(() => setPosts(readFeedPosts()), []);
  const reset = () => { setType("news"); setTitleBg(""); setTitleEn(""); setBodyBg(""); setBodyEn(""); setDate(today()); setImage(undefined); setFeatured(false); };
  const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; if (!file) { setImage(undefined); return; }
    if (file.size > 1_500_000) { window.alert(isBg ? "За DEV версията използвай снимка до 1.5 MB." : "For the DEV version, use an image up to 1.5 MB."); event.target.value = ""; return; }
    const reader = new FileReader(); reader.onload = () => setImage(typeof reader.result === "string" ? reader.result : undefined); reader.readAsDataURL(file);
  };
  const publish = (event: FormEvent) => {
    event.preventDefault(); if (!titleBg.trim() || !bodyBg.trim()) return;
    const post: FeedPost = { id: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}`, type, titleBg: titleBg.trim(), titleEn: titleEn.trim(), bodyBg: bodyBg.trim(), bodyEn: bodyEn.trim(), date, image, featured };
    const next = [post, ...posts]; setPosts(next); writeFeedPosts(next); reset();
  };
  const removePost = (id: string) => { const next = posts.filter((post) => post.id !== id); setPosts(next); writeFeedPosts(next); };
  const toggleFeatured = (id: string) => { const next = posts.map((post) => post.id === id ? { ...post, featured: !post.featured } : post); setPosts(next); writeFeedPosts(next); };

  const fieldClass = "grid gap-2";
  const inputClass = "min-h-11 w-full border border-orisia-line bg-white px-3 font-sans text-sm text-orisia-brown outline-none focus:border-orisia-goldDark dark:border-[#604a39] dark:bg-[#130b07] dark:text-orisia-light";
  const labelClass = "font-sans text-xs font-bold text-[#684a32] dark:text-[#c8ad83]";

  return (
    <main className="min-h-[70vh] bg-orisia-cream py-12 dark:bg-orisia-dark">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div><span className="font-sans text-[10px] font-black uppercase tracking-[.2em] text-orisia-goldDark dark:text-[#c28a48]">{isBg ? "ОРИСИЯ · НАЧАЛНА СТРАНИЦА" : "ORISIA · HOMEPAGE"}</span><h1 className="mt-2 text-4xl font-bold sm:text-5xl">{isBg ? "Feed и публикации" : "Feed and posts"}</h1></div>
          <p className="max-w-2xl font-sans text-sm leading-6 text-[#725b47] dark:text-[#a98c69]">{isBg ? "Публикувай събития, отчети, новини, снимки, блогове, групови ъпдейти и графици. Маркираните като важни влизат в slideshow-а." : "Publish events, reports, news, photos, blog posts, group updates and schedules. Featured posts appear in the slideshow."}</p>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <section className="border border-orisia-line bg-orisia-paper p-6 shadow-sm dark:border-[#604a39] dark:bg-orisia-panel sm:p-8">
            <h2 className="text-3xl font-bold">{isBg ? "Нова публикация" : "New post"}</h2>
            <form className="mt-6" onSubmit={publish}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className={fieldClass}><label className={labelClass} htmlFor="feed-type">{isBg ? "Тип" : "Type"}</label><select className={inputClass} id="feed-type" value={type} onChange={(event) => setType(event.target.value as FeedType)}>{typeOptions.map((option) => <option key={option.value} value={option.value}>{isBg ? option.bg : option.en}</option>)}</select></div>
                <div className={fieldClass}><label className={labelClass} htmlFor="feed-date">{isBg ? "Дата" : "Date"}</label><input className={inputClass} id="feed-date" type="date" value={date} onChange={(event) => setDate(event.target.value)} required /></div>
                <div className={fieldClass}><label className={labelClass} htmlFor="title-bg">Заглавие BG *</label><input className={inputClass} id="title-bg" value={titleBg} onChange={(event) => setTitleBg(event.target.value)} required /></div>
                <div className={fieldClass}><label className={labelClass} htmlFor="title-en">Title EN</label><input className={inputClass} id="title-en" value={titleEn} onChange={(event) => setTitleEn(event.target.value)} placeholder="Optional" /></div>
                <div className={`${fieldClass} sm:col-span-2`}><label className={labelClass} htmlFor="body-bg">Текст BG *</label><textarea className={`${inputClass} min-h-32 py-3`} id="body-bg" value={bodyBg} onChange={(event) => setBodyBg(event.target.value)} required /></div>
                <div className={`${fieldClass} sm:col-span-2`}><label className={labelClass} htmlFor="body-en">Text EN</label><textarea className={`${inputClass} min-h-32 py-3`} id="body-en" value={bodyEn} onChange={(event) => setBodyEn(event.target.value)} placeholder="Optional — if empty, BG text is shown." /></div>
                <div className={`${fieldClass} sm:col-span-2`}><label className={labelClass} htmlFor="feed-image">{isBg ? "Снимка" : "Image"}</label><input className="w-full border border-orisia-line bg-white p-3 font-sans text-xs dark:border-[#604a39] dark:bg-[#130b07]" id="feed-image" type="file" accept="image/*" onChange={handleImage} /></div>
                <label className="flex items-center gap-3 font-sans text-sm sm:col-span-2"><input className="h-4 w-4 accent-orisia-goldDark" type="checkbox" checked={featured} onChange={(event) => setFeatured(event.target.checked)} />{isBg ? "Важно — покажи в централния slideshow" : "Featured — show in the central slideshow"}</label>
              </div>
              <div className="mt-6 flex gap-3"><button className="border border-orisia-goldDark bg-orisia-gold px-5 py-3 font-sans text-xs font-black uppercase tracking-wide text-white hover:bg-orisia-goldDark" type="submit">{isBg ? "Публикувай" : "Publish"}</button><button className="border border-orisia-line bg-transparent px-5 py-3 font-sans text-xs font-bold dark:border-[#604a39]" type="button" onClick={reset}>{isBg ? "Изчисти" : "Reset"}</button></div>
              <p className="mt-5 font-sans text-[11px] leading-5 text-[#826d59] dark:text-[#8f795f]">{isBg ? "DEV режим: публикациите и снимките се пазят в localStorage на този браузър. При backend интеграцията ще минат в база данни и файлово хранилище." : "DEV mode: posts and images are stored in this browser's localStorage. Backend integration will move them to the database and file storage."}</p>
            </form>
          </section>

          <section className="border border-orisia-line bg-orisia-paper p-6 shadow-sm dark:border-[#604a39] dark:bg-orisia-panel sm:p-8">
            <h2 className="text-3xl font-bold">{isBg ? "Публикувано" : "Published"}</h2>
            <div className="mt-6 grid gap-4">
              {posts.length ? posts.map((post) => {
                const label = typeOptions.find((option) => option.value === post.type);
                return <article className="border border-orisia-line bg-[#fffdf8] p-5 dark:border-[#604a39] dark:bg-[#160d08]" key={post.id}>
                  <div className="flex items-center justify-between gap-3"><span className="rounded-full border border-orisia-goldDark px-2 py-1 font-sans text-[10px] font-black uppercase tracking-wide text-orisia-goldDark dark:text-[#d9b778]">{isBg ? label?.bg : label?.en}</span><button className="font-sans text-[11px] font-bold text-orisia-goldDark hover:underline dark:text-[#d3a969]" type="button" onClick={() => toggleFeatured(post.id)}>{post.featured ? (isBg ? "Махни от slideshow" : "Unfeature") : (isBg ? "В slideshow" : "Feature")}</button></div>
                  <h3 className="mt-4 text-2xl font-bold">{isBg ? post.titleBg : post.titleEn || post.titleBg}</h3><p className="mt-2 font-sans text-sm leading-6 text-[#725b47] dark:text-[#b19873]">{isBg ? post.bodyBg : post.bodyEn || post.bodyBg}</p>
                  <div className="mt-5 flex items-center justify-between gap-3 border-t border-orisia-line pt-4 font-sans text-[11px] dark:border-[#604a39]"><span className="text-[#826d59] dark:text-[#9c846d]">{post.date}{post.featured ? ` · ${isBg ? "ВАЖНО" : "FEATURED"}` : ""}</span><button className="font-bold text-[#a04435] hover:underline" type="button" onClick={() => removePost(post.id)}>{isBg ? "Изтрий" : "Delete"}</button></div>
                </article>;
              }) : <div className="border border-dashed border-orisia-line p-6 text-center font-sans text-sm dark:border-[#604a39]">{isBg ? "Няма публикации." : "No posts."}</div>}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
