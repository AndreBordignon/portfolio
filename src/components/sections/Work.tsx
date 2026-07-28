"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { projects, type Locale } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Work() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const t = useTranslations("work");
  const locale = useLocale() as Locale;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop: o scroll vertical vira travelling horizontal.
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const el = track.current!;
        const distance = () => Math.max(0, el.scrollWidth - window.innerWidth);

        const horizontal = gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => "+=" + distance(),
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const bar = root.current?.querySelector<HTMLElement>(".work-progress");
              if (bar) bar.style.transform = `scaleX(${self.progress})`;
            },
          },
        });

        // Cada painel entra com um leve atraso de profundidade.
        gsap.utils.toArray<HTMLElement>(".work-panel").forEach((panel) => {
          gsap.from(panel.querySelector(".work-panel-inner"), {
            opacity: 0.25,
            y: 40,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: horizontal,
              start: "left 92%",
              end: "left 55%",
              scrub: true,
            },
          });
        });
      });

      // Mobile/tablet: pilha vertical com reveal simples.
      mm.add("(max-width: 1023px), (prefers-reduced-motion: reduce)", () => {
        gsap.utils.toArray<HTMLElement>(".work-panel").forEach((panel) => {
          gsap.from(panel, {
            opacity: 0,
            y: 40,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: panel, start: "top 85%" },
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="trabalhos"
      className="relative border-t border-[color:var(--line)] bg-ink-2"
    >
      {/* Cabeçalho fixo do "ato" */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 px-6 pt-10 md:px-10 md:pt-12">
        <div className="flex items-baseline justify-between gap-6">
          <span className="type-label">{t("index")}</span>
          <span className="type-label hidden lg:block">{t("hint")}</span>
        </div>
        <div className="mt-5 h-px w-full bg-[color:var(--line)]">
          <div className="work-progress h-px origin-left scale-x-0 bg-ember" />
        </div>
      </div>

      <div className="lg:flex lg:h-[100svh] lg:items-center lg:overflow-hidden">
        <div
          ref={track}
          className="flex flex-col gap-20 px-6 pb-24 pt-32 md:px-10 lg:h-full lg:flex-row lg:items-center lg:gap-0 lg:px-0 lg:pb-0 lg:pt-0 lg:will-change-transform"
        >
          {/* Painel de abertura */}
          <div className="work-panel lg:flex lg:h-full lg:w-[60vw] lg:shrink-0 lg:items-center lg:px-[6vw]">
            <div className="work-panel-inner max-w-2xl">
              <h2 className="type-h2 text-balance">{t("title")}</h2>
              <p className="type-lead mt-8 max-w-lg text-muted text-balance">
                {t("description")}
              </p>
              <p className="type-label mt-10">
                {projects.length.toString().padStart(2, "0")} {t("counter")}
              </p>
            </div>
          </div>

          {projects.map((p, i) => (
            <article
              key={p.slug}
              className="work-panel border-t border-[color:var(--line)] pt-10 lg:flex lg:h-full lg:w-[78vw] lg:max-w-[1100px] lg:shrink-0 lg:items-center lg:border-l lg:border-t-0 lg:px-[5vw] lg:pt-0 xl:w-[62vw]"
            >
              <div className="work-panel-inner relative w-full">
                {/* Número fantasma do plano */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-6 right-0 select-none font-display text-[7rem] leading-none text-bone/[0.05] lg:-top-24 lg:text-[16rem]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="relative flex flex-wrap items-center gap-x-5 gap-y-2">
                  <span className="type-label" style={{ color: p.accent }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="type-label">{p.year}</span>
                  <span className="type-label">{p.role[locale]}</span>
                </div>

                <h3 className="type-h2 relative mt-6">{p.title}</h3>

                <p className="relative mt-4 font-display text-xl italic leading-snug text-ember-soft md:text-3xl">
                  {p.tagline[locale]}
                </p>

                <div className="relative mt-10 grid gap-8 lg:grid-cols-2 lg:gap-12">
                  <p className="text-base leading-relaxed text-muted md:text-lg">
                    {p.description[locale]}
                  </p>

                  <div className="border-l-2 pl-6" style={{ borderColor: p.accent }}>
                    <p className="type-label mb-3">{t("decision")}</p>
                    <p className="text-sm leading-relaxed text-bone/85 md:text-base">
                      {p.highlight[locale]}
                    </p>
                  </div>
                </div>

                <div className="relative mt-10 flex flex-wrap items-center gap-2">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-[color:var(--line)] px-3 py-1.5 font-mono text-[11px] tracking-wide text-muted"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <div className="relative mt-9 flex flex-wrap items-center gap-6">
                  {/* O case é a página com conteúdo de verdade — o link interno
                      que leva o leitor (e o crawler) do painel para o texto. */}
                  <Link
                    href={{ pathname: "/cases/[slug]", params: { slug: p.slug } }}
                    data-cursor={t("readCase")}
                    className="group inline-flex items-center gap-2 text-sm font-medium text-ember transition-colors hover:text-ember-soft"
                  >
                    <span className="border-b border-ember/40 pb-1 transition-colors group-hover:border-ember-soft">
                      {t("readCase")}
                    </span>
                    <ArrowUpRight
                      size={16}
                      className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </Link>

                  {p.links.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor={t("open")}
                        className="group inline-flex items-center gap-2 text-sm font-medium text-bone transition-colors hover:text-ember"
                      >
                        <span className="border-b border-[color:var(--line-strong)] pb-1 transition-colors group-hover:border-ember">
                          {l.label}
                        </span>
                        <ArrowUpRight
                          size={16}
                          className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </a>
                  ))}
                </div>
              </div>
            </article>
          ))}

          {/* Painel de fechamento do ato */}
          <div className="work-panel lg:flex lg:h-full lg:w-[45vw] lg:shrink-0 lg:items-center lg:border-l lg:border-[color:var(--line)] lg:px-[6vw]">
            <div className="work-panel-inner">
              <p className="type-label">{t("moreLabel")}</p>
              <p className="type-h3 mt-6 max-w-md text-balance">{t("more")}</p>

              <div className="mt-8 flex flex-col items-start gap-4">
                <Link
                  href="/cases"
                  className="inline-flex items-center gap-2 text-sm font-medium text-ember hover:text-ember-soft"
                >
                  {t("allCases")}
                  <ArrowUpRight size={16} />
                </Link>
                <a
                  href="https://github.com/AndreBordignon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-ember"
                >
                  github.com/AndreBordignon
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
