"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLocale, useTranslations } from "next-intl";
import SplitLines from "@/components/motion/SplitLines";
import Reveal from "@/components/motion/Reveal";
import { stats } from "@/data/craft";
import type { Locale } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Manifesto() {
  const root = useRef<HTMLElement>(null);
  const t = useTranslations("manifesto");
  const locale = useLocale() as Locale;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Um fio de brasa que se desenha ao longo da seção.
        gsap.fromTo(
          ".manifesto-rule",
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            transformOrigin: "left center",
            scrollTrigger: {
              trigger: root.current,
              start: "top 70%",
              end: "bottom 60%",
              scrub: 1,
            },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="sobre"
      className="relative border-t border-[color:var(--line)] bg-ink py-28 md:py-44"
    >
      <div className="mx-auto w-full max-w-[92rem] px-6 md:px-10">
        <div className="flex items-baseline gap-6">
          <span className="type-label">{t("index")}</span>
          <span className="manifesto-rule h-px flex-1 bg-[color:var(--line-strong)]" />
        </div>

        <div className="mt-14 grid gap-14 md:mt-24 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <SplitLines as="h2" className="type-h2 text-balance" type="words">
              {t("statement")}
            </SplitLines>
          </div>

          <div className="flex flex-col gap-7 md:col-span-5 md:pt-3">
            <Reveal className="flex flex-col gap-7" stagger>
              <p className="type-lead text-muted">{t("paragraph1")}</p>
              <p className="type-lead text-muted">{t("paragraph2")}</p>
              <p className="font-display text-2xl italic leading-snug text-ember-soft md:text-3xl">
                {t("pullquote")}
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal
          className="mt-20 grid grid-cols-2 gap-x-6 gap-y-12 border-t border-[color:var(--line)] pt-12 md:mt-32 md:grid-cols-4"
          stagger
        >
          {stats.map((s) => (
            <div key={s.value}>
              <div className="type-h3 font-display text-ember">{s.value}</div>
              <p className="mt-3 max-w-[14rem] text-sm leading-relaxed text-muted">
                {s.label[locale]}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
