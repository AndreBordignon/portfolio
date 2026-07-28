import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // `/pt-BR` era a URL canônica antiga e está indexada. Com localePrefix
      // 'as-needed' o português passou para a raiz, e o next-intl redireciona
      // com 307 (temporário) — que não consolida sinal nenhum. Estes vêm antes
      // do middleware e devolvem 308 permanente.
      { source: "/pt-BR", destination: "/", permanent: true },
      { source: "/pt-BR/:path*", destination: "/:path*", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
