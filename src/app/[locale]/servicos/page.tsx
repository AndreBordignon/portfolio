import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { services } from "@/data/services";
import type { Locale } from "@/data/projects";
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
  const t = await getTranslations({ locale, namespace: "servicesPage" });

  return pageMetadata({
    locale: locale as Locale,
    href: { pathname: "/servicos" },
    title: t("seoTitle"),
    description: t("seoDescription"),
    absoluteTitle: true,
  });
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const t = await getTranslations({ locale, namespace: "servicesPage" });

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: t("home"), url: absoluteUrl({ pathname: "/" }, typedLocale) },
            {
              name: t("breadcrumb"),
              url: absoluteUrl({ pathname: "/servicos" }, typedLocale),
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

        <section className="bg-ink py-20 md:py-28">
          <div className="mx-auto flex w-full max-w-[92rem] flex-col gap-px overflow-hidden rounded-xl border border-[color:var(--line)] bg-[color:var(--line)] px-0 md:mx-auto">
            {services.map((service, i) => (
              <Reveal key={service.id} className="bg-ink" delay={i * 0.05}>
                <Link
                  href={{
                    pathname: "/servicos/[slug]",
                    params: { slug: service.slug[typedLocale] },
                  }}
                  className="group grid gap-8 p-8 transition-colors hover:bg-ink-3 md:grid-cols-12 md:gap-10 md:p-14"
                >
                  <div className="md:col-span-5">
                    <span className="type-label">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="type-h3 mt-4 text-balance transition-colors group-hover:text-ember">
                      {service.title[typedLocale]}
                    </h2>
                    <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-bone transition-colors group-hover:text-ember">
                      {t("cta")}
                      <ArrowUpRight
                        size={16}
                        className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </span>
                  </div>

                  <div className="md:col-span-7">
                    <p className="text-base leading-relaxed text-muted md:text-lg">
                      {service.lede[typedLocale]}
                    </p>
                    <ul className="mt-8 flex flex-wrap gap-2">
                      {service.deliverables[typedLocale].slice(0, 4).map((d) => (
                        <li
                          key={d}
                          className="rounded-full border border-[color:var(--line)] px-3 py-1.5 text-xs text-muted"
                        >
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        <CtaBlock locale={typedLocale} />
      </main>
    </>
  );
}
