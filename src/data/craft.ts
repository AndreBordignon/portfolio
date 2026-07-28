import type { Locale } from "./projects";

export type CraftCategory = {
  id: string;
  title: Record<Locale, string>;
  /** O que ele realmente faz nessa disciplina — não é lista de buzzword. */
  note: Record<Locale, string>;
  skills: string[];
};

export const craft: CraftCategory[] = [
  {
    id: "frontend",
    title: { "pt-BR": "Frontend", en: "Frontend" },
    note: {
      "pt-BR": "Interface como produto: estado previsível, render barato, acessível de verdade.",
      en: "Interface as product: predictable state, cheap renders, genuinely accessible.",
    },
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Styled Components",
      "Redux",
      "Zustand",
      "React Query",
      "Vite",
      "Webpack",
      "HTML5",
      "CSS3",
    ],
  },
  {
    id: "mobile",
    title: { "pt-BR": "Mobile", en: "Mobile" },
    note: {
      "pt-BR": "Apps Expo em produção — incluindo a parte chata: build nativo, SDK e EAS.",
      en: "Production Expo apps — including the boring part: native builds, SDK upgrades and EAS.",
    },
    skills: [
      "React Native",
      "Expo",
      "EAS Build",
      "iOS",
      "Android",
      "Hermes",
      "New Architecture",
      "Mobile UI/UX",
    ],
  },
  {
    id: "backend",
    title: { "pt-BR": "Backend & Dados", en: "Backend & Data" },
    note: {
      "pt-BR": "Multi-tenant com RLS, API routes, integrações de pagamento e Postgres serverless.",
      en: "Multi-tenant with RLS, API routes, payment integrations and serverless Postgres.",
    },
    skills: [
      "Node.js",
      "NestJS",
      "Express",
      "PostgreSQL",
      "Prisma",
      "Supabase",
      "Neon",
      "REST",
      "GraphQL",
    ],
  },
  {
    id: "motion",
    title: { "pt-BR": "Motion & 3D", en: "Motion & 3D" },
    note: {
      "pt-BR": "Scroll dirigido, WebGL amarrado à narrativa e movimento que respeita reduced-motion.",
      en: "Directed scroll, WebGL tied to the narrative, and motion that respects reduced-motion.",
    },
    skills: [
      "GSAP ScrollTrigger",
      "Lenis",
      "React Three Fiber",
      "three.js",
      "GLSL",
      "Framer Motion",
      "Canvas 2D",
    ],
  },
  {
    id: "delivery",
    title: { "pt-BR": "Entrega", en: "Delivery" },
    note: {
      "pt-BR": "CI, testes onde dói e deploy que não vira evento. Core Web Vitals como requisito.",
      en: "CI, tests where it hurts, and deploys that aren't events. Core Web Vitals as a requirement.",
    },
    skills: [
      "Git",
      "GitHub Actions",
      "Docker",
      "Vercel",
      "AWS",
      "Jest",
      "Cypress",
      "Lighthouse CI",
      "Web Vitals",
    ],
  },
  {
    id: "practice",
    title: { "pt-BR": "Prática", en: "Practice" },
    note: {
      "pt-BR": "9 anos entregando com time: revisão de código, mentoria e decisão técnica documentada.",
      en: "9 years shipping with teams: code review, mentoring and technical decisions written down.",
    },
    skills: [
      "Agile",
      "Scrum",
      "TDD",
      "Code Review",
      "Liderança técnica",
      "Mentoria",
      "Documentação de decisão",
    ],
  },
];

export type Stat = {
  value: string;
  label: Record<Locale, string>;
};

export const stats: Stat[] = [
  {
    value: "9+",
    label: { "pt-BR": "anos construindo web e mobile", en: "years building web and mobile" },
  },
  {
    value: "2",
    label: { "pt-BR": "produtos próprios em produção", en: "own products in production" },
  },
  {
    value: "4",
    label: { "pt-BR": "apps React Native entregues", en: "React Native apps shipped" },
  },
  {
    value: "∞",
    label: { "pt-BR": "builds rodando às 2 da manhã", en: "builds running at 2am" },
  },
];
