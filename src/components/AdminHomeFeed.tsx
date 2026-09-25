"use client";

import { FormEvent, useEffect, useState } from "react";
import { api, postNumberToType, postTypeNames, postTypeToNumber, type PostResponse } from "../lib/api";
import useLanguage from "./useLanguage";

type FormState = {
  id?: string;
  type: (typeof postTypeNames)[number];
  titleBg: string; titleEn: string; bodyBg: string; bodyEn: string; excerptBg: string; excerptEn: string; featured: boolean;
};

const empty: FormState = { type: "news", titleBg: "", titleEn: "", bodyBg: "", bodyEn: "", excerptBg: "", excerptEn: "", featured: false };

export default function AdminHomeFeed() {
  const isBg = useLanguage() === "bg";
  const [posts, setPosts] = useState<PostResponse[]>([]);
  const [form, setForm] = useState<FormState>(empty);
  const [error, setError] = useState("");
  const load = () => api.posts.adminList().then(setPosts).catch((e: Error) => setError(e.message));
  useEffect(() => { load(); }, []);

  async function submit(event: FormEvent) {
    event.preventDefault(); setError("");
    const body = { type: postTypeToNumber[form.type], titleBg: form.titleBg, titleEn: form.titleEn || form.titleBg, bodyBg: form.bodyBg, bodyEn: form.bodyEn || form.bodyBg, excerptBg: form.excerptBg || null, excerptEn: form.excerptEn || null, featured: form.featured, coverMediaId: null, seoTitleBg: null, seoTitleEn: null, seoDescriptionBg: null, seoDescriptionEn: null };
    try { if (form.id) await api.posts.update(form.id, body); else await api.posts.create(body); setForm(empty); await load(); } catch (e) { setError(e instanceof Error ? e.message : "Error"); }
  }
  const edit = (post: PostResponse) => setForm({ id: post.id, type: (postNumberToType[post.type] === "event" ? "news" : postNumberToType[post.type]) as FormState["type"], titleBg: post.titleBg, titleEn: post.titleEn, bodyBg: post.bodyBg, bodyEn: post.bodyEn, excerptBg: post.excerptBg || "", excerptEn: post.excerptEn || "", featured: post.featured });
  const action = async (fn: () => Promise<unknown>) => { try { await fn(); await load(); } catch (e) { setError(e instanceof Error ? e.message : "Error"); } };
  const input = "min-h-11 w-full border border-orisia-line bg-white px-3 font-sans text-sm dark:border-[#604a39] dark:bg-[#130b07]";

  return <main className="bg-orisia-cream py-10 dark:bg-orisia-dark"><div className="mx-auto grid max-w-7xl gap-6 px-4 lg:grid-cols-[.9fr_1.1fr]"><form onSubmit={submit} className="border border-orisia-line bg-orisia-paper p-6 dark:bg-orisia-panel"><h1 className="text-3xl font-bold">{form.id ? (isBg ? "Редакция" : "Edit post") : (isBg ? "Нова публикация" : "New post")}</h1><div className="mt-5 grid gap-3"><select className={input} value={form.type} onChange={e => setForm({ ...form, type: e.target.value as FormState["type"] })}>{postTypeNames.map(x => <option key={x} value={x}>{x}</option>)}</select><input className={input} required placeholder="Title BG" value={form.titleBg} onChange={e => setForm({ ...form, titleBg: e.target.value })} /><input className={input} placeholder="Title EN" value={form.titleEn} onChange={e => setForm({ ...form, titleEn: e.target.value })} /><textarea className={`${input} min-h-32 py-3`} required placeholder="Body BG" value={form.bodyBg} onChange={e => setForm({ ...form, bodyBg: e.target.value })} /><textarea className={`${input} min-h-32 py-3`} placeholder="Body EN" value={form.bodyEn} onChange={e => setForm({ ...form, bodyEn: e.target.value })} /><input className={input} placeholder="Excerpt BG" value={form.excerptBg} onChange={e => setForm({ ...form, excerptBg: e.target.value })} /><label className="font-sans text-sm"><input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} /> Featured</label><div className="flex gap-2"><button className="bg-orisia-gold px-4 py-3 font-sans text-xs font-black uppercase text-white">{form.id ? (isBg ? "Запази" : "Save") : (isBg ? "Добави" : "Create")}</button>{form.id && <button type="button" className="border border-orisia-line px-4 py-3 text-xs" onClick={() => setForm(empty)}>Cancel</button>}</div>{error && <p className="font-sans text-sm text-red-700">{error}</p>}</div></form><section className="border border-orisia-line bg-orisia-paper p-6 dark:bg-orisia-panel"><h2 className="text-3xl font-bold">{isBg ? "Публикации" : "Posts"}</h2><div className="mt-5 grid gap-3">{posts.map(post => <article key={post.id} className="border border-orisia-line p-4"><div className="flex flex-wrap items-start justify-between gap-3"><div><strong>{post.titleBg}</strong><p className="font-sans text-[10px] uppercase text-orisia-goldDark">{postNumberToType[post.type]} · status {post.status}</p></div><div className="flex flex-wrap gap-2 text-xs"><button onClick={() => edit(post)}>Edit</button>{post.status !== 1 && <button onClick={() => action(() => api.posts.publish(post.id))}>Publish</button>}{post.status === 1 && <button onClick={() => action(() => api.posts.archive(post.id))}>Archive</button>}<button onClick={() => action(() => api.posts.feature(post.id, !post.featured))}>{post.featured ? "Unfeature" : "Feature"}</button><button className="text-red-700" onClick={() => confirm("Delete?") && action(() => api.posts.delete(post.id))}>Delete</button></div></div></article>)}</div></section></div></main>;
}
