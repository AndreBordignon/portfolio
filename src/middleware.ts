import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

// Cria o middleware de internacionalização
const intlMiddleware = createMiddleware(routing);

export function middleware(req: NextRequest) {
  // 1. Executa o middleware de internacionalização primeiro
  const intlResponse = intlMiddleware(req);

  // 2. Adiciona a lógica do A/B test
  const bucket = Math.random() < 0.5 ? "A" : "B";
  const cookie = req.cookies.get("ab-test-variant");

  // Se não tem cookie, define um
  if (!cookie) {
    intlResponse.cookies.set("ab-test-variant", bucket, {
      maxAge: 60 * 60 * 24 * 30, // 30 dias
    });
  }

  // Adiciona header para usar no componente
  intlResponse.headers.set("x-ab-test-variant", cookie?.value || bucket);

  return intlResponse;
}

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(pt-BR|en)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
