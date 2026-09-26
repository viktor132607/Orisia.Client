import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { api } from "./api";

describe("database backup API", () => {
  const fetchMock = vi.fn();
  beforeEach(() => {
    vi.stubGlobal("fetch", fetchMock);
    vi.stubGlobal("window", { localStorage: { getItem: () => "test-token" } });
  });
  afterEach(() => { vi.unstubAllGlobals(); fetchMock.mockReset(); });

  it("downloads a binary archive with authorization and no caching", async () => {
    fetchMock.mockResolvedValue(new Response("PGDMParchive"));
    const blob = await api.databaseBackup.export();
    expect(await blob.text()).toBe("PGDMParchive");
    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining("/database-backup/export"), {
      headers: { Authorization: "Bearer test-token" }, cache: "no-store",
    });
  });

  it("submits the original archive and explicit confirmation as multipart", async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ message: "restored", restoredAtUtc: "now" })));
    const file = new File(["PGDMP"], "backup.dump");
    await api.databaseBackup.restore(file, "RESTORE ORISIA");
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toContain("/database-backup/restore");
    expect(init.body.get("archive")).toBe(file);
    expect(init.body.get("confirmation")).toBe("RESTORE ORISIA");
    expect(init.headers.has("Content-Type")).toBe(false);
    expect(init.headers.get("Authorization")).toBe("Bearer test-token");
  });

  it("does not retry or replay a failed restore", async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 }));
    await expect(api.databaseBackup.restore(new File(["PGDMP"], "backup.dump"), "RESTORE ORISIA")).rejects.toThrow("Unauthorized");
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("surfaces export errors instead of downloading an error as an archive", async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ message: "Backup unavailable" }), { status: 503 }));
    await expect(api.databaseBackup.export()).rejects.toThrow("Backup unavailable");
  });
});
