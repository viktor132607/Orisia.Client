"use client";

import { useEffect, useMemo, useState } from "react";
import { api, type CalendarOccurrence } from "../../lib/api";
import useLanguage from "../../components/useLanguage";

export default function CalendarPage() {
  const language = useLanguage(); const isBg = language === "bg";
  const [cursor, setCursor] = useState(() => new Date());
  const [items, setItems] = useState<CalendarOccurrence[]>([]);
  const [upcoming, setUpcoming] = useState<CalendarOccurrence[]>([]);
  const [loading, setLoading] = useState(true);
  const year = cursor.getFullYear(); const month = cursor.getMonth() + 1;

  useEffect(() => {
    setLoading(true);
    Promise.all([api.calendar.month(year, month), api.calendar.upcoming(6)])
      .then(([calendar, next]) => { setItems(calendar.items); setUpcoming(next); })
      .finally(() => setLoading(false));
  }, [year, month]);

  const first = new Date(year, month - 1, 1); const daysInMonth = new Date(year, month, 0).getDate();
  const mondayOffset = (first.getDay() + 6) % 7;
  const cells = Array.from({ length: Math.ceil((mondayOffset + daysInMonth) / 7) * 7 }, (_, i) => {
    const day = i - mondayOffset + 1; return day >= 1 && day <= daysInMonth ? day : null;
  });
  const grouped = useMemo(() => new Map<number, CalendarOccurrence[]>(Array.from({ length: daysInMonth }, (_, i) => [i + 1, items.filter(x => new Date(x.startAt).getDate() === i + 1)])), [items, daysInMonth]);
  const monthTitle = new Intl.DateTimeFormat(isBg ? "bg-BG" : "en-GB", { month: "long", year: "numeric" }).format(first);
  const weekdays = isBg ? ["ПОН","ВТО","СРЯ","ЧЕТ","ПЕТ","СЪБ","НЕД"] : ["MON","TUE","WED","THU","FRI","SAT","SUN"];

  return <main className="bg-orisia-cream dark:bg-orisia-dark"><header className="border-b border-orisia-line bg-[#e8d5bb] py-14 dark:bg-[#1a100a]"><div className="mx-auto max-w-7xl px-4"><h1 className="text-5xl font-bold">{isBg ? "Календар" : "Calendar"}</h1></div></header><section className="py-12"><div className="mx-auto grid max-w-7xl gap-6 px-4 lg:grid-cols-[1.45fr_.55fr]">
    <div className="border border-orisia-line bg-orisia-paper p-4 dark:border-[#604a39] dark:bg-orisia-panel"><div className="mb-5 flex items-center justify-between gap-3"><button className="border border-orisia-line px-3 py-2" onClick={() => setCursor(new Date(year, month - 2, 1))}>←</button><h2 className="text-3xl font-bold capitalize">{monthTitle}</h2><button className="border border-orisia-line px-3 py-2" onClick={() => setCursor(new Date(year, month, 1))}>→</button></div>
    <div className="grid grid-cols-7">{weekdays.map(d => <span key={d} className="border border-orisia-line py-2 text-center font-sans text-[10px] font-black">{d}</span>)}{cells.map((day, i) => <div key={i} className="min-h-28 border border-orisia-line p-2">{day && <><span className="font-sans text-xs font-bold">{day}</span>{grouped.get(day)?.map(item => <div key={item.occurrenceId} className="mt-2 border-l-2 border-orisia-goldDark pl-2"><strong className="block text-xs">{isBg ? item.titleBg : item.titleEn || item.titleBg}</strong><time className="font-sans text-[10px]">{new Date(item.startAt).toLocaleTimeString(isBg ? "bg-BG" : "en-GB", { hour: "2-digit", minute: "2-digit" })}</time></div>)}</>}</div>)}</div>{loading && <p className="mt-3 font-sans text-xs">{isBg ? "Обновяване…" : "Updating…"}</p>}</div>
    <aside className="border border-orisia-line bg-orisia-paper p-6 dark:border-[#604a39] dark:bg-orisia-panel"><h2 className="text-3xl font-bold">{isBg ? "Предстоящи" : "Upcoming"}</h2><div className="mt-5 grid gap-3">{upcoming.length ? upcoming.map(item => <article key={item.occurrenceId} className="border border-orisia-line p-4"><time className="font-sans text-[10px] text-orisia-goldDark">{new Date(item.startAt).toLocaleString(isBg ? "bg-BG" : "en-GB")}</time><h3 className="mt-1 text-lg font-bold">{isBg ? item.titleBg : item.titleEn || item.titleBg}</h3></article>) : <p className="font-sans text-sm">{isBg ? "Няма предстоящи събития." : "No upcoming events."}</p>}</div></aside>
  </div></section></main>;
}
