import { readFileSync } from "node:fs";
import path from "node:path";

export const dynamic = "force-static";

export function GET() {
  const base64 = Array.from({ length: 7 }, (_, index) => {
    const part = `part${String(index).padStart(2, "0")}.txt`;
    return readFileSync(path.join(process.cwd(), "logo_parts", part), "utf8").trim();
  }).join("");

  const image = Buffer.from(base64, "base64");

  return new Response(image, {
    headers: {
      "Content-Type": "image/jpeg",
      "Content-Length": String(image.length),
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
