"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;

/** Instância ativa do Lenis (null em reduced-motion ou antes de montar). */
export function getLenis() {
  return lenisInstance;
}

/**
 * Rola até uma âncora respeitando o smooth scroll.
 * Cai no scroll nativo quando o Lenis não está ativo (reduced-motion).
 */
export function scrollToSection(id: string) {
  const target = document.getElementById(id);
  if (!target) return;

  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset: -40, duration: 1.4 });
  } else {
    target.scrollIntoView({ behavior: "auto", block: "start" });
  }
}

/** Volta ao topo — funciona em qualquer página, com ou sem âncora `#inicio`. */
export function scrollToTop() {
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { duration: 1.2 });
  } else {
    window.scrollTo({ top: 0, behavior: "auto" });
  }
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Quem pediu menos movimento fica com o scroll nativo do browser.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      smoothWheel: true,
      touchMultiplier: 1.6,
    });
    lenisInstance = lenis;

    // 1) Lenis avisa o ScrollTrigger a cada scroll.
    lenis.on("scroll", ScrollTrigger.update);

    // 2) O ticker do GSAP dirige o Lenis — uma fonte de tempo só.
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Fontes e imagens mudam a altura da página depois do primeiro cálculo.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return <>{children}</>;
}
