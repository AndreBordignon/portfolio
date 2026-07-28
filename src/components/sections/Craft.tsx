"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLocale, useTranslations } from "next-intl";
import SplitLines from "@/components/motion/SplitLines";
import Reveal from "@/components/motion/Reveal";
import { craft } from "@/data/craft";
import type { Locale } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const marqueeRow = [
  "React",
  "Next.js",
  "TypeScript",
  "React Native",
  "Expo",
  "Supabase",
  "PostgreSQL",
  "Node.js",
  "GSAP",
  "three.js",
  "Tailwind",
  "Zustand",
  "Prisma",
  "Vercel",
];

function Marquee({ reverse = false, duration = 46 }: { reverse?: boolean; duration?: number }) {
  const items = [...marqueeRow, ...marqueeRow];
  return (
    <div className="flex overflow-hidden" aria-hidden>
      <div
        className={`marquee-track flex shrink-0 items-center gap-10 pr-10 ${reverse ? "is-reverse" : ""}`}
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="whitespace-nowrap font-display text-4xl text-bone/25 md:text-6xl"
          >
            {item}
            <span className="ml-10 text-ember/40">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Craft() {
  const root = useRef<HTMLElement>(null);
  const t = useTranslations("craft");
  const locale = useLocale() as Locale;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // As faixas deslizam um pouco a mais conforme a seção passa — parallax
        // dirigido sobre a animação contínua do CSS.
        gsap.to(".craft-marquee", {
          xPercent: (i) => (i % 2 === 0 ? -6 : 6),
          ease: "none",
          scrollTrigger: {
            trigger: ".craft-marquees",
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="oficio"
      className="relative border-t border-[color:var(--line)] bg-ink py-28 md:py-40"
    >
      <div className="mx-auto w-full max-w-[92rem] px-6 md:px-10">
        <span className="type-label">{t("index")}</span>
        <div className="mt-12 grid gap-10 md:grid-cols-12">
          <SplitLines as="h2" className="type-h2 text-balance md:col-span-7" type="words">
            {t("title")}
          </SplitLines>
          <Reveal className="md:col-span-5 md:pt-3">
            <p className="type-lead text-muted text-balance">{t("description")}</p>
          </Reveal>
        </div>
      </div>

      <div className="craft-marquees mt-20 flex flex-col gap-4 md:mt-28 md:gap-6">
        <div className="craft-marquee">
          <Marquee duration={54} />
        </div>
        <div className="craft-marquee">
          <Marquee reverse duration={64} />
        </div>
      </div>

      <div className="mx-auto mt-20 w-full max-w-[92rem] px-6 md:mt-32 md:px-10">
        <Reveal
          className="grid gap-px overflow-hidden rounded-xl border border-[color:var(--line)] bg-[color:var(--line)] md:grid-cols-2 lg:grid-cols-3"
          stagger
        >
          {craft.map((c) => (
            <div key={c.id} className="bg-ink p-7 transition-colors hover:bg-ink-3 md:p-9">
              <h3 className="text-lg font-medium tracking-tight text-bone">
                {c.title[locale]}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{c.note[locale]}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {c.skills.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-[color:var(--line)] px-2.5 py-1 font-mono text-[11px] text-muted transition-colors hover:border-ember hover:text-ember"
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
  );
}
