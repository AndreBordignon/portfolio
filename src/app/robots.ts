import type { MetadataRoute } from "next";
import { baseUrl } from "@/lib/site";

/**
 * Crawlers de IA liberados de propósito: o objetivo é ser citado por
 * ChatGPT, Claude, Perplexity e afins, e bloquear o robô é abrir mão disso.
 *
 * Atenção: se o firewall da Vercel estiver com bloqueio de bot de IA ligado,
 * este arquivo não adianta nada — o robô toma 403 antes de ler o robots.txt.
 */
const aiCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "meta-externalagent",
  "cohere-ai",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: aiCrawlers,
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
