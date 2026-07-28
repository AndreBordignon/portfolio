import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowUpRight, Check } from "lucide-react";
import { Link } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { services, getServiceBySlug } from "@/data/services";
import { projects, type Locale } from "@/data/projects";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import {
  breadcrumbSchema,
  faqSchema,
  graph,
  serviceSchema,
} from "@/lib/jsonld";
import JsonLd from "@/components/seo/JsonLd";
import PageHeader from "@/components/page/PageHeader";
import Faq from "@/components/page/Faq";
import CtaBlock from "@/components/page/CtaBlock";
import Reveal from "@/components/motion/Reveal";

type Params = { locale: string; slug: string };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    services.map((service) => ({
      locale,
      slug: service.slug[locale as Locale],
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = getServiceBySlug(locale as Locale, slug);
  if (!service) return {};

  return pageMetadata({
    locale: locale as Locale,
    // O slug muda por idioma: cada hreflang precisa do slug daquele idioma.
    href: (l) => ({
      pathname: "/servicos/[slug]",
      params: { slug: service.slug[l] },
    }),
    title: service.seoTitle[locale as Locale],
    description: service.seoDescription[locale as Locale],
    absoluteTitle: true,
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, slug } = await params;
  const typedLocale = locale as Locale;
  const service = getServiceBySlug(typedLocale, slug);
  if (!service) notFound();

  const t = await getTranslations({ locale, namespace: "servicePage" });
  const url = absoluteUrl(
    { pathname: "/servicos/[slug]", params: { slug } },
    typedLocale,
  );

  const crumbs = [
    { label: t("home"), href: "/" as const },
    { label: t("breadcrumb"), href: "/servicos" as const },
    { label: service.navLabel[typedLocale] },
  ];

  const related = projects.filter((p) => service.relatedCases.includes(p.slug));

  return (
    <>
      <JsonLd
        data={graph(
          serviceSchema({
            name: service.title[typedLocale],
            description: service.seoDescription[typedLocale],
            url,
            locale: typedLocale,
          }),
          faqSchema(
            service.faq.map((f) => ({
              question: f.question[typedLocale],
              answer: f.answer[typedLocale],
            })),
          ),
          breadcrumbSchema([
            { name: t("home"), url: absoluteUrl({ pathname: "/" }, typedLocale) },
            {
              name: t("breadcrumb"),
              url: absoluteUrl({ pathname: "/servicos" }, typedLocale),
            },
            { name: service.navLabel[typedLocale], url },
          ]),
        )}
      />

      <main id="conteudo">
        <PageHeader
          eyebrow={t("eyebrow")}
          title={service.title[typedLocale]}
          lede={service.lede[typedLocale]}
          crumbs={crumbs}
        />

        <section className="bg-ink py-20 md:py-28">
          <div className="mx-auto w-full max-w-[92rem] px-6 md:px-10">
            <Reveal>
              <p className="type-lead max-w-3xl text-bone/85">
                {service.intro[typedLocale]}
              </p>
            </Reveal>

            <div className="mt-20 flex flex-col gap-16 md:mt-28 md:gap-24">
              {service.blocks.map((block) => (
                <Reveal
                  key={block.heading[typedLocale]}
                  className="grid gap-6 border-t border-[color:var(--line)] pt-10 md:grid-cols-12 md:gap-10"
                >
                  <h2 className="type-h3 text-balance md:col-span-5">
                    {block.heading[typedLocale]}
                  </h2>
                  <p className="text-base leading-relaxed text-muted md:col-span-7 md:text-lg">
                    {block.body[typedLocale]}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Entregáveis + stack */}
        <section className="border-t border-[color:var(--line)] bg-ink-2 py-20 md:py-28">
          <div className="mx-auto grid w-full max-w-[92rem] gap-14 px-6 md:grid-cols-12 md:px-10">
            <div className="md:col-span-7">
              <h2 className="type-h3 text-balance">{t("deliverables")}</h2>
              <Reveal className="mt-10 flex flex-col" stagger>
                {service.deliverables[typedLocale].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-4 border-t border-[color:var(--line)] py-4 last:border-b"
                  >
                    <Check size={16} className="mt-1 shrink-0 text-ember" aria-hidden />
                    <span className="text-base text-bone/85">{item}</span>
                  </div>
                ))}
              </Reveal>
            </div>

            <div className="md:col-span-5">
              <h2 className="type-h3 text-balance">{t("stack")}</h2>
              <ul className="mt-10 flex flex-wrap gap-2">
                {service.stack.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-[color:var(--line)] px-3 py-1.5 font-mono text-[11px] tracking-wide text-muted"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Prova: cases relacionados */}
        {related.length > 0 && (
          <section className="border-t border-[color:var(--line)] bg-ink py-20 md:py-28">
            <div className="mx-auto w-full max-w-[92rem] px-6 md:px-10">
              <h2 className="type-h3 max-w-2xl text-balance">{t("proof")}</h2>

              <Reveal className="mt-12 grid gap-px overflow-hidden rounded-xl border border-[color:var(--line)] bg-[color:var(--line)] md:grid-cols-3" stagger>
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    href={{ pathname: "/cases/[slug]", params: { slug: p.slug } }}
                    className="group flex flex-col justify-between gap-8 bg-ink p-7 transition-colors hover:bg-ink-3 md:p-9"
                  >
                    <div>
                      <span className="type-label">{p.year}</span>
                      <h3 className="mt-4 text-xl font-medium tracking-tight text-bone transition-colors group-hover:text-ember">
                        {p.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted">
                        {p.tagline[typedLocale]}
                      </p>
                    </div>
                    <ArrowUpRight
                      size={16}
                      className="text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ember"
                      aria-hidden
                    />
                  </Link>
                ))}
              </Reveal>
            </div>
          </section>
        )}

        <Faq
          title={t("faqTitle")}
          items={service.faq.map((f) => ({
            question: f.question[typedLocale],
            answer: f.answer[typedLocale],
          }))}
        />

        <CtaBlock locale={typedLocale} />
      </main>
    </>
  );
}
