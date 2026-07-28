"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

/**
 * Cursor custom com inércia. Cresce sobre elementos interativos e mostra um
 * rótulo quando o elemento declara `data-cursor="texto"`.
 * Só existe em ponteiro fino e fora de reduced-motion — no toque, nada muda.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    setEnabled(true);
    document.documentElement.classList.add("cursor-none-desktop");

    const xTo = gsap.quickTo(dot.current, "x", { duration: 0.12, ease: "power3" });
    const yTo = gsap.quickTo(dot.current, "y", { duration: 0.12, ease: "power3" });
    const xRing = gsap.quickTo(ring.current, "x", { duration: 0.55, ease: "power3" });
    const yRing = gsap.quickTo(ring.current, "y", { duration: 0.55, ease: "power3" });

    const onMove = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
    };

    const interactive = "a, button, [role='button'], input, textarea, [data-cursor]";

    const onOver = (e: PointerEvent) => {
      const el = (e.target as HTMLElement)?.closest?.(interactive) as HTMLElement | null;
      if (!el) return;
      setLabel(el.dataset.cursor ?? "");
      gsap.to(ring.current, { scale: el.dataset.cursor ? 2.6 : 1.9, duration: 0.35, ease: "power3.out" });
      gsap.to(dot.current, { scale: 0, duration: 0.25, ease: "power3.out" });
    };

    const onOut = (e: PointerEvent) => {
      const el = (e.target as HTMLElement)?.closest?.(interactive);
      if (!el) return;
      setLabel("");
      gsap.to(ring.current, { scale: 1, duration: 0.35, ease: "power3.out" });
      gsap.to(dot.current, { scale: 1, duration: 0.25, ease: "power3.out" });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      document.documentElement.classList.remove("cursor-none-desktop");
    };
  }, []);

  // Os nós existem desde o primeiro render — o GSAP precisa de alvo real.
  // Ficam invisíveis até sabermos que o ponteiro é fino.
  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-0 z-[70] transition-opacity ${
        enabled ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        ref={ring}
        className="absolute -left-4 -top-4 flex h-8 w-8 items-center justify-center rounded-full border border-ember/60 mix-blend-difference"
      >
        {label ? (
          <span className="whitespace-nowrap text-[7px] font-mono uppercase tracking-[0.2em] text-bone">
            {label}
          </span>
        ) : null}
      </div>
      <div className="absolute -left-[3px] -top-[3px] h-1.5 w-1.5 rounded-full bg-ember" ref={dot} />
    </div>
  );
}
