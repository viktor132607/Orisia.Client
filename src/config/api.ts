export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:10000/api";

export async function readApiJson<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("content-type") || "";
  const text = await response.text();

  if (!contentType.includes("application/json")) {
    throw new Error(
      text.startsWith("<!DOCTYPE") || text.includes("<html")
        ? "API did not return JSON. Check that the Web API is running and NEXT_PUBLIC_API_URL points to it."
        : text || "API did not return JSON."
    );
  }

  return JSON.parse(text) as T;
}
