"use client";

import { useEffect, useMemo, useState } from "react";
import { api, type CalendarOccurrence, type GroupResponse } from "../../lib/api";
import useLanguage from "../../components/useLanguage";

const bgDays = ["Неделя", "Понеделник", "Вторник", "Сряда", "Четвъртък", "Петък", "Събота"];
const enDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function GroupsPage() {
  const isBg = useLanguage() === "bg";
  const [groups, setGroups] = useState<GroupResponse[]>([]);
  const [upcoming, setUpcoming] = useState<CalendarOccurrence[]>([]);

  useEffect(() => {
    Promise.all([api.groups.list(), api.calendar.upcoming(30)])
      .then(([groupItems, calendarItems]) => {
        setGroups(groupItems);
        setUpcoming(calendarItems.filter(item => item.source === "group"));
      })
      .catch(() => {
        setGroups([]);
        setUpcoming([]);
      });
  }, []);

  const nextByGroup = useMemo(() => {
    const map = new Map<string, CalendarOccurrence>();
    for (const item of upcoming) {
      if (item.groupId && !map.has(item.groupId)) map.set(item.groupId, item);
    }
    return map;
  }, [upcoming]);

  const days = isBg ? bgDays : enDays;

  return (
    <main className="bg-orisia-cream dark:bg-orisia-dark">
      <header className="border-b border-orisia-line bg-[#e8d5bb] py-14 dark:bg-[#1a100a]">
        <div className="mx-auto max-w-7xl px-4">
          <p className="font-sans text-xs font-black uppercase tracking-[.18em] text-orisia-goldDark">
            {isBg ? "ОРИСИЯ" : "ORISIA"}
          </p>
          <h1 className="mt-2 text-5xl font-bold">{isBg ? "Групи и график" : "Groups & schedule"}</h1>
          <p className="mt-3 max-w-2xl font-sans text-sm text-[#725b47] dark:text-[#c9b8a8]">
            {isBg ? "Седмични репетиции, часове и място за всяка танцова група." : "Weekly rehearsals, times and location for every dance group."}
          </p>
        </div>
      </header>

      <section className="py-12">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 lg:grid-cols-2">
          {groups.map(group => {
            const next = nextByGroup.get(group.id);
            return (
              <article key={group.id} className="border border-orisia-line bg-orisia-paper p-7 dark:border-[#604a39] dark:bg-orisia-panel">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 className="text-3xl font-bold">{isBg ? group.nameBg : group.nameEn || group.nameBg}</h2>
                    {group.location && <p className="mt-2 font-sans text-sm text-[#725b47] dark:text-[#c9b8a8]">⌖ {group.location}</p>}
                  </div>
                  {next && (
                    <div className="border border-orisia-goldDark bg-[#f5ead8] px-4 py-3 text-right dark:bg-[#21150e]">
                      <span className="block font-sans text-[10px] font-black uppercase tracking-[.12em] text-orisia-goldDark">{isBg ? "Следваща репетиция" : "Next rehearsal"}</span>
                      <strong className="mt-1 block text-sm">{new Date(next.startAt).toLocaleString(isBg ? "bg-BG" : "en-GB", { weekday: "short", day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}</strong>
                    </div>
                  )}
                </div>

                <p className="mt-5 leading-7 text-[#5a4130] dark:text-[#d8c6b4]">
                  {isBg ? group.descriptionBg : group.descriptionEn || group.descriptionBg}
                </p>

                <div className="mt-6">
                  <h3 className="font-sans text-xs font-black uppercase tracking-[.15em] text-orisia-goldDark">{isBg ? "Седмичен график" : "Weekly schedule"}</h3>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {group.schedules.map(schedule => (
                      <div key={schedule.id} className="flex items-center justify-between border border-orisia-line bg-[#f7efe3] px-4 py-3 dark:border-[#604a39] dark:bg-[#160d08]">
                        <strong>{days[schedule.dayOfWeek]}</strong>
                        <span className="font-sans text-sm font-black text-orisia-goldDark">{schedule.startTime.slice(0, 5)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}

          {!groups.length && (
            <div className="border border-orisia-line bg-orisia-paper p-7 font-sans text-sm dark:border-[#604a39] dark:bg-orisia-panel">
              {isBg ? "Няма активни групи." : "No active groups."}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
