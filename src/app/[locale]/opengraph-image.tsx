import { getTranslations } from "next-intl/server";
import { ogContentType, ogImage, ogSize } from "@/lib/og";
import { person } from "@/lib/site";
import type { Locale } from "@/data/projects";

export const alt = "André Bordignon — programador freelance";
export const size = ogSize;
export const contentType = ogContentType;

/**
 * Card padrão do site. Metadata de imagem cascateia em Next.js: as rotas filhas
 * herdam este card, exceto onde definem o próprio.
 */
export default async function OgImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const t = await getTranslations({ locale, namespace: "manifesto" });

  return ogImage({
    eyebrow: `${person.jobTitle[typedLocale]} · ${person.city}`,
    title: t("statement"),
    footer: "andrebordignon.dev",
  });
}
