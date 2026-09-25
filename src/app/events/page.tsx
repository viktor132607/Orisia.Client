"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import JsonLd from "../../components/JsonLd";
import useLanguage, { useLocalizedPath } from "../../components/useLanguage";
import { api, type EventResponse } from "../../lib/api";
import { buildEventStructuredData } from "../../lib/structuredData";

function Card({ item, isBg, href }: { item: EventResponse; isBg: boolean; href: (path: string) => string }) {
  const title = isBg ? item.titleBg : item.titleEn || item.titleBg;
  const body = isBg ? item.descriptionBg : item.descriptionEn || item.descriptionBg;
  return <article className="border border-[#d5c0a1] bg-[#fffaf2] p-6 dark:border-[#5a4029] dark:bg-[#1d110b]"><time className="font-sans text-xs font-black uppercase text-orisia-goldDark">{new Date(item.startAt).toLocaleString(isBg ? "bg-BG" : "en-GB")}</time><h2 className="mt-2 text-2xl font-bold"><Link href={href(`/events/${item.slug}/`)}>{title}</Link></h2>{item.location && <p className="mt-2 font-sans text-xs text-orisia-goldDark">{item.location}</p>}<p className="mt-3 font-sans text-sm leading-7 text-[#6e5540] dark:text-[#bca486]">{body}</p></article>;
}

export default function EventsPage() {
  const language = useLanguage(); const isBg = language === "bg"; const href = useLocalizedPath();
  const [upcoming, setUpcoming] = useState<EventResponse[]>([]); const [past, setPast] = useState<EventResponse[]>([]); const [error, setError] = useState(""); const [loading, setLoading] = useState(true);
  useEffect(() => { Promise.all([api.events.upcoming(), api.events.past()]).then(([u,p]) => { setUpcoming(u); setPast(p); }).catch((e: Error) => setError(e.message)).finally(() => setLoading(false)); }, []);
  const all = [...upcoming, ...past];
  return <><>{all.map((item) => <JsonLd key={item.id} id={`event-${item.id}-structured-data`} data={buildEventStructuredData({ name: isBg ? item.titleBg : item.titleEn || item.titleBg, description: isBg ? item.descriptionBg : item.descriptionEn || item.descriptionBg, startDate: item.startAt, path: href(`/events/${item.slug}/`) })} />)}</>
  <main className="min-h-[70vh] bg-orisia-cream py-16 dark:bg-orisia-dark"><div className="mx-auto w-full max-w-6xl px-6 lg:px-8"><header className="border-b border-[#ceb28b] pb-8"><h1 className="text-4xl font-bold sm:text-5xl">{isBg ? "Събития" : "Events"}</h1><Link href={href("/calendar/")} className="mt-4 inline-block font-sans text-xs font-black uppercase text-orisia-goldDark">{isBg ? "Към календара" : "Open calendar"}</Link></header>
  {loading && <p className="py-8 font-sans text-sm">{isBg ? "Зареждане…" : "Loading…"}</p>}{error && <p className="py-8 font-sans text-sm text-red-700">{error}</p>}
  {!loading && !error && <><section className="py-10"><h2 className="mb-6 text-2xl font-bold">{isBg ? "Предстоящи" : "Upcoming"}</h2>{upcoming.length ? <div className="grid gap-6 md:grid-cols-2">{upcoming.map((item) => <Card key={item.id} item={item} isBg={isBg} href={href} />)}</div> : <div className="border border-dashed border-[#c9ad88] p-8 font-sans text-sm">{isBg ? "Няма предстоящи събития." : "There are no upcoming events."}</div>}</section>{past.length > 0 && <section className="border-t border-[#ceb28b] py-10"><h2 className="mb-6 text-2xl font-bold">{isBg ? "Минали събития" : "Past events"}</h2><div className="grid gap-6 md:grid-cols-2">{past.map((item) => <Card key={item.id} item={item} isBg={isBg} href={href} />)}</div></section>}</>}</div></main></>;
}
