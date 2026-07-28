import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { craft } from "@/data/craft";
import type { Locale } from "@/data/projects";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, graph, profilePageSchema } from "@/lib/jsonld";
import { anchorStatement, person } from "@/lib/site";
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
  const t = await getTranslations({ locale, namespace: "aboutPage" });

  return pageMetadata({
    locale: locale as Locale,
    href: { pathname: "/sobre" },
    title: t("seoTitle"),
    description: t("seoDescription"),
    absoluteTitle: true,
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const t = await getTranslations({ locale, namespace: "aboutPage" });
  const url = absoluteUrl({ pathname: "/sobre" }, typedLocale);

  /**
   * Ficha de fatos. Lista de definição de propósito: é a estrutura que um
   * extrator lê sem ambiguidade, e que uma pessoa lê em dez segundos.
   */
  const facts: { term: string; value: string }[] = [
    { term: t("facts.name"), value: person.name },
    { term: t("facts.role"), value: person.jobTitle[typedLocale] },
    {
      term: t("facts.location"),
      value: `${person.city}, ${person.regionName}, ${person.countryName}`,
    },
    { term: t("facts.serves"), value: t("facts.servesValue") },
    { term: t("facts.since"), value: String(person.since) },
    {
      term: t("facts.experience"),
      value: t("facts.experienceValue", { years: person.yearsOfExperience }),
    },
    { term: t("facts.stack"), value: "React, Next.js, TypeScript, React Native, Node.js" },
    { term: t("facts.languages"), value: t("facts.languagesValue") },
    { term: t("facts.email"), value: person.email },
  ];

  return (
    <>
      <JsonLd
        data={graph(
          profilePageSchema(url, t("seoTitle")),
          breadcrumbSchema([
            { name: t("home"), url: absoluteUrl({ pathname: "/" }, typedLocale) },
            { name: t("breadcrumb"), url },
          ]),
        )}
      />

      <main id="conteudo">
        <PageHeader
          eyebrow={t("eyebrow")}
          title={t("title")}
          lede={anchorStatement[typedLocale]}
          crumbs={[{ label: t("home"), href: "/" }, { label: t("breadcrumb") }]}
        />

        <section className="bg-ink py-20 md:py-28">
          <div className="mx-auto grid w-full max-w-[92rem] gap-16 px-6 md:grid-cols-12 md:gap-12 md:px-10">
            <Reveal className="flex flex-col gap-7 md:col-span-7" stagger>
              <p className="type-lead text-bone/85">{t("story1")}</p>
              <p className="type-lead text-muted">{t("story2")}</p>
              <p className="type-lead text-muted">{t("story3")}</p>
              <p className="font-display text-2xl italic leading-snug text-ember-soft md:text-3xl">
                {t("pullquote")}
              </p>
            </Reveal>

            {/* Ficha de fatos */}
            <Reveal className="md:col-span-5">
              <h2 className="type-label mb-8">{t("factsTitle")}</h2>
              <dl className="flex flex-col">
                {facts.map((fact) => (
                  <div
                    key={fact.term}
                    className="grid grid-cols-[9rem_1fr] gap-4 border-t border-[color:var(--line)] py-4 last:border-b"
                  >
                    <dt className="type-label !normal-case !tracking-normal">
                      {fact.term}
                    </dt>
                    <dd className="text-sm text-bone/85">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>

        {/* Disciplinas — o mesmo dado da home, aqui em forma de leitura */}
        <section className="border-t border-[color:var(--line)] bg-ink-2 py-20 md:py-28">
          <div className="mx-auto w-full max-w-[92rem] px-6 md:px-10">
            <h2 className="type-h3 max-w-2xl text-balance">{t("craftTitle")}</h2>

            <Reveal
              className="mt-14 grid gap-px overflow-hidden rounded-xl border border-[color:var(--line)] bg-[color:var(--line)] md:grid-cols-2 lg:grid-cols-3"
              stagger
            >
              {craft.map((c) => (
                <div key={c.id} className="bg-ink p-7 md:p-9">
                  <h3 className="text-lg font-medium tracking-tight text-bone">
                    {c.title[typedLocale]}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {c.note[typedLocale]}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {c.skills.map((s) => (
                      <li
                        key={s}
                        className="rounded-full border border-[color:var(--line)] px-2.5 py-1 font-mono text-[11px] text-muted"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        <CtaBlock locale={typedLocale} />
      </main>
    </>
  );
}
