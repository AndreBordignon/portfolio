"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail, ExternalLink, Code, User, Briefcase, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import pokedex from '../../public/pokedex.png';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  type Project = {
    title: string;
    description: string;
    tech: string[];
    github: string;
    image: string;
    demo?: string;
  };

  const projects: Project[] = [
    {
      title: "Pokedex App",
      description: "Aplicativo de gerenciamento de tarefas com recursos de colaboração em tempo real, usando Socket.io e React.",
      tech: ["React Native", "TypeScript", "Expo", "Redux", "Styled-Components"],
      github: "https://github.com/AndreBordignon/pokedex",
      image: pokedex,
    },
  ];

  const skills = [
    "JavaScript", "React", "React Native", "Node.js", "TypeScript",
    "Git", "Docker", "Tailwind CSS", "Next.js", "Vite", "GraphQL", "REST APIs", "Redux"
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Portfolio
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {[
                { id: 'home', label: 'Início', icon: <User size={16} /> },
                { id: 'about', label: 'Sobre', icon: <Code size={16} /> },
                { id: 'projects', label: 'Projetos', icon: <Briefcase size={16} /> },
                { id: 'contact', label: 'Contato', icon: <MessageCircle size={16} /> }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                    activeSection === item.id 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
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
                { id: 'home', label: 'Início' },
                { id: 'about', label: 'Sobre' },
                { id: 'projects', label: 'Projetos' },
                { id: 'contact', label: 'Contato' }
              ].map(item => (
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

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-8 flex items-center justify-center text-4xl font-bold">
            AB
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            André Bordignon
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Desenvolvedor Front-End | React | React Native
          </p>
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            Criando experiências digitais incríveis com tecnologias modernas. 
            Especializado em React, React Native, Node.js e desenvolvimento de aplicações web completas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection('projects')}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold"
            >
              Ver Projetos
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-3 border border-gray-600 rounded-lg hover:border-gray-500 hover:bg-gray-800 transition-all duration-300"
            >
              Entre em Contato
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Sobre Mim</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-blue-400">Minha Jornada</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                  Engenheiro de Software com 9+ anos de experiência em desenvolvimento web e mobile, 
                  especializado em React e React Native. Atuação em projetos de alta complexidade, 
                  com foco em performance, experiência do usuário e liderança técnica.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Especializo-me em desenvolvimento full-stack, com foco especial em React para 
                frontend e Node.js para backend. Adoro trabalhar em projetos desafiadores que 
                me permitam aprender e crescer continuamente.
              </p>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-blue-400">Habilidades</h3>
              <div className="grid grid-cols-2 gap-3">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-gray-800 px-4 py-2 rounded-lg text-center hover:bg-gray-700 transition-all duration-300"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 bg-gray-800/50">
        <div className="max-w-6xl mx-auto">
      // demo: "https://pokedex-demo-url.com", // Adicione um link demo se existir
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Meus Projetos</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-6"></div>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Aqui estão alguns dos projetos que desenvolvi, demonstrando minhas habilidades 
              em diferentes tecnologias e áreas.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-gray-800 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 border border-gray-700 hover:border-gray-600">
                <div className="h-48 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                    <Image
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover"
                      style={{ objectFit: 'cover' }}
                    />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="px-3 py-1 bg-gray-700 text-sm rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    <a
                      href={project.github}
                      target='_blank'
                      className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <Github size={18} />
                      <span>Código</span>
                    </a>
                    {project.demo && (
                    <a
                      href={project.demo}
                      target='_blank'
                      className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <ExternalLink size={18} />
                      <span>Demo</span>
                    </a>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Entre em Contato</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-6"></div>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Estou sempre interessado em novas oportunidades e projetos interessantes. 
              Vamos conversar sobre como posso ajudar com seu próximo projeto!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6 bg-gray-800 rounded-xl hover:bg-gray-700 transition-all duration-300">
              <Mail className="mx-auto mb-4 text-blue-400" size={32} />
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-gray-400">andre@andrebordignon.dev</p>
            </div>
            <div className="text-center p-6 bg-gray-800 rounded-xl hover:bg-gray-700 transition-all duration-300">
              <Github className="mx-auto mb-4 text-blue-400" size={32} />
              <h3 className="text-lg font-semibold mb-2">GitHub</h3>
              <p className="text-gray-400">github.com/AndreBordignon</p>
            </div>
            <div className="text-center p-6 bg-gray-800 rounded-xl hover:bg-gray-700 transition-all duration-300">
              <Linkedin className="mx-auto mb-4 text-blue-400" size={32} />
              <h3 className="text-lg font-semibold mb-2">LinkedIn</h3>
              <p className="text-gray-400">linkedin.com/in/andrebordignon/</p>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-8">
            <h3 className="text-2xl font-semibold mb-6 text-center">Envie uma Mensagem</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Nome</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Seu nome"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="seu@email.com"
                />
              </div>
            </div>
            <div className="mt-6">
              <label className="block text-sm font-medium mb-2">Assunto</label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Assunto da mensagem"
              />
            </div>
            <div className="mt-6">
              <label className="block text-sm font-medium mb-2">Mensagem</label>
              <textarea
                rows="5"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Sua mensagem..."
              ></textarea>
            </div>
            <div className="mt-6 text-center">
              <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold">
                Enviar Mensagem
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-8 px-4 border-t border-gray-700">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © 2025 André Bordignon. Todos os direitos reservados.
          </p>
          <div className="flex justify-center space-x-6 mt-4">
            <a href="https://github.com/andrebordignon" target="_blank" className="text-gray-400 hover:text-white transition-colors">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com/in/andrebordignon/" target="_blank" className="text-gray-400 hover:text-white transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="mailto:andre@codence.agency" className="text-gray-400 hover:text-white transition-colors">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;