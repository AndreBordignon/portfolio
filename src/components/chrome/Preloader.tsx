"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getLenis } from "@/components/providers/SmoothScroll";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Abertura: contador subindo enquanto a cortina segura a página, depois a
 * cortina sobe. Roda uma vez por sessão e é pulada em reduced-motion — o
 * conteúdo já está no HTML por baixo.
 */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const seen = sessionStorage.getItem("intro-played") === "1";

      if (reduce || seen) {
        setDone(true);
        return;
      }

      sessionStorage.setItem("intro-played", "1");

      const lenis = getLenis();
      lenis?.stop();
      document.body.style.overflow = "hidden";

      const counter = { value: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
          lenis?.start();
          ScrollTrigger.refresh();
          setDone(true);
        },
      });

      tl.to(counter, {
        value: 100,
        duration: 1.5,
        ease: "power2.inOut",
        onUpdate: () => {
          const el = root.current?.querySelector(".intro-count");
          if (el) el.textContent = String(Math.round(counter.value)).padStart(3, "0");
        },
      })
        .to(".intro-bar", { scaleX: 1, duration: 1.5, ease: "power2.inOut" }, 0)
        .to(".intro-meta", { opacity: 0, duration: 0.4, ease: "power2.in" }, "-=0.15")
        .to(root.current, {
          yPercent: -100,
          duration: 1.05,
          ease: "expo.inOut",
        });
    },
    { scope: root },
  );

  if (done) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[90] flex flex-col justify-between bg-ink px-6 py-8 md:px-10 md:py-10"
      aria-hidden
    >
      <div className="intro-meta type-label">André Bordignon — Portfólio 2026</div>

      <div className="intro-meta flex items-end justify-between gap-6">
        <span className="intro-count font-display text-[22vw] leading-[0.8] text-bone md:text-[14vw]">
          000
        </span>
        <span className="type-label mb-4 hidden md:block">Brasília, BR</span>
      </div>

      <div className="h-px w-full bg-[color:var(--line)]">
        <div className="intro-bar h-px origin-left scale-x-0 bg-ember" />
      </div>
    </div>
  );
}
