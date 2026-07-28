import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link, routing } from "@/i18n/routing";
import { projects, type Locale } from "@/data/projects";
import { getCaseStudy } from "@/data/cases";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, caseSchema, graph } from "@/lib/jsonld";
import JsonLd from "@/components/seo/JsonLd";
import PageHeader from "@/components/page/PageHeader";
import CtaBlock from "@/components/page/CtaBlock";
import Reveal from "@/components/motion/Reveal";

type Params = { locale: string; slug: string };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    projects.map((p) => ({ locale, slug: p.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};

  return pageMetadata({
    locale: locale as Locale,
    href: { pathname: "/cases/[slug]", params: { slug } },
    title: study.seoTitle[locale as Locale],
    description: study.seoDescription[locale as Locale],
    absoluteTitle: true,
  });
}

export default async function CasePage({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params;
  const typedLocale = locale as Locale;

  const project = projects.find((p) => p.slug === slug);
  const study = getCaseStudy(slug);
  if (!project || !study) notFound();

  const t = await getTranslations({ locale, namespace: "casePage" });
  const url = absoluteUrl(
    { pathname: "/cases/[slug]", params: { slug } },
    typedLocale,
  );

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];

  const chapters = [
    { heading: t("challenge"), body: study.challenge[typedLocale] },
    { heading: t("approach"), body: study.approach[typedLocale] },
    { heading: t("outcome"), body: study.outcome[typedLocale] },
  ];

  return (
    <>
      <JsonLd
        data={graph(
          caseSchema({
            name: project.title,
            description: study.seoDescription[typedLocale],
            url,
            year: project.year,
            keywords: [...study.keywords, ...project.stack],
          }),
          breadcrumbSchema([
            { name: t("home"), url: absoluteUrl({ pathname: "/" }, typedLocale) },
            {
              name: t("breadcrumb"),
              url: absoluteUrl({ pathname: "/cases" }, typedLocale),
            },
            { name: project.title, url },
          ]),
        )}
      />

      <main id="conteudo">
        <PageHeader
          eyebrow={`${project.year} · ${project.role[typedLocale]}`}
          title={project.title}
          lede={study.lede[typedLocale]}
          crumbs={[
            { label: t("home"), href: "/" },
            { label: t("breadcrumb"), href: "/cases" },
            { label: project.title },
          ]}
        />

        <section className="bg-ink py-16 md:py-24">
          <div className="mx-auto w-full max-w-[92rem] px-6 md:px-10">
            {/* Ficha do projeto: fatos curtos, extraíveis sem ambiguidade */}
            <Reveal className="grid gap-10 border-b border-[color:var(--line)] pb-14 md:grid-cols-12">
              <div className="md:col-span-8">
                <p className="type-label mb-4">{t("stack")}</p>
                <ul className="flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-[color:var(--line)] px-3 py-1.5 font-mono text-[11px] tracking-wide text-muted"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              {project.links.length > 0 && (
                <div className="md:col-span-4">
                  <p className="type-label mb-4">{t("links")}</p>
                  <div className="flex flex-col gap-3">
                    {project.links.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 text-sm font-medium text-bone transition-colors hover:text-ember"
                      >
                        <span className="border-b border-[color:var(--line-strong)] pb-0.5 transition-colors group-hover:border-ember">
                          {l.label}
                        </span>
                        <ArrowUpRight size={15} />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </Reveal>

            {/* Os três atos do case */}
            <div className="mt-16 flex flex-col gap-16 md:mt-24 md:gap-24">
              {chapters.map((chapter) => (
                <Reveal
                  key={chapter.heading}
                  className="grid gap-6 md:grid-cols-12 md:gap-10"
                >
                  <h2 className="type-h3 text-balance md:col-span-4">
                    {chapter.heading}
                  </h2>
                  <p className="text-base leading-relaxed text-bone/85 md:col-span-8 md:text-lg">
                    {chapter.body}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Fatos verificáveis */}
        <section className="border-t border-[color:var(--line)] bg-ink-2 py-20 md:py-28">
          <div className="mx-auto w-full max-w-[92rem] px-6 md:px-10">
            <h2 className="type-h3 text-balance">{t("facts")}</h2>
            <Reveal className="mt-10 flex flex-col" stagger>
              {study.facts[typedLocale].map((fact) => (
                <p
                  key={fact}
                  className="border-t border-[color:var(--line)] py-4 text-base text-bone/85 last:border-b"
                >
                  {fact}
                </p>
              ))}
            </Reveal>
          </div>
        </section>

        {/* Próximo case: mantém o crawler (e o leitor) circulando */}
        <section className="border-t border-[color:var(--line)] bg-ink py-16 md:py-20">
          <div className="mx-auto w-full max-w-[92rem] px-6 md:px-10">
            <Link
              href={{ pathname: "/cases/[slug]", params: { slug: next.slug } }}
              className="group flex flex-wrap items-end justify-between gap-6"
            >
              <div>
                <span className="type-label">{t("next")}</span>
                <p className="type-h3 mt-3 transition-colors group-hover:text-ember">
                  {next.title}
                </p>
              </div>
              <ArrowUpRight
                size={22}
                className="text-muted transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-ember"
                aria-hidden
              />
            </Link>
          </div>
        </section>

        <CtaBlock locale={typedLocale} />
      </main>
    </>
  );
}
