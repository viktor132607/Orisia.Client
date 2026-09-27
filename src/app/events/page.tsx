"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import JsonLd from "../../components/JsonLd";
import PublicPageHeader from "../../components/PublicPageHeader";
import PublicStory, { type PublicStoryData } from "../../components/PublicStory";
import useLanguage, { useLocalizedPath } from "../../components/useLanguage";
import { api, type EventResponse } from "../../lib/api";
import { buildEventStructuredData } from "../../lib/structuredData";

function story(item: EventResponse, isBg: boolean, href: (path: string) => string): PublicStoryData {
  return {
    id: item.id,
    kind: "event",
    title: isBg ? item.titleBg : item.titleEn || item.titleBg,
    body: isBg ? item.descriptionBg : item.descriptionEn || item.descriptionBg,
    date: item.startAt,
    href: href(`/events/${item.slug}/`),
    label: isBg ? "Събитие" : "Event",
    location: item.location,
    mediaType: item.mediaType ?? 0,
    mediaUrl: item.mediaUrl,
    slideshowUrls: item.slideshowUrls ?? [],
  };
}

export default function EventsPage() {
  const language = useLanguage();
  const isBg = language === "bg";
  const href = useLocalizedPath();
  const [upcoming, setUpcoming] = useState<EventResponse[]>([]);
  const [past, setPast] = useState<EventResponse[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.events.upcoming(), api.events.past()])
      .then(([future, previous]) => { setUpcoming(future); setPast(previous); })
      .catch((reason: Error) => setError(reason.message))
      .finally(() => setLoading(false));
  }, []);

  const all = [...upcoming, ...past];

  return (
    <>
      {all.map((item) => <JsonLd key={item.id} id={`event-${item.id}-structured-data`} data={buildEventStructuredData({
        name: isBg ? item.titleBg : item.titleEn || item.titleBg,
        description: isBg ? item.descriptionBg : item.descriptionEn || item.descriptionBg,
        startDate: item.startAt,
        path: href(`/events/${item.slug}/`),
      })} />)}
      <main className="min-h-[70vh] bg-[#faf8f5] font-sans text-orisia-ink">
        <PublicPageHeader
          eyebrow={isBg ? "ОРИСИЯ · СЪБИТИЯ" : "ORISIA · EVENTS"}
          title={isBg ? "Събития" : "Events"}
          description={isBg ? "Предстоящи участия, срещи и събития, както и архив на миналите." : "Upcoming appearances, gatherings and events, plus an archive of past events."}
        >
          <Link href={href("/calendar/")} className="inline-flex rounded-xl bg-orisia-goldDark px-5 py-3 text-sm font-bold text-white transition hover:bg-[#754725]">
            {isBg ? "Отвори календара" : "Open calendar"}
          </Link>
        </PublicPageHeader>

        <div className="mx-auto w-[min(1460px,calc(100%_-_40px))] max-[620px]:w-[min(100%_-_28px,1460px)]">
          {loading && <p className="py-12 text-[#6b5847]">{isBg ? "Зареждане…" : "Loading…"}</p>}
          {error && <p className="py-12 text-red-700">{error}</p>}
          {!loading && !error && (
            <>
              <section className="py-10">
                <h2 className="border-b border-orisia-line/55 pb-5 text-3xl font-black uppercase md:text-4xl">{isBg ? "Предстоящи" : "Upcoming"}</h2>
                {upcoming.length
                  ? upcoming.map((item, index) => <PublicStory key={item.id} item={story(item, isBg, href)} isBg={isBg} linked reverse={index % 2 === 1} />)
                  : <p className="py-12 text-[#6b5847]">{isBg ? "Няма предстоящи събития." : "There are no upcoming events."}</p>}
              </section>
              {past.length > 0 && (
                <section className="border-t border-orisia-line/55 py-10">
                  <h2 className="border-b border-orisia-line/55 pb-5 text-3xl font-black uppercase md:text-4xl">{isBg ? "Минали събития" : "Past events"}</h2>
                  {past.map((item, index) => <PublicStory key={item.id} item={story(item, isBg, href)} isBg={isBg} linked reverse={index % 2 === 1} />)}
                </section>
              )}
            </>
          )}
        </div>
      </main>
    </>
  );
}
