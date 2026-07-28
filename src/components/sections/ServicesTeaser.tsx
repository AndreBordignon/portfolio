import { getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import Reveal from "@/components/motion/Reveal";
import { services } from "@/data/services";
import { anchorStatement } from "@/lib/site";
import type { Locale } from "@/data/projects";

/**
 * Ponte da home para as páginas de serviço. Serve a dois propósitos: distribuir
 * autoridade por link interno e colocar os termos-alvo em texto visível — nada
 * de palavra-chave escondida para buscador.
 */
export default async function ServicesTeaser({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "servicesTeaser" });

  return (
    <section
      id="servicos"
      className="border-t border-[color:var(--line)] bg-ink py-28 md:py-40"
    >
      <div className="mx-auto w-full max-w-[92rem] px-6 md:px-10">
        <span className="type-label">{t("index")}</span>

        <div className="mt-12 grid gap-10 md:grid-cols-12">
          <h2 className="type-h2 text-balance md:col-span-7">{t("title")}</h2>
          {/* A frase-âncora aparece uma vez no site, e é aqui. */}
          <p className="type-lead text-muted text-balance md:col-span-5 md:pt-3">
            {anchorStatement[locale]}
          </p>
        </div>

        <Reveal className="mt-16 grid gap-px overflow-hidden rounded-xl border border-[color:var(--line)] bg-[color:var(--line)] md:mt-24 md:grid-cols-2" stagger>
          {services.map((service) => (
            <Link
              key={service.id}
              href={{ pathname: "/servicos/[slug]", params: { slug: service.slug[locale] } }}
              className="group flex flex-col justify-between gap-10 bg-ink p-8 transition-colors hover:bg-ink-3 md:p-12"
            >
              <div>
                <h3 className="type-h3 text-balance transition-colors group-hover:text-ember">
                  {service.title[locale]}
                </h3>
                <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
                  {service.lede[locale]}
                </p>
              </div>

              <span className="inline-flex items-center gap-2 text-sm font-medium text-bone transition-colors group-hover:text-ember">
                {t("cta")}
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </span>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
