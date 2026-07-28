import type { Metadata } from "next";
import { getPathname, routing, type Pathname } from "@/i18n/routing";
import { baseUrl, ogLocale, person, siteName } from "@/lib/site";
import type { Locale } from "@/data/projects";

export type Href = { pathname: Pathname; params?: Record<string, string> };

/**
 * Rotas com slug traduzido (`/servicos/programador-freelance` vs
 * `/services/freelance-developer`) precisam de params diferentes por idioma —
 * por isso o href pode ser uma função do locale, e não um objeto fixo.
 */
export type HrefFor = Href | ((locale: Locale) => Href);

const resolve = (href: HrefFor, locale: Locale): Href =>
  typeof href === "function" ? href(locale) : href;

/** Caminho localizado (já com prefixo de locale quando necessário) → URL absoluta. */
export function absoluteUrl(href: HrefFor, locale: Locale) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const path = getPathname({ href: resolve(href, locale) as any, locale });
  return path === "/" ? baseUrl : `${baseUrl}${path}`;
}

/**
 * Canonical e hreflang derivados do mesmo lugar que gera os links do site.
 * Se o roteamento mudar, o canonical muda junto — não dá pra divergir.
 */
export function alternates(href: HrefFor, locale: Locale): Metadata["alternates"] {
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, absoluteUrl(href, l as Locale)]),
  );

  return {
    canonical: absoluteUrl(href, locale),
    languages: {
      ...languages,
      "x-default": absoluteUrl(href, routing.defaultLocale as Locale),
    },
  };
}

/** Metadata de página, com canonical, hreflang e Open Graph coerentes. */
export function pageMetadata({
  locale,
  href,
  title,
  description,
  absoluteTitle = false,
}: {
  locale: Locale;
  href: HrefFor;
  title: string;
  description: string;
  /** Ignora o template `%s | André Bordignon` — para títulos que já se bastam. */
  absoluteTitle?: boolean;
}): Metadata {
  const url = absoluteUrl(href, locale);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: alternates(href, locale),
    openGraph: {
      type: "website",
      locale: ogLocale[locale],
      url,
      title,
      description,
      siteName: siteName[locale],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: person.twitter,
    },
  };
}
