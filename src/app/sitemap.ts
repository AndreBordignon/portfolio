import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { absoluteUrl, type HrefFor } from "@/lib/seo";
import { services } from "@/data/services";
import { projects, type Locale } from "@/data/projects";

const locales = routing.locales as readonly Locale[];

type Entry = {
  href: HrefFor;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
};

/**
 * Uma entrada por rota × idioma, com alternates recíprocos.
 * As URLs saem do mesmo `absoluteUrl` que gera o canonical — se divergirem,
 * o sitemap passa a apontar para páginas que se declaram canônicas em outro
 * lugar, que é a forma mais rápida de desperdiçar rastreio.
 */
const entries: Entry[] = [
  { href: { pathname: "/" }, priority: 1, changeFrequency: "weekly" },
  { href: { pathname: "/servicos" }, priority: 0.9, changeFrequency: "monthly" },
  { href: { pathname: "/cases" }, priority: 0.8, changeFrequency: "monthly" },
  { href: { pathname: "/sobre" }, priority: 0.7, changeFrequency: "yearly" },

  ...services.map<Entry>((service) => ({
    href: (locale: Locale) => ({
      pathname: "/servicos/[slug]" as const,
      params: { slug: service.slug[locale] },
    }),
    priority: 0.9,
    changeFrequency: "monthly",
  })),

  ...projects.map<Entry>((project) => ({
    href: { pathname: "/cases/[slug]" as const, params: { slug: project.slug } },
    priority: 0.7,
    changeFrequency: "yearly",
  })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return entries.flatMap(({ href, priority, changeFrequency }) =>
    locales.map((locale) => ({
      url: absoluteUrl(href, locale),
      lastModified,
      changeFrequency,
      priority: locale === routing.defaultLocale ? priority : priority * 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, absoluteUrl(href, l)]),
        ),
      },
    })),
  );
}
