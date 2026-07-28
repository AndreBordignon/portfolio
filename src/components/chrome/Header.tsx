"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { scrollToSection } from "@/components/providers/SmoothScroll";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const links = [
  { id: "sobre", key: "about" },
  { id: "trabalhos", key: "projects" },
  { id: "oficio", key: "craft" },
  { id: "contato", key: "contact" },
] as const;

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
  return <span className="type-label hidden lg:block">Brasília · {time}</span>;
}

export default function Header() {
  const root = useRef<HTMLElement>(null);
  const t = useTranslations("navigation");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

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

  const otherLocale = locale === "pt-BR" ? "en" : "pt-BR";

  return (
    <header
      ref={root}
      className="fixed inset-x-0 top-0 z-50 transition-colors duration-300 [&.is-solid]:border-b [&.is-solid]:border-[color:var(--line)] [&.is-solid]:bg-ink/70 [&.is-solid]:backdrop-blur-xl"
    >
      <nav className="mx-auto flex w-full max-w-[92rem] items-center justify-between gap-6 px-6 py-5 md:px-10">
        <button
          onClick={() => scrollToSection("inicio")}
          className="group flex items-center gap-3"
          aria-label="André Bordignon"
        >
          <span className="inline-block h-2 w-2 rounded-full bg-ember transition-transform group-hover:scale-150" />
          <span className="font-mono text-xs tracking-[0.2em] text-bone">A / B</span>
        </button>

        <div className="flex items-center gap-5 md:gap-8">
          <LocalTime />

          <ul className="hidden items-center gap-7 md:flex">
            {links.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => scrollToSection(l.id)}
                  className="type-label transition-colors hover:text-ember"
                >
                  {t(l.key)}
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={() => router.replace(pathname, { locale: otherLocale })}
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
