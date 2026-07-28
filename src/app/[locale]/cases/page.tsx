import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { projects, type Locale } from "@/data/projects";
import { getCaseStudy } from "@/data/cases";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, graph } from "@/lib/jsonld";
import JsonLd from "@/components/seo/JsonLd";
import PageHeader from "@/components/page/PageHeader";
import CtaBlock from "@/components/page/CtaBlock";
import Reveal from "@/components/motion/Reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "casesPage" });

  return pageMetadata({
    locale: locale as Locale,
    href: { pathname: "/cases" },
    title: t("seoTitle"),
    description: t("seoDescription"),
    absoluteTitle: true,
  });
}

export default async function CasesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const t = await getTranslations({ locale, namespace: "casesPage" });

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: t("home"), url: absoluteUrl({ pathname: "/" }, typedLocale) },
            {
              name: t("breadcrumb"),
              url: absoluteUrl({ pathname: "/cases" }, typedLocale),
            },
          ]),
        )}
      />

      <main id="conteudo">
        <PageHeader
          eyebrow={t("eyebrow")}
          title={t("title")}
          lede={t("lede")}
          crumbs={[{ label: t("home"), href: "/" }, { label: t("breadcrumb") }]}
        />

        <section className="bg-ink py-16 md:py-24">
          <div className="mx-auto w-full max-w-[92rem] px-6 md:px-10">
            <Reveal className="flex flex-col" stagger>
              {projects.map((project, i) => {
                const study = getCaseStudy(project.slug);
                return (
                  <Link
                    key={project.slug}
                    href={{
                      pathname: "/cases/[slug]",
                      params: { slug: project.slug },
                    }}
                    className="group grid gap-5 border-t border-[color:var(--line)] py-10 last:border-b md:grid-cols-12 md:gap-10 md:py-12"
                  >
                    <div className="flex items-baseline gap-5 md:col-span-4">
                      <span className="type-label" style={{ color: project.accent }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h2 className="type-h3 transition-colors group-hover:text-ember">
                          {project.title}
                        </h2>
                        <p className="type-label mt-2">{project.year}</p>
                      </div>
                    </div>

                    <p className="text-base leading-relaxed text-muted md:col-span-6 md:text-lg">
                      {study?.lede[typedLocale] ?? project.tagline[typedLocale]}
                    </p>

                    <div className="flex items-start justify-between gap-4 md:col-span-2 md:justify-end">
                      <span className="type-label md:hidden">{t("open")}</span>
                      <ArrowUpRight
                        size={20}
                        className="text-muted transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-ember"
                        aria-hidden
                      />
                    </div>
                  </Link>
                );
              })}
            </Reveal>
          </div>
        </section>

        <CtaBlock locale={typedLocale} />
      </main>
    </>
  );
}
