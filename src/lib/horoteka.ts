import type { DanceResponse } from "./api";

export type HorotekaDance = DanceResponse;

export function durationIso(seconds?: number | null) {
  if (!seconds) return undefined;
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `PT${minutes ? `${minutes}M` : ""}${rest ? `${rest}S` : ""}`;
}
