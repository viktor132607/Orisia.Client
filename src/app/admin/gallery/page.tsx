"use client";

import { FormEvent, useEffect, useState } from "react";
import { absoluteMediaUrl, api, type GalleryAlbumResponse } from "../../../lib/api";
import useLanguage from "../../../components/useLanguage";

export default function AdminGalleryPage() {
  const isBg = useLanguage() === "bg";
  const [albums, setAlbums] = useState<GalleryAlbumResponse[]>([]);
  const [error, setError] = useState("");
  const load = () => api.gallery.adminList().then(setAlbums).catch((e: Error) => setError(e.message));
  useEffect(() => { load(); }, []);

  async function createAlbum(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    try {
      await api.gallery.create({
        titleBg: String(form.get("titleBg")),
        titleEn: String(form.get("titleEn")) || String(form.get("titleBg")),
        descriptionBg: String(form.get("descriptionBg") || "") || null,
        descriptionEn: String(form.get("descriptionEn") || "") || null,
        coverMediaId: null,
        active: true,
        featured: false,
        sortOrder: albums.length,
      });
      event.currentTarget.reset();
      await load();
    } catch (e) { setError(e instanceof Error ? e.message : "Error"); }
  }

  async function uploadToAlbum(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const albumId = String(form.get("albumId"));
    const file = form.get("file");
    if (!(file instanceof File) || !albumId) return;
    const upload = new FormData();
    upload.append("File", file);
    upload.append("AltBg", String(form.get("altBg") || ""));
    upload.append("AltEn", String(form.get("altEn") || ""));
    try {
      const media = await api.media.upload(upload);
      await api.gallery.addMedia(albumId, { items: [{ mediaId: media.id, captionBg: null, captionEn: null, active: true }] });
      event.currentTarget.reset();
      await load();
    } catch (e) { setError(e instanceof Error ? e.message : "Error"); }
  }

  async function updateAlbum(album: GalleryAlbumResponse, patch: Partial<GalleryAlbumResponse>) {
    try {
      await api.gallery.update(album.id, {
        slug: album.slug,
        titleBg: patch.titleBg ?? album.titleBg,
        titleEn: patch.titleEn ?? album.titleEn,
        descriptionBg: album.descriptionBg ?? null,
        descriptionEn: album.descriptionEn ?? null,
        coverMediaId: album.coverMediaId ?? null,
        active: patch.active ?? album.active,
        featured: patch.featured ?? album.featured,
        sortOrder: album.sortOrder,
      });
      await load();
    } catch (e) { setError(e instanceof Error ? e.message : "Error"); }
  }

  return <main className="bg-orisia-cream py-10 dark:bg-orisia-dark"><div className="mx-auto max-w-7xl px-4"><h1 className="text-4xl font-bold">{isBg ? "Галерия" : "Gallery"}</h1>{error && <p className="mt-3 text-red-700">{error}</p>}
    <div className="mt-6 grid gap-6 lg:grid-cols-2">
      <form onSubmit={createAlbum} className="border border-orisia-line bg-orisia-paper p-6 dark:bg-orisia-panel"><h2 className="text-2xl font-bold">{isBg ? "Нов албум" : "New album"}</h2><div className="mt-4 grid gap-3"><input name="titleBg" required className="border border-orisia-line p-3" placeholder="Title BG"/><input name="titleEn" className="border border-orisia-line p-3" placeholder="Title EN"/><textarea name="descriptionBg" className="border border-orisia-line p-3" placeholder="Description BG"/><textarea name="descriptionEn" className="border border-orisia-line p-3" placeholder="Description EN"/><button className="bg-orisia-gold px-4 py-3 text-xs font-bold text-white">Create</button></div></form>
      <form onSubmit={uploadToAlbum} className="border border-orisia-line bg-orisia-paper p-6 dark:bg-orisia-panel"><h2 className="text-2xl font-bold">{isBg ? "Добави снимка" : "Add photo"}</h2><div className="mt-4 grid gap-3"><select name="albumId" required className="border border-orisia-line p-3"><option value="">Album…</option>{albums.map(a => <option key={a.id} value={a.id}>{a.titleBg}</option>)}</select><input name="file" type="file" accept="image/*" required/><input name="altBg" className="border border-orisia-line p-3" placeholder="Alt BG"/><input name="altEn" className="border border-orisia-line p-3" placeholder="Alt EN"/><button className="bg-orisia-gold px-4 py-3 text-xs font-bold text-white">Upload + add</button></div></form>
    </div>
    <div className="mt-8 grid gap-6">{albums.map(album => <section key={album.id} className="border border-orisia-line bg-orisia-paper p-6 dark:bg-orisia-panel"><div className="flex flex-wrap items-start justify-between gap-4"><div><h2 className="text-2xl font-bold">{album.titleBg}</h2><p className="font-sans text-xs">{album.active ? "active" : "inactive"} · {album.featured ? "featured" : "normal"} · {album.items.length} items</p></div><div className="flex flex-wrap gap-3 text-xs"><button onClick={() => { const title = prompt("Title BG", album.titleBg); if (title) updateAlbum(album, { titleBg: title }); }}>Edit title</button><button onClick={() => updateAlbum(album, { active: !album.active })}>{album.active ? "Deactivate" : "Activate"}</button><button onClick={() => updateAlbum(album, { featured: !album.featured })}>{album.featured ? "Unfeature" : "Feature"}</button><button className="text-red-700" onClick={() => confirm("Delete album?") && api.gallery.delete(album.id).then(load).catch((e: Error) => setError(e.message))}>Delete</button></div></div><div className="mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-5">{album.items.map(item => <figure key={item.id} className="border border-orisia-line p-2"><img src={absoluteMediaUrl(item.thumbnailUrl || item.url)} alt={item.altBg || album.titleBg} className="aspect-square w-full object-cover"/><button className="mt-2 text-xs text-red-700" onClick={() => confirm("Remove from album?") && api.gallery.deleteMedia(item.id).then(load).catch((e: Error) => setError(e.message))}>Remove</button></figure>)}</div></section>)}</div>
  </div></main>;
}
