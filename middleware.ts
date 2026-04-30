import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME, getPassword, safeEqual } from "@/lib/auth";

export function middleware(req: NextRequest) {
  const cookie = req.cookies.get(COOKIE_NAME)?.value ?? "";
  const expected = getPassword();

  if (cookie && safeEqual(cookie, expected)) {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  url.pathname = "/entrar";
  url.search = "";
  return NextResponse.redirect(url);
}

export const config = {
  // Aplica a tudo EXCETO: /entrar (a página de login), assets de Next/fontes,
  // robots.txt e favicon. Tudo o resto (incluindo /api/asset/*) precisa de cookie.
  matcher: [
    "/((?!entrar|_next|robots\\.txt|favicon\\.ico).*)",
  ],
};
