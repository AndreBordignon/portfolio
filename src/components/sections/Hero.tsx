"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";
import HeroScene from "@/components/three/HeroScene";
import { setSceneProgress } from "@/components/three/sceneStore";
import { scrollToSection } from "@/components/providers/SmoothScroll";
import Magnetic from "@/components/motion/Magnetic";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const t = useTranslations("hero");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // --- Versão completa: pin + scrub dirigindo o WebGL
      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "+=1900",
              scrub: 1,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => setSceneProgress(self.progress),
            },
          });

          // autoAlpha (opacity + visibility) — o que some não intercepta clique.
          tl.to(".hero-beat-1", { yPercent: -18, autoAlpha: 0, ease: "power2.in" }, 0)
            .to(".hero-cue", { autoAlpha: 0, ease: "none" }, 0)
            .fromTo(
              ".hero-beat-2",
              { autoAlpha: 0, y: 40 },
              { autoAlpha: 1, y: 0, ease: "power2.out" },
              0.45,
            )
            .to(".hero-beat-2", { autoAlpha: 0, y: -30, ease: "power2.in" }, 0.85);

          // Entrada: a headline sobe por trás da máscara.
          gsap.from(".hero-line", {
            yPercent: 115,
            duration: 1.5,
            ease: "power4.out",
            stagger: 0.09,
            delay: 0.15,
          });
          gsap.from(".hero-fade", {
            opacity: 0,
            y: 24,
            duration: 1.2,
            ease: "power3.out",
            stagger: 0.12,
            delay: 0.6,
          });
        },
      );

      // --- Versão leve: sem pin, o campo só forma conforme a seção sai de cena
      mm.add("(max-width: 767px)", () => {
        ScrollTrigger.create({
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => setSceneProgress(self.progress),
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="inicio"
      className="relative flex h-[100svh] min-h-[560px] w-full items-center overflow-hidden"
    >
      <HeroScene />

      {/* Legibilidade do texto sobre o WebGL */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,7,10,0.72)_0%,rgba(7,7,10,0.25)_38%,rgba(7,7,10,0.55)_78%,rgba(7,7,10,0.95)_100%)]"
      />

      <div className="relative z-10 mx-auto w-full max-w-[92rem] px-6 md:px-10">
        <div className="hero-beat-1">
          <p className="type-label hero-fade mb-8 md:mb-12">{t("eyebrow")}</p>

          <h1 className="type-display">
            <span className="line-mask">
              <span className="hero-line block">André</span>
            </span>
            <span className="line-mask">
              <span className="hero-line block text-ember-gradient">Bordignon</span>
            </span>
          </h1>

          <div className="mt-10 flex flex-col gap-8 md:mt-14 md:flex-row md:items-end md:justify-between">
            <p className="hero-fade type-lead max-w-xl text-muted text-balance">
              {t("lead")}
            </p>

            <div className="hero-fade flex flex-wrap items-center gap-3">
              <Magnetic>
                <button
                  onClick={() => scrollToSection("trabalhos")}
                  data-cursor={t("viewProjects")}
                  className="rounded-full bg-bone px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-ember"
                >
                  {t("viewProjects")}
                </button>
              </Magnetic>
              <Magnetic>
                <button
                  onClick={() => scrollToSection("contato")}
                  className="rounded-full border border-[color:var(--line-strong)] px-7 py-3.5 text-sm font-medium text-bone transition-colors hover:border-ember hover:text-ember"
                >
                  {t("contact")}
                </button>
              </Magnetic>
            </div>
          </div>
        </div>

      </div>

      {/* Beat 2 — aparece enquanto as brasas viram um gráfico de candles.
          Fora do wrapper de conteúdo pra centralizar na viewport, não no texto. */}
      <div
        aria-hidden
        className="hero-beat-2 pointer-events-none absolute inset-0 z-10 hidden items-center opacity-0 md:flex"
      >
        <div className="mx-auto w-full max-w-[92rem] px-6 md:px-10">
          <p className="type-label mb-5">{t("beat2Label")}</p>
          <p className="type-h3 max-w-3xl text-balance">{t("beat2")}</p>
        </div>
      </div>

      <div className="hero-cue absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <span className="type-label">{t("scrollCue")}</span>
      </div>
    </section>
  );
}
