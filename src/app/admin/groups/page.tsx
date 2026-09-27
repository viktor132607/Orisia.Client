"use client";

import { FormEvent, useEffect, useState } from "react";
import { api, type GroupResponse } from "../../../lib/api";
import useLanguage from "../../../components/useLanguage";

type ScheduleForm = { dayOfWeek: number; startTime: string; durationMinutes: number };
type GroupForm = {
  id?: string;
  nameBg: string;
  nameEn: string;
  descriptionBg: string;
  descriptionEn: string;
  location: string;
  active: boolean;
  sortOrder: number;
  schedules: ScheduleForm[];
};

const empty: GroupForm = {
  nameBg: "",
  nameEn: "",
  descriptionBg: "",
  descriptionEn: "",
  location: "гр. Русе, ул. Родина 80",
  active: true,
  sortOrder: 0,
  schedules: [
    { dayOfWeek: 4, startTime: "19:00", durationMinutes: 90 },
    { dayOfWeek: 6, startTime: "19:00", durationMinutes: 90 },
  ],
};

const bgDays = ["Неделя", "Понеделник", "Вторник", "Сряда", "Четвъртък", "Петък", "Събота"];
const enDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function AdminGroupsPage() {
  const isBg = useLanguage() === "bg";
  const [items, setItems] = useState<GroupResponse[]>([]);
  const [form, setForm] = useState<GroupForm>(empty);
  const [error, setError] = useState("");
  const input = "min-h-11 w-full border border-orisia-line bg-white px-3 font-sans text-sm";
  const days = isBg ? bgDays : enDays;

  const load = () => api.groups.adminList().then(setItems).catch((e: Error) => setError(e.message));
  useEffect(() => { void load(); }, []);

  const setSchedule = (index: number, patch: Partial<ScheduleForm>) => {
    setForm(current => ({
      ...current,
      schedules: current.schedules.map((item, i) => i === index ? { ...item, ...patch } : item),
    }));
  };

  const addSchedule = () => setForm(current => ({
    ...current,
    schedules: [...current.schedules, { dayOfWeek: 1, startTime: "19:00", durationMinutes: 90 }],
  }));

  const removeSchedule = (index: number) => setForm(current => ({
    ...current,
    schedules: current.schedules.filter((_, i) => i !== index),
  }));

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");

    const body = {
      nameBg: form.nameBg,
      nameEn: form.nameEn || form.nameBg,
      descriptionBg: form.descriptionBg,
      descriptionEn: form.descriptionEn || form.descriptionBg,
      location: form.location || null,
      active: form.active,
      sortOrder: form.sortOrder,
      schedules: form.schedules,
    };

    try {
      if (form.id) await api.groups.update(form.id, body);
      else await api.groups.create(body);
      setForm(empty);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
    }
  }

  const edit = (item: GroupResponse) => setForm({
    id: item.id,
    nameBg: item.nameBg,
    nameEn: item.nameEn,
    descriptionBg: item.descriptionBg,
    descriptionEn: item.descriptionEn,
    location: item.location || "",
    active: item.active,
    sortOrder: item.sortOrder,
    schedules: item.schedules.map(schedule => ({
      dayOfWeek: schedule.dayOfWeek,
      startTime: schedule.startTime.slice(0, 5),
      durationMinutes: schedule.durationMinutes,
    })),
  });

  const remove = async (id: string) => {
    if (!confirm(isBg ? "Изтриване на групата?" : "Delete group?")) return;
    try {
      await api.groups.delete(id);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
    }
  };

  return (
    <main className="bg-orisia-cream py-10">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 lg:grid-cols-[.95fr_1.05fr]">
        <form onSubmit={submit} className="border border-orisia-line bg-orisia-paper p-6">
          <h1 className="text-3xl font-bold">{form.id ? (isBg ? "Редакция на група" : "Edit group") : (isBg ? "Нова група" : "New group")}</h1>
          <div className="mt-5 grid gap-3">
            <input required className={input} placeholder="Име BG" value={form.nameBg} onChange={e => setForm({ ...form, nameBg: e.target.value })} />
            <input className={input} placeholder="Name EN" value={form.nameEn} onChange={e => setForm({ ...form, nameEn: e.target.value })} />
            <textarea required className={`${input} min-h-24 py-3`} placeholder="Описание BG" value={form.descriptionBg} onChange={e => setForm({ ...form, descriptionBg: e.target.value })} />
            <textarea className={`${input} min-h-24 py-3`} placeholder="Description EN" value={form.descriptionEn} onChange={e => setForm({ ...form, descriptionEn: e.target.value })} />
            <input className={input} placeholder={isBg ? "Място" : "Location"} value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />

            <div className="border border-orisia-line p-4">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl font-bold">{isBg ? "Седмичен график" : "Weekly schedule"}</h2>
                <button type="button" className="border border-orisia-goldDark px-3 py-2 font-sans text-xs font-black uppercase" onClick={addSchedule}>+ {isBg ? "Час" : "Slot"}</button>
              </div>
              <div className="mt-3 grid gap-3">
                {form.schedules.map((schedule, index) => (
                  <div key={index} className="grid gap-2 sm:grid-cols-[1fr_110px_100px_auto]">
                    <select className={input} value={schedule.dayOfWeek} onChange={e => setSchedule(index, { dayOfWeek: Number(e.target.value) })}>
                      {days.map((day, dayIndex) => <option key={day} value={dayIndex}>{day}</option>)}
                    </select>
                    <input required type="time" className={input} value={schedule.startTime} onChange={e => setSchedule(index, { startTime: e.target.value })} />
                    <input required type="number" min={30} max={360} className={input} value={schedule.durationMinutes} onChange={e => setSchedule(index, { durationMinutes: Number(e.target.value) })} />
                    <button type="button" className="px-3 font-sans text-xs font-bold text-red-700" onClick={() => removeSchedule(index)}>×</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <label className="font-sans text-sm"><span className="mb-1 block">{isBg ? "Подредба" : "Sort order"}</span><input type="number" className={input} value={form.sortOrder} onChange={e => setForm({ ...form, sortOrder: Number(e.target.value) })} /></label>
              <label className="flex items-center gap-2 font-sans text-sm"><input type="checkbox" checked={form.active} onChange={e => setForm({ ...form, active: e.target.checked })} /> {isBg ? "Активна" : "Active"}</label>
            </div>

            <button className="bg-orisia-gold px-4 py-3 font-sans text-xs font-black uppercase text-white">{form.id ? (isBg ? "Запази" : "Save") : (isBg ? "Създай" : "Create")}</button>
            {form.id && <button type="button" onClick={() => setForm(empty)} className="font-sans text-xs font-bold uppercase">{isBg ? "Отказ" : "Cancel"}</button>}
            {error && <p className="font-sans text-sm text-red-700">{error}</p>}
          </div>
        </form>

        <section className="border border-orisia-line bg-orisia-paper p-6">
          <h2 className="text-3xl font-bold">{isBg ? "Групи" : "Groups"}</h2>
          <div className="mt-5 grid gap-3">
            {items.map(item => (
              <article className="border border-orisia-line p-4" key={item.id}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <strong className="text-lg">{item.nameBg}</strong>
                    <p className="mt-1 font-sans text-xs">{item.active ? (isBg ? "Активна" : "Active") : (isBg ? "Неактивна" : "Inactive")}</p>
                    <p className="mt-2 font-sans text-xs text-[#725b47]">{item.schedules.map(s => `${days[s.dayOfWeek]} ${s.startTime.slice(0, 5)}`).join(" · ")}</p>
                  </div>
                  <div className="flex gap-3 font-sans text-xs">
                    <button onClick={() => edit(item)}>{isBg ? "Редакция" : "Edit"}</button>
                    <button className="text-red-700" onClick={() => void remove(item.id)}>{isBg ? "Изтрий" : "Delete"}</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
