import { getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { getPathname } from "@/i18n/routing";
import { person } from "@/lib/site";
import type { Locale } from "@/data/projects";

/** Fechamento de toda página interna: uma saída clara para conversa. */
export default async function CtaBlock({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "cta" });
  // O formulário mora na home; daqui saímos direto para a âncora dele.
  const contactHref = `${getPathname({ href: "/", locale })}#contato`.replace(
    "//#",
    "/#",
  );

  return (
    <section className="relative overflow-hidden border-t border-[color:var(--line)] bg-ink py-24 md:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] bg-[radial-gradient(70%_100%_at_50%_130%,rgba(249,115,22,0.2),transparent_70%)]"
      />

      <div className="relative mx-auto w-full max-w-[92rem] px-6 md:px-10">
        <h2 className="type-h2 max-w-3xl text-balance">{t("title")}</h2>
        <p className="type-lead mt-7 max-w-2xl text-muted text-balance">{t("body")}</p>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <a
            href={contactHref}
            className="rounded-full bg-bone px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-ember"
          >
            {t("primary")}
          </a>
          <a
            href={person.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-[color:var(--line-strong)] px-7 py-3.5 text-sm font-medium text-bone transition-colors hover:border-ember hover:text-ember"
          >
            {t("secondary")}
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </div>

        <p className="type-label mt-10">
          {person.email} · {person.city}, {person.countryName}
        </p>
      </div>
    </section>
  );
}
