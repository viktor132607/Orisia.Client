"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  absoluteMediaUrl,
  api,
  type EventResponse,
  type GalleryAlbumResponse,
  type MediaResponse,
} from "../../../lib/api";
import useLanguage from "../../../components/useLanguage";

type F = {
  id?: string;
  titleBg: string;
  titleEn: string;
  descriptionBg: string;
  descriptionEn: string;
  startAt: string;
  endAt: string;
  eventType: number;
  location: string;
  recurrenceRule: string;
  featured: boolean;
  allDay: boolean;
  mediaType: number;
  mediaUrl: string;
  slideshowUrls: string;
};

const empty: F = {
  titleBg: "",
  titleEn: "",
  descriptionBg: "",
  descriptionEn: "",
  startAt: "",
  endAt: "",
  eventType: 1,
  location: "",
  recurrenceRule: "",
  featured: false,
  allDay: false,
  mediaType: 0,
  mediaUrl: "",
  slideshowUrls: "",
};

const mediaModes = [
  { value: 0, bg: "Без медия", en: "None" },
  { value: 1, bg: "Снимка", en: "Image" },
  { value: 2, bg: "Видео", en: "Video" },
  { value: 3, bg: "Слайдшоу", en: "Slideshow" },
];

export default function AdminEventsPage() {
  const isBg = useLanguage() === "bg";
  const [items, setItems] = useState<EventResponse[]>([]);
  const [media, setMedia] = useState<MediaResponse[]>([]);
  const [albums, setAlbums] = useState<GalleryAlbumResponse[]>([]);
  const [form, setForm] = useState<F>(empty);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const [events, mediaItems, galleryAlbums] = await Promise.all([
        api.events.adminList(),
        api.media.list(),
        api.gallery.adminList(),
      ]);
      setItems(events);
      setMedia(mediaItems);
      setAlbums(galleryAlbums);
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
    }
  };

  useEffect(() => { void load(); }, []);

  const slideshow = useMemo(
    () => form.slideshowUrls.split(/\r?\n/).map((value) => value.trim()).filter(Boolean),
    [form.slideshowUrls],
  );

  async function submit(event: FormEvent) {
    event.preventDefault();
    const body = {
      titleBg: form.titleBg,
      titleEn: form.titleEn || form.titleBg,
      descriptionBg: form.descriptionBg,
      descriptionEn: form.descriptionEn || form.descriptionBg,
      startAt: new Date(form.startAt).toISOString(),
      endAt: form.endAt ? new Date(form.endAt).toISOString() : null,
      allDay: form.allDay,
      eventType: form.eventType,
      location: form.location || null,
      coverMediaId: null,
      mediaType: form.mediaType,
      mediaUrl: form.mediaType === 1 || form.mediaType === 2 ? form.mediaUrl.trim() || null : null,
      slideshowUrls: form.mediaType === 3 ? slideshow : [],
      featured: form.featured,
      recurrenceRule: form.recurrenceRule || null,
    };

    try {
      if (form.id) await api.events.update(form.id, body);
      else await api.events.create(body);
      setForm(empty);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
    }
  }

  const edit = (item: EventResponse) => setForm({
    id: item.id,
    titleBg: item.titleBg,
    titleEn: item.titleEn,
    descriptionBg: item.descriptionBg,
    descriptionEn: item.descriptionEn,
    startAt: item.startAt.slice(0, 16),
    endAt: item.endAt?.slice(0, 16) || "",
    eventType: item.eventType,
    location: item.location || "",
    recurrenceRule: item.recurrenceRule || "",
    featured: item.featured,
    allDay: item.allDay,
    mediaType: item.mediaType ?? 0,
    mediaUrl: item.mediaUrl || "",
    slideshowUrls: (item.slideshowUrls || []).join("\n"),
  });

  const action = async (fn: () => Promise<unknown>) => {
    try {
      await fn();
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
    }
  };

  const input = "min-h-11 w-full border border-orisia-line bg-white px-3 font-sans text-sm";
  const label = "grid gap-1.5 font-sans text-xs font-bold uppercase tracking-wide text-[#725b47]";

  return (
    <main className="bg-orisia-cream py-10">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 lg:grid-cols-[.95fr_1.05fr]">
        <form onSubmit={submit} className="border border-orisia-line bg-orisia-paper p-6">
          <h1 className="text-3xl font-bold">
            {form.id ? (isBg ? "Редакция на събитие" : "Edit event") : (isBg ? "Ново събитие" : "New event")}
          </h1>

          <div className="mt-5 grid gap-4">
            <label className={label}>
              BG {isBg ? "заглавие" : "title"}
              <input className={input} required value={form.titleBg} onChange={(e) => setForm({ ...form, titleBg: e.target.value })} />
            </label>
            <label className={label}>
              EN title
              <input className={input} value={form.titleEn} onChange={(e) => setForm({ ...form, titleEn: e.target.value })} />
            </label>
            <label className={label}>
              BG {isBg ? "описание" : "description"}
              <textarea className={`${input} min-h-36 py-3`} required value={form.descriptionBg} onChange={(e) => setForm({ ...form, descriptionBg: e.target.value })} />
            </label>
            <label className={label}>
              EN description
              <textarea className={`${input} min-h-28 py-3`} value={form.descriptionEn} onChange={(e) => setForm({ ...form, descriptionEn: e.target.value })} />
            </label>

            <div className="grid gap-3 sm:grid-cols-2">
              <label className={label}>
                {isBg ? "Начало" : "Start"}
                <input type="datetime-local" required className={input} value={form.startAt} onChange={(e) => setForm({ ...form, startAt: e.target.value })} />
              </label>
              <label className={label}>
                {isBg ? "Край" : "End"}
                <input type="datetime-local" className={input} value={form.endAt} onChange={(e) => setForm({ ...form, endAt: e.target.value })} />
              </label>
            </div>

            <select className={input} value={form.eventType} onChange={(e) => setForm({ ...form, eventType: Number(e.target.value) })}>
              {["Rehearsal", "Performance", "Workshop", "Festival", "Other"].map((value, index) => <option key={value} value={index}>{value}</option>)}
            </select>
            <input className={input} placeholder={isBg ? "Локация" : "Location"} value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
            <input className={input} placeholder="FREQ=WEEKLY;BYDAY=TU,TH" value={form.recurrenceRule} onChange={(e) => setForm({ ...form, recurrenceRule: e.target.value })} />

            <section className="border-t border-orisia-line pt-5">
              <h2 className="text-xl font-bold">{isBg ? "Медия вдясно" : "Right-side media"}</h2>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {mediaModes.map((mode) => (
                  <button
                    key={mode.value}
                    type="button"
                    onClick={() => setForm({ ...form, mediaType: mode.value })}
                    className={`border px-3 py-3 font-sans text-xs font-black uppercase ${form.mediaType === mode.value ? "border-orisia-goldDark bg-orisia-gold text-white" : "border-orisia-line bg-white text-[#725b47]"}`}
                  >
                    {isBg ? mode.bg : mode.en}
                  </button>
                ))}
              </div>

              {(form.mediaType === 1 || form.mediaType === 2) && (
                <div className="mt-4 grid gap-3">
                  <label className={label}>
                    {form.mediaType === 1 ? (isBg ? "URL на снимката" : "Image URL") : (isBg ? "URL на видеото" : "Video URL")}
                    <input className={input} value={form.mediaUrl} onChange={(e) => setForm({ ...form, mediaUrl: e.target.value })} placeholder="https://..." />
                  </label>

                  {form.mediaType === 1 && media.length > 0 && (
                    <label className={label}>
                      {isBg ? "Или избери от медийната библиотека" : "Or choose from media library"}
                      <select
                        className={input}
                        value=""
                        onChange={(e) => {
                          const selected = media.find((item) => item.id === e.target.value);
                          if (selected) setForm({ ...form, mediaUrl: absoluteMediaUrl(selected.url) || selected.url });
                        }}
                      >
                        <option value="">{isBg ? "Избери снимка…" : "Choose image…"}</option>
                        {media.filter((item) => item.mimeType.startsWith("image/")).map((item) => (
                          <option key={item.id} value={item.id}>{item.originalFileName}</option>
                        ))}
                      </select>
                    </label>
                  )}

                  {form.mediaType === 1 && form.mediaUrl && (
                    <img src={form.mediaUrl} alt="" className="max-h-72 w-full bg-[#f3eee7] object-contain" />
                  )}
                </div>
              )}

              {form.mediaType === 3 && (
                <div className="mt-4 grid gap-3">
                  {albums.length > 0 && (
                    <label className={label}>
                      {isBg ? "Вземи снимките от албум" : "Use images from album"}
                      <select
                        className={input}
                        value=""
                        onChange={(e) => {
                          const album = albums.find((item) => item.id === e.target.value);
                          if (!album) return;
                          const urls = album.items
                            .filter((item) => item.active)
                            .map((item) => absoluteMediaUrl(item.url) || item.url);
                          setForm({ ...form, slideshowUrls: urls.join("\n") });
                        }}
                      >
                        <option value="">{isBg ? "Избери албум…" : "Choose album…"}</option>
                        {albums.map((album) => <option key={album.id} value={album.id}>{album.titleBg} ({album.items.length})</option>)}
                      </select>
                    </label>
                  )}
                  <label className={label}>
                    {isBg ? "Снимки за слайдшоу — по един URL на ред" : "Slideshow images — one URL per line"}
                    <textarea className={`${input} min-h-32 py-3`} value={form.slideshowUrls} onChange={(e) => setForm({ ...form, slideshowUrls: e.target.value })} />
                  </label>
                  {slideshow.length > 0 && (
                    <div className="grid grid-cols-3 gap-2">
                      {slideshow.slice(0, 6).map((url) => <img key={url} src={url} alt="" className="aspect-square w-full object-cover" />)}
                    </div>
                  )}
                </div>
              )}
            </section>

            <div className="flex flex-wrap gap-5 font-sans text-sm">
              <label><input type="checkbox" checked={form.allDay} onChange={(e) => setForm({ ...form, allDay: e.target.checked })} /> {isBg ? "Цял ден" : "All day"}</label>
              <label><input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} /> Featured</label>
            </div>

            <button className="bg-orisia-gold px-4 py-3 font-sans text-xs font-black uppercase text-white">
              {form.id ? (isBg ? "Запази" : "Save") : (isBg ? "Създай" : "Create")}
            </button>
            {form.id && <button type="button" className="font-sans text-xs font-bold uppercase" onClick={() => setForm(empty)}>{isBg ? "Отказ" : "Cancel"}</button>}
            {error && <p className="font-sans text-sm text-red-700">{error}</p>}
          </div>
        </form>

        <section className="border border-orisia-line bg-orisia-paper p-6">
          <h2 className="text-3xl font-bold">{isBg ? "Събития" : "Events"}</h2>
          <div className="mt-5 grid gap-3">
            {items.map((item) => (
              <article className="border border-orisia-line p-4" key={item.id}>
                <strong>{item.titleBg}</strong>
                <p className="font-sans text-xs">{new Date(item.startAt).toLocaleString()} · status {item.status} · {mediaModes.find((mode) => mode.value === (item.mediaType ?? 0))?.[isBg ? "bg" : "en"]}</p>
                <div className="mt-2 flex flex-wrap gap-3 font-sans text-xs">
                  <button onClick={() => edit(item)}>{isBg ? "Редакция" : "Edit"}</button>
                  {item.status !== 1
                    ? <button onClick={() => action(() => api.events.publish(item.id))}>Publish</button>
                    : <button onClick={() => action(() => api.events.unpublish(item.id))}>Unpublish</button>}
                  <button onClick={() => action(() => api.events.archive(item.id))}>Archive</button>
                  <button className="text-red-700" onClick={() => { if (confirm("Delete?")) void action(() => api.events.delete(item.id)); }}>Delete</button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
