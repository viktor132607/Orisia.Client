"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { absoluteMediaUrl, api, type DanceResponse } from "../../lib/api";
import useLanguage, { useLocalizedPath } from "../../components/useLanguage";

export default function HorotekaPage() {
  const language = useLanguage(); const isBg = language === "bg"; const href = useLocalizedPath();
  const [dances, setDances] = useState<DanceResponse[]>([]); const [loading, setLoading] = useState(true); const [error, setError] = useState("");
  useEffect(() => { api.dances.list().then(setDances).catch((e: Error) => setError(e.message)).finally(() => setLoading(false)); }, []);
  return <main className="bg-orisia-cream dark:bg-orisia-dark"><header className="border-b border-orisia-line bg-[#e8d5bb] py-14 dark:bg-[#1a100a]"><div className="mx-auto max-w-7xl px-4"><h1 className="text-5xl font-bold">{isBg ? "Хоротека" : "Dance Library"}</h1></div></header><section className="py-12"><div className="mx-auto max-w-7xl px-4">
    {loading && <p className="font-sans text-sm">{isBg ? "Зареждане…" : "Loading…"}</p>}{error && <p className="font-sans text-sm text-red-700">{error}</p>}
    {!loading && !error && (dances.length ? <div className="grid gap-5 md:grid-cols-2">{dances.map(dance => <article key={dance.id} className="overflow-hidden border border-orisia-line bg-orisia-paper dark:border-[#604a39] dark:bg-orisia-panel">{dance.thumbnailUrl ? <img src={absoluteMediaUrl(dance.thumbnailUrl)} alt={isBg ? dance.titleBg : dance.titleEn} className="aspect-video w-full object-cover" /> : <div className="grid aspect-video place-items-center bg-[#ead7ba] text-4xl">▶</div>}<div className="p-6"><span className="font-sans text-[10px] font-black uppercase text-orisia-goldDark">{dance.region || (isBg ? "България" : "Bulgaria")} {dance.rhythm ? `· ${dance.rhythm}` : ""}</span><h2 className="mt-2 text-2xl font-bold"><Link href={href(`/horoteka/${dance.slug}/`)}>{isBg ? dance.titleBg : dance.titleEn || dance.titleBg}</Link></h2><p className="mt-2 font-sans text-sm leading-6 text-[#725b47]">{isBg ? dance.descriptionBg : dance.descriptionEn || dance.descriptionBg}</p></div></article>)}</div> : <div className="border border-dashed border-orisia-line p-8 font-sans text-sm">{isBg ? "Все още няма добавени хора." : "No dances have been added yet."}</div>)}
  </div></section></main>;
}
