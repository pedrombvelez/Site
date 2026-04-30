import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import path from "node:path";
import fs from "node:fs/promises";
import { COOKIE_NAME, getPassword, safeEqual } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MIME: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".avif": "image/avif",
  ".heic": "image/heic",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".mov": "video/quicktime",
  ".m4v": "video/mp4",
  ".m4a": "audio/mp4",
  ".mp3": "audio/mpeg",
};

const PRIVATE_DIR = path.join(process.cwd(), "private-media");

export async function GET(
  _req: Request,
  context: { params: Promise<{ path: string[] }> },
) {
  // 1) Cookie gate (a middleware já gateia, mas defesa em profundidade)
  const jar = await cookies();
  const cookie = jar.get(COOKIE_NAME)?.value ?? "";
  if (!cookie || !safeEqual(cookie, getPassword())) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  // 2) Resolver caminho com proteção contra path traversal
  const { path: segments } = await context.params;
  if (!segments || segments.length === 0) {
    return new NextResponse("Not found", { status: 404 });
  }
  const rel = segments.join("/");
  const resolved = path.resolve(PRIVATE_DIR, rel);
  if (!resolved.startsWith(PRIVATE_DIR + path.sep) && resolved !== PRIVATE_DIR) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  // 3) Ler ficheiro
  let data: Buffer;
  try {
    data = await fs.readFile(resolved);
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }

  const ext = path.extname(resolved).toLowerCase();
  const contentType = MIME[ext] ?? "application/octet-stream";

  return new NextResponse(new Uint8Array(data), {
    headers: {
      "Content-Type": contentType,
      "Content-Length": String(data.byteLength),
      "Cache-Control": "private, max-age=300, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
