"use client";

import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { scrollToTop } from "@/components/providers/SmoothScroll";
import { services } from "@/data/services";
import { person } from "@/lib/site";
import type { Locale } from "@/data/projects";

export default function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("navigation");
  const locale = useLocale() as Locale;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[color:var(--line)] bg-ink">
      <div className="mx-auto w-full max-w-[92rem] px-6 py-16 md:px-10 md:py-20">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="font-display text-4xl leading-none text-bone md:text-6xl">
              André Bordignon
            </p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">
              {person.jobTitle[locale]} · {person.city}, {person.countryName}
            </p>
            <a
              href={`mailto:${person.email}`}
              className="mt-4 inline-block text-sm text-bone transition-colors hover:text-ember"
            >
              {person.email}
            </a>
          </div>

          {/* Links de rodapé: navegação para humano e rastreio para crawler. */}
          <nav className="md:col-span-3" aria-label={t("nav")}>
            <p className="type-label mb-5">{nav("services")}</p>
            <ul className="flex flex-col gap-3">
              {services.map((s) => (
                <li key={s.id}>
                  <Link
                    href={{
                      pathname: "/servicos/[slug]",
                      params: { slug: s.slug[locale] },
                    }}
                    className="text-sm text-muted transition-colors hover:text-ember"
                  >
                    {s.navLabel[locale]}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/cases"
                  className="text-sm text-muted transition-colors hover:text-ember"
                >
                  {nav("cases")}
                </Link>
              </li>
              <li>
                <Link
                  href="/sobre"
                  className="text-sm text-muted transition-colors hover:text-ember"
                >
                  {nav("about")}
                </Link>
              </li>
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="type-label mb-5">{nav("contact")}</p>
            <ul className="flex flex-col gap-3">
              {person.sameAs.map((href) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ember"
                  >
                    {new URL(href).hostname.replace("www.", "")}
                    <ArrowUpRight size={13} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-[color:var(--line)] pt-8 md:flex-row md:items-center md:justify-between">
          <p className="type-label">{t("builtWith")}</p>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-8">
            <button
              onClick={scrollToTop}
              className="group inline-flex items-center gap-2 self-start text-sm text-muted transition-colors hover:text-ember"
            >
              {t("backToTop")}
              <ArrowUpRight
                size={15}
                className="-rotate-45 transition-transform group-hover:-translate-y-0.5"
              />
            </button>
            <p className="text-xs text-muted">
              © {year} André Bordignon. {t("rights")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
