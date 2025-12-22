"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations();

  return (
    <footer className="bg-[#292524] py-8 px-4 border-t border-[#44403c]">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-[#a8a29e]">{t("footer.copyright")}</p>
        <div className="flex justify-center space-x-6 mt-4">
          <a
            href="https://github.com/andrebordignon"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#a8a29e] hover:text-[#f97316] transition-colors"
          >
            <Github size={20} />
          </a>
          <a
            href="https://linkedin.com/in/andrebordignon/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#a8a29e] hover:text-[#f97316] transition-colors"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="mailto:andre@codence.agency"
            className="text-[#a8a29e] hover:text-[#f97316] transition-colors"
          >
            <Mail size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}

