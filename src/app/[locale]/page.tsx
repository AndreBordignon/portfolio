import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import Work from "@/components/sections/Work";
import Craft from "@/components/sections/Craft";
import Contact from "@/components/sections/Contact";
import ServicesTeaser from "@/components/sections/ServicesTeaser";
import { pageMetadata } from "@/lib/seo";
import type { Locale } from "@/data/projects";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  return pageMetadata({
    locale: locale as Locale,
    href: { pathname: "/" },
    title: t("seoTitle"),
    description: t("seoDescription"),
    absoluteTitle: true,
  });
}

export default async function Portfolio({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <main id="conteudo">
      <Hero />
      <Manifesto />
      <Work />
      <ServicesTeaser locale={locale as Locale} />
      <Craft />
      <Contact />
    </main>
  );
}
