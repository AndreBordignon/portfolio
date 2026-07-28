import { ogContentType, ogImage, ogSize } from "@/lib/og";
import { getServiceBySlug } from "@/data/services";
import { person } from "@/lib/site";
import type { Locale } from "@/data/projects";

export const alt = "André Bordignon — serviço";
export const size = ogSize;
export const contentType = ogContentType;

export default async function OgImage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const typedLocale = locale as Locale;
  const service = getServiceBySlug(typedLocale, slug);

  return ogImage({
    eyebrow: `${person.jobTitle[typedLocale]} · ${person.city}`,
    title: service?.title[typedLocale] ?? person.jobTitle[typedLocale],
    footer: "andrebordignon.dev",
  });
}
