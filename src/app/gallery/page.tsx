"use client";

import { useEffect, useState } from "react";
import { absoluteMediaUrl, api, type GalleryAlbumResponse } from "../../lib/api";
import useLanguage from "../../components/useLanguage";

export default function GalleryPage() {
  const language = useLanguage(); const isBg = language === "bg";
  const [albums, setAlbums] = useState<GalleryAlbumResponse[]>([]); const [loading, setLoading] = useState(true); const [error, setError] = useState("");
  useEffect(() => { api.gallery.list().then(setAlbums).catch((e: Error) => setError(e.message)).finally(() => setLoading(false)); }, []);
  return <main className="bg-orisia-cream dark:bg-orisia-dark"><header className="border-b border-orisia-line bg-[#e8d5bb] py-14 dark:bg-[#1a100a]"><div className="mx-auto max-w-7xl px-4"><h1 className="text-5xl font-bold">{isBg ? "Галерия" : "Gallery"}</h1></div></header><section className="py-12"><div className="mx-auto max-w-7xl px-4">
    {loading && <p className="font-sans text-sm">{isBg ? "Зареждане…" : "Loading…"}</p>}{error && <p className="font-sans text-sm text-red-700">{error}</p>}
    {!loading && !error && (albums.length ? <div className="grid gap-10">{albums.map(album => <section key={album.id}><div className="mb-4"><h2 className="text-3xl font-bold">{isBg ? album.titleBg : album.titleEn || album.titleBg}</h2>{(isBg ? album.descriptionBg : album.descriptionEn) && <p className="mt-2 font-sans text-sm text-[#725b47]">{isBg ? album.descriptionBg : album.descriptionEn}</p>}</div><div className="grid auto-rows-[230px] gap-4 sm:grid-cols-2 lg:grid-cols-3">{album.items.map(item => <figure key={item.id} className="relative overflow-hidden border border-orisia-line bg-orisia-paper"><img src={absoluteMediaUrl(item.thumbnailUrl || item.url)} alt={(isBg ? item.altBg : item.altEn) || (isBg ? album.titleBg : album.titleEn)} className="h-full w-full object-cover" loading="lazy" />{(isBg ? item.captionBg : item.captionEn) && <figcaption className="absolute inset-x-0 bottom-0 bg-black/75 p-3 font-sans text-xs text-white">{isBg ? item.captionBg : item.captionEn}</figcaption>}</figure>)}</div></section>)}</div> : <div className="border border-dashed border-orisia-line p-8 font-sans text-sm">{isBg ? "Галерията все още е празна." : "The gallery is still empty."}</div>)}
  </div></section></main>;
}
