"use client";

import Image, { StaticImageData } from "next/image";
import { Github, ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";
import pokedex from "../../../../public/pokedex.png";

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
    description:
      "Aplicativo de gerenciamento de tarefas com recursos de colaboração em tempo real, usando Socket.io e React.",
    tech: [
      "React Native",
      "TypeScript",
      "Expo",
      "Redux",
      "Styled-Components",
    ],
    github: "https://github.com/AndreBordignon/pokedex",
    image: pokedex,
  },
];

export default function ProjectsSection() {
  const t = useTranslations();

  return (
    <section id="projects" className="py-20 px-4 bg-[#292524]/30">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-2xl font-medium mb-4 text-[#f97316]">
            {t("projects.title")}
          </h2>
          <p className="text-[#a8a29e] text-sm leading-relaxed max-w-[50%]">
            {t("projects.description")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
          {projects.map((project, index) => (
            <article
              key={index}
              role="listitem"
              className="bg-[#292524] rounded-lg overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-200 border border-[#44403c] hover:border-[#f97316]"
            >
              <div className="h-48 bg-[#1c1917] flex items-center justify-center">
                <Image
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-medium mb-3 text-[#e7e5e4]">
                  {project.title}
                </h3>
                <p className="text-[#a8a29e] mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-[#3a3532] text-sm rounded-md border border-[#44403c] text-[#e7e5e4]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-[#a8a29e] hover:text-[#f97316] transition-colors"
                  >
                    <Github size={18} />
                    <span>{t("projects.code")}</span>
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-[#a8a29e] hover:text-[#f97316] transition-colors"
                    >
                      <ExternalLink size={18} />
                      <span>{t("projects.demo")}</span>
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

