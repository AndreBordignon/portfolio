"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Atraso em segundos — para escalonar irmãos manualmente. */
  delay?: number;
  /** Distância vertical inicial, em px. */
  y?: number;
  /** Aplica stagger nos filhos diretos em vez de animar o bloco inteiro. */
  stagger?: boolean;
  as?: "div" | "section" | "li" | "article" | "header" | "footer";
};

/**
 * Reveal ao entrar na viewport. Anima só transform/opacity.
 * Em reduced-motion o conteúdo simplesmente já está lá.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 48,
  stagger = false,
  as: Tag = "div",
}: Props) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const targets = stagger
          ? (Array.from(root.current!.children) as HTMLElement[])
          : [root.current!];

        gsap.set(targets, { opacity: 0, y });
        gsap.to(targets, {
          opacity: 1,
          y: 0,
          duration: 1.1,
          delay,
          ease: "power3.out",
          stagger: stagger ? 0.08 : 0,
          scrollTrigger: { trigger: root.current, start: "top 88%" },
        });
      });
    },
    { scope: root, dependencies: [delay, y, stagger] },
  );

  return (
    <Tag ref={root as never} className={className} data-reveal>
      {children}
    </Tag>
  );
}
