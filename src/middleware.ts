import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

export default createMiddleware(routing);

export function middleware(req: NextRequest) {
  // Define qual variante mostrar (50% cada)
  const bucket = Math.random() < 0.5 ? "A" : "B";

  // Pega ou cria o cookie
  const cookie = req.cookies.get("ab-test-variant");
  const response = NextResponse.next();

  // Se não tem cookie, define um
  if (!cookie) {
    response.cookies.set("ab-test-variant", bucket, {
      maxAge: 60 * 60 * 24 * 30, // 30 dias
    });
  }

  // Adiciona header para usar no componente
  response.headers.set("x-ab-test-variant", cookie?.value || bucket);

  return response;
}

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(pt-BR|en)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
