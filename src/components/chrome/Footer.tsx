"use client";

import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { scrollToSection } from "@/components/providers/SmoothScroll";

export default function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[color:var(--line)] bg-ink">
      <div className="mx-auto w-full max-w-[92rem] px-6 py-12 md:px-10 md:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-4xl leading-none text-bone md:text-6xl">
              André Bordignon
            </p>
            <p className="type-label mt-5">{t("builtWith")}</p>
          </div>

          <div className="flex flex-col items-start gap-4 md:items-end">
            <button
              onClick={() => scrollToSection("inicio")}
              className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ember"
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
