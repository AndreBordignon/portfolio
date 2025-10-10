"use client";
import React, { useState } from "react";
import { Menu, X, Code, User, Briefcase, MessageCircle } from "lucide-react";

// import { Container } from './styles';

const HeaderNavigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <nav className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent">
            Bem vindo ao meu portfólio :)
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {[
              { id: "home", label: "Início", icon: <User size={16} /> },
              { id: "about", label: "Sobre", icon: <Code size={16} /> },
              {
                id: "projects",
                label: "Projetos",
                icon: <Briefcase size={16} />,
              },
              {
                id: "contact",
                label: "Contato",
                icon: <MessageCircle size={16} />,
              },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex items-center space-x-2 px-3 py-2 cursor-pointer rounded-lg transition-all duration-300 ${
                  activeSection === item.id
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
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
            className="md:hidden p-2 rounded-lg hover:bg-gray-800"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            {[
              { id: "home", label: "Início" },
              { id: "about", label: "Sobre" },
              { id: "projects", label: "Projetos" },
              { id: "contact", label: "Contato" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg mx-2 mb-1"
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
