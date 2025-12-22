"use client";
import React, { useState } from "react";
import {
  Menu,
  X,
  Code,
  User,
  Briefcase,
  MessageCircle,
  BookOpen,
} from "lucide-react";
import { useTranslations } from "next-intl";

const HeaderNavigation: React.FC = () => {
  const t = useTranslations();
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <nav className="fixed top-0 w-full bg-[#1c1917]/90 backdrop-blur-md border-b border-[#44403c] z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          <div className="text-lg sm:text-xl font-medium text-[#e7e5e4]">
            André Bordignon
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-2">
            {[
              {
                id: "home",
                label: t("navigation.home"),
                icon: <User size={16} />,
              },
              {
                id: "about",
                label: t("navigation.about"),
                icon: <Code size={16} />,
              },
              {
                id: "blog",
                label: t("navigation.blog"),
                icon: <BookOpen size={16} />,
              },
              {
                id: "projects",
                label: t("navigation.projects"),
                icon: <Briefcase size={16} />,
              },
              {
                id: "contact",
                label: t("navigation.contact"),
                icon: <MessageCircle size={16} />,
              },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex items-center space-x-2 px-4 py-2 cursor-pointer rounded-md transition-all duration-200 ${
                  activeSection === item.id
                    ? "text-[#f97316] bg-[#f97316]/10"
                    : "text-[#a8a29e] hover:text-[#e7e5e4] hover:bg-[#292524]"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-[#292524] text-[#e7e5e4] transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#44403c]">
            {[
              { id: "home", label: t("navigation.home") },
              { id: "about", label: t("navigation.about") },
              { id: "blog", label: t("navigation.blog") },
              { id: "projects", label: t("navigation.projects") },
              { id: "contact", label: t("navigation.contact") },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left px-4 py-3 text-[#a8a29e] hover:text-[#e7e5e4] hover:bg-[#292524] rounded-md mx-2 mb-1 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default HeaderNavigation;
