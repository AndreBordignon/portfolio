"use client";

import dynamic from "next/dynamic";

/**
 * WebGL nunca no SSR. O fallback reserva o espaço (CLS ~0) e já pinta o
 * gradiente de brasa, então o LCP não espera o Canvas.
 */
const HeroScene = dynamic(() => import("./HeroExperience"), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden
      className="absolute inset-0 bg-[radial-gradient(60%_45%_at_50%_55%,rgba(249,115,22,0.16),transparent_70%)]"
    />
  ),
});

export default HeroScene;
