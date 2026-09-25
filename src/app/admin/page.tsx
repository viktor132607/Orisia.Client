"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { api, type AdminDashboardResponse } from "../../lib/api";
import useLanguage from "../../components/useLanguage";

export default function AdminPage() {
  const isBg = useLanguage() === "bg"; const [data, setData] = useState<AdminDashboardResponse | null>(null); const [error, setError] = useState("");
  useEffect(() => { api.dashboard.get().then(setData).catch((e: Error) => setError(e.message)); }, []);
  if (error) return <main className="p-8 text-red-700">{error}</main>;
  if (!data) return <main className="grid min-h-[50vh] place-items-center">Loading…</main>;
  const cards = [
    [isBg ? "Потребители" : "Users", data.users.total, "/admin/users/"],
    [isBg ? "Публикации" : "Posts", data.posts.total, "/admin/home/"],
    [isBg ? "Предстоящи събития" : "Upcoming events", data.events.upcoming, "/admin/events/"],
    [isBg ? "Нови запитвания" : "New inquiries", data.inquiries.new, "/admin/messages/"],
    [isBg ? "Чакащи отзиви" : "Pending reviews", data.reviews.pending, "/admin/reviews/"],
    [isBg ? "Медия" : "Media", data.media.total, "/admin/media/"],
    [isBg ? "Албуми" : "Albums", data.gallery.albums, "/admin/gallery/"],
    [isBg ? "Хора" : "Dances", data.dances.total, "/admin/horoteka/"],
  ] as const;
  return <main className="bg-orisia-cream py-10 dark:bg-orisia-dark"><div className="mx-auto max-w-7xl px-4"><header><h1 className="text-4xl font-bold">{isBg ? "Админ табло" : "Admin dashboard"}</h1><p className="mt-2 font-sans text-sm text-[#725b47]">{isBg ? "Реални данни от backend-а." : "Live backend metrics."}</p></header><div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{cards.map(([title,value,href]) => <Link href={href} key={href} className="border border-orisia-line bg-orisia-paper p-6 dark:bg-orisia-panel"><span className="font-sans text-xs font-black uppercase text-orisia-goldDark">{title}</span><strong className="mt-3 block text-4xl">{value}</strong></Link>)}</div><div className="mt-8 grid gap-6 lg:grid-cols-2"><section className="border border-orisia-line bg-orisia-paper p-6 dark:bg-orisia-panel"><h2 className="text-2xl font-bold">{isBg ? "Последни запитвания" : "Recent inquiries"}</h2><div className="mt-4 grid gap-2">{data.recentInquiries.map(x => <div key={x.id} className="border-t border-orisia-line py-3"><strong>{x.subject}</strong><p className="font-sans text-xs">{x.name}</p></div>)}</div></section><section className="border border-orisia-line bg-orisia-paper p-6 dark:bg-orisia-panel"><h2 className="text-2xl font-bold">{isBg ? "Следващи събития" : "Upcoming events"}</h2><div className="mt-4 grid gap-2">{data.upcomingEvents.map(x => <div key={x.id} className="border-t border-orisia-line py-3"><strong>{x.titleBg}</strong><p className="font-sans text-xs">{new Date(x.startAt).toLocaleString()}</p></div>)}</div></section></div></div></main>;
}
