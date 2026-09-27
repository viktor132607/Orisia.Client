"use client";

import { useEffect, useMemo, useState } from "react";
import PublicPageHeader from "../../components/PublicPageHeader";
import { api, type CalendarOccurrence, type GroupResponse } from "../../lib/api";
import useLanguage from "../../components/useLanguage";

const bgDays = ["Неделя", "Понеделник", "Вторник", "Сряда", "Четвъртък", "Петък", "Събота"];
const enDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function CalendarPage() {
  const isBg = useLanguage() === "bg";
  const [cursor, setCursor] = useState(() => new Date());
  const [items, setItems] = useState<CalendarOccurrence[]>([]);
  const [upcoming, setUpcoming] = useState<CalendarOccurrence[]>([]);
  const [groups, setGroups] = useState<GroupResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const year = cursor.getFullYear();
  const month = cursor.getMonth() + 1;

  useEffect(() => {
    setLoading(true);
    Promise.all([api.calendar.month(year, month), api.calendar.upcoming(10), api.groups.list()])
      .then(([calendarData, next, groupItems]) => {
        setItems(calendarData.items);
        setUpcoming(next);
        setGroups(groupItems);
      })
      .finally(() => setLoading(false));
  }, [year, month]);

  const first = new Date(year, month - 1, 1);
  const daysInMonth = new Date(year, month, 0).getDate();
  const mondayOffset = (first.getDay() + 6) % 7;
  const cells = Array.from({ length: Math.ceil((mondayOffset + daysInMonth) / 7) * 7 }, (_, index) => {
    const day = index - mondayOffset + 1;
    return day >= 1 && day <= daysInMonth ? day : null;
  });

  const grouped = useMemo(
    () => new Map<number, CalendarOccurrence[]>(
      Array.from({ length: daysInMonth }, (_, index) => [
        index + 1,
        items.filter((item) => new Date(item.startAt).getDate() === index + 1),
      ]),
    ),
    [items, daysInMonth],
  );

  const monthTitle = new Intl.DateTimeFormat(isBg ? "bg-BG" : "en-GB", { month: "long", year: "numeric" }).format(first);
  const weekdays = isBg ? ["ПОН", "ВТО", "СРЯ", "ЧЕТ", "ПЕТ", "СЪБ", "НЕД"] : ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const days = isBg ? bgDays : enDays;

  return (
    <main className="bg-[#faf8f5] font-sans text-orisia-ink">
      <PublicPageHeader
        eyebrow={isBg ? "ОРИСИЯ · ПРОГРАМА" : "ORISIA · SCHEDULE"}
        title={isBg ? "Календар" : "Calendar"}
        description={isBg ? "Събития и редовни репетиции на групите, събрани в един календар." : "Events and recurring group rehearsals in one calendar."}
      />

      <section className="py-12 md:py-20">
        <div className="mx-auto grid w-[min(1460px,calc(100%_-_40px))] gap-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(320px,.45fr)] max-[620px]:w-[min(100%_-_28px,1460px)]">
          <section className="overflow-hidden rounded-[24px] border border-orisia-line/45 bg-white shadow-[0_8px_26px_rgba(75,46,27,.04)]">
            <div className="flex items-center justify-between gap-3 border-b border-orisia-line/45 p-5 md:p-7">
              <button className="grid h-10 w-10 place-items-center rounded-full border border-orisia-line/55 bg-white text-lg hover:border-orisia-goldDark" onClick={() => setCursor(new Date(year, month - 2, 1))}>←</button>
              <h2 className="text-center text-2xl font-black uppercase capitalize md:text-3xl">{monthTitle}</h2>
              <button className="grid h-10 w-10 place-items-center rounded-full border border-orisia-line/55 bg-white text-lg hover:border-orisia-goldDark" onClick={() => setCursor(new Date(year, month, 1))}>→</button>
            </div>

            <div className="overflow-x-auto">
              <div className="min-w-[760px] p-4 md:p-6">
                <div className="grid grid-cols-7">
                  {weekdays.map((day) => <span key={day} className="border border-orisia-line/40 bg-[#f7f2ec] py-2 text-center text-[10px] font-black">{day}</span>)}
                  {cells.map((day, index) => (
                    <div key={index} className="min-h-28 border border-orisia-line/40 bg-white p-2">
                      {day && (
                        <>
                          <span className="text-xs font-bold">{day}</span>
                          {grouped.get(day)?.map((item) => (
                            <div key={item.occurrenceId} className={`mt-2 rounded-r-lg border-l-4 px-2 py-1.5 ${item.source === "group" ? "border-orisia-gold bg-[#fbf3e9]" : "border-orisia-goldDark bg-[#f5ece5]"}`}>
                              <span className="text-[9px] font-black uppercase tracking-[.08em] text-orisia-goldDark">{item.source === "group" ? (isBg ? "Група" : "Group") : (isBg ? "Събитие" : "Event")}</span>
                              <strong className="block text-xs leading-4">{isBg ? item.titleBg : item.titleEn || item.titleBg}</strong>
                              <time className="text-[10px] text-[#6b5847]">{item.allDay ? (isBg ? "Цял ден" : "All day") : new Date(item.startAt).toLocaleTimeString(isBg ? "bg-BG" : "en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Sofia" })}</time>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {loading && <p className="px-6 pb-5 text-xs text-[#6b5847]">{isBg ? "Обновяване…" : "Updating…"}</p>}
          </section>

          <aside className="grid content-start gap-6">
            <section className="rounded-2xl border border-orisia-line/45 bg-white p-6">
              <h2 className="text-2xl font-black uppercase">{isBg ? "Предстоящи" : "Upcoming"}</h2>
              <div className="mt-5 grid gap-3">
                {upcoming.length ? upcoming.map((item) => (
                  <article key={item.occurrenceId} className="rounded-xl border border-orisia-line/45 bg-[#faf8f5] p-4">
                    <span className="text-[9px] font-black uppercase tracking-[.1em] text-orisia-goldDark">{item.source === "group" ? (isBg ? "Репетиция" : "Rehearsal") : (isBg ? "Събитие" : "Event")}</span>
                    <time className="mt-1 block text-[10px] text-[#6b5847]">{item.allDay ? `${new Date(item.startAt).toLocaleDateString(isBg ? "bg-BG" : "en-GB", { timeZone: "UTC" })} · ${isBg ? "Цял ден" : "All day"}` : new Date(item.startAt).toLocaleString(isBg ? "bg-BG" : "en-GB", { timeZone: "Europe/Sofia" })}</time>
                    <h3 className="mt-1 text-lg font-black">{isBg ? item.titleBg : item.titleEn || item.titleBg}</h3>
                  </article>
                )) : <p className="text-sm text-[#6b5847]">{isBg ? "Няма предстоящи събития." : "No upcoming events."}</p>}
              </div>
            </section>

            <section className="rounded-2xl border border-orisia-line/45 bg-white p-6">
              <h2 className="text-xl font-black uppercase">{isBg ? "Седмичен график" : "Weekly schedule"}</h2>
              <div className="mt-4 grid gap-4">
                {groups.map((group) => (
                  <div key={group.id} className="border-b border-orisia-line/40 pb-4 last:border-0 last:pb-0">
                    <strong className="block">{isBg ? group.nameBg : group.nameEn || group.nameBg}</strong>
                    <div className="mt-2 grid gap-1 text-xs text-[#6b5847]">
                      {group.schedules.map((schedule) => <span key={schedule.id}>{days[schedule.dayOfWeek]} · {schedule.startTime.slice(0, 5)}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}
