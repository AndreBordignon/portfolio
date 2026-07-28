"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { scrollToSection } from "@/components/providers/SmoothScroll";
import { alternateSlug } from "@/lib/localizedSlug";
import type { Locale } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Relógio de Brasília — o site diz de onde ele fala. */
function LocalTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "America/Sao_Paulo",
        }).format(new Date()),
      );
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;
  return <span className="type-label hidden xl:block">Brasília · {time}</span>;
}

export default function Header() {
  const root = useRef<HTMLElement>(null);
  const t = useTranslations("navigation");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const isHome = pathname === "/";

  useGSAP(
    () => {
      // Some ao descer, volta ao subir — a moldura não briga com o conteúdo.
      const show = gsap.quickTo(root.current, "yPercent", {
        duration: 0.45,
        ease: "power3.out",
      });

      ScrollTrigger.create({
        start: "top -80",
        end: 99999,
        onUpdate: (self) => {
          show(self.direction === 1 && self.scroll() > 200 ? -110 : 0);
          root.current?.classList.toggle("is-solid", self.scroll() > 80);
        },
      });
    },
    { scope: root },
  );

  const otherLocale: Locale = locale === "pt-BR" ? "en" : "pt-BR";

  function switchLocale() {
    const slug = typeof params?.slug === "string" ? params.slug : undefined;

    router.replace(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {
        pathname,
        // Slug de serviço é traduzido: sem o mapa, a troca de idioma dá 404.
        ...(slug
          ? { params: { slug: alternateSlug(slug, locale, otherLocale) } }
          : {}),
      } as any,
      { locale: otherLocale },
    );
  }

  return (
    <header
      ref={root}
      className="fixed inset-x-0 top-0 z-50 transition-colors duration-300 [&.is-solid]:border-b [&.is-solid]:border-[color:var(--line)] [&.is-solid]:bg-ink/70 [&.is-solid]:backdrop-blur-xl"
    >
      <nav
        aria-label={t("home")}
        className="mx-auto flex w-full max-w-[92rem] items-center justify-between gap-6 px-6 py-5 md:px-10"
      >
        <Link href="/" className="group flex items-center gap-3" aria-label="André Bordignon">
          <span className="inline-block h-2 w-2 rounded-full bg-ember transition-transform group-hover:scale-150" />
          <span className="font-mono text-xs tracking-[0.2em] text-bone">A / B</span>
        </Link>

        <div className="flex items-center gap-5 md:gap-8">
          <LocalTime />

          <ul className="hidden items-center gap-7 md:flex">
            <li>
              <Link href="/servicos" className="type-label transition-colors hover:text-ember">
                {t("services")}
              </Link>
            </li>
            <li>
              <Link href="/cases" className="type-label transition-colors hover:text-ember">
                {t("cases")}
              </Link>
            </li>
            <li>
              <Link href="/sobre" className="type-label transition-colors hover:text-ember">
                {t("about")}
              </Link>
            </li>
            <li>
              {/* Na home o contato é âncora (scroll suave); fora dela, link. */}
              {isHome ? (
                <button
                  onClick={() => scrollToSection("contato")}
                  className="type-label transition-colors hover:text-ember"
                >
                  {t("contact")}
                </button>
              ) : (
                <Link
                  href={{ pathname: "/", hash: "contato" }}
                  className="type-label transition-colors hover:text-ember"
                >
                  {t("contact")}
                </Link>
              )}
            </li>
          </ul>

          <button
            onClick={switchLocale}
            className="type-label border border-[color:var(--line)] px-3 py-1.5 transition-colors hover:border-ember hover:text-ember"
            aria-label={`Switch to ${otherLocale}`}
          >
            {locale === "pt-BR" ? "EN" : "PT"}
          </button>
        </div>
      </nav>
    </header>
  );
}
