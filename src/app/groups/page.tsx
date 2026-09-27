"use client";

import { useEffect, useMemo, useState } from "react";
import PublicPageHeader from "../../components/PublicPageHeader";
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
        setUpcoming(calendarItems.filter((item) => item.source === "group"));
      })
      .catch(() => {
        setGroups([]);
        setUpcoming([]);
      });
  }, []);

  const nextByGroup = useMemo(() => {
    const map = new Map<string, CalendarOccurrence>();
    for (const item of upcoming) if (item.groupId && !map.has(item.groupId)) map.set(item.groupId, item);
    return map;
  }, [upcoming]);

  const days = isBg ? bgDays : enDays;

  return (
    <main className="bg-[#faf8f5] font-sans text-orisia-ink">
      <PublicPageHeader
        eyebrow={isBg ? "ОРИСИЯ · ГРУПИ" : "ORISIA · GROUPS"}
        title={isBg ? "Групи и график" : "Groups & schedule"}
        description={isBg ? "Седмични репетиции, часове и място за всяка активна танцова група." : "Weekly rehearsals, times and locations for each active dance group."}
      />

      <section className="py-12 md:py-20">
        <div className="mx-auto grid w-[min(1460px,calc(100%_-_40px))] gap-6 lg:grid-cols-2 max-[620px]:w-[min(100%_-_28px,1460px)]">
          {groups.map((group) => {
            const next = nextByGroup.get(group.id);
            return (
              <article key={group.id} className="overflow-hidden rounded-[24px] border border-orisia-line/45 bg-white shadow-[0_8px_26px_rgba(75,46,27,.04)]">
                <div className="border-b border-orisia-line/45 p-7 md:p-9">
                  <div className="flex flex-wrap items-start justify-between gap-5">
                    <div>
                      <span className="text-[11px] font-black uppercase tracking-[.15em] text-orisia-goldDark">{isBg ? "ТАНЦОВА ГРУПА" : "DANCE GROUP"}</span>
                      <h2 className="mt-2 text-[clamp(30px,4vw,44px)] font-black uppercase leading-none">{isBg ? group.nameBg : group.nameEn || group.nameBg}</h2>
                      {group.location && <p className="mt-3 text-sm font-bold text-orisia-goldDark">⌖ {group.location}</p>}
                    </div>
                    {next && (
                      <div className="rounded-2xl border border-orisia-line/55 bg-[#f6efe7] px-4 py-3 text-right">
                        <span className="block text-[10px] font-black uppercase tracking-[.12em] text-orisia-goldDark">{isBg ? "Следваща репетиция" : "Next rehearsal"}</span>
                        <strong className="mt-1 block text-sm">{new Date(next.startAt).toLocaleString(isBg ? "bg-BG" : "en-GB", { weekday: "short", day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit", timeZone: "Europe/Sofia" })}</strong>
                      </div>
                    )}
                  </div>
                  <p className="mt-5 text-[16px] leading-8 text-[#6b5847]">{isBg ? group.descriptionBg : group.descriptionEn || group.descriptionBg}</p>
                </div>

                <div className="p-7 md:p-9">
                  <h3 className="text-sm font-black uppercase tracking-[.15em] text-orisia-goldDark">{isBg ? "Седмичен график" : "Weekly schedule"}</h3>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {group.schedules.map((schedule) => (
                      <div key={schedule.id} className="flex items-center justify-between rounded-xl border border-orisia-line/45 bg-[#faf8f5] px-4 py-3">
                        <strong>{days[schedule.dayOfWeek]}</strong>
                        <span className="font-black text-orisia-goldDark">{schedule.startTime.slice(0, 5)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}

          {!groups.length && <p className="py-12 text-[#6b5847]">{isBg ? "Няма активни групи." : "No active groups."}</p>}
        </div>
      </section>
    </main>
  );
}
