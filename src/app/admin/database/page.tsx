"use client";

import { useEffect, useState } from "react";
import { api, clearSession } from "../../../lib/api";
import useLanguage from "../../../components/useLanguage";

export default function DatabaseBackupPage() {
  const isBg = useLanguage() === "bg";
  const [allowed, setAllowed] = useState<boolean | null>(null);
  const [archive, setArchive] = useState<File | null>(null);
  const [confirmation, setConfirmation] = useState("");
  const [busy, setBusy] = useState<"export" | "restore" | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => { api.auth.me().then(user => setAllowed(user.role === "Admin")).catch(() => setAllowed(false)); }, []);

  async function exportDatabase() {
    setBusy("export"); setError(""); setMessage("");
    try {
      const blob = await api.databaseBackup.export();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `orisia-full-database-${new Date().toISOString().replaceAll(":", "-")}.dump`;
      document.body.appendChild(link); link.click(); link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
      setMessage(isBg ? "Архивът е готов за изтегляне." : "The backup is ready to download.");
    } catch (e) { setError(e instanceof Error ? e.message : "Export failed"); }
    finally { setBusy(null); }
  }

  async function restoreDatabase(event: React.FormEvent) {
    event.preventDefault();
    if (!archive || confirmation !== "RESTORE ORISIA") return;
    setBusy("restore"); setError(""); setMessage("");
    try {
      await api.databaseBackup.restore(archive, confirmation);
      clearSession();
      setMessage(isBg ? "Базата е възстановена. Влезте отново с акаунт от архива." : "Database restored. Sign in again with an account from the backup.");
      setAllowed(false);
    } catch (e) { setError(e instanceof Error ? e.message : "Restore failed"); }
    finally { setBusy(null); }
  }

  const button = "rounded border border-orisia-goldDark bg-orisia-gold px-5 py-3 font-sans text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50";
  return <main className="min-h-[60vh] bg-orisia-cream py-10 dark:bg-orisia-dark">
    <div className="mx-auto max-w-4xl space-y-6 px-4">
      <h1 className="text-3xl font-bold">{isBg ? "Архивиране на базата" : "Database backup"}</h1>
      {error && <p role="alert" className="rounded border border-red-400 p-4 text-red-700 dark:text-red-300">{error}</p>}
      {message && <p role="status" className="rounded border border-green-500 p-4">{message} {!allowed && <a className="underline" href="/login/">{isBg ? "Вход" : "Sign in"}</a>}</p>}
      {allowed === null ? <p>Loading…</p> : !allowed ? <p>{isBg ? "Достъп само за администратори." : "Administrator access required."}</p> : <>
        <section className="space-y-4 rounded border border-orisia-line bg-orisia-paper p-6 dark:bg-orisia-panel">
          <h2 className="text-2xl font-bold">{isBg ? "Пълен експорт" : "Full export"}</h2>
          <p className="font-sans text-sm">{isBg ? "Всички таблици, записи, потребители, връзки и история на миграциите в PostgreSQL .dump архив. Архивът съдържа чувствителни данни — пазете го на сигурно място." : "All tables, rows, users, relationships and migration history in a PostgreSQL .dump archive. The backup contains sensitive data — store it securely."}</p>
          <p className="font-sans text-sm">{isBg ? "Файловете на качените снимки не са част от базата и се архивират отделно." : "Uploaded image files are outside the database and must be backed up separately."}</p>
          <button type="button" disabled={!!busy} onClick={exportDatabase} className={button}>{busy === "export" ? (isBg ? "Архивиране…" : "Exporting…") : (isBg ? "Изтегли пълен архив" : "Download full backup")}</button>
        </section>
        <form onSubmit={restoreDatabase} className="space-y-4 rounded border border-red-400 bg-orisia-paper p-6 dark:bg-orisia-panel">
          <h2 className="text-2xl font-bold">{isBg ? "Възстановяване" : "Restore"}</h2>
          <p className="font-sans text-sm">{isBg ? "Възстановяването заменя данните в таблиците от архива. Първо изтеглете текущ архив и спрете редакциите. Използвайте само доверен архив от Orisia със съвместима версия на схемата. До 512 MB." : "Restore replaces the data in the archived tables. Download a current backup first and pause edits. Use only a trusted Orisia backup with a compatible schema version. Up to 512 MB."}</p>
          <label className="block font-sans text-sm">{isBg ? "PostgreSQL архив" : "PostgreSQL backup"}
            <input type="file" accept=".dump" required disabled={!!busy} className="mt-2 block w-full min-w-0" onChange={e => {
              const file = e.target.files?.[0] ?? null;
              if (file && (file.size === 0 || file.size > 536870912)) { setError(isBg ? "Изберете непразен архив до 512 MB." : "Select a non-empty backup up to 512 MB."); setArchive(null); }
              else { setArchive(file); setError(""); }
            }} />
          </label>
          <label className="block font-sans text-sm">{isBg ? "За потвърждение напишете" : "To confirm, type"} RESTORE ORISIA
            <input value={confirmation} onChange={e => setConfirmation(e.target.value)} disabled={!!busy} autoComplete="off" className="mt-2 block w-full rounded border border-orisia-line bg-transparent p-3" />
          </label>
          <button type="submit" disabled={!!busy || !archive || confirmation !== "RESTORE ORISIA"} className={button}>{busy === "restore" ? (isBg ? "Възстановяване…" : "Restoring…") : (isBg ? "Възстанови базата" : "Restore database")}</button>
        </form>
      </>}
    </div>
  </main>;
}
