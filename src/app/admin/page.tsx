"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRightIcon, CalendarDaysIcon, ChatBubbleLeftRightIcon, CircleStackIcon, NewspaperIcon, PhotoIcon, RectangleStackIcon, UserGroupIcon, UsersIcon } from "@heroicons/react/24/outline";
import { api, type AdminDashboardResponse } from "../../lib/api";
import useLanguage from "../../components/useLanguage";

const icons = [UsersIcon, NewspaperIcon, CalendarDaysIcon, ChatBubbleLeftRightIcon, ChatBubbleLeftRightIcon, RectangleStackIcon, PhotoIcon, UserGroupIcon];

export default function AdminPage() {
  const isBg = useLanguage() === "bg";
  const [data, setData] = useState<AdminDashboardResponse | null>(null);
  const [error, setError] = useState("");

  useEffect(() => { api.dashboard.get().then(setData).catch((e: Error) => setError(e.message)); }, []);
  if (error) return <main><div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-5 text-red-700">{error}</div></main>;
  if (!data) return <main className="grid place-items-center"><p role="status">{isBg ? "Зареждане на таблото…" : "Loading dashboard…"}</p></main>;

  const cards = [
    [isBg ? "Потребители" : "Users", data.users.total, "/admin/users/"],
    [isBg ? "Публикации" : "Posts", data.posts.total, "/admin/home/"],
    [isBg ? "Предстоящи събития" : "Upcoming events", data.events.upcoming, "/admin/events/"],
    [isBg ? "Нови запитвания" : "New inquiries", data.inquiries.new, "/admin/messages/"],
    [isBg ? "Чакащи отзиви" : "Pending reviews", data.reviews.pending, "/admin/reviews/"],
    [isBg ? "Медийни файлове" : "Media files", data.media.total, "/admin/media/"],
    [isBg ? "Албуми" : "Albums", data.gallery.albums, "/admin/gallery/"],
    [isBg ? "Хора" : "Dances", data.dances.total, "/admin/horoteka/"],
  ] as const;

  return <main><div>
    <div className="flex flex-wrap items-end justify-between gap-4"><div><span className="text-[11px] font-bold uppercase tracking-[.12em] text-[#0a7564]">{isBg ? "Работно пространство" : "Workspace"}</span><h1 className="mt-2">{isBg ? "Общ преглед" : "Overview"}</h1><p className="mt-2 text-sm text-[#62777c]">{isBg ? "Съдържание, заявки и активност на едно място." : "Content, requests and activity in one place."}</p></div><span className="admin-status">{isBg ? "Актуални данни" : "Live data"}</span></div>
    <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{cards.map(([title, value, href], index) => {
      const Icon = icons[index];
      return <Link href={href} key={href} className="admin-stat"><div className="flex items-center justify-between gap-3"><span className="admin-stat-label">{title}</span><Icon className="h-5 w-5 text-[#0a7564]" aria-hidden="true" /></div><strong className="admin-stat-value">{value}</strong><span className="admin-stat-view">{isBg ? "Отвори раздела" : "Open section"} <ArrowRightIcon className="ml-1 inline h-3 w-3" aria-hidden="true" /></span></Link>;
    })}</div>
    <div className="mt-7 grid gap-5 xl:grid-cols-2">
      <section className="admin-panel"><div className="mb-4 flex items-center justify-between gap-3"><div><h2>{isBg ? "Последни запитвания" : "Recent inquiries"}</h2><p className="mt-1 text-xs text-[#6b8185]">{isBg ? "Получени съобщения от сайта" : "Messages from the website"}</p></div><Link href="/admin/messages/" className="text-xs font-bold text-[#0a7564]">{isBg ? "Виж всички" : "View all"}</Link></div>{data.recentInquiries.length ? data.recentInquiries.map(item => <div key={item.id} className="admin-panel-row"><div className="min-w-0"><strong className="block truncate">{item.subject}</strong><small>{item.name}</small></div><span className={`admin-status ${item.status === 0 ? "pending" : ""}`}>{item.status === 0 ? (isBg ? "Ново" : "New") : (isBg ? "Прегледано" : "Viewed")}</span></div>) : <p className="border-t border-[#e8eeef] py-5 text-sm text-[#6b8185]">{isBg ? "Няма получени запитвания." : "No inquiries yet."}</p>}</section>
      <section className="admin-panel"><div className="mb-4 flex items-center justify-between gap-3"><div><h2>{isBg ? "Предстоящи събития" : "Upcoming events"}</h2><p className="mt-1 text-xs text-[#6b8185]">{isBg ? "Планирани активности" : "Scheduled activities"}</p></div><Link href="/admin/events/" className="text-xs font-bold text-[#0a7564]">{isBg ? "Виж всички" : "View all"}</Link></div>{data.upcomingEvents.length ? data.upcomingEvents.map(item => <div key={item.id} className="admin-panel-row"><div className="min-w-0"><strong className="block truncate">{item.titleBg}</strong><small>{item.location || (isBg ? "Без посочено място" : "No location")}</small></div><time className="shrink-0 text-right text-xs font-semibold text-[#426059]" dateTime={item.startAt}>{new Date(item.startAt).toLocaleDateString(isBg ? "bg-BG" : "en-GB", { day: "numeric", month: "short" })}</time></div>) : <p className="border-t border-[#e8eeef] py-5 text-sm text-[#6b8185]">{isBg ? "Няма предстоящи събития." : "No upcoming events."}</p>}</section>
    </div>
    <div className="mt-5 flex items-center gap-2 text-xs text-[#71868a]"><CircleStackIcon className="h-4 w-4" />{isBg ? "Данните се зареждат от ОРИСИЯ API." : "Data is loaded from the ORISIA API."}</div>
  </div></main>;
}
