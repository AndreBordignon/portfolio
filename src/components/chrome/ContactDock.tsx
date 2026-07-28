"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MessageCircle } from "lucide-react";
import Magnetic from "@/components/motion/Magnetic";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Atalho discreto de WhatsApp. Só aparece depois que o herói saiu de cena —
 * nada flutuando por cima da abertura.
 */
export default function ContactDock() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.set(root.current, { opacity: 0, y: 24, pointerEvents: "none" });

      ScrollTrigger.create({
        start: "top -400",
        end: 99999,
        onToggle: (self) =>
          gsap.to(root.current, {
            opacity: self.isActive ? 1 : 0,
            y: self.isActive ? 0 : 24,
            duration: 0.5,
            ease: "power3.out",
            pointerEvents: self.isActive ? "auto" : "none",
          }),
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="fixed bottom-6 right-6 z-40 md:bottom-8 md:right-8">
      <Magnetic strength={0.25}>
        <a
          href="https://wa.me/5545998253744?text=Ol%C3%A1%2C%20Andr%C3%A9!%20Gostaria%20de%20conversar%20sobre%20um%20projeto."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="flex items-center gap-2.5 rounded-full border border-[color:var(--line-strong)] bg-ink/80 px-4 py-3 backdrop-blur-xl transition-colors hover:border-ember hover:text-ember md:px-5"
        >
          <MessageCircle size={17} className="text-ember" aria-hidden />
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.18em] md:inline">
            WhatsApp
          </span>
        </a>
      </Magnetic>
    </div>
  );
}
