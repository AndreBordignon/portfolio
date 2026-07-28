"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

type Props = {
  children: React.ReactNode;
  className?: string;
  /** "words" dá o clássico reveal editorial; "lines" é mais sóbrio. */
  type?: "words" | "lines";
  delay?: number;
  /** Dispara na entrada da viewport (padrão) ou logo ao montar. */
  trigger?: "scroll" | "mount";
  as?: "h1" | "h2" | "h3" | "p" | "div";
};

/**
 * Reveal tipográfico por linha/palavra. O SplitText devolve o DOM original no
 * cleanup — leitor de tela e SEO continuam lendo o texto real.
 */
export default function SplitLines({
  children,
  className,
  type = "words",
  delay = 0,
  trigger = "scroll",
  as: Tag = "div",
}: Props) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = new SplitText(root.current!, {
          type: type === "words" ? "lines,words" : "lines",
          linesClass: "line-mask",
        });

        const targets = type === "words" ? split.words : split.lines;

        gsap.set(root.current, { opacity: 1 });
        gsap.from(targets, {
          yPercent: 118,
          opacity: 0,
          duration: 1.15,
          delay,
          ease: "power4.out",
          stagger: type === "words" ? 0.028 : 0.09,
          ...(trigger === "scroll"
            ? { scrollTrigger: { trigger: root.current, start: "top 88%" } }
            : {}),
        });

        return () => split.revert();
      });
    },
    { scope: root, dependencies: [type, delay, trigger] },
  );

  return (
    <Tag ref={root as never} className={className} data-reveal>
      {children}
    </Tag>
  );
}
