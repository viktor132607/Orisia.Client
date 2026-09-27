"use client";

import { useEffect, useState } from "react";
import { absoluteMediaUrl, api, type GalleryAlbumResponse } from "../../lib/api";
import useLanguage from "../../components/useLanguage";

export default function GalleryPage() {
  const language = useLanguage();
  const isBg = language === "bg";
  const [albums, setAlbums] = useState<GalleryAlbumResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.gallery.list().then(setAlbums).catch((reason: Error) => setError(reason.message)).finally(() => setLoading(false));
  }, []);

  return (
    <main className="bg-orisia-cream">
      <header className="border-b border-orisia-line bg-[#f6f0e7] py-14">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-5xl font-bold">{isBg ? "Галерия" : "Gallery"}</h1>
        </div>
      </header>
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4">
          {loading && <p className="font-sans text-sm">{isBg ? "Зареждане…" : "Loading…"}</p>}
          {error && <p className="font-sans text-sm text-red-700">{error}</p>}
          {!loading && !error && (albums.length ? (
            <div className="grid gap-10">
              {albums.map((album) => (
                <section key={album.id}>
                  <div className="mb-4">
                    <h2 className="text-3xl font-bold">{isBg ? album.titleBg : album.titleEn || album.titleBg}</h2>
                    {(isBg ? album.descriptionBg : album.descriptionEn) && (
                      <p className="mt-2 font-sans text-sm text-[#725b47]">{isBg ? album.descriptionBg : album.descriptionEn}</p>
                    )}
                  </div>
                  <div className="grid auto-rows-[230px] gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {album.items.length ? album.items.map((item) => (
                      <figure key={item.id} className="relative overflow-hidden border border-orisia-line bg-orisia-paper">
                        <img src={absoluteMediaUrl(item.thumbnailUrl || item.url)} alt={(isBg ? item.altBg : item.altEn) || (isBg ? album.titleBg : album.titleEn)} className="h-full w-full object-cover" loading="lazy" />
                        {(isBg ? item.captionBg : item.captionEn) && (
                          <figcaption className="absolute inset-x-0 bottom-0 bg-black/75 p-3 font-sans text-xs text-white">{isBg ? item.captionBg : item.captionEn}</figcaption>
                        )}
                      </figure>
                    )) : [1, 2, 3].map((slot) => (
                      <div key={slot} className="flex flex-col items-center justify-center border border-dashed border-orisia-line bg-[#f6f0e7] px-4 text-center text-[#765e49]" aria-label={isBg ? `Място за снимка ${slot}` : `Photo placeholder ${slot}`}>
                        <svg viewBox="0 0 48 48" className="h-10 w-10 text-orisia-goldDark" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                          <rect x="5" y="10" width="38" height="30" rx="3" /><circle cx="17" cy="20" r="3" /><path d="m7 36 10-10 7 6 7-10 10 14" />
                        </svg>
                        <span className="mt-3 font-sans text-xs font-bold">{isBg ? "Снимка предстои" : "Photo coming soon"}</span>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
              <a className="w-fit border-b border-orisia-goldDark pb-1 font-sans text-xs font-bold uppercase text-orisia-goldDark" href="https://www.facebook.com/orisiyaruse/photos" target="_blank" rel="noopener noreferrer">
                {isBg ? "Вижте снимките във Facebook" : "See photos on Facebook"}
              </a>
            </div>
          ) : (
            <div className="border border-dashed border-orisia-line p-8 font-sans text-sm">{isBg ? "Галерията все още е празна." : "The gallery is still empty."}</div>
          ))}
        </div>
      </section>
    </main>
  );
}
