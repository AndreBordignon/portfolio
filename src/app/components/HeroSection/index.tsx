"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import AndreBordignon from "../../../../public/andre-bordignon.jpg";

interface HeroSectionProps {
  scrollToSection: (sectionId: string) => void;
}

export default function HeroSection({ scrollToSection }: HeroSectionProps) {
  const t = useTranslations();
  const text = t("hero.title");
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text.charAt(index));
        setIndex(index + 1);
      }, 40);
      return () => clearTimeout(timeout);
    }
  }, [index, text]);

  return (
    <section id="home" className="pt-24 pb-12 md:pt-32 md:pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Side - Text Content */}
          <header className="text-center md:text-left order-2 md:order-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-4 text-[#e7e5e4]">
              {displayedText}
              <span
                className="animate-pulse-0-slow text-[#f97316]"
                aria-hidden="true"
              >
                |
              </span>
            </h1>
            <p className="text-lg md:text-xl text-[#f97316] mb-3 font-medium">
              {t("hero.subtitle")}
            </p>
            <div className="text-base md:text-lg text-[#a8a29e] mb-6 leading-relaxed space-y-4">
              <p>{t("about.journey.description1")}</p>
              <p>{t("about.journey.description2")}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button
                onClick={() => scrollToSection("projects")}
                className="px-6 py-2.5 text-white cursor-pointer hover:text-[#f97316] transition-colors duration-200 font-medium text-sm md:text-base"
              >
                {t("hero.viewProjects")}
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="px-6 py-2.5 border cursor-pointer border-[#44403c] hover:border-[#f97316] transition-colors duration-200 text-sm md:text-base"
              >
                {t("hero.contact")}
              </button>
            </div>
          </header>

          {/* Right Side - Image */}
          <div className="hidden md:flex order-1 md:order-2 justify-center md:justify-start md:ml-[25%]">
            <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full border-2 border-[#44403c] shadow-lg overflow-hidden">
              <Image
                src={AndreBordignon}
                alt={t("hero.title") + " - " + t("hero.subtitle")}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 192px, (max-width: 1024px) 256px, 320px"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
