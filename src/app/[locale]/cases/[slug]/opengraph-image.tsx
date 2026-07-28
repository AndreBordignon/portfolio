import { ogContentType, ogImage, ogSize } from "@/lib/og";
import { projects, type Locale } from "@/data/projects";

export const alt = "André Bordignon — case";
export const size = ogSize;
export const contentType = ogContentType;

export default async function OgImage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const typedLocale = locale as Locale;
  const project = projects.find((p) => p.slug === slug);

  return ogImage({
    eyebrow: project ? `Case · ${project.year}` : "Case",
    title: project?.tagline[typedLocale] ?? "Case",
    footer: project?.title ?? "andrebordignon.dev",
  });
}
