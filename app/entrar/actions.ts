"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE_NAME, COOKIE_MAX_AGE, getPassword, safeEqual } from "@/lib/auth";

export async function entrar(formData: FormData) {
  const input = String(formData.get("password") ?? "").trim();
  const expected = getPassword();

  if (!input || !safeEqual(input, expected)) {
    redirect("/entrar?erro=1");
  }

  const jar = await cookies();
  jar.set(COOKIE_NAME, expected, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });

  redirect("/");
}
