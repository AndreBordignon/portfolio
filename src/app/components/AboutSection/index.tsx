"use client";

import { useTranslations } from "next-intl";

const skillCategories = [
  {
    category: "Frontend Development",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Styled Components",
      "Redux",
      "Zustand",
      "React Query",
      "Vite",
      "Webpack",
    ],
  },
  {
    category: "Mobile Development",
    skills: [
      "React Native",
      "Expo",
      "iOS Development",
      "Android Development",
      "Mobile UI/UX",
      "Cross-platform",
    ],
  },
  {
    category: "Backend & APIs",
    skills: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "GraphQL",
      "RESTful Services",
      "API Integration",
      "Microservices",
    ],
  },
  {
    category: "Tools & DevOps",
    skills: [
      "Git",
      "GitHub",
      "Docker",
      "CI/CD",
      "AWS",
      "Vercel",
      "Testing",
      "Jest",
      "Cypress",
    ],
  },
  {
    category: "Methodologies",
    skills: [
      "Agile",
      "Scrum",
      "TDD",
      "Code Review",
      "Technical Leadership",
      "Mentoring",
    ],
  },
];

export default function AboutSection() {
  const t = useTranslations();

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div>
          <article>
            <h3 className="text-2xl font-medium mb-4 text-[#f97316]">
              {t("about.skills.title")}
            </h3>
            <p className="text-[#a8a29e] mb-8 text-sm leading-relaxed max-w-[50%]">
              {t("about.skills.description")}
            </p>
            <div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
              role="list"
              aria-label={t("about.skills.title")}
            >
              {skillCategories.map((category, categoryIndex) => (
                <div
                  key={categoryIndex}
                  className="bg-[#292524] border border-[#44403c] rounded-lg p-5 hover:border-[#f97316] transition-all duration-200"
                >
                  <h4 className="text-sm font-semibold text-[#f97316] uppercase tracking-wider mb-4">
                    {category.category}
                  </h4>
                  <div
                    className="flex flex-wrap gap-2"
                    role="list"
                    aria-label={category.category}
                  >
                    {category.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        role="listitem"
                        className="bg-[#1c1917] px-2.5 py-1 rounded-md text-xs border border-[#44403c] hover:border-[#f97316] hover:bg-[#3a3532] transition-all duration-200 text-[#e7e5e4] font-medium cursor-default"
                        title={skill}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
