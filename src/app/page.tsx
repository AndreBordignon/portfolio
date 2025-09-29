"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Github, Linkedin, Mail, ExternalLink, Code, User, Briefcase, MessageCircle } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';
import pokedex from '../../public/pokedex.png';
import emailjs from '@emailjs/browser';
import ReCAPTCHA from "react-google-recaptcha";

const Portfolio = () => {
  const text = 'Bem vindo ao meu portfólio :)'
  const [displayedText, setDisplayedText] = useState('')
  const [index, setIndex] = useState(0)
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text.charAt(index))
        setIndex(index + 1)
      }, 40) // velocidade do typewriter
      return () => clearTimeout(timeout)
    }
  }, [index, text])

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };
  const YOUR_EMAIL = process.env.NEXT_PUBLIC_EMAILJS_SEND_EMAIL;

  // Configurações do EmailJS - SUBSTITUA com suas credenciais
  const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
  const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
  const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

    async function handleCaptchaSubmission(token: string | null) {
    try {
      if (token) {
        await fetch("/api", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });
        setIsVerified(true);
      }
    } catch (error: any) {
      console.error("Erro ao verificar o reCAPTCHA:", error);
      setIsVerified(false);
    }
  }

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

 const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: '', message: '' });

    // Validação básica
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setFormStatus({ type: 'error', message: 'Por favor, preencha todos os campos.' });
      setIsSubmitting(false);
      return;
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus({ type: 'error', message: 'Por favor, insira um email válido.' });
      setIsSubmitting(false);
      return;
    }

    try {
      // Preparar os parâmetros do template
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: YOUR_EMAIL,
      };

      // Enviar email usando EmailJS
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      console.log('Email enviado com sucesso!', response.status, response.text);

      setFormStatus({ 
        type: 'success', 
        message: 'Mensagem enviada com sucesso! Obrigado pelo contato, responderemos em breve.' 
      });

      // Limpar formulário
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

    } catch (error) {
      console.error('Erro ao enviar email:', error);
      setFormStatus({ 
        type: 'error', 
        message: 'Erro ao enviar mensagem. Por favor, tente novamente mais tarde.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  type Project = {
    title: string;
    description: string;
    tech: string[];
    github: string;
    image: StaticImageData;
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
          <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent">
              {displayedText.slice(0, -2)}
              <span className="animate-pulse-slow text-purple-500">{displayedText.slice(-2)}</span>
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
                  className={`flex items-center space-x-2 px-3 py-2 cursor-pointer rounded-lg transition-all duration-300 ${
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
              className="px-8 py-3 bg-gradient-to-r cursor-pointer from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold"
            >
              Ver Projetos
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-3 border cursor-pointer border-gray-600 rounded-lg hover:border-gray-500 hover:bg-gray-800 transition-all duration-300"
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
                    className="bg-gray-800 px-4 py-2 rounded-lg text-center hover:bg-blue-700 transition-all duration-300"
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
            {formStatus.message && (
              <div className={`mb-6 p-4 rounded-lg ${
                formStatus.type === 'success' 
                  ? 'bg-green-900/50 border border-green-700 text-green-300' 
                  : 'bg-red-900/50 border border-red-700 text-red-300'
              }`}>
                {formStatus.message}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Nome</label>
                <input
                  value={formData.name}
                  name='name'
                  onChange={handleInputChange}
                  type="text"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Seu nome"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  value={formData.email}
                  name='email'
                  onChange={handleInputChange}
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
                name='subject'
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Assunto da mensagem"
              />
            </div>
            <div className="mt-6">
              <label className="block text-sm font-medium mb-2">Mensagem</label>
              <textarea
                value={formData.message}
                rows={5}
                name='message'
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Sua mensagem..."
              ></textarea>
            </div>
            <div className="mt-6 text-center">
                    <ReCAPTCHA
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                      ref={recaptchaRef}
                      onChange={(token) => handleCaptchaSubmission(token)}
                      onExpired={() => setIsVerified(false)}
                    />
                  <button type='submit' disabled={!isVerified} onClick={(e) => handleSubmit(e)} className="w-full cursor-pointer px-8 py-3 mt-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold">
                
                  {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
              </button>
            </div>
            </form>
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